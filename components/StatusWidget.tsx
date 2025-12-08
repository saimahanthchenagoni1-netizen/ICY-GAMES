import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';

const StatusWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState(93);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    // Mock battery check
    if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((batt: any) => {
             setBattery(Math.round(batt.level * 100));
        });
    }
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-[104px] z-40 animate-in fade-in slide-in-from-bottom-10 duration-700 hidden md:block">
        <div className="bg-[#0b0d14] border border-white/5 rounded-2xl p-4 w-56 shadow-2xl shadow-black/50">
            
            {/* Top Row: Battery & FPS */}
            <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-wide">
                <div className="flex items-center gap-1.5 text-green-400">
                    <Icons.Battery size={12} className="rotate-90" />
                    <span>{battery}%</span>
                </div>
                <div className="text-gray-500">FPS: <span className="text-white">60</span></div>
            </div>

            {/* Time */}
            <div className="mb-4">
                <div className="text-2xl font-bold text-white tracking-tight leading-none">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </div>
            </div>

            {/* Discord Button */}
            <a 
                href="https://discord.gg/example"
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-[#3b458b] hover:bg-[#5865F2] text-blue-100 hover:text-white text-center py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
            >
                Join Discord
            </a>
        </div>
    </div>
  );
};

export default StatusWidget;