import React, { useState } from 'react';

export default function Home() {
  const [requests, setRequests] = useState([
    { id: 1, title: 'Fix AC', status: 'Pending' },
    { id: 2, title: 'Install WiFi Router', status: 'Completed' },
    { id: 3, title: 'Repair Plumbing', status: 'In Progress' },
  ]);

  const addRequest = () => {
    const newReq = { id: requests.length + 1, title: 'New Service', status: 'Pending' };
    setRequests([...requests, newReq]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Service Request Dashboard</h1>
      <p>Welcome! Manage and track your service requests here.</p>

      <button style={{ marginBottom: '20px' }} onClick={addRequest}>
        + New Request
      </button>

      <h2>Recent Requests</h2>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            <strong>{req.title}</strong> - <em>{req.status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}