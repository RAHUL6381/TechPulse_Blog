import React, { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';

export const SocialShare = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Read this technology article on TechPulse';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">Share:</span>
      
      <a
        href={twitterShare}
        target="_blank"
        rel="noreferrer"
        className="w-8 h-8 rounded-lg bg-cloud dark:bg-slate-800 hover:bg-navy-900 dark:hover:bg-electric hover:text-white dark:hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
        title="Share on X / Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>

      <a
        href={linkedinShare}
        target="_blank"
        rel="noreferrer"
        className="w-8 h-8 rounded-lg bg-cloud dark:bg-slate-800 hover:bg-navy-900 dark:hover:bg-electric hover:text-white dark:hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      <a
        href={facebookShare}
        target="_blank"
        rel="noreferrer"
        className="w-8 h-8 rounded-lg bg-cloud dark:bg-slate-800 hover:bg-navy-900 dark:hover:bg-electric hover:text-white dark:hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>

      <button
        onClick={copyToClipboard}
        className="w-8 h-8 rounded-lg bg-cloud dark:bg-slate-800 hover:bg-navy-900 dark:hover:bg-electric hover:text-white dark:hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors relative"
        title="Copy article link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Link2 className="w-4 h-4" />}
      </button>

      {copied && (
        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
          Copied!
        </span>
      )}
    </div>
  );
};
