import express from 'express';
import { protect, authorizePublisher, authorizeAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  getAdminArticles,
  getAdminArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/articleController.js';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from '../controllers/authorController.js';
import {
  uploadMedia,
  getAllMedia,
  deleteMedia
} from '../controllers/mediaController.js';
import { updateSettings } from '../controllers/seoController.js';
import { getUsers, updateUserRole } from '../controllers/userController.js';
import { storage } from '../services/storageService.js';

const router = express.Router();

// Apply auth protection and baseline publisher clearance to all administrative routes
router.use(protect, authorizePublisher);

// Dashboard stats (accessible to Admins & Publishers)
router.get('/dashboard/stats', (req, res) => {
  res.json({ success: true, stats: storage.getDashboardStats() });
});

// User & Role Access Governance (STRICTLY Admin Highest Privilege)
router.get('/users', authorizeAdmin, getUsers);
router.put('/users/:id/role', authorizeAdmin, updateUserRole);

// Articles
router.get('/articles', getAdminArticles);
router.get('/articles/:id', getAdminArticleById);
router.post('/articles', createArticle);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle); // Admins can delete any post; Publishers can delete drafts

// Categories
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', authorizeAdmin, deleteCategory); // Deleting taxonomy is Admin-only

// Authors
router.get('/authors', getAuthors);
router.post('/authors', createAuthor);
router.put('/authors/:id', updateAuthor);
router.delete('/authors/:id', authorizeAdmin, deleteAuthor); // Deleting authors is Admin-only

// Media
router.get('/media', getAllMedia);
router.post('/media/upload', upload.single('file'), uploadMedia);
router.delete('/media/:id', deleteMedia);

// Platform System & SEO Settings (STRICTLY Admin-Only)
router.put('/settings', authorizeAdmin, updateSettings);

export default router;
