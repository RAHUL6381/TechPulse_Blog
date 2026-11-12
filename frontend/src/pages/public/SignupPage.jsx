import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, CheckCircle, Lock, Mail, UserRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SignupPage = () => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      setCreated(true);
    } catch (err) {
      setError(err.message || 'Unable to create your account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] bg-cloud dark:bg-[#0B0F19] px-4 py-16 sm:px-6 transition-colors">
      <div className="mx-auto max-w-md rounded-3xl border border-borderGray dark:border-slate-800 bg-white dark:bg-[#111827] p-8 shadow-xl sm:p-10 transition-colors">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-light dark:bg-blue-950/70 border border-transparent dark:border-blue-800 text-electric dark:text-blue-300">
          <UserRound className="h-6 w-6" />
        </div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-navy-900 dark:text-white">Create your TechPulse account</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Sign up to join the TechPulse reader community. Reader accounts do not include Publisher CMS access.
        </p>

        {created ? (
          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/40 p-4 text-sm text-green-800 dark:text-green-300">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>Your reader account is ready. You are now signed in.</p>
            </div>
            <Link to="/" className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 dark:bg-electric py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy-800 dark:hover:bg-electric-hover shadow-sm">
              Explore TechPulse <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 p-4 text-xs text-red-700 dark:text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="signup-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Name</label>
              <div className="relative">
                <input id="signup-name" type="text" autoComplete="name" required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="w-full rounded-xl border border-borderGray dark:border-slate-700 bg-cloud dark:bg-[#1A2234] py-3 pl-10 pr-4 text-sm text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#1A2234] focus:outline-none focus:ring-2 focus:ring-electric" />
                <UserRound className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Email address</label>
              <div className="relative">
                <input id="signup-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-borderGray dark:border-slate-700 bg-cloud dark:bg-[#1A2234] py-3 pl-10 pr-4 text-sm text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#1A2234] focus:outline-none focus:ring-2 focus:ring-electric" />
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="signup-password" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <input id="signup-password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" className="w-full rounded-xl border border-borderGray dark:border-slate-700 bg-cloud dark:bg-[#1A2234] py-3 pl-10 pr-4 text-sm text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#1A2234] focus:outline-none focus:ring-2 focus:ring-electric" />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="signup-confirm-password" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">Confirm password</label>
              <div className="relative">
                <input id="signup-confirm-password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Re-enter your password" className="w-full rounded-xl border border-borderGray dark:border-slate-700 bg-cloud dark:bg-[#1A2234] py-3 pl-10 pr-4 text-sm text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#1A2234] focus:outline-none focus:ring-2 focus:ring-electric" />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 dark:bg-electric py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-navy-800 dark:hover:bg-electric-hover disabled:opacity-50">
              {loading ? 'Creating account...' : <>Create account <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        )}

        <div className="mt-6 border-t border-borderGray dark:border-slate-800 pt-5 text-center">
          <Link to="/" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors">← Return to TechPulse</Link>
        </div>
      </div>
    </section>
  );
};
