import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  FileEdit,
  Clock,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Crown,
  ShieldCheck,
  Edit3,
  Users
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const DashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardStats()
      .then(res => {
        if (res.success) setStats(res.stats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const kpis = [
    {
      label: 'Total Articles',
      value: stats?.totalArticles || 0,
      icon: FileText,
      color: 'bg-navy-900 text-white',
      badge: 'All in Repository'
    },
    {
      label: 'Published Articles',
      value: stats?.publishedArticles || 0,
      icon: CheckCircle2,
      color: 'bg-emerald-600 text-white',
      badge: 'Live Online'
    },
    {
      label: 'Draft Articles',
      value: stats?.draftArticles || 0,
      icon: FileEdit,
      color: 'bg-amber-600 text-white',
      badge: 'In Progress'
    },
    {
      label: 'Scheduled Posts',
      value: stats?.scheduledArticles || 0,
      icon: Clock,
      color: 'bg-electric text-white',
      badge: 'Automated Queue'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome & Role Elevation Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderGray shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider">
            {isAdmin ? (
              <span className="flex items-center space-x-1 text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                <Crown className="w-3.5 h-3.5" />
                <span>Tier 1: System Administrator</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1 text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Tier 2: Editorial Publisher</span>
              </span>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900 tracking-tight">
            {isAdmin ? 'System Administrator Command Center' : 'Editorial Publications Desk'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            {isAdmin
              ? 'Complete operational oversight. Manage user access permissions, configure SEO infrastructure, oversee taxonomy, and moderate editorial queues.'
              : 'Content creation workspace. Author articles, organize media assets, manage draft pipelines, and schedule future publications.'}
          </p>
        </div>

        <div className="flex items-center space-x-3 whitespace-nowrap">
          {isAdmin && (
            <Link
              to="/admin/users"
              className="px-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold transition-all flex items-center space-x-2"
            >
              <Users className="w-4 h-4 text-purple-600" />
              <span>Manage Team Roles</span>
            </Link>
          )}

          <Link
            to="/admin/articles/create"
            className="px-4 py-2.5 rounded-xl bg-electric hover:bg-electric-hover text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Author New Article</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-borderGray shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{kpi.label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="font-heading font-extrabold text-3xl text-navy-900">{kpi.value}</span>
              </div>

              <div className="text-[11px] font-medium text-slate-400">
                {kpi.badge}
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-Column Activity & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Publishing Pipeline */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-borderGray shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-borderGray">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-electric" />
              <h2 className="font-heading font-bold text-base text-navy-900">
                Recent Publishing Pipeline
              </h2>
            </div>
            <Link
              to="/admin/articles"
              className="text-xs font-semibold text-electric hover:underline flex items-center space-x-1"
            >
              <span>View Repository</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-borderGray">
            {stats?.recentActivity?.length > 0 ? (
              stats.recentActivity.map((item) => (
                <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-xs text-navy-900 block truncate max-w-sm sm:max-w-md">
                      {item.title}
                    </span>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                      <span>By {item.author}</span>
                      <span>•</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                    item.status === 'published'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : item.status === 'scheduled'
                      ? 'bg-electric-light text-electric border border-electric/20'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                No recent editorial modifications logged.
              </div>
            )}
          </div>
        </div>

        {/* Governance & Architecture Quick Access */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderGray shadow-sm space-y-6">
          <div className="flex items-center space-x-2 pb-4 border-b border-borderGray">
            <Layers className="w-4 h-4 text-purple-600" />
            <h2 className="font-heading font-bold text-base text-navy-900">
              Authority Operations
            </h2>
          </div>

          <div className="space-y-3">
            <Link
              to="/admin/articles/create"
              className="p-3.5 rounded-2xl bg-cloud hover:bg-slate-100 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-electric-light text-electric flex items-center justify-center">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-navy-900 block">Author Article</span>
                  <span className="text-[11px] text-slate-400">Create Markdown story</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/admin/categories"
              className="p-3.5 rounded-2xl bg-cloud hover:bg-slate-100 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-navy-900 block">Manage Categories</span>
                  <span className="text-[11px] text-slate-400">Core pillars & taxonomy</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-0.5 transition-all" />
            </Link>

            {isAdmin && (
              <Link
                to="/admin/users"
                className="p-3.5 rounded-2xl bg-purple-50/70 hover:bg-purple-100/70 border border-purple-200/60 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-200/80 text-purple-800 flex items-center justify-center">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-purple-900 block">Access Governance</span>
                    <span className="text-[11px] text-purple-600">Elevate/demote team roles</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-500 group-hover:text-purple-900 group-hover:translate-x-0.5 transition-all" />
              </Link>
            )}

            <Link
              to="/admin/settings"
              className="p-3.5 rounded-2xl bg-cloud hover:bg-slate-100 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-navy-900 block">SEO & Site Settings</span>
                  <span className="text-[11px] text-slate-400">{isAdmin ? 'Full edit access' : 'Read-only view'}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
