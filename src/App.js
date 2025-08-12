import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import CookieConsent from "./components/CookieConsent";  // <-- import karo
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("general");

  return (
    <div className={darkMode ? "app dark-mode" : "app light-mode"}>
      <NavbarComponent
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setSearchQuery={setSearchQuery}
        setCategory={setCategory}
      />

      <main className="container my-4">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
                searchQuery={searchQuery}
                category={category}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <CookieConsent />  {/* <-- yahan show karenge cookie banner */}

     <footer
  className={`py-5 border-top`}
  style={{
    backgroundColor: darkMode ? "#1a2732" : "#f1f3f5", // Dark: deep blue-gray, Light: light gray
    color: darkMode ? "#d1d9e6" : "#212529",           // Text color adjust kar diya
  }}
>
  <div className="container">
    <div className="row">

      {/* About / Brand */}
      <div className="col-md-4 mb-4">
        <h5 className="fw-bold mb-3">NewsHub</h5>
        <p>Your go-to source for the latest and most reliable news worldwide. Stay informed with NewsHub!</p>
      </div>

      {/* Quick Links */}
      <div className="col-md-3 mb-4">
        <h6 className="fw-semibold mb-3">Quick Links</h6>
        <ul className="list-unstyled">
          <li><a href="/" className="text-decoration-none" style={{ color: darkMode ? "#a9c6e8" : "#0d6efd" }}>Home</a></li>
          <li><a href="/about" className="text-decoration-none" style={{ color: darkMode ? "#a9c6e8" : "#0d6efd" }}>About Us</a></li>
          <li><a href="/blog" className="text-decoration-none" style={{ color: darkMode ? "#a9c6e8" : "#0d6efd" }}>Blog</a></li>
          <li><a href="/contact" className="text-decoration-none" style={{ color: darkMode ? "#a9c6e8" : "#0d6efd" }}>Contact</a></li>
        </ul>
      </div>

      {/* Social + Contact */}
      <div className="col-md-5">
        <h6 className="fw-semibold mb-3">Connect with Us</h6>
        <div className="mb-3">
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className={`me-3 fs-4`}
            style={{ color: darkMode ? "#55acee" : "#1da1f2" }}
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className={`me-3 fs-4`}
            style={{ color: darkMode ? "#3b5998" : "#1877f2" }}
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/rafayminhas"
            target="_blank"
            rel="noopener noreferrer"
            className={`me-3 fs-4`}
            style={{ color: darkMode ? "#0a66c2" : "#0e76a8" }}
          >
            <i className="bi bi-linkedin"></i>
          </a>
        </div>

        <h6 className="fw-semibold mb-2">Contact Us</h6>
        <p>
          Email: <a href="mailto:contact@newshub.com" className="text-decoration-none" style={{ color: darkMode ? "#a9c6e8" : "#0d6efd" }}>contact@newshub.com</a><br />
          Phone: <a href="tel:+92 3076777259" className="text-decoration-none" style={{ color: darkMode ? "#a9c6e8" : "#0d6efd" }}>+92 3076777259</a>
        </p>
      </div>
    </div>

    <hr className={`my-4`} style={{ borderColor: darkMode ? "#3a5068" : "#dee2e6" }} />

    <div className="d-flex justify-content-between flex-column flex-md-row align-items-center">
      <small>
        © {new Date().getFullYear()} <strong>NewsHub</strong> — Built with passion by Rafay Minhas&nbsp;
        <span style={{ color: "#e25555" }}>⭐</span>
      </small>

      <div>
        <a
          href="/privacy-policy"
          className="text-decoration-none me-3"
          style={{ color: darkMode ? "#adb5bd" : "#6c757d" }}
        >
          Privacy Policy
        </a>
        <a
          href="/terms-of-service"
          className="text-decoration-none"
          style={{ color: darkMode ? "#adb5bd" : "#6c757d" }}
        >
          Terms of Service
        </a>
      </div>
    </div>
  </div>
</footer>



    </div>
  );
}

export default App;
