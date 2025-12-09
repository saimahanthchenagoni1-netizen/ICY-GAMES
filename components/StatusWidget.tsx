
import React, { useState, useEffect } from 'react';

const StatusWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [fps, setFps] = useState(0);
  
  // FPS Loop
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const loop = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Time & Battery
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((batt: any) => {
             setBatteryLevel(Math.round(batt.level * 100));
             batt.addEventListener('levelchange', () => {
                setBatteryLevel(Math.round(batt.level * 100));
             });
        });
    }
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-8 left-24 z-50 animate-in fade-in slide-in-from-bottom-10 duration-700 hidden lg:block">
        <div className="bg-[#11131f] rounded-2xl p-5 w-56 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col gap-1">
            
            {/* Top Row: Battery & FPS */}
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-2">
                <div className="flex items-center gap-2">
                   {/* Custom Orange Battery Icon */}
                   <div className="relative w-5 h-2.5 rounded-[2px] border border-orange-500 p-[1px]">
                       <div className="h-full bg-orange-500 rounded-[1px]" style={{ width: `${(batteryLevel || 50)}%` }}></div>
                       <div className="absolute -right-[3px] top-[2px] w-[1.5px] h-1.5 bg-orange-500 rounded-r-[1px]"></div>
                   </div>
                   <span className="text-gray-300">{batteryLevel !== null ? `${batteryLevel}%` : '46%'}</span>
                </div>
                <div>FPS: <span className="text-white">{fps}</span></div>
            </div>

            {/* Time */}
            <div className="mb-4">
                <div className="text-lg font-medium text-white tracking-wide">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </div>
            </div>

            {/* Discord Button */}
            <a 
                href="https://discord.gg/sj8fPcuWgr"
                target="_blank"
                rel="noreferrer"
                className="btn-icy w-full bg-[#3b60c4] hover:bg-[#4a6fd6] text-white text-center py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-lg transition-all"
            >
                JOIN DISCORD
            </a>
        </div>
    </div>
  );
};

export default StatusWidget;
