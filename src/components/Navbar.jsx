import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Calendar } from 'lucide-react';
import logo from '../assets/logo.svg';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Our Services' },
    { id: 'doctors', label: 'Doctors Team' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 100;
          transition: var(--transition-normal);
          background-color: transparent;
        }

        .navbar-header.scrolled {
          height: 70px;
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.5);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Brand Logo Styling */
        .navbar-logo {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .logo-img {
          height: 58px;
          width: auto;
          transition: var(--transition-normal);
        }

        .navbar-header.scrolled .logo-img {
          height: 48px;
          width: auto;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--secondary);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .brand-tagline {
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          align-items: center;
        }

        .nav-list {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          background: none;
          border: none;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-medium);
          cursor: pointer;
          position: relative;
          padding: 6px 0;
          transition: var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--secondary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary);
          transition: var(--transition-normal);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: var(--primary);
        }

        /* Action Button */
        .navbar-action {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-navbar {
          padding: 0.6rem 1.25rem;
          font-size: 0.9rem;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--secondary);
          cursor: pointer;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 80px;
          left: 0;
          width: 100%;
          height: 0;
          background-color: var(--bg-white);
          overflow: hidden;
          transition: var(--transition-normal);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border-bottom: 0 solid var(--border-color);
          z-index: 99;
        }

        .navbar-header.scrolled + .mobile-drawer,
        .navbar-header.scrolled .mobile-drawer {
          top: 70px;
        }

        .mobile-drawer.open {
          height: calc(100vh - 80px);
          border-bottom-width: 1px;
        }

        .navbar-header.scrolled .mobile-drawer.open {
          height: calc(100vh - 70px);
        }

        .mobile-nav {
          padding: 2rem 1.5rem;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .mobile-nav-link {
          background: none;
          border: none;
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--secondary);
          cursor: pointer;
          width: 100%;
          text-align: left;
          padding: 8px 0;
          transition: var(--transition-fast);
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--primary);
          padding-left: 8px;
        }

        .mobile-cta-li {
          margin-top: 1.5rem;
        }

        .mobile-cta-btn {
          width: 100%;
          padding: 0.85rem;
        }

        /* Responsive Rules */
        @media (max-width: 1024px) {
          .nav-list {
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .btn-navbar {
            display: none;
          }
          
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Brand Logo */}
          <div className="navbar-logo" onClick={() => handleNavClick('home')}>
            <img src="/logo_brand.png" alt="New Life Hospital Logo" className="logo-img" />
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.id} className="nav-item">
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`nav-link ${currentPage === link.id ? 'active' : ''}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Button */}
          <div className="navbar-action">
            <button onClick={() => handleNavClick('contact')} className="btn btn-primary btn-navbar">
              <Calendar size={18} />
              <span>Book Appointment</span>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-toggle" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.id} className="mobile-nav-item">
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`mobile-nav-link ${currentPage === link.id ? 'active' : ''}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="mobile-nav-item mobile-cta-li">
                <button 
                  onClick={() => handleNavClick('contact')} 
                  className="btn btn-primary mobile-cta-btn"
                >
                  <Calendar size={18} />
                  <span>Book Appointment</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
