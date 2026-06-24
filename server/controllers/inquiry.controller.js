import { query, run } from '../db.js';

// Submit contact inquiry (Public)
export const submitInquiry = async (req, res) => {
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
};

// Fetch all contact messages/inquiries (Admin)
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await query('SELECT * FROM inquiries ORDER BY id DESC');
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load inquiries: ' + err.message });
  }
};

// Update inquiry read status (Admin)
export const updateInquiryStatus = async (req, res) => {
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
};
