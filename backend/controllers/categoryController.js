import { storage } from '../services/storageService.js';

export const getCategories = (req, res) => {
  try {
    const categories = storage.getCategories();
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createCategory = (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }
    const category = storage.createCategory(req.body);
    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCategory = (req, res) => {
  try {
    const { id } = req.params;
    const updated = storage.updateCategory(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    res.json({ success: true, category: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCategory = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = storage.deleteCategory(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    res.json({ success: true, message: 'Category removed successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
