import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import { api } from '../../services/api';
import { ArticleCard } from '../../components/ArticleCard';

export const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchInput(query);
    if (query.trim()) {
      setLoading(true);
      api.getArticles({ search: query, limit: 30 })
        .then(res => {
          if (res.success) setArticles(res.articles);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setArticles([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-electric dark:text-blue-400">Search Engine</span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900 dark:text-white tracking-tight">
          Explore Technical Knowledge
        </h1>
        
        <form onSubmit={handleSubmit} className="relative pt-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by technology, stack, keywords, or author..."
            className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base bg-white dark:bg-[#131D2E] border border-borderGray dark:border-slate-700 text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-electric"
          />
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-4 top-5.5" />
          <button
            type="submit"
            className="absolute right-2 top-3.5 px-5 py-2 bg-navy-900 hover:bg-electric dark:bg-electric dark:hover:bg-electric-hover text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            Search
          </button>
        </form>

        {query && (
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
            Showing results for <span className="font-bold text-navy-900 dark:text-white">"{query}"</span> — {articles.length} article(s) found
          </p>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(art => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      ) : query ? (
        <div className="bg-cloud dark:bg-[#0D1527] rounded-3xl p-12 text-center border border-borderGray dark:border-slate-800 space-y-4 max-w-xl mx-auto">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-heading font-bold text-xl text-navy-900 dark:text-white">No Matching Papers</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            We couldn't find any articles matching "{query}". Try searching for broader terms like "cloud", "security", or "AI".
          </p>
          <Link
            to="/articles"
            className="inline-block px-5 py-2.5 rounded-xl bg-navy-900 dark:bg-electric text-white text-xs font-semibold hover:bg-navy-800 dark:hover:bg-electric-hover transition-colors shadow-sm"
          >
            View All Published Articles
          </Link>
        </div>
      ) : null}

    </div>
  );
};
