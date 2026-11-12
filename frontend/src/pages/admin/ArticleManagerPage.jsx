import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  FileEdit,
  AlertTriangle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Lock,
  Crown,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const ArticleManagerPage = () => {
  const { isAdmin } = useAuth();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchArticles = () => {
    setLoading(true);
    api.getAdminArticles({
      search,
      category: selectedCategory,
      status: selectedStatus,
      page,
      limit: 10
    }).then(res => {
      if (res.success) {
        setArticles(res.articles);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      }
    }).catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    api.getCategories().then(res => {
      if (res.success) setCategories(res.categories);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [search, selectedCategory, selectedStatus, page]);

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert('Access Denied: Only Tier-1 System Administrators are authorized to permanently purge articles.');
      return;
    }
    try {
      await api.deleteArticle(id);
      setDeleteConfirmId(null);
      fetchArticles();
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const handleToggleStatus = async (article) => {
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    try {
      await api.updateArticle(article.id, { status: newStatus });
      fetchArticles();
    } catch (err) {
      alert(`Status update error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900 tracking-tight">
            Article Content Repository
          </h1>
          <p className="text-xs text-slate-500">
            Create, edit, publish, schedule, or retire corporate publications.
          </p>
        </div>

        <Link
          to="/admin/articles/create"
          className="px-4 py-2.5 rounded-xl bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors flex items-center space-x-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-borderGray shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Keyword Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by title or content..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-cloud border border-borderGray rounded-xl focus:outline-none focus:ring-2 focus:ring-electric"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
              className="w-full px-3 py-2 text-xs bg-cloud border border-borderGray rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-electric"
            >
              <option value="">All 7 Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setPage(1); }}
              className="w-full px-3 py-2 text-xs bg-cloud border border-borderGray rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-electric"
            >
              <option value="all">All Statuses ({total})</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="scheduled">Scheduled Queue</option>
            </select>
          </div>

        </div>

      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-borderGray shadow-sm overflow-hidden">
        
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
          </div>
        ) : articles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cloud text-slate-500 font-bold uppercase tracking-wider border-b border-borderGray">
                <tr>
                  <th className="py-3 px-4">Article</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Author</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderGray">
                {articles.map(art => (
                  <tr key={art.id} className="hover:bg-cloud/40 transition-colors">
                    
                    {/* Thumbnail + Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={art.featuredImage?.url}
                          alt=""
                          className="w-12 h-9 rounded-lg object-cover bg-cloud border border-borderGray flex-shrink-0"
                        />
                        <div className="max-w-xs">
                          <span className="font-semibold text-navy-900 block truncate" title={art.title}>
                            {art.title}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            /{art.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                      {art.categoryDetails?.name}
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      {art.authorDetails?.name}
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        art.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : art.status === 'scheduled'
                          ? 'bg-electric-light text-electric border border-electric/20'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {art.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                      {art.publishedAt
                        ? new Date(art.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : art.scheduledFor
                        ? `Sched: ${new Date(art.scheduledFor).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                        : 'Unpublished'}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        
                        {/* View Live */}
                        {art.status === 'published' && (
                          <a
                            href={`/articles/${art.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-electric hover:bg-cloud"
                            title="View Live Article"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {/* Edit */}
                        <Link
                          to={`/admin/articles/edit/${art.id}`}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-electric hover:bg-cloud"
                          title="Edit Article"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        {/* Toggle Publish / Draft */}
                        <button
                          onClick={() => handleToggleStatus(art)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-navy-900 hover:bg-cloud"
                          title={art.status === 'published' ? 'Unpublish to Draft' : 'Publish Immediately'}
                        >
                          <CheckCircle className={`w-3.5 h-3.5 ${art.status === 'published' ? 'text-emerald-600' : 'text-slate-400'}`} />
                        </button>

                        {/* Delete */}
                        {isAdmin ? (
                          <button
                            onClick={() => setDeleteConfirmId(art.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                            title="Delete Article (Admin Authority)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            disabled
                            className="p-1.5 rounded-lg text-slate-300 cursor-not-allowed"
                            title="Article deletion is restricted to Administrators"
                          >
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 text-xs">
            No articles match the current filter parameters.
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-borderGray flex items-center justify-between text-xs text-slate-600">
            <span>Showing page {page} of {totalPages}</span>
            <div className="flex items-center space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="p-1.5 rounded-lg border border-borderGray disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="p-1.5 rounded-lg border border-borderGray disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-borderGray">
            <div className="flex items-center space-x-2 text-red-600 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Permanent Deletion</span>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to permanently delete this article? This action cannot be reversed.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-cloud"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
