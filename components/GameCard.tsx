import React, { useState } from 'react';
import { Game } from '../types';
import { Icons } from './Icon';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, isFavorite, onToggleFavorite }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:border-cyan-400/40 flex flex-col justify-end text-center aspect-[4/3] w-full"
    >
      {/* Background Image with Fallback */}
      {!imgError ? (
        <img 
          src={game.image} 
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        // Fallback Gradient if image fails
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
             <div className="text-slate-700 opacity-20 transform scale-150">
                 <Icons.Gamepad size={64} />
             </div>
        </div>
      )}

      {/* ICY Background Overlay - Gradient for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
      
      {/* Top Frost Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent z-10" />

      {/* Top Right: Favorite & Badges */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 items-end">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className={`p-2 rounded-full transition-all duration-300 backdrop-blur-sm ${
            isFavorite 
              ? 'text-red-500 bg-red-500/10 scale-110 shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
              : 'text-white/70 bg-black/40 hover:text-red-400 hover:bg-black/60 hover:scale-110'
          }`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Icons.Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        {game.isHot && (
          <span className="flex items-center gap-1 rounded-full bg-orange-500/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.3)]">
            <Icons.Hot size={10} /> HOT
          </span>
        )}
        {game.isNew && (
          <span className="flex items-center gap-1 rounded-full bg-cyan-500/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white border border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <Icons.New size={10} /> NEW
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-end w-full gap-2 p-4 pt-12">
        
        <h3 className="font-black text-white uppercase tracking-wider leading-tight w-full text-lg sm:text-xl group-hover:text-cyan-200 transition-colors drop-shadow-lg break-words text-shadow-sm">
            {game.title}
        </h3>
        
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-gray-300 font-medium">
             <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 group-hover:border-cyan-500/20 group-hover:bg-cyan-950/40 transition-colors">
               {game.category}
             </span>
             <span className="flex items-center gap-1 text-yellow-400 drop-shadow-md">
               <Icons.Star size={14} fill="currentColor" /> {game.rating}
             </span>
        </div>
      </div>
      
      {/* Bottom Frost Reflection */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default GameCard;