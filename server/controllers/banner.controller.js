import { query, run } from '../db.js';

// Fetch home banners (Public)
export const getBanners = async (req, res) => {
  try {
    const banners = await query('SELECT * FROM banners ORDER BY id ASC');
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch home banners: ' + err.message });
  }
};

// Add new home banner (Admin)
export const addBanner = async (req, res) => {
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
};

// Edit home banner (Admin)
export const updateBanner = async (req, res) => {
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
};

// Delete home banner (Admin)
export const deleteBanner = async (req, res) => {
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
};
