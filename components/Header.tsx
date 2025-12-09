
import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';

interface HeaderProps {
  activeTab: string;
  onSearch: (query: string) => void;
  searchQuery: string;
  onOpenFeedback?: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onSearch, searchQuery, onOpenFeedback }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        const main = document.querySelector('main');
        if (main && main.scrollTop > 10) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    
    // Attach to the main scrolling element in App.tsx
    const mainElement = document.querySelector('main');
    mainElement?.addEventListener('scroll', handleScroll);
    return () => mainElement?.removeEventListener('scroll', handleScroll);
  }, []);

  const getBreadcrumb = () => {
      switch(activeTab) {
          case 'home': return 'Dashboard';
          case 'games': return 'Library / All Games';
          case 'browser': return 'Apps / Browser';
          case 'settings': return 'System / Settings';
          case 'profile': return 'User / Profile';
          default: return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
      }
  };

  return (
    <header className={`
        sticky top-0 z-40 w-full px-6 py-4 transition-all duration-300
        ${scrolled ? 'bg-[#02040a]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}
    `}>
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        
        {/* Left: Breadcrumb */}
        <div className="flex flex-col">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">ICY Platform</h2>
            <h1 className="text-lg font-bold text-white tracking-tight">{getBreadcrumb()}</h1>
        </div>

        {/* Center/Right: Actions */}
        <div className="flex items-center gap-4">
            
            {/* Search Bar */}
            <div className="relative group hidden md:block">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search games..." 
                    className="bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-gray-200 w-64 focus:w-80 transition-all focus:bg-black/40 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-600 shadow-inner"
                />
            </div>

            {/* Notification/Feedback Icon */}
            <div className="flex items-center gap-2">
                <button 
                    onClick={onOpenFeedback}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors relative"
                    title="Notifications & Feedback"
                >
                    <Icons.Bell size={18} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
                </button>
            </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
