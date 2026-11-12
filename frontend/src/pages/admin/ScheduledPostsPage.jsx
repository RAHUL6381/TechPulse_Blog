import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, CheckCircle, Edit, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';

export const ScheduledPostsPage = () => {
  const [scheduledArticles, setScheduledArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScheduled = () => {
    setLoading(true);
    api.getAdminArticles({ status: 'scheduled', limit: 50 })
      .then(res => {
        if (res.success) setScheduledArticles(res.articles);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchScheduled();
  }, []);

  const handlePublishNow = async (id) => {
    if (window.confirm('Publish this scheduled article immediately?')) {
      await api.updateArticle(id, { status: 'published' });
      fetchScheduled();
    }
  };

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900 tracking-tight">
          Automated Publication Queue
        </h1>
        <p className="text-xs text-slate-500">
          Articles scheduled for future automated publication via the background cron daemon.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-borderGray shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
          </div>
        ) : scheduledArticles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cloud text-slate-500 font-bold uppercase tracking-wider border-b border-borderGray">
                <tr>
                  <th className="py-3 px-4">Article</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Scheduled Release Time</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderGray">
                {scheduledArticles.map(art => (
                  <tr key={art.id} className="hover:bg-cloud/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-navy-900 block truncate max-w-sm">
                        {art.title}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{art.categoryDetails?.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{art.authorDetails?.name}</td>
                    <td className="py-3.5 px-4 text-electric font-semibold whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {art.scheduledFor
                            ? new Date(art.scheduledFor).toLocaleString('en-US', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                              })
                            : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => handlePublishNow(art.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-[11px] flex items-center space-x-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Publish Now</span>
                        </button>
                        <Link
                          to={`/admin/articles/edit/${art.id}`}
                          className="p-1.5 text-slate-500 hover:text-electric rounded hover:bg-cloud"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 text-xs space-y-3">
            <Clock className="w-8 h-8 text-slate-300 mx-auto" />
            <p>No articles are currently queued in the scheduled publishing pipeline.</p>
            <Link
              to="/admin/articles/create"
              className="inline-block px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold"
            >
              Author and Schedule a Post
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};
