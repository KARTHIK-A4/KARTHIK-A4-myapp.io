import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../assets/styles/dashboard.css";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <h2>Please log in to access the dashboard</h2>;
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="logo">ServiceHub</h2>

        {user.role === "customer" ? (
          <>
            <a href="/requests/new">Post Request</a>
            <a href="/requests/my">My Requests</a>
            <a href="/messages">Messages</a>
            <a href="/reviews">My Reviews</a>
          </>
        ) : (
          <>
            <a href="/requests/browse">Browse Requests</a>
            <a href="/profile">My Profile</a>
            <a href="/messages">Messages</a>
            <a href="/reviews">Customer Reviews</a>
          </>
        )}

        <a href="/logout">Logout</a>
      </nav>

      {/* Main Content */}
      <div className="main">
        <header className="header">
          <h1>Dashboard</h1>
          <h2>
            Hi {user.name} 👋 ({user.role})
          </h2>
        </header>

        {/* Stats Section */}
        <section className="stats">
          <div className="card">
            <h3>Active Requests</h3>
            <p>{user.role === "customer" ? "3" : "12"}</p>
          </div>
          <div className="card">
            <h3>Messages</h3>
            <p>5</p>
          </div>
          <div className="card">
            <h3>Completed Services</h3>
            <p>{user.role === "customer" ? "7" : "20"}</p>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="workflow">
          <h3>Service Workflow</h3>
          <div className="workflow-status">
            <span>Requested → Accepted → Completed → Cancelled</span>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="activity">
          <h3>Recent Activity</h3>
          <div className="activity-item">📌 Posted a new service request</div>
          <div className="activity-item">💬 Messaged provider</div>
          <div className="activity-item">⭐ Left a review</div>
        </section>
      </div>
    </div>
  );
}