import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/usercontext';
import { toast } from 'react-hot-toast';
import '../assets/styles/CustomerDashboard.css';

export default function CustomerDashboard() {
    const { user } = useContext(UserContext);
    const [requests, setRequests] = useState([]);
    const [serviceType, setServiceType] = useState('Hardware Repair');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeMessage, setActiveMessage] = useState({ id: null, text: '' });

    const services = [
        'Hardware Repair',
        'Software Installation',
        'Maintenance',
        'Data Recovery',
        'Consultation',
        'Other'
    ];

    useEffect(() => {
        if (user) {
            fetchRequests();
            const interval = setInterval(fetchRequests, 3000);
            return () => clearInterval(interval);
        }
    }, [user]);

    const fetchRequests = async () => {
        if (!user) return;
        const userId = user.id || user._id;
        if (!userId) return;

        try {
            const { data } = await axios.get(`/requests?role=customer&id=${userId}`);
            setRequests(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch requests');
        }
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('serviceType', serviceType);
        data.append('description', description);
        data.append('customerId', user.id || user._id);
        data.append('customerName', user.name);

        for (let i = 0; i < files.length; i++) {
            data.append('attachments', files[i]);
        }

        try {
            await axios.post('/requests', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Request submitted successfully');
            setServiceType('Hardware Repair');
            setDescription('');
            setFiles([]);
            const fileInput = document.getElementById('attachments');
            if (fileInput) fileInput.value = '';
            fetchRequests();
        } catch (error) {
            toast.error('Failed to submit request');
        }
    };

    const handleSendMessage = async (id) => {
        if (!activeMessage.text) return;
        try {
            await axios.post(`/requests/${id}/messages`, {
                senderId: user.id || user._id,
                senderName: user.name,
                text: activeMessage.text
            });
            toast.success('Message sent');
            setActiveMessage({ id: null, text: '' });
            fetchRequests();
        } catch (error) {
            toast.error('Failed to send message');
        }
    };

    const getBadgeClass = (status) => {
        return `badge badge-${status.toLowerCase()}`;
    };

    return (
        <div className="customer-dashboard-container">
            <h1 className="customer-dashboard-title">Customer Dashboard</h1>

            <div className="customer-dashboard-grid">
                {/* New Request Form */}
                <div className="glass-card">
                    <h2>Request Service</h2>
                    <form onSubmit={handleSubmit} className="customer-form-wrapper">
                        <div>
                            <label>Service Type</label>
                            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                                {services.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your issue..."
                                required
                            />
                        </div>
                        <div>
                            <label>Attachments (Images, Videos, Docs):</label>
                            <br />
                            <input
                                type="file"
                                id="attachments"
                                multiple
                                onChange={handleFileChange}
                                accept="image/*,video/*,.pdf,.doc,.docx"
                                className="customer-file-input"
                            />
                        </div>
                        <button type="submit" className="customer-submit-btn">Submit Request</button>
                    </form>
                </div>

                {/* Requests List */}
                <div className="glass-card">
                    <h2>My Requests</h2>
                    <div className="customer-requests-wrapper">
                        {loading ? (
                            <p>Loading requests...</p>
                        ) : requests.length === 0 ? (
                            <p>No requests yet.</p>
                        ) : (
                            requests.map(req => (
                                <div key={req._id} className="customer-request-card">
                                    <div className="customer-request-header">
                                        <h3 className="customer-request-title">{req.serviceType}</h3>
                                        <span className={getBadgeClass(req.status)}>{req.status}</span>
                                    </div>
                                    <p className="customer-request-desc">{req.description}</p>


                                    <div className="customer-messages-section">
                                        <h4 className="customer-messages-title">Messages</h4>
                                        <div className="customer-messages-list">
                                            {req.messages.map((m, idx) => {
                                                const senderId = m.sender ? (m.sender._id || m.sender) : null;
                                                const isCurrentUser = user && senderId === (user.id || user._id);
                                                return (
                                                    <div key={idx} className={`customer-message-bubble ${isCurrentUser ? 'sent' : 'received'}`}>
                                                        <strong>{m.name || 'System'}: </strong> {m.text}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="customer-chat-input-area">
                                            <input
                                                type="text"
                                                placeholder="Ask a question..."
                                                value={activeMessage.id === req._id ? activeMessage.text : ''}
                                                onChange={(e) => setActiveMessage({ id: req._id, text: e.target.value })}
                                                className="customer-chat-input"
                                            />
                                            <button onClick={() => handleSendMessage(req._id)} className="customer-chat-send-btn">Send</button>
                                        </div>
                                    </div>

                                    {req.status === 'Completed' && !req.rating && (
                                        <div className="customer-rating-section">
                                            <p className="customer-rating-prompt">Rate your experience:</p>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    onClick={async () => {
                                                        await axios.post(`/requests/${req._id}/rate`, { rating: star });
                                                        toast.success('Thank you for your rating!');
                                                        fetchRequests();
                                                    }}
                                                    className="customer-rating-btn"
                                                >
                                                    {star} ⭐
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {req.rating && (
                                        <div className="customer-rated-section">
                                            <p className="customer-rated-text">You rated:</p>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span key={star} className="customer-rated-star">
                                                    {star <= req.rating ? '⭐' : '☆'}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
