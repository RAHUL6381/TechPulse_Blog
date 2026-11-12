import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, TrendingUp, Compass, Mail, CheckCircle2, ChevronRight, Layers, Shield, Cpu, Cloud, Code, Smartphone, BarChart3 } from 'lucide-react';
import { api } from '../../services/api';
import { ArticleCard } from '../../components/ArticleCard';
import { useTheme } from '../../context/ThemeContext';

export const HomePage = () => {
  const { isDark } = useTheme();
  const [featured, setFeatured] = useState({ lead: null, supporting: [] });
  const [latestArticles, setLatestArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchHero, setSearchHero] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.getFeaturedArticles(),
      api.getArticles({ page: 1, limit: 6, sort: 'newest' }),
      api.getCategories(),
      api.getTrendingArticles()
    ]).then(([featRes, artRes, catRes, trendRes]) => {
      if (featRes.success) setFeatured(featRes.data);
      if (artRes.success) {
        setLatestArticles(artRes.articles);
        setHasMore(artRes.page < artRes.totalPages);
      }
      if (catRes.success) setCategories(catRes.categories);
      if (trendRes.success) setTrending(trendRes.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchHero.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchHero.trim())}`);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    api.getArticles({ page: nextPage, limit: 6, sort: 'newest' }).then(res => {
      if (res.success) {
        setLatestArticles(prev => [...prev, ...res.articles]);
        setPage(nextPage);
        setHasMore(res.page < res.totalPages);
      }
    });
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'software-development': return <Code className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-electric'}`} />;
      case 'artificial-intelligence': return <Cpu className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-electric'}`} />;
      case 'web-mobile-development': return <Smartphone className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-electric'}`} />;
      case 'technology-innovation': return <Compass className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-electric'}`} />;
      case 'cybersecurity': return <Shield className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-electric'}`} />;
      case 'cloud-computing': return <Cloud className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-electric'}`} />;
      case 'industry-insights': return <BarChart3 className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-electric'}`} />;
      default: return <Layers className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-electric'}`} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-electric border-t-transparent rounded-full animate-spin" />
          <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Loading TechPulse Observatory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION: EDITORIAL SPOTLIGHT */}
      <section className={`pt-12 pb-16 border-b transition-colors duration-200 ${
        isDark 
          ? 'bg-[#0B0F19] border-slate-800' 
          : 'bg-gradient-to-b from-cloud/70 via-cloud/30 to-white border-borderGray'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Pitch */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide shadow-xs ${
                isDark ? 'bg-blue-950/70 border-blue-700/50 text-blue-300' : 'bg-electric-light border-electric/20 text-electric'
              }`}>
                <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400' : 'text-electric'}`} />
                <span>The Digital Technology Observatory</span>
              </div>

              <h1 className={`font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] ${
                isDark ? 'text-white' : 'text-navy-900'
              }`}>
                Stay Curious. <br />
                <span className={
                  isDark 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-200' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-electric to-navy-900'
                }>
                  Stay Ahead.
                </span>
              </h1>

              <p className={`text-lg max-w-xl leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Discover the ideas, architectures and frontier innovations shaping tomorrow's digital world. Curated for engineering leads, system architects, and tech innovators.
              </p>

              {/* Prominent Article Search Bar */}
              <form onSubmit={handleHeroSearch} className="max-w-xl relative">
                <div className={`relative flex items-center shadow-lg rounded-xl overflow-hidden border focus-within:ring-2 focus-within:ring-electric transition-all ${
                  isDark ? 'bg-[#131D2E] border-slate-700' : 'bg-white border-borderGray'
                }`}>
                  <Search className={`w-5 h-5 ml-4 flex-shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    value={searchHero}
                    onChange={(e) => setSearchHero(e.target.value)}
                    placeholder="Search engineering papers, architectures, concepts..."
                    className={`w-full px-4 py-4 text-sm bg-transparent focus:outline-none ${
                      isDark ? 'text-white placeholder-slate-500' : 'text-navy-900 placeholder-slate-400'
                    }`}
                  />
                  <button
                    type="submit"
                    className={`mr-2 px-5 py-2.5 text-white text-xs font-semibold rounded-lg transition-colors flex-shrink-0 shadow-sm ${
                      isDark ? 'bg-electric hover:bg-electric-hover' : 'bg-navy-900 hover:bg-electric'
                    }`}
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/articles"
                  className="px-6 py-3 rounded-xl bg-electric hover:bg-electric-hover text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <span>Explore All Articles</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#categories"
                  className={`px-6 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                    isDark 
                      ? 'border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-500' 
                      : 'border-borderGray text-slate-700 hover:bg-cloud hover:border-slate-400'
                  }`}
                >
                  Discover 7 Topics
                </a>
              </div>

            </div>

            {/* Right Hero: Primary Lead Story Highlight */}
            {featured.lead && (
              <div className="lg:col-span-5">
                <div className={`rounded-3xl p-4 border shadow-xl hover:shadow-2xl transition-all group ${
                  isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-borderGray'
                }`}>
                  <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${
                    isDark ? 'bg-slate-800' : 'bg-cloud'
                  }`}>
                    <img
                      src={featured.lead.featuredImage?.url}
                      alt={featured.lead.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-pulse shadow-md ${
                        isDark ? 'bg-slate-900 border border-slate-700' : 'bg-navy-900'
                      }`}>
                        {featured.lead.categoryDetails?.name || 'Featured Story'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      By {featured.lead.authorDetails?.name} • {featured.lead.estimatedReadingTime} min read
                    </div>

                    <Link to={`/articles/${featured.lead.slug}`} className="block">
                      <h2 className={`font-heading font-bold text-xl transition-colors line-clamp-2 ${
                        isDark ? 'text-white hover:text-blue-400' : 'text-navy-900 hover:text-electric'
                      }`}>
                        {featured.lead.title}
                      </h2>
                    </Link>

                    <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {featured.lead.shortDescription}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        to={`/articles/${featured.lead.slug}`}
                        className={`text-xs font-bold hover:underline flex items-center space-x-1 ${
                          isDark ? 'text-blue-400' : 'text-electric'
                        }`}
                      >
                        <span>Read Full Paper</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>


      {/* 2. FEATURED ARTICLES MULTI-GRID */}
      {featured.supporting && featured.supporting.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between mb-8 border-b pb-4 ${
            isDark ? 'border-slate-800' : 'border-borderGray'
          }`}>
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-blue-400' : 'text-electric'}`}>
                Curated Selection
              </span>
              <h2 className={`font-heading font-bold text-2xl mt-1 ${isDark ? 'text-white' : 'text-navy-900'}`}>
                Featured Editorial Stories
              </h2>
            </div>
            <Link to="/articles" className={`text-sm font-semibold flex items-center space-x-1 ${
              isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-electric'
            }`}>
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.supporting.map(art => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}


      {/* 3. CATEGORY-BASED NAVIGATION (THE 7 CORE TECHNOLOGY PILLARS) */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-8 lg:p-12 border transition-colors ${
          isDark ? 'bg-[#0D1527] border-slate-800' : 'bg-cloud border-borderGray'
        }`}>
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-blue-400' : 'text-electric'}`}>
              Taxonomy & Domains
            </span>
            <h2 className={`font-heading font-bold text-3xl mt-1 ${isDark ? 'text-white' : 'text-navy-900'}`}>
              7 Core Technology Pillars
            </h2>
            <p className={`text-sm mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Explore specialized technological publications organized into foundational computing domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className={`group rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                  isDark 
                    ? 'bg-[#131D2E] border-slate-800 hover:border-blue-400' 
                    : 'bg-white border-borderGray hover:border-electric hover:shadow-md'
                } ${idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    isDark ? 'bg-blue-950/70 border border-blue-900/50' : 'bg-electric-light'
                  }`}>
                    {getCategoryIcon(cat.slug)}
                  </div>
                  <h3 className={`font-heading font-bold text-base transition-colors mb-2 ${
                    isDark ? 'text-white group-hover:text-blue-400' : 'text-navy-900 group-hover:text-electric'
                  }`}>
                    {cat.name}
                  </h3>
                  <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                    {cat.description}
                  </p>
                </div>

                <div className={`pt-4 mt-4 border-t flex items-center justify-between text-xs ${
                  isDark ? 'border-slate-800 text-slate-400' : 'border-borderGray/60 text-slate-400'
                }`}>
                  <span>{cat.articlesCount || 0} Articles</span>
                  <span className={`font-semibold group-hover:translate-x-1 transition-transform flex items-center ${
                    isDark ? 'text-blue-400' : 'text-electric'
                  }`}>
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* 4. MAIN EDITORIAL CONTENT: LATEST POSTS & TRENDING SIDEBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Latest Articles (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className={`flex items-center justify-between border-b pb-4 ${
              isDark ? 'border-slate-800' : 'border-borderGray'
            }`}>
              <div>
                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-blue-400' : 'text-electric'}`}>Recent Publications</span>
                <h2 className={`font-heading font-bold text-2xl mt-1 ${isDark ? 'text-white' : 'text-navy-900'}`}>Latest Technology Articles</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {latestArticles.map(art => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center pt-6">
                <button
                  onClick={handleLoadMore}
                  className={`px-8 py-3.5 rounded-xl border text-sm font-semibold transition-colors shadow-xs ${
                    isDark 
                      ? 'border-slate-700 text-slate-200 hover:border-blue-400 hover:bg-slate-800' 
                      : 'border-borderGray text-navy-900 hover:border-electric hover:bg-cloud'
                  }`}
                >
                  Load More Published Articles
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Popular & Trending Articles (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Trending Box */}
            <div className={`rounded-3xl border p-6 shadow-sm sticky top-28 transition-colors ${
              isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-borderGray'
            }`}>
              
              <div className={`flex items-center space-x-2 font-heading font-bold text-lg pb-4 border-b ${
                isDark ? 'text-white border-slate-800' : 'text-navy-900 border-borderGray'
              }`}>
                <TrendingUp className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-electric'}`} />
                <span>Popular & Trending</span>
              </div>

              <div className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-borderGray'}`}>
                {trending.map((art, index) => (
                  <article key={art.id} className="py-4 first:pt-4 last:pb-0 group">
                    <div className="flex items-start space-x-4">
                      <span className={`font-heading font-black text-2xl transition-colors ${
                        isDark ? 'text-slate-600 group-hover:text-blue-400' : 'text-slate-300 group-hover:text-electric'
                      }`}>
                        0{index + 1}
                      </span>
                      <div className="space-y-1">
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          isDark ? 'text-blue-400' : 'text-electric'
                        }`}>
                          {art.categoryDetails?.name}
                        </span>
                        <Link to={`/articles/${art.slug}`} className="block">
                          <h4 className={`font-heading font-semibold text-sm transition-colors line-clamp-2 leading-snug ${
                            isDark ? 'text-white group-hover:text-blue-400' : 'text-navy-900 group-hover:text-electric'
                          }`}>
                            {art.title}
                          </h4>
                        </Link>
                        <div className={`text-[11px] flex items-center space-x-2 pt-1 ${
                          isDark ? 'text-slate-400' : 'text-slate-400'
                        }`}>
                          <span>{art.viewsCount ? `${art.viewsCount.toLocaleString()} reads` : 'High interest'}</span>
                          <span>•</span>
                          <span>{art.estimatedReadingTime}m read</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Editorial Quality Guarantee */}
              <div className={`mt-6 p-4 rounded-xl border text-xs space-y-1 ${
                isDark ? 'bg-[#162032] border-slate-800 text-slate-300' : 'bg-cloud border-borderGray/80 text-slate-600'
              }`}>
                <span className={`font-semibold block ${isDark ? 'text-white' : 'text-navy-900'}`}>Editorial Integrity:</span>
                <p>Popularity metrics reflect verified readership data without sponsored inflation.</p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* 5. NEWSLETTER ENHANCEMENT: TECHPULSE BRIEFING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border shadow-xl ${
          isDark ? 'bg-[#111827] border-slate-800' : 'bg-navy-900 border-navy-800'
        }`}>
          
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-electric/20 to-transparent pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-pulse text-xs font-semibold border ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-navy-800 border-transparent'
            }`}>
              <Mail className="w-3.5 h-3.5" />
              <span>The TechPulse Briefing</span>
            </span>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Curated engineering intelligence delivered bi-weekly.
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Join over 50,000+ technology leaders, cloud architects, and developers receiving our in-depth breakdowns on emerging computing shifts. No spam, strictly technical.
            </p>

            {newsletterSubscribed ? (
              <div className={`flex items-center space-x-2 text-pulse px-4 py-3 rounded-xl border border-pulse/30 ${
                isDark ? 'bg-slate-800/80' : 'bg-navy-800/80'
              }`}>
                <CheckCircle2 className="w-5 h-5 text-pulse" />
                <span className="text-sm font-semibold">Thank you for subscribing! Your briefing is active.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter corporate email address..."
                  className={`px-4 py-3 rounded-xl border text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-pulse flex-1 ${
                    isDark ? 'bg-[#1A2234] border-slate-700' : 'bg-navy-800 border-navy-700'
                  }`}
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-pulse hover:bg-pulse-hover text-navy-900 text-sm font-bold shadow-md transition-colors whitespace-nowrap"
                >
                  Subscribe to TechPulse
                </button>
              </form>
            )}

            <p className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              By subscribing you agree to our Editorial Terms and Privacy Disclosures.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
