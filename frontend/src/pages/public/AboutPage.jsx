import React, { useState, useEffect } from 'react';
import { ShieldCheck, Compass, Award, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export const AboutPage = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getAuthors().then(res => {
      if (res.success) setAuthors(res.authors);
    }).catch(console.error);
  }, []);

  return (
    <div className="pb-20 space-y-16">
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-cloud/80 to-white dark:from-[#0B0F19] dark:to-[#0B0F19] pt-16 pb-20 border-b border-borderGray dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-electric-light dark:bg-blue-950/70 text-electric dark:text-blue-300 border border-transparent dark:border-blue-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Editorial Masthead & Mission</span>
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-navy-900 dark:text-white tracking-tight leading-tight">
            The Digital Technology Observatory
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            TechPulse was founded to provide enterprise leaders, software architects, and researchers with an uncompromising, peer-reviewed technological publication.
          </p>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-8 border border-borderGray dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-electric-light dark:bg-blue-950/70 border border-transparent dark:border-blue-800 flex items-center justify-center text-electric dark:text-blue-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-900 dark:text-white">Code-Level Verification</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every architectural blueprint and code snippet published on TechPulse is verified against production language runtimes.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-2xl p-8 border border-borderGray dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-pulse/30 dark:bg-pulse/20 flex items-center justify-center text-navy-900 dark:text-pulse">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-900 dark:text-white">Zero Commercial Bias</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We prohibit sponsored reviews and hidden vendor promotions. Readership metrics are strictly authentic.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-2xl p-8 border border-borderGray dark:border-slate-800 shadow-sm space-y-3 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-electric-light dark:bg-blue-950/70 border border-transparent dark:border-blue-800 flex items-center justify-center text-electric dark:text-blue-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-navy-900 dark:text-white">Enterprise Impact</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our research is tailored for teams making million-dollar multi-cloud, security, and AI infrastructure decisions.
            </p>
          </div>

        </div>
      </section>

      {/* Editorial Contributors / Masthead */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-electric dark:text-blue-400">Contributing Authors</span>
          <h2 className="font-heading font-bold text-3xl text-navy-900 dark:text-white">The Editorial Masthead</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Meet the systems engineers, research fellows, and architects contributing to TechPulse.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {authors.map(author => (
            <div key={author.id} className="bg-white dark:bg-[#111827] rounded-2xl border border-borderGray dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all text-center space-y-4">
              <img
                src={author.avatarUrl}
                alt={author.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto ring-4 ring-cloud dark:ring-slate-800 shadow-md"
              />
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-base text-navy-900 dark:text-white">{author.name}</h4>
                <p className="text-xs font-semibold text-electric dark:text-blue-400">{author.roleTitle}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {author.bio}
              </p>
              <div className="pt-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                {author.articlesCount || 0} Published Papers
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Standards Statement */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cloud dark:bg-[#0D1527] rounded-3xl p-8 border border-borderGray dark:border-slate-800 space-y-4 transition-colors">
          <h3 className="font-heading font-bold text-xl text-navy-900 dark:text-white">Editorial Code of Ethics</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            TechPulse complies with international digital journalism and software publication standards. Corrections are applied transparently with revision logs, and all external benchmark claims must provide reproducible methodologies.
          </p>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>All articles undergo peer review prior to scheduled publication.</span>
          </div>
        </div>
      </section>

    </div>
  );
};
