import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';

interface HeroProps {
  onStartGaming: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartGaming }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["ICY.", "peace.", "cold."];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      // Typing Speed Logic
      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        // Word is complete, wait 5 seconds (approx) before deleting
        setTimeout(() => setIsDeleting(true), 4000); 
      } else if (isDeleting && text === '') {
        // Deletion complete, move to next word
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-10 min-h-[400px]">
       
       {/* Main Hero Content - Centered Text Only */}
       <div className="flex flex-col items-center justify-center mt-12 px-4 sm:px-12 w-full max-w-5xl mx-auto z-10">
            
            <div className="space-y-8 animate-in zoom-in-50 duration-700 text-center">
                <div className="relative min-h-[240px] flex flex-col justify-center">
                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter leading-none select-none pb-8">
                        Welcome to <br />
                        <span 
                            className="relative inline-block mt-2 px-4"
                            style={{
                                color: 'transparent',
                                // Realistic Snow Cap Gradient
                                backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 45%, #67e8f9 45%, #06b6d4 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                // Thick 3D Shadows
                                textShadow: `
                                    0px 2px 0px #22d3ee,
                                    0px 4px 0px #22d3ee,
                                    0px 6px 0px #0891b2,
                                    0px 8px 0px #0891b2,
                                    0px 10px 0px #155e75,
                                    0px 12px 0px #155e75,
                                    0px 20px 20px rgba(0,0,0,0.6)
                                `,
                                filter: 'drop-shadow(0 0 25px rgba(34,211,238,0.3))'
                            }}
                        >
                            {text}
                            {/* Cursor */}
                            <span className="absolute -right-4 top-0 h-full w-2 md:w-4 bg-cyan-400 animate-pulse rounded-full opacity-50" style={{ textShadow: 'none', filter: 'none' }}></span>
                        </span>
                    </h1>
                    <p className="mt-4 text-xl sm:text-2xl text-gray-500 font-medium tracking-wide">Game on!</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
                    <button 
                        onClick={onStartGaming}
                        className="px-10 py-5 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-2xl shadow-[0_6px_0_#1d4ed8] active:shadow-none active:translate-y-[6px] transition-all uppercase tracking-widest text-lg group relative overflow-hidden"
                    >
                        <span className="relative z-10">Start Gaming</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                    
                    <a 
                       href="https://discord.gg/sj8fPcuWgr" 
                       target="_blank" 
                       className="px-8 py-5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-2xl shadow-[0_6px_0_#404EED] active:shadow-none active:translate-y-[6px] transition-all flex items-center gap-3 group"
                    >
                         <Icons.Gamepad size={28} className="group-hover:rotate-12 transition-transform" />
                         <span className="uppercase tracking-wider">Discord</span>
                    </a>
                </div>
            </div>

       </div>
    </div>
  );
};

export default Hero;