import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

export const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!content) return;

    // Match lines starting with ## or ###
    const lines = content.split('\n');
    const parsed = [];
    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length; // 2 or 3
        const rawText = match[2].trim();
        const cleanText = rawText.replace(/[*_`]/g, '');
        const id = cleanText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        parsed.push({ level, text: cleanText, id });
      }
    });

    setHeadings(parsed);

    // Scrollspy observer
    const handleScroll = () => {
      const headingElements = parsed.map(h => document.getElementById(h.id)).filter(Boolean);
      const scrollPos = window.scrollY + 140;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPos) {
          setActiveId(el.id);
          return;
        }
      }
      if (parsed[0]) setActiveId(parsed[0].id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  if (headings.length === 0) return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <div className="bg-cloud/60 dark:bg-[#111827] rounded-2xl border border-borderGray dark:border-slate-800 p-5 transition-colors">
      <div className="flex items-center space-x-2 text-navy-900 dark:text-white font-heading font-bold text-sm mb-4">
        <List className="w-4 h-4 text-electric dark:text-blue-400" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1">
        {headings.map((h, i) => {
          const isActive = activeId === h.id;
          return (
            <button
              key={i}
              onClick={() => scrollTo(h.id)}
              className={`w-full text-left flex items-start space-x-2 py-1.5 px-2 rounded-lg text-xs transition-colors ${
                h.level === 3 ? 'pl-5' : ''
              } ${
                isActive
                  ? 'bg-white dark:bg-[#1A2338] text-electric dark:text-blue-400 font-bold shadow-xs border border-borderGray/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/60'
              }`}
            >
              <ChevronRight className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 transition-transform ${isActive ? 'text-electric dark:text-blue-400 rotate-90' : 'text-slate-400 dark:text-slate-500'}`} />
              <span className="line-clamp-2">{h.text}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
