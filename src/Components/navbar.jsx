import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Navbar.css";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="navbar-header">
      <h2 className="navbar-title">Service Flash ⚡</h2>

      <nav className="navbar-nav">
        <Link className="navbar-link" to="/">Home</Link>
        <Link className="navbar-link" to="/register">Register</Link>
        <Link className="navbar-link" to="/login">Login</Link>
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
