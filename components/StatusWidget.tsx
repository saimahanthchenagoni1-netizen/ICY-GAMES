
import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';

interface StatusWidgetProps {
  isSidebarExpanded: boolean;
}

const StatusWidget: React.FC<StatusWidgetProps> = ({ isSidebarExpanded }) => {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState<number | null>(null);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Battery API (Experimental)
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        setBattery(Math.round(batt.level * 100));
        batt.addEventListener('levelchange', () => setBattery(Math.round(batt.level * 100)));
      });
    } else {
      setBattery(100); // Default mock
    }

    // Mock FPS fluctuation
    const fpsTimer = setInterval(() => {
      setFps(Math.floor(Math.random() * (60 - 55 + 1) + 55));
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(fpsTimer);
    };
  }, []);

  return (
    <div className={`fixed bottom-6 z-40 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-10 duration-500 transition-all ease-[cubic-bezier(0.25,0.8,0.25,1)] ${isSidebarExpanded ? 'left-72' : 'left-24'}`}>
      <div className="bg-[#1a1b26]/90 backdrop-blur-md border border-white/5 rounded-2xl p-4 w-64 shadow-2xl">
        <div className="flex items-center justify-between text-xs font-medium text-gray-400 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-yellow-400">
              <Icons.Battery size={14} className="rotate-90" />
              <span>{battery !== null ? `${battery}%` : '--%'}</span>
            </div>
            <div className="w-px h-3 bg-white/10"></div>
            <span>FPS: <span className="text-green-400">{fps}</span></span>
          </div>
        </div>
        
        <div className="text-2xl font-bold text-white mb-4 tracking-tight font-mono">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
        </div>

        <a 
          href="https://discord.gg/sj8fPcuWgr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative overflow-hidden flex items-center justify-center w-full bg-gradient-to-b from-[#5865F2] to-[#4752C4] text-white text-xs font-bold py-3 rounded-xl shadow-[0_4px_0_#363f94] transition-all active:shadow-none active:translate-y-[4px] border-t border-[#7a85f7] group"
        >
          <span className="relative z-10">JOIN DISCORD</span>
          {/* Diamond Reflection */}
          <div className="absolute inset-0 -top-[20%] -bottom-[20%] bg-gradient-to-r from-transparent via-white/30 to-transparent w-8 skew-x-[-25deg] animate-diamond-shine" />
        </a>
      </div>
    </div>
  );
};

export default StatusWidget;
