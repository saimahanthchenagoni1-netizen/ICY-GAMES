import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';
import { Icons } from './Icon';

interface SidebarProps {
  isOpen: boolean;
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onClose: () => void;
  onOpenFrostAI: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, selectedCategory, onSelectCategory, onClose, onOpenFrostAI }) => {
  
  const getIcon = (cat: Category) => {
    switch(cat) {
        case 'Action': return <Icons.Action size={20} />;
        case 'Puzzle': return <Icons.Puzzle size={20} />;
        case 'Racing': return <Icons.Racing size={20} />;
        case 'Strategy': return <Icons.Trophy size={20} />;
        case 'Sports': return <Icons.Trophy size={20} />;
        default: return <Icons.Gamepad size={20} />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 h-full bg-[#0a0a0a] border-r border-white/10 shadow-2xl transition-all duration-300 ease-in-out group
          lg:translate-x-0 lg:border-r lg:shadow-none lg:bg-[#0a0a0a]
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} 
          lg:w-20 lg:hover:w-64
        `}
      >
        <div className="flex h-full flex-col overflow-hidden">
           {/* Mobile Header in Sidebar */}
           <div className="flex h-16 items-center justify-between px-6 lg:hidden border-b border-white/10 shrink-0">
             <span className="text-xl font-bold text-white">Menu</span>
             <button onClick={onClose} className="text-gray-400 hover:text-white">
               <Icons.Close size={24} />
             </button>
           </div>
           
           {/* Desktop Spacer for Header Alignment */}
           <div className="hidden lg:block h-16 shrink-0" />

           <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
              <nav className="space-y-2 px-3">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            onSelectCategory(cat);
                            if (window.innerWidth < 1024) onClose();
                        }}
                        className={`flex items-center rounded-xl p-3 text-sm font-medium transition-all w-full whitespace-nowrap overflow-hidden
                            ${selectedCategory === cat 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                            : 'text-gray-400 hover:bg-white/10 hover:text-white'}
                        `}
                        title={cat}
                    >
                        <div className="flex items-center justify-center w-6 shrink-0">
                           {getIcon(cat)}
                        </div>
                        <span className="ml-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                            {cat}
                        </span>
                    </button>
                ))}
              </nav>

              <div className="mt-8 px-3">
                 <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
                 
                 {/* FROST AI Button */}
                 <button 
                    onClick={() => {
                        onOpenFrostAI();
                        if (window.innerWidth < 1024) onClose();
                    }}
                    className="flex items-center rounded-xl p-3 text-sm font-bold w-full whitespace-nowrap overflow-hidden bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 text-cyan-300 hover:from-cyan-900/60 hover:to-blue-900/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all group-frost"
                 >
                     <div className="flex items-center justify-center w-6 shrink-0 relative">
                         <Icons.Bot size={20} className="animate-pulse" />
                         <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                     </div>
                     <span className="ml-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">
                         FROST AI
                     </span>
                 </button>
              </div>

              <div className="mt-8 px-3">
                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    My Library
                </h3>
                <div className="space-y-2">
                     <button className="flex items-center rounded-xl p-3 text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white w-full whitespace-nowrap overflow-hidden">
                         <div className="flex items-center justify-center w-6 shrink-0">
                             <Icons.Star size={20} /> 
                         </div>
                         <span className="ml-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">Favorites</span>
                     </button>
                </div>
              </div>
           </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;