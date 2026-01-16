import React from "react";

export default function Home() {
  return (
    <main style={styles.main}>
      <h1>Welcome to Service Request System</h1>
      <p>
        This is the home page. Please register or login to continue.
      </p>
    </main>
  );
}

const styles = {
  main: {
    padding: "40px",
    textAlign: "center",
  },
};
