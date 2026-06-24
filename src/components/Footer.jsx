import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import logo from '../assets/logo.svg';

export default function Footer({ setCurrentPage }) {
  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        .hospital-footer {
          padding-top: 5rem;
          color: var(--text-light);
          font-size: 0.95rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr 1.5fr;
          gap: 3rem;
          padding-bottom: 4rem;
        }

        /* Brand Column Styles */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .footer-logo-img {
          height: 58px;
          width: auto;
        }

        .footer-logo-text {
          display: flex;
          flex-direction: column;
        }

        .footer-brand-name {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--bg-white);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .footer-brand-tagline {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-desc {
          color: var(--text-light);
          line-height: 1.6;
        }

        .footer-socials {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .social-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background-color: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--bg-white);
          transition: var(--transition-normal);
        }

        .social-icon-btn:hover {
          background-color: var(--primary);
          transform: translateY(-3px);
          color: var(--bg-white);
        }

        /* Links & Title */
        .footer-title {
          color: var(--bg-white);
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 10px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 3px;
          background-color: var(--primary);
          border-radius: var(--radius-full);
        }

        .footer-links-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-links-list button {
          background: none;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          text-align: left;
          padding: 0;
          transition: var(--transition-fast);
        }

        .footer-links-list button:hover {
          color: var(--primary);
          padding-left: 6px;
        }

        /* Contact Column */
        .footer-contact-col {
          display: flex;
          flex-direction: column;
        }

        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-item {
          display: flex;
          gap: 14px;
          line-height: 1.5;
        }

        .contact-icon {
          flex-shrink: 0;
          margin-top: 3px;
          color: var(--primary);
        }

        .phone-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-contact-list a {
          color: var(--text-light);
          transition: var(--transition-fast);
        }

        .footer-contact-list a:hover {
          color: var(--primary);
        }

        /* Bottom Bar */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.5rem 0;
          font-size: 0.85rem;
        }

        .footer-bottom-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright-text {
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
        }

        .copyright-text strong {
          color: #ffffff;
          font-weight: 700;
        }

        .gold-bullet {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle at 35% 35%, #fff3bf 0%, #fcc419 50%, #e67e22 100%);
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(252, 196, 25, 0.5);
        }

        .credit-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .credit-link:hover {
          color: #60a5fa;
          text-decoration: underline;
        }

        .footer-bottom-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-portal-link {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          font-size: 0.85rem;
          padding: 0;
          transition: var(--transition-fast);
        }

        .admin-portal-link:hover {
          color: var(--primary);
        }

        .footer-divider {
          color: rgba(255, 255, 255, 0.1);
          font-size: 0.85rem;
        }

        /* Responsive Rules */
        @media (max-width: 1024px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem 2rem;
          }
        }

        @media (max-width: 640px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding-bottom: 3rem;
          }
          
          .footer-bottom-flex {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
      <footer className="hospital-footer bg-navy-gradient text-light">
        <div className="container footer-top-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-logo" onClick={() => handleNavClick('home')}>
              <img src="/logo_brand.png" alt="New Life Hospital Logo" className="footer-logo-img" />
            </div>
            <p className="footer-desc">
              New Life Emergency & Super Specialty Hospital Palakollu is committed to providing state-of-the-art medical facilities, advanced technologies, and highly qualified doctor experts to safeguard your health 24/7.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => handleNavClick('home')}>Home Page</button></li>
              <li><button onClick={() => handleNavClick('about')}>About Hospital</button></li>
              <li><button onClick={() => handleNavClick('doctors')}>Doctors Team</button></li>
              <li><button onClick={() => handleNavClick('contact')}>Contact Us</button></li>
            </ul>
          </div>

          {/* Specialties Column */}
          <div className="footer-links-col">
            <h4 className="footer-title">Our Specialties</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => handleNavClick('services')}>Gynecology & Obstetrics</button></li>
              <li><button onClick={() => handleNavClick('services')}>General & Laparoscopic Surgery</button></li>
              <li><button onClick={() => handleNavClick('services')}>General Medicine</button></li>
              <li><button onClick={() => handleNavClick('services')}>Orthopedics & Joint Replacement</button></li>
              <li><button onClick={() => handleNavClick('services')}>Pediatrics & Neonatology</button></li>
              <li><button onClick={() => handleNavClick('services')}>Emergency & Critical Care</button></li>
              <li><button onClick={() => handleNavClick('services')}>Psychiatry & Mental Health</button></li>
              <li><button onClick={() => handleNavClick('services')}>Oncology & Cancer Care</button></li>
              <li><button onClick={() => handleNavClick('services')}>Gastroenterology & Gastric Care</button></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="footer-contact-col">
            <h4 className="footer-title">Contact Details</h4>
            <ul className="footer-contact-list">
              <li className="contact-item">
                <MapPin size={22} className="contact-icon text-primary" />
                <span>Behind RTC Bus Stand, Srinivas Theatres Road, Palakollu, West Godavari - 534260</span>
              </li>
              <li className="contact-item">
                <Phone size={18} className="contact-icon text-primary" />
                <div className="phone-links">
                  <a href="tel:+918143919199">+91 81439 19199</a>
                  <a href="tel:08814220055">08814 - 220055</a>
                </div>
              </li>
              <li className="contact-item">
                <Mail size={18} className="contact-icon text-primary" />
                <a href="mailto:info@newlifehospital.com">info@newlifehospital.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom bar */}
        <div className="footer-bottom">
          <div className="container footer-bottom-flex">
            <p className="copyright-text">
              <span className="gold-bullet"></span>
              <span>
                Copyright 2026 © <strong>Ness Hospital</strong> Designed & Developed By{' '}
                <a href="https://sunraisesolutions.com/" target="_blank" rel="noopener noreferrer" className="credit-link">
                  Sunraise Solutions
                </a>.
              </span>
            </p>
            <div className="footer-bottom-right">
              <button onClick={() => handleNavClick('admin')} className="admin-portal-link">
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
