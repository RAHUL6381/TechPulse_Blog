import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { api } from '../../services/api';
import { ArticleCard } from '../../components/ArticleCard';

export const ArticlesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    api.getCategories().then(res => {
      if (res.success) setCategories(res.categories);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    api.getArticles({
      category: currentCategory,
      search: currentSearch,
      sort: currentSort,
      page: currentPage,
      limit: 9
    }).then(res => {
      if (res.success) {
        setArticles(res.articles);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      }
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [currentCategory, currentSearch, currentSort, currentPage]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    if (key !== 'page') next.set('page', '1');
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam('search', searchInput.trim());
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header & Intro */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-electric dark:text-blue-400">Publication Archive</span>
        <h1 className="font-heading font-extrabold text-4xl text-navy-900 dark:text-white tracking-tight">
          All Technology Articles
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-base">
          Explore research reports, architectural blueprints, and technology analysis curated across all technical domains.
        </p>
      </div>

      {/* Filter and Search Bar Control Header */}
      <div className="bg-cloud dark:bg-[#0D1527] rounded-2xl p-6 border border-borderGray dark:border-slate-800 space-y-5 transition-colors">
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Keyword Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Filter by keyword, title, or stack..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-[#131D2E] border border-borderGray dark:border-slate-700 text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric"
            />
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
          </form>

          {/* Sort Controls */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">Sort By:</span>
            <select
              value={currentSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="text-xs font-medium bg-white dark:bg-[#131D2E] border border-borderGray dark:border-slate-700 rounded-lg px-3 py-2 text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-electric"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Read / Popular</option>
            </select>
          </div>

        </div>

        {/* Category Pills Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-borderGray/60 dark:border-slate-800">
          <button
            onClick={() => updateParam('category', '')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              !currentCategory
                ? 'bg-navy-900 dark:bg-electric text-white'
                : 'bg-white dark:bg-[#131D2E] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-borderGray dark:border-slate-700'
            }`}
          >
            All Topics ({total})
          </button>

          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => updateParam('category', c.slug)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentCategory === c.slug
                  ? 'bg-electric text-white'
                  : 'bg-white dark:bg-[#131D2E] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-borderGray dark:border-slate-700'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Active Filters Summary */}
        {(currentCategory || currentSearch) && (
          <div className="flex items-center justify-between pt-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <span>Active filters:</span>
              {currentCategory && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-electric-light dark:bg-blue-950/80 text-electric dark:text-blue-300 border border-transparent dark:border-blue-800 font-medium">
                  <span>Category: {currentCategory}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateParam('category', '')} />
                </span>
              )}
              {currentSearch && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-electric-light dark:bg-blue-950/80 text-electric dark:text-blue-300 border border-transparent dark:border-blue-800 font-medium">
                  <span>Query: "{currentSearch}"</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => { setSearchInput(''); updateParam('search', ''); }} />
                </span>
              )}
            </div>

            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-electric dark:text-blue-400 hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
        </div>
      ) : articles.length > 0 ? (
        <div className="space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(art => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-3 pt-6 border-t border-borderGray dark:border-slate-800">
              <button
                disabled={currentPage <= 1}
                onClick={() => updateParam('page', currentPage - 1)}
                className="px-4 py-2 rounded-lg border border-borderGray dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-cloud dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 px-3">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => updateParam('page', currentPage + 1)}
                className="px-4 py-2 rounded-lg border border-borderGray dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-cloud dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Empty State */
        <div className="bg-cloud dark:bg-[#0D1527] rounded-3xl p-12 text-center border border-borderGray dark:border-slate-800 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-heading font-bold text-xl text-navy-900 dark:text-white">No Articles Found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            We couldn't find any published technology articles matching your current filter criteria.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2.5 rounded-xl bg-navy-900 dark:bg-electric text-white text-xs font-semibold hover:bg-navy-800 dark:hover:bg-electric-hover transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
