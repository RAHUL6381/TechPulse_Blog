import { storage } from '../services/storageService.js';

export const getPublicArticles = (req, res) => {
  try {
    const { category, search, sort, page, limit } = req.query;
    const result = storage.getArticles({
      category,
      search,
      sort: sort || 'newest',
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 9,
      status: 'published'
    });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getFeaturedArticles = (req, res) => {
  try {
    const data = storage.getFeaturedArticles();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getTrendingArticles = (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const data = storage.getTrendingArticles(limit);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getArticleBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    const article = storage.getArticleBySlug(slug, true);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.json({ success: true, article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getRelatedArticles = (req, res) => {
  try {
    const { slug } = req.params;
    const related = storage.getRelatedArticles(slug);
    res.json({ success: true, related });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin Endpoints
export const getAdminArticles = (req, res) => {
  try {
    const { category, search, sort, page, limit, status } = req.query;
    const result = storage.getArticles({
      category,
      search,
      sort: sort || 'newest',
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 15,
      status: status || 'all'
    });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAdminArticleById = (req, res) => {
  try {
    const { id } = req.params;
    const article = storage.getArticleById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.json({ success: true, article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createArticle = (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' });
    }
    const created = storage.createArticle(req.body);
    res.status(201).json({ success: true, article: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateArticle = (req, res) => {
  try {
    const { id } = req.params;
    const updated = storage.updateArticle(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.json({ success: true, article: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteArticle = (req, res) => {
  try {
    const { id } = req.params;
    const article = storage.getArticleById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    const isAdmin = ['superadmin', 'admin'].includes(req.user?.role);
    if (!isAdmin && article.status === 'published') {
      return res.status(403).json({
        success: false,
        message: 'Administrative clearance (Tier 1) required to permanently delete live published articles. Unpublish to draft first or request Admin authorization.'
      });
    }

    const deleted = storage.deleteArticle(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.json({ success: true, message: 'Article successfully removed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
