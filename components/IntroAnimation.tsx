import React, { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'initial' | 'appear' | 'zoom'>('initial');

  useEffect(() => {
    // Fast Sequence:
    // 0ms: Initial state (invisible/scaled down)
    // 50ms: Appear (fade in quickly)
    // 1200ms: Zoom starts (scale up massively centered on C)
    // 1800ms: Complete (unmount)
    
    const timers = [
      setTimeout(() => setStage('appear'), 50),
      setTimeout(() => setStage('zoom'), 1200),
      setTimeout(onComplete, 1800)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden cursor-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#050505] to-black animate-[pulse_3s_ease-in-out_infinite]" />
      
      {/* Animated Glow Orbs - Made cooler */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${stage === 'zoom' ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-[60vw] h-[60vw] bg-cyan-500/10 rounded-full blur-[100px] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute inset-0 w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[80px] animate-pulse" />
      </div>
      
      {/* Main Text Container */}
      <div 
        className={`
            relative flex items-center justify-center whitespace-nowrap
            transition-all duration-[800ms] ease-[cubic-bezier(0.8,0,0.2,1)]
            will-change-transform transform-gpu
            ${stage === 'initial' ? 'opacity-0 scale-90 blur-sm' : ''}
            ${stage === 'appear' ? 'opacity-100 scale-100 blur-0' : ''}
            ${stage === 'zoom' ? 'scale-[150] opacity-0' : ''} 
        `}
        style={{ transformOrigin: 'center center' }}
      >
        <span className="text-[25vw] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-300 via-white to-slate-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] select-none relative z-10">
          I
        </span>
        
        {/* The C - The Portal */}
        <span className="text-[25vw] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-500 drop-shadow-[0_0_60px_rgba(34,211,238,0.6)] mx-2 relative z-20 select-none animate-ice-flicker">
          C
        </span>
        
        <span className="text-[25vw] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-300 via-white to-slate-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] select-none relative z-10">
          Y
        </span>
      </div>

      {/* Flash overlay for transition */}
      <div className={`absolute inset-0 bg-cyan-400 mix-blend-overlay pointer-events-none transition-opacity duration-500 ease-out ${stage === 'zoom' ? 'opacity-30' : 'opacity-0'}`} />
    </div>
  );
};