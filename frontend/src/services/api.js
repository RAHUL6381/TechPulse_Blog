const API_BASE = '/api/v1';

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('techpulse_token');
  const headers = {};
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Public
  getArticles: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/public/articles?${query}`).then(handleResponse);
  },
  getFeaturedArticles: () => {
    return fetch(`${API_BASE}/public/articles/featured`).then(handleResponse);
  },
  getTrendingArticles: () => {
    return fetch(`${API_BASE}/public/articles/trending`).then(handleResponse);
  },
  getArticleBySlug: (slug) => {
    return fetch(`${API_BASE}/public/articles/${slug}`).then(handleResponse);
  },
  getRelatedArticles: (slug) => {
    return fetch(`${API_BASE}/public/articles/${slug}/related`).then(handleResponse);
  },
  getCategories: () => {
    return fetch(`${API_BASE}/public/categories`).then(handleResponse);
  },
  getAuthors: () => {
    return fetch(`${API_BASE}/public/authors`).then(handleResponse);
  },

  // Auth
  signup: (details) => {
    return fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    }).then(handleResponse);
  },
  login: (credentials) => {
    return fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(handleResponse);
  },
  getMe: () => {
    return fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    }).then(handleResponse);
  },

  // Admin CMS
  getDashboardStats: () => {
    return fetch(`${API_BASE}/admin/dashboard/stats`, {
      headers: getHeaders()
    }).then(handleResponse);
  },
  getAdminArticles: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/admin/articles?${query}`, {
      headers: getHeaders()
    }).then(handleResponse);
  },
  getAdminArticleById: (id) => {
    return fetch(`${API_BASE}/admin/articles/${id}`, {
      headers: getHeaders()
    }).then(handleResponse);
  },
  createArticle: (articleData) => {
    return fetch(`${API_BASE}/admin/articles`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(articleData)
    }).then(handleResponse);
  },
  updateArticle: (id, updates) => {
    return fetch(`${API_BASE}/admin/articles/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    }).then(handleResponse);
  },
  deleteArticle: (id) => {
    return fetch(`${API_BASE}/admin/articles/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse);
  },

  // Categories
  createCategory: (data) => {
    return fetch(`${API_BASE}/admin/categories`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse);
  },
  updateCategory: (id, data) => {
    return fetch(`${API_BASE}/admin/categories/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse);
  },
  deleteCategory: (id) => {
    return fetch(`${API_BASE}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse);
  },

  // Authors
  createAuthor: (data) => {
    return fetch(`${API_BASE}/admin/authors`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse);
  },
  updateAuthor: (id, data) => {
    return fetch(`${API_BASE}/admin/authors/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse);
  },
  deleteAuthor: (id) => {
    return fetch(`${API_BASE}/admin/authors/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse);
  },

  // Media
  getMedia: () => {
    return fetch(`${API_BASE}/admin/media`, {
      headers: getHeaders()
    }).then(handleResponse);
  },
  uploadMedia: (formData) => {
    return fetch(`${API_BASE}/admin/media/upload`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData
    }).then(handleResponse);
  },
  deleteMedia: (id) => {
    return fetch(`${API_BASE}/admin/media/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse);
  },

  // Settings
  updateSettings: (settings) => {
    return fetch(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(settings)
    }).then(handleResponse);
  },

  // User & Access Governance (Admin Highest Privilege)
  getUsers: () => {
    return fetch(`${API_BASE}/admin/users`, {
      headers: getHeaders()
    }).then(handleResponse);
  },
  updateUserRole: (id, role) => {
    return fetch(`${API_BASE}/admin/users/${id}/role`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ role })
    }).then(handleResponse);
  }
};
