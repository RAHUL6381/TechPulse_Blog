import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles, Crown, Edit3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../../components/BrandLogo';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password, rememberMe);
      if (['superadmin', 'admin', 'publisher', 'editor'].includes(result.user.role)) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillAdmin = () => {
    setEmail('admin@techpulse.io');
    setPassword('TechPulse2026!');
  };

  const handleFillPublisher = () => {
    setEmail('publisher@techpulse.io');
    setPassword('Publisher2026!');
  };

  return (
    <div className="min-h-screen bg-cloud flex">
      
      {/* Left Column: Corporate Brand Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-electric/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          <BrandLogo
            linkTo="/"
            size="lg"
            subtitle="Workspace CMS"
            forceDarkText={true}
          />
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-navy-800 text-pulse text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Digital Technology Observatory</span>
          </div>

          <h1 className="font-heading font-bold text-4xl text-white tracking-tight leading-tight">
            Role-Governed Enterprise Publication Systems
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            Distraction-free publishing platform architected with strict hierarchical Role-Based Access Control. Administrators govern root settings, user permissions, and taxonomy, while Publishers drive content authoring and editorial workflows.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-navy-800/80 border border-purple-500/30">
              <div className="flex items-center space-x-1.5 text-purple-400 font-bold mb-1">
                <Crown className="w-3.5 h-3.5" />
                <span>Tier 1: Administrator</span>
              </div>
              <p className="text-slate-400 text-[11px]">Highest privilege: user roles, platform configuration, and taxonomy governance.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-800/80 border border-blue-500/30">
              <div className="flex items-center space-x-1.5 text-blue-400 font-bold mb-1">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Tier 2: Publisher</span>
              </div>
              <p className="text-slate-400 text-[11px]">Editorial workflow: draft creation, publishing, scheduling, and media management.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-500">
          © {new Date().getFullYear()} TechPulse Publishing Systems. Enterprise RBAC Enabled.
        </div>
      </div>

      {/* Right Column: Secure Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full space-y-7 bg-white p-8 sm:p-10 rounded-3xl border border-borderGray shadow-xl">
          
          <div className="space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-electric-light text-electric flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-navy-900 tracking-tight">
              Enterprise CMS Sign In
            </h2>
            <p className="text-xs text-slate-500">
              Select your role credential to access the publication management suite.
            </p>
          </div>

          {/* Quick-Fill Role Selector Cards */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Quick Test Credentials:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={handleFillAdmin}
                className="p-3 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100/70 text-left transition-all group"
              >
                <div className="flex items-center justify-between font-bold text-purple-900 mb-0.5">
                  <div className="flex items-center space-x-1">
                    <Crown className="w-3.5 h-3.5 text-purple-600" />
                    <span>Admin (Highest)</span>
                  </div>
                  <span className="text-[10px] bg-purple-200/60 px-1.5 py-0.5 rounded text-purple-800">Fill</span>
                </div>
                <div className="text-[11px] text-purple-700 font-mono truncate">admin@techpulse.io</div>
              </button>

              <button
                type="button"
                onClick={handleFillPublisher}
                className="p-3 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-left transition-all group"
              >
                <div className="flex items-center justify-between font-bold text-blue-900 mb-0.5">
                  <div className="flex items-center space-x-1">
                    <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Publisher Tier</span>
                  </div>
                  <span className="text-[10px] bg-blue-200/60 px-1.5 py-0.5 rounded text-blue-800">Fill</span>
                </div>
                <div className="text-[11px] text-blue-700 font-mono truncate">publisher@techpulse.io</div>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@techpulse.io"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-cloud border border-borderGray rounded-xl focus:outline-none focus:ring-2 focus:ring-electric focus:bg-white"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-cloud border border-borderGray rounded-xl focus:outline-none focus:ring-2 focus:ring-electric focus:bg-white"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-borderGray text-electric focus:ring-electric"
                />
                <span className="text-slate-600 font-medium">Remember 30-day session</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-electric hover:bg-electric-hover text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="pt-2 border-t border-borderGray text-center">
            <Link to="/" className="text-xs text-slate-500 hover:text-navy-900 transition-colors">
              ← Return to TechPulse Public Magazine
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};
