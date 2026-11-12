import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  roleTitle: { type: String, default: 'Technology Specialist' },
  bio: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  socialLinks: {
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
});

export const Author = mongoose.models.Author || mongoose.model('Author', authorSchema);

