import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Contact form submitted:", form);
      setSent(true);
      setLoading(false);
      
      // Reset form
      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSent(false), 5000);
    }, 1500);
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="display-4 mb-3">📧</div>
            <h1 className="mb-3">Contact NewsHub</h1>
            <p className="lead text-muted">
              Get in touch with our team. We'd love to hear from you!
            </p>
          </div>

          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h4 className="card-title mb-4">
                    <i className="bi bi-envelope me-2"></i>
                    Send us a Message
                  </h4>

                  {/* Success Message */}
                  {sent && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <i className="bi bi-check-circle me-2"></i>
                      <strong>Message sent successfully!</strong> We'll get back to you within 24 hours.
                      <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setSent(false)}
                      ></button>
                    </div>
                  )}

                  {/* Contact Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      {/* Name Field */}
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                          <i className="bi bi-person me-1"></i>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      {/* Email Field */}
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">
                          <i className="bi bi-envelope me-1"></i>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      {/* Subject Field */}
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label">
                          <i className="bi bi-tag me-1"></i>
                          Subject *
                        </label>
                        <select
                          className="form-select"
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose a subject...</option>
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="feedback">Feedback & Suggestions</option>
                          <option value="partnership">Partnership</option>
                          <option value="press">Press & Media</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Message Field */}
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">
                          <i className="bi bi-chat-dots me-1"></i>
                          Message *
                        </label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          rows="6"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us what's on your mind..."
                          required
                          style={{ resize: "vertical" }}
                        ></textarea>
                        <div className="form-text">
                          Minimum 10 characters required. ({form.message.length}/500)
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={loading || form.message.length < 10}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Sending...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send me-2"></i>
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-4">
              {/* Contact Details */}
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    <i className="bi bi-info-circle me-2"></i>
                    Contact Information
                  </h5>
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-geo-alt-fill text-primary me-3"></i>
                      <div>
                        <strong>Address</strong><br />
                        <small className="text-muted">
                          NewsHub Headquarters<br />
                          123 Media Street<br />
                          Digital City, DC 12345
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-telephone-fill text-success me-3"></i>
                      <div>
                        <strong>Phone</strong><br />
                        <small className="text-muted">
                          +1 (555) 123-4567<br />
                          Mon-Fri, 9AM-6PM EST
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-envelope-fill text-info me-3"></i>
                      <div>
                        <strong>Email</strong><br />
                        <small className="text-muted">
                          hello@newshub.com<br />
                          support@newshub.com
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-clock-fill text-warning me-3"></i>
                      <div>
                        <strong>Response Time</strong><br />
                        <small className="text-muted">
                          Usually within 24 hours<br />
                          Emergency: 2-4 hours
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <i className="bi bi-share me-2"></i>
                    Follow Us
                  </h5>
                  <div className="d-grid gap-2">
                    <a href="#" className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-facebook me-2"></i>
                      Facebook
                    </a>
                    <a href="#" className="btn btn-outline-info btn-sm">
                      <i className="bi bi-twitter me-2"></i>
                      Twitter
                    </a>
                    <a href="#" className="btn btn-outline-dark btn-sm">
                      <i className="bi bi-linkedin me-2"></i>
                      LinkedIn
                    </a>
                    <a href="#" className="btn btn-outline-danger btn-sm">
                      <i className="bi bi-instagram me-2"></i>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-question-circle display-6 text-muted mb-3"></i>
                  <h6>Frequently Asked Questions</h6>
                  <p className="small text-muted mb-3">
                    Find quick answers to common questions about NewsHub.
                  </p>
                  <a href="#" className="btn btn-outline-secondary btn-sm">
                    View FAQ
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card bg-light">
                <div className="card-body p-4">
                  <div className="row text-center">
                    <div className="col-md-4 mb-3">
                      <i className="bi bi-shield-check display-6 text-success mb-3"></i>
                      <h6>Privacy Protected</h6>
                      <small className="text-muted">
                        Your information is secure and never shared with third parties.
                      </small>
                    </div>
                    <div className="col-md-4 mb-3">
                      <i className="bi bi-lightning-charge display-6 text-primary mb-3"></i>
                      <h6>Quick Response</h6>
                      <small className="text-muted">
                        We respond to all inquiries within 24 hours or less.
                      </small>
                    </div>
                    <div className="col-md-4 mb-3">
                      <i className="bi bi-people display-6 text-info mb-3"></i>
                      <h6>Expert Support</h6>
                      <small className="text-muted">
                        Our experienced team is here to help with any questions.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;