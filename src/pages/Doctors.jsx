import React, { useState, useEffect } from 'react';
import { Search, Calendar, CheckCircle, Clock, Award, X, Sparkles, Filter } from 'lucide-react';

export default function Doctors({ selectedDoctor, setSelectedDoctor }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookingDoctor, setBookingDoctor] = useState(null); // Doctor object currently booking
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingInputs, setBookingInputs] = useState({
    patientName: '',
    patientPhone: '',
    bookingDate: '',
    bookingTimeSlot: ''
  });

  const doctorsData = [
    {
      id: 1,
      name: "Dr. K.S.V.N. Varma",
      qualifications: "MBBS, DCH, Fellowship in Neonatology, PALS, NALS",
      specialty: "Pediatrics & Neonatology",
      category: "Pediatrics",
      experience: "15+ Years",
      timings: "10:00 AM - 1:00 PM, 5:00 PM - 8:00 PM",
      bio: "An outstanding pediatrician specialized in neonatal intensive care, complex childhood disease management, pediatric asthma treatments, and infant developmental health.",
      image_url: "/doctor_varma.jpg"
    },
    {
      id: 2,
      name: "Dr. N. Lakshmipathi Raju",
      qualifications: "DNB General Medicine",
      specialty: "Consultant General Medicine",
      category: "General Medicine",
      experience: "14+ Years",
      timings: "10:00 AM - 4:00 PM",
      bio: "A trusted consultant general physician with deep expertise in managing lifestyle diseases, diabetes control, thyroid therapies, acute fever treatments, and preventive wellness checks.",
      image_url: "/doctor_lakshmipathi.jpg"
    },
    {
      id: 3,
      name: "Dr. Koonaparaju Raghavi",
      qualifications: "M.S. (OBG), DNB (Gynecology, Infertility Specialist)",
      specialty: "Consultant Gynecologist & Obstetrician",
      category: "Gynecology",
      experience: "12+ Years",
      timings: "10:00 AM - 2:00 PM, 6:00 PM - 8:00 PM",
      bio: "A leading obstetrician specialized in high-risk pregnancies, infertility diagnostics, keyhole laparoscopic surgeries, contraceptive counseling, and women's hormonal issues.",
      image_url: "/doctor_raghavi.jpg"
    },
    {
      id: 4,
      name: "Dr. G. Ramakrishna Reddy",
      qualifications: "M.S. Orthopaedics, FIJR",
      specialty: "Consultant Orthopedic & Joint Surgeon",
      category: "Orthopedics",
      experience: "11+ Years",
      timings: "11:00 AM - 3:00 PM, 6:00 PM - 8:00 PM",
      bio: "An expert joint replacement specialist focused on orthopedic trauma, complex fracture fixations, arthritis therapies, knee/hip replacements, and sports injury rehabilitation.",
      image_url: "/doctor_ramakrishna.jpg"
    },
    {
      id: 5,
      name: "Dr. Pavan",
      qualifications: "M.D. ANESTHESIA",
      specialty: "Consultant Anesthesiologist",
      category: "Anesthesia",
      experience: "10+ Years",
      timings: "24/7 Critical & Trauma Care Support",
      bio: "A dedicated anesthesiologist overseeing surgical sedation and post-operative pain management, and supporting critical trauma care services round-the-clock.",
      image_url: "/doctor_pavan.jpg"
    },
    {
      id: 6,
      name: "Dr. Lenin",
      qualifications: "M.S., D.G.S., FAIS",
      specialty: "Laparoscopic & General Surgeon",
      category: "General Surgery",
      experience: "13+ Years",
      timings: "10:00 AM - 2:00 PM, 5:00 PM - 7:00 PM",
      bio: "A seasoned general surgeon skilled in advanced laparoscopic keyhole procedures, gallbladder removals, hernia repairs, appendix surgeries, and emergency abdominal trauma operations.",
      image_url: "/doctor_lenin.jpg"
    }
  ];

  const visitingConsultants = [
    { name: "Dr. Vegiraju Vijayanand", specialty: "Consultant Gastroenterologist", qual: "MD, DM Gastroenterology", category: "Gastroenterology" },
    { name: "Dr. C. H. Murali Krishna", specialty: "Consultant Oncologist", qual: "MD, DM Oncology", category: "Oncology" },
    { name: "Dr. Hemanth Naga Varma", specialty: "Consultant Oncologist", qual: "MD, DM Oncology", category: "Oncology" },
    { name: "Dr. S. Satish", specialty: "Psychiatrist & Mental Health Specialist", qual: "MD Psychiatry", category: "Psychiatry" }
  ];

  const [doctorsList, setDoctorsList] = useState(doctorsData);

  // Fetch doctors list from SQL DB on mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await fetch('/api/doctors');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setDoctorsList(data);
        }
      } catch (err) {
        console.error('Failed to load doctors list:', err);
      }
    };
    loadDoctors();
  }, []);

  // Handle book pre-selection on page load
  useEffect(() => {
    if (selectedDoctor) {
      const match = doctorsList.find(d => d.name === selectedDoctor);
      if (match) {
        setBookingDoctor(match);
        setSelectedDoctor(null); // Clear selected doctor from app state
      }
    }
  }, [selectedDoctor, doctorsList]);

  // Lock body scroll when booking modal is open
  useEffect(() => {
    if (bookingDoctor) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [bookingDoctor]);

  const categories = ['All', 'Pediatrics', 'General Medicine', 'Gynecology', 'Orthopedics', 'General Surgery', 'Visiting Specialists'];

  const filteredDoctors = doctorsList.filter(doc => {
    if (doc.status === 'Inactive') return false;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.qualifications.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeFilter === 'All' || doc.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  const matchesVisitingFilter = activeFilter === 'All' || activeFilter === 'Visiting Specialists';
  const filteredVisiting = visitingConsultants.filter(doc => {
    return doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingInputs.patientName || !bookingInputs.patientPhone || !bookingInputs.bookingDate || !bookingInputs.bookingTimeSlot) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingInputs.patientName,
          phone: bookingInputs.patientPhone,
          doctorName: bookingDoctor.name,
          specialty: bookingDoctor.specialty,
          date: bookingInputs.bookingDate,
          timeSlot: bookingInputs.bookingTimeSlot
        })
      });
      const data = await res.json();
      if (data.success) {
        setBookingSuccess(true);
        setTimeout(() => {
          setBookingSuccess(false);
          setBookingDoctor(null);
          setBookingInputs({ patientName: '', patientPhone: '', bookingDate: '', bookingTimeSlot: '' });
        }, 3000);
      } else {
        alert('Booking request failed: ' + data.error);
      }
    } catch (err) {
      alert('Failed to connect to full-stack server.');
    }
  };

  const handleInputChange = (e) => {
    setBookingInputs({ ...bookingInputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      <style>{`
        /* Page Banner Header */
        .doctors-banner-header {
          padding: 6.5rem 0 5rem 0;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .doctors-banner-header h1 {
          font-size: 3rem;
          font-weight: 800;
          color: var(--bg-white);
          margin-top: 1rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .doctors-banner-header p {
          color: var(--text-light);
          font-size: 1.15rem;
          max-width: 600px;
          line-height: 1.6;
        }

        /* Directory Controls Styling */
        .directory-controls-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: var(--bg-white);
          box-shadow: var(--card-shadow);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }

        .search-bar-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 18px;
          color: var(--text-light);
        }

        .search-bar-wrapper input {
          width: 100%;
          height: 54px;
          padding: 0 16px 0 52px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 1rem;
          outline: none;
          background-color: var(--bg-light);
          transition: var(--transition-fast);
        }

        .search-bar-wrapper input:focus {
          background-color: var(--bg-white);
          border-color: var(--primary);
          box-shadow: 0 0 0 4px var(--primary-glow);
        }

        .filter-badge-list {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-medium);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .badges-wrapper {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 6px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background-color: var(--bg-light);
          color: var(--text-medium);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .filter-btn:hover {
          background-color: var(--border-color);
          color: var(--secondary);
        }

        .filter-btn.active {
          background-color: var(--primary);
          border-color: var(--primary);
          color: var(--bg-white);
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
        }

        /* Primary Section Header */
        .grid-section-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 2rem;
          position: relative;
          padding-left: 16px;
        }

        .grid-section-title::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 24px;
          background-color: var(--primary);
          border-radius: var(--radius-full);
        }

        .no-results-card {
          padding: 3rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          color: var(--text-medium);
        }

        /* Doctors Card Grid */
        .doctors-directory-grid {
          margin-bottom: 5rem;
        }

        .doctor-profile-card {
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: var(--bg-white);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          transition: var(--transition-normal);
          box-shadow: var(--card-shadow);
        }

        .doctor-profile-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .profile-avatar-box {
          height: 180px;
          background: linear-gradient(135deg, var(--navy-medium) 0%, var(--navy-dark) 100%);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .profile-initials {
          font-family: var(--font-heading);
          font-size: 4rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.12);
        }

        .profile-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .profile-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          color: var(--bg-white);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .profile-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 4px;
        }

        .profile-specialty {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 8px;
        }

        .profile-qualifications {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-medium);
          margin-bottom: 1.25rem;
        }

        .profile-stats-row {
          display: flex;
          gap: 20px;
          margin-bottom: 1.25rem;
        }

        .profile-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-medium);
        }

        .profile-bio {
          font-size: 0.9rem;
          color: var(--text-medium);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
          min-height: 86px;
        }

        .profile-timings-card {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-light);
          border: 1px solid var(--border-color);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--secondary);
          margin-bottom: 1.5rem;
        }

        .profile-timings-card svg {
          color: var(--primary);
          flex-shrink: 0;
        }

        .btn-book-consult {
          width: 100%;
        }

        /* Visiting Consultants Section */
        .visiting-consultants-section {
          border-top: 1px solid var(--border-color);
          padding-top: 4rem;
        }

        .visiting-grid {
          gap: 1.5rem;
        }

        .visiting-card {
          padding: 2rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-white);
          box-shadow: var(--card-shadow);
          display: flex;
          gap: 20px;
          align-items: flex-start;
          transition: var(--transition-normal);
        }

        .visiting-card:hover {
          transform: translateY(-4px);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .visiting-icon-bullet {
          background: var(--primary-glow);
          padding: 10px;
          border-radius: var(--radius-sm);
          flex-shrink: 0;
          color: var(--primary);
        }

        .visiting-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .visiting-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .visiting-header h4 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--secondary);
        }

        .visiting-badge {
          background-color: var(--primary-glow);
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .visiting-specialty {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 2px;
        }

        .visiting-qual {
          font-size: 0.85rem;
          color: var(--text-medium);
          margin-bottom: 1rem;
        }

        .visiting-call-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--secondary);
          transition: var(--transition-fast);
        }

        .visiting-call-btn:hover {
          color: var(--primary);
        }

        /* Modal Overlay Styling */
        .booking-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(10, 17, 40, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1.5rem;
          overflow: hidden;
        }

        .booking-modal-container {
          width: 100%;
          max-width: 580px;
          background: var(--bg-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          box-shadow: 0 25px 50px -12px rgba(10, 17, 40, 0.25);
          padding: 3rem;
          position: relative;
          animation: modalAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalAppear {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .booking-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .booking-modal-header h3 {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--secondary);
        }

        .close-modal-btn {
          background: none;
          border: none;
          color: var(--text-medium);
          cursor: pointer;
          padding: 0;
          transition: var(--transition-fast);
        }

        .close-modal-btn:hover {
          color: var(--secondary);
        }

        .booking-doctor-preview {
          display: flex;
          gap: 16px;
          align-items: center;
          background-color: var(--bg-light);
          border: 1px solid var(--border-color);
          padding: 12px 16px;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
        }

        .mini-avatar {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-sm);
          background-color: var(--secondary);
          color: var(--bg-white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.5rem;
        }

        .booking-doctor-preview h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--secondary);
          line-height: 1.2;
        }

        .booking-doctor-preview p {
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 600;
        }

        .modal-doc-timing {
          color: var(--text-medium) !important;
          font-weight: 500 !important;
          margin-top: 2px;
        }

        /* Modal Form Styles */
        .booking-modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-group label {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-medium);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input,
        .form-group select {
          height: 44px;
          padding: 0 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          outline: none;
          font-size: 0.95rem;
          transition: var(--transition-fast);
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .btn-confirm-modal {
          height: 48px;
          margin-top: 1rem;
        }

        /* Success Modal View */
        .booking-success-message {
          padding: 2rem 0;
        }

        .success-bounce {
          animation: bounce 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite alternate;
        }

        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-8px); }
        }

        .booking-success-message h4 {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--secondary);
          margin-top: 1rem;
          margin-bottom: 8px;
        }

        .booking-success-message p {
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.5;
        }

        /* Responsive Overrides */
        @media (max-width: 1024px) {
          .directory-controls-card {
            padding: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .doctors-banner-header h1 {
            font-size: 2.2rem;
          }
          
          .filter-badge-list {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .visiting-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .visiting-badge {
            align-self: flex-start;
          }
          
          .booking-modal-container {
            padding: 1.5rem;
          }
        }
      `}</style>
      <div className="doctors-page animate-fade-in">
        {/* Page Header */}
        <section className="doctors-banner-header bg-navy-gradient text-white">
          <div className="container">
            <span className="badge">Healing Hands</span>
            <h1>Our Doctors Team</h1>
            <p>Consult with our board-certified surgeons, super-specialists, and general practitioners dedicated to medical excellence.</p>
          </div>
        </section>

        {/* Directory & Filters Section */}
        <section className="doctors-directory-section section-padding">
          <div className="container">
            
            {/* Search & Category Filter Controls */}
            <div className="directory-controls-card glass-panel">
              <div className="search-bar-wrapper">
                <Search className="search-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Search doctors by name, specialty, or credentials..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-badge-list">
                <div className="filter-label">
                  <Filter size={16} />
                  <span>Filter By:</span>
                </div>
                <div className="badges-wrapper">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Doctors Grid */}
            {activeFilter !== 'Visiting Specialists' && (
              <div className="doctors-grid-section">
                <h3 className="grid-section-title">Primary Clinical Consultants</h3>
                {filteredDoctors.length === 0 ? (
                  <div className="no-results-card text-center glass-panel">
                    <p>No primary doctors found matching your query.</p>
                  </div>
                ) : (
                  <div className="grid-3 doctors-directory-grid">
                    {filteredDoctors.map((doc) => (
                      <div key={doc.id} className="doctor-profile-card glass-panel">
                        {/* Avatar container */}
                        <div className="profile-avatar-box">
                          {doc.image_url ? (
                            <img src={doc.image_url} alt={doc.name} className="profile-avatar-img" />
                          ) : (
                            <span className="profile-initials">{doc.name.split(' ').slice(-1)[0][0]}</span>
                          )}
                          <div className="profile-badge">{doc.category}</div>
                        </div>

                        {/* Content */}
                        <div className="profile-details">
                          <h4 className="profile-name">{doc.name}</h4>
                          <span className="profile-specialty">{doc.specialty}</span>
                          <p className="profile-qualifications">{doc.qualifications}</p>
                          
                          <div className="profile-stats-row">
                            <div className="profile-stat">
                              <Award size={16} className="text-primary" />
                              <span>{doc.experience} Exp</span>
                            </div>
                            <div className="profile-stat" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ 
                                display: 'inline-block', 
                                width: '8px', 
                                height: '8px', 
                                borderRadius: '50%', 
                                backgroundColor: doc.availability === 'Out of Hospital' ? '#f59e0b' : '#10b981',
                                boxShadow: doc.availability === 'Out of Hospital' ? '0 0 8px #f59e0b' : '0 0 8px #10b981'
                              }} />
                              <span>{doc.availability || 'In Hospital'}</span>
                            </div>
                          </div>

                          <p className="profile-bio">{doc.bio}</p>

                          <div className="profile-timings-card">
                            <Clock size={14} />
                            <span>Timings: {doc.timings}</span>
                          </div>

                          <button 
                            onClick={() => setBookingDoctor(doc)} 
                            className="btn btn-primary btn-book-consult"
                          >
                            <Calendar size={16} />
                            <span>Book Consultation</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Visiting Consultants Section */}
            {matchesVisitingFilter && filteredVisiting.length > 0 && (
              <div className="visiting-consultants-section">
                <h3 className="grid-section-title">Visiting Specialty Consultants</h3>
                <div className="grid-2 visiting-grid">
                  {filteredVisiting.map((consultant, index) => (
                    <div key={index} className="visiting-card glass-panel">
                      <div className="visiting-icon-bullet">
                        <Sparkles size={20} className="text-primary" />
                      </div>
                      <div className="visiting-content">
                        <div className="visiting-header">
                          <h4>{consultant.name}</h4>
                          <span className="visiting-badge">{consultant.category}</span>
                        </div>
                        <p className="visiting-specialty">{consultant.specialty}</p>
                        <p className="visiting-qual">{consultant.qual}</p>
                        <a href="tel:+918143919199" className="visiting-call-btn">
                          <Clock size={14} strokeWidth={2} />
                          <span>Call +91 81439 19199 to Check Schedules</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Booking Dialog Modal (Portal-like state) */}
      {bookingDoctor && (
        <div className="booking-modal-overlay">
          <div className="booking-modal-container glass-panel animate-fade-in">
            {/* Header */}
            <div className="booking-modal-header">
              <h3>Consultation Booking</h3>
              <button onClick={() => setBookingDoctor(null)} className="close-modal-btn" aria-label="Close Modal">
                <X size={24} />
              </button>
            </div>

            {/* Content info */}
            <div className="booking-doctor-preview">
              <div className="mini-avatar">
                {bookingDoctor.name.split(' ').slice(-1)[0][0]}
              </div>
              <div>
                <h4>{bookingDoctor.name}</h4>
                <p>{bookingDoctor.specialty}</p>
                <p className="modal-doc-timing">Timing: {bookingDoctor.timings}</p>
              </div>
            </div>

            {/* Success notification */}
            {bookingSuccess ? (
              <div className="booking-success-message text-center animate-fade-in">
                <CheckCircle size={56} className="text-primary success-bounce" />
                <h4>Consultation Slot Requested!</h4>
                <p>We have pre-booked your slot. Our coordinator will call you back on your number shortly to confirm your booking.</p>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleBookingSubmit} className="booking-modal-form">
                <div className="form-group">
                  <label htmlFor="patientName">Patient Full Name</label>
                  <input 
                    type="text" 
                    id="patientName" 
                    name="patientName" 
                    placeholder="Enter full name"
                    value={bookingInputs.patientName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="patientPhone">Mobile Number</label>
                  <input 
                    type="tel" 
                    id="patientPhone" 
                    name="patientPhone" 
                    placeholder="10-digit phone number"
                    value={bookingInputs.patientPhone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="bookingDate">Preferred Date</label>
                    <input 
                      type="date" 
                      id="bookingDate" 
                      name="bookingDate"
                      value={bookingInputs.bookingDate}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bookingTimeSlot">Preferred Slot</label>
                    <select 
                      id="bookingTimeSlot" 
                      name="bookingTimeSlot"
                      value={bookingInputs.bookingTimeSlot}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Choose Slot --</option>
                      <option value="Morning">Morning Slot</option>
                      <option value="Afternoon">Afternoon Slot</option>
                      <option value="Evening">Evening Slot</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-confirm-modal">
                  Request Slot Confirmation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
