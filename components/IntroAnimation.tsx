
import React, { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'text' | 'logo' | 'zoom'>('text');
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    // Sequence
    const t1 = setTimeout(() => {
        setStage('logo');
        setLightning(true);
        setTimeout(() => setLightning(false), 150);
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
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#02040a] overflow-hidden cursor-none ${lightning ? 'bg-white' : ''} transition-colors duration-100`}>
      
      {/* "Welcome to" Stage */}
      <div className={`absolute transition-opacity duration-700 ${stage === 'text' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-500/80 tracking-[0.5em] uppercase animate-in zoom-in-90 duration-1000 font-sans">
           Welcome to
        </h1>
      </div>

      {/* Logo Stage */}
      <div className={`
          relative flex flex-col items-center justify-center gap-6
          transition-all duration-700 ease-[cubic-bezier(0.8,0,0.2,1)]
          ${stage === 'text' ? 'opacity-0 scale-50' : ''}
          ${stage === 'logo' ? 'opacity-100 scale-100' : ''}
          ${stage === 'zoom' ? 'scale-[20] opacity-0' : ''}
      `}>
          {/* Main Logo Container */}
          <div className="relative animate-bounce" style={{ animationDuration: '3s' }}>
              
              {/* Glow */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full"></div>

              <div className="flex items-end gap-1 select-none relative z-10">
                
                {/* The Lightning "I" */}
                <div className="relative animate-electricity filter drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                    <svg viewBox="0 0 60 100" className="w-[120px] h-[200px]">
                         <defs>
                            <linearGradient id="boltGradIntro" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="30%" stopColor="#a5f3fc" />
                                <stop offset="100%" stopColor="#0891b2" />
                            </linearGradient>
                        </defs>
                        <path 
                            d="M30 0 H55 V25 H45 V40 H60 V35 H70 V90 L40 70 V80 H25 V45 H35 V40 H20 V0 H30 Z" 
                            fill="url(#boltGradIntro)" 
                            stroke="#22d3ee"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                {/* The "CY" */}
                <div className="font-['VT323'] text-[160px] leading-[0.6] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 tracking-tighter filter drop-shadow-[5px_5px_0_#000] flex transform translate-y-3">
                    <span className="animate-[pulse_3s_infinite]">C</span>
                    <span className="animate-[pulse_3s_infinite]" style={{ animationDelay: '0.2s' }}>Y</span>
                </div>
              </div>
          </div>
          
          <div className="text-cyan-400 font-['VT323'] text-3xl tracking-widest uppercase animate-pulse mt-8">
              System Online
          </div>
      </div>

    </div>
  );
};
