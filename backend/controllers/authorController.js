import { storage } from '../services/storageService.js';

export const getAuthors = (req, res) => {
  try {
    const authors = storage.getAuthors();
    res.json({ success: true, authors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createAuthor = (req, res) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }
    const author = storage.createAuthor(req.body);
    res.status(201).json({ success: true, author });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAuthor = (req, res) => {
  try {
    const { id } = req.params;
    const updated = storage.updateAuthor(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Author not found.' });
    }
    res.json({ success: true, author: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAuthor = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = storage.deleteAuthor(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Author not found.' });
    }
    res.json({ success: true, message: 'Author profile removed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
