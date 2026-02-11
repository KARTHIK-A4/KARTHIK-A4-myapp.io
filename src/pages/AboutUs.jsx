import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/AboutUs.css';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-content">
                    <h1>Who We Are</h1>
                    <p>Empowering your world with lightning-fast service solutions.</p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-section">
                <h2 className="section-title">Our Mission</h2>
                <div className="mission-grid">
                    <div className="glass-card mission-card">
                        <div className="mission-icon">⚡</div>
                        <h3>Speed</h3>
                        <p>We believe in the power of "now". Our optimized workflows ensure your requests are handled with urgency and precision.</p>
                    </div>
                    <div className="glass-card mission-card">
                        <div className="mission-icon">🛡️</div>
                        <h3>Reliability</h3>
                        <p>Trust is our foundation. We vet every service provider to guarantee quality and safety for every interaction.</p>
                    </div>
                    <div className="glass-card mission-card">
                        <div className="mission-icon">🤝</div>
                        <h3>Customer First</h3>
                        <p>Your satisfaction drives us. Our support team is dedicated to providing a seamless, premium experience.</p>
                    </div>
                </div>
            </section>

            {/* Values/Story Section */}
            <section className="about-section">
                <h2 className="section-title">Core Values</h2>
                <div className="values-container">
                    <div className="value-item">
                        <span style={{ fontSize: '2rem' }}>💡</span>
                        <h4>Innovation</h4>
                    </div>
                    <div className="value-item">
                        <span style={{ fontSize: '2rem' }}>⚖️</span>
                        <h4>Integrity</h4>
                    </div>
                    <div className="value-item">
                        <span style={{ fontSize: '2rem' }}>🚀</span>
                        <h4>Excellence</h4>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-section">
                <div className="glass-card about-cta">
                    <h2>Ready to experience the difference?</h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--text-dim)' }}>Join thousands of satisfied customers who trust Service Flash.</p>
                    <button onClick={() => navigate('/register')}>Get Started</button>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
