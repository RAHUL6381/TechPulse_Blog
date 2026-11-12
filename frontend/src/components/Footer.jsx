import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Globe, ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer = () => {
  return (
    <footer className="bg-navy-900 dark:bg-[#070B14] text-white pt-16 pb-12 border-t border-navy-800 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo linkTo="/" size="md" showSubtitle={false} forceDarkText={true} />

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The Digital Technology Observatory. Providing peerless corporate engineering intelligence, software architectures, cybersecurity updates, and frontier research.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-slate-400 hover:text-pulse hover:bg-navy-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-slate-400 hover:text-pulse hover:bg-navy-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-slate-400 hover:text-pulse hover:bg-navy-700 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://techpulse.io" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-slate-400 hover:text-pulse hover:bg-navy-700 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Technology Pillars */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Core Technology</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/categories/software-development" className="hover:text-pulse transition-colors">Software Development</Link></li>
              <li><Link to="/categories/artificial-intelligence" className="hover:text-pulse transition-colors">AI & Machine Learning</Link></li>
              <li><Link to="/categories/cloud-computing" className="hover:text-pulse transition-colors">Cloud Computing</Link></li>
              <li><Link to="/categories/cybersecurity" className="hover:text-pulse transition-colors">Cybersecurity</Link></li>
              <li><Link to="/categories/web-mobile-development" className="hover:text-pulse transition-colors">Web & Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Editorial & Navigation */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Publications</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/articles" className="hover:text-pulse transition-colors">All Articles</Link></li>
              <li><Link to="/articles?sort=popular" className="hover:text-pulse transition-colors">Trending Stories</Link></li>
              <li><Link to="/about" className="hover:text-pulse transition-colors">Editorial Masthead</Link></li>
              <li><a href="/sitemap.xml" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 hover:text-pulse transition-colors"><span>XML Sitemap</span><ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/robots.txt" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 hover:text-pulse transition-colors"><span>robots.txt</span><ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* Enterprise Access */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Corporate & CMS</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/admin/login" className="inline-flex items-center space-x-1.5 text-electric-light hover:text-pulse transition-colors font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Gateway</span>
                </Link>
              </li>
              <li><Link to="/about" className="hover:text-pulse transition-colors">About TechPulse</Link></li>
              <li><span className="text-slate-500">Editorial Code of Ethics</span></li>
              <li><span className="text-slate-500">Security Disclosures</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} TECHPULSE Corporation. All rights reserved. MERN Stack Publication System.</p>
          <div className="flex items-center space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Publication</span>
            <span>Security</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
