-- MySQL Database Dump for New Life Hospital
-- Host: localhost    Database: neshosp
-- Generated dynamically on 2026-06-24T09:00:56.140Z
-- ------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'Admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` (`id`, `username`, `password_hash`, `role`) VALUES
(1, 'admin', '$2b$10$Egv1a5.xF.UnKcjsgAyPQ.8l1k8Koa7jDywklEDAOBBN1s780uZc2', 'Admin');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
CREATE TABLE `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `qualifications` varchar(255) NOT NULL,
  `specialty` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `experience` varchar(100) NOT NULL,
  `timings` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Active',
  `availability` varchar(50) DEFAULT 'In Hospital',
  `sort_order` int(11) DEFAULT 10,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` (`id`, `name`, `qualifications`, `specialty`, `category`, `experience`, `timings`, `bio`, `image_url`, `status`, `availability`, `sort_order`) VALUES
(1, 'Dr. K.S.V.N. Varma', 'MBBS, DCH, Fellowship in Neonatology, PALS, NALS', 'Pediatrics & Neonatology', 'Pediatrics', '15+ Years', '10:00 AM - 1:00 PM, 5:00 PM - 8:00 PM', 'An outstanding pediatrician specialized in neonatal intensive care, complex childhood disease management, pediatric asthma treatments, and infant developmental health.', '/doctor_varma.jpg', 'Active', 'Out of Hospital', 10),
(2, 'Dr. N. Lakshmipathi Raju', 'DNB General Medicine', 'Consultant General Medicine', 'General Medicine', '14+ Years', '10:00 AM - 4:00 PM', 'A trusted consultant general physician with deep expertise in managing lifestyle diseases, diabetes control, thyroid therapies, acute fever treatments, and preventive wellness checks.', '/doctor_lakshmipathi.jpg', 'Active', 'In Hospital', 10),
(3, 'Dr. Koonaparaju Raghavi', 'M.S. (OBG), DNB (Gynecology, Infertility Specialist)', 'Consultant Gynecologist & Obstetrician', 'Gynecology', '12+ Years', '10:00 AM - 2:00 PM, 6:00 PM - 8:00 PM', 'A leading obstetrician specialized in high-risk pregnancies, infertility diagnostics, keyhole laparoscopic surgeries, contraceptive counseling, and women\'s hormonal issues.', '/doctor_raghavi.jpg', 'Active', 'Out of Hospital', 10),
(4, 'Dr. G. Ramakrishna Reddy', 'M.S. Orthopaedics, FIJR', 'Consultant Orthopedic & Joint Surgeon', 'Orthopedics', '11+ Years', '11:00 AM - 3:00 PM, 6:00 PM - 8:00 PM', 'An expert joint replacement specialist focused on orthopedic trauma, complex fracture fixations, arthritis therapies, knee/hip replacements, and sports injury rehabilitation.', '/doctor_ramakrishna.jpg', 'Active', 'In Hospital', 10),
(5, 'Dr. Pavan', 'MBBS, MD Anes', 'Consultant Anesthesiologist', 'Anesthesia', '10+ Years', '24/7 Critical & Trauma Care Support', 'A dedicated anesthesiologist overseeing surgical sedation and post-operative pain management, and supporting critical trauma care services round-the-clock.', '/uploaded-doctor-1782215868991-936646758.jpg', 'Active', 'In Hospital', 10),
(6, 'Dr. Lenin', 'M.S., D.G.S., FAIS', 'Laparoscopic & General Surgeon', 'General Surgery', '13+ Years', '10:00 AM - 2:00 PM, 5:00 PM - 7:00 PM', 'A seasoned general surgeon skilled in advanced laparoscopic keyhole procedures, gallbladder removals, hernia repairs, appendix surgeries, and emergency abdominal trauma operations.', '/doctor_lenin.jpg', 'Inactive', 'In Hospital', 10),
(7, 'MD Anes', 'MBBS', 'Pediatric', 'Pediatrics', '15', '10:00AM - 6:00PM', 'An outstanding pediatrician specialized in neonatal intensive care, complex childhood disease management, pediatric asthma treatments, and infant developmental health.', '/uploaded-doctor-1782216193738-225118316.jpeg', 'Active', 'In Hospital', 1);
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(255) NOT NULL,
  `patient_phone` varchar(50) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `specialty` varchar(255) NOT NULL,
  `booking_date` varchar(50) NOT NULL,
  `booking_time_slot` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` (`id`, `patient_name`, `patient_phone`, `doctor_id`, `doctor_name`, `specialty`, `booking_date`, `booking_time_slot`, `status`, `created_at`) VALUES
(1, 'pavan', '5768978876', 5, 'Dr. Pavan', 'Consultant Anesthesiologist', '2026-06-22', 'Morning', 'Completed', 'Tue Jun 23 2026 16:24:57 GMT+0530 (India Standard Time)'),
(2, 'pavan', '8790616976', NULL, 'General Consultant', 'Pediatrics', '2026-06-20', 'Morning', 'Completed', 'Tue Jun 23 2026 17:38:05 GMT+0530 (India Standard Time)'),
(3, 'pavan', '8790616976', NULL, 'General Consultant', 'Emergency', '2026-06-20', 'Morning', 'Confirmed', 'Tue Jun 23 2026 17:38:46 GMT+0530 (India Standard Time)'),
(4, 'pavan', '5768978876', 6, 'Dr. Lenin', 'Laparoscopic & General Surgeon', '2026-06-22', 'Afternoon', 'Completed', 'Tue Jun 23 2026 17:46:41 GMT+0530 (India Standard Time)'),
(5, 'kumar', '8790616', NULL, 'General Consultant', 'Laparoscopic Surgery', '2026-07-01', 'Morning', 'Cancelled', 'Wed Jun 24 2026 10:08:23 GMT+0530 (India Standard Time)'),
(6, 'pavan', '5768978876', 6, 'Dr. Lenin', 'Laparoscopic & General Surgeon', '2026-06-22', 'Evening', 'Pending', 'Wed Jun 24 2026 12:06:15 GMT+0530 (India Standard Time)'),
(7, 'pavan', '46579809', NULL, 'Department Specialist (Gynecology & Obstetrics)', 'Gynecology & Obstetrics', '2026-06-24', 'Morning (10:00 AM - 1:00 PM)', 'Completed', 'Wed Jun 24 2026 12:19:51 GMT+0530 (India Standard Time)');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiries`
--

DROP TABLE IF EXISTS `inquiries`;
CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` varchar(50) DEFAULT 'Unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inquiries`
--

LOCK TABLES `inquiries` WRITE;
/*!40000 ALTER TABLE `inquiries` DISABLE KEYS */;
INSERT INTO `inquiries` (`id`, `name`, `phone`, `email`, `message`, `status`, `created_at`) VALUES
(1, 'pavan', '8790616976', 'cvwucb2cje2nck2@vcuwc', 'dxcfgjhkj', 'Unread', 'Tue Jun 23 2026 16:25:57 GMT+0530 (India Standard Time)'),
(2, 'qwcdgiqbcjk', '8790616976', 'cvwucb2cje2nck2@vcuwc', 'xtcrytvuyjbiunl', 'Unread', 'Tue Jun 23 2026 17:21:24 GMT+0530 (India Standard Time)');
/*!40000 ALTER TABLE `inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` (`id`, `patient_name`, `location`, `rating`, `comment`, `created_at`) VALUES
(1, 'Ravi Kumar', 'Palakollu', 5, 'The pediatric care under Dr. Varma is outstanding. My 2-year-old was admitted with severe asthma, and the quick response and care saved us. Highly recommended!', 'Tue Jun 23 2026 16:19:23 GMT+0530 (India Standard Time)'),
(2, 'Siri Latha', 'Narasapuram', 5, 'Dr. Raghavi is an exceptional gynecologist. The maternity department at New Life is very hygienic and supportive. We had our first child here, and the staff was like family.', 'Tue Jun 23 2026 16:19:23 GMT+0530 (India Standard Time)'),
(3, 'Venkatesh Rao', 'Bhimavaram', 5, 'My father underwent knee replacement surgery under Dr. Ramakrishna Reddy. The modular OT facilities and post-op physiotherapy were excellent. He is walking comfortably now.', 'Tue Jun 23 2026 16:19:23 GMT+0530 (India Standard Time)');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `cta` varchar(100) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` (`id`, `title`, `subtitle`, `description`, `cta`, `image_url`, `created_at`) VALUES
(1, 'Your Health, Our Responsiblity', 'New Life Emergency & Super Specialty Hospital', 'Delivering advanced medical care, prompt emergency services, and compassionate healing to Palakollu.', 'Meet Our Team', '/hero_caring_doctors.png', 'Tue Jun 23 2026 16:59:49 GMT+0530 (India Standard Time)'),
(2, 'State-of-the-Art Surgical Tech', '3 Ultra-Modern Operation Theaters', 'Equipped with modern laparoscopic and diagnostic infrastructure for precise, minimally invasive care.', 'Explore Facilities', '/hero_modular_ot.png', 'Tue Jun 23 2026 16:59:49 GMT+0530 (India Standard Time)'),
(3, 'Specialist Care for Every Family', 'Pediatric, Gynecology & General Care', 'From neonatal care to orthopedics, our board-certified experts guard your family\'s health.', 'Book Consultation', '/hero_pediatric_care.png', 'Tue Jun 23 2026 16:59:49 GMT+0530 (India Standard Time)');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `tagline` varchar(255) NOT NULL,
  `short_desc` text NOT NULL,
  `icon_name` varchar(100) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `specialist_category` varchar(255) NOT NULL,
  `stats` text NOT NULL,
  `details` text NOT NULL,
  `why_choose_us` text NOT NULL,
  `conditions` text NOT NULL,
  `facilities` text NOT NULL,
  `equipments` text NOT NULL,
  `faqs` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` (`id`, `name`, `tagline`, `short_desc`, `icon_name`, `image_url`, `specialist_category`, `stats`, `details`, `why_choose_us`, `conditions`, `facilities`, `equipments`, `faqs`, `created_at`) VALUES
(1, 'Gynecology & Obstetrics', 'Comprehensive care for women at every stage of life\'s journey', 'Comprehensive maternal care, high-risk pregnancy management, and advanced laparoscopic procedures.', 'Heart', '/service_gynecology.png', 'Gynecology', '[{"value":"10,000+","label":"Safe Deliveries"},{"value":"12+ Years","label":"Average Experience"},{"value":"24/7","label":"Obstetric Emergencies"}]', 'Our Gynecology department provides premium, compassionate care for women through all stages of life. We specialize in high-risk obstetric monitoring, painless deliveries, and advanced laparoscopic (keyhole) surgeries. Our state-of-the-art labor rooms and dedicated fetal medicine scans ensure the highest standards of safety and comfort for both mother and child.', '[{"title":"Maternal Comfort","text":"Spacious private LDR (Labor, Delivery, Recovery) suites designed for family presence and dynamic relaxation.","icon":"Heart"},{"title":"Advanced Laparoscopy","text":"Minimally invasive keyhole surgeries for uterine fibroids, cysts, and hysterectomy, offering minimal scarring and rapid discharge.","icon":"Sparkles"},{"title":"High-Risk Care","text":"24/7 coverage by senior obstetricians and a round-the-clock neonatology team to support any maternal or fetal complication.","icon":"Shield"}]', '["High-Risk Pregnancies & Pre-eclampsia","PCOS, Endometriosis & Fibroid Management","Infertility Evaluation & Follicular Studies","Laparoscopic & Abdominal Hysterectomies","Adolescent Glandular & Menstrual Health","Menopausal Counseling & Osteoporosis Shield"]', '["Modular Labor, Delivery & Recovery (LDR) Rooms","High-Resolution 4D Fetal Ultrasound Scans","Laparoscopic HD Surgical Console Room","Dedicated Women\'s Wellness & Diagnostic Suite"]', '["GE Voluson 4D Ultrasound Machine","Stryker HD Laparoscopy Tower","Fetal Heart Rate Cardiotocography (CTG) Monitors","Modern Painless Labor Epidural Infusion Pumps"]', '[{"q":"What constitutes a high-risk pregnancy?","a":"A pregnancy is considered high-risk if there are pre-existing health conditions like diabetes or high blood pressure, maternal age over 35, multiple gestations, or a history of complications in prior pregnancies. We offer continuous monitoring and specialist consults to manage these safety indicators."},{"q":"Do you support painless delivery?","a":"Yes, we offer painless labor options through epidural analgesia administered by expert anesthesiologists. This allows mothers to undergo a comfortable labor while actively participating in the delivery."},{"q":"What are the advantages of laparoscopic gynecology surgery?","a":"Laparoscopic surgeries utilize microscopic incisions, which results in significantly less post-operative pain, faster discharge (often within 24-48 hours), lower risk of surgical site infections, and a swift return to normal life."}]', 'Wed Jun 24 2026 12:47:17 GMT+0530 (India Standard Time)'),
(2, 'Pediatrics & Neonatology', 'Dedicated neonatal critical care and pediatric excellence', 'Specialized medical care for newborns, infants, children, and adolescents.', 'Award', '/service_pediatrics.png', 'Pediatrics', '[{"value":"Level III","label":"Neonatal ICU (NICU)"},{"value":"15+ Years","label":"Pediatric Expertise"},{"value":"24/7","label":"Pediatric Emergency"}]', 'Backed by expert pediatricians and neonatologists, we operate a highly sterile, modern Level-III Neonatal ICU (NICU) to nurse pre-term or critical newborns back to health. We offer comprehensive child health assessments, standardized immunization programs, and developmental milestones tracking in a patient-friendly environment.', '[{"title":"Level III NICU","text":"Equipped with advanced multi-parameter monitors, double-surface phototherapy, and high-frequency ventilators.","icon":"ShieldCheck"},{"title":"Developmental Care","text":"Continuous tracking of childhood developmental milestones and guidance on pediatric nutrition and growth.","icon":"Users"},{"title":"24/7 Emergency Support","text":"Prompt clinical management for pediatric trauma, febrile seizures, severe dehydration, and acute asthma attacks.","icon":"Phone"}]', '["Pre-term Birth & Low Birth Weight Care","Neonatal Jaundice & Respiratory Distress Syndrome","Childhood Asthma, Allergies & Bronchitis","Acute Pediatric Infections & Prolonged Fevers","Growth Delay & Nutritional Deficiencies","Standard Child Vaccination Schedules"]', '["Advanced Level-III Modular Neonatal ICU (NICU)","Dedicated Pediatric Emergency Resuscitation Bay","Child-Friendly Layout & Play Area","Sterilized Lactation Support & Counseling Rooms"]', '["Dräger Neonatal Ventilators & CPAP Units","GE Giraffe Incubators & Radiant Warmers","LED Double-Surface Phototherapy Panels","Micro-infusion Syringe Pumps for Neonates"]', '[{"q":"What is a Level-III NICU facility?","a":"A Level-III NICU is capable of providing comprehensive care for newborns born at extremely early gestational ages (pre-term) or those with critical medical illnesses, utilizing advanced respiratory support and continuous monitoring."},{"q":"How often should my child visit the pediatrician?","a":"During the first year, visits are scheduled frequently to check growth and match vaccination schedules. Thereafter, annual wellness checkups are recommended."},{"q":"Does the hospital have a pediatric emergency team?","a":"Yes, our emergency and pediatric teams are available 24/7 to manage any critical children\'s health crisis, including accidents, breathing trouble, or high fever."}]', 'Wed Jun 24 2026 12:47:17 GMT+0530 (India Standard Time)'),
(3, 'General Medicine', 'Your primary health shield against acute illnesses & chronic conditions', 'Diagnostic and therapeutic care for lifestyle diseases, endocrine issues, and acute infections.', 'ShieldCheck', '/service_general_medicine.png', 'General Medicine', '[{"value":"50,000+","label":"Patients Treated"},{"value":"100%","label":"Diagnostic Accuracy"},{"value":"Preventive","label":"Health Focus"}]', 'The General Medicine department acts as the primary health shield of New Life Hospital. We specialize in the diagnosis and management of lifestyle disorders (such as diabetes and hypertension), thyroid complications, viral fevers, infectious diseases, and respiratory illnesses like COPD, with a strong focus on preventive health packages.', '[{"title":"Chronic Disease Control","text":"Individualized management plans for complex diabetes, hypertension, and endocrine imbalances.","icon":"Activity"},{"title":"Advanced Diagnostics","text":"In-house fully automated pathology lab and digital ECG systems for quick, precise diagnostic reports.","icon":"Building"},{"title":"Infectious Care","text":"Dedicated isolation wards and safety protocols to treat infectious diseases and prolonged fevers safely.","icon":"Shield"}]', '["Diabetes Mellitus & Diabetic Complications","Chronic Hypertension & Ischemic Heart Care","Thyroid, Hormonal & Endocrine Imbalances","Infectious Fevers (Dengue, Typhoid, Malaria)","Chronic Asthma, COPD & Respiratory Infections","Comprehensive Adult Immunizations"]', '["Fully Automated Digital Pathology Laboratory","Cardiac Screening Suite with Digital ECG & Stress Tests","Spacious Semi-private & Private Inpatient Wards","Dedicated Preventive Health Package Cabin"]', '["Fully Automated Biochemistry Analyzers","12-Channel High-Res Digital ECG Machines","Multi-parameter Bedside Vital Monitors","Advanced Point-of-Care Diagnostic Kits"]', '[{"q":"How can I enroll in a preventative health checkup?","a":"You can book health checkup packages online or by calling the desk. We recommend fasting for 10-12 hours prior to the checkup for accurate blood test reports."},{"q":"What support do you offer for chronic diabetes management?","a":"We provide comprehensive diabetic care, including blood sugar profiling, HbA1c testing, diabetic foot checks, nutritional counseling, and medication management to prevent kidney or heart complications."},{"q":"Are emergency services available for sudden fevers?","a":"Yes, our general medicine and emergency departments are staffed 24/7 to receive and treat patients presenting with high fevers, severe infections, or acute physical distress."}]', 'Wed Jun 24 2026 12:47:17 GMT+0530 (India Standard Time)'),
(4, 'Orthopedics & Joint Care', 'Restoring mobility and performance through advanced bone and joint care', 'Advanced bone, spine, joint replacements, and emergency fracture management.', 'Activity', '/service_orthopedics.png', 'Orthopedics', '[{"value":"1,500+","label":"Joint Replacements"},{"value":"Minimal","label":"Recovery Time"},{"value":"24/7","label":"Trauma Care"}]', 'Our Orthopedics department is dedicated to restoring your freedom of movement. We specialize in minimally invasive joint replacements (knee and hip), complex fracture fixations, spinal therapies, arthroscopic sports injury treatments, and personalized post-surgical rehabilitation programs.', '[{"title":"Advanced Joint Replacements","text":"High-precision knee and hip reconstruction procedures using imported implants to ensure long-term durability.","icon":"Award"},{"title":"Specialized Ortho OT","text":"Operates within a strictly sterile Modular Operation Theater with laminar air flow to prevent any infection.","icon":"Building"},{"title":"Integrated Rehab","text":"Custom physical therapy programs starting immediately after surgery to ensure a fast, painless return to mobility.","icon":"Activity"}]', '["Osteoarthritis & Severe Joint Degeneration","Complex Trauma, Fractures & Bone Injuries","ACL, MCL, & Meniscus Ligament Tears","Spine Disorders, Sciatica & Slip Disc Issues","Chronic Shoulder & Elbow Joint Pain","Rheumatoid Arthritis & Osteoporosis Shield"]', '["Modular Orthopedic OT with Clean Laminar Flow","Advanced Post-Surgical Physiotherapy Rehab Center","High-Resolution Digital X-Ray Diagnostic Unit","Specialized Plaster & Orthotic Fitting Room"]', '["High-End C-Arm Image Intensifier Setup","Stryker Orthopedic Drill & Saw Console","Advanced Knee & Hip Joint Arthroplasty Kits","Digital High-Frequency X-Ray Machine"]', '[{"q":"How long is the recovery period after a total knee replacement?","a":"Most patients start walking with support within 24 hours of surgery. With consistent post-operative physiotherapy, patients can return to standard daily activities within 4 to 6 weeks."},{"q":"What is arthroscopic surgery?","a":"Arthroscopy is a minimally invasive keyhole procedure used to diagnose and treat joint problems, such as torn ligaments or damaged cartilage. It utilizes a tiny camera, resulting in small scars and faster healing."},{"q":"Do you treat emergency fractures?","a":"Yes, our orthopedics team is on alert 24/7 to perform emergency surgeries for complex fractures, accident trauma, and joint dislocations."}]', 'Wed Jun 24 2026 12:47:17 GMT+0530 (India Standard Time)'),
(5, 'Laparoscopic & General Surgery', 'High-precision minimally invasive surgical interventions', 'Advanced keyhole surgeries and open procedures for faster healing and shorter hospital stays.', 'Sparkles', '/service_surgery.png', 'General Surgery', '[{"value":"3,000+","label":"Surgeries Conducted"},{"value":"99.8%","label":"Infection-free Rate"},{"value":"Micro","label":"Incision Healing"}]', 'We utilize cutting-edge laparoscopic technology to perform precise abdominal operations. Keyhole surgery means smaller incisions, significantly reduced post-operative pain, minimal risk of infection, shorter hospital stays, and a faster return to daily activities compared to conventional open surgeries.', '[{"title":"HD Laparoscopic Towers","text":"Surgeries performed using ultra-high-definition imaging towers for maximum precision and anatomical safety.","icon":"Sparkles"},{"title":"Shorter Recovery","text":"Most laparoscopic patients are discharged within 24-48 hours, experiencing minimal pain and scars.","icon":"Clock"},{"title":"Aseptic OT Protocol","text":"Three operation theaters featuring laminar flow system and HEPA filters to achieve absolute sterility.","icon":"Shield"}]', '["Gallbladder Stones (Cholecystitis)","Inguinal, Umbilical & Ventral Hernias","Acute Appendicitis & Appendectomy","Abdominal Wall Reconstructions","Diabetic Foot & Chronic Wound Management","Varicose Veins & Hemorrhoidal Treatments"]', '["Modular Operation Theaters with HEPA Air Filters","Dedicated Post-Operative Aseptic Recovery Wards","Central Sterile Supply Department (CSSD) Unit","Advanced Outpatient Consultation Cubicles"]', '["Karl Storz HD Laparoscopic Surgical Tower","Covidien Valleylab Electrosurgical Generator","Advanced Autoclave & Flash Sterilizers","Ergonomic Hydraulic OT Table Sets"]', '[{"q":"What surgeries are done laparoscopically?","a":"Common surgeries include gallbladder removal, hernia repairs, appendix removal, diagnostic laparoscopy, and various ovarian or uterine surgeries. Most abdominal issues are ideal candidates for laparoscopic keyhole access."},{"q":"How long do I need to stay in the hospital after laparoscopic hernia surgery?","a":"Generally, patients stay for 1 to 2 days. The precise duration depends on the size of the hernia and the patient\'s overall health, but recovery is significantly shorter than traditional open repair."},{"q":"What is your operating theater sterilization protocol?","a":"We follow strict guidelines including daily air culture tests, sterile autoclave processing for all instruments, HEPA filtration, and laminar air flow to ensure a highly sterile surgical field."}]', 'Wed Jun 24 2026 12:47:17 GMT+0530 (India Standard Time)'),
(6, 'Emergency & Critical Care', 'Every second counts: 24/7 immediate life support and trauma rescue', '24/7 immediate trauma care, cardiac life-support, and ICU monitoring.', 'Phone', '/service_emergency.png', 'Anesthesia', '[{"value":"24/7/365","label":"Active Coverage"},{"value":"10 mins","label":"Ambulance Response"},{"value":"Critical","label":"ICU Ventilators"}]', 'Our Emergency and Critical Care department is built to act when every second matters. With a round-the-clock team of trauma specialists, ICU nurses, and fully loaded life-support ambulances, we are fully equipped to manage critical emergencies including strokes, cardiac arrests, respiratory failure, and severe physical trauma.', '[{"title":"Advanced Ambulances","text":"Emergency vehicles fitted with transport ventilators, defibrillators, oxygen support, and communication links.","icon":"Phone"},{"title":"Intensive Monitoring","text":"ICU units featuring modern central monitoring systems, high-end ventilators, and 1:1 nurse-patient care.","icon":"Activity"},{"title":"Rapid Action Triage","text":"A specialized triage trauma bay designed to immediately evaluate and stabilize critical cases.","icon":"Shield"}]', '["Acute Cardiac Arrest & Heart Attacks","Acute Strokes & Neurological Crises","Severe Accidental & Road Trauma Injuries","Acute Respiratory Distress & Sepsis Cases","Poisonings & Snakebite Emergencies","Severe Burn Injuries & Wound Resuscitation"]', '["24/7 Active Fully Equipped Cardiac Ambulance","Modern Multi-bed ICU with Central Monitoring","Emergency Triage Area & Trauma Resuscitation Bay","Round-the-clock Emergency Diagnostics & Blood Unit"]', '["High-End ICU Ventilators (Dräger & Hamilton)","Biphasic Defibrillators with External Pacemakers","Advanced Syringe Pumps & Arterial Line Monitors","Emergency Portable Ultrasound & X-Ray Units"]', '[{"q":"How can I request the ambulance service?","a":"You can dial our dedicated emergency hotline directly, which is active 24/7. The ambulance team will immediately dispatch to your location with basic or advanced life support gear."},{"q":"What is a triage system?","a":"Triage is the process of sorting patients based on the severity of their condition. Critical cases (such as heart attacks or severe breathing difficulty) are taken inside immediately, bypassing registration procedures."},{"q":"Are specialist doctors available at night?","a":"Yes, we have on-duty emergency physicians, anesthesiologists, and critical care specialists in the hospital 24/7, with on-call surgical experts arriving within minutes."}]', 'Wed Jun 24 2026 12:47:17 GMT+0530 (India Standard Time)'),
(7, 'Psychiatry & Mental Health', 'Compassionate counseling and treatment for your mental well-being', 'Compassionate evaluation, counseling, and treatment for cognitive, emotional, and behavioral wellness.', 'Brain', '/service_psychiatry.png', 'Psychiatry', '[{"value":"100%","label":"Confidentiality"},{"value":"Compassionate","label":"Care Model"},{"value":"Therapy","label":"Focused"}]', 'Our Psychiatry & Mental Health department offers a confidential, warm, and supportive environment for cognitive and emotional wellness. We specialize in therapy and clinical management for stress, depression, anxiety, and sleep disorders, helping patients reclaim peace of mind. We provide comprehensive counseling, family therapy, and lifestyle guidance.', '[{"title":"Empathetic Support","text":"Care focused on understanding the patient\'s individual emotional and behavioral journey.","icon":"Heart"},{"title":"Complete Confidentiality","text":"We strictly uphold privacy standards to ensure all counseling and treatments remain secure.","icon":"ShieldCheck"},{"title":"Holistic Recovery","text":"A balanced mix of clinical assessment, counseling therapy, and stress management guidelines.","icon":"Users"}]', '["Generalized Anxiety & Panic Disorders","Clinical Depression & Mood Disturbance","Chronic Stress & Work Burnout Counseling","Sleep Disorders & Insomnia Management","Childhood Behavioral & Learning Concerns","Family & Relationship Wellness Therapy"]', '["Private Soundproof Counseling Suites","Calm & Inviting Outpatient Therapy Rooms","Dedicated Diagnostic Testing Area","Relaxing Consultation Lounge for Families"]', '["Standardized Psychometric Assessment Tools","Modern Biofeedback Relaxation Systems","Calming Light & Sound Therapy Gear","Cognitive Behavioral Training Material"]', '[{"q":"What should I expect during my first psychiatry consultation?","a":"Your first session is a safe space to discuss your emotional and physical wellness concerns. The doctor will perform a comprehensive diagnostic review, listen to your experiences, and partner with you to outline a personalized care plan."},{"q":"Is counselling confidential?","a":"Yes, absolute confidentiality is the foundation of our psychiatry services. All records, consultations, and treatment discussions are kept secure and private."},{"q":"Do you offer support for sleep-related issues?","a":"Yes, we diagnose and treat sleep disorders like insomnia, helping patients recover natural sleep patterns through medical guidance, sleep hygiene counseling, and stress relief therapies."}]', 'Wed Jun 24 2026 12:47:17 GMT+0530 (India Standard Time)'),
(8, 'Oncology & Cancer Care', 'Dedicated supportive care, early detection screening, and chemotherapy', 'Comprehensive cancer screening, early detection, supportive chemotherapy, and palliative care.', 'Dna', '/service_oncology.png', 'Oncology', '[{"value":"Early","label":"Detection Focus"},{"value":"Chemo","label":"Infusion Suite"},{"value":"Supportive","label":"Care Team"}]', 'Our Oncology & Cancer Care team is dedicated to early screening, accurate staging, and compassionate supportive therapies. We work closely with leading surgical oncologists and radiotherapists to provide comprehensive cancer care plans, including safe outpatient chemotherapy infusion and supportive counseling. Our focus is to provide high-quality comfort care and patient support throughout the journey.', '[{"title":"Specialized Infusion Suite","text":"A sterile, peaceful outpatient unit designed for comfortable and safe chemotherapy administration.","icon":"Shield"},{"title":"Early Detection Screening","text":"Advanced diagnostic screenings to detect cell abnormalities early, when treatments are most effective.","icon":"Sparkles"},{"title":"Palliative & Compassionate Care","text":"Dedicated pain management and emotional counseling to support patients and their families.","icon":"Heart"}]', '["Comprehensive Breast & Cervical Cancer Screening","Early Gastric, Colon & Esophageal Cancer Checks","Outpatient Supportive Chemotherapy Management","Palliative Pain Relief & Comfort Therapies","Oncology Second-Opinion Consultations","Post-Treatment Recovery & Nutrition Guidelines"]', '["Modern Sterile Chemotherapy Infusion Ward","Dedicated Cancer Screening & Advisory Room","Private Consultation & Pain Management Clinic","Advanced Histopathology Laboratory Setup"]', '["High-Precision Infusion Pump Systems","Biosafety Cabinets for Chemo Drug Preparation","Advanced Tissue Biopsy & Lab Instruments","Comfortable Adjustable Recliner Infusion Beds"]', '[{"q":"Why is early cancer screening important?","a":"Screening checks for cancer before a person has any symptoms. Early detection allows for treatment at the earliest stages, which significantly improves success rates and recovery timelines."},{"q":"How is outpatient chemotherapy managed?","a":"Our dedicated infusion suite is designed for comfort. Patients receive their prescribed cycles in a physical room under the close supervision of oncology-trained nurses, and can usually return home the same day."},{"q":"Do you offer nutritional counseling for oncology patients?","a":"Yes, nutrition is vital during cancer therapy. Our specialists provide custom dietary guidelines to manage side effects, boost energy, and support the body\'s natural strength."}]', 'Wed Jun 24 2026 12:47:17 GMT+0530 (India Standard Time)'),
(9, 'Gastroenterology & Gastric Care', 'Advanced diagnostics and treatment for gastric and liver health', 'Diagnosis and treatments for liver, stomach, and digestive tract disorders.', 'Stethoscope', '/service_gastroenterology.png', 'Gastroenterology', '[{"value":"Diagnostics","label":"Endoscopy Room"},{"value":"Rapid","label":"Ulcer Relief"},{"value":"Custom","label":"Diet Plans"}]', 'The Gastroenterology & Gastric Care department specializes in checking and treating disorders of the digestive tract, esophagus, stomach, liver, and colon. We focus on acid reflux relief, ulcer healing, and digestive wellness through advanced diagnostics and custom nutrition therapies. We are equipped with modern endoscopy technology to ensure precise evaluation and targeted treatment.', '[{"title":"Advanced Endoscopy","text":"Minimally invasive diagnostic imaging to inspect the stomach and colon for ulcers or polyps.","icon":"Building"},{"title":"Digestive Wellness Focus","text":"Targeted medical management for acidity, chronic GERD, irritable bowel syndrome, and liver health.","icon":"Activity"},{"title":"Custom Nutrition Care","text":"Integrated diet plans and lifestyle programs to support digestion and restore gut health.","icon":"Award"}]', '["Acidity, Chronic GERD & Heartburn","Gastritis & Peptic Stomach Ulcers","Irritable Bowel Syndrome (IBS) & Colitis","Fatty Liver & Gallbladder Disorders","Chronic Constipation, Bloating & Diarrhea","Food Intolerance & Celiac Evaluation"]', '["Modern Endoscopy & Colonoscopy Room","Clean Post-Procedure Patient Recovery Lounge","Sterilized Scope Processing & Autoclave Unit","Dietary Consultation & Wellness Cabin"]', '["High-Definition Video Endoscopes (Olympus)","Advanced Endoscopic Light Source & Monitors","Continuous Vital Sign Patient Monitors","Automated Endoscope Re-processor Units"]', '[{"q":"What symptoms warrant a visit to a gastroenterologist?","a":"You should consult a specialist if you experience persistent heartburn/acidity, chronic stomach pain, unexplained weight loss, constant bloating, or blood in stools."},{"q":"What is an endoscopy procedure?","a":"Endoscopy is a safe, quick diagnostic test where a thin, flexible tube with a camera is guided into the upper digestive tract to inspect the lining for inflammation, ulcers, or other issues."},{"q":"How can I prevent chronic acidity/GERD?","a":"Acidity can often be managed by eating smaller meals, avoiding trigger foods (spicy, fatty foods), staying upright for 2 hours after eating, and following a custom dietary plan from our specialists."}]', 'Wed Jun 24 2026 12:47:17 GMT+0530 (India Standard Time)');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
