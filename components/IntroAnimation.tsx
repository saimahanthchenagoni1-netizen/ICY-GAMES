
import React, { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'initial' | 'appear' | 'focus' | 'zoom'>('initial');

  useEffect(() => {
    // Timeline of animation events
    const timers = [
      setTimeout(() => setStage('appear'), 100),   // Fade in text
      setTimeout(() => setStage('focus'), 2000),   // Fade out I and Y
      setTimeout(() => setStage('zoom'), 3000),    // Zoom into C
      setTimeout(onComplete, 4000)                 // Unmount
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden">
      <div className="relative flex items-center justify-center">
        
        {/* Letter I */}
        <h1 
          className={`
            text-9xl sm:text-[12rem] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500
            transition-all duration-1000 ease-in-out transform
            ${stage === 'initial' ? 'opacity-0 translate-y-10 scale-90' : ''}
            ${stage === 'appear' ? 'opacity-100 translate-y-0 scale-100' : ''}
            ${stage === 'focus' ? 'opacity-0 -translate-x-20 blur-md' : ''}
            ${stage === 'zoom' ? 'opacity-0' : ''}
          `}
        >
          I
        </h1>

        {/* Letter C (The Focus) */}
        <h1 
          className={`
            text-9xl sm:text-[12rem] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500
            transition-all duration-[1500ms] ease-in-out transform origin-center z-10
            ${stage === 'initial' ? 'opacity-0 translate-y-10 scale-90' : ''}
            ${stage === 'appear' ? 'opacity-100 translate-y-0 scale-100' : ''}
            ${stage === 'focus' ? 'scale-125 drop-shadow-[0_0_50px_rgba(34,211,238,0.8)]' : ''}
            ${stage === 'zoom' ? 'scale-[100] opacity-0 duration-1000 ease-in' : ''}
          `}
        >
          C
        </h1>

        {/* Letter Y */}
        <h1 
          className={`
            text-9xl sm:text-[12rem] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500
            transition-all duration-1000 ease-in-out transform
            ${stage === 'initial' ? 'opacity-0 translate-y-10 scale-90' : ''}
            ${stage === 'appear' ? 'opacity-100 translate-y-0 scale-100' : ''}
            ${stage === 'focus' ? 'opacity-0 translate-x-20 blur-md' : ''}
            ${stage === 'zoom' ? 'opacity-0' : ''}
          `}
        >
          Y
        </h1>

      </div>
      
      {/* Flash effect overlay during zoom */}
      <div className={`absolute inset-0 bg-cyan-100 pointer-events-none transition-opacity duration-1000 ${stage === 'zoom' ? 'opacity-30' : 'opacity-0'}`} />
    </div>
  );
};
