
import React from 'react';
import { Icons } from './Icon';
import { UserProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfile;
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const NavItem: React.FC<{
  id: string;
  label: string;
  icon: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isExpanded: boolean;
  count?: number;
}> = ({ id, label, icon: Icon, activeTab, onTabChange, isExpanded, count }) => {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onTabChange(id)}
      className={`
        flex items-center rounded-xl transition-all duration-200 group relative
        ${isExpanded ? 'w-full px-3 py-2 justify-between' : 'w-10 h-10 justify-center mx-auto'}
        ${isActive 
          ? 'bg-white/10 text-white shadow-inner backdrop-blur-sm' 
          : 'text-zinc-400 hover:text-white hover:bg-white/5'}
      `}
      title={!isExpanded ? label : undefined}
    >
      <div className={`flex items-center ${isExpanded ? 'gap-3' : 'gap-0'}`}>
        <Icon size={20} className={`transition-colors ${isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
        <span className={`text-sm font-medium transition-all duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>{label}</span>
      </div>
      
      {count && isExpanded && (
        <span className="text-[10px] bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded-full font-bold">
          {count}
        </span>
      )}
      
      {/* Tooltip for Collapsed State */}
      {!isExpanded && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl border border-white/10">
          {label}
        </div>
      )}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, userProfile, isExpanded, toggleSidebar }) => {
  return (
    <div 
        className={`fixed left-0 top-0 bottom-0 bg-black/10 backdrop-blur-md border-r border-white/5 flex flex-col z-50 transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}
    >
      
      {/* Brand Header */}
      <div className={`p-6 pb-2 flex items-center ${isExpanded ? 'justify-between' : 'justify-center'}`}>
        {isExpanded ? (
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('home')}>
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    <svg viewBox="0 0 512 512" className="w-5 h-5 text-black fill-current">
                        <path d="M320 32L144 288h112l-48 192L400 192H288L320 32z" stroke="currentColor" strokeWidth="20" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white italic">ICY</h1>
            </div>
        ) : (
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] cursor-pointer" onClick={toggleSidebar}>
               <svg viewBox="0 0 512 512" className="w-5 h-5 text-black fill-current">
                  <path d="M320 32L144 288h112l-48 192L400 192H288L320 32z" stroke="currentColor" strokeWidth="20" strokeLinejoin="round"/>
               </svg>
            </div>
        )}

        {isExpanded && (
            <button onClick={toggleSidebar} className="text-zinc-500 hover:text-white transition-colors">
                <Icons.Menu size={20} />
            </button>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 space-y-8 mt-6">
        
        {/* Group 1: Discover */}
        <div className="flex flex-col gap-1">
          {isExpanded && <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 animate-in fade-in duration-300">Discover</h3>}
          <NavItem id="home" label="Dashboard" icon={Icons.LayoutGrid} activeTab={activeTab} onTabChange={onTabChange} isExpanded={isExpanded} />
          <NavItem id="games" label="All Games" icon={Icons.Gamepad} activeTab={activeTab} onTabChange={onTabChange} isExpanded={isExpanded} />
          <NavItem id="browser" label="Web Browser" icon={Icons.Globe} activeTab={activeTab} onTabChange={onTabChange} isExpanded={isExpanded} />
        </div>

        {/* Group 2: Library */}
        <div className="flex flex-col gap-1">
          {isExpanded && <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 animate-in fade-in duration-300">Library</h3>}
          <NavItem id="favorites" label="Favorites" icon={Icons.Heart} activeTab={activeTab} onTabChange={onTabChange} isExpanded={isExpanded} />
          <NavItem id="recents" label="Recent" icon={Icons.Clock} activeTab={activeTab} onTabChange={onTabChange} isExpanded={isExpanded} />
        </div>

        {/* Group 3: Settings */}
        <div className="flex flex-col gap-1">
          {isExpanded && <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 animate-in fade-in duration-300">System</h3>}
          <NavItem id="profile" label="Profile" icon={Icons.User} activeTab={activeTab} onTabChange={onTabChange} isExpanded={isExpanded} />
          <NavItem id="settings" label="Settings" icon={Icons.Settings} activeTab={activeTab} onTabChange={onTabChange} isExpanded={isExpanded} />
        </div>

      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/5 bg-transparent">
         
         {/* User Snippet */}
         <button onClick={() => onTabChange('profile')} className={`flex items-center rounded-lg hover:bg-white/5 transition-colors ${isExpanded ? 'w-full gap-3 p-2' : 'w-10 h-10 mx-auto justify-center'}`}>
            <img src={userProfile.avatar} alt="User" className="w-8 h-8 rounded-full bg-zinc-800 object-cover" />
            
            {isExpanded && (
                <>
                    <div className="flex-1 text-left overflow-hidden">
                       <div className="text-sm font-medium text-white truncate">{userProfile.name}</div>
                       <div className="text-xs text-zinc-500 truncate">Online</div>
                    </div>
                    <Icons.ChevronRight size={14} className="text-zinc-600" />
                </>
            )}
         </button>
      </div>
    </div>
  );
};

export default Sidebar;
