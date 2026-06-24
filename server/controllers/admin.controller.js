import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { get, run } from '../db.js';
import { config as appConfig } from '../config/config.js';

// Admin Authentication Login
export const login = async (req, res) => {
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
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      appConfig.jwtSecret,
      { expiresIn: '12h' }
    );
    res.json({ success: true, token, username: admin.username, role: admin.role });
  } catch (err) {
    res.status(500).json({ error: 'Authentication routine failed: ' + err.message });
  }
};

// Update Admin Profile (Username & Password)
export const updateProfile = async (req, res) => {
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
};

// Fetch dashboard statistical counters
export const getStats = async (req, res) => {
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
};
