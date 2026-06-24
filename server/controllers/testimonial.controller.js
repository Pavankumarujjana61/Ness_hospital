import { query, run } from '../db.js';

// Fetch testimonials list (Public)
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await query('SELECT * FROM testimonials ORDER BY id DESC');
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials list: ' + err.message });
  }
};

// Add new testimonial (Admin)
export const addTestimonial = async (req, res) => {
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
};

// Edit testimonial (Admin)
export const updateTestimonial = async (req, res) => {
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
};

// Delete testimonial (Admin)
export const deleteTestimonial = async (req, res) => {
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
};
