import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/usercontext';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
    const { user } = useContext(UserContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeMessage, setActiveMessage] = useState({ id: null, text: '' });

    useEffect(() => {
        fetchRequests();
        const interval = setInterval(fetchRequests, 10000); // Poll every 10s for "real-time" feel
        return () => clearInterval(interval);
    }, []);

    const fetchRequests = async () => {
        try {
            const { data } = await axios.get('/requests?role=admin');
            setRequests(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch requests');
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.patch(`/requests/${id}/status`, { status: newStatus });
            toast.success(`Status updated to ${newStatus}`);
            fetchRequests();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleSendMessage = async (id) => {
        if (!activeMessage.text) return;
        try {
            await axios.post(`/requests/${id}/messages`, {
                senderId: user.id,
                senderName: 'Admin',
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
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Admin Dashboard</h1>
                <div className="glass-card" style={{ padding: '0.5rem 1rem' }}>
                    <p style={{ margin: 0 }}>Total Requests: {requests.length}</p>
                </div>
            </header>

            {loading ? (
                <p>Loading all requests...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
                    {requests.map(req => (
                        <div key={req._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div>
                                    <h3 style={{ margin: 0 }}>{req.serviceType}</h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                                        Customer: {req.customer?.name} ({req.customer?.email})
                                    </p>
                                </div>
                                <span className={getBadgeClass(req.status)}>{req.status}</span>
                            </div>

                            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                                <p style={{ fontSize: '0.9rem' }}>{req.description}</p>
                            </div>

                            {/* Status Actions */}
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => handleStatusUpdate(req._id, 'Accepted')}
                                    disabled={req.status === 'Accepted'}
                                    style={{ fontSize: '0.7rem', background: 'hsl(45, 80%, 40%)' }}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(req._id, 'Completed')}
                                    disabled={req.status === 'Completed'}
                                    style={{ fontSize: '0.7rem', background: 'hsl(150, 80%, 30%)' }}
                                >
                                    Complete
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(req._id, 'Cancelled')}
                                    disabled={req.status === 'Cancelled'}
                                    style={{ fontSize: '0.7rem', background: 'hsl(0, 80%, 40%)' }}
                                >
                                    Cancel
                                </button>
                            </div>

                            {/* Messaging Section */}
                            <div style={{ marginTop: '1rem' }}>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Messages</h4>
                                <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                    {req.messages.map((m, idx) => (
                                        <div key={idx} style={{
                                            fontSize: '0.8rem',
                                            padding: '0.3rem 0.5rem',
                                            background: (m.sender?._id || m.sender) === user.id ? 'var(--primary)' : 'var(--surface)',
                                            borderRadius: '4px',
                                            alignSelf: (m.sender?._id || m.sender) === user.id ? 'flex-end' : 'flex-start',
                                            maxWidth: '80%'
                                        }}>
                                            <strong>{m.name}: </strong> {m.text}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Reply..."
                                        value={activeMessage.id === req._id ? activeMessage.text : ''}
                                        onChange={(e) => setActiveMessage({ id: req._id, text: e.target.value })}
                                        style={{ fontSize: '0.8rem', padding: '0.5rem' }}
                                    />
                                    <button onClick={() => handleSendMessage(req._id)} style={{ padding: '0.5rem' }}>Send</button>
                                </div>
                            </div>

                            {req.rating && (
                                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', color: 'var(--accent)' }}>
                                    <strong>Rating: {req.rating} ⭐</strong>
                                    {req.feedback && <p style={{ fontSize: '0.8rem', italic: true }}>"{req.feedback}"</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
