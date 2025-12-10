
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
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#02040a] overflow-hidden cursor-none ${lightning ? 'bg-cyan-100' : ''} transition-colors duration-100`}>
      
      {/* "Welcome to" Stage */}
      <div className={`absolute transition-opacity duration-700 ${stage === 'text' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 tracking-[0.5em] uppercase animate-in zoom-in-90 duration-1000 font-sans">
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
              <div className="absolute inset-0 bg-cyan-400/30 blur-[60px] rounded-full"></div>

              <div className="flex items-end gap-1 select-none relative z-10">
                
                {/* The Lightning "I" */}
                <div className="relative animate-electricity filter drop-shadow-[0_0_20px_rgba(103,232,249,0.9)]">
                    <svg viewBox="0 0 45 80" className="w-[100px] h-[180px]">
                         <defs>
                            <linearGradient id="boltGradIntro" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ecfeff" />
                                <stop offset="40%" stopColor="#67e8f9" />
                                <stop offset="100%" stopColor="#0891b2" />
                            </linearGradient>
                        </defs>
                        <path 
                            d="M25 0 L0 35 H18 L8 80 L45 30 H25 L35 0 H25 Z" 
                            fill="url(#boltGradIntro)" 
                            stroke="#cffafe"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                         <path 
                            d="M25 2 L4 35 H20 L12 70 L40 30 H22 L32 2 Z" 
                            fill="white"
                            fillOpacity="0.2"
                        />
                    </svg>
                </div>

                {/* The "CY" */}
                <div className="font-['VT323'] text-[160px] leading-[0.6] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 tracking-tighter filter drop-shadow-[5px_5px_0_#06b6d4] flex transform translate-y-3">
                    <span className="animate-[pulse_3s_infinite]">C</span>
                    <span className="animate-[pulse_3s_infinite]" style={{ animationDelay: '0.2s' }}>Y</span>
                </div>
              </div>
          </div>
          
          <div className="text-cyan-300 font-['VT323'] text-3xl tracking-widest uppercase animate-pulse mt-8 drop-shadow-lg">
              System Online
          </div>
      </div>

    </div>
  );
};
