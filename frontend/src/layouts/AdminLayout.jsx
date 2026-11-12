import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Users,
  Image as ImageIcon,
  Clock,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Crown,
  Edit3,
  Lock,
  ArrowRightLeft,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { BrandLogo } from '../components/BrandLogo';

export const AdminLayout = () => {
  const { user, isAdmin, isPublisher, loading, logout, login } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isPublisher) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleToggleDemoRole = async () => {
    setSwitching(true);
    try {
      if (isAdmin) {
        await login('publisher@techpulse.io', 'Publisher2026!');
      } else {
        await login('admin@techpulse.io', 'TechPulse2026!');
      }
    } catch (err) {
      console.error('Role switch failed:', err);
    } finally {
      setSwitching(false);
    }
  };

  const editorialNav = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Article Repository', path: '/admin/articles', icon: FileText },
    { name: 'Author New Post', path: '/admin/articles/create', icon: PlusCircle },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { name: 'Scheduled Queue', path: '/admin/scheduled', icon: Clock },
  ];

  const taxonomyNav = [
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Authors Directory', path: '/admin/authors', icon: Users },
  ];

  const governanceNav = [
    {
      name: 'Team & Access Control',
      path: '/admin/users',
      icon: ShieldCheck,
      adminOnly: true
    },
    {
      name: 'Platform & SEO Settings',
      path: '/admin/settings',
      icon: Settings,
      adminOnly: true
    },
  ];

  return (
    <div className="min-h-screen bg-cloud dark:bg-[#0B0F19] text-navy-900 dark:text-slate-100 flex transition-colors duration-200">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:sticky top-0 h-screen w-64 bg-navy-900 text-white z-50 flex flex-col justify-between transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div className="overflow-y-auto">
          {/* Brand Monogram Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-navy-800">
            <BrandLogo
              linkTo="/admin/dashboard"
              size="sm"
              subtitle="Workspace CMS"
              forceDarkText={true}
            />

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Role Privilege Badge in Sidebar */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-navy-800 border border-navy-700/80">
            <div className="flex items-center space-x-2 mb-1.5">
              {isAdmin ? (
                <div className="p-1 rounded-lg bg-purple-500/20 text-purple-300">
                  <Crown className="w-4 h-4" />
                </div>
              ) : (
                <div className="p-1 rounded-lg bg-blue-500/20 text-blue-300">
                  <Edit3 className="w-4 h-4" />
                </div>
              )}
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {isAdmin ? 'System Administrator' : 'Editorial Publisher'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isAdmin
                ? 'Highest Privilege (Tier 1) • Full user, platform & taxonomy governance'
                : 'Editorial Access (Tier 2) • Authoring, drafts & media pipeline'}
            </p>
          </div>

          {/* Navigation Links Grouped */}
          <nav className="p-3 space-y-5">
            
            {/* Group 1: Editorial Studio */}
            <div>
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Editorial Studio
              </span>
              <div className="space-y-1">
                {editorialNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-electric text-white shadow-sm'
                          : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Taxonomy & Directory */}
            <div>
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Taxonomy & Directory
              </span>
              <div className="space-y-1">
                {taxonomyNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-electric text-white shadow-sm'
                          : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Group 3: Enterprise Governance (Admin Highest Privilege) */}
            <div>
              <div className="px-3 flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Enterprise Governance
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  Admin Only
                </span>
              </div>
              <div className="space-y-1">
                {governanceNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {!isAdmin && <Lock className="w-3 h-3 text-slate-500" />}
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </Link>
                  );
                })}
              </div>
            </div>

          </nav>
        </div>

        {/* Bottom Sidebar: User & Public Link */}
        <div className="p-4 border-t border-navy-800 space-y-2 bg-navy-900">
          
          {/* Light / Dark Mode Toggle in Sidebar */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <div className="flex items-center space-x-2">
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
              <span>Dashboard Theme</span>
            </div>
            <span className="text-[10px] bg-navy-800 border border-navy-700 px-2 py-0.5 rounded-full text-slate-300 font-medium">
              {isDark ? '🌙 Dark' : '☀️ Light'}
            </span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5 text-pulse" />
              <span>Public Publication</span>
            </div>
          </a>

          <div className="pt-2 flex items-center justify-between px-2">
            <div className="flex items-center space-x-2.5">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${
                isAdmin
                  ? 'bg-purple-900/60 border-purple-500 text-purple-300'
                  : 'bg-blue-900/60 border-blue-500 text-blue-300'
              }`}>
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white truncate max-w-[100px]">{user?.name || 'User'}</span>
                <span className="block text-[10px] text-slate-400 capitalize">{user?.role || 'Staff'}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-navy-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-borderGray px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-cloud"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Current Active Privilege Indicator Pill */}
            {isAdmin ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                <Crown className="w-3.5 h-3.5 text-purple-600" />
                <span>Administrator (Highest Privilege)</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                <span>Editorial Publisher (Content Tier)</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className="px-3 py-1.5 rounded-xl border border-borderGray bg-cloud hover:bg-slate-100 text-[11px] font-semibold text-slate-700 transition-colors flex items-center space-x-1.5 shadow-xs"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle Theme Mode"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Quick Demo Switcher Pill to test Admin vs Publisher hierarchy */}
            <button
              onClick={handleToggleDemoRole}
              disabled={switching}
              title="Toggle between Administrator (Highest Privilege) and Publisher (Editorial Tier)"
              className="px-3 py-1.5 rounded-xl border border-borderGray bg-cloud hover:bg-slate-100 text-[11px] font-semibold text-slate-700 transition-colors flex items-center space-x-1.5"
            >
              <ArrowRightLeft className={`w-3.5 h-3.5 text-electric ${switching ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {isAdmin ? 'Test as Publisher' : 'Test as Administrator'}
              </span>
            </button>

            <Link
              to="/admin/articles/create"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Article</span>
            </Link>

            <div className="h-6 w-px bg-borderGray hidden sm:block" />

            <div className="flex items-center space-x-2 text-xs font-medium text-slate-700 hidden md:flex">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{user?.email}</span>
            </div>
          </div>

        </header>

        {/* Global Privilege Status Banner */}
        <div className={`px-4 sm:px-8 py-2.5 text-xs border-b flex items-center justify-between ${
          isAdmin
            ? 'bg-purple-50/70 border-purple-200 text-purple-900'
            : 'bg-blue-50/70 border-blue-200 text-blue-900'
        }`}>
          <div className="flex items-center space-x-2">
            {isAdmin ? <Crown className="w-4 h-4 text-purple-600" /> : <ShieldCheck className="w-4 h-4 text-blue-600" />}
            <span>
              {isAdmin ? (
                <>
                  <strong>Tier-1 Root Governance Active:</strong> You hold full administrative authority over User Roles, Platform Settings, Taxonomy Deletion, and Content Moderation.
                </>
              ) : (
                <>
                  <strong>Tier-2 Editorial Authority Active:</strong> You have full rights to author, edit, draft, and schedule articles. System settings and taxonomy deletion are governed by Administrators.
                </>
              )}
            </span>
          </div>

          <div className="text-[11px] font-bold uppercase tracking-wider hidden md:block">
            {isAdmin ? 'Privilege Level: Maximum' : 'Privilege Level: Content Contributor'}
          </div>
        </div>

        {/* Page Outlet */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
