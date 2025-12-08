import React from 'react';
import { Icons } from './Icon';
import { UserProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfile;
}

const NavButton: React.FC<{ 
  id: string; 
  icon: any; 
  isProfile?: boolean; 
  activeTab: string; 
  onTabChange: (tab: string) => void; 
  userProfile?: UserProfile;
}> = ({ id, icon: Icon, isProfile = false, activeTab, onTabChange, userProfile }) => {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onTabChange(id)}
      className={`
        relative group flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300
        ${isActive 
          ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
          : 'text-gray-500 hover:bg-white/10 hover:text-white'}
      `}
    >
      {isProfile && userProfile ? (
           <div className={`w-full h-full p-0.5 rounded-xl border-2 ${isActive ? 'border-transparent' : 'border-transparent group-hover:border-white/20'}`}>
              <img src={userProfile.avatar} className="w-full h-full rounded-lg object-cover bg-black" alt="Profile" />
           </div>
      ) : (
          <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
      )}
      
      {/* Tooltip */}
      <span className="absolute left-16 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
         {id.charAt(0).toUpperCase() + id.slice(1)}
      </span>
    </button>
  );
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, userProfile }) => {
  const navItems = [
    { id: 'home', icon: Icons.Home },
    { id: 'games', icon: Icons.Gamepad },
    { id: 'browser', icon: Icons.Globe },
  ];

  const bottomItems = [
    { id: 'profile', icon: Icons.User },
    { id: 'settings', icon: Icons.Settings },
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[88px] bg-[#02040a] border-r border-white/5 flex flex-col items-center py-6 z-50">
      
      {/* Logo */}
      <div className="mb-10">
        <button onClick={() => onTabChange('home')} className="group relative">
           <div className="w-12 h-12 bg-cyan-200 rounded-2xl transform hover:rotate-6 transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)] overflow-hidden">
               {/* Lightning Logo SVG */}
               <svg viewBox="0 0 512 512" className="w-8 h-8 text-black fill-current">
                  <path d="M320 32L144 288h112l-48 192L400 192H288L320 32z" stroke="currentColor" strokeWidth="20" strokeLinejoin="round"/>
               </svg>
           </div>
           <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md -z-10 group-hover:blur-lg transition-all opacity-0 group-hover:opacity-100"></div>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-6 w-full items-center">
        {navItems.map((item) => (
          <NavButton 
            key={item.id} 
            id={item.id} 
            icon={item.icon} 
            activeTab={activeTab} 
            onTabChange={onTabChange} 
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-6 w-full items-center mt-auto pb-4">
        {bottomItems.map((item) => (
             <NavButton 
                key={item.id} 
                id={item.id} 
                icon={item.icon} 
                isProfile={item.id === 'profile'} 
                activeTab={activeTab} 
                onTabChange={onTabChange}
                userProfile={userProfile}
             />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;