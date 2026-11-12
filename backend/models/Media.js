import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  url: { type: String, required: true },
  mimetype: { type: String },
  size: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);

