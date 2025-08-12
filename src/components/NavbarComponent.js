import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const CATEGORIES = [
  "general",
  "technology", 
  "business",
  "sports",
  "health",
  "science",
  "entertainment"
];

function NavbarComponent({ darkMode, setDarkMode, setSearchQuery, setCategory }) {
  const [localSearch, setLocalSearch] = useState("");
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate("/");
  };

  const selectCategory = (cat) => {
    setCategory(cat);
    setSearchQuery("");
    navigate("/");
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg sticky-top ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
      } shadow-sm`}
    >
      <div className="container">
        
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span style={{ fontSize: 22, marginRight: 8 }}>🗞️</span>
          <div>
            <div style={{ fontWeight: 700 }}>NewsHub</div>
            <small className="text-muted" style={{ fontSize: 11 }}>
              Fresh & Styled
            </small>
          </div>
        </Link>

        {/* Mobile toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navCollapse"
          aria-controls="navCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible */}
        <div className="collapse navbar-collapse" id="navCollapse">

          {/* Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <span 
                className="nav-link dropdown-toggle" 
                id="categoriesDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Categories
              </span>
              <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <span 
                      className="dropdown-item" 
                      style={{ cursor: "pointer" }}
                      onClick={() => selectCategory(c)}
                    >
                      {c[0].toUpperCase() + c.slice(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>

          {/* Search */}
          <form 
            className="d-flex align-items-center me-3 flex-wrap" 
            onSubmit={onSearchSubmit}
          >
            <input
              className={`form-control form-control-sm me-2 mb-2 mb-lg-0 ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
              style={{ width: "auto", minWidth: "200px" }}
              placeholder="Search news..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <button className="btn btn-primary btn-sm" type="submit">
              Search
            </button>
          </form>

          {/* Dark mode toggle */}
          <button
            className={`btn btn-sm ${
              darkMode ? "btn-light" : "btn-outline-dark"
            }`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
