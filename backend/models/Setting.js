import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'TECHPULSE' },
  tagline: { type: String, default: 'Technology. Innovation. Intelligence.' },
  description: { type: String, default: '' },
  gaMeasurementId: { type: String, default: 'G-TECHPULSE2026' },
  gscVerificationToken: { type: String, default: '' },
  enableNewsletter: { type: Boolean, default: true }
});

export const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);

