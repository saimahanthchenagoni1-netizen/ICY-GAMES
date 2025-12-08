import React, { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'text' | 'logo' | 'zoom'>('text');
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    // 0ms: Show "Welcome to"
    // 1000ms: Switch to Logo + "Icy Games" with Lightning Flash
    // 3000ms: Start Zoom
    // 3600ms: Complete

    const t1 = setTimeout(() => {
        setStage('logo');
        setLightning(true); // Trigger flash
        setTimeout(() => setLightning(false), 200); // Quick flash end
    }, 1200);

    const t2 = setTimeout(() => {
        setStage('zoom');
    }, 3200);

    const t3 = setTimeout(() => {
        onComplete();
    }, 3800);

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden cursor-none ${lightning ? 'bg-white' : ''} transition-colors duration-75`}>
      
      {/* "Welcome to" Stage */}
      <div className={`absolute transition-opacity duration-700 ${stage === 'text' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase animate-in zoom-in-90 duration-1000">
           Welcome to
        </h1>
      </div>

      {/* Logo Stage */}
      <div className={`
          relative flex flex-col items-center justify-center gap-8
          transition-all duration-700 ease-[cubic-bezier(0.8,0,0.2,1)]
          ${stage === 'text' ? 'opacity-0 scale-50' : ''}
          ${stage === 'logo' ? 'opacity-100 scale-100' : ''}
          ${stage === 'zoom' ? 'scale-[50] opacity-0' : ''}
      `}>
          {/* Logo Container */}
          <div className="relative">
              <div className="w-40 h-40 md:w-64 md:h-64 bg-cyan-200 rounded-[3rem] flex items-center justify-center shadow-[0_0_100px_rgba(34,211,238,0.6)] animate-pulse relative z-10">
                  <svg viewBox="0 0 512 512" className="w-24 h-24 md:w-40 md:h-40 text-black fill-current drop-shadow-xl">
                      <path d="M320 32L144 288h112l-48 192L400 192H288L320 32z" stroke="currentColor" strokeWidth="20" strokeLinejoin="round"/>
                  </svg>
              </div>
              
              {/* Lightning Decorations behind logo */}
              {stage === 'logo' && (
                  <>
                    <div className="absolute -top-20 -left-20 text-yellow-400 animate-flash opacity-0" style={{ animationDelay: '0.1s' }}>
                       <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    </div>
                    <div className="absolute -bottom-10 -right-20 text-cyan-400 animate-flash opacity-0" style={{ animationDelay: '0.3s' }}>
                       <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    </div>
                  </>
              )}
          </div>

          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">
             ICY GAMES
          </h1>
      </div>

    </div>
  );
};