import React from "react";

export default function Home() {
  const backgroundImage = "https://images.unsplash.com/photo-1531297484001-80022131f5a1";

  return (
    <main style={styles.main}>
      <img src={backgroundImage} alt="Service Home" style={styles.fullImage} />
      <div style={styles.darkOverlay}></div>

      <div style={styles.overlay}>
        <h1 style={styles.title}>Welcome to Service Request System</h1>
        <p style={styles.subtitle}>Please navigate to the Sales page to view our products.</p>
      </div>
    </main>
  );
}

const styles = {
  main: { position: "relative", width: "100%;", height: "100vh", overflow: "hidden" },
  fullImage: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 },
  darkOverlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.65)", zIndex: 1 },
  overlay: { position: "absolute", zIndex: 2, color: "white", textAlign: "center", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "20px" },
  title: { fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "bold", textShadow: "4px 4px 8px rgba(0,0,0,0.9)", marginBottom: "1.5rem", color: "#ffffff" },
  subtitle: { fontSize: "clamp(1.2rem, 3vw, 1.8rem)", textShadow: "3px 3px 6px rgba(0,0,0,0.9)", marginBottom: "3rem", color: "#f1f5f9" },
};