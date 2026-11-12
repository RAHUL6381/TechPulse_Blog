import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const BrandLogo = ({
  size = 'md',
  showSubtitle = true,
  subtitle = 'Technology. Innovation. Intelligence.',
  linkTo = '/',
  className = '',
  forceDarkText = false
}) => {
  const { isDark } = useTheme();

  // Size configurations
  const sizes = {
    sm: {
      badge: 'w-8 h-8 rounded-lg',
      iconText: 'text-xs',
      pulseDot: 'w-1.5 h-1.5',
      mainText: 'text-lg',
      subText: 'text-[8px]',
      dot: 'w-1.5 h-1.5'
    },
    md: {
      badge: 'w-10 h-10 rounded-xl',
      iconText: 'text-sm',
      pulseDot: 'w-2 h-2',
      mainText: 'text-2xl',
      subText: 'text-[10px]',
      dot: 'w-2 h-2'
    },
    lg: {
      badge: 'w-12 h-12 rounded-2xl',
      iconText: 'text-base',
      pulseDot: 'w-2.5 h-2.5',
      mainText: 'text-3xl',
      subText: 'text-xs',
      dot: 'w-2.5 h-2.5'
    },
    xl: {
      badge: 'w-16 h-16 rounded-3xl',
      iconText: 'text-xl',
      pulseDot: 'w-3 h-3',
      mainText: 'text-4xl',
      subText: 'text-sm',
      dot: 'w-3 h-3'
    }
  };

  const config = sizes[size] || sizes.md;
  const isDarkEffective = forceDarkText || isDark;

  const content = (
    <div className={`flex items-center space-x-3 group ${className}`}>
      {/* Icon Badge: Multi-Stop Gradient with Soft Glow & Inner Wave */}
      <div className={`relative ${config.badge} flex items-center justify-center bg-gradient-to-tr from-[#1E3A8A] via-[#2563EB] to-[#06B6D4] shadow-md shadow-blue-500/25 border border-white/25 group-hover:scale-105 group-hover:shadow-blue-500/40 transition-all duration-300 flex-shrink-0`}>
        {/* Subtle radial inner shine */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        {/* Monogram + Frequency Wave SVG */}
        <div className="relative z-10 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stylized T & P Integrated Form with Pulse Wave */}
            <path
              d="M3 8H11M7 8V18"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 18V8H18C19.6569 8 21 9.34315 21 11C21 12.6569 19.6569 14 18 14H13"
              stroke="#67E8F9"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pulse heartbeat accent wave running through */}
            <path
              d="M9 13L11 11L13 15L15 13"
              stroke="#D7FF64"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Pulsing Live Beacon Indicator */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D7FF64] border border-slate-900/40" />
        </span>
      </div>

      {/* Brand Typography Lockup */}
      <div>
        <div className="flex items-center space-x-1">
          <span className={`font-heading font-extrabold ${config.mainText} tracking-tight leading-none transition-colors ${
            isDarkEffective ? 'text-white' : 'text-navy-900'
          }`}>
            TECH
          </span>
          <span className={`font-heading font-extrabold ${config.mainText} tracking-tight leading-none bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent`}>
            PULSE
          </span>
          <span className={`${config.dot} rounded-full bg-cyan-400 dark:bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.7)] animate-pulse inline-block ml-0.5`} />
        </div>

        {showSubtitle && (
          <p className={`font-sans ${config.subText} uppercase tracking-widest font-semibold mt-1 transition-colors ${
            isDarkEffective ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};

