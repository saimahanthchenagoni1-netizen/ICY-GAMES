
import React from 'react';
import { Icons } from './Icon';
import { GAMES } from '../constants';

interface HeroProps {
  onStartGaming: () => void;
}

// Select specific "Hot" games for the strip
const STRIP_GAMES = GAMES.filter(g => g.isHot || g.rating > 4.7).slice(0, 5);
// Featured game for the right side
const FEATURED_GAME = GAMES.find(g => g.id === 'slope') || GAMES[0];

const Hero: React.FC<HeroProps> = ({ onStartGaming }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-start pt-8 pb-12 px-8">
       
       {/* TOP CENTER: Floating Game Strip (Carousel) - Text Only */}
       <div className="relative z-20 mb-16 animate-in slide-in-from-top-10 duration-700 w-full max-w-4xl flex justify-center hidden md:flex">
           <div className="absolute inset-0 bg-cyan-400/10 blur-3xl rounded-full"></div>
           <div className="relative bg-[#0f1016]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center justify-center gap-2 shadow-2xl">
                {STRIP_GAMES.map((game) => (
                    <div 
                        key={game.id} 
                        className="group relative w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 bg-[#1e293b] border border-white/5 flex items-center justify-center p-2" 
                        onClick={onStartGaming}
                    >
                        <div className="z-10 text-center">
                            <span className="text-[10px] font-bold text-gray-400 group-hover:text-cyan-400 transition-colors leading-tight line-clamp-2 uppercase tracking-wide font-['VT323'] text-lg">
                                {game.title}
                            </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-transparent group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
                    </div>
                ))}
                <div className="hidden md:flex items-center justify-center w-8 h-20 text-gray-500">
                    <Icons.ChevronRight size={16} />
                </div>
           </div>
       </div>

       {/* MAIN CONTENT ROW */}
       <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-20 max-w-6xl mt-4">
            
            {/* LEFT: Logo & Actions */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-in slide-in-from-left-10 duration-700 delay-100">
                
                <div className="flex flex-col items-center lg:items-start">
                    
                    {/* BIG ICY LOGO */}
                    <div className="relative group cursor-default p-4">
                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-cyan-300/20 blur-[80px] rounded-full opacity-60 group-hover:opacity-90 transition-opacity duration-1000 animate-pulse"></div>
                        
                        <div className="flex items-end gap-2 select-none relative z-10">
                            
                            {/* LIGHTNING 'I' - NEW SHARP BOLT */}
                            <div className="relative animate-electricity filter drop-shadow-[0_0_25px_rgba(103,232,249,0.8)]">
                                <svg viewBox="0 0 45 80" className="w-[100px] h-[180px] md:w-[130px] md:h-[220px]">
                                    <defs>
                                        <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ecfeff" />
                                            <stop offset="40%" stopColor="#67e8f9" />
                                            <stop offset="100%" stopColor="#0891b2" />
                                        </linearGradient>
                                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                            <feGaussianBlur stdDeviation="2" result="blur" />
                                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                        </filter>
                                    </defs>
                                    {/* Sharp 3D Style Bolt */}
                                    <path 
                                        d="M25 0 L0 35 H18 L8 80 L45 30 H25 L35 0 H25 Z" 
                                        fill="url(#boltGrad)" 
                                        stroke="#cffafe"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                        className="drop-shadow-lg"
                                    />
                                    {/* Inner Highlight for 3D effect */}
                                    <path 
                                        d="M25 2 L4 35 H20 L12 70 L40 30 H22 L32 2 Z" 
                                        fill="white"
                                        fillOpacity="0.2"
                                    />
                                </svg>
                                
                                {/* Orbiting Sparks */}
                                <div className="absolute top-1/4 -left-4 w-1.5 h-1.5 bg-white shadow-[0_0_10px_white] animate-[spark_2s_infinite]"></div>
                                <div className="absolute bottom-1/4 -right-4 w-2 h-2 bg-cyan-200 shadow-[0_0_15px_cyan] animate-[spark_3s_infinite]" style={{ animationDelay: '0.5s' }}></div>
                            </div>

                            {/* PIXEL 'CY' */}
                            <div className="font-['VT323'] text-[160px] md:text-[220px] leading-[0.6] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 tracking-tighter filter drop-shadow-[5px_5px_0_#06b6d4] flex transform translate-y-3">
                                <span>C</span>
                                <span>Y</span>
                            </div>
                        </div>
                        
                        {/* Tagline */}
                        <div className="absolute -bottom-8 left-2 flex items-center gap-3">
                            <div className="h-[2px] w-12 bg-cyan-400/50"></div>
                            <span className="text-cyan-300 font-['VT323'] text-xl tracking-[0.3em] uppercase glow-text shadow-cyan-500">
                                UNBLOCKED
                            </span>
                            <div className="h-[2px] w-12 bg-cyan-400/50"></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 flex flex-col items-center lg:items-start pt-4">
                    <p className="text-xl text-cyan-100/80 font-medium max-w-lg font-['VT323'] text-2xl tracking-wide leading-relaxed">
                        Play thousands of games instantly. <br/>
                        <span className="text-white drop-shadow-[0_0_10px_rgba(103,232,249,0.5)]">No downloads. Pure speed.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                        <button 
                            onClick={onStartGaming}
                            className="btn-icy w-64 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] tracking-wider text-xl uppercase font-['VT323'] border border-cyan-200/20"
                        >
                            START GAMING
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT: Featured Card */}
            <div className="relative group animate-in slide-in-from-right-10 duration-700 delay-200 mt-8 lg:mt-0 hidden lg:block">
                 {/* Glow behind */}
                 <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                 
                 <div className="relative w-96 bg-[#0f1016] rounded-3xl p-4 border border-white/10 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105 cursor-pointer" onClick={onStartGaming}>
                     
                     <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/5 bg-gradient-to-br from-[#111] to-[#050505] flex items-center justify-center p-6 group-hover:border-cyan-500/30 transition-colors">
                         <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(34,211,238,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                         
                         {/* Game Title Art */}
                         <div className="relative z-10 text-center">
                             <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 font-mono">Featured</div>
                             <h3 className="text-6xl font-black text-white tracking-tighter uppercase italic drop-shadow-lg font-['VT323'] animate-pulse">
                                 {FEATURED_GAME.title}
                             </h3>
                         </div>
                     </div>

                     <div className="mt-4 flex items-center justify-between px-2">
                         <div className="flex text-yellow-500">
                             {[...Array(5)].map((_, i) => <Icons.Star key={i} size={16} fill="currentColor" />)}
                         </div>
                         <span className="text-white font-bold tracking-wide text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">PLAY NOW</span>
                     </div>
                 </div>
            </div>

       </div>
    </div>
  );
};

export default Hero;
