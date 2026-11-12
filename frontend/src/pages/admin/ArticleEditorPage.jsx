import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Save,
  Eye,
  ArrowLeft,
  Sparkles,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Code,
  Quote,
  Table as TableIcon,
  Image as ImageIcon,
  CheckCircle2,
  Calendar,
  Tag as TagIcon,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const ArticleEditorPage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('draft');
  const [isFeatured, setIsFeatured] = useState(false);
  const [scheduledFor, setScheduledFor] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [featuredImageAlt, setFeaturedImageAlt] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  useEffect(() => {
    Promise.all([api.getCategories(), api.getAuthors()])
      .then(([catRes, authRes]) => {
        if (catRes.success) {
          setCategories(catRes.categories);
          if (!category && catRes.categories.length > 0) {
            setCategory(catRes.categories[0].id);
          }
        }
        if (authRes.success) {
          setAuthors(authRes.authors);
          if (!author && authRes.authors.length > 0) {
            setAuthor(authRes.authors[0].id);
          }
        }
      })
      .catch(console.error);

    if (isEditing) {
      api.getAdminArticleById(id)
        .then(res => {
          if (res.success && res.article) {
            const art = res.article;
            setTitle(art.title || '');
            setSlug(art.slug || '');
            setShortDescription(art.shortDescription || '');
            setContent(art.content || '');
            setCategory(art.category || '');
            setAuthor(art.author || '');
            setStatus(art.status || 'draft');
            setIsFeatured(art.isFeatured || false);
            setScheduledFor(art.scheduledFor ? new Date(art.scheduledFor).toISOString().slice(0, 16) : '');
            setFeaturedImageUrl(art.featuredImage?.url || '');
            setFeaturedImageAlt(art.featuredImage?.alt || '');
            setTags(art.tags || []);
            setSeoTitle(art.seo?.metaTitle || '');
            setSeoDescription(art.seo?.metaDescription || '');
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  // Auto-slugify title if creating new
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isEditing || !slug) {
      const generated = val.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
      setSlug(generated);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = tagsInput.trim().replace(/^#/, '');
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
        setTagsInput('');
      }
    }
  };

  const handleRemoveTag = (t) => {
    setTags(tags.filter(tag => tag !== t));
  };

  const insertSnippet = (snippet) => {
    setContent(prev => `${prev}\n${snippet}\n`);
  };

  const handleSave = async (targetStatus = null) => {
    if (!title.trim() || !content.trim()) {
      alert('Please provide both an Article Title and Content.');
      return;
    }

    setSaving(true);
    const finalStatus = targetStatus || status;

    const payload = {
      title,
      slug,
      shortDescription,
      content,
      category,
      author,
      status: finalStatus,
      isFeatured,
      scheduledFor: finalStatus === 'scheduled' && scheduledFor ? new Date(scheduledFor) : null,
      featuredImage: {
        url: featuredImageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        alt: featuredImageAlt || title
      },
      tags,
      seo: {
        metaTitle: seoTitle || `${title} | TechPulse`,
        metaDescription: seoDescription || shortDescription,
        canonicalUrl: `https://techpulse.io/articles/${slug}`
      }
    };

    try {
      if (isEditing) {
        await api.updateArticle(id, payload);
      } else {
        await api.createArticle(payload);
      }
      navigate('/admin/articles');
    } catch (err) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteArticle = async () => {
    if (!isEditing || !id) return;
    setDeleting(true);
    try {
      await api.deleteArticle(id);
      navigate('/admin/articles');
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const wordCount = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 220));

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-borderGray">
        <div className="flex items-center space-x-3">
          <Link to="/admin/articles" className="p-2 rounded-lg text-slate-500 hover:bg-cloud">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-navy-900 tracking-tight">
              {isEditing ? 'Edit Publication Paper' : 'Author New Publication'}
            </h1>
            <p className="text-xs text-slate-500">
              {isEditing ? `Modifying: ${title}` : 'Drafting new technical report for TechPulse.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="px-3.5 py-2 rounded-xl border border-borderGray text-xs font-semibold text-slate-700 hover:bg-cloud flex items-center space-x-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-3.5 py-2 rounded-xl border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors flex items-center space-x-1.5"
              title="Delete Article"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          )}

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('draft')}
            className="px-4 py-2 rounded-xl border border-borderGray text-xs font-semibold text-slate-700 hover:bg-cloud disabled:opacity-50"
          >
            Save Draft
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave()}
            className="px-5 py-2 rounded-xl bg-electric hover:bg-electric-hover text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : isEditing ? 'Update Article' : 'Publish Article'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Pane Authoring Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Pane: Main Article Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Title */}
          <div className="bg-white rounded-2xl p-6 border border-borderGray shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Article Title Headline
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Zero-Egress Storage Architectures in Hybrid Clouds..."
                className="w-full text-lg sm:text-xl font-heading font-bold text-navy-900 border border-borderGray rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>

            {/* URL Slug */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                URL Slug: <span className="text-[11px] font-mono text-slate-400">/articles/{slug}</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full text-xs font-mono text-slate-700 bg-cloud border border-borderGray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Short Description / Abstract (Lead Excerpt)
              </label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Executive summary of the technical paper..."
                className="w-full text-xs sm:text-sm text-slate-700 border border-borderGray rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>
          </div>

          {/* Markdown Content & Toolbar */}
          <div className="bg-white rounded-2xl p-6 border border-borderGray shadow-sm space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-borderGray">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Article Content (Markdown)</span>
              
              <div className="flex items-center space-x-1 text-slate-500">
                <button
                  type="button"
                  onClick={() => insertSnippet('## Section Title')}
                  className="p-1.5 rounded hover:bg-cloud text-xs font-bold"
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('### Sub-section Title')}
                  className="p-1.5 rounded hover:bg-cloud text-xs font-bold"
                  title="Heading 3"
                >
                  <Heading3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('**Bold Text**')}
                  className="p-1.5 rounded hover:bg-cloud text-xs font-bold"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('*Italic Text*')}
                  className="p-1.5 rounded hover:bg-cloud text-xs font-bold"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('```typescript\n// Code snippet here\nexport const node = true;\n```')}
                  className="p-1.5 rounded hover:bg-cloud text-xs font-bold"
                  title="Code Block"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('> Key architectural insight or quote.')}
                  className="p-1.5 rounded hover:bg-cloud text-xs font-bold"
                  title="Blockquote"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('| Column 1 | Column 2 |\n| :--- | :--- |\n| Data A | Data B |')}
                  className="p-1.5 rounded hover:bg-cloud text-xs font-bold"
                  title="Table"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <textarea
              rows={18}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Author in Markdown: Write ## headings, ```code snippets```, tables, and paragraphs..."
              className="w-full text-xs sm:text-sm font-mono text-slate-800 border border-borderGray rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-electric leading-relaxed"
            />

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-borderGray">
              <span>{wordCount} Words</span>
              <span>~{estimatedReadTime} min estimated reading time</span>
            </div>

          </div>

        </div>

        {/* Right Pane: Publishing Inspector Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status & Publication Controls */}
          <div className="bg-white rounded-2xl p-6 border border-borderGray shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-navy-900 pb-2 border-b border-borderGray">
              Publication Controls
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs font-medium bg-cloud border border-borderGray rounded-xl px-3 py-2 text-navy-900 focus:outline-none focus:ring-2 focus:ring-electric"
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Immediately</option>
                <option value="scheduled">Schedule Publication</option>
              </select>
            </div>

            {status === 'scheduled' && (
              <div className="p-3 rounded-xl bg-electric-light/50 border border-electric/20 space-y-2">
                <label className="block text-xs font-semibold text-electric">Publish Date & Time (UTC)</label>
                <input
                  type="datetime-local"
                  value={scheduledFor}
                  onChange={(e) => setScheduledFor(e.target.value)}
                  className="w-full text-xs bg-white border border-borderGray rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-borderGray text-electric focus:ring-electric"
                />
                <span className="text-xs font-semibold text-slate-700">Spotlight as Featured Story</span>
              </label>
            </div>

          </div>

          {/* Taxonomy & Author Selection */}
          <div className="bg-white rounded-2xl p-6 border border-borderGray shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-navy-900 pb-2 border-b border-borderGray">
              Editorial Taxonomy
            </h3>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs font-medium bg-cloud border border-borderGray rounded-xl px-3 py-2 text-navy-900 focus:outline-none focus:ring-2 focus:ring-electric"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Author</label>
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full text-xs font-medium bg-cloud border border-borderGray rounded-xl px-3 py-2 text-navy-900 focus:outline-none focus:ring-2 focus:ring-electric"
              >
                {authors.map(a => (
                  <option key={a.id} value={a.id}>{a.name} ({a.roleTitle})</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Tags (Press Enter)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tag and press enter..."
                className="w-full text-xs bg-cloud border border-borderGray rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric"
              />
              <div className="flex flex-wrap gap-1.5 pt-2">
                {tags.map((t, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleRemoveTag(t)}
                    className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-700 cursor-pointer transition-colors"
                  >
                    <span>#{t}</span>
                    <span className="text-slate-400 hover:text-red-600 ml-1">×</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-2xl p-6 border border-borderGray shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-navy-900 pb-2 border-b border-borderGray">
              Featured Hero Image
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Image URL</label>
              <input
                type="url"
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs bg-cloud border border-borderGray rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Alt Description</label>
              <input
                type="text"
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                placeholder="Accessibility description..."
                className="w-full text-xs bg-cloud border border-borderGray rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>

            {featuredImageUrl && (
              <div className="rounded-xl overflow-hidden aspect-video bg-cloud border border-borderGray">
                <img src={featuredImageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* SEO Metadata & Google SERP Preview */}
          <div className="bg-white rounded-2xl p-6 border border-borderGray shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-navy-900 pb-2 border-b border-borderGray">
              SEO & Social Metadata
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">SEO Title Tag</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={title ? `${title} | TechPulse` : 'SEO Meta Title'}
                className="w-full text-xs bg-cloud border border-borderGray rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600">Meta Description</label>
                <span className={`text-[10px] ${seoDescription.length > 160 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                  {seoDescription.length}/160
                </span>
              </div>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Search engine snippet summary..."
                className="w-full text-xs bg-cloud border border-borderGray rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>

            {/* Google SERP Live Snippet Preview */}
            <div className="p-3.5 rounded-xl bg-cloud border border-borderGray text-left space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Google SERP Preview</span>
              <div className="text-xs text-[#1a0dab] font-medium truncate">
                {seoTitle || title || 'TechPulse Article Title'}
              </div>
              <div className="text-[11px] text-[#006621] truncate">
                https://techpulse.io/articles/{slug || 'article-slug'}
              </div>
              <div className="text-[11px] text-[#545454] line-clamp-2">
                {seoDescription || shortDescription || 'Article meta description snippet as it will display on Google Search results.'}
              </div>
            </div>

          </div>

          {/* Danger Zone: Permanent Article Deletion (Available when editing) */}
          {isEditing && (
            <div className="bg-white rounded-2xl p-6 border border-rose-200/90 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Danger Zone</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Permanently remove this publication and its revision history from the TechPulse repository and public catalog.
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100/80 text-rose-700 text-xs font-bold transition-colors flex items-center justify-center space-x-2 shadow-xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Article</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Live Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-8">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 border border-borderGray shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-borderGray">
              <span className="text-xs font-bold text-electric uppercase tracking-wider">Article Draft Live Preview</span>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="text-xs font-bold text-slate-500 hover:text-navy-900 px-3 py-1 bg-cloud rounded-lg"
              >
                Close Preview
              </button>
            </div>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-electric-light text-electric">
                {categories.find(c => c.id === category)?.name || 'Technology'}
              </span>
              <h1 className="font-heading font-extrabold text-3xl text-navy-900">{title || 'Untitled Article'}</h1>
              <p className="text-base text-slate-600 italic">{shortDescription}</p>

              {featuredImageUrl && (
                <div className="rounded-2xl overflow-hidden aspect-video bg-cloud">
                  <img src={featuredImageUrl} alt={featuredImageAlt} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="prose max-w-none text-xs sm:text-sm font-mono bg-cloud p-4 rounded-xl overflow-x-auto whitespace-pre-wrap">
                {content}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-borderGray shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-heading font-extrabold text-xl text-navy-900">
                Permanently Delete Article?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to delete <strong className="text-navy-900">"{title || 'this article'}"</strong>? All associated metadata and live public indexing will be permanently removed.
              </p>
            </div>

            {!isAdmin && status === 'published' && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-start space-x-2 text-left">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Note:</strong> Live published articles require Tier-1 Administrator clearance to permanently purge. You can set the status to <em>Draft</em> or request an Administrator to delete it.
                </span>
              </div>
            )}

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-borderGray text-xs font-semibold text-slate-700 hover:bg-cloud transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteArticle}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
              >
                {deleting ? (
                  <span>Deleting...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
