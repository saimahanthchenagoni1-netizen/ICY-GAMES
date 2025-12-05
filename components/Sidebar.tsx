
import React from 'react';
import { Icons } from './Icon';
import { UserProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
  userProfile: UserProfile;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isExpanded, onToggle, userProfile }) => {
  const menuItems = [
    { id: 'home', icon: Icons.Home, label: 'Home' },
    { id: 'games', icon: Icons.Gamepad, label: 'Games' },
    { id: 'apps', icon: Icons.LayoutGrid, label: 'Apps' },
    { id: 'browser', icon: Icons.Globe, label: 'Browser' },
  ];

  return (
    <div 
        className={`fixed left-0 top-0 bottom-0 bg-[#0a0b10]/95 backdrop-blur-md border-r border-white/5 flex flex-col py-6 z-50 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] shadow-2xl overflow-hidden ${isExpanded ? 'w-64' : 'w-20'}`}
    >
      
      {/* Top Section: Toggle & Branding */}
      <div className="px-3 mb-10 flex items-center h-12">
        {/* Toggle Button */}
        <button 
            onClick={onToggle}
            className="p-3 rounded-xl text-white hover:bg-white/10 transition-all active:scale-95 flex-shrink-0 z-10"
            title="Menu"
        >
            <Icons.Menu size={24} className="text-cyan-400" />
        </button>

        {/* Branding */}
        <div className={`flex items-center gap-2 ml-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
             <div className="bg-blue-600/20 p-1.5 rounded-lg">
                <Icons.Gamepad size={20} className="text-blue-500" />
             </div>
             <span className="font-black text-xl tracking-tighter italic text-white">ICY</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              relative flex items-center p-3 rounded-xl transition-all duration-300 group overflow-hidden
              ${activeTab === item.id 
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }
            `}
            title={!isExpanded ? item.label : undefined}
          >
            <div className="flex-shrink-0">
                <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            </div>

            <span 
                className={`ml-4 font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                    isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
            >
                {item.label}
            </span>

            {!isExpanded && (
                <span className="absolute left-16 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Actions: Settings & Profile */}
      <div className="flex flex-col gap-2 w-full px-3 mt-auto">
        <div className={`h-px bg-white/5 mb-2 mx-2 transition-all duration-300 ${isExpanded ? 'w-full' : 'w-8'}`}></div>
        
        {/* Settings Button */}
        <button
            onClick={() => onTabChange('settings')}
             className={`
              relative flex items-center p-3 rounded-xl transition-all duration-300 group overflow-hidden
              ${activeTab === 'settings' 
                ? 'bg-white/10 text-white' 
                : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }
            `}
            title={!isExpanded ? "Settings" : undefined}
          >
            <div className="flex-shrink-0">
                <Icons.Settings size={22} />
            </div>
            
            <span 
                className={`ml-4 font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                    isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
            >
                Settings
            </span>
             
             {!isExpanded && (
                <span className="absolute left-16 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    Settings
                </span>
            )}
        </button>

        {/* User Profile Button */}
        <button
            onClick={() => onTabChange('profile')}
             className={`
              relative flex items-center p-2 rounded-xl transition-all duration-300 group overflow-hidden mt-1
              ${activeTab === 'profile' 
                ? 'bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30' 
                : 'hover:bg-white/5 border border-transparent'
              }
            `}
            title={!isExpanded ? userProfile.name : undefined}
          >
            <div className="flex-shrink-0 relative">
                <img 
                    src={userProfile.avatar} 
                    alt="User" 
                    className={`w-8 h-8 rounded-full bg-black/20 object-cover ring-2 transition-all ${activeTab === 'profile' ? 'ring-cyan-400' : 'ring-transparent group-hover:ring-white/20'}`} 
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0a0b10] rounded-full"></div>
            </div>
            
            <div 
                className={`ml-3 flex flex-col items-start overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
            >
                <span className="text-sm font-bold text-white truncate max-w-[120px] leading-tight">{userProfile.name}</span>
                <span className="text-[10px] text-gray-400">View Profile</span>
            </div>

             {!isExpanded && (
                <span className="absolute left-16 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    Profile
                </span>
            )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
