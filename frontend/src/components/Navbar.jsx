import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, ShieldCheck, LogOut, Crown, Edit3, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';
import { BrandLogo } from './BrandLogo';

export const Navbar = () => {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, isAdmin, isPublisher, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.getCategories().then(res => {
      if (res.success) setCategories(res.categories);
    }).catch(console.error);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-200 ${
      isDark
        ? (isScrolled ? 'bg-[#0B0F19]/95 backdrop-blur-md shadow-sm border-b border-slate-800' : 'bg-[#0B0F19] border-b border-slate-800')
        : (isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-borderGray' : 'bg-white border-b border-borderGray')
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo Lockup */}
          <BrandLogo linkTo="/" size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? (isDark ? 'text-blue-400 font-semibold' : 'text-electric font-semibold')
                  : (isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-navy-900')
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/articles" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/articles' 
                  ? (isDark ? 'text-blue-400 font-semibold' : 'text-electric font-semibold')
                  : (isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-navy-900')
              }`}
            >
              Articles
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className={`flex items-center space-x-1 text-sm font-medium focus:outline-none transition-colors ${
                  isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180 text-electric' : ''}`} />
              </button>

              {categoriesOpen && (
                <div 
                  className={`absolute left-0 mt-3 w-72 rounded-2xl shadow-xl border py-2 z-50 animate-in fade-in slide-in-from-top-2 ${
                    isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-borderGray'
                  }`}
                  onMouseLeave={() => setCategoriesOpen(false)}
                >
                  <div className={`px-4 py-2 border-b text-[11px] font-bold uppercase tracking-wider ${
                    isDark ? 'border-slate-800 text-slate-400' : 'border-borderGray text-slate-400'
                  }`}>
                    7 Core Technology Pillars
                  </div>
                  {categories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/categories/${cat.slug}`}
                      className={`flex items-center justify-between px-4 py-2.5 text-xs transition-colors ${
                        isDark 
                          ? 'text-slate-200 hover:bg-slate-800 hover:text-blue-400' 
                          : 'text-slate-700 hover:bg-cloud hover:text-electric'
                      }`}
                      onClick={() => setCategoriesOpen(false)}
                    >
                      <span className="font-semibold">{cat.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {cat.articlesCount || 0}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/about' 
                  ? (isDark ? 'text-blue-400 font-semibold' : 'text-electric font-semibold')
                  : (isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-navy-900')
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right Actions: Interactive Theme Segmented Pill + Search + Auth / Workspace */}
          <div className="hidden md:flex items-center space-x-3.5">
            
            {/* Interactive Dual-Mode Theme Pill Toggle */}
            <div
              role="group"
              aria-label="Theme Mode Selection"
              className={`flex items-center p-0.5 rounded-full border transition-all duration-200 shadow-xs ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-borderGray'
              }`}
            >
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  !isDark 
                    ? 'bg-white text-navy-900 shadow-sm ring-1 ring-slate-900/5' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Light Theme"
                aria-pressed={!isDark}
              >
                <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500' : 'text-slate-400'}`} />
                <span>Light</span>
              </button>
              
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  isDark 
                    ? 'bg-electric text-white shadow-sm' 
                    : 'text-slate-500 hover:text-navy-900'
                }`}
                title="Switch to Dark Theme"
                aria-pressed={isDark}
              >
                <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-pulse' : 'text-slate-400'}`} />
                <span>Dark</span>
              </button>
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search research..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-36 xl:w-48 pl-9 pr-3.5 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-electric transition-all ${
                  isDark 
                    ? 'bg-[#1A2234] border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-cloud border-borderGray text-navy-900 placeholder-slate-400 focus:bg-white'
                }`}
              />
              <Search className={`w-4 h-4 absolute left-3 top-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            </form>

            {/* Hierarchical Role & Workspace CTA */}
            {isPublisher ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/admin/dashboard"
                  className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    isAdmin
                      ? 'bg-purple-900 hover:bg-purple-800 text-white border border-purple-700'
                      : (isDark ? 'bg-electric hover:bg-electric-hover text-white' : 'bg-navy-900 hover:bg-navy-800 text-white')
                  }`}
                >
                  {isAdmin ? (
                    <Crown className="w-3.5 h-3.5 text-purple-300" />
                  ) : (
                    <Edit3 className="w-3.5 h-3.5 text-blue-300" />
                  )}
                  <span>{isAdmin ? 'Admin Console' : 'Publisher Portal'}</span>
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  className={`p-2 rounded-xl border transition-colors ${
                    isDark 
                      ? 'border-slate-700 text-slate-400 hover:text-rose-400 hover:bg-slate-800' 
                      : 'border-borderGray text-slate-500 hover:text-rose-600 hover:bg-cloud'
                  }`}
                  title="Sign out of workspace"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{user?.name}</span>
                    <button
                      type="button"
                      onClick={logout}
                      className={`p-1.5 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-navy-900'}`}
                      title="Sign Out"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/signup"
                    className={`inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                      isDark 
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                        : 'bg-cloud hover:bg-slate-100 text-slate-700 border-borderGray'
                    }`}
                  >
                    Join Briefing
                  </Link>
                )}

                <Link
                  to="/admin/login"
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm ${
                    isDark 
                      ? 'bg-electric hover:bg-electric-hover text-white' 
                      : 'bg-navy-900 hover:bg-navy-800 text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-pulse" />
                  <span>Publisher Sign In</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Bar: Theme Toggle + Menu Hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              type="button"
              className={`p-2 rounded-xl border transition-colors shadow-xs ${
                isDark 
                  ? 'border-slate-700 bg-slate-800 text-amber-400' 
                  : 'border-borderGray bg-cloud text-slate-700'
              }`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-navy-900 hover:bg-cloud'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-3 pb-6 space-y-4 shadow-xl ${
          isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-borderGray'
        }`}>
          {/* Theme Switch Row for Mobile */}
          <div className={`flex items-center justify-between p-2 rounded-xl border ${
            isDark ? 'bg-[#1A2234] border-slate-700' : 'bg-cloud border-borderGray'
          }`}>
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Theme Appearance:
            </span>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !isDark ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-400'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isDark ? 'bg-electric text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-pulse" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search research..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-electric ${
                isDark ? 'bg-[#1A2234] border-slate-700 text-white' : 'bg-cloud border-borderGray text-navy-900'
              }`}
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </form>

          <div className="space-y-1">
            <Link to="/" className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
              isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-cloud'
            }`}>Home</Link>
            <Link to="/articles" className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
              isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-cloud'
            }`}>Articles</Link>
            
            <div className="pt-2 pb-1">
              <span className="block px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Categories</span>
              <div className="mt-1 space-y-1 pl-2">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.slug}`}
                    className={`block px-3 py-1.5 rounded-lg text-xs font-medium ${
                      isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-cloud'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about" className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
              isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-cloud'
            }`}>About</Link>
          </div>

          <div className={`pt-4 border-t ${isDark ? 'border-slate-800' : 'border-borderGray'}`}>
            {isPublisher ? (
              <Link
                to="/admin/dashboard"
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-bold shadow-sm"
              >
                {isAdmin ? <Crown className="w-4 h-4 text-purple-300" /> : <Edit3 className="w-4 h-4 text-blue-300" />}
                <span>{isAdmin ? 'Admin Console' : 'Publisher Workspace'}</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-bold shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-pulse" />
                <span>Publisher Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
