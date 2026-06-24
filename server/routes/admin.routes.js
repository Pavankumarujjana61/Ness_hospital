import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { login, updateProfile, getStats } from '../controllers/admin.controller.js';
import { getAppointments, updateAppointmentStatus } from '../controllers/appointment.controller.js';
import { getInquiries, updateInquiryStatus } from '../controllers/inquiry.controller.js';
import { addDoctor, updateDoctor, deleteDoctor } from '../controllers/doctor.controller.js';
import { addTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonial.controller.js';
import { addBanner, updateBanner, deleteBanner } from '../controllers/banner.controller.js';
import { getAdminServices, addService, updateService, deleteService } from '../controllers/service.controller.js';
import { authenticateAdmin } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer storage to server/uploads/
const uploadsDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
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

const router = express.Router();

// Public login (no auth middleware needed)
router.post('/login', login);

// All other admin routes require JWT verification
router.use(authenticateAdmin);

router.post('/update-profile', updateProfile);
router.get('/stats', getStats);

// Appointments
router.get('/appointments', getAppointments);
router.put('/appointments/:id', updateAppointmentStatus);

// Inquiries
router.get('/inquiries', getInquiries);
router.put('/inquiries/:id', updateInquiryStatus);

// Doctors
router.post('/doctors', addDoctor);
router.put('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

// Testimonials
router.post('/testimonials', addTestimonial);
router.put('/testimonials/:id', updateTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

// Banners
router.post('/banners', addBanner);
router.put('/banners/:id', updateBanner);
router.delete('/banners/:id', deleteBanner);

// Services
router.get('/services', getAdminServices);
router.post('/services', addService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// Image Upload
router.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please select a photo file to upload.' });
  }
  const fileUrl = `/${req.file.filename}`;
  res.json({ success: true, fileUrl, message: 'Photo uploaded successfully.' });
});

export default router;
