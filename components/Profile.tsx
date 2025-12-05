
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Icons } from './Icon';

interface ProfileProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

const AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zack',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Rocky',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Robot',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Cyborg'
];

const COLORS = ['#22d3ee', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveName = () => {
    onUpdateUser({ ...user, name });
    setIsEditing(false);
  };

  const handleAvatarSelect = (avatar: string) => {
    onUpdateUser({ ...user, avatar });
  };

  const handleSwitchProfile = (id: string) => {
    // In a real app, this would load a different profile from a list
    // For now, we simulate by generating a new "slot" ID
    onUpdateUser({ 
        id, 
        name: `Player ${id.slice(-2)}`, 
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
    setName(`Player ${id.slice(-2)}`);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-[#1a1b26]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
           <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
             <Icons.User size={32} />
           </div>
           <div>
             <h2 className="text-3xl font-black text-white tracking-tight">Player Profile</h2>
             <p className="text-gray-400">Manage your identity and saves</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Left: Current Profile Card */}
            <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative group mb-6">
                    <div className={`absolute -inset-1 rounded-full blur opacity-50 bg-[${user.color}] group-hover:opacity-75 transition duration-500`}></div>
                    <img 
                      src={user.avatar} 
                      alt="Avatar" 
                      className="relative w-40 h-40 rounded-full bg-[#0a0b10] border-4 border-[#0a0b10] shadow-2xl object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-[#0a0b10]"></div>
                </div>

                {isEditing ? (
                  <div className="flex items-center gap-2 mb-2 w-full max-w-[200px]">
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-[#0a0b10] border border-white/20 text-white rounded-lg px-3 py-1 text-center w-full focus:border-cyan-500 outline-none"
                      autoFocus
                    />
                    <button onClick={handleSaveName} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
                      <Icons.SendHorizontal size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-2 group">
                    <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                    <button onClick={() => setIsEditing(true)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-opacity">
                      <Icons.Settings size={14} />
                    </button>
                  </div>
                )}
                
                <p className="text-cyan-400 font-mono text-sm mb-6">ID: {user.id.substring(0, 8)}...</p>

                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-1">12</div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold">Games Played</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-1">5</div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold">Favorites</div>
                    </div>
                </div>
            </div>

            {/* Right: Customization */}
            <div className="md:col-span-7 space-y-8">
                
                {/* Avatar Selection */}
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Choose Avatar</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                        {AVATARS.map((avi, idx) => (
                            <button 
                              key={idx}
                              onClick={() => handleAvatarSelect(avi)}
                              className={`rounded-full overflow-hidden border-2 transition-all hover:scale-110 ${user.avatar === avi ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-transparent opacity-50 hover:opacity-100'}`}
                            >
                                <img src={avi} alt={`Avatar ${idx}`} className="w-full h-full bg-[#0a0b10]" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Switch Profiles */}
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Switch Profile Slot</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                         {['Slot 1', 'Slot 2', 'Slot 3'].map((slot, idx) => {
                             const slotId = `user-slot-${idx + 1}`;
                             const isActive = user.id === slotId;
                             return (
                                 <button 
                                    key={slotId}
                                    onClick={() => handleSwitchProfile(slotId)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all min-w-[140px]
                                        ${isActive 
                                            ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' 
                                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                                        }
                                    `}
                                 >
                                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isActive ? 'bg-white text-blue-600' : 'bg-white/10 text-gray-400'}`}>
                                         {idx + 1}
                                     </div>
                                     <div className="text-left">
                                         <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>{slot}</div>
                                         <div className={`text-[10px] ${isActive ? 'text-blue-200' : 'text-gray-500'}`}>{isActive ? 'Active' : 'Switch'}</div>
                                     </div>
                                 </button>
                             );
                         })}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
