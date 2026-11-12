import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { getSitemapXml, getRobotsTxt } from './controllers/seoController.js';
import { initScheduler } from './services/schedulerService.js';
import { connectDB, getMongoStatus } from './config/db.js';
import { storage } from './services/storageService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// SEO Routes at root
app.get('/sitemap.xml', getSitemapXml);
app.get('/robots.txt', getRobotsTxt);

// API Endpoints
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/admin', adminRoutes);

// Health check endpoint with MongoDB telemetry
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'TechPulse Corporate Publishing Backend',
    database: getMongoStatus(),
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Enterprise Server Error'
  });
});

// Start Server with MongoDB Initialization
const startServer = async () => {
  try {
    await connectDB();
    await storage.syncWithMongoDB();
  } catch (err) {
    console.error('[MongoDB Startup Notice]:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  TECHPULSE PUBLISHING BACKEND SERVICE ONLINE`);
    console.log(`  PORT: ${PORT}`);
    console.log(`  REST API Root: http://localhost:${PORT}/api/v1/public/articles`);
    console.log(`  Sitemap:       http://localhost:${PORT}/sitemap.xml`);
    console.log(`  Robots:        http://localhost:${PORT}/robots.txt`);
    console.log(`=======================================================`);
    initScheduler();
  });
};

startServer();
