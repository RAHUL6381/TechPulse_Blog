import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ArticleCard = ({ article, compact = false }) => {
  const { isDark } = useTheme();
  if (!article) return null;

  const categoryName = article.categoryDetails?.name || 'Technology';
  const categorySlug = article.categoryDetails?.slug || 'technology';
  const authorName = article.authorDetails?.name || 'TechPulse Staff';
  const authorAvatar = article.authorDetails?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
  const dateFormatted = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  return (
    <article className={`group rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${
      isDark ? 'bg-[#111827] border-slate-800 shadow-slate-950/40' : 'bg-white border-borderGray'
    }`}>
      
      {/* Thumbnail Container */}
      <Link to={`/articles/${article.slug}`} className={`relative block overflow-hidden aspect-[16/9] ${
        isDark ? 'bg-slate-800' : 'bg-cloud'
      }`}>
        <img
          src={article.featuredImage?.url || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"}
          alt={article.featuredImage?.alt || article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm border transition-colors ${
            isDark 
              ? 'bg-slate-900/90 text-slate-100 border-slate-700 group-hover:bg-electric group-hover:text-white' 
              : 'bg-white/95 text-navy-900 border-borderGray/50 group-hover:bg-electric group-hover:text-white'
          }`}>
            {categoryName}
          </span>
        </div>

        {article.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-pulse text-navy-900 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>Spotlight</span>
            </span>
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className={`flex items-center space-x-3 text-xs mb-3 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{dateFormatted}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.estimatedReadingTime || 6} min read</span>
            </span>
          </div>

          {/* Title */}
          <Link to={`/articles/${article.slug}`} className="block">
            <h3 className={`font-heading font-bold text-lg line-clamp-2 leading-snug mb-2.5 transition-colors ${
              isDark ? 'text-white group-hover:text-blue-400' : 'text-navy-900 group-hover:text-electric'
            }`}>
              {article.title}
            </h3>
          </Link>

          {/* Description Excerpt */}
          {!compact && (
            <p className={`text-sm line-clamp-2 leading-relaxed mb-4 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {article.shortDescription}
            </p>
          )}
        </div>

        {/* Footer: Author lockup & Read link */}
        <div className={`pt-4 border-t flex items-center justify-between mt-auto ${
          isDark ? 'border-slate-800' : 'border-borderGray/80'
        }`}>
          <div className="flex items-center space-x-2.5">
            <img
              src={authorAvatar}
              alt={authorName}
              className={`w-7 h-7 rounded-full object-cover ring-2 ${
                isDark ? 'ring-slate-800' : 'ring-cloud'
              }`}
            />
            <span className={`text-xs font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{authorName}</span>
          </div>

          <Link
            to={`/articles/${article.slug}`}
            className={`text-xs font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1 ${
              isDark ? 'text-blue-400' : 'text-electric'
            }`}
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </article>
  );
};
