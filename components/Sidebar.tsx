import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';
import { Icons } from './Icon';

interface SidebarProps {
  isOpen: boolean;
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, selectedCategory, onSelectCategory, onClose }) => {
  
  const getIcon = (cat: Category) => {
    switch(cat) {
        case 'Action': return <Icons.Action size={18} />;
        case 'Puzzle': return <Icons.Puzzle size={18} />;
        case 'Racing': return <Icons.Racing size={18} />;
        case 'Strategy': return <Icons.Trophy size={18} />; // Approximation
        case 'Sports': return <Icons.Trophy size={18} />;
        default: return <Icons.Gamepad size={18} />;
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
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#0a0a0a] border-r border-white/10 shadow-2xl transition-transform duration-300 lg:static lg:z-0 lg:block lg:w-60 lg:shadow-none lg:transform-none lg:bg-transparent lg:border-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
           {/* Mobile Header in Sidebar */}
           <div className="flex h-16 items-center justify-between px-6 lg:hidden border-b border-white/10">
             <span className="text-xl font-bold text-white">Menu</span>
             <button onClick={onClose} className="text-gray-400 hover:text-white">
               <Icons.Close size={24} />
             </button>
           </div>

           <div className="flex-1 overflow-y-auto px-4 py-6">
              <nav className="space-y-1">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            onSelectCategory(cat);
                            if (window.innerWidth < 1024) onClose();
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                            selectedCategory === cat 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        {getIcon(cat)}
                        {cat}
                    </button>
                ))}
              </nav>

              <div className="mt-8">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">My Library</h3>
                <div className="space-y-1">
                     <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white">
                         <Icons.Star size={18} /> Favorites
                     </button>
                     <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white">
                         <Icons.Trophy size={18} /> High Scores
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