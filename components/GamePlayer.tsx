
import React, { useEffect, useRef, useState } from 'react';
import { Game } from '../types';
import { Icons } from './Icon';

interface GamePlayerProps {
  game: Game;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

// Emulator Component
const EmulatorGame = ({ game }: { game: Game }) => {
  useEffect(() => {
    if (!game.romUrl) return;

    // Set global EJS variables
    (window as any).EJS_player = "#game";
    (window as any).EJS_core = "gba";
    (window as any).EJS_pathtodata = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data";
    (window as any).EJS_gameUrl = game.romUrl;
    (window as any).EJS_startOnLoaded = true;
    (window as any).EJS_color = "#000000";

    // Create script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data/loader.js";
    script.async = true;
    
    document.body.appendChild(script);

    return () => {
      // Cleanup script tag if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [game]);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center transform-gpu">
       <div id="game" className="w-full h-full"></div>
    </div>
  );
};

// Fallback if no ROM provided
const PlaceholderGame = ({ title }: { title: string }) => (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#0f172a] text-white">
        <div className="animate-spin mb-4 text-blue-500">
             <Icons.Gamepad size={48} />
        </div>
        <h2 className="text-xl font-bold">Loading {title}...</h2>
        <p className="text-slate-400 mt-2">Connecting to game server...</p>
    </div>
);

// External App Launcher
const ExternalAppLauncher = ({ game }: { game: Game }) => (
  <div className="flex flex-col items-center justify-center w-full h-full bg-[#050505] relative overflow-hidden transform-gpu">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505]" />

      <div className="relative z-10 flex flex-col items-center text-center p-8 animate-in fade-in zoom-in duration-500">
        
        {/* Large Text Title Icon */}
        <div className="w-24 h-24 rounded-2xl shadow-2xl mb-6 bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center border border-white/10 ring-4 ring-white/5">
            <span className="text-4xl font-black text-white uppercase">{game.title.charAt(0)}</span>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-3">{game.title}</h2>
        <p className="text-gray-300 mb-8 max-w-md">
          {game.description}
        </p>

        <a 
          href={game.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/20"
        >
          Launch Application
          <Icons.ExternalLink size={20} />
        </a>
        
        <p className="mt-4 text-xs text-gray-500">
          Opens in a new tab
        </p>
      </div>
  </div>
);

const ReviewsSection = () => {
    return (
        <div className="mt-8 bg-[#111] border border-white/5 rounded-2xl p-6 animate-in slide-in-from-bottom-10 duration-700">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Icons.MessageSquare size={18} className="text-cyan-400" />
                Player Reviews
            </h3>
            
            <div className="space-y-4">
                {[
                    { user: "SpeedRunner99", text: "This game is absolutely insane! The graphics are next level.", rating: 5, time: "2m ago" },
                    { user: "RetroGamer", text: "Classic feel, works smoothly on my browser.", rating: 5, time: "15m ago" },
                    { user: "NoobMaster", text: "A bit hard at first but super addicting.", rating: 4, time: "1h ago" }
                ].map((review, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4 flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                             {review.user.charAt(0)}
                         </div>
                         <div className="flex-1">
                             <div className="flex justify-between items-start">
                                 <div className="font-bold text-white text-sm">{review.user}</div>
                                 <div className="text-[10px] text-gray-500">{review.time}</div>
                             </div>
                             <div className="flex text-yellow-500 my-1">
                                 {[...Array(5)].map((_, idx) => (
                                     <Icons.Star key={idx} size={12} fill={idx < review.rating ? "currentColor" : "none"} className={idx < review.rating ? "" : "text-gray-700"} />
                                 ))}
                             </div>
                             <p className="text-gray-300 text-sm">{review.text}</p>
                         </div>
                    </div>
                ))}
            </div>
            
            <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl text-sm font-medium transition-colors border border-dashed border-white/10">
                Write a Review
            </button>
        </div>
    );
};

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onBack, isFavorite, onToggleFavorite }) => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavAnimating, setIsFavAnimating] = useState(false);

  // Sync state with actual fullscreen changes
  useEffect(() => {
    const handleChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleRefresh = () => {
      // Force re-render of iframe
      const current = gameContainerRef.current;
      if (current) {
          const iframe = current.querySelector('iframe');
          if (iframe) iframe.src = iframe.src;
          if (iframe && iframe.srcdoc) iframe.srcdoc = iframe.srcdoc;
      }
  };

  const handleFavoriteClick = () => {
      onToggleFavorite();
      setIsFavAnimating(true);
      setTimeout(() => setIsFavAnimating(false), 300);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] min-h-screen text-white overflow-y-auto">
      {/* Game Nav */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 shadow-lg">
        <button 
           onClick={onBack}
           className="flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors hover:-translate-x-1 duration-200 group"
        >
          <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
              <Icons.Back size={18} />
          </div>
          <span className="hidden sm:inline">Back to Games</span>
        </button>
        
        <h1 className="text-lg font-bold text-white hidden md:block tracking-wide opacity-80">{game.title}</h1>
        
        <div className="flex items-center gap-3">
             <button onClick={handleRefresh} className="p-2 text-gray-400 hover:text-white transition-colors" title="Reload Game">
                 <Icons.Rotate size={18} />
             </button>
        </div>
      </div>

      {/* Main Content Container - Centered with margins */}
      <div className="flex-1 flex flex-col p-4 md:p-8 w-full max-w-[1200px] mx-auto"> 
        
        <div className="flex flex-col gap-6">
          
          {/* The Game Container Area */}
          <div className="relative group rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black">
              <div 
                ref={gameContainerRef}
                className="w-full aspect-video bg-black relative z-10 transform-gpu"
              >
                {game.category === 'Apps' ? (
                   <ExternalAppLauncher game={game} />
                ) : game.customHtml ? (
                   <iframe 
                     srcDoc={game.customHtml} 
                     className="w-full h-full border-0 block"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; gamepad; microphone; camera; midi; payment"
                     sandbox="allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                     title={game.title}
                     loading="eager"
                   />
                ) : game.romUrl ? (
                   <EmulatorGame game={game} /> 
                ) : game.url ? (
                   <iframe 
                     src={game.url} 
                     className="w-full h-full border-0 block"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; gamepad; microphone; camera; midi; payment"
                     sandbox="allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                     title={game.title}
                     loading="eager"
                   />
                ) : (
                   <PlaceholderGame title={game.title} />
                )}
              </div>
          </div>

          {/* Controls & Details Bar */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Left Info */}
              <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-black text-white tracking-tight">{game.title}</h2>
                      {game.isHot && <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-500/20 uppercase tracking-wider">HOT</span>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded-md border border-white/5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                          {game.category}
                      </span>
                      <span className="flex items-center gap-1">
                          <Icons.Star size={14} className="text-yellow-500 fill-current" />
                          {game.rating}
                      </span>
                      <span>{game.plays} plays</span>
                  </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                   <button 
                       onClick={toggleFullScreen}
                       className="btn-icy flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-sm tracking-wide"
                   >
                       {isFullscreen ? <Icons.Close size={18} /> : <Icons.Maximize size={18} />}
                       <span>{isFullscreen ? 'EXIT FULL SCREEN' : 'FULL SCREEN'}</span>
                   </button>
                   
                   <button 
                        onClick={handleFavoriteClick}
                        className={`p-3.5 rounded-xl border transition-all duration-300 relative overflow-hidden group
                            ${isFavorite 
                                ? 'bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20' 
                                : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-400 hover:text-white'
                            }
                            ${isFavAnimating ? 'scale-90' : 'scale-100'}
                        `}
                        title="Add to Favorites"
                   >
                       <Icons.Heart size={20} fill={isFavorite ? "currentColor" : "none"} className={`transition-transform duration-300 ${isFavorite ? 'scale-110' : 'group-hover:scale-110'}`} />
                   </button>
              </div>
          </div>

          {/* Description Section */}
          <div className="bg-transparent pl-4 border-l-2 border-white/10">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">About this game</h3>
              <p className="text-gray-300 leading-relaxed max-w-3xl">
                {game.description}
              </p>
          </div>

          {/* Reviews Section */}
          <ReviewsSection />

        </div>
      </div>
    </div>
  );
};

export default GamePlayer;
