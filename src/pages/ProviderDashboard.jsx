import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/usercontext';
import { toast } from 'react-hot-toast';
import { FaFilePdf, FaFileWord, FaFileAlt, FaVideo, FaImage } from 'react-icons/fa';
import '../assets/styles/ProviderDashboard.css';

export default function ProviderDashboard() {
    const { user } = useContext(UserContext);
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messageText, setMessageText] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetchRequests();
        const interval = setInterval(fetchRequests, 3000);
        return () => clearInterval(interval);
    }, []);

    const fetchRequests = async () => {
        try {
            // Using provider role to fetch all requests like admin
            const { data } = await axios.get('/requests?role=provider');
            setRequests(data);
            setLoading(false);
            setSelectedRequest(prev => {
                if (!prev) return prev;
                const updated = data.find(r => r._id === prev._id);
                return updated || prev;
            });
        } catch (error) {
            console.error('Failed to fetch requests');
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.patch(`/requests/${id}/status`, { status: newStatus });
            toast.success(`Request marked as ${newStatus}`);
            fetchRequests();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleSendMessage = async (id) => {
        if (!messageText.trim()) return;
        try {
            await axios.post(`/requests/${id}/messages`, {
                senderId: user?.id || user?._id,
                senderName: user?.name || 'Provider',
                text: messageText
            });
            setMessageText('');
            toast.success('Message sent');
            fetchRequests();
        } catch (error) {
            toast.error('Failed to send message');
        }
    };

    const getFileIcon = (path) => {
        if (path.match(/\.(jpeg|jpg|png|gif)$/i)) return <FaImage />;
        if (path.match(/\.(mp4|mov|avi)$/i)) return <FaVideo />;
        if (path.match(/\.pdf$/i)) return <FaFilePdf />;
        if (path.match(/\.(doc|docx)$/i)) return <FaFileWord />;
        return <FaFileAlt />;
    };

    const getFileName = (path) => {
        return path.split(/[/\\]/).pop();
    };

    const filteredRequests = requests.filter(req => filterStatus === 'All' || req.status === filterStatus);

    return (
        <div className="provider-dashboard-container">
            {/* Sidebar List */}
            <div className="provider-sidebar">
                <div className="provider-sidebar-header">
                    <h2 className="provider-sidebar-title">Provider Dashboard</h2>
                    <p className="provider-sidebar-stats">{filteredRequests.length} Requests</p>
                    <div className="provider-filter-container">
                        {['All', 'Requested', 'Accepted', 'Completed', 'Cancelled'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`provider-filter-btn ${filterStatus === status ? 'active' : 'inactive'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="provider-request-list">
                    {loading ? (
                        <div className="provider-loading">Loading...</div>
                    ) : (
                        filteredRequests.map(req => (
                            <div
                                key={req._id}
                                onClick={() => setSelectedRequest(req)}
                                className={`provider-request-item ${selectedRequest?._id === req._id ? 'active' : 'inactive'}`}
                            >
                                <div className="provider-request-header">
                                    <span className="provider-request-type">{req.serviceType}</span>
                                    <span className={`provider-status-badge ${req.status === 'Completed' ? 'provider-status-completed' : req.status === 'Cancelled' ? 'provider-status-cancelled' : 'provider-status-default'}`}>
                                        {req.status}
                                    </span>
                                </div>
                                <p className="provider-request-customer">
                                    {req.customer?.name}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="provider-main-content">
                {selectedRequest ? (
                    <>
                        {/* Header */}
                        <div className="provider-detail-header">
                            <div>
                                <h2 className="provider-detail-title">{selectedRequest.serviceType}</h2>
                                <p className="provider-detail-customer">
                                    Customer: <span>{selectedRequest.customer?.name} ({selectedRequest.customer?.email})</span>
                                </p>
                            </div>
                            <div className="provider-action-buttons">
                                <button
                                    onClick={() => handleStatusUpdate(selectedRequest._id, 'Accepted')}
                                    disabled={selectedRequest.status === 'Accepted'}
                                    className="provider-action-btn provider-btn-accept"
                                    style={{ opacity: selectedRequest.status === 'Accepted' ? 0.5 : 1 }}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(selectedRequest._id, 'Completed')}
                                    disabled={selectedRequest.status === 'Completed'}
                                    className="provider-action-btn provider-btn-complete"
                                    style={{ opacity: selectedRequest.status === 'Completed' ? 0.5 : 1 }}
                                >
                                    Complete
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(selectedRequest._id, 'Cancelled')}
                                    disabled={selectedRequest.status === 'Cancelled'}
                                    className="provider-action-btn provider-btn-cancel"
                                    style={{ opacity: selectedRequest.status === 'Cancelled' ? 0.5 : 1 }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                        <div className="provider-detail-body">
                            {/* Description */}
                            <div className="provider-section-card">
                                <h3 className="provider-section-title">Customer Issue Description</h3>
                                <p className="provider-description-text">{selectedRequest.description}</p>
                            </div>

                            {/* Customer Rating */}
                            {selectedRequest.rating && (
                                <div className="provider-section-card">
                                    <h3 className="provider-section-title">Customer Rating</h3>
                                    <div className="provider-rating-stars">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span key={star} style={{ color: star <= selectedRequest.rating ? '#fbbf24' : '#475569' }}>
                                                {star <= selectedRequest.rating ? '⭐' : '☆'}
                                            </span>
                                        ))}
                                    </div>
                                    {selectedRequest.feedback && (
                                        <p className="provider-feedback-text">"{selectedRequest.feedback}"</p>
                                    )}
                                </div>
                            )}

                            {/* Attachments */}
                            {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                                <div className="provider-section-card">
                                    <h3 className="provider-section-title">Provided Attachments</h3>
                                    <div className="provider-attachments-grid">
                                        {selectedRequest.attachments.map((path, idx) => (
                                            <div key={idx} className="provider-attachment-item">
                                                {path.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                                    <a href={`http://localhost:8000/${path}`} target="_blank" rel="noopener noreferrer">
                                                        <img src={`http://localhost:8000/${path}`} alt="attachment" className="provider-attachment-img" />
                                                    </a>
                                                ) : path.match(/\.(mp4|mov|avi)$/i) ? (
                                                    <video controls className="provider-attachment-video">
                                                        <source src={`http://localhost:8000/${path}`} />
                                                    </video>
                                                ) : (
                                                    <a href={`http://localhost:8000/${path}`} target="_blank" rel="noopener noreferrer" className="provider-attachment-doc">
                                                        <div className="provider-doc-icon">{getFileIcon(path)}</div>
                                                        <span className="provider-doc-name">{getFileName(path)}</span>
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Messages */}
                            <div className="provider-chat-section">
                                <h3 className="provider-section-title">Communication</h3>
                                <div className="provider-chat-messages">
                                    {selectedRequest.messages && selectedRequest.messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className="provider-message-wrapper"
                                            style={{ alignSelf: (msg.sender?._id || msg.sender) === user?.id ? 'flex-end' : 'flex-start' }}
                                        >
                                            <div className={`provider-message-bubble ${(msg.sender?._id || msg.sender) === user?.id ? 'sent' : 'received'}`}>
                                                <p className="provider-message-text">{msg.text}</p>
                                            </div>
                                            <span className="provider-message-sender" style={{ textAlign: (msg.sender?._id || msg.sender) === user?.id ? 'right' : 'left' }}>
                                                {msg.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="provider-chat-input-area">
                                    <input
                                        type="text"
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder="Type a message to the customer..."
                                        className="provider-chat-input"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(selectedRequest._id)}
                                    />
                                    <button
                                        onClick={() => handleSendMessage(selectedRequest._id)}
                                        className="provider-chat-send-btn"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="provider-empty-state">
                        <div>
                            <h3 className="provider-empty-title">Select a Request to Provide Service</h3>
                            <p>Choose a customer service request from the sidebar to view details and accept it.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
