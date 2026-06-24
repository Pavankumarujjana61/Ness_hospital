import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { query, run, get } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure public folder exists
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'uploaded-doctor-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|svg|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpeg, jpg, png, gif, svg, webp) are allowed!'));
  }
});

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'newlife-super-secret-jwt-key-2026';

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length) {
    console.log(`[HTTP Body]`, JSON.stringify(req.body));
  }
  
  const originalJson = res.json;
  const originalSend = res.send;
  
  res.json = function (body) {
    console.log(`[HTTP Response] ${req.method} ${req.url} -> Status ${res.statusCode} (JSON)`);
    return originalJson.call(this, body);
  };
  
  res.send = function (body) {
    const contentType = res.get('Content-Type') || '';
    console.log(`[HTTP Response] ${req.method} ${req.url} -> Status ${res.statusCode} (${contentType})`);
    return originalSend.call(this, body);
  };
  
  next();
});

// Token Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No Token Provided' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid Token' });
  }
};

// --- PUBLIC ENDPOINTS ---

// Fetch doctors listing
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await query('SELECT * FROM doctors ORDER BY sort_order ASC, id ASC');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors list: ' + err.message });
  }
});

// Book an appointment
app.post('/api/appointments', async (req, res) => {
  const { name, phone, doctorName, specialty, date, timeSlot } = req.body;
  if (!name || !phone || !specialty || !date || !timeSlot) {
    return res.status(400).json({ error: 'Missing required booking fields.' });
  }

  try {
    // Check if doctor matches any database doctor ID
    let doctorId = null;
    if (doctorName) {
      const doc = await get('SELECT id FROM doctors WHERE name = ?', [doctorName]);
      if (doc) doctorId = doc.id;
    }

    const result = await run(
      `INSERT INTO appointments (patient_name, patient_phone, doctor_id, doctor_name, specialty, booking_date, booking_time_slot, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')`,
      [name, phone, doctorId, doctorName || 'General Consultant', specialty, date, timeSlot]
    );

    res.status(201).json({ success: true, appointmentId: result.id, message: 'Appointment requested successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Database transaction failed: ' + err.message });
  }
});

// Submit contact inquiry
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, message } = req.body;
  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Missing name, phone or inquiry message.' });
  }

  try {
    const result = await run(
      `INSERT INTO inquiries (name, phone, email, message, status) VALUES (?, ?, ?, ?, 'Unread')`,
      [name, phone, email || '', message]
    );
    res.status(201).json({ success: true, inquiryId: result.id, message: 'Inquiry message submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Database transaction failed: ' + err.message });
  }
});

// Fetch testimonials list
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await query('SELECT * FROM testimonials ORDER BY id DESC');
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials list: ' + err.message });
  }
});

// Fetch home banners
app.get('/api/banners', async (req, res) => {
  try {
    const banners = await query('SELECT * FROM banners ORDER BY id ASC');
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch home banners: ' + err.message });
  }
});

// Fetch services listing
app.get('/api/services', async (req, res) => {
  try {
    const services = await query('SELECT * FROM services ORDER BY id ASC');
    const parsedServices = services.map(s => {
      try {
        return {
          ...s,
          stats: JSON.parse(s.stats || '[]'),
          why_choose_us: JSON.parse(s.why_choose_us || '[]'),
          conditions: JSON.parse(s.conditions || '[]'),
          facilities: JSON.parse(s.facilities || '[]'),
          equipments: JSON.parse(s.equipments || '[]'),
          faqs: JSON.parse(s.faqs || '[]')
        };
      } catch (parseErr) {
        return {
          ...s,
          stats: [],
          why_choose_us: [],
          conditions: [],
          facilities: [],
          equipments: [],
          faqs: []
        };
      }
    });
    res.json(parsedServices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services: ' + err.message });
  }
});

// Admin Authentication Login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide both username and password.' });
  }

  try {
    const admin = await get('SELECT * FROM admins WHERE username = ?', [username]);
    if (!admin) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const validPassword = await bcrypt.compare(password, admin.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    // Sign JWT Token
    const token = jwt.sign({ id: admin.id, username: admin.username, role: admin.role }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ success: true, token, username: admin.username, role: admin.role });
  } catch (err) {
    res.status(500).json({ error: 'Authentication routine failed: ' + err.message });
  }
});


// --- PROTECTED ADMIN ENDPOINTS ---

// Fetch dashboard statistical counters
app.get('/api/admin/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalAppointments = await get('SELECT count(*) as count FROM appointments');
    const pendingAppointments = await get("SELECT count(*) as count FROM appointments WHERE status = 'Pending'");
    const totalInquiries = await get('SELECT count(*) as count FROM inquiries');
    const unreadInquiries = await get("SELECT count(*) as count FROM inquiries WHERE status = 'Unread'");
    const totalDoctors = await get('SELECT count(*) as count FROM doctors');
    const totalServices = await get('SELECT count(*) as count FROM services');

    res.json({
      appointments: { total: totalAppointments.count, pending: pendingAppointments.count },
      inquiries: { total: totalInquiries.count, unread: unreadInquiries.count },
      doctorsCount: totalDoctors.count,
      servicesCount: totalServices.count
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to aggregate statistics: ' + err.message });
  }
});

// Fetch all booked appointments
app.get('/api/admin/appointments', authenticateAdmin, async (req, res) => {
  try {
    const appointments = await query('SELECT * FROM appointments ORDER BY id DESC');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load appointments: ' + err.message });
  }
});

// Update appointment slot status (Confirm, Cancel, Complete)
app.put('/api/admin/appointments/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid slot status value.' });
  }

  try {
    const result = await run('UPDATE appointments SET status = ? WHERE id = ?', [status, id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Appointment record not found.' });
    }
    res.json({ success: true, message: `Appointment status updated to ${status}.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update appointment: ' + err.message });
  }
});

// Fetch all contact messages/inquiries
app.get('/api/admin/inquiries', authenticateAdmin, async (req, res) => {
  try {
    const inquiries = await query('SELECT * FROM inquiries ORDER BY id DESC');
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load inquiries: ' + err.message });
  }
});

// Update inquiry read status
app.put('/api/admin/inquiries/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'Read' or 'Unread'

  try {
    const result = await run('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Inquiry record not found.' });
    }
    res.json({ success: true, message: `Inquiry status updated to ${status}.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inquiry: ' + err.message });
  }
});

// Edit doctor availability schedules and bios (including image_url, status, availability, sort_order)
app.put('/api/admin/doctors/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, qualifications, specialty, category, experience, timings, bio, image_url, status, availability, sort_order } = req.body;

  if (!name || !specialty || !timings) {
    return res.status(400).json({ error: 'Name, specialty, and timings are required fields.' });
  }

  try {
    const result = await run(
      `UPDATE doctors 
       SET name = ?, qualifications = ?, specialty = ?, category = ?, experience = ?, timings = ?, bio = ?, image_url = ?, status = ?, availability = ?, sort_order = ? 
       WHERE id = ?`,
      [
        name, 
        qualifications || '', 
        specialty, 
        category || '', 
        experience || '', 
        timings, 
        bio || '', 
        image_url || '', 
        status || 'Active', 
        availability || 'In Hospital', 
        parseInt(sort_order, 10) || 10, 
        id
      ]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Doctor record not found.' });
    }

    res.json({ success: true, message: 'Doctor schedule details updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update doctor: ' + err.message });
  }
});

// Add new doctor profile (including status, availability, sort_order)
app.post('/api/admin/doctors', authenticateAdmin, async (req, res) => {
  const { name, qualifications, specialty, category, experience, timings, bio, image_url, status, availability, sort_order } = req.body;

  if (!name || !specialty || !timings) {
    return res.status(400).json({ error: 'Name, specialty, and timings are required fields.' });
  }

  try {
    const result = await run(
      `INSERT INTO doctors (name, qualifications, specialty, category, experience, timings, bio, image_url, status, availability, sort_order) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        qualifications || '', 
        specialty, 
        category || 'General', 
        experience || '', 
        timings, 
        bio || '', 
        image_url || '', 
        status || 'Active', 
        availability || 'In Hospital', 
        parseInt(sort_order, 10) || 10
      ]
    );
    res.status(201).json({ success: true, doctorId: result.id, message: 'Doctor added successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add doctor: ' + err.message });
  }
});

// Upload image endpoint
app.post('/api/admin/upload', authenticateAdmin, upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please select a photo file to upload.' });
  }
  const fileUrl = `/${req.file.filename}`;
  res.json({ success: true, fileUrl, message: 'Photo uploaded successfully.' });
});


// Delete a doctor profile
app.delete('/api/admin/doctors/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await run('DELETE FROM doctors WHERE id = ?', [id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Doctor record not found.' });
    }
    res.json({ success: true, message: 'Doctor deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete doctor: ' + err.message });
  }
});

// Add new testimonial
app.post('/api/admin/testimonials', authenticateAdmin, async (req, res) => {
  const { patient_name, location, rating, comment } = req.body;
  if (!patient_name || !location || !comment) {
    return res.status(400).json({ error: 'Patient name, location, and comment are required fields.' });
  }

  try {
    const result = await run(
      `INSERT INTO testimonials (patient_name, location, rating, comment) VALUES (?, ?, ?, ?)`,
      [patient_name, location, rating || 5, comment]
    );
    res.status(201).json({ success: true, testimonialId: result.id, message: 'Testimonial added successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add testimonial: ' + err.message });
  }
});

// Edit testimonial
app.put('/api/admin/testimonials/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { patient_name, location, rating, comment } = req.body;
  if (!patient_name || !location || !comment) {
    return res.status(400).json({ error: 'Patient name, location, and comment are required fields.' });
  }

  try {
    const result = await run(
      `UPDATE testimonials SET patient_name = ?, location = ?, rating = ?, comment = ? WHERE id = ?`,
      [patient_name, location, rating || 5, comment, id]
    );
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Testimonial record not found.' });
    }
    res.json({ success: true, message: 'Testimonial details updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update testimonial: ' + err.message });
  }
});

// Delete testimonial
app.delete('/api/admin/testimonials/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await run('DELETE FROM testimonials WHERE id = ?', [id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Testimonial record not found.' });
    }
    res.json({ success: true, message: 'Testimonial deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete testimonial: ' + err.message });
  }
});

// Add new home banner
app.post('/api/admin/banners', authenticateAdmin, async (req, res) => {
  const { title, subtitle, description, cta, image_url } = req.body;
  if (!title || !subtitle || !description || !cta || !image_url) {
    return res.status(400).json({ error: 'Title, subtitle, description, cta, and image_url are required fields.' });
  }

  try {
    const result = await run(
      `INSERT INTO banners (title, subtitle, description, cta, image_url) VALUES (?, ?, ?, ?, ?)`,
      [title, subtitle, description, cta, image_url]
    );
    res.status(201).json({ success: true, bannerId: result.id, message: 'Home banner added successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add home banner: ' + err.message });
  }
});

// Edit home banner
app.put('/api/admin/banners/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, description, cta, image_url } = req.body;
  if (!title || !subtitle || !description || !cta || !image_url) {
    return res.status(400).json({ error: 'Title, subtitle, description, cta, and image_url are required fields.' });
  }

  try {
    const result = await run(
      `UPDATE banners SET title = ?, subtitle = ?, description = ?, cta = ?, image_url = ? WHERE id = ?`,
      [title, subtitle, description, cta, image_url, id]
    );
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Home banner record not found.' });
    }
    res.json({ success: true, message: 'Home banner details updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update home banner: ' + err.message });
  }
});

// Delete home banner
app.delete('/api/admin/banners/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await run('DELETE FROM banners WHERE id = ?', [id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Home banner record not found.' });
    }
    res.json({ success: true, message: 'Home banner deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete home banner: ' + err.message });
  }
});

// Fetch all services raw for admin panel (to allow direct edits on JSON fields)
app.get('/api/admin/services', authenticateAdmin, async (req, res) => {
  try {
    const services = await query('SELECT * FROM services ORDER BY id ASC');
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services for admin: ' + err.message });
  }
});

// Add new service
app.post('/api/admin/services', authenticateAdmin, async (req, res) => {
  const { name, tagline, short_desc, icon_name, image_url, specialist_category, stats, details, why_choose_us, conditions, facilities, equipments, faqs } = req.body;
  if (!name || !tagline || !short_desc || !icon_name || !image_url || !specialist_category) {
    return res.status(400).json({ error: 'Name, tagline, short description, icon name, image URL, and specialist category are required.' });
  }

  try {
    const result = await run(
      `INSERT INTO services (name, tagline, short_desc, icon_name, image_url, specialist_category, stats, details, why_choose_us, conditions, facilities, equipments, faqs) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        tagline,
        short_desc,
        icon_name,
        image_url,
        specialist_category,
        typeof stats === 'string' ? stats : JSON.stringify(stats || []),
        details || '',
        typeof why_choose_us === 'string' ? why_choose_us : JSON.stringify(why_choose_us || []),
        typeof conditions === 'string' ? conditions : JSON.stringify(conditions || []),
        typeof facilities === 'string' ? facilities : JSON.stringify(facilities || []),
        typeof equipments === 'string' ? equipments : JSON.stringify(equipments || []),
        typeof faqs === 'string' ? faqs : JSON.stringify(faqs || [])
      ]
    );
    res.status(201).json({ success: true, serviceId: result.id, message: 'Service added successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add service: ' + err.message });
  }
});

// Edit service
app.put('/api/admin/services/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, tagline, short_desc, icon_name, image_url, specialist_category, stats, details, why_choose_us, conditions, facilities, equipments, faqs } = req.body;
  if (!name || !tagline || !short_desc || !icon_name || !image_url || !specialist_category) {
    return res.status(400).json({ error: 'Name, tagline, short description, icon name, image URL, and specialist category are required.' });
  }

  try {
    const result = await run(
      `UPDATE services 
       SET name = ?, tagline = ?, short_desc = ?, icon_name = ?, image_url = ?, specialist_category = ?, stats = ?, details = ?, why_choose_us = ?, conditions = ?, facilities = ?, equipments = ?, faqs = ?
       WHERE id = ?`,
      [
        name,
        tagline,
        short_desc,
        icon_name,
        image_url,
        specialist_category,
        typeof stats === 'string' ? stats : JSON.stringify(stats || []),
        details || '',
        typeof why_choose_us === 'string' ? why_choose_us : JSON.stringify(why_choose_us || []),
        typeof conditions === 'string' ? conditions : JSON.stringify(conditions || []),
        typeof facilities === 'string' ? facilities : JSON.stringify(facilities || []),
        typeof equipments === 'string' ? equipments : JSON.stringify(equipments || []),
        typeof faqs === 'string' ? faqs : JSON.stringify(faqs || []),
        id
      ]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Service record not found.' });
    }

    res.json({ success: true, message: 'Service details updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service: ' + err.message });
  }
});

// Delete service
app.delete('/api/admin/services/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await run('DELETE FROM services WHERE id = ?', [id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Service record not found.' });
    }
    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service: ' + err.message });
  }
});

// Update Admin Profile (Username & Password)
app.post('/api/admin/update-profile', authenticateAdmin, async (req, res) => {
  const { currentPassword, newUsername, newPassword } = req.body;
  if (!currentPassword) {
    return res.status(400).json({ error: 'Please provide your current password to verify identity.' });
  }
  if (!newUsername && !newPassword) {
    return res.status(400).json({ error: 'Please provide either a new username or a new password to update.' });
  }

  try {
    const admin = await get('SELECT * FROM admins WHERE id = ?', [req.admin.id]);
    const valid = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!valid) {
      return res.status(400).json({ error: 'Current password input is incorrect.' });
    }

    let sql = 'UPDATE admins SET';
    let params = [];

    if (newUsername) {
      sql += ' username = ?,';
      params.push(newUsername);
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      sql += ' password_hash = ?,';
      params.push(hash);
    }

    // Slice trailing comma
    sql = sql.slice(0, -1);
    sql += ' WHERE id = ?';
    params.push(req.admin.id);

    await run(sql, params);
    
    res.json({ success: true, message: 'Admin profile updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Profile update failed: ' + err.message });
  }
});

// Global error handling middleware for file uploads and other server errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: 'Upload limit or parameter error: ' + err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// Spin up server listener
app.listen(PORT, () => {
  console.log(`Node Express Server active on http://localhost:${PORT}`);
});
