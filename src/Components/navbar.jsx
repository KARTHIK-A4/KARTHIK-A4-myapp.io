import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Navbar.css";
import { useCart } from "../context/CartContext";
import { UserContext } from "../context/usercontext";
import { useContext } from "react";

export default function Navbar() {
  const { getCartCount } = useCart();
  const { user } = useContext(UserContext);
  const cartCount = getCartCount();

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
