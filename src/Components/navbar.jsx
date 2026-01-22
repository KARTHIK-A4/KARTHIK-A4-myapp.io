import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar-header">
      <h2 className="navbar-title">Service Flash ⚡</h2>

      <nav className="navbar-nav">
        <Link className="navbar-link" to="/">Home</Link>
        <Link className="navbar-link" to="/register">Register</Link>
        <Link className="navbar-link" to="/login">Login</Link>
      </nav>
    </header>
  );
}
