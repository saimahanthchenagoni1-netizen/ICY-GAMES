
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
    <div className="relative w-full flex flex-col items-center justify-start pt-4 pb-12 px-8">
       
       {/* TOP CENTER: Floating Game Strip (Carousel) */}
       <div className="relative z-20 mb-16 animate-in slide-in-from-top-10 duration-700 w-full max-w-4xl flex justify-center">
           <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
           <div className="relative bg-[#0f1016]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center justify-center gap-2 shadow-2xl">
                {STRIP_GAMES.map((game) => (
                    <div key={game.id} className="group relative w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105" onClick={onStartGaming}>
                        <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                        {/* Hover Title */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[8px] md:text-[10px] text-white text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {game.title}
                        </div>
                    </div>
                ))}
                {/* Arrow hint */}
                <div className="hidden md:flex items-center justify-center w-8 h-20 text-gray-500">
                    <Icons.ChevronRight size={16} />
                </div>
           </div>
       </div>

       {/* MAIN CONTENT ROW */}
       <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 max-w-6xl">
            
            {/* LEFT: Text & Buttons */}
            <div className="flex-1 text-center lg:text-left space-y-6 animate-in slide-in-from-left-10 duration-700 delay-100">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">
                    Welcome to <br />
                    <span className="relative">
                        <span className="absolute -inset-1 bg-cyan-500/20 blur-xl"></span>
                        <span className="relative text-white">ICY</span>
                    </span>
                </h1>
                
                <div className="h-1 w-20 bg-blue-500 rounded-full mx-auto lg:mx-0"></div>

                <p className="text-xl text-gray-300 font-medium">Game on!</p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                    <button 
                        onClick={onStartGaming}
                        className="btn-icy w-48 py-4 bg-[#3b82f6] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 tracking-wider text-sm uppercase"
                    >
                        START GAMING
                    </button>

                    <div className="flex gap-2">
                        {/* Twitter Button Removed */}
                        <a href="https://discord.gg/sj8fPcuWgr" target="_blank" className="p-4 bg-[#1e293b] rounded-xl hover:bg-[#5865F2] transition-colors border border-white/5 text-gray-400 hover:text-white group">
                            <Icons.Gamepad size={20} className="group-hover:animate-bounce" />
                        </a>
                    </div>
                </div>
            </div>

            {/* RIGHT: Featured Card (Slope) */}
            <div className="relative group animate-in slide-in-from-right-10 duration-700 delay-200">
                 {/* Glow behind */}
                 <div className="absolute -inset-4 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                 
                 <div className="relative w-64 md:w-80 bg-[#0f1016] rounded-3xl p-3 border border-white/10 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105 cursor-pointer" onClick={onStartGaming}>
                     <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-white/5">
                         <img src={FEATURED_GAME.image} alt="Featured" className="w-full h-full object-cover" />
                         
                         {/* Title Overlay inside image styling */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                         <div className="absolute top-4 left-0 right-0 text-center">
                            <h3 className="text-3xl font-black text-green-400 tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase italic stroke-black">
                                {FEATURED_GAME.title}
                            </h3>
                         </div>
                     </div>

                     {/* Bottom button-like label */}
                     <div className="mt-3 bg-[#1e293b] rounded-xl py-3 text-center border border-white/5 group-hover:bg-[#334155] transition-colors">
                         <span className="text-white font-bold tracking-wide">{FEATURED_GAME.title}</span>
                     </div>
                 </div>
            </div>

       </div>
    </div>
  );
};

export default Hero;
