
import React from 'react';
import { Movie } from '../types';
import { Icons } from './Icon';

interface MoviePlayerProps {
  movie: Movie;
  onBack: () => void;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({ movie, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-[#050505] min-h-screen text-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-500">
      
      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-white/5 sticky top-0 z-30">
        <button 
           onClick={onBack}
           className="flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors hover:-translate-x-1 duration-200 group"
        >
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
              <Icons.Back size={20} />
          </div>
          <span className="hidden sm:inline">Back to Movies</span>
        </button>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
             <Icons.Film size={16} />
             <span>Cinema Mode</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full max-w-[1400px] mx-auto p-4 md:p-8">
        
        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group mb-8">
             {movie.sourceType === 'mp4' ? (
                 <video 
                    src={movie.url} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain bg-black"
                    poster={movie.image}
                 >
                    Your browser does not support the video tag.
                 </video>
             ) : (
                 <iframe 
                    src={movie.url} 
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    title={movie.title}
                 />
             )}
        </div>

        {/* Movie Info */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Poster for aesthetics */}
            <div className="hidden md:block w-48 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <img src={movie.image} alt={movie.title} className="w-full h-auto" />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-black text-white tracking-tight">{movie.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="bg-white/10 text-white px-2 py-0.5 rounded border border-white/10">{movie.year}</span>
                        <span>{movie.duration}</span>
                        <span className="text-cyan-400">{movie.genre}</span>
                        <div className="flex items-center gap-1 text-yellow-500">
                             <Icons.Star size={14} fill="currentColor" />
                             {movie.rating}
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-white/10" />

                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                    {movie.description}
                </p>

                {movie.sourceType === 'mp4' && !movie.url && (
                    <div className="p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg text-yellow-500 text-sm">
                        <span className="font-bold">Missing Source:</span> This movie is set to play as MP4 but has no URL. Please edit <code>constants.ts</code> to add a valid .mp4 link.
                    </div>
                )}

                <div className="pt-4 flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors">
                        <Icons.Plus size={20} />
                        Add to Watchlist
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors">
                        <Icons.Share size={20} />
                        Share
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default MoviePlayer;
