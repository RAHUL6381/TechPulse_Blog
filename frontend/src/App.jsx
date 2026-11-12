import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ArticlesPage } from './pages/public/ArticlesPage';
import { ArticleDetailPage } from './pages/public/ArticleDetailPage';
import { CategoryPage } from './pages/public/CategoryPage';
import { SearchResultsPage } from './pages/public/SearchResultsPage';
import { AboutPage } from './pages/public/AboutPage';
import { SignupPage } from './pages/public/SignupPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ArticleManagerPage } from './pages/admin/ArticleManagerPage';
import { ArticleEditorPage } from './pages/admin/ArticleEditorPage';
import { CategoryManagerPage } from './pages/admin/CategoryManagerPage';
import { AuthorManagerPage } from './pages/admin/AuthorManagerPage';
import { MediaLibraryPage } from './pages/admin/MediaLibraryPage';
import { ScheduledPostsPage } from './pages/admin/ScheduledPostsPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { UsersManagerPage } from './pages/admin/UsersManagerPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
            <Route path="/categories/:slug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* Admin Login Gateway */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Administrative CMS Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="articles" element={<ArticleManagerPage />} />
            <Route path="articles/create" element={<ArticleEditorPage />} />
            <Route path="articles/edit/:id" element={<ArticleEditorPage />} />
            <Route path="categories" element={<CategoryManagerPage />} />
            <Route path="authors" element={<AuthorManagerPage />} />
            <Route path="media" element={<MediaLibraryPage />} />
            <Route path="scheduled" element={<ScheduledPostsPage />} />
            <Route path="users" element={<UsersManagerPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
  );
}
