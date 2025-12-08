
import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';

interface HeaderProps {
  onSearch: (query: string) => void;
  onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Status State
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState<number | null>(null);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    // Time Timer
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Battery API
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        setBattery(Math.round(batt.level * 100));
        batt.addEventListener('levelchange', () => setBattery(Math.round(batt.level * 100)));
      });
    } else {
      setBattery(100);
    }

    // Mock FPS
    const fpsTimer = setInterval(() => {
      setFps(Math.floor(Math.random() * (60 - 55 + 1) + 55));
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(fpsTimer);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSearch(val);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 shadow-lg">
      <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* Left: Logo & Clock */}
        <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={onHome}>
               <div className="relative">
                  <h1 className="text-3xl font-black italic tracking-tighter text-white group-hover:text-cyan-400 transition-colors select-none">ICY</h1>
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-cyan-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
               </div>
            </div>

            {/* Time Display (Hidden on very small screens) */}
            <div className="hidden md:flex flex-col justify-center border-l border-white/10 pl-6 h-10">
                <div className="text-lg font-bold text-white leading-none font-mono">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">
                    {battery !== null && (
                        <span className="flex items-center gap-1 text-yellow-400">
                           <Icons.Battery size={10} className="rotate-90" /> {battery}%
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        FPS <span className="text-green-400">{fps}</span>
                    </span>
                </div>
            </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative w-full group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
              <Icons.Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full rounded-full border border-white/10 bg-[#1a1b26] py-2.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:bg-[#20212e] focus:ring-0 sm:text-sm transition-all shadow-inner"
              placeholder="Search games..."
            />
          </div>
        </div>

        {/* Right: Actions & Discord */}
        <div className="flex items-center gap-3 shrink-0">
           
           {/* Discord Button */}
           <a 
              href="https://discord.gg/sj8fPcuWgr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-full font-bold text-xs transition-all shadow-lg shadow-[#5865F2]/20 hover:scale-105 active:scale-95"
           >
              <span className="hidden lg:inline">JOIN DISCORD</span>
              <span className="lg:hidden">DISCORD</span>
           </a>

           <div className="h-8 w-px bg-white/10 mx-1"></div>

           <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-full transition-all relative group">
              <Icons.Heart size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505] scale-0 group-hover:scale-100 transition-transform"></span>
           </button>
           
           <button className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/10 rounded-full transition-all">
              <Icons.User size={20} />
           </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
