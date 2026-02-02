import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Navbar.css";
import { useCart } from "../context/CartContext";
import { UserContext } from "../context/usercontext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const { getCartCount } = useCart();
  const { user, setUser } = useContext(UserContext);
  const cartCount = getCartCount();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      setUser(null);
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="navbar-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', alignItems: 'center' }}>
      <h2 className="navbar-title">Service Flash ⚡</h2>

      <nav className="navbar-nav" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link className="navbar-link" to="/">Home</Link>
        {!user && (
          <>
            <Link className="navbar-link" to="/register">Register</Link>
            <Link className="navbar-link" to="/login">Login</Link>
          </>
        )}
        {user && user.role === 'admin' && (
          <Link className="navbar-link" to="/admin" style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Admin Panel</Link>
        )}
        {user && user.role === 'customer' && (
          <Link className="navbar-link" to="/dashboard">My Dashboard</Link>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="navbar-link"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        )}

        <Link className="navbar-link" to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          Cart
          {cartCount > 0 && (
            <span style={{
              background: '#ef4444',
              color: 'white',
              fontSize: '0.75rem',
              padding: '2px 6px',
              borderRadius: '999px',
              minWidth: '20px',
              textAlign: 'center'
            }}>
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
