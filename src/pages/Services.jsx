import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Award, ShieldCheck, Users, Phone, X, Sparkles, Check, HelpCircle, Brain, Dna, Stethoscope } from 'lucide-react';

// Helper to map dynamic string icon names to Lucide icon components
export const getIconComponent = (iconName, size = 28) => {
  switch (iconName) {
    case 'Heart': return <Heart size={size} />;
    case 'Award': return <Award size={size} />;
    case 'ShieldCheck': return <ShieldCheck size={size} />;
    case 'Activity': return <Activity size={size} />;
    case 'Sparkles': return <Sparkles size={size} />;
    case 'Phone': return <Phone size={size} fill="currentColor" />;
    case 'Brain': return <Brain size={size} />;
    case 'Dna': return <Dna size={size} />;
    case 'Stethoscope': return <Stethoscope size={size} />;
    default: return <Activity size={size} />;
  }
};

export default function Services({ setCurrentPage }) {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(s => ({
            ...s,
            icon: getIconComponent(s.icon_name, 28),
            shortDesc: s.short_desc,
            image: s.image_url || s.image
          }));
          setServices(mapped);
        } else {
          setServices(staticServices);
        }
      } catch (err) {
        console.log('Failed to fetch dynamic services, using static fallbacks:', err);
        setServices(staticServices);
      }
    };
    fetchServices();
  }, []);

  const staticServices = [
    {
      id: 1,
      name: "Gynecology & Obstetrics",
      shortDesc: "Comprehensive maternal care, high-risk pregnancy management, and advanced laparoscopic procedures.",
      icon: <Heart size={28} />,
      image: "/service_gynecology.png",
      conditions: ["Pregnancy Care", "High-Risk Obstetrics", "Infertility Workups", "Laparoscopic Hysterectomy", "PCOS Management"],
      facilities: ["Private Labor Delivery Rooms", "4D Fetal Ultrasound Scanning", "Advanced Laparoscopic Surgical Setup", "Neonatal Resuscitation Support"],
      details: "Our Gynecology department provides premium care for women through all stages of life. We specialize in high-risk obstetric monitoring, painless deliveries, and advanced keyhole surgeries that offer faster recovery, minimal scars, and less discomfort."
    },
    {
      id: 2,
      name: "Pediatrics & Neonatology",
      shortDesc: "Specialized medical care for newborns, infants, children, and adolescents.",
      icon: <Award size={28} />,
      image: "/service_pediatrics.png",
      conditions: ["Neonatal Critical Care", "Pediatric Emergencies", "Childhood Vaccinations", "Asthma & Allergy Care", "Growth & Development Checks"],
      facilities: ["Modular Neonatal ICU (NICU)", "Pediatric Emergency Beds", "Dedicated Vaccine Desk", "Infant Incubator Chambers"],
      details: "Backed by expert pediatricians and neonatologists, we operate a highly sterile Neonatal ICU (NICU) to nurse pre-term or critical newborns back to health. We offer comprehensive child health checks, immunization programs, and developmental milestones tracking."
    },
    {
      id: 3,
      name: "General Medicine",
      shortDesc: "Diagnostic and therapeutic care for lifestyle diseases, endocrine issues, and acute infections.",
      icon: <ShieldCheck size={28} />,
      image: "/service_general_medicine.png",
      conditions: ["Diabetes Management", "Hypertension & Cardiac Care", "Thyroid Disorders", "Viral & Infectious Fevers", "Chronic Asthma & COPD"],
      facilities: ["In-house Automated Pathology Lab", "Digital ECG & Cardiac Monitors", "Preventative Health Packages", "Isolation Ward Rooms"],
      details: "The General Medicine department acts as the primary health shield. We specialize in lifestyle management, endocrinology, chronic hypertension control, diabetes care, and infectious diseases, focusing on comprehensive diagnosis and long-term preventative health."
    },
    {
      id: 4,
      name: "Orthopedics & Joint Care",
      shortDesc: "Advanced bone, spine, joint replacements, and emergency fracture management.",
      icon: <Activity size={28} />,
      image: "/service_orthopedics.png",
      conditions: ["Knee & Hip Replacements", "Fracture & Trauma Fixations", "Sports Injury Treatments", "Spine & Disc Therapies", "Arthritis Management"],
      facilities: ["Specialized Ortho OT Unit", "Digital High-Res X-Ray", "Post-Surgical Physiotherapy Rehab", "C-Arm Image Intensifier Setup"],
      details: "Our Orthopedics department restores your mobility. We specialize in minimally invasive joint replacements, complex trauma reconstructive surgeries, arthroscopic ligament repairs, and dedicated post-operative physiotherapy to get you back on your feet quickly."
    },
    {
      id: 5,
      name: "Laparoscopic & General Surgery",
      shortDesc: "Advanced keyhole surgeries and open procedures for faster healing and shorter hospital stays.",
      icon: <Sparkles size={28} />,
      image: "/service_surgery.png",
      conditions: ["Laparoscopic Hernia Repair", "Gallbladder Removal (Cholecystectomy)", "Appendectomy", "Trauma & Emergency Surgeries", "Abdominal Wall Reconstructions"],
      facilities: ["Modular OT with Laminar Flow", "HD Laparoscopic Surgical Towers", "Aseptic Recovery Wards", "Autoclave & Sterile Processing Unit"],
      details: "We utilize cutting-edge laparoscopic technology to perform precise abdominal operations. Keyhole surgery means smaller incisions, significantly reduced post-operative pain, minimal risk of infection, and a faster return to daily activities."
    },
    {
      id: 6,
      name: "Emergency & Critical Care",
      shortDesc: "24/7 immediate trauma care, cardiac life-support, and ICU monitoring.",
      icon: <Phone size={28} fill="currentColor" />,
      image: "/service_emergency.png",
      conditions: ["Cardiovascular Emergencies", "Accidents & Trauma Cases", "Severe Poisonings", "Respiratory Failure Support", "Critical Sepsis Management"],
      facilities: ["24/7 Fully Equipped Ambulance", "High-End Ventilator ICU Beds", "Triage Trauma Bay Area", "Emergency Resuscitation Monitors"],
      details: "Our emergency ward never sleeps. With a round-the-clock team of trauma specialists, ICU nurses, and fully loaded life-support ambulances, we are equipped to manage critical emergencies including stroke, heart attack, and major physical trauma."
    },
    {
      id: 7,
      name: "Psychiatry & Mental Health",
      shortDesc: "Compassionate evaluation, counseling, and treatment for cognitive, emotional, and behavioral wellness.",
      icon: <Brain size={28} />,
      image: "/service_psychiatry.png",
      conditions: ["Anxiety & Stress Management", "Depression Recovery Support", "Mood & Sleep Disorders", "Behavioral Counseling", "De-addiction Programs"],
      facilities: ["Private Counseling Chambers", "Comforting Consultation Rooms", "Family Therapy Zones", "Psychometric Testing Desk"],
      details: "Our Psychiatry & Mental Health department offers a confidential, warm, and supportive environment for cognitive and emotional wellness. We specialize in therapy and clinical management for stress, depression, anxiety, and sleep disorders, helping patients reclaim peace of mind."
    },
    {
      id: 8,
      name: "Oncology & Cancer Care",
      shortDesc: "Comprehensive cancer screening, early detection, supportive chemotherapy, and palliative care.",
      icon: <Dna size={28} />,
      image: "/service_oncology.png",
      conditions: ["Cancer Screening Programs", "Early Detection Checkups", "Supportive Chemotherapy", "Palliative Care & Counseling", "Post-Onco Rehab Support"],
      facilities: ["Dedicated Infusion Suite", "Sterile Chemotherapy Beds", "Oncology Advisory Unit", "Advanced Pathology Support"],
      details: "Our Oncology & Cancer Care team is dedicated to early screening, accurate staging, and compassionate supportive therapies. We work closely with leading surgical oncologists and radiotherapists to provide comprehensive cancer care plans, including safe outpatient chemotherapy infusion and supportive counseling."
    },
    {
      id: 9,
      name: "Gastroenterology & Gastric Care",
      shortDesc: "Diagnosis and treatments for liver, stomach, and digestive tract disorders.",
      icon: <Stethoscope size={28} />,
      image: "/service_gastroenterology.png",
      conditions: ["Acid Reflux & GERD", "Irritable Bowel Syndrome (IBS)", "Gastric Ulcers & Gastritis", "Liver & Gallbladder Issues", "Chronic Constipation & Diarrhea"],
      facilities: ["Endoscopy Diagnostic Room", "Modern Recovery Lounge", "Sterile Scope Processing Unit", "Dietary & Nutritional Clinic"],
      details: "The Gastroenterology & Gastric Care department specializes in checking and treating disorders of the digestive tract, esophagus, stomach, liver, and colon. We focus on acid reflux relief, ulcer healing, and digestive wellness through advanced diagnostics and custom nutrition therapies."
    }
  ];

  const handleBookRedirect = () => {
    setSelectedService(null);
    setCurrentPage('doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        /* Banner Header */
        .services-banner-header {
          padding: 6.5rem 0 5rem 0;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .services-banner-header h1 {
          font-size: 3rem;
          font-weight: 800;
          color: var(--bg-white);
          margin-top: 1rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .services-banner-header p {
          color: var(--text-light);
          font-size: 1.15rem;
          max-width: 600px;
          line-height: 1.6;
        }

        /* Services Grid cards */
        .services-grid-cards {
          margin-top: 2rem;
          gap: 2rem;
        }

        .service-item-card {
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: var(--bg-white);
          box-shadow: var(--card-shadow);
          display: flex;
          flex-direction: column;
          transition: var(--transition-normal);
          overflow: hidden;
          padding: 0;
        }

        .service-item-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
          border-color: rgba(16, 185, 129, 0.25);
        }

        .service-card-image-wrapper {
          height: 200px;
          overflow: hidden;
          position: relative;
          background-color: var(--secondary);
        }

        .service-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .service-item-card:hover .service-card-img {
          transform: scale(1.06);
        }

        .service-card-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .service-card-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 0.75rem;
        }

        .service-card-desc {
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
          min-height: 72px;
        }

        /* Tags List */
        .service-tags-wrapper {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .service-tag {
          background-color: var(--bg-light);
          border: 1px solid var(--border-color);
          color: var(--text-medium);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .service-tag.plus-more {
          background-color: var(--primary-glow);
          color: var(--primary);
          border-color: rgba(16, 185, 129, 0.15);
        }

        /* Action button rows */
        .service-card-actions {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 10px;
        }

        .btn-service-details {
          padding: 0.65rem 0.5rem;
          font-size: 0.85rem;
        }

        .btn-service-book {
          padding: 0.65rem 0.5rem;
          font-size: 0.85rem;
        }

        /* Modal details */
        .service-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(10, 17, 40, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 1.5rem;
        }

        .service-modal-container {
          width: 100%;
          max-width: 650px;
          background: var(--bg-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          box-shadow: var(--box-shadow-lg);
          padding: 2.5rem;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }

        .service-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.25rem;
        }

        .modal-header-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .modal-icon-box {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-sm);
          background-color: var(--primary-glow);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-header-title h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--secondary);
        }

        .close-service-modal {
          background: none;
          border: none;
          color: var(--text-medium);
          cursor: pointer;
          padding: 0;
          transition: var(--transition-fast);
        }

        .close-service-modal:hover {
          color: var(--secondary);
        }

        .service-modal-body {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .modal-section h4 {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 8px;
        }

        .modal-section p {
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.65;
        }

        .modal-section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .modal-list-box h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 14px;
          border-bottom: 2px solid var(--bg-light);
          padding-bottom: 6px;
        }

        .modal-bullet-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-bullet-list li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 0.9rem;
          color: var(--text-medium);
          font-weight: 500;
        }

        .bullet-check {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .service-modal-footer {
          margin-top: 2.5rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          display: flex;
          justify-content: flex-end;
        }

        .modal-action-btn {
          width: 100%;
        }

        /* Responsive Overrides */
        @media (max-width: 768px) {
          .services-banner-header h1 {
            font-size: 2.2rem;
          }
          
          .service-card-actions {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          
          .modal-section-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .service-modal-container {
            padding: 1.5rem;
          }
        }
      `}</style>
      <div className="services-page animate-fade-in">
        {/* Banner Header */}
        <section className="services-banner-header bg-navy-gradient text-white">
          <div className="container">
            <span className="badge">Specialized Clinical Units</span>
            <h1>Our Medical Services</h1>
            <p>We provide a comprehensive range of clinical specialties, modern diagnostic systems, and super-specialty surgeries.</p>
          </div>
        </section>

        {/* Grid Section */}
        <section className="services-directory-section section-padding">
          <div className="container">
            <div className="section-title-wrapper text-center">
              <span className="badge">What We Offer</span>
              <h2 className="section-title">World-Class Healthcare Services</h2>
              <p className="section-subtitle">Designed around patient comfort and clinical excellence, utilizing modern medical technology.</p>
            </div>

            <div className="grid-3 services-grid-cards">
              {services.map((svc) => (
                <div key={svc.id} className="service-item-card glass-panel">
                  <div className="service-card-image-wrapper">
                    <img src={svc.image} alt={svc.name} className="service-card-img" />
                  </div>
                  <div className="service-card-content">
                    <h3 className="service-card-title">{svc.name}</h3>
                    <p className="service-card-desc">{svc.shortDesc}</p>

                    {/* Service conditions tags */}
                    <div className="service-tags-wrapper">
                      {svc.conditions.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="service-tag">{tag}</span>
                      ))}
                      {svc.conditions.length > 3 && (
                        <span className="service-tag plus-more">+{svc.conditions.length - 3} more</span>
                      )}
                    </div>

                    <div className="service-card-actions">
                      <button 
                        onClick={() => {
                          navigate(`/services/${svc.id}`);
                          window.scrollTo(0, 0);
                        }} 
                        className="btn btn-outline btn-service-details"
                      >
                        View Details & Facilities
                      </button>
                      <button 
                        onClick={() => handleBookRedirect()} 
                        className="btn btn-primary btn-service-book"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
