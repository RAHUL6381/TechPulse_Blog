import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, FolderTree, AlertCircle, Lock, Crown, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const CategoryManagerPage = () => {
  const { isAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [error, setError] = useState('');

  const fetchCategories = () => {
    setLoading(true);
    api.getCategories()
      .then(res => {
        if (res.success) setCategories(res.categories);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setDescription('');
    setDisplayOrder(categories.length + 1);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setDisplayOrder(cat.displayOrder || 1);
    setError('');
    setIsModalOpen(true);
  };

  const handleNameChange = (val) => {
    setName(val);
    if (!editingId) {
      setSlug(val.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = { name, slug, description, displayOrder: Number(displayOrder) };

    try {
      if (editingId) {
        await api.updateCategory(editingId, payload);
      } else {
        await api.createCategory(payload);
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      setError(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id, count) => {
    if (!isAdmin) {
      alert('Access Denied: Only Tier-1 System Administrators have permission to delete taxonomy categories.');
      return;
    }
    if (count > 0) {
      alert(`Cannot delete category with ${count} active published articles. Please reassign articles first.`);
      return;
    }
    if (window.confirm('Are you sure you want to permanently delete this technology category?')) {
      try {
        await api.deleteCategory(id);
        fetchCategories();
      } catch (err) {
        alert(err.message || 'Failed to delete category');
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold mb-1">
            <FolderTree className="w-3.5 h-3.5" />
            <span>Taxonomy Management</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900 tracking-tight">
            Editorial Categories Architecture
          </h1>
          <p className="text-xs text-slate-500">
            Configure the core technology pillars and manage dynamic topics across the publication.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {!isAdmin && (
            <span className="inline-flex items-center space-x-1 text-xs text-slate-500 bg-cloud px-3 py-1.5 rounded-xl border border-borderGray">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Deletion Restricted to Admin</span>
            </span>
          )}

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-borderGray shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cloud text-slate-500 font-bold uppercase tracking-wider border-b border-borderGray">
                <tr>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Category Name</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Articles</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderGray">
                {categories.map((cat, i) => (
                  <tr key={cat.id} className="hover:bg-cloud/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-400">#{cat.displayOrder || i + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-navy-900">{cat.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{cat.slug}</td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">{cat.description}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-cloud border border-borderGray text-slate-700">
                        {cat.articlesCount || 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          title="Edit Category"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-electric hover:bg-cloud transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {isAdmin ? (
                          <button
                            onClick={() => handleDelete(cat.id, cat.articlesCount)}
                            title="Delete Category (Admin Authority)"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            disabled
                            title="Category deletion is restricted to Administrators"
                            className="p-1.5 rounded-lg text-slate-300 cursor-not-allowed"
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
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-borderGray shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-borderGray">
              <h3 className="font-heading font-bold text-lg text-navy-900">
                {editingId ? 'Edit Technology Category' : 'Create Technology Pillar'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-navy-900 font-bold"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pillar Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Distributed Computing"
                  className="w-full bg-cloud border border-borderGray rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="distributed-computing"
                  className="w-full bg-cloud border border-borderGray rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Editorial Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly state the scope of this editorial vertical..."
                  className="w-full bg-cloud border border-borderGray rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Display Priority Order</label>
                <input
                  type="number"
                  min="1"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                  className="w-full bg-cloud border border-borderGray rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-borderGray">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-borderGray text-slate-600 hover:bg-cloud"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-electric hover:bg-electric-hover text-white font-semibold shadow-sm"
                >
                  {editingId ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
