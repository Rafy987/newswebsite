import React, { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem("cookieConsent", "reject");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p style={styles.text}>
          We use cookies to improve your experience and analyze site traffic. Read our{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={styles.link}>
            Privacy Policy
          </a>.
        </p>
        <div style={styles.buttons}>
          <button style={{ ...styles.button, ...styles.accept }} onClick={acceptAll}>
            Accept All
          </button>
          <button style={{ ...styles.button, ...styles.reject }} onClick={rejectAll}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: "480px",
    backgroundColor: "#24292f",
    color: "#fff",
    borderRadius: "8px",
    padding: "20px 24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 9999,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: "15px",
    marginBottom: "16px",
    textAlign: "center",
    lineHeight: "1.4",
  },
  link: {
    color: "#58a6ff",
    textDecoration: "underline",
  },
  buttons: {
    display: "flex",
    gap: "12px",
  },
  button: {
    cursor: "pointer",
    borderRadius: "6px",
    padding: "8px 18px",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    transition: "background-color 0.3s ease",
  },
  accept: {
    backgroundColor: "#238636",
    color: "white",
  },
  reject: {
    backgroundColor: "#57606a",
    color: "white",
  },
};
