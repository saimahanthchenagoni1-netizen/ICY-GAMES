
import React from 'react';
import { Game } from '../types';
import { Icons } from './Icon';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  style?: React.CSSProperties;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, isFavorite, onToggleFavorite, style }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative bg-[#1a1b26] rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:z-10 hover:scale-[1.03]"
      style={style}
    >
      {/* Image Container - Fills the card */}
      <div className="w-full h-full relative">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500" 
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
           <h3 className="text-white font-bold text-sm sm:text-base leading-tight mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{game.title}</h3>
           
           <div className="w-10 h-10 rounded-full bg-cyan-500 text-black flex items-center justify-center transform scale-50 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-cyan-500/50">
              <Icons.Play size={20} fill="currentColor" className="ml-0.5" />
           </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex gap-1 z-20">
            {game.isHot && (
                <span className="p-1 bg-orange-500 text-white rounded-md shadow-lg" title="Hot Game">
                    <Icons.Hot size={12} fill="currentColor" />
                </span>
            )}
            {game.isNew && (
                <span className="p-1 bg-green-500 text-white rounded-md shadow-lg" title="New Game">
                    <Icons.New size={12} fill="currentColor" />
                </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
