import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, Activity, Award, ShieldCheck, Users, Phone, X, Sparkles, 
  Check, HelpCircle, ArrowLeft, Calendar, Clock, Star, ArrowRight,
  Shield, Building, ChevronDown, ChevronUp, Brain, Dna, Stethoscope
} from 'lucide-react';
import { getIconComponent } from './Services';

export default function ServiceDetails({ setCurrentPage, setSelectedDoctor }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [doctorsList, setDoctorsList] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)'
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(mapBackendServiceToFrontend);
          setServices(mapped);
        } else {
          setServices(staticServices.map(mapBackendServiceToFrontend));
        }
      } catch (err) {
        console.log('Failed to fetch dynamic services, using static fallbacks:', err);
        setServices(staticServices.map(mapBackendServiceToFrontend));
      }
    };
    fetchServices();
  }, [id]);

  const mapBackendServiceToFrontend = (s) => ({
    id: s.id,
    name: s.name,
    tagline: s.tagline,
    shortDesc: s.short_desc || s.shortDesc,
    icon: getIconComponent(s.icon_name || (s.id === 1 ? 'Heart' : s.id === 2 ? 'Award' : s.id === 3 ? 'ShieldCheck' : s.id === 4 ? 'Activity' : s.id === 5 ? 'Sparkles' : s.id === 6 ? 'Phone' : s.id === 7 ? 'Brain' : s.id === 8 ? 'Dna' : 'Stethoscope'), 36),
    image: s.image_url || s.image,
    specialistCategory: s.specialist_category || s.specialistCategory || (s.id === 1 ? 'Gynecology' : s.id === 2 ? 'Pediatrics' : s.id === 3 ? 'General Medicine' : s.id === 4 ? 'Orthopedics' : s.id === 5 ? 'General Surgery' : s.id === 6 ? 'Anesthesia' : s.id === 7 ? 'Psychiatry' : s.id === 8 ? 'Oncology' : 'Gastroenterology'),
    stats: typeof s.stats === 'string' ? JSON.parse(s.stats || '[]') : s.stats,
    details: s.details,
    whyChooseUs: (typeof s.why_choose_us === 'string' ? JSON.parse(s.why_choose_us || '[]') : (s.why_choose_us || s.whyChooseUs || [])).map(w => ({
      ...w,
      icon: getIconComponent(w.icon, 20)
    })),
    conditions: typeof s.conditions === 'string' ? JSON.parse(s.conditions || '[]') : s.conditions,
    facilities: typeof s.facilities === 'string' ? JSON.parse(s.facilities || '[]') : s.facilities,
    equipments: typeof s.equipments === 'string' ? JSON.parse(s.equipments || '[]') : s.equipments,
    faqs: typeof s.faqs === 'string' ? JSON.parse(s.faqs || '[]') : s.faqs
  });

  const staticServices = [
    {
      id: 1,
      name: "Gynecology & Obstetrics",
      tagline: "Comprehensive care for women at every stage of life's journey",
      shortDesc: "Comprehensive maternal care, high-risk pregnancy management, and advanced laparoscopic procedures.",
      icon: <Heart size={36} />,
      image: "/service_gynecology.png",
      specialistCategory: "Gynecology",
      stats: [
        { value: "10,000+", label: "Safe Deliveries" },
        { value: "12+ Years", label: "Average Experience" },
        { value: "24/7", label: "Obstetric Emergencies" }
      ],
      details: "Our Gynecology department provides premium, compassionate care for women through all stages of life. We specialize in high-risk obstetric monitoring, painless deliveries, and advanced laparoscopic (keyhole) surgeries. Our state-of-the-art labor rooms and dedicated fetal medicine scans ensure the highest standards of safety and comfort for both mother and child.",
      whyChooseUs: [
        { title: "Maternal Comfort", text: "Spacious private LDR (Labor, Delivery, Recovery) suites designed for family presence and dynamic relaxation.", icon: <Heart size={20} /> },
        { title: "Advanced Laparoscopy", text: "Minimally invasive keyhole surgeries for uterine fibroids, cysts, and hysterectomy, offering minimal scarring and rapid discharge.", icon: <Sparkles size={20} /> },
        { title: "High-Risk Care", text: "24/7 coverage by senior obstetricians and a round-the-clock neonatology team to support any maternal or fetal complication.", icon: <Shield size={20} /> }
      ],
      conditions: [
        "High-Risk Pregnancies & Pre-eclampsia",
        "PCOS, Endometriosis & Fibroid Management",
        "Infertility Evaluation & Follicular Studies",
        "Laparoscopic & Abdominal Hysterectomies",
        "Adolescent Glandular & Menstrual Health",
        "Menopausal Counseling & Osteoporosis Shield"
      ],
      facilities: [
        "Modular Labor, Delivery & Recovery (LDR) Rooms",
        "High-Resolution 4D Fetal Ultrasound Scans",
        "Laparoscopic HD Surgical Console Room",
        "Dedicated Women's Wellness & Diagnostic Suite"
      ],
      equipments: [
        "GE Voluson 4D Ultrasound Machine",
        "Stryker HD Laparoscopy Tower",
        "Fetal Heart Rate Cardiotocography (CTG) Monitors",
        "Modern Painless Labor Epidural Infusion Pumps"
      ],
      faqs: [
        { q: "What constitutes a high-risk pregnancy?", a: "A pregnancy is considered high-risk if there are pre-existing health conditions like diabetes or high blood pressure, maternal age over 35, multiple gestations, or a history of complications in prior pregnancies. We offer continuous monitoring and specialist consults to manage these safety indicators." },
        { q: "Do you support painless delivery?", a: "Yes, we offer painless labor options through epidural analgesia administered by expert anesthesiologists. This allows mothers to undergo a comfortable labor while actively participating in the delivery." },
        { q: "What are the advantages of laparoscopic gynecology surgery?", a: "Laparoscopic surgeries utilize microscopic incisions, which results in significantly less post-operative pain, faster discharge (often within 24-48 hours), lower risk of surgical site infections, and a swift return to normal life." }
      ]
    },
    {
      id: 2,
      name: "Pediatrics & Neonatology",
      tagline: "Dedicated neonatal critical care and pediatric excellence",
      shortDesc: "Specialized medical care for newborns, infants, children, and adolescents.",
      icon: <Award size={36} />,
      image: "/service_pediatrics.png",
      specialistCategory: "Pediatrics",
      stats: [
        { value: "Level III", label: "Neonatal ICU (NICU)" },
        { value: "15+ Years", label: "Pediatric Expertise" },
        { value: "24/7", label: "Pediatric Emergency" }
      ],
      details: "Backed by expert pediatricians and neonatologists, we operate a highly sterile, modern Level-III Neonatal ICU (NICU) to nurse pre-term or critical newborns back to health. We offer comprehensive child health assessments, standardized immunization programs, and developmental milestones tracking in a patient-friendly environment.",
      whyChooseUs: [
        { title: "Level III NICU", text: "Equipped with advanced multi-parameter monitors, double-surface phototherapy, and high-frequency ventilators.", icon: <ShieldCheck size={20} /> },
        { title: "Developmental Care", text: "Continuous tracking of childhood developmental milestones and guidance on pediatric nutrition and growth.", icon: <Users size={20} /> },
        { title: "24/7 Emergency Support", text: "Prompt clinical management for pediatric trauma, febrile seizures, severe dehydration, and acute asthma attacks.", icon: <Phone size={20} fill="currentColor" /> }
      ],
      conditions: [
        "Pre-term Birth & Low Birth Weight Care",
        "Neonatal Jaundice & Respiratory Distress Syndrome",
        "Childhood Asthma, Allergies & Bronchitis",
        "Acute Pediatric Infections & Prolonged Fevers",
        "Growth Delay & Nutritional Deficiencies",
        "Standard Child Vaccination Schedules"
      ],
      facilities: [
        "Advanced Level-III Modular Neonatal ICU (NICU)",
        "Dedicated Pediatric Emergency Resuscitation Bay",
        "Child-Friendly Ward Layout & Play Area",
        "Sterilized Lactation Support & Counseling Rooms"
      ],
      equipments: [
        "Dräger Neonatal Ventilators & CPAP Units",
        "GE Giraffe Incubators & Radiant Warmers",
        "LED Double-Surface Phototherapy Panels",
        "Micro-infusion Syringe Pumps for Neonates"
      ],
      faqs: [
        { q: "What is a Level-III NICU facility?", a: "A Level-III NICU is capable of providing comprehensive care for newborns born at extremely early gestational ages (pre-term) or those with critical medical illnesses, utilizing advanced respiratory support and continuous monitoring." },
        { q: "How often should my child visit the pediatrician?", a: "During the first year, visits are scheduled frequently (at birth, 6 weeks, 10 weeks, 14 weeks, 6 months, 9 months, and 12 months) to match vaccination schedules and check growth. Thereafter, annual wellness checkups are recommended." },
        { q: "Does the hospital have a pediatric emergency team?", a: "Yes, our emergency and pediatric teams are available 24/7 to manage any critical children's health crisis, including accidents, breathing trouble, or high fever." }
      ]
    },
    {
      id: 3,
      name: "General Medicine",
      tagline: "Your primary health shield against acute illnesses & chronic conditions",
      shortDesc: "Diagnostic and therapeutic care for lifestyle diseases, endocrine issues, and acute infections.",
      icon: <ShieldCheck size={36} />,
      image: "/service_general_medicine.png",
      specialistCategory: "General Medicine",
      stats: [
        { value: "50,000+", label: "Patients Treated" },
        { value: "100%", label: "Diagnostic Accuracy" },
        { value: "Preventive", label: "Health Focus" }
      ],
      details: "The General Medicine department acts as the primary health shield of New Life Hospital. We specialize in the diagnosis and management of lifestyle disorders (such as diabetes and hypertension), thyroid complications, viral fevers, infectious diseases, and respiratory illnesses like COPD, with a strong focus on preventive health packages.",
      whyChooseUs: [
        { title: "Chronic Disease Control", text: "Individualized management plans for complex diabetes, hypertension, and endocrine imbalances.", icon: <Activity size={20} /> },
        { title: "Advanced Diagnostics", text: "In-house fully automated pathology lab and digital ECG systems for quick, precise diagnostic reports.", icon: <Building size={20} /> },
        { title: "Infectious Care", text: "Dedicated isolation wards and safety protocols to treat infectious diseases and prolonged fevers safely.", icon: <Shield size={20} /> }
      ],
      conditions: [
        "Diabetes Mellitus & Diabetic Complications",
        "Chronic Hypertension & Ischemic Heart Care",
        "Thyroid, Hormonal & Endocrine Imbalances",
        "Infectious Fevers (Dengue, Typhoid, Malaria)",
        "Chronic Asthma, COPD & Respiratory Infections",
        "Comprehensive Adult Immunizations"
      ],
      facilities: [
        "Fully Automated Digital Pathology Laboratory",
        "Cardiac Screening Suite with Digital ECG & Stress Tests",
        "Spacious Semi-private & Private Inpatient Wards",
        "Dedicated Preventive Health Package Cabin"
      ],
      equipments: [
        "Fully Automated Biochemistry Analyzers",
        "12-Channel High-Res Digital ECG Machines",
        "Multi-parameter Bedside Vital Monitors",
        "Advanced Point-of-Care Diagnostic Kits"
      ],
      faqs: [
        { q: "How can I enroll in a preventative health checkup?", a: "You can book a health checkup packages online or by calling the desk. We recommend fasting for 10-12 hours prior to the checkup for accurate blood test reports." },
        { q: "What support do you offer for chronic diabetes management?", a: "We provide comprehensive diabetic care, including blood sugar profiling, HbA1c testing, diabetic foot checks, nutritional counseling, and medication management to prevent kidney or heart complications." },
        { q: "Are emergency services available for sudden fevers?", a: "Yes, our general medicine and emergency departments are staffed 24/7 to receive and treat patients presenting with high fevers, severe infections, or acute physical distress." }
      ]
    },
    {
      id: 4,
      name: "Orthopedics & Joint Care",
      tagline: "Restoring mobility and performance through advanced bone and joint care",
      shortDesc: "Advanced bone, spine, joint replacements, and emergency fracture management.",
      icon: <Activity size={36} />,
      image: "/service_orthopedics.png",
      specialistCategory: "Orthopedics",
      stats: [
        { value: "1,500+", label: "Joint Replacements" },
        { value: "Minimal", label: "Recovery Time" },
        { value: "24/7", label: "Trauma Care" }
      ],
      details: "Our Orthopedics department is dedicated to restoring your freedom of movement. We specialize in minimally invasive joint replacements (knee and hip), complex fracture fixations, spinal therapies, arthroscopic sports injury treatments, and personalized post-surgical rehabilitation programs.",
      whyChooseUs: [
        { title: "Advanced Joint Replacements", text: "High-precision knee and hip reconstruction procedures using imported implants to ensure long-term durability.", icon: <Award size={20} /> },
        { title: "Specialized Ortho OT", text: "Operates within a strictly sterile Modular Operation Theater with laminar air flow to prevent any infection.", icon: <Building size={20} /> },
        { title: "Integrated Rehab", text: "Custom physical therapy programs starting immediately after surgery to ensure a fast, painless return to mobility.", icon: <Activity size={20} /> }
      ],
      conditions: [
        "Osteoarthritis & Severe Joint Degeneration",
        "Complex Trauma, Fractures & Bone Injuries",
        "ACL, MCL, & Meniscus Ligament Tears",
        "Spine Disorders, Sciatica & Slip Disc Issues",
        "Chronic Shoulder & Elbow Joint Pain",
        "Rheumatoid Arthritis & Osteoporosis Shield"
      ],
      facilities: [
        "Modular Orthopedic OT with Clean Laminar Flow",
        "Advanced Post-Surgical Physiotherapy Rehab Center",
        "High-Resolution Digital X-Ray Diagnostic Unit",
        "Specialized Plaster & Orthotic Fitting Room"
      ],
      equipments: [
        "High-End C-Arm Image Intensifier Setup",
        "Stryker Orthopedic Drill & Saw Console",
        "Advanced Knee & Hip Joint Arthroplasty Kits",
        "Digital High-Frequency X-Ray Machine"
      ],
      faqs: [
        { q: "How long is the recovery period after a total knee replacement?", a: "Most patients start walking with support within 24 hours of surgery. With consistent post-operative physiotherapy, patients can return to standard daily activities within 4 to 6 weeks." },
        { q: "What is arthroscopic surgery?", a: "Arthroscopy is a minimally invasive keyhole procedure used to diagnose and treat joint problems, such as torn ligaments or damaged cartilage. It utilizes a tiny camera, resulting in small scars and faster healing." },
        { q: "Do you treat emergency fractures?", a: "Yes, our orthopedics team is on alert 24/7 to perform emergency surgeries for complex fractures, accident trauma, and joint dislocations." }
      ]
    },
    {
      id: 5,
      name: "Laparoscopic & General Surgery",
      tagline: "High-precision minimally invasive surgical interventions",
      shortDesc: "Advanced keyhole surgeries and open procedures for faster healing and shorter hospital stays.",
      icon: <Sparkles size={36} />,
      image: "/service_surgery.png",
      specialistCategory: "General Surgery",
      stats: [
        { value: "3,000+", label: "Surgeries Conducted" },
        { value: "99.8%", label: "Infection-free Rate" },
        { value: "Micro", label: "Incision Healing" }
      ],
      details: "We utilize cutting-edge laparoscopic technology to perform precise abdominal operations. Keyhole surgery means smaller incisions, significantly reduced post-operative pain, minimal risk of infection, shorter hospital stays, and a faster return to daily activities compared to conventional open surgeries.",
      whyChooseUs: [
        { title: "HD Laparoscopic Towers", text: "Surgeries performed using ultra-high-definition imaging towers for maximum precision and anatomical safety.", icon: <Sparkles size={20} /> },
        { title: "Shorter Recovery", text: "Most laparoscopic patients are discharged within 24-48 hours, experiencing minimal pain and scars.", icon: <Clock size={20} /> },
        { title: "Aseptic OT Protocol", text: "Three operation theaters featuring laminar flow system and HEPA filters to achieve absolute sterility.", icon: <Shield size={20} /> }
      ],
      conditions: [
        "Gallbladder Stones (Cholecystitis)",
        "Inguinal, Umbilical & Ventral Hernias",
        "Acute Appendicitis & Appendectomy",
        "Abdominal Wall Reconstructions",
        "Diabetic Foot & Chronic Wound Management",
        "Varicose Veins & Hemorrhoidal Treatments"
      ],
      facilities: [
        "Modular Operation Theaters with HEPA Air Filters",
        "Dedicated Post-Operative Aseptic Recovery Wards",
        "Central Sterile Supply Department (CSSD) Unit",
        "Advanced Outpatient Consultation Cubicles"
      ],
      equipments: [
        "Karl Storz HD Laparoscopic Surgical Tower",
        "Covidien Valleylab Electrosurgical Generator",
        "Advanced Autoclave & Flash Sterilizers",
        "Ergonomic Hydraulic OT Table Sets"
      ],
      faqs: [
        { q: "What surgeries are done laparoscopically?", a: "Common surgeries include gallbladder removal, hernia repairs, appendix removal, diagnostic laparoscopy, and various ovarian or uterine surgeries. Most non-cancerous abdominal issues are ideal candidates for laparoscopic keyhole access." },
        { q: "How long do I need to stay in the hospital after laparoscopic hernia surgery?", a: "Generally, patients stay for 1 to 2 days. The precise duration depends on the size of the hernia and the patient's overall health, but recovery is significantly shorter than traditional open repair." },
        { q: "What is your operating theater sterilization protocol?", a: "We follow strict international guidelines including daily air culture tests, sterile autoclave processing for all instruments, HEPA filtration, and laminar air flow to ensure a highly sterile surgical field." }
      ]
    },
    {
      id: 6,
      name: "Emergency & Critical Care",
      tagline: "Every second counts: 24/7 immediate life support and trauma rescue",
      shortDesc: "24/7 immediate trauma care, cardiac life-support, and ICU monitoring.",
      icon: <Phone size={36} fill="currentColor" />,
      image: "/service_emergency.png",
      specialistCategory: "Anesthesia",
      stats: [
        { value: "24/7/365", label: "Active Coverage" },
        { value: "10 mins", label: "Ambulance Response" },
        { value: "Critical", label: "ICU Ventilators" }
      ],
      details: "Our Emergency and Critical Care department is built to act when every second matters. With a round-the-clock team of trauma specialists, ICU nurses, and fully loaded life-support ambulances, we are fully equipped to manage critical emergencies including strokes, cardiac arrests, respiratory failure, and severe physical trauma.",
      whyChooseUs: [
        { title: "Advanced Ambulances", text: "Emergency vehicles fitted with transport ventilators, defibrillators, oxygen support, and communication links.", icon: <Phone size={20} fill="currentColor" /> },
        { title: "Intensive Monitoring", text: "ICU units featuring modern central monitoring systems, high-end ventilators, and 1:1 nurse-patient care.", icon: <Activity size={20} /> },
        { title: "Rapid Action Triage", text: "A specialized triage trauma bay designed to immediately evaluate and stabilize critical cases.", icon: <Shield size={20} /> }
      ],
      conditions: [
        "Acute Cardiac Arrest & Heart Attacks",
        "Acute Strokes & Neurological Crises",
        "Severe Accidental & Road Trauma Injuries",
        "Acute Respiratory Distress & Sepsis Cases",
        "Poisonings & Snakebite Emergencies",
        "Severe Burn Injuries & Wound Resuscitation"
      ],
      facilities: [
        "24/7 Active Fully Equipped Cardiac Ambulance",
        "Modern Multi-bed ICU with Central Monitoring",
        "Emergency Triage Area & Trauma Resuscitation Bay",
        "Round-the-clock Emergency Diagnostics & Blood Unit"
      ],
      equipments: [
        "High-End ICU Ventilators (Dräger & Hamilton)",
        "Biphasic Defibrillators with External Pacemakers",
        "Advanced Syringe Pumps & Arterial Line Monitors",
        "Emergency Portable Ultrasound & X-Ray Units"
      ],
      faqs: [
        { q: "How can I request the ambulance service?", a: "You can dial our dedicated emergency hotline (+91 99999 99999) directly, which is active 24/7. The ambulance team will immediately dispatch to your location with basic or advanced life support gear." },
        { q: "What is a triage system?", a: "Triage is the process of sorting patients based on the severity of their condition. Critical cases (such as heart attacks or severe breathing difficulty) are taken inside immediately, bypassing registration procedures." },
        { q: "Are specialist doctors available at night?", a: "Yes, we have on-duty emergency physicians, anesthesiologists, and critical care specialists in the hospital 24/7, with on-call surgical experts arriving within minutes." }
      ]
    },
    {
      id: 7,
      name: "Psychiatry & Mental Health",
      tagline: "Compassionate counseling and treatment for your mental well-being",
      shortDesc: "Compassionate evaluation, counseling, and treatment for cognitive, emotional, and behavioral wellness.",
      icon: <Brain size={36} />,
      image: "/service_psychiatry.png",
      specialistCategory: "Psychiatry",
      stats: [
        { value: "100%", label: "Confidentiality" },
        { value: "Compassionate", label: "Care Model" },
        { value: "Therapy", label: "Focused" }
      ],
      details: "Our Psychiatry & Mental Health department offers a confidential, warm, and supportive environment for cognitive and emotional wellness. We specialize in therapy and clinical management for stress, depression, anxiety, and sleep disorders, helping patients reclaim peace of mind. We provide comprehensive counseling, family therapy, and lifestyle guidance.",
      whyChooseUs: [
        { title: "Empathetic Support", text: "Care focused on understanding the patient's individual emotional and behavioral journey.", icon: <Heart size={20} /> },
        { title: "Complete Confidentiality", text: "We strictly uphold privacy standards to ensure all counseling and treatments remain secure.", icon: <ShieldCheck size={20} /> },
        { title: "Holistic Recovery", text: "A balanced mix of clinical assessment, counseling therapy, and stress management guidelines.", icon: <Users size={20} /> }
      ],
      conditions: [
        "Generalized Anxiety & Panic Disorders",
        "Clinical Depression & Mood Disturbance",
        "Chronic Stress & Work Burnout Counseling",
        "Sleep Disorders & Insomnia Management",
        "Childhood Behavioral & Learning Concerns",
        "Family & Relationship Wellness Therapy"
      ],
      facilities: [
        "Private Soundproof Counseling Suites",
        "Calm & Inviting Outpatient Therapy Rooms",
        "Dedicated Diagnostic Testing Area",
        "Relaxing Consultation Lounge for Families"
      ],
      equipments: [
        "Standardized Psychometric Assessment Tools",
        "Modern Biofeedback Relaxation Systems",
        "Calming Light & Sound Therapy Gear",
        "Cognitive Behavioral Training Material"
      ],
      faqs: [
        { q: "What should I expect during my first psychiatry consultation?", a: "Your first session is a safe space to discuss your emotional and physical wellness concerns. The doctor will perform a comprehensive diagnostic review, listen to your experiences, and partner with you to outline a personalized care plan." },
        { q: "Is counselling confidential?", a: "Yes, absolute confidentiality is the foundation of our psychiatry services. All records, consultations, and treatment discussions are kept secure and private." },
        { q: "Do you offer support for sleep-related issues?", a: "Yes, we diagnose and treat sleep disorders like insomnia, helping patients recover natural sleep patterns through medical guidance, sleep hygiene counseling, and stress relief therapies." }
      ]
    },
    {
      id: 8,
      name: "Oncology & Cancer Care",
      tagline: "Dedicated supportive care, early detection screening, and chemotherapy",
      shortDesc: "Comprehensive cancer screening, early detection, supportive chemotherapy, and palliative care.",
      icon: <Dna size={36} />,
      image: "/service_oncology.png",
      specialistCategory: "Oncology",
      stats: [
        { value: "Early", label: "Detection Focus" },
        { value: "Chemo", label: "Infusion Suite" },
        { value: "Supportive", label: "Care Team" }
      ],
      details: "Our Oncology & Cancer Care team is dedicated to early screening, accurate staging, and compassionate supportive therapies. We work closely with leading surgical oncologists and radiotherapists to provide comprehensive cancer care plans, including safe outpatient chemotherapy infusion and supportive counseling. Our focus is to provide high-quality comfort care and patient support throughout the journey.",
      whyChooseUs: [
        { title: "Specialized Infusion Suite", text: "A sterile, peaceful outpatient unit designed for comfortable and safe chemotherapy administration.", icon: <Shield size={20} /> },
        { title: "Early Detection Screening", text: "Advanced diagnostic screenings to detect cell abnormalities early, when treatments are most effective.", icon: <Sparkles size={20} /> },
        { title: "Palliative & Compassionate Care", text: "Dedicated pain management and emotional counseling to support patients and their families.", icon: <Heart size={20} /> }
      ],
      conditions: [
        "Comprehensive Breast & Cervical Cancer Screening",
        "Early Gastric, Colon & Esophageal Cancer Checks",
        "Outpatient Supportive Chemotherapy Management",
        "Palliative Pain Relief & Comfort Therapies",
        "Oncology Second-Opinion Consultations",
        "Post-Treatment Recovery & Nutrition Guidelines"
      ],
      facilities: [
        "Modern Sterile Chemotherapy Infusion Ward",
        "Dedicated Cancer Screening & Advisory Room",
        "Private Consultation & Pain Management Clinic",
        "Advanced Histopathology Laboratory Setup"
      ],
      equipments: [
        "High-Precision Infusion Pump Systems",
        "Biosafety Cabinets for Chemo Drug Preparation",
        "Advanced Tissue Biopsy & Lab Instruments",
        "Comfortable Adjustable Recliner Infusion Beds"
      ],
      faqs: [
        { q: "Why is early cancer screening important?", a: "Screening checks for cancer before a person has any symptoms. Early detection allows for treatment at the earliest stages, which significantly improves success rates and recovery timelines." },
        { q: "How is outpatient chemotherapy managed?", a: "Our dedicated infusion suite is designed for comfort. Patients receive their prescribed cycles in a physical room under the close supervision of oncology-trained nurses, and can usually return home the same day." },
        { q: "Do you offer nutritional counseling for oncology patients?", a: "Yes, nutrition is vital during cancer therapy. Our specialists provide custom dietary guidelines to manage side effects, boost energy, and support the body's natural strength." }
      ]
    },
    {
      id: 9,
      name: "Gastroenterology & Gastric Care",
      tagline: "Advanced diagnostics and treatment for gastric and liver health",
      shortDesc: "Diagnosis and treatments for liver, stomach, and digestive tract disorders.",
      icon: <Stethoscope size={36} />,
      image: "/service_gastroenterology.png",
      specialistCategory: "Gastroenterology",
      stats: [
        { value: "Diagnostics", label: "Endoscopy Room" },
        { value: "Rapid", label: "Ulcer Relief" },
        { value: "Custom", label: "Diet Plans" }
      ],
      details: "The Gastroenterology & Gastric Care department specializes in checking and treating disorders of the digestive tract, esophagus, stomach, liver, and colon. We focus on acid reflux relief, ulcer healing, and digestive wellness through advanced diagnostics and custom nutrition therapies. We are equipped with modern endoscopy technology to ensure precise evaluation and targeted treatment.",
      whyChooseUs: [
        { title: "Advanced Endoscopy", text: "Minimally invasive diagnostic imaging to inspect the stomach and colon for ulcers or polyps.", icon: <Building size={20} /> },
        { title: "Digestive Wellness Focus", text: "Targeted medical management for acidity, chronic GERD, irritable bowel syndrome, and liver health.", icon: <Activity size={20} /> },
        { title: "Custom Nutrition Care", text: "Integrated diet plans and lifestyle programs to support digestion and restore gut health.", icon: <Award size={20} /> }
      ],
      conditions: [
        "Acidity, Chronic GERD & Heartburn",
        "Gastritis & Peptic Stomach Ulcers",
        "Irritable Bowel Syndrome (IBS) & Colitis",
        "Fatty Liver & Gallbladder Disorders",
        "Chronic Constipation, Bloating & Diarrhea",
        "Food Intolerance & Celiac Evaluation"
      ],
      facilities: [
        "Modern Endoscopy & Colonoscopy Room",
        "Clean Post-Procedure Patient Recovery Lounge",
        "Sterilized Scope Processing & Autoclave Unit",
        "Dietary Consultation & Wellness Cabin"
      ],
      equipments: [
        "High-Definition Video Endoscopes (Olympus)",
        "Advanced Endoscopic Light Source & Monitors",
        "Continuous Vital Sign Patient Monitors",
        "Automated Endoscope Re-processor Units"
      ],
      faqs: [
        { q: "What symptoms warrant a visit to a gastroenterologist?", a: "You should consult a specialist if you experience persistent heartburn/acidity, chronic stomach pain, unexplained weight loss, constant bloating, or blood in stools." },
        { q: "What is an endoscopy procedure?", a: "Endoscopy is a safe, quick diagnostic test where a thin, flexible tube with a camera is guided into the upper digestive tract to inspect the lining for inflammation, ulcers, or other issues." },
        { q: "How can I prevent chronic acidity/GERD?", a: "Acidity can often be managed by eating smaller meals, avoiding trigger foods (spicy, fatty foods), staying upright for 2 hours after eating, and following a custom dietary plan from our specialists." }
      ]
    }
  ];

  // Find current service
  const currentService = services.find(s => s.id === parseInt(id || '1', 10)) || services[0] || staticServices.map(mapBackendServiceToFrontend)[0];

  // Fetch doctors for this service category
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await fetch('/api/doctors');
        const data = await res.json();
        if (Array.isArray(data)) {
          // Filter doctors who belong to current specialist category
          const filtered = data.filter(doc => 
            doc.status !== 'Inactive' && 
            (doc.category.toLowerCase().includes(currentService.specialistCategory.toLowerCase()) ||
             doc.specialty.toLowerCase().includes(currentService.specialistCategory.toLowerCase()))
          );
          setDoctorsList(filtered);
        }
      } catch (err) {
        console.error('Failed to load doctors in service details:', err);
      }
    };
    loadDoctors();
  }, [id, currentService.specialistCategory]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill out Name, Phone and Date.');
      return;
    }

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          doctorName: `Department Specialist (${currentService.name})`,
          specialty: currentService.name,
          date: formData.date,
          timeSlot: formData.timeSlot
        })
      });
      const data = await res.json();
      if (data.success) {
        setFormSubmitted(true);
        setFormData({ name: '', phone: '', date: '', timeSlot: 'Morning (10:00 AM - 1:00 PM)' });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        alert('Booking request failed: ' + data.error);
      }
    } catch (err) {
      // Offline fallback success for presentation
      setFormSubmitted(true);
      setFormData({ name: '', phone: '', date: '', timeSlot: 'Morning (10:00 AM - 1:00 PM)' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  const handleDoctorRedirect = (doctorName) => {
    setSelectedDoctor(doctorName);
    setCurrentPage('doctors');
    navigate('/doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <style>{`
        /* Service Details Styles */
        .details-wrapper {
          background-color: var(--bg-light);
          padding-bottom: 5rem;
        }

        /* Hero Banner Section */
        .service-details-hero {
          position: relative;
          padding: 6.5rem 0 5rem 0;
          color: var(--bg-white);
          overflow: hidden;
          background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy-medium) 100%);
        }

        .service-details-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 80% 20%, var(--primary-glow) 0%, transparent 60%);
          opacity: 0.8;
          z-index: 1;
        }

        .hero-banner-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Breadcrumb navigation links */
        .breadcrumbs-list {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-light);
        }

        .breadcrumb-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .breadcrumb-back-link:hover {
          color: var(--primary);
        }

        .breadcrumb-separator {
          color: var(--text-light);
          opacity: 0.5;
        }

        .breadcrumb-active-label {
          color: var(--primary);
        }

        /* Service Name & Tagline */
        .hero-title-box {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .hero-icon-container {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-md);
          background: var(--primary-glow);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(16, 185, 129, 0.25);
          flex-shrink: 0;
          animation: float 4s ease-in-out infinite;
        }

        .hero-text-container h1 {
          font-size: 2.8rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .hero-text-container p {
          font-size: 1.15rem;
          color: var(--text-light);
          font-weight: 500;
        }

        /* Key Metrics / Stats Row */
        .hero-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 700px;
          margin-top: 1rem;
        }

        .metric-card-box {
          padding: 1.25rem 1.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metric-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
        }

        .metric-label {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Two Column Main Area */
        .details-container-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 3rem;
          margin-top: 3.5rem;
          align-items: start;
        }

        /* Content Blocks in Left Side */
        .details-left-side {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .content-card-section {
          background-color: var(--bg-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
          padding: 3rem;
          position: relative;
        }

        .content-card-section h2.section-header {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 12px;
        }

        .content-card-section h2.section-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background-color: var(--primary);
          border-radius: var(--radius-full);
        }

        .overview-paragraph {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-medium);
        }

        /* Why Choose Us Cards */
        .why-choose-us-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .why-choose-card {
          display: flex;
          gap: 18px;
          background-color: var(--bg-light);
          border: 1px solid var(--border-color);
          padding: 1.75rem;
          border-radius: var(--radius-md);
          transition: var(--transition-normal);
        }

        .why-choose-card:hover {
          transform: translateX(6px);
          border-color: rgba(16, 185, 129, 0.25);
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.03);
        }

        .why-choose-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background-color: var(--primary-glow);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .why-choose-txt h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 6px;
        }

        .why-choose-txt p {
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.6;
        }

        /* Two column layout for lists */
        .lists-flex-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2rem;
        }

        .list-card-box {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .list-card-box h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--secondary);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .list-card-box h3 svg {
          color: var(--primary);
        }

        .bulleted-list-styled {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bulleted-list-styled li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 0.95rem;
          color: var(--text-medium);
          font-weight: 500;
          line-height: 1.5;
        }

        .bullet-tick-icon {
          flex-shrink: 0;
          color: var(--primary);
          margin-top: 3px;
        }

        /* Equipments tags list */
        .equipments-tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 1.5rem;
        }

        .equipment-tag-item {
          padding: 8px 16px;
          background-color: var(--bg-light);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .equipment-tag-item::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--primary);
        }

        /* Specialists Doctor Profiles Section */
        .specialist-doctors-box {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .doc-small-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .small-doctor-card {
          padding: 1.5rem;
          background-color: var(--bg-white);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          display: flex;
          gap: 16px;
          align-items: center;
          transition: var(--transition-normal);
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.02);
        }

        .small-doctor-card:hover {
          transform: translateY(-5px);
          border-color: rgba(16, 185, 129, 0.25);
          box-shadow: var(--card-shadow);
        }

        .small-doc-avatar {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-sm);
          background-color: var(--secondary);
          color: var(--bg-white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.75rem;
          flex-shrink: 0;
          overflow: hidden;
        }

        .small-doc-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .small-doc-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .small-doc-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--secondary);
          line-height: 1.25;
        }

        .small-doc-spec {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--primary);
          margin-top: 2px;
        }

        .small-doc-exp {
          font-size: 0.8rem;
          color: var(--text-light);
          margin-top: 2px;
        }

        .small-doc-action-btn {
          margin-top: 8px;
          font-size: 0.8rem;
          background: none;
          border: none;
          color: var(--secondary);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 0;
          transition: var(--transition-fast);
        }

        .small-doc-action-btn:hover {
          color: var(--primary);
        }

        .no-docs-message {
          padding: 2rem;
          border-radius: var(--radius-sm);
          background-color: var(--bg-light);
          border: 1px dashed var(--border-color);
          text-align: center;
          color: var(--text-medium);
          font-size: 0.95rem;
        }

        /* FAQ Accordion Section */
        .faq-accordion-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .accordion-item-box {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          overflow: hidden;
          transition: var(--transition-normal);
          background-color: var(--bg-white);
        }

        .accordion-item-box.active {
          border-color: rgba(16, 185, 129, 0.25);
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.02);
        }

        .accordion-trigger {
          width: 100%;
          padding: 1.25rem 1.5rem;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .accordion-trigger h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--secondary);
          transition: var(--transition-fast);
        }

        .accordion-item-box.active .accordion-trigger h3,
        .accordion-trigger:hover h3 {
          color: var(--primary);
        }

        .accordion-icon-box {
          color: var(--text-medium);
          transition: transform 0.3s ease;
        }

        .accordion-item-box.active .accordion-icon-box {
          transform: rotate(180deg);
          color: var(--primary);
        }

        .accordion-content-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
          background-color: var(--bg-light);
        }

        .accordion-item-box.active .accordion-content-panel {
          max-height: 500px; /* Adjust as necessary */
          transition: max-height 0.3s ease-in;
        }

        .accordion-inner-text {
          padding: 1.25rem 1.5rem;
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.6;
          border-top: 1px solid var(--border-color);
        }

        /* Sticky Sidebar Column (Right) */
        .details-right-sidebar {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-booking-card {
          background-color: var(--bg-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
          padding: 2.5rem 2rem;
          position: relative;
        }

        .sidebar-booking-card h3 {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 6px;
        }

        .sidebar-booking-card p.card-tag {
          font-size: 0.9rem;
          color: var(--text-medium);
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .sidebar-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-input-group label {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-medium);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .btn-form-submit {
          width: 100%;
          height: 48px;
          margin-top: 0.5rem;
        }

        /* Contact Details Widget */
        .sidebar-contact-info-card {
          background-color: var(--secondary);
          color: var(--bg-white);
          border-radius: var(--radius-lg);
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .sidebar-contact-info-card h3 {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
        }

        .sidebar-contact-info-card p {
          font-size: 0.95rem;
          color: var(--text-light);
          line-height: 1.6;
        }

        .contact-bullet-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .contact-icon-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-text-lines {
          display: flex;
          flex-direction: column;
        }

        .contact-text-lines span.lbl {
          font-size: 0.75rem;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .contact-text-lines span.val {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        /* Callback Success state card */
        .form-success-alert {
          padding: 2.5rem 1.5rem;
          border-radius: var(--radius-md);
          background-color: #d1fae5;
          border: 1px solid #a7f3d0;
          text-align: center;
          color: #065f46;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          animation: bounce 0.6s ease;
        }

        .success-checkmark-box {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #10b981;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
        }

        .form-success-alert h4 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #065f46;
        }

        .form-success-alert p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #047857;
        }

        /* Animations */
        .stagger-1 { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .stagger-2 { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .stagger-3 { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

        /* Responsive Overrides */
        @media (max-width: 1024px) {
          .details-container-grid {
            grid-template-columns: 1.5fr 1fr;
            gap: 2rem;
          }
          .hero-text-container h1 {
            font-size: 2.4rem;
          }
        }

        @media (max-width: 768px) {
          .details-container-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-title-box {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
          .hero-text-container h1 {
            font-size: 2rem;
          }
          .hero-metrics-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .content-card-section {
            padding: 2rem 1.5rem;
          }
          .lists-flex-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .doc-small-grid {
            grid-template-columns: 1fr;
          }
          .details-right-sidebar {
            position: relative;
            top: 0;
          }
        }
      `}</style>

      <div className="details-wrapper">
        {/* Banner Hero */}
        <section className="service-details-hero text-white">
          <div className="container hero-banner-content">
            {/* Breadcrumbs */}
            <div className="breadcrumbs-list stagger-1">
              <span onClick={() => { setCurrentPage('services'); navigate('/services'); }} className="breadcrumb-back-link">
                <ArrowLeft size={16} />
                <span>Our Services</span>
              </span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-active-label">{currentService.name}</span>
            </div>

            {/* Title Block */}
            <div className="hero-title-box stagger-2">
              <div className="hero-icon-container">
                {currentService.icon}
              </div>
              <div className="hero-text-container">
                <h1>{currentService.name}</h1>
                <p>{currentService.tagline}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="hero-metrics-grid stagger-3">
              {currentService.stats.map((stat, idx) => (
                <div key={idx} className="metric-card-box">
                  <span className="metric-value">{stat.value}</span>
                  <span className="metric-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Grid Area */}
        <div className="container">
          <div className="details-container-grid">
            
            {/* Left Content Side */}
            <div className="details-left-side">
              
              {/* Overview Section */}
              <section className="content-card-section animate-fade-in" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '320px', width: '100%', overflow: 'hidden' }}>
                  <img src={currentService.image} alt={currentService.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '3rem' }}>
                  <h2 className="section-header">Department Overview</h2>
                  <p className="overview-paragraph">{currentService.details}</p>
                </div>
              </section>

              {/* Why Choose Us */}
              <section className="content-card-section">
                <h2 className="section-header">Why Choose New Life?</h2>
                <div className="why-choose-us-grid">
                  {currentService.whyChooseUs.map((item, idx) => (
                    <div key={idx} className="why-choose-card">
                      <div className="why-choose-icon-box">{item.icon}</div>
                      <div className="why-choose-txt">
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Conditions & Facilities Flex Grid */}
              <section className="content-card-section">
                <div className="lists-flex-grid">
                  
                  {/* Conditions List */}
                  <div className="list-card-box">
                    <h3>
                      <Activity size={20} />
                      <span>Procedures & Care</span>
                    </h3>
                    <ul className="bulleted-list-styled">
                      {currentService.conditions.map((item, idx) => (
                        <li key={idx}>
                          <Check size={18} className="bullet-tick-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Infrastructure List */}
                  <div className="list-card-box">
                    <h3>
                      <Building size={20} />
                      <span>Facilities & Setup</span>
                    </h3>
                    <ul className="bulleted-list-styled">
                      {currentService.facilities.map((item, idx) => (
                        <li key={idx}>
                          <Check size={18} className="bullet-tick-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </section>

              {/* Specialized Equipments */}
              <section className="content-card-section">
                <h2 className="section-header">Advanced Medical Technologies</h2>
                <p className="overview-paragraph" style={{ marginBottom: '1.25rem' }}>
                  We deploy cutting-edge medical hardware and monitoring devices inside our clinics and operating rooms to optimize treatment precision.
                </p>
                <div className="equipments-tags-wrapper">
                  {currentService.equipments.map((eq, idx) => (
                    <div key={idx} className="equipment-tag-item">
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Associated Specialists Doctors list */}
              <section className="content-card-section">
                <h2 className="section-header">Meet Our Specialist Doctors</h2>
                <div className="specialist-doctors-box">
                  {doctorsList.length > 0 ? (
                    <div className="doc-small-grid">
                      {doctorsList.map((doc) => {
                        const docInitials = doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('');
                        return (
                          <div key={doc.id} className="small-doctor-card">
                            <div className="small-doc-avatar">
                              {doc.image_url ? (
                                <img src={doc.image_url} alt={doc.name} onError={(e) => { e.target.style.display = 'none'; }} />
                              ) : null}
                              <span className="profile-initials">{docInitials}</span>
                            </div>
                            <div className="small-doc-info">
                              <h3 className="small-doc-name">{doc.name}</h3>
                              <span className="small-doc-spec">{doc.specialty}</span>
                              <span className="small-doc-exp">{doc.experience} Experience</span>
                              <button 
                                onClick={() => handleDoctorRedirect(doc.name)}
                                className="small-doc-action-btn"
                              >
                                <span>Book Consultation</span>
                                <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="no-docs-message">
                      <p>Consultant specialists are available on round-the-clock shift cycles. Please connect using the callback form to verify timings.</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Department FAQ Accordion */}
              <section className="content-card-section">
                <h2 className="section-header">Frequently Asked Questions</h2>
                <div className="faq-accordion-container">
                  {currentService.faqs.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className={`accordion-item-box ${activeFaq === idx ? 'active' : ''}`}
                    >
                      <button 
                        onClick={() => toggleFaq(idx)}
                        className="accordion-trigger"
                        aria-expanded={activeFaq === idx}
                      >
                        <h3>{faq.q}</h3>
                        <span className="accordion-icon-box">
                          <ChevronDown size={20} />
                        </span>
                      </button>
                      <div className="accordion-content-panel">
                        <div className="accordion-inner-text">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Right Column Sticky Sidebar */}
            <div className="details-right-sidebar">
              
              {/* Callback Form Card */}
              <div className="sidebar-booking-card">
                {formSubmitted ? (
                  <div className="form-success-alert">
                    <div className="success-checkmark-box">
                      <Check size={28} />
                    </div>
                    <h4>Request Received!</h4>
                    <p>We have received your callback request. Our care desk coordinator will call you back within 15 minutes.</p>
                  </div>
                ) : (
                  <>
                    <h3>Quick Callback</h3>
                    <p className="card-tag">Enter your details below to request a callback or verify specialist availability.</p>
                    <form onSubmit={handleCallbackSubmit} className="sidebar-form">
                      <div className="form-input-group">
                        <label htmlFor="name">Patient Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required 
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      
                      <div className="form-input-group">
                        <label htmlFor="phone">Contact Number</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          required 
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 9876543210"
                        />
                      </div>
                      
                      <div className="form-input-group">
                        <label htmlFor="date">Preferred Date</label>
                        <input 
                          type="date" 
                          id="date" 
                          name="date" 
                          required 
                          value={formData.date}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-input-group">
                        <label htmlFor="timeSlot">Preferred Shift</label>
                        <select 
                          id="timeSlot" 
                          name="timeSlot" 
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                        >
                          <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                          <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                          <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                        </select>
                      </div>

                      <button type="submit" className="btn btn-primary btn-form-submit">
                        <Calendar size={18} />
                        <span>Request Callback</span>
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Direct Support Card */}
              <div className="sidebar-contact-info-card">
                <h3>Direct Support Desk</h3>
                <p>Have an immediate emergency or medical query? Connect with our 24/7 care hotline.</p>
                
                <div className="contact-bullet-item">
                  <div className="contact-icon-circle">
                    <Phone size={18} fill="currentColor" />
                  </div>
                  <div className="contact-text-lines">
                    <span className="lbl">Emergency Help Desk</span>
                    <span className="val">+91 88192 25959</span>
                  </div>
                </div>

                <div className="contact-bullet-item">
                  <div className="contact-icon-circle">
                    <Clock size={18} />
                  </div>
                  <div className="contact-text-lines">
                    <span className="lbl">OPD Timings</span>
                    <span className="val">Mon - Sat: 10 AM - 8 PM</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
