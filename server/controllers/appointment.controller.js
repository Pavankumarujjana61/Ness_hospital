import { query, run, get } from '../db.js';

// Book an appointment (Public)
export const bookAppointment = async (req, res) => {
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
};

// Fetch all booked appointments (Admin)
export const getAppointments = async (req, res) => {
  try {
    const appointments = await query('SELECT * FROM appointments ORDER BY id DESC');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load appointments: ' + err.message });
  }
};

// Update appointment slot status (Confirm, Cancel, Complete) (Admin)
export const updateAppointmentStatus = async (req, res) => {
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
};
