import { storage } from '../services/storageService.js';

export const getUsers = (req, res) => {
  try {
    const users = storage.getUsers();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUserRole = (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ success: false, message: 'Role parameter is required.' });
    }

    const updated = storage.updateUserRole(id, role);
    res.json({
      success: true,
      message: `User role successfully elevated/adjusted to ${role}.`,
      user: updated
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

