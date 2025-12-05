
import React, { useState, useEffect, useRef } from 'react';
import { Game } from '../types';
import { Icons } from './Icon';

interface HeroProps {
  featuredGames: Game[];
  carouselGames: Game[];
  onPlay: (game: Game) => void;
  onStartGaming: () => void;
}

const Hero: React.FC<HeroProps> = ({ featuredGames, carouselGames, onPlay, onStartGaming }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Typewriter State
  const phrases = ["ICY Games.", "Pure Coolness.", "Instant Play."];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typewriter Effect
  useEffect(() => {
    const handleTyping = () => {
      const currentPhraseIndex = phraseIndex % phrases.length;
      const fullPhrase = phrases[currentPhraseIndex];

      if (isDeleting) {
        setDisplayedText(prev => prev.substring(0, prev.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayedText(prev => fullPhrase.substring(0, prev.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayedText === fullPhrase) {
        setTypingSpeed(2000); // Pause at end of phrase
        setIsDeleting(true);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setPhraseIndex(prev => prev + 1);
        setTypingSpeed(500); // Pause before typing next
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, typingSpeed, phrases]);

  // Featured Game Slider Logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredGames.length);
    }, 5000); // 5 seconds

    return () => clearInterval(slideInterval);
  }, [featuredGames.length]);

  const featuredGame = featuredGames[currentIndex];

  // Carousel Scroll Logic
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 200; // Approx width of one item + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full min-h-[450px] bg-gradient-to-br from-[#0f172a] via-[#050505] to-[#020617] rounded-[30px] overflow-hidden border border-white/5 p-8 sm:p-12 shadow-2xl">
      
      {/* Background Stars/Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col justify-center pt-4 lg:pt-0">
            
            {/* Top Carousel - Relocated, Centered, Wider with Arrows */}
            <div className="w-full flex justify-center mb-10">
               <div className="relative w-full max-w-2xl flex items-center group/carousel">
                 
                 {/* Left Arrow */}
                 <button 
                   onClick={() => scroll('left')}
                   className="absolute -left-4 sm:-left-6 z-20 p-2 bg-black/50 hover:bg-cyan-500/80 text-white rounded-full backdrop-blur-md border border-white/10 shadow-lg transition-all active:scale-95 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
                 >
                   <Icons.ChevronLeft size={20} />
                 </button>

                 <div ref={scrollRef} className="flex gap-3 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 overflow-x-auto hide-scrollbar w-full mask-linear-fade scroll-smooth">
                   {carouselGames.map(game => (
                      <button 
                        key={game.id}
                        onClick={() => onPlay(game)}
                        className="w-40 h-20 shrink-0 rounded-xl overflow-hidden relative group transition-all hover:scale-105 ring-1 ring-white/10 hover:ring-cyan-400 bg-[#1a1b26] flex items-center justify-center px-2 hover-wiggle shadow-lg"
                      >
                          <span className="text-xs font-bold text-gray-300 group-hover:text-white text-center leading-tight z-10">{game.title}</span>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                   ))}
                 </div>

                 {/* Right Arrow */}
                 <button 
                   onClick={() => scroll('right')}
                   className="absolute -right-4 sm:-right-6 z-20 p-2 bg-black/50 hover:bg-cyan-500/80 text-white rounded-full backdrop-blur-md border border-white/10 shadow-lg transition-all active:scale-95 opacity-0 group-hover/carousel:opacity-100"
                 >
                   <Icons.ChevronRight size={20} />
                 </button>

               </div>
            </div>

            <div className="space-y-6 mb-8 text-center lg:text-left">
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight min-h-[1.2em]">
                    Welcome to <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                        {displayedText}
                        <span className="animate-pulse text-cyan-400 ml-1">|</span>
                    </span>
                </h1>
                <p className="text-xl text-gray-400 font-medium tracking-wide">
                    Game on!
                </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button 
                    onClick={onStartGaming}
                    className="hover-wiggle relative overflow-hidden px-12 py-5 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-black rounded-2xl shadow-[0_6px_0_#1e3a8a,0_15px_20px_rgba(0,0,0,0.4)] transition-all active:shadow-[0_0_0_#1e3a8a] active:translate-y-[6px] hover:brightness-110 tracking-widest uppercase border-t-2 border-blue-400 group"
                >
                    <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                        START GAMING <Icons.Play size={24} className="fill-current" />
                    </span>
                    {/* Diamond Reflection - Shown on Hover */}
                    <div className="absolute inset-0 -top-[20%] -bottom-[20%] bg-gradient-to-r from-transparent via-white/50 to-transparent w-16 skew-x-[-25deg] opacity-0 group-hover:opacity-60 group-hover:animate-diamond-shine mix-blend-overlay" />
                </button>
            </div>
        </div>

        {/* Right Featured Card (Carousel) */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
            <div className="relative group cursor-pointer w-full max-w-sm" onClick={() => onPlay(featuredGame)}>
                {/* Glow effect behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[22px] blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative aspect-[3/4] bg-[#0b0c15] rounded-[20px] overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center p-8">
                    {/* Abstract Background for Featured Card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    
                    {/* Animated Content */}
                    <div key={currentIndex} className="relative z-10 flex flex-col items-center gap-6 w-full animate-in fade-in slide-in-from-right-4 duration-500">
                         <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 transform group-hover:scale-110 transition-transform duration-300">
                             <Icons.Gamepad size={40} className="text-white" />
                         </div>

                         <div>
                             <h3 className="text-3xl font-black text-white uppercase italic tracking-wider mb-2 leading-none break-words line-clamp-2 min-h-[4rem] flex items-center justify-center">
                                {featuredGame.title}
                             </h3>
                             <p className="text-sm text-cyan-400 font-bold uppercase tracking-widest">{featuredGame.category}</p>
                         </div>
                         
                         <button 
                            className="hover-wiggle relative overflow-hidden mt-6 px-10 py-4 bg-gradient-to-b from-white to-gray-200 text-black font-black rounded-2xl shadow-[0_6px_0_#94a3b8,0_15px_20px_rgba(0,0,0,0.3)] transition-all active:shadow-[0_0_0_#94a3b8] active:translate-y-[6px] hover:brightness-110 tracking-widest uppercase border-t-2 border-white group"
                            onClick={(e) => {
                                e.stopPropagation();
                                onPlay(featuredGame);
                            }}
                         >
                            <span className="relative z-10">PLAY NOW</span>
                            {/* Diamond Reflection - Shown on Hover */}
                            <div className="absolute inset-0 -top-[20%] -bottom-[20%] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent w-12 skew-x-[-25deg] opacity-0 group-hover:opacity-100 group-hover:animate-diamond-shine" />
                         </button>
                    </div>

                    {/* Slider Indicators */}
                    <div className="absolute bottom-6 flex gap-2">
                        {featuredGames.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-cyan-400 w-4' : 'bg-white/20'}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
