import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialCategories, initialAuthors, initialArticles, initialAdminUser } from '../data/seedData.js';
import { Article } from '../models/Article.js';
import { Category } from '../models/Category.js';
import { Author } from '../models/Author.js';
import { User } from '../models/User.js';
import { Setting } from '../models/Setting.js';
import { Media } from '../models/Media.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');

class StorageService {
  constructor() {
    this.data = {
      categories: [],
      authors: [],
      articles: [],
      users: [],
      media: [],
      settings: {
        siteTitle: "TECHPULSE",
        tagline: "Technology. Innovation. Intelligence.",
        description: "A premier corporate technology publication exploring software engineering, cloud computing, cybersecurity, and artificial intelligence.",
        gaMeasurementId: "G-TECHPULSE2026",
        gscVerificationToken: "techpulse-google-site-verification-token-hash-2026",
        enableNewsletter: true
      }
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        console.log('[TechPulse Storage] Loaded database from persistent storage file.');
      } else {
        this.data.categories = initialCategories;
        this.data.authors = initialAuthors;
        this.data.articles = initialArticles;
        this.data.users = [initialAdminUser];
        this.persist();
        console.log('[TechPulse Storage] Initialized database with comprehensive enterprise seed data.');
      }
    } catch (err) {
      console.error('[TechPulse Storage Init Error]:', err);
    }
  }

  persist() {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[TechPulse Storage Persist Error]:', err);
    }
  }

  async syncWithMongoDB() {
    try {
      // 1. Categories
      const catCount = await Category.countDocuments();
      if (catCount === 0 && this.data.categories?.length > 0) {
        await Category.insertMany(this.data.categories);
        console.log(`[MongoDB Sync] Seeded ${this.data.categories.length} categories.`);
      }

      // 2. Authors
      const authCount = await Author.countDocuments();
      if (authCount === 0 && this.data.authors?.length > 0) {
        await Author.insertMany(this.data.authors);
        console.log(`[MongoDB Sync] Seeded ${this.data.authors.length} authors.`);
      }

      // 3. Users
      const userCount = await User.countDocuments();
      if (userCount === 0 && this.data.users?.length > 0) {
        await User.insertMany(this.data.users);
        console.log(`[MongoDB Sync] Seeded ${this.data.users.length} users.`);
      }

      // 4. Articles
      const artCount = await Article.countDocuments();
      if (artCount === 0 && this.data.articles?.length > 0) {
        await Article.insertMany(this.data.articles);
        console.log(`[MongoDB Sync] Seeded ${this.data.articles.length} articles.`);
      }

      // 5. Settings
      const setCount = await Setting.countDocuments();
      if (setCount === 0 && this.data.settings) {
        await Setting.create(this.data.settings);
        console.log(`[MongoDB Sync] Seeded platform settings.`);
      }

      console.log('[MongoDB Sync] MongoDB collections verified and synchronized.');
    } catch (err) {
      console.warn('[MongoDB Sync Notice]:', err.message);
    }
  }

  // Auto publish scheduled posts if time has arrived
  checkScheduledPosts() {
    const now = new Date();
    let updated = false;
    this.data.articles.forEach(article => {
      if (article.status === 'scheduled' && article.scheduledFor && new Date(article.scheduledFor) <= now) {
        article.status = 'published';
        article.publishedAt = article.scheduledFor;
        updated = true;
        console.log(`[TechPulse Scheduler] Auto-published article: "${article.title}" at ${now.toISOString()}`);
      }
    });
    if (updated) this.persist();
  }

  // --- ARTICLES ---
  getArticles({ category, search, sort = 'newest', page = 1, limit = 9, status = 'published' } = {}) {
    this.checkScheduledPosts();
    let list = [...this.data.articles];

    // Status filter
    if (status !== 'all') {
      list = list.filter(a => a.status === status);
    }

    // Category filter
    if (category) {
      const matchedCat = this.data.categories.find(c => c.slug === category || c.id === category);
      if (matchedCat) {
        list = list.filter(a => a.category === matchedCat.id || a.category === matchedCat.slug);
      }
    }

    // Keyword Search filter
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.shortDescription.toLowerCase().includes(q) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(q))) ||
        a.content.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === 'newest') {
      list.sort((a, b) => new Date(b.publishedAt || b.createdAt || 0) - new Date(a.publishedAt || a.createdAt || 0));
    } else if (sort === 'oldest') {
      list.sort((a, b) => new Date(a.publishedAt || a.createdAt || 0) - new Date(b.publishedAt || b.createdAt || 0));
    } else if (sort === 'popular' || sort === 'views') {
      list.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    }

    const total = list.length;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    // Populate category & author
    const populated = paginated.map(art => this.populateArticle(art));

    return {
      articles: populated,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    };
  }

  populateArticle(art) {
    if (!art) return null;
    const categoryObj = this.data.categories.find(c => c.id === art.category || c.slug === art.category) || {
      id: art.category,
      name: "Technology",
      slug: "technology"
    };
    const authorObj = this.data.authors.find(a => a.id === art.author) || {
      id: art.author,
      name: "TechPulse Editorial Board",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      roleTitle: "Staff Writer"
    };
    return {
      ...art,
      categoryDetails: categoryObj,
      authorDetails: authorObj
    };
  }

  getFeaturedArticles() {
    this.checkScheduledPosts();
    const published = this.data.articles.filter(a => a.status === 'published');
    const featured = published.filter(a => a.isFeatured);
    const lead = featured.length > 0 ? this.populateArticle(featured[0]) : this.populateArticle(published[0]);
    const supporting = (featured.length > 1 ? featured.slice(1, 4) : published.slice(1, 4)).map(a => this.populateArticle(a));
    return { lead, supporting };
  }

  getTrendingArticles(limit = 5) {
    this.checkScheduledPosts();
    const published = [...this.data.articles.filter(a => a.status === 'published')];
    published.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    return published.slice(0, limit).map(a => this.populateArticle(a));
  }

  getArticleBySlug(slug, incrementView = false) {
    this.checkScheduledPosts();
    const article = this.data.articles.find(a => a.slug === slug);
    if (!article) return null;
    if (incrementView) {
      article.viewsCount = (article.viewsCount || 0) + 1;
      this.persist();
    }
    return this.populateArticle(article);
  }

  getArticleById(id) {
    const article = this.data.articles.find(a => a.id === id);
    return article ? this.populateArticle(article) : null;
  }

  getRelatedArticles(slug, limit = 3) {
    const current = this.data.articles.find(a => a.slug === slug);
    if (!current) return [];
    const related = this.data.articles.filter(a =>
      a.slug !== slug &&
      a.status === 'published' &&
      (a.category === current.category || (a.tags && current.tags && a.tags.some(t => current.tags.includes(t))))
    );
    return related.slice(0, limit).map(a => this.populateArticle(a));
  }

  createArticle(articleData) {
    const id = `art-${Date.now()}`;
    const wordCount = (articleData.content || '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 220));

    const newArticle = {
      id,
      title: articleData.title,
      slug: articleData.slug || this.generateSlug(articleData.title),
      shortDescription: articleData.shortDescription || '',
      content: articleData.content || '',
      featuredImage: articleData.featuredImage || {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        alt: articleData.title,
        caption: ""
      },
      category: articleData.category || this.data.categories[0]?.id,
      tags: articleData.tags || [],
      author: articleData.author || this.data.authors[0]?.id,
      status: articleData.status || 'draft',
      isFeatured: !!articleData.isFeatured,
      viewsCount: 0,
      estimatedReadingTime: readingTime,
      publishedAt: articleData.status === 'published' ? (articleData.publishedAt || new Date()) : null,
      scheduledFor: articleData.status === 'scheduled' ? articleData.scheduledFor : null,
      seo: articleData.seo || {
        metaTitle: `${articleData.title} | TechPulse`,
        metaDescription: articleData.shortDescription,
        canonicalUrl: `https://techpulse.io/articles/${articleData.slug || this.generateSlug(articleData.title)}`
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.data.articles.unshift(newArticle);
    this.persist();
    Article.create(newArticle).catch(err => console.warn('[Mongo Article Insert Notice]:', err.message));
    return this.populateArticle(newArticle);
  }

  updateArticle(id, updates) {
    const index = this.data.articles.findIndex(a => a.id === id);
    if (index === -1) return null;

    const current = this.data.articles[index];
    const wordCount = (updates.content || current.content || '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 220));

    let publishedAt = current.publishedAt;
    if (updates.status === 'published' && current.status !== 'published') {
      publishedAt = new Date();
    } else if (updates.status === 'draft') {
      publishedAt = null;
    }

    this.data.articles[index] = {
      ...current,
      ...updates,
      estimatedReadingTime: readingTime,
      publishedAt,
      updatedAt: new Date()
    };

    this.persist();
    Article.findOneAndUpdate({ id }, this.data.articles[index], { upsert: true }).catch(err => console.warn('[Mongo Article Update Notice]:', err.message));
    return this.populateArticle(this.data.articles[index]);
  }

  deleteArticle(id) {
    const index = this.data.articles.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.data.articles.splice(index, 1);
    this.persist();
    Article.deleteOne({ id }).catch(err => console.warn('[Mongo Article Delete Notice]:', err.message));
    return true;
  }

  // --- CATEGORIES ---
  getCategories() {
    this.checkScheduledPosts();
    return this.data.categories.map(c => {
      const count = this.data.articles.filter(a => (a.category === c.id || a.category === c.slug) && a.status === 'published').length;
      return {
        ...c,
        articlesCount: count
      };
    });
  }

  createCategory(categoryData) {
    const id = `cat-${Date.now()}`;
    const newCategory = {
      id,
      name: categoryData.name,
      slug: categoryData.slug || this.generateSlug(categoryData.name),
      description: categoryData.description || '',
      displayOrder: categoryData.displayOrder || (this.data.categories.length + 1)
    };
    this.data.categories.push(newCategory);
    this.persist();
    Category.create(newCategory).catch(err => console.warn('[Mongo Category Insert Notice]:', err.message));
    return newCategory;
  }

  updateCategory(id, updates) {
    const index = this.data.categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.data.categories[index] = { ...this.data.categories[index], ...updates };
    this.persist();
    Category.findOneAndUpdate({ id }, this.data.categories[index], { upsert: true }).catch(err => console.warn('[Mongo Category Update Notice]:', err.message));
    return this.data.categories[index];
  }

  deleteCategory(id) {
    const index = this.data.categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.data.categories.splice(index, 1);
    this.persist();
    Category.deleteOne({ id }).catch(err => console.warn('[Mongo Category Delete Notice]:', err.message));
    return true;
  }

  // --- AUTHORS ---
  getAuthors() {
    return this.data.authors.map(author => {
      const count = this.data.articles.filter(a => a.author === author.id && a.status === 'published').length;
      return {
        ...author,
        articlesCount: count
      };
    });
  }

  createAuthor(authorData) {
    const id = `auth-${Date.now()}`;
    const newAuthor = {
      id,
      name: authorData.name,
      email: authorData.email,
      roleTitle: authorData.roleTitle || 'Technology Specialist',
      bio: authorData.bio || '',
      avatarUrl: authorData.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      socialLinks: authorData.socialLinks || { twitter: '', linkedin: '', github: '' }
    };
    this.data.authors.push(newAuthor);
    this.persist();
    Author.create(newAuthor).catch(err => console.warn('[Mongo Author Insert Notice]:', err.message));
    return newAuthor;
  }

  updateAuthor(id, updates) {
    const index = this.data.authors.findIndex(a => a.id === id);
    if (index === -1) return null;
    this.data.authors[index] = { ...this.data.authors[index], ...updates };
    this.persist();
    Author.findOneAndUpdate({ id }, this.data.authors[index], { upsert: true }).catch(err => console.warn('[Mongo Author Update Notice]:', err.message));
    return this.data.authors[index];
  }

  deleteAuthor(id) {
    const index = this.data.authors.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.data.authors.splice(index, 1);
    this.persist();
    Author.deleteOne({ id }).catch(err => console.warn('[Mongo Author Delete Notice]:', err.message));
    return true;
  }

  // --- MEDIA ---
  getMedia() {
    return this.data.media || [];
  }

  createMedia(mediaItem) {
    if (!this.data.media) this.data.media = [];
    const id = `med-${Date.now()}`;
    const newMedia = {
      id,
      ...mediaItem,
      createdAt: new Date()
    };
    this.data.media.unshift(newMedia);
    this.persist();
    return newMedia;
  }

  deleteMedia(id) {
    if (!this.data.media) return false;
    const index = this.data.media.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.data.media.splice(index, 1);
    this.persist();
    return true;
  }

  // --- USERS / AUTH ---
  findUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  getUsers() {
    return this.data.users.map(({ passwordHash, ...safeUser }) => safeUser);
  }

  updateUserRole(userId, newRole) {
    const validRoles = ['superadmin', 'admin', 'publisher', 'editor', 'reader'];
    if (!validRoles.includes(newRole)) {
      throw new Error(`Invalid role. Valid roles are: ${validRoles.join(', ')}`);
    }

    const user = this.data.users.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found.');
    }

    if (user.email === 'admin@techpulse.io' && newRole !== 'superadmin' && newRole !== 'admin') {
      throw new Error('Root system administrator account cannot be demoted.');
    }

    user.role = newRole;
    user.updatedAt = new Date().toISOString();
    this.persist();
    User.findOneAndUpdate({ id: userId }, { role: newRole, updatedAt: new Date() }).catch(err => console.warn('[Mongo User Role Update Notice]:', err.message));

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  createUser(userData) {
    const user = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      passwordHash: userData.passwordHash,
      role: userData.role || 'reader',
      createdAt: new Date()
    };
    this.data.users.push(user);
    this.persist();
    User.create(user).catch(err => console.warn('[Mongo User Create Notice]:', err.message));
    return user;
  }

  // --- SETTINGS ---
  getSettings() {
    return this.data.settings;
  }

  updateSettings(updates) {
    this.data.settings = { ...this.data.settings, ...updates };
    this.persist();
    Setting.findOneAndUpdate({}, this.data.settings, { upsert: true }).catch(err => console.warn('[Mongo Setting Update Notice]:', err.message));
    return this.data.settings;
  }

  // --- DASHBOARD METRICS ---
  getDashboardStats() {
    this.checkScheduledPosts();
    const total = this.data.articles.length;
    const published = this.data.articles.filter(a => a.status === 'published').length;
    const drafts = this.data.articles.filter(a => a.status === 'draft').length;
    const scheduled = this.data.articles.filter(a => a.status === 'scheduled').length;

    const recentActivity = this.data.articles.slice(0, 5).map(a => ({
      id: a.id,
      title: a.title,
      status: a.status,
      date: a.updatedAt || a.publishedAt || a.createdAt,
      author: this.data.authors.find(au => au.id === a.author)?.name || "Editorial Admin"
    }));

    return {
      totalArticles: total,
      publishedArticles: published,
      draftArticles: drafts,
      scheduledArticles: scheduled,
      recentActivity,
      recentArticles: this.data.articles.slice(0, 6).map(a => this.populateArticle(a))
    };
  }

  generateSlug(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

export const storage = new StorageService();
