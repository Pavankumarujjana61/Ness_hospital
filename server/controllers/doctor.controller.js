import { query, run } from '../db.js';

// Fetch doctors listing
export const getDoctors = async (req, res) => {
  try {
    const doctors = await query('SELECT * FROM doctors ORDER BY sort_order ASC, id ASC');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors list: ' + err.message });
  }
};

// Edit doctor availability schedules and bios
export const updateDoctor = async (req, res) => {
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
};

// Add new doctor profile
export const addDoctor = async (req, res) => {
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
};

// Delete a doctor profile
export const deleteDoctor = async (req, res) => {
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
};
