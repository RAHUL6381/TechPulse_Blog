import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';
import { api } from '../../services/api';
import { ArticleCard } from '../../components/ArticleCard';

export const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    Promise.all([
      api.getCategories(),
      api.getArticles({ category: slug, limit: 20 })
    ]).then(([catRes, artRes]) => {
      if (catRes.success) {
        const found = catRes.categories.find(c => c.slug === slug);
        setCategory(found || { name: slug.replace(/-/g, ' '), description: 'Category archive' });
      }
      if (artRes.success) {
        setArticles(artRes.articles);
      }
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Category Spotlight Header */}
      <div className="bg-cloud dark:bg-[#0D1527] rounded-3xl p-8 sm:p-12 border border-borderGray dark:border-slate-800 transition-colors">
        <Link to="/articles" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-electric dark:hover:text-blue-400 mb-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Categories</span>
        </Link>

        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-electric dark:text-blue-400">Technology Pillar</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900 dark:text-white tracking-tight capitalize">
            {category?.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {category?.description || 'Research papers, analysis, and architecture blueprints curated within this pillar.'}
          </p>
          <div className="pt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {articles.length} Published Articles
          </div>
        </div>
      </div>

      {/* Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(art => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-12 text-center border border-borderGray dark:border-slate-800 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-heading font-bold text-xl text-navy-900 dark:text-white">No Articles In This Category Yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Our editorial contributors are currently authoring new publications in this domain. Check back soon.
          </p>
          <Link
            to="/articles"
            className="inline-block px-5 py-2.5 rounded-xl bg-navy-900 dark:bg-electric text-white text-xs font-semibold hover:bg-navy-800 dark:hover:bg-electric-hover transition-colors shadow-sm"
          >
            Browse Other Categories
          </Link>
        </div>
      )}

    </div>
  );
};
