import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/usercontext';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
    const { user } = useContext(UserContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('dashboard'); // 'dashboard' | 'detail'
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetchRequests();
        const interval = setInterval(fetchRequests, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchRequests = async () => {
        try {
            const { data } = await axios.get('/requests?role=admin');
            setRequests(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            // toast.error('Failed to fetch requests'); // Suppress frequent toasts on poll
        }
    };

    const handleVisit = (req) => {
        setSelectedRequest(req);
        setView('detail');
    };

    const handleBack = () => {
        setSelectedRequest(null);
        setView('dashboard');
        fetchRequests();
    };

    const updateRequestInState = (updatedReq) => {
        setRequests(prev => prev.map(r => r._id === updatedReq._id ? updatedReq : r));
        if (selectedRequest && selectedRequest._id === updatedReq._id) {
            setSelectedRequest(updatedReq);
        }
    };

    if (loading) return <div style={{ padding: '2rem', color: 'white' }}>Loading dashboard...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', color: 'var(--text)' }}>
            {view === 'dashboard' ? (
                <DashboardHome requests={requests} onVisit={handleVisit} />
            ) : (
                <RequestDetail
                    request={selectedRequest}
                    onBack={handleBack}
                    user={user}
                    onUpdate={updateRequestInState}
                />
            )}
        </div>
    );
}

function DashboardHome({ requests, onVisit }) {
    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === 'Requested').length,
        accepted: requests.filter(r => r.status === 'Accepted').length,
        completed: requests.filter(r => r.status === 'Completed').length,
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Admin Dashboard
                </h1>
                <p style={{ color: 'var(--text-dim)' }}>Overview of all service requests</p>
            </header>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard title="Total Requests" value={stats.total} color="hsl(230, 85%, 60%)" icon="📝" />
                <StatCard title="Pending" value={stats.pending} color="hsl(200, 80%, 40%)" icon="⏳" />
                <StatCard title="Active Jobs" value={stats.accepted} color="hsl(45, 80%, 40%)" icon="⚡" />
                <StatCard title="Completed" value={stats.completed} color="hsl(150, 80%, 40%)" icon="✅" />
            </div>

            {/* Requests Table */}
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Recent Requests</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', textAlign: 'left' }}>
                            <tr>
                                <th style={{ padding: '1rem' }}>Customer</th>
                                <th style={{ padding: '1rem' }}>Service Type</th>
                                <th style={{ padding: '1rem' }}>Date</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }} className="table-row">
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '600' }}>{req.customer?.name || 'Unknown'}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{req.customer?.email}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{req.serviceType}</td>
                                    <td style={{ padding: '1rem' }}>{new Date(req.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <Badge status={req.status} />
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button
                                            onClick={() => onVisit(req)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.8rem',
                                                background: 'rgba(255,255,255,0.1)',
                                                border: '1px solid var(--glass-border)'
                                            }}
                                        >
                                            Visit &rarr;
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {requests.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
                                        No requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function RequestDetail({ request, onBack, user, onUpdate }) {
    const [activeMessage, setActiveMessage] = useState('');

    const handleStatusUpdate = async (newStatus) => {
        try {
            const { data } = await axios.patch(`/requests/${request._id}/status`, { status: newStatus });
            onUpdate(data);
            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleSendMessage = async () => {
        if (!activeMessage.trim()) return;
        try {
            const { data } = await axios.post(`/requests/${request._id}/messages`, {
                senderId: user.id || user._id, // Handle both potential id fields
                senderName: 'Admin',
                text: activeMessage
            });
            onUpdate(data);
            setActiveMessage('');
            toast.success('Message sent');
        } catch (error) {
            toast.error('Failed to send message');
        }
    };

    return (
        <div style={{ animation: 'slideIn 0.3s ease' }}>
            <button
                onClick={onBack}
                style={{
                    background: 'transparent',
                    padding: '0 0 1rem 0',
                    color: 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                }}
            >
                &larr; Back to Dashboard
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* Left Column: Request Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{request.serviceType}</h2>
                                <p style={{ color: 'var(--text-dim)' }}>Request ID: {request._id}</p>
                            </div>
                            <Badge status={request.status} large />
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                            <h4 style={{ color: 'var(--text-dim)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Description</h4>
                            <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>{request.description}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <InfoBox label="Customer Name" value={request.customer?.name} />
                            <InfoBox label="Email" value={request.customer?.email} />
                            <InfoBox label="Created At" value={new Date(request.createdAt).toLocaleString()} />
                            <InfoBox label="Last Updated" value={new Date(request.updatedAt).toLocaleString()} />
                        </div>
                    </div>

                    <div className="glass-card">
                        <h3 style={{ marginBottom: '1rem' }}>Conversation</h3>
                        <div style={{
                            height: '300px',
                            overflowY: 'auto',
                            background: 'rgba(0,0,0,0.2)',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            {request.messages.map((m, idx) => {
                                const isAdmin = m.senderName === 'Admin';
                                return (
                                    <div key={idx} style={{
                                        alignSelf: isAdmin ? 'flex-end' : 'flex-start',
                                        maxWidth: '70%'
                                    }}>
                                        <div style={{
                                            background: isAdmin ? 'var(--primary)' : 'var(--surface)',
                                            padding: '0.8rem 1.2rem',
                                            borderRadius: isAdmin ? '12px 12px 0 12px' : '12px 12px 12px 0',
                                            border: '1px solid var(--glass-border)'
                                        }}>
                                            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.2rem' }}>{m.senderName}</div>
                                            {m.text}
                                        </div>
                                    </div>
                                );
                            })}
                            {request.messages.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontStyle: 'italic', marginTop: '2rem' }}>No messages yet.</p>}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={activeMessage}
                                onChange={(e) => setActiveMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-card">
                        <h3 style={{ marginBottom: '1.5rem' }}>Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <ActionButton
                                label="Accept Request"
                                onClick={() => handleStatusUpdate('Accepted')}
                                disabled={request.status === 'Accepted' || request.status === 'Completed'}
                                color="hsl(45, 80%, 40%)"
                            />
                            <ActionButton
                                label="Mark as Completed"
                                onClick={() => handleStatusUpdate('Completed')}
                                disabled={request.status !== 'Accepted'}
                                color="hsl(150, 80%, 30%)"
                            />
                            <ActionButton
                                label="Cancel Request"
                                onClick={() => handleStatusUpdate('Cancelled')}
                                disabled={request.status === 'Cancelled' || request.status === 'Completed'}
                                color="hsl(0, 80%, 40%)"
                            />
                        </div>
                    </div>

                    {request.rating && (
                        <div className="glass-card" style={{ textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Feedback</h3>
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                                {'⭐'.repeat(request.rating)}
                            </div>
                            <p style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>"{request.feedback}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// UI Helpers

function StatCard({ title, value, color, icon }) {
    return (
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: `0 4px 12px ${color}66`
            }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>{value}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '0.2rem' }}>{title}</div>
            </div>
        </div>
    );
}

function Badge({ status, large }) {
    const colors = {
        Requested: 'hsl(200, 80%, 40%)',
        Accepted: 'hsl(45, 80%, 40%)',
        Completed: 'hsl(150, 80%, 30%)',
        Cancelled: 'hsl(0, 80%, 40%)'
    };

    return (
        <span style={{
            background: colors[status] || 'gray',
            padding: large ? '0.5rem 1rem' : '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: large ? '1rem' : '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            boxShadow: `0 2px 8px ${colors[status]}66`
        }}>
            {status}
        </span>
    );
}

function InfoBox({ label, value }) {
    return (
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>{label}</div>
            <div style={{ fontWeight: '500' }}>{value || '-'}</div>
        </div>
    );
}

function ActionButton({ label, onClick, disabled, color }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                background: disabled ? 'rgba(255,255,255,0.05)' : color,
                color: disabled ? 'var(--text-dim)' : 'white',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.7 : 1,
                width: '100%'
            }}
        >
            {label}
        </button>
    );
}
