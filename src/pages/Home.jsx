import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Activity, ShieldCheck, Heart, Users, ArrowRight, Star, Clock, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import bannerImg from '../assets/hospital_banner.png';


const HomeStyles = () => (
  <style>{`
/* Section Padding helper */
.section-padding {
  padding: 6.5rem 0;
}

@media (max-width: 768px) {
  .section-padding {
    padding: 4rem 0;
  }
}

/* Hero Slider Styles */
.hero-slider-section {
  position: relative;
  height: 640px;
  width: 100%;
  overflow: hidden;
  background-color: var(--navy-dark);
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  transition: opacity 1s ease-in-out;
  display: flex;
  align-items: center;
  /* Add beautiful default abstract background colors to look premium */
  background: radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, rgba(10, 17, 40, 1) 100%);
}

.hero-slide.active {
  opacity: 1;
  z-index: 2;
}

.hero-slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(10, 17, 40, 0.95) 0%, rgba(10, 17, 40, 0.7) 50%, rgba(10, 17, 40, 0.3) 100%);
  z-index: 2;
}

.hero-slide-content {
  position: relative;
  z-index: 3;
  width: 100%;
}

.hero-text-wrapper {
  max-width: 650px;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-badge {
  display: inline-block;
  color: var(--primary);
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1.25rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--bg-white);
  line-height: 1.15;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1.15rem;
  color: var(--text-light);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.btn-hero-call {
  color: var(--bg-white);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-hero-call:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: var(--bg-white);
}

/* Slider Dots */
.slide-dots {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.slide-dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
}

.slide-dot.active {
  background-color: var(--primary);
  width: 32px;
}

/* Quick Appointment Overlap Widget */
.quick-appointment-container {
  margin-top: -80px;
  position: relative;
  z-index: 20;
}

.appointment-glass-card {
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.85);
}

.appointment-card-header {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 2rem;
}

.calendar-icon {
  background: var(--primary-glow);
  padding: 12px;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.appointment-card-header h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--secondary);
}

.appointment-card-header p {
  color: var(--text-medium);
  font-size: 0.95rem;
}

.appointment-form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 16px;
  align-items: flex-end;
}

.form-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-input-group label {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input-group input,
.form-input-group select {
  height: 48px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--bg-white);
  color: var(--text-dark);
  font-size: 0.95rem;
  outline: none;
  transition: var(--transition-fast);
  width: 100%;
}

.form-input-group input:focus,
.form-input-group select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.form-submit-wrapper {
  width: 100%;
}

.btn-submit-appointment {
  height: 48px;
  width: 100%;
  white-space: nowrap;
}

/* Appointment Form Status Messages */
.notification {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
}

.notification.success {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.notification.error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

/* Section Titles styling */
.section-title-wrapper {
  margin-bottom: 4rem;
}

.section-title-wrapper.text-center {
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-top: 1rem;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-medium);
  max-width: 600px;
  margin: 0 auto;
}

/* Stats Cards */
.stats-grid {
  margin-top: 2rem;
}

.stat-card {
  padding: 2.5rem 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: var(--transition-normal);
  background: var(--bg-white);
  box-shadow: var(--card-shadow);
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 50px rgba(15, 23, 42, 0.08);
  border-color: rgba(16, 185, 129, 0.2);
}

.stat-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.stat-icon-wrapper.emergency { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.stat-icon-wrapper.beds { background: rgba(16, 185, 129, 0.1); color: var(--primary); }
.stat-icon-wrapper.doctors { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.stat-icon-wrapper.ot { background: rgba(245, 158, 11, 0.1); color: var(--accent); }

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 4px;
}

.stat-label {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--secondary);
  margin-bottom: 12px;
}

.stat-desc {
  font-size: 0.9rem;
  color: var(--text-medium);
  line-height: 1.5;
}

/* Specialties Section */
.specialties-grid {
  margin-top: 1.5rem;
}

.specialty-card {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 2.5rem 2rem;
  transition: var(--transition-normal);
}

.specialty-card:hover {
  background-color: rgba(255, 255, 255, 0.06);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-5px);
}

.specialty-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.25rem;
}

.specialty-bullet {
  width: 8px;
  height: 8px;
  background-color: var(--primary);
  border-radius: var(--radius-full);
}

.specialty-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--bg-white);
}

.specialty-desc {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  min-height: 72px;
}

.specialty-link-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0;
  transition: var(--transition-fast);
}

.specialty-link-btn:hover {
  color: var(--bg-white);
}

.specialty-link-btn svg {
  transition: var(--transition-fast);
}

.specialty-link-btn:hover svg {
  transform: translateX(4px);
}

/* Featured Doctors Section */
.section-title-wrapper-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
}

.doctors-row {
  margin-top: 1rem;
}

@keyframes docCardFadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.doc-card-animated {
  opacity: 0;
  animation: docCardFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.doctor-featured-card {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  padding: 1.75rem;
  background: var(--bg-white);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--card-shadow);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.doctor-featured-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(16, 185, 129, 0.08);
  border-color: var(--primary);
}

.doc-avatar-placeholder {
  height: 220px;
  background: linear-gradient(135deg, var(--navy-medium) 0%, var(--navy-dark) 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.doc-avatar-placeholder img {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.doctor-featured-card:hover .doc-avatar-placeholder img {
  transform: scale(1.08);
}

.doc-initials {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.15);
}

.doc-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.doc-badge-specialty {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(16, 185, 129, 0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--bg-white);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  box-shadow: 0 4px 12px rgba(10, 17, 40, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  z-index: 2;
}

.doctor-featured-card:hover .doc-badge-specialty {
  background: var(--primary);
  transform: translateY(-2px);
}

.doc-rating {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 10px;
}

.doc-rating svg {
  color: #f59e0b;
}

.doc-rating span {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-medium);
  margin-left: 6px;
  background: var(--bg-light);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-color);
}

.doc-name {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 6px;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.doctor-featured-card:hover .doc-name {
  color: var(--primary);
}

.doc-qualifications {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-medium);
  margin-bottom: 1.25rem;
  min-height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.doc-details-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 0.85rem 0;
  margin-bottom: 1.25rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--text-medium);
  font-weight: 600;
}

.detail-item svg {
  color: var(--primary);
}

/* Pulsing Presence Dots */
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
}

.status-dot.available {
  background-color: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.status-dot.available::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #10b981;
  animation: pulse-dot 1.8s infinite ease-in-out;
  top: 0;
  left: 0;
}

.status-dot.unavailable {
  background-color: #f59e0b;
  box-shadow: 0 0 8px #f59e0b;
}

.status-dot.unavailable::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f59e0b;
  animation: pulse-dot-orange 1.8s infinite ease-in-out;
  top: 0;
  left: 0;
}

@keyframes pulse-dot {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}

@keyframes pulse-dot-orange {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}

.btn-book-doc {
  width: 100%;
  padding: 0.8rem;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
  border-radius: var(--radius-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--primary);
  color: var(--bg-white);
  border: none;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.btn-book-doc:hover {
  background-color: var(--primary-hover);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
  transform: translateY(-2px);
}

.btn-book-doc::after {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transform: skewX(-25deg);
  transition: 0.75s ease;
  opacity: 0;
  z-index: -1;
}

.btn-book-doc:hover::after {
  left: 125%;
  opacity: 1;
}

.btn-book-doc svg {
  transition: transform 0.3s ease;
}

.btn-book-doc:hover svg {
  transform: scale(1.1);
}

/* Call to Action Banner */
.cta-banner-section {
  padding: 4.5rem 0;
  position: relative;
}

.cta-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.cta-text h2 {
  font-size: 2.2rem;
  color: var(--bg-white);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.cta-text p {
  color: var(--text-light);
  font-size: 1.1rem;
  max-width: 600px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-shrink: 0;
}

.cta-btn-call {
  background-color: var(--primary);
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
}

.cta-btn-call:hover {
  background-color: var(--primary-hover);
}

.border-white {
  border-color: rgba(255, 255, 255, 0.3) !important;
}

.border-white:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: var(--bg-white) !important;
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .appointment-form-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .form-submit-wrapper {
    grid-column: span 2;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .hero-slider-section {
    height: 520px;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .btn-hero-call {
    width: 100%;
    justify-content: center;
  }
  
  .slide-dots {
    bottom: 150px;
  }
  
  .quick-appointment-container {
    margin-top: -120px;
  }
  
  .appointment-glass-card {
    padding: 1.5rem;
  }
  
  .appointment-form-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .form-submit-wrapper {
    grid-column: span 1;
  }
  
  .section-title-wrapper-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .btn-view-all {
    width: 100%;
  }
  
  .cta-flex {
    flex-direction: column;
    text-align: center;
  }
  
  .cta-buttons {
    width: 100%;
    flex-direction: column;
    gap: 12px;
  }
  
  .cta-buttons a,
  .cta-buttons button {
    width: 100%;
  }
}

/* Welcome Story Section styling */
.welcome-story-section {
  background: var(--bg-white);
  border-bottom: 1px solid var(--border-color);
}

.welcome-story-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
}

.welcome-story-content {
  text-align: left;
}

.welcome-story-content .badge {
  margin-bottom: 1rem;
}

.welcome-story-content h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--secondary);
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.welcome-story-content p {
  color: var(--text-medium);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.welcome-features-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 2.25rem;
}

.welcome-feature-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.welcome-feature-icon {
  color: var(--primary);
  background: var(--primary-glow);
  padding: 8px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.welcome-feature-text h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 4px;
}

.welcome-feature-text p {
  font-size: 0.85rem;
  color: var(--text-medium);
  margin: 0;
  line-height: 1.4;
}

.welcome-story-media {
  position: relative;
  display: flex;
  justify-content: center;
}

.welcome-media-collage {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 480px;
}

.collage-img-main {
  width: 85%;
  height: 80%;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--card-shadow);
  border: 4px solid var(--bg-white);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.collage-card-overlay {
  position: absolute;
  bottom: 5%;
  right: 0;
  width: 60%;
  background: var(--navy-dark);
  color: var(--bg-white);
  padding: 1.75rem;
  border-radius: var(--radius-md);
  box-shadow: 0 20px 40px rgba(10, 17, 40, 0.2);
  z-index: 3;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
}

.collage-card-overlay h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--bg-white);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.collage-card-overlay p {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.4;
  margin: 0;
}

.collage-bg-glow {
  position: absolute;
  top: 10%;
  right: 10%;
  width: 250px;
  height: 250px;
  background: var(--primary-glow);
  filter: blur(80px);
  border-radius: 50%;
  z-index: 1;
}

/* Gallery Showcase styling */
.gallery-section {
  background: var(--bg-light);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 1.5rem;
}

.gallery-card {
  position: relative;
  height: 280px;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
  background: var(--navy-dark);
  cursor: pointer;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-card:hover .gallery-img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(10, 17, 40, 0.9) 0%, rgba(10, 17, 40, 0.4) 60%, rgba(10, 17, 40, 0) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  text-align: left;
  z-index: 2;
}

.gallery-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.gallery-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--bg-white);
  margin: 0;
}

/* Testimonials section styling */
.testimonials-section {
  background: var(--bg-white);
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
}

.testimonials-carousel-container {
  position: relative;
  max-width: 900px;
  margin: 2.5rem auto 0 auto;
  padding: 0 4rem;
}

.testimonials-track-wrapper {
  overflow: hidden;
  width: 100%;
}

.testimonials-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

.testimonial-slide {
  min-width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.testimonial-card {
  position: relative;
  padding: 3.5rem 3rem;
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--card-shadow);
  transition: var(--transition-normal);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250px;
  overflow: hidden;
}

.testimonial-card::after {
  content: '"';
  position: absolute;
  top: -20px;
  right: 25px;
  font-size: 12rem;
  font-family: serif;
  color: rgba(16, 185, 129, 0.04);
  line-height: 1;
  pointer-events: none;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
}

.testimonial-text {
  font-size: 1.25rem;
  color: var(--secondary);
  line-height: 1.7;
  font-weight: 500;
  font-style: italic;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 1rem;
}

.author-initial {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
  color: var(--bg-white);
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
}

.author-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--secondary);
}

.author-location {
  font-size: 0.85rem;
  color: var(--text-light);
  font-weight: 500;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  color: var(--secondary);
  width: 46px;
  height: 46px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--card-shadow);
  transition: var(--transition-fast);
  z-index: 10;
}

.carousel-btn:hover {
  background: var(--primary);
  color: var(--bg-white);
  border-color: var(--primary);
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.25);
}

.carousel-btn.prev {
  left: 0;
}

.carousel-btn.next {
  right: 0;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 2rem;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--border-color);
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
  padding: 0;
}

.carousel-dot.active {
  background: var(--primary);
  width: 24px;
}

/* Insurance section styling */
.insurance-partners-section {
  background: var(--bg-light);
  border-bottom: 1px solid var(--border-color);
  padding: 4.5rem 0;
}

.insurance-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
  margin-top: 2rem;
}

.insurance-partner-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 1rem 2rem;
  font-weight: 800;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--text-medium);
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  transition: var(--transition-fast);
  cursor: default;
}

.insurance-partner-card:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: scale(1.05);
}

/* FAQ section styling */
.faq-section {
  background: var(--bg-white);
}

.faq-list {
  max-width: 800px;
  margin: 2.5rem auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: var(--transition-fast);
  background: var(--bg-white);
}

.faq-question-btn {
  width: 100%;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--secondary);
  cursor: pointer;
  text-align: left;
  transition: var(--transition-fast);
}

.faq-question-btn:hover {
  background-color: var(--bg-light);
  color: var(--primary);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  background-color: var(--bg-light);
  font-size: 0.95rem;
  color: var(--text-medium);
  line-height: 1.6;
  text-align: left;
}

.faq-item.active .faq-answer {
  max-height: 200px;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

.faq-icon {
  transition: transform 0.3s ease;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
  color: var(--primary);
}

/* Media Query overrides for new elements */
@media (max-width: 1024px) {
  .welcome-story-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .welcome-story-media {
    order: -1;
  }
  
  .welcome-media-collage {
    height: 380px;
    max-width: 100%;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .welcome-story-content h2 {
    font-size: 2rem;
  }
  
  .welcome-features-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .testimonials-carousel-container {
    padding: 0 1.5rem;
  }

  .carousel-btn {
    display: none;
  }

  .testimonial-card {
    padding: 2.25rem 1.75rem;
    min-height: 280px;
  }

  .testimonial-text {
    font-size: 1.05rem;
  }
  
  .collage-card-overlay {
    padding: 1rem;
    width: 70%;
  }
}

/* Location Map Section Styles */
.home-map-section {
  background-color: var(--bg-white);
  border-top: 1px solid var(--border-color);
}

.home-map-card {
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--bg-white);
  box-shadow: var(--card-shadow);
}

.home-map-iframe-wrapper {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color);
  width: 100%;
  height: 450px;
}

.home-map-iframe-wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 768px) {
  .home-map-card {
    padding: 1.25rem;
  }
  
  .home-map-iframe-wrapper {
    height: 320px;
  }
}
  `}</style>
);

const defaultTestimonials = [
  {
    id: 'default-1',
    patient_name: "Ravi Kumar",
    location: "Palakollu",
    rating: 5,
    comment: "The pediatric care under Dr. Varma is outstanding. My 2-year-old was admitted with severe asthma, and the quick response and care saved us. Highly recommended!"
  },
  {
    id: 'default-2',
    patient_name: "Siri Latha",
    location: "Narasapuram",
    rating: 5,
    comment: "Dr. Raghavi is an exceptional gynecologist. The maternity department at New Life is very hygienic and supportive. We had our first child here, and the staff was like family."
  },
  {
    id: 'default-3',
    patient_name: "Venkatesh Rao",
    location: "Bhimavaram",
    rating: 5,
    comment: "My father underwent knee replacement surgery under Dr. Ramakrishna Reddy. The modular OT facilities and post-op physiotherapy were excellent. He is walking comfortably now."
  }
];

const defaultSlides = [
  {
    id: 'default-1',
    title: "Your Health, Our Responsiblity",
    subtitle: "New Life Emergency & Super Specialty Hospital",
    description: "Delivering advanced medical care, prompt emergency services, and compassionate healing to Palakollu.",
    cta: "Meet Our Team",
    image: "/hero_caring_doctors.png"
  },
  {
    id: 'default-2',
    title: "State-of-the-Art Surgical Tech",
    subtitle: "3 Ultra-Modern Operation Theaters",
    description: "Equipped with modern laparoscopic and diagnostic infrastructure for precise, minimally invasive care.",
    cta: "Explore Facilities",
    image: "/hero_modular_ot.png"
  },
  {
    id: 'default-3',
    title: "Specialist Care for Every Family",
    subtitle: "Pediatric, Gynecology & General Care",
    description: "From neonatal care to orthopedics, our board-certified experts guard your family's health.",
    cta: "Book Consultation",
    image: "/hero_pediatric_care.png"
  }
];

export default function Home({ setCurrentPage, setSelectedDoctor }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [appointmentStatus, setAppointmentStatus] = useState(null); // 'success', 'error', null
  const [activeFaq, setActiveFaq] = useState(null);
  const [formInputs, setFormInputs] = useState({
    name: '',
    phone: '',
    specialty: '',
    date: ''
  });
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [slides, setSlides] = useState(defaultSlides);
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mappedData = data.map(b => ({
              id: b.id,
              title: b.title,
              subtitle: b.subtitle,
              description: b.description,
              cta: b.cta,
              image: b.image_url
            }));
            setSlides(mappedData);
          }
        }
      } catch (err) {
        console.error("Failed to load home banners:", err);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('/api/doctors');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setDoctorsList(data);
          }
        }
      } catch (err) {
        console.error("Failed to load doctors on homepage:", err);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setTestimonials(data);
          }
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      } finally {
        setTestimonialsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [testimonials]);

  const handlePrevTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handleInputChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formInputs.name || !formInputs.phone || !formInputs.specialty || !formInputs.date) {
      setAppointmentStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formInputs.name,
          phone: formInputs.phone,
          specialty: formInputs.specialty,
          date: formInputs.date,
          timeSlot: 'Morning' // Default time slot for quick bookings
        })
      });
      const data = await res.json();
      if (data.success) {
        setAppointmentStatus('success');
        setFormInputs({ name: '', phone: '', specialty: '', date: '' });
      } else {
        setAppointmentStatus('error');
      }
    } catch (err) {
      setAppointmentStatus('error');
    }
    // Reset status after 4 seconds
    setTimeout(() => setAppointmentStatus(null), 4000);
  };

  const specialties = [
    { name: "Gynecology & Infertility", desc: "Comprehensive maternity, reproductive health, and laparoscopic surgeries." },
    { name: "Pediatrics & Neonatology", desc: "Expert infant care, vaccination, developmental checks, and critical care." },
    { name: "General Medicine", desc: "Diagnosis and management of lifestyle disorders, infectious diseases, and chronic illnesses." },
    { name: "Orthopedics & Joint Care", desc: "Bone, muscle, joint replacement treatments, and trauma management." },
    { name: "Laparoscopic Surgery", desc: "Advanced minimally invasive surgical options for faster healing." },
    { name: "Emergency & Critical Care", desc: "Immediate life-saving treatments with 24/7 ambulance and trauma support." }
  ];

  const featuredDoctors = [
    {
      name: "Dr. K.S.V.N. Varma",
      qual: "MBBS, DCH, Fellowship in Neonatology",
      specialty: "Pediatrics & Neonatology",
      experience: "15+ Years Experience",
      image_url: "/doctor_varma.jpg"
    },
    {
      name: "Dr. Koonaparaju Raghavi",
      qual: "M.S. (OBG), DNB Gynecology & Infertility",
      specialty: "Gynecology & Obstetrics",
      experience: "12+ Years Experience",
      image_url: "/doctor_raghavi.jpg"
    },
    {
      name: "Dr. N. Lakshmipathi Raju",
      qual: "DNB General Medicine",
      specialty: "General Medicine Consultant",
      experience: "14+ Years Experience",
      image_url: "/doctor_lakshmipathi.jpg"
    }
  ];

  const activeDoctors = doctorsList.filter(doc => doc.status !== 'Inactive');
  const displayDoctors = activeDoctors.length > 0 ? activeDoctors.slice(0, 3) : featuredDoctors;

  const selectDoctorAndBook = (docName) => {
    setSelectedDoctor(docName);
    setCurrentPage('doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <HomeStyles />
      <div className="home-page animate-fade-in">
        {/* Hero Section with slider */}
        <section className="hero-slider-section">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${activeSlide === index ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="hero-slide-overlay"></div>
              <div className="container hero-slide-content">
                <div className="hero-text-wrapper">
                  <span className="hero-badge">{slide.subtitle}</span>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-description">{slide.description}</p>
                  <div className="hero-actions">
                    <button onClick={() => setCurrentPage(index === 0 ? 'about' : index === 1 ? 'services' : 'doctors')} className="btn btn-primary">
                      {slide.cta}
                      <ArrowRight size={18} />
                    </button>
                    <a href="tel:+918143919199" className="btn btn-outline btn-hero-call">
                      <Phone size={16} />
                      <span>Emergency: +91 81439 19199</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Slider Controls */}
          <div className="slide-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`slide-dot ${activeSlide === index ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </section>

        {/* Quick Appointment Form Block (Overlapping Glassmorphism) */}
        <section className="quick-appointment-container">
          <div className="container">
            <div className="appointment-glass-card glass-panel">
              <div className="appointment-card-header">
                <Calendar className="calendar-icon text-primary" size={28} />
                <div>
                  <h3>For Quick Appointments</h3>
                  <p>Fill out the fields below, and our care representative will call you immediately.</p>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="appointment-form-grid">
                <div className="form-input-group">
                  <label htmlFor="name">Patient Name</label>
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
                  <label htmlFor="specialty">Select Specialty</label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={formInputs.specialty}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Choose Department --</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Laparoscopic Surgery">General & Laparoscopic Surgery</option>
                    <option value="Emergency">Emergency Care</option>
                  </select>
                </div>

                <div className="form-input-group">
                  <label htmlFor="date">Appointment Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formInputs.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-submit-wrapper">
                  <button type="submit" className="btn btn-primary btn-submit-appointment">
                    Confirm Schedule
                  </button>
                </div>
              </form>

              {appointmentStatus === 'success' && (
                <div className="notification success animate-fade-in">
                  <strong>Schedule Request Sent!</strong> Our clinical desk will ring you in a few minutes to confirm.
                </div>
              )}
              {appointmentStatus === 'error' && (
                <div className="notification error animate-fade-in">
                  <strong>Incomplete Form!</strong> Please fill out all fields.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Palakollu Welcome & About Preview Section */}
        <section className="welcome-story-section section-padding">
          <div className="container welcome-story-grid">
            <div className="welcome-story-content">
              <span className="badge">Welcome to New Life</span>
              <h2>Palakollu's Leading Super Specialty Care</h2>
              <p>
                New Life Emergency & Super Specialty Hospital has been serving the West Godavari region with clinical distinction. We offer advanced medical diagnostics, high success rates, and around-the-clock emergency responses under one roof.
              </p>
              <p>
                Our mission is to bring high-quality healthcare closer to your family, combining advanced medical equipment, board-certified clinicians, and a patients-first culture.
              </p>

              <div className="welcome-features-list">
                <div className="welcome-feature-item">
                  <div className="welcome-feature-icon">
                    <Activity size={18} />
                  </div>
                  <div className="welcome-feature-text">
                    <h4>24/7 Diagnostics</h4>
                    <p>In-house laboratory tests, digital X-Ray, and round-the-clock pharmacy.</p>
                  </div>
                </div>
                <div className="welcome-feature-item">
                  <div className="welcome-feature-icon">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="welcome-feature-text">
                    <h4>Hygienic Wards</h4>
                    <p>Highly sterilized general wards, private rooms, and modular surgical zones.</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setCurrentPage('about')} className="btn btn-outline">
                <span>Read Our Story</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="welcome-story-media">
              <div className="welcome-media-collage">
                <div className="collage-bg-glow"></div>
                <img
                  src="/hospital_building.png"
                  alt="New Life Hospital Doctors Care"
                  className="collage-img-main"
                />
                <div className="collage-card-overlay">
                  <h4>
                    <Heart size={16} className="text-primary" />
                    <span>100% Patient Focus</span>
                  </h4>
                  <p>Ensuring complete clinical support, transparent billing, and dedicated post-treatment follow-ups.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hospital Statistics / Features */}
        <section className="features-stats-section section-padding">
          <div className="container">
            <div className="section-title-wrapper text-center">
              <span className="badge">Why Choose New Life</span>
              <h2 className="section-title">Redefining Excellence in Care</h2>
              <p className="section-subtitle">Combining cutting-edge tools and empathetic minds to secure your wellness.</p>
            </div>

            <div className="grid-4 stats-grid">
              <div className="stat-card glass-panel">
                <div className="stat-icon-wrapper emergency">
                  <Activity size={32} />
                </div>
                <h3 className="stat-value">24 Hours</h3>
                <p className="stat-label">Emergency & Trauma Care</p>
                <p className="stat-desc">Ambulance, trauma surgeons, and ICU support are on alert at all times.</p>
              </div>

              <div className="stat-card glass-panel">
                <div className="stat-icon-wrapper beds">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="stat-value">50+ Beds</h3>
                <p className="stat-label">Spacious Facility</p>
                <p className="stat-desc">Comfortable, hygienic general, semi-private, and private inpatient rooms.</p>
              </div>

              <div className="stat-card glass-panel">
                <div className="stat-icon-wrapper doctors">
                  <Users size={32} />
                </div>
                <h3 className="stat-value">10+ Surgeons</h3>
                <p className="stat-label">Super Specialty Doctors</p>
                <p className="stat-desc">Exceptional clinicians managing pediatrics, gynecology, and surgical emergencies.</p>
              </div>

              <div className="stat-card glass-panel">
                <div className="stat-icon-wrapper ot">
                  <Heart size={32} />
                </div>
                <h3 className="stat-value">3 Modern</h3>
                <p className="stat-label">Advanced Operation Theaters</p>
                <p className="stat-desc">Aseptic modular environments fully equipped for advanced surgeries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Specialties Highlight */}
        <section className="specialties-highlight-section section-padding bg-navy-gradient">
          <div className="container">
            <div className="section-title-wrapper text-center">
              <span className="badge">Clinical Excellence</span>
              <h2 className="section-title text-white">Our Medical Specialties</h2>
              <p className="section-subtitle text-light">We offer complete diagnostics and super-specialty interventions across key departments.</p>
            </div>

            <div className="grid-3 specialties-grid">
              {specialties.map((dept, index) => (
                <div key={index} className="specialty-card">
                  <div className="specialty-card-header">
                    <div className="specialty-bullet"></div>
                    <h3 className="specialty-name">{dept.name}</h3>
                  </div>
                  <p className="specialty-desc">{dept.desc}</p>
                  <button onClick={() => setCurrentPage('services')} className="specialty-link-btn">
                    <span>Explore Services & Features</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities Showcase Gallery */}
        <section className="gallery-section section-padding">
          <div className="container">
            <div className="section-title-wrapper text-center">
              <span className="badge">State-Of-The-Art Infra</span>
              <h2 className="section-title">Clinical Facilities</h2>
              <p className="section-subtitle">We have invested in top-tier medical facilities to deliver precise diagnoses and surgical successes.</p>
            </div>

            <div className="gallery-grid">
              <div className="gallery-card" onClick={() => setCurrentPage('services')}>
                <img src="/hero_modular_ot.png" alt="Modular Operation Theater" className="gallery-img" />
                <div className="gallery-overlay">
                  <span className="gallery-tag">Surgical Excellence</span>
                  <h4 className="gallery-title">Modular Operation Theaters</h4>
                </div>
              </div>

              <div className="gallery-card" onClick={() => setCurrentPage('services')}>
                <img src="/hero_pediatric_care.png" alt="Pediatric ICU Ward" className="gallery-img" />
                <div className="gallery-overlay">
                  <span className="gallery-tag">Critical Care</span>
                  <h4 className="gallery-title">Advanced ICU & Pediatric Ward</h4>
                </div>
              </div>

              <div className="gallery-card" onClick={() => setCurrentPage('services')}>
                <img src="/hero_caring_doctors.png" alt="Clinical Lab & Diagnostics" className="gallery-img" />
                <div className="gallery-overlay">
                  <span className="gallery-tag">Diagnostics</span>
                  <h4 className="gallery-title">24/7 Pathology Lab & Diagnostics</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Doctors Section */}
        <section className="featured-doctors-section section-padding">
          <div className="container">
            <div className="section-title-wrapper-flex">
              <div>
                <span className="badge">Expert Clinicians</span>
                <h2 className="section-title">Consult Our Leading Doctors</h2>
                <p className="section-subtitle">Meet our highly skilled specialists dedicated to your recovery.</p>
              </div>
              <button onClick={() => setCurrentPage('doctors')} className="btn btn-outline btn-view-all">
                <span>View All Doctors</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid-3 doctors-row">
              {displayDoctors.map((doc, index) => (
                <div
                  key={index}
                  className="doctor-featured-card glass-panel doc-card-animated"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="doc-avatar-placeholder">
                    {doc.image_url ? (
                      <img src={doc.image_url} alt={doc.name} className="doc-avatar-img" />
                    ) : (
                      <span className="doc-initials">{doc.name ? doc.name.split(' ').slice(-1)[0][0] : 'D'}</span>
                    )}
                    <div className="doc-badge-specialty">{doc.specialty}</div>
                  </div>
                  <div className="doc-content">
                    <div className="doc-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#f59e0b" stroke="#f59e0b" />
                      ))}
                      <span>5.0</span>
                    </div>
                    <h3 className="doc-name">{doc.name}</h3>
                    <p className="doc-qualifications">{doc.qualifications || doc.qual}</p>

                    <div className="doc-details-row">
                      <div className="detail-item">
                        <span className={`status-dot ${doc.availability === 'Out of Hospital' ? 'unavailable' : 'available'}`} />
                        <span>{doc.availability || 'In Hospital'}</span>
                      </div>
                      <div className="detail-item">
                        <Award size={16} />
                        <span>{doc.experience ? (String(doc.experience).includes('Year') ? doc.experience : `${doc.experience}+ Years`) : '10+ Years'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => selectDoctorAndBook(doc.name)}
                      className="btn btn-primary btn-book-doc"
                    >
                      <Calendar size={16} />
                      <span>Book Appointment</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section section-padding">
          <div className="container">
            <div className="section-title-wrapper text-center">
              <span className="badge">Patient Stories</span>
              <h2 className="section-title">Reviews & Testimonials</h2>
              <p className="section-subtitle">Hear directly from patients who experienced compassionate healing at our hospital.</p>
            </div>

            {testimonialsLoading ? (
              <div className="text-center" style={{ padding: '3rem 0', color: 'var(--text-light)' }}>
                <span>Loading patient stories...</span>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center" style={{ padding: '3rem 0', color: 'var(--text-light)' }}>
                <span>No patient stories shared yet.</span>
              </div>
            ) : (
              <div className="testimonials-carousel-container">
                {/* Left Arrow Button */}
                {testimonials.length > 1 && (
                  <button
                    onClick={handlePrevTestimonial}
                    className="carousel-btn prev"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {/* Slider Track Wrapper */}
                <div className="testimonials-track-wrapper">
                  <div
                    className="testimonials-track"
                    style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                  >
                    {testimonials.map((t) => (
                      <div key={t.id} className="testimonial-slide">
                        <div className="testimonial-card">
                          <div>
                            <div className="doc-rating" style={{ marginBottom: '1rem' }}>
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star
                                  key={idx}
                                  size={18}
                                  fill={idx < t.rating ? "var(--accent)" : "none"}
                                  stroke={idx < t.rating ? "var(--accent)" : "var(--border-color)"}
                                  style={{ marginRight: '4px' }}
                                />
                              ))}
                            </div>
                            <p className="testimonial-text">
                              "{t.comment}"
                            </p>
                          </div>
                          <div className="testimonial-author">
                            <div className="author-initial">
                              {t.patient_name ? t.patient_name[0].toUpperCase() : 'P'}
                            </div>
                            <div>
                              <h4 className="author-name">{t.patient_name}</h4>
                              <span className="author-location">{t.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Arrow Button */}
                {testimonials.length > 1 && (
                  <button
                    onClick={handleNextTestimonial}
                    className="carousel-btn next"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}

                {/* Dot Indicators */}
                {testimonials.length > 1 && (
                  <div className="carousel-dots">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`carousel-dot ${activeTestimonial === idx ? 'active' : ''}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Cashless Insurance Partners */}
        <section className="insurance-partners-section">
          <div className="container">
            <div className="section-title-wrapper text-center" style={{ marginBottom: '2rem' }}>
              <span className="badge">Cashless Treatment</span>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Our Cashless Insurance Partners</h2>
              <p className="section-subtitle">We accept Dr. YSR Aarogyasri health cards and all major private insurance networks.</p>
            </div>

            <div className="insurance-grid">
              <div className="insurance-partner-card">Dr. YSR Aarogyasri</div>
              <div className="insurance-partner-card">Star Health</div>
              <div className="insurance-partner-card">Medi Assist</div>
              <div className="insurance-partner-card">ICICI Lombard</div>
              <div className="insurance-partner-card">FHPL</div>
              <div className="insurance-partner-card">HDFC ERGO</div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="faq-section section-padding">
          <div className="container">
            <div className="section-title-wrapper text-center">
              <span className="badge">FAQ Helpdesk</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Got questions? Find direct answers to general patient inquiries below.</p>
            </div>

            <div className="faq-list">
              <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}>
                  <span>What are the outpatient (OPD) consulting hours?</span>
                  <ArrowRight size={18} className="faq-icon" style={{ transform: activeFaq === 0 ? 'rotate(90deg)' : 'none' }} />
                </button>
                <div className="faq-answer">
                  Our outpatient consulting hours are from 10:00 AM to 2:00 PM and 5:00 PM to 8:00 PM, Monday through Saturday. Emergency services are available 24/7.
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
                  <span>Does the hospital support Aarogyasri or cashless insurance?</span>
                  <ArrowRight size={18} className="faq-icon" style={{ transform: activeFaq === 1 ? 'rotate(90deg)' : 'none' }} />
                </button>
                <div className="faq-answer">
                  Yes! We support Aarogyasri government health schemes as well as cashless treatments with all major private health insurance providers and TPAs including Star Health, Medi Assist, FHPL, and more.
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
                  <span>How can I book an emergency ambulance?</span>
                  <ArrowRight size={18} className="faq-icon" style={{ transform: activeFaq === 2 ? 'rotate(90deg)' : 'none' }} />
                </button>
                <div className="faq-answer">
                  In case of emergency, please dial our direct helpline at +91 81439 19199. Our fully equipped cardiac ambulance is dispatched immediately with trauma technicians.
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
                  <span>What visiting hours are allowed for inpatients?</span>
                  <ArrowRight size={18} className="faq-icon" style={{ transform: activeFaq === 3 ? 'rotate(90deg)' : 'none' }} />
                </button>
                <div className="faq-answer">
                  To ensure patient recovery and prevent infections, visiting hours are strictly restricted to 4:00 PM - 6:00 PM daily. One permanent bystander pass is issued per patient.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hospital Location Interactive Map */}
        <section className="home-map-section section-padding">
          <div className="container">
            <div className="section-title-wrapper text-center">
              <span className="badge">Find Us</span>
              <h2 className="section-title">Our Location on Google Maps</h2>
              <p className="section-subtitle">Centrally located in Palakollu behind the RTC Bus Stand on Srinivas Theatres Road for fast critical care accessibility.</p>
            </div>
            <div className="home-map-card glass-panel">
              <div className="home-map-iframe-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.241848308687!2d81.72701119999999!3d16.5138836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37dbaae637b73f%3A0x94e9af2b00980e17!2sNEW%20LIFE%20Emergency%20%26%20Super%20Speciality%20Hospital!5e0!3m2!1sen!2sin!4v1782274959390!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="New Life Hospital Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Hospital Banner Call to Action */}
        <section className="cta-banner-section bg-navy-gradient text-white">
          <div className="container cta-flex">
            <div className="cta-text">
              <h2>Need Immediate Medical Support?</h2>
              <p>Our trauma response unit, ambulance dispatch, and critical medicine specialists are available 24/7.</p>
            </div>
            <div className="cta-buttons">
              <a href="tel:+918143919199" className="btn btn-primary cta-btn-call">
                <Phone size={18} />
                <span>Call +91 81439 19199</span>
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=NEW+LIFE+Emergency+%26+Super+Speciality+Hospital+Palakollu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-white border-white"
              >
                Get Directions
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
