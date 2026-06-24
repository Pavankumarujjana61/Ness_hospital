import React, { useState } from 'react';
import { Phone, MapPin, Mail, Send, CheckCircle, Clock } from 'lucide-react';

export default function Contact() {
  const [formInputs, setFormInputs] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [inquiryStatus, setInquiryStatus] = useState(null); // 'success', 'error', null

  const handleInputChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formInputs.name || !formInputs.phone || !formInputs.message) {
      setInquiryStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formInputs.name,
          phone: formInputs.phone,
          email: formInputs.email,
          message: formInputs.message
        })
      });
      const data = await res.json();
      if (data.success) {
        setInquiryStatus('success');
        setFormInputs({ name: '', phone: '', email: '', message: '' });
      } else {
        setInquiryStatus('error');
      }
    } catch (err) {
      setInquiryStatus('error');
    }
    // Reset notification
    setTimeout(() => setInquiryStatus(null), 5000);
  };

  return (
    <>
      <style>{`
        /* Page Banner Header */
        .contact-banner-header {
          padding: 6.5rem 0 5rem 0;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .contact-banner-header h1 {
          font-size: 3rem;
          font-weight: 800;
          color: var(--bg-white);
          margin-top: 1rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .contact-banner-header p {
          color: var(--text-light);
          font-size: 1.15rem;
          max-width: 600px;
          line-height: 1.6;
        }

        /* Contact Grid Layout */
        .contact-grid {
          gap: 3rem;
          align-items: flex-start;
        }

        .contact-subtext {
          color: var(--text-medium);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        /* Info Cards */
        .info-cards-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-card {
          padding: 1.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-white);
          box-shadow: var(--card-shadow);
          display: flex;
          gap: 20px;
          align-items: flex-start;
          transition: var(--transition-normal);
        }

        .info-card:hover {
          transform: translateY(-4px);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .info-icon-box {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-icon-box.address { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .info-icon-box.phone { background: rgba(16, 185, 129, 0.1); color: var(--primary); }
        .info-icon-box.email { background: rgba(245, 158, 11, 0.1); color: var(--accent); }

        .info-card h4 {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 6px;
        }

        .info-card p {
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.4;
        }

        .phone-anchors {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-card a {
          color: var(--text-medium);
          font-size: 0.95rem;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .info-card a:hover {
          color: var(--primary);
        }

        .email-note {
          font-size: 0.85rem !important;
          color: var(--text-light) !important;
          margin-top: 4px;
        }

        /* Contact Form Card */
        .contact-form-card {
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: var(--bg-white);
          box-shadow: var(--card-shadow);
        }

        .form-card-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 8px;
        }

        .form-card-desc {
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-form textarea {
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          font-size: 0.95rem;
          outline: none;
          background-color: var(--bg-light);
          transition: var(--transition-fast);
          resize: vertical;
        }

        .contact-form textarea:focus {
          background-color: var(--bg-white);
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .btn-submit-message {
          height: 48px;
          margin-top: 1rem;
        }

        .inquiry-alert {
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .inquiry-alert.success {
          background-color: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .inquiry-alert.error {
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        /* Maps Section */
        .contact-map-section {
          padding-bottom: 6.5rem;
        }

        .map-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: var(--bg-white);
          box-shadow: var(--card-shadow);
        }

        .map-header {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 2rem;
        }

        .map-header h3 {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--secondary);
        }

        .map-header p {
          color: var(--text-medium);
          font-size: 0.95rem;
        }

        .map-iframe-wrapper {
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          border: 1px solid var(--border-color);
          width: 100%;
          height: 450px;
        }

        .map-iframe-wrapper iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* Responsive Overrides */
        @media (max-width: 1024px) {
          .contact-form-card {
            padding: 2rem;
          }
        }

        @media (max-width: 768px) {
          .contact-banner-header h1 {
            font-size: 2.2rem;
          }
          
          .contact-map-section {
            padding-bottom: 4rem;
          }

          .map-iframe-wrapper {
            height: 320px;
          }
        }
      `}</style>
      <div className="contact-page animate-fade-in">
        {/* Page Header */}
        <section className="contact-banner-header bg-navy-gradient text-white">
          <div className="container">
            <span className="badge">Get In Touch</span>
            <h1>Contact Us</h1>
            <p>We are here to help you. Reach out to our front desk for appointment assistance, pricing, or emergency help.</p>
          </div>
        </section>

        {/* Main Details & Form Section */}
        <section className="contact-body-section section-padding">
          <div className="container grid-2 contact-grid">

            {/* Contact details cards */}
            <div className="contact-details-cards">
              <span className="badge">Direct Channels</span>
              <h2 className="section-title">Reach Out Instantly</h2>
              <p className="contact-subtext">Our patient desk is available to assist you with emergency response or scheduling inquiries.</p>

              <div className="info-cards-list">
                {/* Address Card */}
                <div className="info-card glass-panel">
                  <div className="info-icon-box address">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4>Hospital Address</h4>
                    <p>Behind RTC Bus Stand,</p>
                    <p>Srinivas Theatres Road, Palakollu,</p>
                    <p>West Godavari, Andhra Pradesh - 534260</p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="info-card glass-panel">
                  <div className="info-icon-box phone">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4>Emergency & Inquiries</h4>
                    <div className="phone-anchors">
                      <a href="tel:+918143919199">Mobile: +91 81439 19199</a>
                      <a href="tel:08814220055">Landline: 08814 - 220055</a>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="info-card glass-panel">
                  <div className="info-icon-box email">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4>Email Support</h4>
                    <a href="mailto:info@newlifehospital.com" className="email-anchor">info@newlifehospital.com</a>
                    <p className="email-note">For general reports and careers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="contact-form-card glass-panel">
              <h3 className="form-card-title">Send Us a Message</h3>
              <p className="form-card-desc">Have a question or feedback? Write to us, and our team will get back to you within 24 hours.</p>

              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-input-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    value={formInputs.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formInputs.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="email">Email Address (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="yourname@example.com"
                    value={formInputs.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="message">Your Question or Symptoms</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us what you'd like to consult or ask..."
                    value={formInputs.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-submit-message">
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>

              {inquiryStatus === 'success' && (
                <div className="inquiry-alert success animate-fade-in">
                  <CheckCircle size={20} />
                  <span><strong>Message Sent!</strong> We will get in touch with you shortly.</span>
                </div>
              )}
              {inquiryStatus === 'error' && (
                <div className="inquiry-alert error animate-fade-in">
                  <span><strong>Missing Fields!</strong> Please fill out all required fields.</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Embedded Map Section */}
        <section className="contact-map-section">
          <div className="container">
            <div className="map-card glass-panel">
              <div className="map-header">
                <Clock size={20} className="text-primary" />
                <div>
                  <h3>Find Us on Google Maps</h3>
                  <p>Located centrally in Palakollu behind the RTC Bus Stand on Srinivas Theatres Road.</p>
                </div>
              </div>

              <div className="map-iframe-wrapper">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.241848308687!2d81.72701119999999!3d16.5138836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37dbaae637b73f%3A0x94e9af2b00980e17!2sNEW%20LIFE%20Emergency%20%26%20Super%20Speciality%20Hospital!5e0!3m2!1sen!2sin!4v1782274959390!5m2!1sen!2sin" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="New Life Hospital Google Maps Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
