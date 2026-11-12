import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, Users, AlertCircle, Mail, Lock, Crown, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const AuthorManagerPage = () => {
  const { isAdmin } = useAuth();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');

  const fetchAuthors = () => {
    setLoading(true);
    api.getAuthors()
      .then(res => {
        if (res.success) setAuthors(res.authors);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setName('');
    setEmail('');
    setRoleTitle('Technology Specialist');
    setBio('');
    setAvatarUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (author) => {
    setEditingId(author.id);
    setName(author.name);
    setEmail(author.email);
    setRoleTitle(author.roleTitle || 'Technology Specialist');
    setBio(author.bio || '');
    setAvatarUrl(author.avatarUrl || '');
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = { name, email, roleTitle, bio, avatarUrl };

    try {
      if (editingId) {
        await api.updateAuthor(editingId, payload);
      } else {
        await api.createAuthor(payload);
      }
      setIsModalOpen(false);
      fetchAuthors();
    } catch (err) {
      setError(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id, count) => {
    if (!isAdmin) {
      alert('Access Denied: Only Tier-1 System Administrators have clearance to delete author profiles.');
      return;
    }
    if (count > 0) {
      alert(`Cannot delete author with ${count} active published articles.`);
      return;
    }
    if (window.confirm('Delete this author profile permanently?')) {
      try {
        await api.deleteAuthor(id);
        fetchAuthors();
      } catch (err) {
        alert(err.message || 'Failed to delete author');
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Editorial Staff Directory</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900 tracking-tight">
            Editorial Contributors & Fellows
          </h1>
          <p className="text-xs text-slate-500">
            Manage public author profiles, academic credentials, corporate bios, and article attributions.
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
            <span>Add New Author</span>
          </button>
        </div>
      </div>

      {/* Authors Grid */}
      {loading ? (
        <div className="py-16 flex justify-center">
          <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div
              key={author.id}
              className="bg-white rounded-3xl p-6 border border-borderGray shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={author.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={author.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-borderGray shadow-xs"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-base text-navy-900">{author.name}</h3>
                    <span className="text-xs font-medium text-electric block">{author.roleTitle}</span>
                    <span className="text-[11px] text-slate-400 font-mono block">{author.email}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {author.bio || 'Contributing technology author at TechPulse Observatory.'}
                </p>
              </div>

              <div className="pt-4 border-t border-borderGray flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-full font-semibold bg-cloud border border-borderGray text-slate-700">
                  {author.articlesCount || 0} Articles
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(author)}
                    title="Edit Profile"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-electric hover:bg-cloud transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {isAdmin ? (
                    <button
                      onClick={() => handleDelete(author.id, author.articlesCount)}
                      title="Delete Author (Admin Authority)"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      disabled
                      title="Author deletion is restricted to Administrators"
                      className="p-1.5 rounded-lg text-slate-300 cursor-not-allowed"
                    >
                      <Lock className="w-4 h-4 text-slate-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-borderGray shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-borderGray">
              <h3 className="font-heading font-bold text-lg text-navy-900">
                {editingId ? 'Edit Author Profile' : 'Register Editorial Contributor'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Jane Carter"
                    className="w-full bg-cloud border border-borderGray rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-electric"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane.carter@techpulse.io"
                    className="w-full bg-cloud border border-borderGray rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-electric"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Editorial Role / Title *</label>
                <input
                  type="text"
                  required
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g. Principal Cloud Security Fellow"
                  className="w-full bg-cloud border border-borderGray rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-cloud border border-borderGray rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Executive Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Professional background, research focus, and accolades..."
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
                  {editingId ? 'Save Changes' : 'Create Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
