import React, { useState, useEffect } from 'react';
import { Save, ExternalLink, CheckCircle, ShieldCheck, Globe, Code, Lock, Crown, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage = () => {
  const { isAdmin } = useAuth();
  const [siteTitle, setSiteTitle] = useState('TECHPULSE');
  const [tagline, setTagline] = useState('Technology. Innovation. Intelligence.');
  const [description, setDescription] = useState('');
  const [gaMeasurementId, setGaMeasurementId] = useState('');
  const [gscVerificationToken, setGscVerificationToken] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/public/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          const s = data.settings;
          setSiteTitle(s.siteTitle || 'TECHPULSE');
          setTagline(s.tagline || 'Technology. Innovation. Intelligence.');
          setDescription(s.description || '');
          setGaMeasurementId(s.gaMeasurementId || '');
          setGscVerificationToken(s.gscVerificationToken || '');
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Access Denied: Only Tier-1 System Administrators can modify platform settings.');
      return;
    }
    setSaved(false);
    try {
      await api.updateSettings({
        siteTitle,
        tagline,
        description,
        gaMeasurementId,
        gscVerificationToken
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(`Save error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold mb-1">
            <Crown className="w-3.5 h-3.5" />
            <span>Root System Configuration</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900 tracking-tight">
            Publication & SEO Governance
          </h1>
          <p className="text-xs text-slate-500">
            Configure global publication identities, search indexing metadata, and analytics telemetry.
          </p>
        </div>

        {isAdmin ? (
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Edit Rights Authorized</span>
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold flex items-center space-x-1.5">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>Publisher: Read-Only Mode</span>
          </span>
        )}
      </div>

      {/* Role Notice Banner for Publisher */}
      {!isAdmin && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Administrative Clearance (Tier 1) Required to Alter Settings</p>
            <p className="text-amber-800 text-[11px] leading-relaxed">
              You are currently authenticated as an <strong>Editorial Publisher</strong>. To prevent accidental search-indexing disruption or analytics misconfiguration, modifications to telemetry IDs and brand parameters are restricted to <strong>Administrators</strong>.
            </p>
          </div>
        </div>
      )}

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">Publication settings successfully saved and applied globally.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Brand Details */}
        <div className="bg-white rounded-2xl p-6 border border-borderGray shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-sm text-navy-900 pb-2 border-b border-borderGray">
            Brand Identity Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Brand Name</label>
              <input
                disabled={!isAdmin}
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className={`w-full border border-borderGray rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-electric ${
                  !isAdmin ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-cloud'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Tagline</label>
              <input
                disabled={!isAdmin}
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className={`w-full border border-borderGray rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-electric ${
                  !isAdmin ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-cloud'
                }`}
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">Editorial Meta Description</label>
            <textarea
              disabled={!isAdmin}
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full border border-borderGray rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-electric ${
                !isAdmin ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-cloud'
              }`}
            />
          </div>
        </div>

        {/* SEO & Telemetry */}
        <div className="bg-white rounded-2xl p-6 border border-borderGray shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-sm text-navy-900 pb-2 border-b border-borderGray">
            SEO & Analytics Telemetry
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Google Analytics 4 Measurement ID</label>
              <input
                disabled={!isAdmin}
                type="text"
                value={gaMeasurementId}
                onChange={(e) => setGaMeasurementId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className={`w-full border border-borderGray rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-electric ${
                  !isAdmin ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-cloud'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Google Search Console Verification Token</label>
              <input
                disabled={!isAdmin}
                type="text"
                value={gscVerificationToken}
                onChange={(e) => setGscVerificationToken(e.target.value)}
                placeholder="google-site-verification=..."
                className={`w-full border border-borderGray rounded-xl p-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-electric ${
                  !isAdmin ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-cloud'
                }`}
              />
            </div>
          </div>

          {/* Quick Endpoints View */}
          <div className="pt-2 border-t border-borderGray flex flex-wrap items-center gap-4 text-xs">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-electric hover:underline font-semibold"
            >
              <span>Dynamic XML Sitemap</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-electric hover:underline font-semibold"
            >
              <span>Crawler Directives (robots.txt)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        <div>
          {isAdmin ? (
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-electric hover:bg-electric-hover text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          ) : (
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-200 text-slate-500 text-xs font-semibold cursor-not-allowed">
              <Lock className="w-4 h-4" />
              <span>Settings Locked (Admin Privilege Required)</span>
            </div>
          )}
        </div>

      </form>

    </div>
  );
};
