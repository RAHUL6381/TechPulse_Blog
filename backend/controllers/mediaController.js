import { storage } from '../services/storageService.js';

export const uploadMedia = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const url = `${protocol}://${host}/uploads/${req.file.filename}`;

    const mediaItem = storage.createMedia({
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      url,
      altText: req.body.altText || req.file.originalname
    });

    res.status(201).json({ success: true, media: mediaItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllMedia = (req, res) => {
  try {
    const media = storage.getMedia();
    res.json({ success: true, media });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteMedia = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = storage.deleteMedia(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Media item not found.' });
    }
    res.json({ success: true, message: 'Media item deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
