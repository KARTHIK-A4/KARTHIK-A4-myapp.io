import React from "react";
import "../assets/styles/Home.css";

export default function Home() {
  const backgroundImage = "https://images.unsplash.com/photo-1531297484001-80022131f5a1";

  return (
    <main className="home-main">
      <img src={backgroundImage} alt="Service Home" className="home-full-image" />
      <div className="home-dark-overlay"></div>

      <div className="home-overlay">
        <h1 className="home-title">Welcome to Service Request System</h1>
        <p className="home-subtitle">Please navigate to the Sales page to view our products.</p>
      </div>
    </main>
  );
}
