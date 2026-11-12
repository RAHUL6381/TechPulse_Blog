import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Crown,
  Edit3,
  Users,
  Search,
  CheckCircle,
  AlertTriangle,
  Lock,
  ArrowUpRight,
  UserPlus,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const UsersManagerPage = () => {
  const { user: currentUser, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = () => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    setLoading(true);
    api.getUsers()
      .then(res => {
        if (res.success) {
          setUsers(res.users);
        }
      })
      .catch(err => {
        setFeedback({ type: 'error', text: err.message });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, [isAdmin]);

  const handleRoleChange = async (userId, targetRole) => {
    setUpdatingId(userId);
    setFeedback(null);
    try {
      const res = await api.updateUserRole(userId, targetRole);
      setFeedback({ type: 'success', text: res.message || `Role updated to ${targetRole}.` });
      fetchUsers();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to update user role.' });
    } finally {
      setUpdatingId(null);
    }
  };

  // If user is not Admin, display professional clearance restriction
  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-borderGray shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
              Clearance Boundary (Tier 1 Enforced)
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900 tracking-tight">
              Administrative Privilege Required
            </h1>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              You are currently authenticated as an <strong>Editorial Publisher</strong>. Role-based access control grants user governance, role elevation, and system privilege modification exclusively to <strong>Administrators</strong>.
            </p>
          </div>

          <div className="p-4 bg-cloud rounded-2xl border border-borderGray text-xs text-slate-600 max-w-md mx-auto text-left space-y-2">
            <div className="font-semibold text-navy-900 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Publisher Scope Restrictions:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1">
              <li>Cannot promote or modify team accounts</li>
              <li>Cannot delete taxonomy nodes (Categories, Authors)</li>
              <li>Cannot modify core SEO & Analytics settings</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u =>
    (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(search.toLowerCase())) ||
    (u.role && u.role.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold">
            <Crown className="w-3.5 h-3.5" />
            <span>Highest Privilege Tier • Root Governance</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900 tracking-tight">
            Team & Access Control Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage administrative privileges, assign editorial publishing roles, and inspect platform permissions.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="px-4 py-2 rounded-xl bg-white border border-borderGray text-slate-700 hover:bg-cloud text-xs font-semibold shadow-sm transition-colors flex items-center space-x-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Roster</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className={`p-4 rounded-2xl text-xs flex items-center justify-between border ${
          feedback.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          <div className="flex items-center space-x-2">
            {feedback.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span className="font-semibold">{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-500 hover:text-slate-800 font-bold ml-4">✕</button>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-borderGray shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team member by name, work email, or current role..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-cloud border border-borderGray rounded-xl focus:outline-none focus:ring-2 focus:ring-electric"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="text-xs font-medium text-slate-500 hidden sm:block">
          Total Users: <strong className="text-navy-900">{users.length}</strong>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-white rounded-2xl border border-borderGray shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cloud border-b border-borderGray text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">User / Identity</th>
                <th className="py-3.5 px-6">Current Privilege Level</th>
                <th className="py-3.5 px-6">Access Authority</th>
                <th className="py-3.5 px-6">Registered</th>
                <th className="py-3.5 px-6 text-right">Promote / Elevate Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderGray">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    <div className="w-6 h-6 border-2 border-electric border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading user identities...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-400">
                    No users found matching query.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isCurrent = u.id === currentUser?.id;
                  const isRootAdmin = u.email === 'admin@techpulse.io';

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            u.role === 'superadmin'
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : u.role === 'admin'
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : u.role === 'publisher'
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {u.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-bold text-navy-900">{u.name}</span>
                              {isCurrent && (
                                <span className="text-[10px] bg-electric/10 text-electric font-bold px-1.5 py-0.5 rounded-md">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-slate-500 text-[11px] font-mono">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        {u.role === 'superadmin' ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                            <Crown className="w-3 h-3 text-purple-600" />
                            <span>Superadmin (Root)</span>
                          </span>
                        ) : u.role === 'admin' ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                            <ShieldCheck className="w-3 h-3 text-indigo-600" />
                            <span>Administrator (Tier 1)</span>
                          </span>
                        ) : u.role === 'publisher' || u.role === 'editor' ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            <Edit3 className="w-3 h-3 text-blue-600" />
                            <span>Publisher (Tier 2)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            <span>Reader (Public)</span>
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <span className="text-[11px] text-slate-600">
                          {u.role === 'superadmin' || u.role === 'admin'
                            ? 'Full Root Access: Users, Settings, Articles, Taxonomy'
                            : u.role === 'publisher' || u.role === 'editor'
                            ? 'Editorial: Authoring, Drafting, Scheduling, Media'
                            : 'Read-only: Commenting & Bookmarking'}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'System Seed'}
                      </td>

                      <td className="py-4 px-6 text-right">
                        {isRootAdmin ? (
                          <span className="text-[11px] font-semibold text-slate-400 italic">
                            Protected System Account
                          </span>
                        ) : (
                          <select
                            disabled={updatingId === u.id}
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="bg-cloud border border-borderGray rounded-lg px-2.5 py-1 text-xs font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-electric cursor-pointer hover:bg-slate-100 transition-colors"
                          >
                            <option value="admin">👑 Administrator (Tier 1)</option>
                            <option value="publisher">✍️ Publisher (Tier 2)</option>
                            <option value="reader">👤 Reader (Public Tier)</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Privilege Hierarchy Matrix Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderGray shadow-sm space-y-6">
        <div>
          <h2 className="font-heading font-extrabold text-lg text-navy-900 tracking-tight">
            Enterprise Privilege Tier Matrix
          </h2>
          <p className="text-xs text-slate-500">
            Formal architectural authority separation between System Administrators and Editorial Publishers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* Admin Tier Box */}
          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-3">
            <div className="flex items-center space-x-2 text-purple-900 font-bold">
              <Crown className="w-4 h-4 text-purple-600" />
              <span className="text-sm">Tier 1: System Administrator (Highest Authority)</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Holds complete operational authority over the entire platform, its underlying security protocols, taxonomy, and user identities.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center space-x-2 text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Manage Users & Assign System Roles</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Configure Site Metadata, SEO & Analytics Keys</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Delete Categories and Taxonomy Nodes</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Delete Authors and Unpublish Any Content</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Full Article Creation & Direct Publishing</span>
              </div>
            </div>
          </div>

          {/* Publisher Tier Box */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
            <div className="flex items-center space-x-2 text-blue-900 font-bold">
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Tier 2: Editorial Publisher (Content Management)</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Focused entirely on content creation, draft iteration, article scheduling, and media management without risky access to platform settings.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center space-x-2 text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Author, Edit & Format Technical Articles</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Queue Automated Future Publications</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Upload Media Assets to Image Library</span>
              </div>
              <div className="flex items-center space-x-2 text-rose-600">
                <Lock className="w-3.5 h-3.5" />
                <span>Restricted from Platform & SEO Settings</span>
              </div>
              <div className="flex items-center space-x-2 text-rose-600">
                <Lock className="w-3.5 h-3.5" />
                <span>Restricted from User Management & Category Deletion</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

