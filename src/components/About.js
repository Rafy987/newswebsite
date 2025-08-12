import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function About({ darkMode }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // har child ke animation me 0.3 sec gap
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className={`container my-4 ${darkMode ? "text-light" : "text-dark"}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* Main About Card */}
          <motion.div
            className={`card shadow-sm mb-4 ${darkMode ? "bg-dark" : ""}`}
            variants={itemVariants}
          >
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <span role="img" aria-label="news" className="display-4 mb-3">
                  🗞️
                </span>
                <h1 className="card-title mb-3">About NewsHub</h1>
                <p className="lead text-muted">
                  Your trusted source for fresh, styled, and comprehensive news coverage
                </p>
              </div>

              <hr className="my-4" />

              <p className="text-muted">
                NewsHub is a modern, responsive news website demo built with cutting-edge web technologies. 
                We demonstrate the perfect blend of functionality and aesthetics, delivering news in an engaging and user-friendly interface.
              </p>
              <p className="text-muted">
                Our platform showcases how modern web development can transform the way people consume news. 
                With real-time updates, intelligent categorization, and seamless user experience, NewsHub represents the future of digital journalism.
              </p>

              <h4 className="mb-3 mt-4">✨ Key Features</h4>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i> Real news from NewsAPI</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i> Advanced search</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i> Smart category filtering</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i> Dark/Light mode</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i> Responsive design</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i> Fast loading</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i> Card-based layout</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2"></i> Mobile-first</li>
                  </ul>
                </div>
              </div>

              <h4 className="mb-3 mt-4">⚡ Technology Stack</h4>
              <div className="row">
                <div className="col-md-4">
                  <div className="text-center p-3 bg-light rounded mb-3">
                    <div className="h5 text-primary">Frontend</div>
                    <small className="text-muted">React.js<br />React Router<br />Bootstrap 5</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-3 bg-light rounded mb-3">
                    <div className="h5 text-success">Styling</div>
                    <small className="text-muted">Custom CSS<br />Bootstrap Components<br />Responsive Design</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-3 bg-light rounded mb-3">
                    <div className="h5 text-warning">API</div>
                    <small className="text-muted">NewsAPI<br />REST Integration<br />Real-time Data</small>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            className={`card shadow-sm mb-4 ${darkMode ? "bg-dark" : ""}`}
            variants={itemVariants}
          >
            <div className="card-body">
              <h4 className="card-title mb-4">📊 Platform Statistics</h4>
              <div className="row text-center">
                <div className="col-md-3 col-6 mb-3">
                  <div className="h3 text-primary mb-1">7</div>
                  <small className="text-muted">News Categories</small>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div className="h3 text-success mb-1">100+</div>
                  <small className="text-muted">Daily Articles</small>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div className="h3 text-warning mb-1">24/7</div>
                  <small className="text-muted">Live Updates</small>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div className="h3 text-info mb-1">∞</div>
                  <small className="text-muted">Possibilities</small>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className={`card shadow-sm ${darkMode ? "bg-dark" : ""}`}
            variants={itemVariants}
          >
            <div className="card-body">
              <h4 className="card-title mb-3">🎯 Our Mission</h4>
              <blockquote className="blockquote">
                <p className="mb-3">
                  "To demonstrate how modern web technologies can create exceptional 
                  user experiences while delivering reliable, fast, and accessible news content to users worldwide."
                </p>
                <footer className="blockquote-footer">NewsHub Development Team</footer>
              </blockquote>

              <div className="mt-4 p-3 bg-primary bg-opacity-10 rounded">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h6 className="mb-1">Ready to explore more?</h6>
                    <small className="text-muted">
                      Check out our latest articles and stay updated with world news.
                    </small>
                  </div>
                  <div className="col-md-4 text-md-end mt-2 mt-md-0">
                    <Link to="/" className="btn btn-success">
                      Browse News
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

export default About;
