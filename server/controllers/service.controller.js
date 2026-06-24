import { query, run } from '../db.js';

// Fetch services listing (Public)
export const getServices = async (req, res) => {
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
};

// Fetch all services raw for admin panel (Admin)
export const getAdminServices = async (req, res) => {
  try {
    const services = await query('SELECT * FROM services ORDER BY id ASC');
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services for admin: ' + err.message });
  }
};

// Add new service (Admin)
export const addService = async (req, res) => {
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
};

// Edit service (Admin)
export const updateService = async (req, res) => {
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
};

// Delete service (Admin)
export const deleteService = async (req, res) => {
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
};
