import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, Eye, ArrowLeft, ArrowRight, Tag, ChevronRight, User } from 'lucide-react';
import { api } from '../../services/api';
import { ReadingProgressBar } from '../../components/ReadingProgressBar';
import { TableOfContents } from '../../components/TableOfContents';
import { SocialShare } from '../../components/SocialShare';
import { ArticleCard } from '../../components/ArticleCard';

export const ArticleDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    api.getArticleBySlug(slug)
      .then(res => {
        if (res.success) {
          setArticle(res.article);
          return api.getRelatedArticles(slug);
        } else {
          throw new Error('Article not found');
        }
      })
      .then(relRes => {
        if (relRes && relRes.success) {
          setRelated(relRes.related);
        }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-electric border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading publication paper...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-heading font-bold text-3xl text-navy-900 dark:text-white">Article Not Found</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">The technical paper you are seeking may have been retired, scheduled, or moved.</p>
        <Link to="/articles" className="inline-flex items-center space-x-2 text-sm font-semibold text-electric dark:text-blue-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Articles Archive</span>
        </Link>
      </div>
    );
  }

  const categoryName = article.categoryDetails?.name || 'Technology';
  const categorySlug = article.categoryDetails?.slug || 'technology';
  const author = article.authorDetails || {};
  const dateFormatted = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Recently Published';

  // Basic HTML generator for markdown content
  const renderFormattedContent = (content) => {
    if (!content) return null;
    const lines = content.split('\n');
    const elements = [];
    let inCode = false;
    let codeBuffer = [];
    let codeLang = '';

    lines.forEach((line, idx) => {
      // Code Block Start / End
      if (line.trim().startsWith('```')) {
        if (!inCode) {
          inCode = true;
          codeLang = line.replace('```', '').trim();
          codeBuffer = [];
        } else {
          inCode = false;
          elements.push(
            <div key={`code-${idx}`} className="relative group my-6">
              {codeLang && (
                <div className="absolute top-2.5 right-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-navy-800 px-2 py-0.5 rounded">
                  {codeLang}
                </div>
              )}
              <pre className="p-4 rounded-xl bg-navy-900 dark:bg-[#0A0F1D] text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto border border-navy-800 dark:border-slate-800">
                <code>{codeBuffer.join('\n')}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (inCode) {
        codeBuffer.push(line);
        return;
      }

      // H2
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        elements.push(
          <h2 key={idx} id={id} className="scroll-mt-28 font-heading font-bold text-2xl sm:text-3xl text-navy-900 dark:text-white mt-10 mb-4 pb-2 border-b border-borderGray dark:border-slate-800">
            {text}
          </h2>
        );
        return;
      }

      // H3
      if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        elements.push(
          <h3 key={idx} id={id} className="scroll-mt-28 font-heading font-bold text-xl text-navy-900 dark:text-white mt-8 mb-3">
            {text}
          </h3>
        );
        return;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={idx} className="border-l-4 border-electric dark:border-blue-500 bg-cloud dark:bg-[#131D2E] p-4 rounded-r-xl my-6 text-slate-700 dark:text-slate-200 italic text-base leading-relaxed">
            {line.replace('> ', '')}
          </blockquote>
        );
        return;
      }

      // Horizontal Rule
      if (line.trim() === '---') {
        elements.push(<hr key={idx} className="my-8 border-borderGray dark:border-slate-800" />);
        return;
      }

      // Empty Lines
      if (!line.trim()) {
        return;
      }

      // Paragraph
      elements.push(
        <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg mb-5">
          {line}
        </p>
      );
    });

    return elements;
  };

  return (
    <article className="pb-20">
      
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Header Container */}
      <div className="bg-gradient-to-b from-cloud/70 to-white dark:from-[#0B0F19] dark:to-[#0B0F19] pt-10 pb-12 border-b border-borderGray dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium overflow-x-auto">
            <Link to="/" className="hover:text-electric dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to={`/categories/${categorySlug}`} className="hover:text-electric dark:hover:text-blue-400 transition-colors">{categoryName}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Category Pill Badge */}
          <div>
            <Link
              to={`/categories/${categorySlug}`}
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-electric-light dark:bg-blue-950/70 text-electric dark:text-blue-300 hover:bg-electric hover:text-white transition-colors border border-electric/20 dark:border-blue-800"
            >
              {categoryName}
            </Link>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-navy-900 dark:text-white tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          {/* Short Excerpt Lead */}
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {article.shortDescription}
          </p>

          {/* Author & Publication Metadata */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-borderGray/80 dark:border-slate-800">
            
            <div className="flex items-center space-x-3">
              <img
                src={author.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={author.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm"
              />
              <div>
                <h4 className="font-heading font-bold text-sm text-navy-900 dark:text-white">{author.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{author.roleTitle || 'Technology Contributor'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>{dateFormatted}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>{article.estimatedReadingTime} min read</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Eye className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>{(article.viewsCount || 0).toLocaleString()} views</span>
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Featured Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-borderGray dark:border-slate-800 bg-cloud dark:bg-slate-800 aspect-[21/9]">
          <img
            src={article.featuredImage?.url}
            alt={article.featuredImage?.alt || article.title}
            className="w-full h-full object-cover"
          />
        </div>
        {article.featuredImage?.caption && (
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3 italic">
            {article.featuredImage.caption}
          </p>
        )}
      </div>

      {/* Two Column Layout: Main Prose + Sticky Rail */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Body */}
          <div className="lg:col-span-8">
            
            <div className="article-prose prose prose-lg max-w-none text-slate-700 dark:text-slate-300">
              {renderFormattedContent(article.content)}
            </div>

            {/* Tags Section */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-borderGray dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-3">Topic Tags</span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium bg-cloud dark:bg-[#131D2E] text-slate-700 dark:text-slate-300 border border-borderGray dark:border-slate-800">
                      <Tag className="w-3 h-3 text-slate-400" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Box */}
            <div className="mt-10 p-6 rounded-2xl bg-cloud dark:bg-[#131D2E] border border-borderGray dark:border-slate-800 flex items-start space-x-4">
              <img
                src={author.avatarUrl}
                alt={author.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm flex-shrink-0"
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-base text-navy-900 dark:text-white">{author.name}</h4>
                  <span className="text-xs text-electric dark:text-blue-400 font-semibold">{author.roleTitle}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {author.bio}
                </p>
              </div>
            </div>

            {/* Contextual Prev / Next Article Navigation */}
            <div className="mt-12 pt-8 border-t border-borderGray dark:border-slate-800 flex items-center justify-between">
              <Link
                to="/articles"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-electric dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Publications Archive</span>
              </Link>
            </div>

          </div>

          {/* Right Rail: Sticky TOC & Social Sharing (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="sticky top-28 space-y-6">
              
              {/* Social Share Floating Pill */}
              <div className="bg-white dark:bg-[#111827] rounded-2xl border border-borderGray dark:border-slate-800 p-4 shadow-sm transition-colors">
                <SocialShare title={article.title} url={window.location.href} />
              </div>

              {/* Table of Contents */}
              <TableOfContents content={article.content} />

              {/* Editorial Disclosure */}
              <div className="p-4 rounded-xl bg-cloud dark:bg-[#162032] text-[11px] text-slate-500 dark:text-slate-400 border border-borderGray/70 dark:border-slate-800 transition-colors">
                <p className="font-semibold text-navy-900 dark:text-white mb-1">TechPulse Peer Review</p>
                <p>This technical report was reviewed for architectural accuracy and verified against current production runtimes.</p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Related Stories */}
      {related && related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-borderGray dark:border-slate-800">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-electric dark:text-blue-400">Contextual Recommendations</span>
            <h2 className="font-heading font-bold text-2xl text-navy-900 dark:text-white mt-1">Related Technology Papers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map(art => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}

    </article>
  );
};
