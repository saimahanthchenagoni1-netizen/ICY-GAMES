
import React from 'react';
import { Game } from '../types';
import { Icons } from './Icon';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#0f1016] border border-white/5 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 flex flex-col items-center justify-center text-center aspect-[4/3] w-full"
    >
      {/* Abstract Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c2e] to-[#050505] opacity-100 transition-all duration-700 group-hover:scale-125" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top Frost Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-10 opacity-50" />

      {/* Top Right: Favorite & Badges */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 items-end">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className={`p-2 rounded-full transition-all duration-300 backdrop-blur-sm ${
            isFavorite 
              ? 'text-red-500 bg-red-500/10 scale-110 shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
              : 'text-white/30 hover:text-red-400 hover:bg-white/5 hover:scale-110'
          }`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Icons.Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        {game.isHot && (
          <span className="flex items-center gap-1 rounded-full bg-orange-500/10 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-orange-400 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
            <Icons.Hot size={10} /> HOT
          </span>
        )}
        {game.isNew && (
          <span className="flex items-center gap-1 rounded-full bg-cyan-500/10 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
            <Icons.New size={10} /> NEW
          </span>
        )}
      </div>

      {/* Main Content - Centered Text */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 gap-3 transform transition-transform duration-500 group-hover:scale-105">
        
        {/* Category Pill */}
        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold tracking-widest uppercase text-cyan-500/70 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all">
           {game.category}
        </span>

        {/* Title */}
        <h3 className="font-black text-white text-xl sm:text-2xl uppercase tracking-tighter leading-none w-full break-words drop-shadow-2xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-cyan-200 transition-all">
            {game.title}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 text-white/20 text-xs font-medium group-hover:text-yellow-400/80 transition-colors">
             <Icons.Star size={10} fill="currentColor" /> {game.rating}
        </div>
      </div>
      
      {/* Bottom Glow */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default GameCard;
