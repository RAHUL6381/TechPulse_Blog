import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  shortDescription: { type: String, default: '' },
  content: { type: String, required: true },
  featuredImage: {
    url: { type: String, default: '' },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' }
  },
  category: { type: String, required: true },
  tags: [{ type: String }],
  author: { type: String, required: true },
  status: {
    type: String,
    enum: ['draft', 'published', 'scheduled'],
    default: 'draft'
  },
  isFeatured: { type: Boolean, default: false },
  viewsCount: { type: Number, default: 0 },
  estimatedReadingTime: { type: Number, default: 5 },
  publishedAt: { type: Date, default: null },
  scheduledFor: { type: Date, default: null },
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    canonicalUrl: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);

