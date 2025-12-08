
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
      className="group relative bg-[#1a1b26] rounded-2xl overflow-hidden border border-white/5 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 cursor-pointer"
    >
      {/* Image Container */}
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b26] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Favorite Button (Visible on Hover) */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-20 ${isFavorite ? 'bg-red-500 text-white opacity-100' : 'bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500'}`}
        >
          <Icons.Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
           <div className="w-12 h-12 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-lg shadow-cyan-500/40 transform scale-50 group-hover:scale-100 transition-transform duration-300">
              <Icons.Play size={24} fill="currentColor" className="ml-1" />
           </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
            {game.isHot && (
                <span className="px-2 py-1 bg-orange-500 text-white text-[10px] font-bold uppercase rounded-md shadow-lg flex items-center gap-1">
                    <Icons.Hot size={10} /> HOT
                </span>
            )}
            {game.isNew && (
                <span className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold uppercase rounded-md shadow-lg flex items-center gap-1">
                    <Icons.New size={10} /> NEW
                </span>
            )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 relative z-10">
        <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-white truncate group-hover:text-cyan-400 transition-colors">{game.title}</h3>
            <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-1.5 py-0.5 rounded">
                <Icons.Star size={10} fill="currentColor" />
                {game.rating}
            </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span className="bg-white/5 px-2 py-1 rounded-md text-gray-400 group-hover:bg-white/10 transition-colors">
                {game.category}
            </span>
            <div className="flex items-center gap-1">
                <Icons.User size={10} />
                {game.plays}
            </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
