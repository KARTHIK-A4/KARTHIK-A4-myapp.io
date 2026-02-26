import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/usercontext';
import { toast } from 'react-hot-toast';
import { FaFilePdf, FaFileWord, FaFileAlt, FaVideo, FaImage, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

export default function AdminDashboard() {
    const { user } = useContext(UserContext);
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        fetchRequests();
        const interval = setInterval(fetchRequests, 3000);
        return () => clearInterval(interval);
    }, []);

    const fetchRequests = async () => {
        try {
            const { data } = await axios.get('/requests?role=admin');
            setRequests(data);
            setLoading(false);
            // Update selected request if it exists to show new messages
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
                senderName: 'Admin',
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

    return (
        <div style={{ height: 'calc(100vh - 80px)', display: 'flex', background: '#0f172a', color: 'white', overflow: 'hidden' }}>
            {/* Sidebar List */}
            <div style={{ width: '350px', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#38bdf8' }}>Service Requests</h2>
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{requests.length} Active Requests</p>
                </div>

                <div style={{ overflowY: 'auto', flex: 1 }}>
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
                    ) : (
                        requests.map(req => (
                            <div
                                key={req._id}
                                onClick={() => setSelectedRequest(req)}
                                style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid #1e293b',
                                    cursor: 'pointer',
                                    background: selectedRequest?._id === req._id ? '#1e293b' : 'transparent',
                                    transition: 'background 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: '600', color: '#e2e8f0' }}>{req.serviceType}</span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.1rem 0.5rem',
                                        borderRadius: '999px',
                                        background: req.status === 'Completed' ? '#059669' : req.status === 'Cancelled' ? '#dc2626' : '#d97706',
                                        color: 'white'
                                    }}>
                                        {req.status}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {req.customer?.name}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
                {selectedRequest ? (
                    <>
                        {/* Header */}
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedRequest.serviceType}</h2>
                                <p style={{ color: '#94a3b8' }}>
                                    Customer: <span style={{ color: '#e2e8f0' }}>{selectedRequest.customer?.name} ({selectedRequest.customer?.email})</span>
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => handleStatusUpdate(selectedRequest._id, 'Accepted')}
                                    disabled={selectedRequest.status === 'Accepted'}
                                    style={{ padding: '0.5rem 1rem', background: '#d97706', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', opacity: selectedRequest.status === 'Accepted' ? 0.5 : 1 }}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(selectedRequest._id, 'Completed')}
                                    disabled={selectedRequest.status === 'Completed'}
                                    style={{ padding: '0.5rem 1rem', background: '#059669', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', opacity: selectedRequest.status === 'Completed' ? 0.5 : 1 }}
                                >
                                    Complete
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(selectedRequest._id, 'Cancelled')}
                                    disabled={selectedRequest.status === 'Cancelled'}
                                    style={{ padding: '0.5rem 1rem', background: '#dc2626', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', opacity: selectedRequest.status === 'Cancelled' ? 0.5 : 1 }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Description */}
                            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#38bdf8' }}>Issue Description</h3>
                                <p style={{ lineHeight: '1.6', color: '#cbd5e1' }}>{selectedRequest.description}</p>
                            </div>

                            {/* Attachments */}
                            {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                                <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#38bdf8' }}>Attachments</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                                        {selectedRequest.attachments.map((path, idx) => (
                                            <div key={idx} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #334155' }}>
                                                {path.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                                    <a href={`http://localhost:8000/${path}`} target="_blank" rel="noopener noreferrer">
                                                        <img src={`http://localhost:8000/${path}`} alt="attachment" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                                    </a>
                                                ) : path.match(/\.(mp4|mov|avi)$/i) ? (
                                                    <video controls style={{ width: '100%', height: '120px', objectFit: 'cover' }}>
                                                        <source src={`http://localhost:8000/${path}`} />
                                                    </video>
                                                ) : (
                                                    <a href={`http://localhost:8000/${path}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', background: '#0f172a', textDecoration: 'none', color: 'white' }}>
                                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{getFileIcon(path)}</div>
                                                        <span style={{ fontSize: '0.75rem', padding: '0 0.5rem', textAlign: 'center', wordBreak: 'break-all' }}>{getFileName(path)}</span>
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Messages */}
                            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#38bdf8' }}>Communication</h3>
                                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', paddingRight: '0.5rem' }}>
                                    {selectedRequest.messages && selectedRequest.messages.map((msg, idx) => {
                                        if (!msg) return null;
                                        const senderId = msg.sender ? (msg.sender._id || msg.sender) : null;
                                        const isCurrentUser = user && senderId === user.id;

                                        return (
                                            <div
                                                key={idx}
                                                style={{
                                                    alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                                                    maxWidth: '70%'
                                                }}
                                            >
                                                <div style={{
                                                    background: isCurrentUser ? '#3b82f6' : '#334155',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '12px',
                                                    borderBottomRightRadius: isCurrentUser ? '2px' : '12px',
                                                    borderBottomLeftRadius: !isCurrentUser ? '2px' : '12px',
                                                }}>
                                                    <p style={{ margin: 0 }}>{msg.text}</p>
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', display: 'block', textAlign: isCurrentUser ? 'right' : 'left' }}>
                                                    {msg.name || 'System'}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder="Type a message..."
                                        style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(selectedRequest._id)}
                                    />
                                    <button
                                        onClick={() => handleSendMessage(selectedRequest._id)}
                                        style={{ padding: '0 1.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Select a Request</h3>
                            <p>Choose a service request from the sidebar to view details.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
