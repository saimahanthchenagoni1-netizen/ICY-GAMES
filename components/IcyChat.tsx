
import React from 'react';
import { Icons } from './Icon';

const CHANNELS = [
  { id: 1, name: 'General', active: true },
  { id: 2, name: 'Gaming', active: false },
  { id: 3, name: 'Support', active: false },
];

const MOCK_MESSAGES = [
  { id: 1, user: 'System', text: 'Welcome to Icy Chat. Be cool.', time: '12:00' },
  { id: 2, user: 'Guest_882', text: 'Anyone playing Crashy Road?', time: '12:05' },
  { id: 3, user: 'PlayerOne', text: 'Yeah, trying to beat my high score.', time: '12:06' },
];

const IcyChat: React.FC = () => {
  return (
    <div className="h-[600px] flex rounded-3xl overflow-hidden border border-white/5 bg-black/20 backdrop-blur-md shadow-2xl">
      
      {/* Sidebar */}
      <div className="w-48 bg-white/5 border-r border-white/5 p-4 flex flex-col gap-2">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Rooms</div>
        {CHANNELS.map(ch => (
          <button 
            key={ch.id}
            className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${ch.active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            # {ch.name}
          </button>
        ))}
        
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 px-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-400">128 Online</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {MOCK_MESSAGES.map(msg => (
            <div key={msg.id} className="group animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`text-sm font-bold ${msg.user === 'System' ? 'text-cyan-400' : 'text-white'}`}>{msg.user}</span>
                <span className="text-[10px] text-gray-600">{msg.time}</span>
              </div>
              <p className="text-gray-300 text-sm">{msg.text}</p>
            </div>
          ))}
          
          <div className="flex items-center gap-3 text-xs text-gray-600 italic border-t border-white/5 pt-4 mt-8">
            <Icons.Lock size={12} />
            Messages are encrypted. Keep it friendly.
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white/5 border-t border-white/5">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default IcyChat;
