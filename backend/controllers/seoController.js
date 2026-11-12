import { storage } from '../services/storageService.js';

export const getSitemapXml = (req, res) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const articles = storage.getArticles({ status: 'published', limit: 1000 }).articles;
    const categories = storage.getCategories();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static roots
    xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${baseUrl}/articles</loc>\n    <changefreq>hourly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${baseUrl}/about</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;

    // Categories
    categories.forEach(cat => {
      xml += `  <url>\n    <loc>${baseUrl}/categories/${cat.slug}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Articles
    articles.forEach(art => {
      const dateStr = art.publishedAt ? new Date(art.publishedAt).toISOString() : new Date().toISOString();
      xml += `  <url>\n    <loc>${baseUrl}/articles/${art.slug}</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('Error generating XML sitemap');
  }
};

export const getRobotsTxt = (req, res) => {
  const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const robots = `User-agent: *
Allow: /
Allow: /articles
Allow: /categories/
Allow: /about
Disallow: /admin/
Disallow: /api/v1/admin/

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
};

export const getSettings = (req, res) => {
  res.json({ success: true, settings: storage.getSettings() });
};

export const updateSettings = (req, res) => {
  const updated = storage.updateSettings(req.body);
  res.json({ success: true, settings: updated });
};
