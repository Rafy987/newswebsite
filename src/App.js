import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import News from "./components/News";
import CookieConsent from "./components/CookieConsent";
import newsData from "./news.json";
import "./App.css";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("general");
  const [articles, setArticles] = useState([]);
  const [progress, setProgress] = useState(0);

  const location = useLocation();

  // Simulate page load progress on route change
  useEffect(() => {
    setProgress(30);
    const timer = setTimeout(() => {
      setProgress(70);
    }, 200);

    const completeTimer = setTimeout(() => {
      setProgress(100);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [location]);

  useEffect(() => {
    if (newsData?.articles?.length) {
      setArticles(newsData.articles);
    }
  }, []);

  return (
    <div className={darkMode ? "app dark-mode" : "app light-mode"}>
      {/* Top Loading Bar */}
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={3}
      />

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
                initialArticles={articles}
                setProgress={setProgress} // Optional if Home also controls progress
              />
            }
          />
          <Route path="/news" element={<News articles={articles} />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <CookieConsent />

      <footer
        className="py-5 border-top"
        style={{
          backgroundColor: darkMode ? "#1a2732" : "#f1f3f5",
          color: darkMode ? "#d1d9e6" : "#212529",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold mb-3">NewsHub</h5>
              <p>Your go-to source for the latest and most reliable news worldwide.</p>
            </div>
            <div className="col-md-3 mb-4">
              <h6 className="fw-semibold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="col-md-5">
              <h6 className="fw-semibold mb-3">Connect with Us</h6>
              <div className="mb-3">
                <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="me-3 fs-4">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="me-3 fs-4">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.linkedin.com/in/rafayminhas" target="_blank" rel="noopener noreferrer" className="me-3 fs-4">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
              <h6 className="fw-semibold mb-2">Contact Us</h6>
              <p>
                Email: <a href="mailto:contact@newshub.com">contact@newshub.com</a><br />
                Phone: <a href="tel:+923076777259">+92 3076777259</a>
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="d-flex justify-content-between flex-column flex-md-row align-items-center">
            <small>
              © {new Date().getFullYear()} <strong>NewsHub</strong> — Built with passion by Rafay Minhas
            </small>
            <div>
              <Link to="/privacy-policy" className="me-3">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
