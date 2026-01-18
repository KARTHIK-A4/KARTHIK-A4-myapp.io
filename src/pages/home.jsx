import React from "react";
import img from "../assets/images/service-home.jpg"; 

export default function Home() {
  return (
    <main style={styles.main}>
      {/* Fullscreen background image */}
      <img src={img} alt="Service Home" style={styles.fullImage} />

      {/* Overlay text */}
      <div style={styles.overlay}>
        <h1>Welcome to Service Request System</h1>
        <p>This is the home page. Please register or login to continue.</p>
      </div>
    </main>
  );
}

const styles = {
  main: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  fullImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",   
    zIndex: 0,           
  },
  overlay: {
    position: "relative",
    zIndex: 1,           
    color: "white",
    textAlign: "center",
    paddingTop: "20%",
    textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
  },
};