import React from "react";
import { FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <h3 style={styles.brand}>Service Request System</h3>
                <div style={styles.socials}>
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.iconLink}
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.iconLink}
                        aria-label="Facebook"
                    >
                        <FaFacebook />
                    </a>
                    <a href="mailto:contact@example.com" style={styles.iconLink} aria-label="Email">
                        <FaEnvelope />
                    </a>
                </div>
                <p style={styles.copy}>
                    &copy; {new Date().getFullYear()} Service Request System. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: "#1e293b",
        color: "#f8fafc",
        padding: "2rem 1rem",
        marginTop: "auto",
        borderTop: "1px solid #334155",
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
    },
    brand: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        background: "linear-gradient(90deg, #60a5fa, #a855f7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    socials: {
        display: "flex",
        gap: "1.5rem",
        fontSize: "1.8rem",
    },
    iconLink: {
        color: "#94a3b8",
        transition: "color 0.3s ease, transform 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    copy: {
        fontSize: "0.9rem",
        color: "#64748b",
        marginTop: "1rem",
    },
};

export default Footer;
