import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          
          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold mb-3">📰 NewsHub</h4>
            <p className="text-muted">
              Your trusted source for real-time news updates and insightful articles.
              Stay connected, stay informed.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-decoration-none text-light">Home</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-decoration-none text-light">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/blog" className="text-decoration-none text-light">Blog</a>
              </li>
              <li>
                <a href="/contact" className="text-decoration-none text-light">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex">
              <a href="#" className="me-3 text-light fs-5"><FaFacebookF /></a>
              <a href="#" className="me-3 text-light fs-5"><FaTwitter /></a>
              <a href="#" className="me-3 text-light fs-5"><FaLinkedinIn /></a>
              <a href="#" className="text-light fs-5"><FaInstagram /></a>
            </div>
          </div>

        </div>
        <hr className="border-secondary" />
        <div className="text-center">
          <small className="text-muted">
            © {new Date().getFullYear()} NewsHub | Built with ❤️ using React & Bootstrap
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
