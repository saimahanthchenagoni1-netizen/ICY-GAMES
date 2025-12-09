
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

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Action': return <Icons.Action size={20} />;
    case 'Racing': return <Icons.Racing size={20} />;
    case 'Puzzle': return <Icons.Puzzle size={20} />;
    case 'Sports': return <Icons.Trophy size={20} />;
    case 'Strategy': return <Icons.Brain size={20} />;
    default: return <Icons.Gamepad size={20} />;
  }
};

const GameCard: React.FC<GameCardProps> = ({ game, onClick, isFavorite, onToggleFavorite, style }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative h-[160px] flex flex-col justify-between bg-[#0f0f11] rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden btn-click-effect"
      style={style}
    >
      {/* Background Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/0 via-zinc-900/0 to-zinc-900/0 group-hover:from-zinc-800/40 group-hover:to-cyan-900/20 transition-all duration-500" />
      
      {/* Top: Metadata */}
      <div className="relative z-10 flex items-start justify-between">
         <div className="text-xs font-semibold text-zinc-500 group-hover:text-cyan-400 transition-colors uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-cyan-400 transition-colors" />
            {game.category}
         </div>
         
         <div className="flex gap-2">
           {game.isHot && (
             <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" title="Trending" />
           )}
         </div>
      </div>

      {/* Middle: Title */}
      <div className="relative z-10 mt-auto mb-4">
        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-cyan-100 transition-all duration-300 line-clamp-2 tracking-tight">
            {game.title}
        </h3>
      </div>

      {/* Bottom: Action Line */}
      <div className="relative z-10 flex items-center justify-between border-t border-zinc-800/50 pt-3 mt-1">
         <div className="text-zinc-500 group-hover:text-white transition-colors opacity-70 group-hover:opacity-100">
            <CategoryIcon category={game.category} />
         </div>

         <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-zinc-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 tracking-widest">
                 PLAY
             </span>
             <button 
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                className={`transition-all duration-200 transform hover:scale-110 ${isFavorite ? 'text-red-500' : 'text-zinc-600 hover:text-white'}`}
            >
                <Icons.Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
         </div>
      </div>
      
      {/* Soft Glow Corner Accent */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default GameCard;
