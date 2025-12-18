
import React from 'react';
import { Movie } from '../types';
import { Icons } from './Icon';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      onClick={() => onClick(movie)}
      className="group relative flex flex-col bg-[#0f1011] rounded-xl border border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)] cursor-pointer overflow-hidden h-auto"
    >
      {/* Poster Image Container - Vertical Aspect Ratio */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
            src={movie.image} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
             <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)] backdrop-blur-sm">
                 <Icons.Play size={32} fill="currentColor" className="ml-1" />
             </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
            {movie.isNew && (
                <span className="bg-cyan-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wide animate-pulse">
                    NEW
                </span>
            )}
             <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                {movie.year}
            </span>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-4 flex flex-col gap-1 relative z-10 bg-[#0f1011]">
         <div className="flex justify-between items-start">
             <h3 className="text-white font-bold leading-tight group-hover:text-cyan-400 transition-colors line-clamp-1 text-base" title={movie.title}>
                 {movie.title}
             </h3>
             <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20">
                 <Icons.Star size={10} fill="currentColor" />
                 {movie.rating}
             </div>
         </div>
         
         <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
             <span>{movie.genre}</span>
             <span className="flex items-center gap-1">
                 <Icons.Clock size={10} />
                 {movie.duration}
             </span>
         </div>
      </div>
    </div>
  );
};

export default MovieCard;
