import express from 'express';
import adminRoutes from './admin.routes.js';
import doctorRoutes from './doctor.routes.js';
import appointmentRoutes from './appointment.routes.js';
import inquiryRoutes from './inquiry.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import bannerRoutes from './banner.routes.js';
import serviceRoutes from './service.routes.js';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/doctors', doctorRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/contact', inquiryRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/banners', bannerRoutes);
router.use('/services', serviceRoutes);

export default router;
