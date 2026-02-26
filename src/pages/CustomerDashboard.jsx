import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/usercontext';
import { toast } from 'react-hot-toast';

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
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem' }}>Customer Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* New Request Form */}
                <div className="glass-card">
                    <h2>Request Service</h2>
                    <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                            />
                        </div>
                        <button type="submit" style={{ marginTop: '0.5rem' }}>Submit Request</button>
                    </form>
                </div>

                {/* Requests List */}
                <div className="glass-card">
                    <h2>My Requests</h2>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {loading ? (
                            <p>Loading requests...</p>
                        ) : requests.length === 0 ? (
                            <p>No requests yet.</p>
                        ) : (
                            requests.map(req => (
                                <div key={req._id} style={{ padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <h3 style={{ margin: 0 }}>{req.serviceType}</h3>
                                        <span className={getBadgeClass(req.status)}>{req.status}</span>
                                    </div>
                                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1rem' }}>{req.description}</p>


                                    <div style={{ marginTop: '1rem' }}>
                                        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Messages</h4>
                                        <div style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.5rem', background: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                                            {req.messages.map((m, idx) => {
                                                const senderId = m.sender ? (m.sender._id || m.sender) : null;
                                                const isCurrentUser = user && senderId === (user.id || user._id);
                                                return (
                                                    <div key={idx} style={{
                                                        fontSize: '0.8rem',
                                                        padding: '0.3rem 0.5rem',
                                                        background: isCurrentUser ? 'var(--primary)' : 'var(--surface)',
                                                        borderRadius: '4px',
                                                        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                                                        maxWidth: '80%'
                                                    }}>
                                                        <strong>{m.name || 'System'}: </strong> {m.text}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                type="text"
                                                placeholder="Ask a question..."
                                                value={activeMessage.id === req._id ? activeMessage.text : ''}
                                                onChange={(e) => setActiveMessage({ id: req._id, text: e.target.value })}
                                                style={{ fontSize: '0.8rem', padding: '0.5rem' }}
                                            />
                                            <button onClick={() => handleSendMessage(req._id)} style={{ padding: '0.5rem', fontSize: '0.8rem' }}>Send</button>
                                        </div>
                                    </div>

                                    {req.status === 'Completed' && !req.rating && (
                                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <p style={{ fontSize: '0.8rem' }}>Rate your experience:</p>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    onClick={async () => {
                                                        await axios.post(`/requests/${req._id}/rate`, { rating: star });
                                                        toast.success('Thank you for your rating!');
                                                        fetchRequests();
                                                    }}
                                                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                                                >
                                                    {star} ⭐
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {req.rating && (
                                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--accent)', margin: 0, marginRight: '0.5rem' }}>You rated:</p>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span key={star} style={{ fontSize: '1rem' }}>
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
