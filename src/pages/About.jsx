import React from 'react';
import { Heart, Target, Star, Shield, ArrowRight, ShieldCheck, Users, Activity } from 'lucide-react';
import logo from '../assets/logo.svg';

export default function About({ setCurrentPage }) {
  const facilities = [
    { title: "Modular Operation Theaters", desc: "Three ultra-modern operation suites equipped with laminar airflow and advanced anesthesia workstations." },
    { title: "24/7 Emergency Services", desc: "Around-the-clock emergency doctors, fully equipped ICU beds, and rapid ambulance transport." },
    { title: "Super Specialty Consultants", desc: "Direct access to top-tier pediatricians, gynecologists, orthopedic surgeons, and laparoscopic specialists." },
    { title: "Smart Diagnostics & Imaging", desc: "Fully automated medical laboratory and high-resolution diagnostic imaging machines." }
  ];

  return (
    <>
      <style>{`
        /* Subpage Banner */
        .about-banner-header {
          padding: 8rem 0 6rem 0;
          text-align: center;
          background: radial-gradient(circle at 50% 50%, #0c1530 0%, #070b18 100%);
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .about-banner-header::before {
          content: '';
          position: absolute;
          width: 350px;
          height: 350px;
          background: var(--primary);
          filter: blur(140px);
          opacity: 0.12;
          top: -100px;
          left: -100px;
          border-radius: 50%;
          pointer-events: none;
        }

        .about-banner-header::after {
          content: '';
          position: absolute;
          width: 350px;
          height: 350px;
          background: #3b82f6;
          filter: blur(140px);
          opacity: 0.08;
          bottom: -150px;
          right: -50px;
          border-radius: 50%;
          pointer-events: none;
        }

        .about-banner-header h1 {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--bg-white);
          margin-top: 1rem;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .about-banner-header p {
          color: var(--text-light);
          font-size: 1.15rem;
          max-width: 650px;
          line-height: 1.6;
          margin: 0 auto;
        }

        /* Story Section */
        .story-grid {
          align-items: center;
          gap: 4rem;
        }

        .story-logo-card {
          height: 420px;
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.03);
        }

        .story-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-normal);
        }

        .story-logo-card:hover .story-image {
          transform: scale(1.05);
        }

        .hospital-year-badge {
          position: absolute;
          bottom: 24px;
          right: 24px;
          background-color: var(--secondary);
          color: var(--bg-white);
          padding: 6px 18px;
          border-radius: var(--radius-full);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(10, 17, 40, 0.15);
        }

        .story-text-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .story-p-highlight {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--secondary);
          line-height: 1.6;
          border-left: 4px solid var(--primary);
          padding-left: 1.25rem;
        }

        .story-p-body {
          font-size: 1rem;
          color: var(--text-medium);
          line-height: 1.7;
        }

        /* Stats Cards styling */
        .story-stats-inline {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          border-top: 1px solid var(--border-color);
          padding-top: 2.25rem;
          margin-top: 1.5rem;
        }

        .inline-stat {
          background: var(--bg-white);
          border: 1px solid var(--border-color);
          padding: 1.25rem 1rem;
          border-radius: var(--radius-md);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
          text-align: center;
          transition: var(--transition-normal);
        }

        .inline-stat:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.08);
        }

        .inline-stat h3 {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 6px;
        }

        .inline-stat span {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-medium);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Core Values (Mission, Vision, Promise) Grid */
        .values-grid {
          margin-top: 3rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .value-card {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-lg);
          padding: 3rem 2.25rem;
          transition: var(--transition-normal);
          position: relative;
          overflow: hidden;
        }

        .value-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: transparent;
          transition: var(--transition-normal);
        }

        .value-card:hover::before {
          background: linear-gradient(90deg, var(--primary) 0%, #3b82f6 100%);
        }

        .value-card:hover {
          background-color: rgba(255, 255, 255, 0.04);
          border-color: rgba(16, 185, 129, 0.25);
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        }

        .value-icon-wrapper {
          width: 54px;
          height: 54px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.75rem;
        }

        .value-icon-wrapper.mission { background: rgba(16, 185, 129, 0.12); color: var(--primary); }
        .value-icon-wrapper.vision { background: rgba(59, 130, 246, 0.12); color: #3b82f6; }
        .value-icon-wrapper.standards { background: rgba(245, 158, 11, 0.12); color: var(--accent); }

        .value-card h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--bg-white);
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .value-card p {
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        /* Facilities List */
        .facilities-grid {
          margin-top: 2.5rem;
          gap: 2rem;
        }

        .facility-card {
          padding: 2.25rem 2rem;
          border-radius: var(--radius-md);
          background: var(--bg-white);
          border: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
          display: flex;
          gap: 20px;
          align-items: flex-start;
          transition: var(--transition-normal);
        }

        .facility-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
          box-shadow: 0 12px 24px rgba(16, 185, 129, 0.08);
        }

        .facility-checkbox {
          background: var(--primary-glow);
          padding: 10px;
          border-radius: var(--radius-sm);
          flex-shrink: 0;
          color: var(--primary);
        }

        .facility-text h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .facility-text p {
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.6;
        }

        /* Call to Action Box */
        .about-cta-box {
          margin-top: 6rem;
          padding: 4.5rem 3rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.7);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: var(--glass-shadow);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          position: relative;
          overflow: hidden;
        }

        .about-cta-box::before {
          content: '';
          position: absolute;
          width: 150px;
          height: 150px;
          background: var(--primary-glow);
          filter: blur(50px);
          top: -75px;
          left: -75px;
          border-radius: 50%;
          pointer-events: none;
        }

        .about-cta-box h3 {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--secondary);
          letter-spacing: -0.02em;
        }

        .about-cta-box p {
          font-size: 1.1rem;
          color: var(--text-medium);
          max-width: 550px;
          line-height: 1.5;
        }

        .about-cta-box button {
          margin-top: 1rem;
        }

        /* Responsive Overrides */
        @media (max-width: 1024px) {
          .story-grid {
            gap: 2rem;
          }
          
          .story-logo-card {
            height: 340px;
          }
          
          .story-large-logo {
            width: 110px;
            height: 110px;
          }

          .values-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .about-banner-header h1 {
            font-size: 2.5rem;
          }
          
          .story-stats-inline {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          
          .about-cta-box {
            padding: 3rem 1.5rem;
          }
          
          .about-cta-box h3 {
            font-size: 1.4rem;
          }
        }
      `}</style>
      <div className="about-page animate-fade-in">
        {/* Subpage Banner Header */}
        <section className="about-banner-header bg-navy-gradient text-white">
          <div className="container">
            <span className="badge">Who We Are</span>
            <h1>About Our Hospital</h1>
            <p>Learn about our commitment to medical excellence, compassionate healing, and advanced technologies.</p>
          </div>
        </section>

        {/* Main Story Section */}
        <section className="about-story-section section-padding">
          <div className="container grid-2 story-grid">
            {/* Image Side */}
            <div className="story-logo-card glass-panel">
              <img src="/hospital_building.png" alt="New Life Hospital Building" className="story-image" />
              <div className="hospital-year-badge">Est. 2026</div>
            </div>

            {/* Description Text Side */}
            <div className="story-text-wrapper">
              <span className="badge">Our Story</span>
              <h2 className="section-title">We are Dedicated to Giving a "New Life"</h2>
              <p className="story-p-highlight">
                New Life Emergency & Super Specialty Hospital Palakollu is committed to providing state-of-the-art medical facilities and giving a new lease on life to every patient.
              </p>
              <p className="story-p-body">
                We stand at the forefront of improving patient health by combining exceptional medical services, a team of talented medical experts, and advanced diagnostic technologies. Our focus is to deliver highly accessible healthcare to Palakollu and neighboring regions without compromising on clinical standards or patient safety.
              </p>
              <div className="story-stats-inline">
                <div className="inline-stat">
                  <h3>50+</h3>
                  <span>Inpatient Beds</span>
                </div>
                <div className="inline-stat">
                  <h3>10+</h3>
                  <span>Super Specialists</span>
                </div>
                <div className="inline-stat">
                  <h3>24/7</h3>
                  <span>Emergency Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Standards */}
        <section className="about-core-values-section section-padding bg-navy-gradient text-white">
          <div className="container">
            <div className="section-title-wrapper text-center">
              <span className="badge">Guided by Principles</span>
              <h2 className="section-title text-white">Mission, Vision & Standards</h2>
              <p className="section-subtitle text-light">Our core values drive every treatment and patient interaction in our hospital.</p>
            </div>

            <div className="values-grid">
              {/* Mission Card */}
              <div className="value-card">
                <div className="value-icon-wrapper mission">
                  <Target size={26} />
                </div>
                <h3>Our Mission</h3>
                <p>
                  To provide the highest quality medical services to patients, improving their health and overall well-being. We offer personalized clinical attention, care, and dedication to every individual who walks through our doors.
                </p>
              </div>

              {/* Vision Card */}
              <div className="value-card">
                <div className="value-icon-wrapper vision">
                  <ShieldCheck size={26} />
                </div>
                <h3>Our Vision</h3>
                <p>
                  To build a healthier society by establishing the region's most accessible, reliable, and advanced healthcare destination. We strive to be the trusted beacon of healing in Palakollu.
                </p>
              </div>

              {/* Promise Card */}
              <div className="value-card">
                <div className="value-icon-wrapper standards">
                  <Star size={26} />
                </div>
                <h3>Our Standards</h3>
                <p>
                  Adhering to strict safety protocols, high hygiene standards, and prioritizing rapid emergency response times. Patients' health is our top priority, and their returning smiles reflect our success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="about-facilities-section section-padding">
          <div className="container">
            <div className="section-title-wrapper text-center">
              <span className="badge">State-Of-The-Art Systems</span>
              <h2 className="section-title">Clinical Facilities</h2>
              <p className="section-subtitle">Our hospital features modern infrastructure designed to facilitate optimal patient recovery.</p>
            </div>

            <div className="grid-2 facilities-grid">
              {facilities.map((fac, index) => (
                <div key={index} className="facility-card glass-panel">
                  <div className="facility-checkbox">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="facility-text">
                    <h3>{fac.title}</h3>
                    <p>{fac.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-cta-box glass-panel text-center">
              <h3>Do you want to book a consultation with our specialty doctors?</h3>
              <p>Select a specialist from our online directory and secure your slot instantly.</p>
              <button onClick={() => setCurrentPage('doctors')} className="btn btn-primary">
                <span>View Doctors Directory</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
