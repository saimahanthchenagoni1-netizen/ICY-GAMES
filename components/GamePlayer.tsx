import React, { useEffect, useRef } from 'react';
import { Game } from '../types';
import { Icons } from './Icon';

interface GamePlayerProps {
  game: Game;
  onBack: () => void;
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
    <div className="w-full h-full bg-black flex items-center justify-center">
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
)

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onBack }) => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] min-h-screen text-white">
      {/* Game Nav */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/10 z-10">
        <button 
           onClick={onBack}
           className="flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors"
        >
          <Icons.Back size={20} /> Back to Games
        </button>
        <h1 className="text-lg font-bold text-white hidden sm:block">{game.title}</h1>
        <div className="flex items-center gap-2">
             <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"><Icons.Star size={20} /></button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 lg:p-6 max-w-7xl mx-auto w-full">
        {/* Main Game Area */}
        <div className="flex-1 flex flex-col">
          <div 
            ref={gameContainerRef}
            className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl shadow-black border border-white/5 relative group"
          >
            {game.customHtml ? (
               <iframe 
                 srcDoc={game.customHtml} 
                 className="w-full h-full border-0"
                 allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
                 title={game.title}
               />
            ) : game.romUrl ? (
               <EmulatorGame game={game} /> 
            ) : (
               <PlaceholderGame title={game.title} />
            )}

            {/* Fullscreen Toggle Overlay (Visible on Hover) */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <button 
                 onClick={toggleFullScreen}
                 className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm border border-white/10 transition-colors"
                 title="Toggle Fullscreen"
               >
                 <Icons.Maximize size={20} />
               </button>
            </div>
          </div>

          <div className="mt-6 bg-[#111] border border-white/5 rounded-xl p-6 shadow-xl">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">{game.title}</h2>
                    <p className="text-gray-400 mt-1">{game.category}</p>
                </div>
                <div className="flex gap-2">
                     <button 
                         onClick={toggleFullScreen}
                         className="flex items-center gap-2 px-4 py-2 bg-[#1f1f1f] text-white rounded-lg font-medium hover:bg-[#2a2a2a] transition-all border border-white/10"
                     >
                         <Icons.Maximize size={18} />
                         Full Screen
                     </button>
                </div>
            </div>
            <p className="mt-4 text-gray-300 leading-relaxed">
                {game.description} Play this amazing game directly in your browser. No downloads required! 
                Compete with friends and set new high scores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;