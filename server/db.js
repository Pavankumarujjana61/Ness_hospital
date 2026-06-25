import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { config as appConfig } from './config/config.js';

let pool = null;

// Initialize Database (Create DB if missing, create tables, seed data)
let isInitializing = false;
let initialized = false;

const initDb = async () => {
  if (initialized || isInitializing) return;
  isInitializing = true;
  try {
    const dbUrl = appConfig.db.url;

    if (dbUrl) {
      console.log('Connecting to MySQL database using connection URL...');
      pool = mysql.createPool(dbUrl);
      console.log('Connected to MySQL database via connection URL.');
    } else {
      const mysqlConfig = {
        host: appConfig.db.host,
        user: appConfig.db.user,
        password: appConfig.db.password,
        port: appConfig.db.port
      };
      const dbName = appConfig.db.database;

      console.log(`[DB] Connecting to MySQL at ${mysqlConfig.host}:${mysqlConfig.port} as '${mysqlConfig.user}', database: '${dbName}'`);
      // 1. Connect without database first (wrapped in try-catch in case user lacks CREATE DB privileges)
      try {
        const tempConnection = await mysql.createConnection(mysqlConfig);
        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        await tempConnection.end();
      } catch (err) {
        console.warn(`[DB] Warning: Could not check/create database '${dbName}': ${err.message}. Connecting to pool directly.`);
      }

      // 2. Create connection pool targeting the database
      pool = mysql.createPool({
        ...mysqlConfig,
        database: dbName,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      console.log(`Connected to MySQL database: ${dbName}`);
    }

    // 3. Create Admins Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'Admin'
      )
    `);

    // 4. Create Doctors Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        qualifications VARCHAR(255) NOT NULL,
        specialty VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        experience VARCHAR(100) NOT NULL,
        timings VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        image_url VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Active',
        availability VARCHAR(50) DEFAULT 'In Hospital',
        sort_order INT DEFAULT 10
      )
    `);

    // Safe column migrations for existing tables
    try {
      await pool.query("ALTER TABLE doctors ADD COLUMN status VARCHAR(50) DEFAULT 'Active'");
      console.log("Migration: Added status column to doctors table.");
    } catch (e) {
      // Column already exists, ignore
    }
    try {
      await pool.query("ALTER TABLE doctors ADD COLUMN availability VARCHAR(50) DEFAULT 'In Hospital'");
      console.log("Migration: Added availability column to doctors table.");
    } catch (e) {
      // Column already exists, ignore
    }
    try {
      await pool.query("ALTER TABLE doctors ADD COLUMN sort_order INT DEFAULT 10");
      console.log("Migration: Added sort_order column to doctors table.");
    } catch (e) {
      // Column already exists, ignore
    }

    // 5. Create Appointments Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patient_name VARCHAR(255) NOT NULL,
        patient_phone VARCHAR(50) NOT NULL,
        doctor_id INT,
        doctor_name VARCHAR(255),
        specialty VARCHAR(255) NOT NULL,
        booking_date VARCHAR(50) NOT NULL,
        booking_time_slot VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
      )
    `);

    // 6. Create Inquiries Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Create Testimonials Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patient_name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        rating INT NOT NULL DEFAULT 5,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 8. Create Banners Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        cta VARCHAR(100) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 9. Create Services Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        tagline VARCHAR(255) NOT NULL,
        short_desc TEXT NOT NULL,
        icon_name VARCHAR(100) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        specialist_category VARCHAR(255) NOT NULL,
        stats TEXT NOT NULL,
        details TEXT NOT NULL,
        why_choose_us TEXT NOT NULL,
        conditions TEXT NOT NULL,
        facilities TEXT NOT NULL,
        equipments TEXT NOT NULL,
        faqs TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('MySQL Tables initialized successfully.');

    // --- Seeding Data ---

    // Seed default admin if none exists
    const [adminCheck] = await pool.query('SELECT count(*) as count FROM admins');
    if (adminCheck[0].count === 0) {
      const defaultPassword = 'admin123';
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(defaultPassword, salt);
      await pool.execute(
        'INSERT INTO admins (username, password_hash, role) VALUES (?, ?, ?)',
        ['admin', hash, 'Admin']
      );
      console.log('Seeded default admin (Username: admin, Password: admin123)');
    }

    // Seed primary doctors if empty
    const [doctorsCheck] = await pool.query('SELECT count(*) as count FROM doctors');
    if (doctorsCheck[0].count === 0) {
      const initialDoctors = [
        {
          name: "Dr. K.S.V.N. Varma",
          qualifications: "MBBS, DCH, Fellowship in Neonatology, PALS, NALS",
          specialty: "Pediatrics & Neonatology",
          category: "Pediatrics",
          experience: "15+ Years",
          timings: "10:00 AM - 1:00 PM, 5:00 PM - 8:00 PM",
          bio: "An outstanding pediatrician specialized in neonatal intensive care, complex childhood disease management, pediatric asthma treatments, and infant developmental health.",
          image_url: "/doctor_varma.jpg",
          status: "Active",
          availability: "In Hospital",
          sort_order: 1
        },
        {
          name: "Dr. N. Lakshmipathi Raju",
          qualifications: "DNB General Medicine",
          specialty: "Consultant General Medicine",
          category: "General Medicine",
          experience: "14+ Years",
          timings: "10:00 AM - 4:00 PM",
          bio: "A trusted consultant general physician with deep expertise in managing lifestyle diseases, diabetes control, thyroid therapies, acute fever treatments, and preventive wellness checks.",
          image_url: "/doctor_lakshmipathi.jpg",
          status: "Active",
          availability: "In Hospital",
          sort_order: 2
        },
        {
          name: "Dr. Koonaparaju Raghavi",
          qualifications: "M.S. (OBG), DNB (Gynecology, Infertility Specialist)",
          specialty: "Consultant Gynecologist & Obstetrician",
          category: "Gynecology",
          experience: "12+ Years",
          timings: "10:00 AM - 2:00 PM, 6:00 PM - 8:00 PM",
          bio: "A leading obstetrician specialized in high-risk pregnancies, infertility diagnostics, keyhole laparoscopic surgeries, contraceptive counseling, and women's hormonal issues.",
          image_url: "/doctor_raghavi.jpg",
          status: "Active",
          availability: "In Hospital",
          sort_order: 3
        },
        {
          name: "Dr. G. Ramakrishna Reddy",
          qualifications: "M.S. Orthopaedics, FIJR",
          specialty: "Consultant Orthopedic & Joint Surgeon",
          category: "Orthopedics",
          experience: "11+ Years",
          timings: "11:00 AM - 3:00 PM, 6:00 PM - 8:00 PM",
          bio: "An expert joint replacement specialist focused on orthopedic trauma, complex fracture fixations, arthritis therapies, knee/hip replacements, and sports injury rehabilitation.",
          image_url: "/doctor_ramakrishna.jpg",
          status: "Active",
          availability: "In Hospital",
          sort_order: 4
        },
        {
          name: "Dr. Pavan",
          qualifications: "MBBS, MD Anes",
          specialty: "Consultant Anesthesiologist",
          category: "Anesthesia",
          experience: "10+ Years",
          timings: "24/7 Critical & Trauma Care Support",
          bio: "A dedicated anesthesiologist overseeing surgical sedation and post-operative pain management, and supporting critical trauma care services round-the-clock.",
          image_url: "/doctor_pavan.jpg",
          status: "Active",
          availability: "In Hospital",
          sort_order: 5
        },
        {
          name: "Dr. Lenin",
          qualifications: "M.S., D.G.S., FAIS",
          specialty: "Laparoscopic & General Surgeon",
          category: "General Surgery",
          experience: "13+ Years",
          timings: "10:00 AM - 2:00 PM, 5:00 PM - 7:00 PM",
          bio: "A seasoned general surgeon skilled in advanced laparoscopic keyhole procedures, gallbladder removals, hernia repairs, appendix surgeries, and emergency abdominal trauma operations.",
          image_url: "/doctor_lenin.jpg",
          status: "Active",
          availability: "In Hospital",
          sort_order: 6
        }
      ];

      for (const doc of initialDoctors) {
        await pool.execute(
          `INSERT INTO doctors (name, qualifications, specialty, category, experience, timings, bio, image_url, status, availability, sort_order) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [doc.name, doc.qualifications, doc.specialty, doc.category, doc.experience, doc.timings, doc.bio, doc.image_url, doc.status, doc.availability, doc.sort_order]
        );
      }
      console.log('Seeded initial doctors lists into MySQL database.');
    }

    // Seed initial testimonials if empty
    const [testimonialsCheck] = await pool.query('SELECT count(*) as count FROM testimonials');
    if (testimonialsCheck[0].count === 0) {
      const initialTestimonials = [
        {
          patient_name: "Ravi Kumar",
          location: "Palakollu",
          rating: 5,
          comment: "The pediatric care under Dr. Varma is outstanding. My 2-year-old was admitted with severe asthma, and the quick response and care saved us. Highly recommended!"
        },
        {
          patient_name: "Siri Latha",
          location: "Narasapuram",
          rating: 5,
          comment: "Dr. Raghavi is an exceptional gynecologist. The maternity department at New Life is very hygienic and supportive. We had our first child here, and the staff was like family."
        },
        {
          patient_name: "Venkatesh Rao",
          location: "Bhimavaram",
          rating: 5,
          comment: "My father underwent knee replacement surgery under Dr. Ramakrishna Reddy. The modular OT facilities and post-op physiotherapy were excellent. He is walking comfortably now."
        }
      ];

      for (const t of initialTestimonials) {
        await pool.execute(
          `INSERT INTO testimonials (patient_name, location, rating, comment) VALUES (?, ?, ?, ?)`,
          [t.patient_name, t.location, t.rating, t.comment]
        );
      }
      console.log('Seeded initial testimonials into MySQL database.');
    }

    // Seed initial banners if empty
    const [bannersCheck] = await pool.query('SELECT count(*) as count FROM banners');
    if (bannersCheck[0].count === 0) {
      const initialBanners = [
        {
          title: "Your Health, Our Responsiblity",
          subtitle: "New Life Emergency & Super Specialty Hospital",
          description: "Delivering advanced medical care, prompt emergency services, and compassionate healing to Palakollu.",
          cta: "Meet Our Team",
          image_url: "/hero_caring_doctors.png"
        },
        {
          title: "State-of-the-Art Surgical Tech",
          subtitle: "3 Ultra-Modern Operation Theaters",
          description: "Equipped with modern laparoscopic and diagnostic infrastructure for precise, minimally invasive care.",
          cta: "Explore Facilities",
          image_url: "/hero_modular_ot.png"
        },
        {
          title: "Specialist Care for Every Family",
          subtitle: "Pediatric, Gynecology & General Care",
          description: "From neonatal care to orthopedics, our board-certified experts guard your family's health.",
          cta: "Book Consultation",
          image_url: "/hero_pediatric_care.png"
        }
      ];

      for (const b of initialBanners) {
        await pool.execute(
          `INSERT INTO banners (title, subtitle, description, cta, image_url) VALUES (?, ?, ?, ?, ?)`,
          [b.title, b.subtitle, b.description, b.cta, b.image_url]
        );
      }
      console.log('Seeded initial banners into MySQL database.');
    }

    // Seed initial services if empty
    const [servicesCheck] = await pool.query('SELECT count(*) as count FROM services');
    if (servicesCheck[0].count === 0) {
      const initialServices = [
        {
          name: "Gynecology & Obstetrics",
          tagline: "Comprehensive care for women at every stage of life's journey",
          short_desc: "Comprehensive maternal care, high-risk pregnancy management, and advanced laparoscopic procedures.",
          icon_name: "Heart",
          image_url: "/service_gynecology.png",
          specialist_category: "Gynecology",
          stats: JSON.stringify([
            { value: "10,000+", label: "Safe Deliveries" },
            { value: "12+ Years", label: "Average Experience" },
            { value: "24/7", label: "Obstetric Emergencies" }
          ]),
          details: "Our Gynecology department provides premium, compassionate care for women through all stages of life. We specialize in high-risk obstetric monitoring, painless deliveries, and advanced laparoscopic (keyhole) surgeries. Our state-of-the-art labor rooms and dedicated fetal medicine scans ensure the highest standards of safety and comfort for both mother and child.",
          why_choose_us: JSON.stringify([
            { title: "Maternal Comfort", text: "Spacious private LDR (Labor, Delivery, Recovery) suites designed for family presence and dynamic relaxation.", icon: "Heart" },
            { title: "Advanced Laparoscopy", text: "Minimally invasive keyhole surgeries for uterine fibroids, cysts, and hysterectomy, offering minimal scarring and rapid discharge.", icon: "Sparkles" },
            { title: "High-Risk Care", text: "24/7 coverage by senior obstetricians and a round-the-clock neonatology team to support any maternal or fetal complication.", icon: "Shield" }
          ]),
          conditions: JSON.stringify([
            "High-Risk Pregnancies & Pre-eclampsia",
            "PCOS, Endometriosis & Fibroid Management",
            "Infertility Evaluation & Follicular Studies",
            "Laparoscopic & Abdominal Hysterectomies",
            "Adolescent Glandular & Menstrual Health",
            "Menopausal Counseling & Osteoporosis Shield"
          ]),
          facilities: JSON.stringify([
            "Modular Labor, Delivery & Recovery (LDR) Rooms",
            "High-Resolution 4D Fetal Ultrasound Scans",
            "Laparoscopic HD Surgical Console Room",
            "Dedicated Women's Wellness & Diagnostic Suite"
          ]),
          equipments: JSON.stringify([
            "GE Voluson 4D Ultrasound Machine",
            "Stryker HD Laparoscopy Tower",
            "Fetal Heart Rate Cardiotocography (CTG) Monitors",
            "Modern Painless Labor Epidural Infusion Pumps"
          ]),
          faqs: JSON.stringify([
            { q: "What constitutes a high-risk pregnancy?", a: "A pregnancy is considered high-risk if there are pre-existing health conditions like diabetes or high blood pressure, maternal age over 35, multiple gestations, or a history of complications in prior pregnancies. We offer continuous monitoring and specialist consults to manage these safety indicators." },
            { q: "Do you support painless delivery?", a: "Yes, we offer painless labor options through epidural analgesia administered by expert anesthesiologists. This allows mothers to undergo a comfortable labor while actively participating in the delivery." },
            { q: "What are the advantages of laparoscopic gynecology surgery?", a: "Laparoscopic surgeries utilize microscopic incisions, which results in significantly less post-operative pain, faster discharge (often within 24-48 hours), lower risk of surgical site infections, and a swift return to normal life." }
          ])
        },
        {
          name: "Pediatrics & Neonatology",
          tagline: "Dedicated neonatal critical care and pediatric excellence",
          short_desc: "Specialized medical care for newborns, infants, children, and adolescents.",
          icon_name: "Award",
          image_url: "/service_pediatrics.png",
          specialist_category: "Pediatrics",
          stats: JSON.stringify([
            { value: "Level III", label: "Neonatal ICU (NICU)" },
            { value: "15+ Years", label: "Pediatric Expertise" },
            { value: "24/7", label: "Pediatric Emergency" }
          ]),
          details: "Backed by expert pediatricians and neonatologists, we operate a highly sterile, modern Level-III Neonatal ICU (NICU) to nurse pre-term or critical newborns back to health. We offer comprehensive child health assessments, standardized immunization programs, and developmental milestones tracking in a patient-friendly environment.",
          why_choose_us: JSON.stringify([
            { title: "Level III NICU", text: "Equipped with advanced multi-parameter monitors, double-surface phototherapy, and high-frequency ventilators.", icon: "ShieldCheck" },
            { title: "Developmental Care", text: "Continuous tracking of childhood developmental milestones and guidance on pediatric nutrition and growth.", icon: "Users" },
            { title: "24/7 Emergency Support", text: "Prompt clinical management for pediatric trauma, febrile seizures, severe dehydration, and acute asthma attacks.", icon: "Phone" }
          ]),
          conditions: JSON.stringify([
            "Pre-term Birth & Low Birth Weight Care",
            "Neonatal Jaundice & Respiratory Distress Syndrome",
            "Childhood Asthma, Allergies & Bronchitis",
            "Acute Pediatric Infections & Prolonged Fevers",
            "Growth Delay & Nutritional Deficiencies",
            "Standard Child Vaccination Schedules"
          ]),
          facilities: JSON.stringify([
            "Advanced Level-III Modular Neonatal ICU (NICU)",
            "Dedicated Pediatric Emergency Resuscitation Bay",
            "Child-Friendly Layout & Play Area",
            "Sterilized Lactation Support & Counseling Rooms"
          ]),
          equipments: JSON.stringify([
            "Dräger Neonatal Ventilators & CPAP Units",
            "GE Giraffe Incubators & Radiant Warmers",
            "LED Double-Surface Phototherapy Panels",
            "Micro-infusion Syringe Pumps for Neonates"
          ]),
          faqs: JSON.stringify([
            { q: "What is a Level-III NICU facility?", a: "A Level-III NICU is capable of providing comprehensive care for newborns born at extremely early gestational ages (pre-term) or those with critical medical illnesses, utilizing advanced respiratory support and continuous monitoring." },
            { q: "How often should my child visit the pediatrician?", a: "During the first year, visits are scheduled frequently to check growth and match vaccination schedules. Thereafter, annual wellness checkups are recommended." },
            { q: "Does the hospital have a pediatric emergency team?", a: "Yes, our emergency and pediatric teams are available 24/7 to manage any critical children's health crisis, including accidents, breathing trouble, or high fever." }
          ])
        },
        {
          name: "General Medicine",
          tagline: "Your primary health shield against acute illnesses & chronic conditions",
          short_desc: "Diagnostic and therapeutic care for lifestyle diseases, endocrine issues, and acute infections.",
          icon_name: "ShieldCheck",
          image_url: "/service_general_medicine.png",
          specialist_category: "General Medicine",
          stats: JSON.stringify([
            { value: "50,000+", label: "Patients Treated" },
            { value: "100%", label: "Diagnostic Accuracy" },
            { value: "Preventive", label: "Health Focus" }
          ]),
          details: "The General Medicine department acts as the primary health shield of New Life Hospital. We specialize in the diagnosis and management of lifestyle disorders (such as diabetes and hypertension), thyroid complications, viral fevers, infectious diseases, and respiratory illnesses like COPD, with a strong focus on preventive health packages.",
          why_choose_us: JSON.stringify([
            { title: "Chronic Disease Control", text: "Individualized management plans for complex diabetes, hypertension, and endocrine imbalances.", icon: "Activity" },
            { title: "Advanced Diagnostics", text: "In-house fully automated pathology lab and digital ECG systems for quick, precise diagnostic reports.", icon: "Building" },
            { title: "Infectious Care", text: "Dedicated isolation wards and safety protocols to treat infectious diseases and prolonged fevers safely.", icon: "Shield" }
          ]),
          conditions: JSON.stringify([
            "Diabetes Mellitus & Diabetic Complications",
            "Chronic Hypertension & Ischemic Heart Care",
            "Thyroid, Hormonal & Endocrine Imbalances",
            "Infectious Fevers (Dengue, Typhoid, Malaria)",
            "Chronic Asthma, COPD & Respiratory Infections",
            "Comprehensive Adult Immunizations"
          ]),
          facilities: JSON.stringify([
            "Fully Automated Digital Pathology Laboratory",
            "Cardiac Screening Suite with Digital ECG & Stress Tests",
            "Spacious Semi-private & Private Inpatient Wards",
            "Dedicated Preventive Health Package Cabin"
          ]),
          equipments: JSON.stringify([
            "Fully Automated Biochemistry Analyzers",
            "12-Channel High-Res Digital ECG Machines",
            "Multi-parameter Bedside Vital Monitors",
            "Advanced Point-of-Care Diagnostic Kits"
          ]),
          faqs: JSON.stringify([
            { q: "How can I enroll in a preventative health checkup?", a: "You can book health checkup packages online or by calling the desk. We recommend fasting for 10-12 hours prior to the checkup for accurate blood test reports." },
            { q: "What support do you offer for chronic diabetes management?", a: "We provide comprehensive diabetic care, including blood sugar profiling, HbA1c testing, diabetic foot checks, nutritional counseling, and medication management to prevent kidney or heart complications." },
            { q: "Are emergency services available for sudden fevers?", a: "Yes, our general medicine and emergency departments are staffed 24/7 to receive and treat patients presenting with high fevers, severe infections, or acute physical distress." }
          ])
        },
        {
          name: "Orthopedics & Joint Care",
          tagline: "Restoring mobility and performance through advanced bone and joint care",
          short_desc: "Advanced bone, spine, joint replacements, and emergency fracture management.",
          icon_name: "Activity",
          image_url: "/service_orthopedics.png",
          specialist_category: "Orthopedics",
          stats: JSON.stringify([
            { value: "1,500+", label: "Joint Replacements" },
            { value: "Minimal", label: "Recovery Time" },
            { value: "24/7", label: "Trauma Care" }
          ]),
          details: "Our Orthopedics department is dedicated to restoring your freedom of movement. We specialize in minimally invasive joint replacements (knee and hip), complex fracture fixations, spinal therapies, arthroscopic sports injury treatments, and personalized post-surgical rehabilitation programs.",
          why_choose_us: JSON.stringify([
            { title: "Advanced Joint Replacements", text: "High-precision knee and hip reconstruction procedures using imported implants to ensure long-term durability.", icon: "Award" },
            { title: "Specialized Ortho OT", text: "Operates within a strictly sterile Modular Operation Theater with laminar air flow to prevent any infection.", icon: "Building" },
            { title: "Integrated Rehab", text: "Custom physical therapy programs starting immediately after surgery to ensure a fast, painless return to mobility.", icon: "Activity" }
          ]),
          conditions: JSON.stringify([
            "Osteoarthritis & Severe Joint Degeneration",
            "Complex Trauma, Fractures & Bone Injuries",
            "ACL, MCL, & Meniscus Ligament Tears",
            "Spine Disorders, Sciatica & Slip Disc Issues",
            "Chronic Shoulder & Elbow Joint Pain",
            "Rheumatoid Arthritis & Osteoporosis Shield"
          ]),
          facilities: JSON.stringify([
            "Modular Orthopedic OT with Clean Laminar Flow",
            "Advanced Post-Surgical Physiotherapy Rehab Center",
            "High-Resolution Digital X-Ray Diagnostic Unit",
            "Specialized Plaster & Orthotic Fitting Room"
          ]),
          equipments: JSON.stringify([
            "High-End C-Arm Image Intensifier Setup",
            "Stryker Orthopedic Drill & Saw Console",
            "Advanced Knee & Hip Joint Arthroplasty Kits",
            "Digital High-Frequency X-Ray Machine"
          ]),
          faqs: JSON.stringify([
            { q: "How long is the recovery period after a total knee replacement?", a: "Most patients start walking with support within 24 hours of surgery. With consistent post-operative physiotherapy, patients can return to standard daily activities within 4 to 6 weeks." },
            { q: "What is arthroscopic surgery?", a: "Arthroscopy is a minimally invasive keyhole procedure used to diagnose and treat joint problems, such as torn ligaments or damaged cartilage. It utilizes a tiny camera, resulting in small scars and faster healing." },
            { q: "Do you treat emergency fractures?", a: "Yes, our orthopedics team is on alert 24/7 to perform emergency surgeries for complex fractures, accident trauma, and joint dislocations." }
          ])
        },
        {
          name: "Laparoscopic & General Surgery",
          tagline: "High-precision minimally invasive surgical interventions",
          short_desc: "Advanced keyhole surgeries and open procedures for faster healing and shorter hospital stays.",
          icon_name: "Sparkles",
          image_url: "/service_surgery.png",
          specialist_category: "General Surgery",
          stats: JSON.stringify([
            { value: "3,000+", label: "Surgeries Conducted" },
            { value: "99.8%", label: "Infection-free Rate" },
            { value: "Micro", label: "Incision Healing" }
          ]),
          details: "We utilize cutting-edge laparoscopic technology to perform precise abdominal operations. Keyhole surgery means smaller incisions, significantly reduced post-operative pain, minimal risk of infection, shorter hospital stays, and a faster return to daily activities compared to conventional open surgeries.",
          why_choose_us: JSON.stringify([
            { title: "HD Laparoscopic Towers", text: "Surgeries performed using ultra-high-definition imaging towers for maximum precision and anatomical safety.", icon: "Sparkles" },
            { title: "Shorter Recovery", text: "Most laparoscopic patients are discharged within 24-48 hours, experiencing minimal pain and scars.", icon: "Clock" },
            { title: "Aseptic OT Protocol", text: "Three operation theaters featuring laminar flow system and HEPA filters to achieve absolute sterility.", icon: "Shield" }
          ]),
          conditions: JSON.stringify([
            "Gallbladder Stones (Cholecystitis)",
            "Inguinal, Umbilical & Ventral Hernias",
            "Acute Appendicitis & Appendectomy",
            "Abdominal Wall Reconstructions",
            "Diabetic Foot & Chronic Wound Management",
            "Varicose Veins & Hemorrhoidal Treatments"
          ]),
          facilities: JSON.stringify([
            "Modular Operation Theaters with HEPA Air Filters",
            "Dedicated Post-Operative Aseptic Recovery Wards",
            "Central Sterile Supply Department (CSSD) Unit",
            "Advanced Outpatient Consultation Cubicles"
          ]),
          equipments: JSON.stringify([
            "Karl Storz HD Laparoscopic Surgical Tower",
            "Covidien Valleylab Electrosurgical Generator",
            "Advanced Autoclave & Flash Sterilizers",
            "Ergonomic Hydraulic OT Table Sets"
          ]),
          faqs: JSON.stringify([
            { q: "What surgeries are done laparoscopically?", a: "Common surgeries include gallbladder removal, hernia repairs, appendix removal, diagnostic laparoscopy, and various ovarian or uterine surgeries. Most abdominal issues are ideal candidates for laparoscopic keyhole access." },
            { q: "How long do I need to stay in the hospital after laparoscopic hernia surgery?", a: "Generally, patients stay for 1 to 2 days. The precise duration depends on the size of the hernia and the patient's overall health, but recovery is significantly shorter than traditional open repair." },
            { q: "What is your operating theater sterilization protocol?", a: "We follow strict guidelines including daily air culture tests, sterile autoclave processing for all instruments, HEPA filtration, and laminar air flow to ensure a highly sterile surgical field." }
          ])
        },
        {
          name: "Emergency & Critical Care",
          tagline: "Every second counts: 24/7 immediate life support and trauma rescue",
          short_desc: "24/7 immediate trauma care, cardiac life-support, and ICU monitoring.",
          icon_name: "Phone",
          image_url: "/service_emergency.png",
          specialist_category: "Anesthesia",
          stats: JSON.stringify([
            { value: "24/7/365", label: "Active Coverage" },
            { value: "10 mins", label: "Ambulance Response" },
            { value: "Critical", label: "ICU Ventilators" }
          ]),
          details: "Our Emergency and Critical Care department is built to act when every second matters. With a round-the-clock team of trauma specialists, ICU nurses, and fully loaded life-support ambulances, we are fully equipped to manage critical emergencies including strokes, cardiac arrests, respiratory failure, and severe physical trauma.",
          why_choose_us: JSON.stringify([
            { title: "Advanced Ambulances", text: "Emergency vehicles fitted with transport ventilators, defibrillators, oxygen support, and communication links.", icon: "Phone" },
            { title: "Intensive Monitoring", text: "ICU units featuring modern central monitoring systems, high-end ventilators, and 1:1 nurse-patient care.", icon: "Activity" },
            { title: "Rapid Action Triage", text: "A specialized triage trauma bay designed to immediately evaluate and stabilize critical cases.", icon: "Shield" }
          ]),
          conditions: JSON.stringify([
            "Acute Cardiac Arrest & Heart Attacks",
            "Acute Strokes & Neurological Crises",
            "Severe Accidental & Road Trauma Injuries",
            "Acute Respiratory Distress & Sepsis Cases",
            "Poisonings & Snakebite Emergencies",
            "Severe Burn Injuries & Wound Resuscitation"
          ]),
          facilities: JSON.stringify([
            "24/7 Active Fully Equipped Cardiac Ambulance",
            "Modern Multi-bed ICU with Central Monitoring",
            "Emergency Triage Area & Trauma Resuscitation Bay",
            "Round-the-clock Emergency Diagnostics & Blood Unit"
          ]),
          equipments: JSON.stringify([
            "High-End ICU Ventilators (Dräger & Hamilton)",
            "Biphasic Defibrillators with External Pacemakers",
            "Advanced Syringe Pumps & Arterial Line Monitors",
            "Emergency Portable Ultrasound & X-Ray Units"
          ]),
          faqs: JSON.stringify([
            { q: "How can I request the ambulance service?", a: "You can dial our dedicated emergency hotline directly, which is active 24/7. The ambulance team will immediately dispatch to your location with basic or advanced life support gear." },
            { q: "What is a triage system?", a: "Triage is the process of sorting patients based on the severity of their condition. Critical cases (such as heart attacks or severe breathing difficulty) are taken inside immediately, bypassing registration procedures." },
            { q: "Are specialist doctors available at night?", a: "Yes, we have on-duty emergency physicians, anesthesiologists, and critical care specialists in the hospital 24/7, with on-call surgical experts arriving within minutes." }
          ])
        },
        {
          name: "Psychiatry & Mental Health",
          tagline: "Compassionate counseling and treatment for your mental well-being",
          short_desc: "Compassionate evaluation, counseling, and treatment for cognitive, emotional, and behavioral wellness.",
          icon_name: "Brain",
          image_url: "/service_psychiatry.png",
          specialist_category: "Psychiatry",
          stats: JSON.stringify([
            { value: "100%", label: "Confidentiality" },
            { value: "Compassionate", label: "Care Model" },
            { value: "Therapy", label: "Focused" }
          ]),
          details: "Our Psychiatry & Mental Health department offers a confidential, warm, and supportive environment for cognitive and emotional wellness. We specialize in therapy and clinical management for stress, depression, anxiety, and sleep disorders, helping patients reclaim peace of mind. We provide comprehensive counseling, family therapy, and lifestyle guidance.",
          why_choose_us: JSON.stringify([
            { title: "Empathetic Support", text: "Care focused on understanding the patient's individual emotional and behavioral journey.", icon: "Heart" },
            { title: "Complete Confidentiality", text: "We strictly uphold privacy standards to ensure all counseling and treatments remain secure.", icon: "ShieldCheck" },
            { title: "Holistic Recovery", text: "A balanced mix of clinical assessment, counseling therapy, and stress management guidelines.", icon: "Users" }
          ]),
          conditions: JSON.stringify([
            "Generalized Anxiety & Panic Disorders",
            "Clinical Depression & Mood Disturbance",
            "Chronic Stress & Work Burnout Counseling",
            "Sleep Disorders & Insomnia Management",
            "Childhood Behavioral & Learning Concerns",
            "Family & Relationship Wellness Therapy"
          ]),
          facilities: JSON.stringify([
            "Private Soundproof Counseling Suites",
            "Calm & Inviting Outpatient Therapy Rooms",
            "Dedicated Diagnostic Testing Area",
            "Relaxing Consultation Lounge for Families"
          ]),
          equipments: JSON.stringify([
            "Standardized Psychometric Assessment Tools",
            "Modern Biofeedback Relaxation Systems",
            "Calming Light & Sound Therapy Gear",
            "Cognitive Behavioral Training Material"
          ]),
          faqs: JSON.stringify([
            { q: "What should I expect during my first psychiatry consultation?", a: "Your first session is a safe space to discuss your emotional and physical wellness concerns. The doctor will perform a comprehensive diagnostic review, listen to your experiences, and partner with you to outline a personalized care plan." },
            { q: "Is counselling confidential?", a: "Yes, absolute confidentiality is the foundation of our psychiatry services. All records, consultations, and treatment discussions are kept secure and private." },
            { q: "Do you offer support for sleep-related issues?", a: "Yes, we diagnose and treat sleep disorders like insomnia, helping patients recover natural sleep patterns through medical guidance, sleep hygiene counseling, and stress relief therapies." }
          ])
        },
        {
          name: "Oncology & Cancer Care",
          tagline: "Dedicated supportive care, early detection screening, and chemotherapy",
          short_desc: "Comprehensive cancer screening, early detection, supportive chemotherapy, and palliative care.",
          icon_name: "Dna",
          image_url: "/service_oncology.png",
          specialist_category: "Oncology",
          stats: JSON.stringify([
            { value: "Early", label: "Detection Focus" },
            { value: "Chemo", label: "Infusion Suite" },
            { value: "Supportive", label: "Care Team" }
          ]),
          details: "Our Oncology & Cancer Care team is dedicated to early screening, accurate staging, and compassionate supportive therapies. We work closely with leading surgical oncologists and radiotherapists to provide comprehensive cancer care plans, including safe outpatient chemotherapy infusion and supportive counseling. Our focus is to provide high-quality comfort care and patient support throughout the journey.",
          why_choose_us: JSON.stringify([
            { title: "Specialized Infusion Suite", text: "A sterile, peaceful outpatient unit designed for comfortable and safe chemotherapy administration.", icon: "Shield" },
            { title: "Early Detection Screening", text: "Advanced diagnostic screenings to detect cell abnormalities early, when treatments are most effective.", icon: "Sparkles" },
            { title: "Palliative & Compassionate Care", text: "Dedicated pain management and emotional counseling to support patients and their families.", icon: "Heart" }
          ]),
          conditions: JSON.stringify([
            "Comprehensive Breast & Cervical Cancer Screening",
            "Early Gastric, Colon & Esophageal Cancer Checks",
            "Outpatient Supportive Chemotherapy Management",
            "Palliative Pain Relief & Comfort Therapies",
            "Oncology Second-Opinion Consultations",
            "Post-Treatment Recovery & Nutrition Guidelines"
          ]),
          facilities: JSON.stringify([
            "Modern Sterile Chemotherapy Infusion Ward",
            "Dedicated Cancer Screening & Advisory Room",
            "Private Consultation & Pain Management Clinic",
            "Advanced Histopathology Laboratory Setup"
          ]),
          equipments: JSON.stringify([
            "High-Precision Infusion Pump Systems",
            "Biosafety Cabinets for Chemo Drug Preparation",
            "Advanced Tissue Biopsy & Lab Instruments",
            "Comfortable Adjustable Recliner Infusion Beds"
          ]),
          faqs: JSON.stringify([
            { q: "Why is early cancer screening important?", a: "Screening checks for cancer before a person has any symptoms. Early detection allows for treatment at the earliest stages, which significantly improves success rates and recovery timelines." },
            { q: "How is outpatient chemotherapy managed?", a: "Our dedicated infusion suite is designed for comfort. Patients receive their prescribed cycles in a physical room under the close supervision of oncology-trained nurses, and can usually return home the same day." },
            { q: "Do you offer nutritional counseling for oncology patients?", a: "Yes, nutrition is vital during cancer therapy. Our specialists provide custom dietary guidelines to manage side effects, boost energy, and support the body's natural strength." }
          ])
        },
        {
          name: "Gastroenterology & Gastric Care",
          tagline: "Advanced diagnostics and treatment for gastric and liver health",
          short_desc: "Diagnosis and treatments for liver, stomach, and digestive tract disorders.",
          icon_name: "Stethoscope",
          image_url: "/service_gastroenterology.png",
          specialist_category: "Gastroenterology",
          stats: JSON.stringify([
            { value: "Diagnostics", label: "Endoscopy Room" },
            { value: "Rapid", label: "Ulcer Relief" },
            { value: "Custom", label: "Diet Plans" }
          ]),
          details: "The Gastroenterology & Gastric Care department specializes in checking and treating disorders of the digestive tract, esophagus, stomach, liver, and colon. We focus on acid reflux relief, ulcer healing, and digestive wellness through advanced diagnostics and custom nutrition therapies. We are equipped with modern endoscopy technology to ensure precise evaluation and targeted treatment.",
          why_choose_us: JSON.stringify([
            { title: "Advanced Endoscopy", text: "Minimally invasive diagnostic imaging to inspect the stomach and colon for ulcers or polyps.", icon: "Building" },
            { title: "Digestive Wellness Focus", text: "Targeted medical management for acidity, chronic GERD, irritable bowel syndrome, and liver health.", icon: "Activity" },
            { title: "Custom Nutrition Care", text: "Integrated diet plans and lifestyle programs to support digestion and restore gut health.", icon: "Award" }
          ]),
          conditions: JSON.stringify([
            "Acidity, Chronic GERD & Heartburn",
            "Gastritis & Peptic Stomach Ulcers",
            "Irritable Bowel Syndrome (IBS) & Colitis",
            "Fatty Liver & Gallbladder Disorders",
            "Chronic Constipation, Bloating & Diarrhea",
            "Food Intolerance & Celiac Evaluation"
          ]),
          facilities: JSON.stringify([
            "Modern Endoscopy & Colonoscopy Room",
            "Clean Post-Procedure Patient Recovery Lounge",
            "Sterilized Scope Processing & Autoclave Unit",
            "Dietary Consultation & Wellness Cabin"
          ]),
          equipments: JSON.stringify([
            "High-Definition Video Endoscopes (Olympus)",
            "Advanced Endoscopic Light Source & Monitors",
            "Continuous Vital Sign Patient Monitors",
            "Automated Endoscope Re-processor Units"
          ]),
          faqs: JSON.stringify([
            { q: "What symptoms warrant a visit to a gastroenterologist?", a: "You should consult a specialist if you experience persistent heartburn/acidity, chronic stomach pain, unexplained weight loss, constant bloating, or blood in stools." },
            { q: "What is an endoscopy procedure?", a: "Endoscopy is a safe, quick diagnostic test where a thin, flexible tube with a camera is guided into the upper digestive tract to inspect the lining for inflammation, ulcers, or other issues." },
            { q: "How can I prevent chronic acidity/GERD?", a: "Acidity can often be managed by eating smaller meals, avoiding trigger foods (spicy, fatty foods), staying upright for 2 hours after eating, and following a custom dietary plan from our specialists." }
          ])
        }
      ];

      for (const s of initialServices) {
        await pool.execute(
          `INSERT INTO services (name, tagline, short_desc, icon_name, image_url, specialist_category, stats, details, why_choose_us, conditions, facilities, equipments, faqs) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [s.name, s.tagline, s.short_desc, s.icon_name, s.image_url, s.specialist_category, s.stats, s.details, s.why_choose_us, s.conditions, s.facilities, s.equipments, s.faqs]
        );
      }
      console.log('Seeded initial services into MySQL database.');
    }

    initialized = true;
  } catch (error) {
    console.error('[DB] Database initialization failed:', error.message);
    console.error('[DB] Connection config used → host:', appConfig.db.host, '| port:', appConfig.db.port, '| user:', appConfig.db.user, '| database:', appConfig.db.database);
    pool = null;
    initialized = false;
  } finally {
    isInitializing = false;
  }
};

// Start DB initialization immediately
let initPromise = initDb();

// Retry connection every 5 seconds if not initialized
setInterval(() => {
  if (!initialized) {
    console.log('Retrying database connection...');
    initPromise = initDb();
  }
}, 5000);

// Helper for multi-row queries
export const query = async (sql, params = []) => {
  if (!pool) {
    await initPromise;
    if (!pool) throw new Error(`MySQL connection failed. Host: ${process.env.DB_HOST || 'localhost'}, DB: ${process.env.DB_NAME || 'neshosp'}. Check server logs for details.`);
  }
  const [rows] = await pool.execute(sql, params);
  return rows;
};

// Helper for single-row queries
export const get = async (sql, params = []) => {
  if (!pool) {
    await initPromise;
    if (!pool) throw new Error(`MySQL connection failed. Host: ${process.env.DB_HOST || 'localhost'}, DB: ${process.env.DB_NAME || 'neshosp'}. Check server logs for details.`);
  }
  const [rows] = await pool.execute(sql, params);
  return rows[0] || null;
};

// Helper for INSERT / UPDATE / DELETE write queries
export const run = async (sql, params = []) => {
  if (!pool) {
    await initPromise;
    if (!pool) throw new Error(`MySQL connection failed. Host: ${process.env.DB_HOST || 'localhost'}, DB: ${process.env.DB_NAME || 'neshosp'}. Check server logs for details.`);
  }
  const [result] = await pool.execute(sql, params);
  return { id: result.insertId, changes: result.affectedRows };
};
