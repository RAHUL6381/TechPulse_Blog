import express from 'express';
import {
  getPublicArticles,
  getFeaturedArticles,
  getTrendingArticles,
  getArticleBySlug,
  getRelatedArticles
} from '../controllers/articleController.js';
import { getCategories } from '../controllers/categoryController.js';
import { getAuthors } from '../controllers/authorController.js';
import { getSettings } from '../controllers/seoController.js';

const router = express.Router();

// Articles
router.get('/articles', getPublicArticles);
router.get('/articles/featured', getFeaturedArticles);
router.get('/articles/trending', getTrendingArticles);
router.get('/articles/:slug', getArticleBySlug);
router.get('/articles/:slug/related', getRelatedArticles);

// Categories
router.get('/categories', getCategories);

// Authors
router.get('/authors', getAuthors);

// Settings
router.get('/settings', getSettings);

export default router;
