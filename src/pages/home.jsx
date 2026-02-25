import React from "react";
import "../assets/styles/Home.css";

export default function Home() {
  const backgroundImage = "https://images.unsplash.com/photo-1531297484001-80022131f5a1";

  return (
    <main className="home-main">
      <section className="hero-section">
        <img src={backgroundImage} alt="Service Home" className="hero-image" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Service Flash</h1>
          <p>
            Fast Support, Instant Solutions, and Real Pros...<br />
            Service Request is All in One Place.
          </p>
        </div>
      </section>

      <section className="mission-section">
        <h2 className="mission-title">Our Mission</h2>
        <div className="mission-cards-container">
          <div className="mission-card">
            <div className="card-icon">⚡</div>
            <h3>Speed</h3>
            <p>We believe in the power of "now". Our optimized workflows ensure your requests are handled with urgency and precision.</p>
          </div>
          <div className="mission-card">
            <div className="card-icon">🛡️</div>
            <h3>Reliability</h3>
            <p>Trust is our foundation. We vet every service provider to guarantee quality and safety for every interaction.</p>
          </div>
          <div className="mission-card">
            <div className="card-icon">🤝</div>
            <h3>Customer First</h3>
            <p>Your satisfaction drives us. Our support team is dedicated to providing a seamless, premium experience.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
