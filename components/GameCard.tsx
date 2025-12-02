import React from 'react';
import { Game } from '../types';
import { Icons } from './Icon';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  // Large prop removed to enforce uniformity
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:border-cyan-400/40 flex flex-col justify-center items-center text-center p-5 aspect-[4/3] w-full"
    >
      {/* ICY Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-slate-950/50 to-blue-950/20 opacity-80" />
      
      {/* Top Frost Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />

      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 items-end">
        {game.isHot && (
          <span className="flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-orange-400 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
            <Icons.Hot size={10} /> HOT
          </span>
        )}
        {game.isNew && (
          <span className="flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
            <Icons.New size={10} /> NEW
          </span>
        )}
      </div>

      <div className="z-10 flex flex-col items-center gap-3 w-full">
        {/* Icon Container with Glow */}
        <div className="relative p-4 rounded-full bg-slate-800/50 border border-cyan-500/20 group-hover:bg-cyan-950/50 group-hover:border-cyan-400/50 transition-all duration-500 group-hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-md group-hover:blur-lg transition-all duration-500" />
            <Icons.Gamepad size={32} className="relative z-10 text-cyan-500/80 group-hover:text-cyan-200 transition-colors duration-300 drop-shadow-[0_0_2px_rgba(6,182,212,0.8)]" />
        </div>
        
        <h3 className="font-black text-white uppercase tracking-wider leading-tight w-full truncate px-1 text-base sm:text-lg group-hover:text-cyan-100 transition-colors drop-shadow-md">
            {game.title}
        </h3>
        
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium opacity-60 group-hover:opacity-100 transition-opacity">
             <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 group-hover:border-cyan-500/20">{game.category}</span>
             <span className="flex items-center gap-0.5"><Icons.Star size={10} className="text-yellow-500" /> {game.rating}</span>
        </div>
      </div>
      
      {/* Hover Background Shine */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Bottom Frost Reflection */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default GameCard;