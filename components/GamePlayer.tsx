
import React, { useEffect, useRef, useState } from 'react';
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
);

// External App Launcher for blocked iframes (Spotify, Discord, etc.)
const ExternalAppLauncher = ({ game }: { game: Game }) => (
  <div className="flex flex-col items-center justify-center w-full h-full bg-[#050505] relative overflow-hidden">
      {/* Background Gradient instead of Image */}
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

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onBack }) => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync state with actual fullscreen changes (ESC key, etc)
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

  return (
    <div className="flex flex-col h-full bg-[#050505] min-h-screen text-white overflow-y-auto">
      {/* Game Nav */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
        <button 
           onClick={onBack}
           className="flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors hover:-translate-x-1 duration-200"
        >
          <Icons.Back size={20} /> <span className="hidden sm:inline">Back to Games</span>
        </button>
        <h1 className="text-lg font-bold text-white hidden md:block tracking-wide opacity-80">{game.title}</h1>
        <div className="flex items-center gap-3">
             <button onClick={handleRefresh} className="p-2 text-gray-400 hover:text-white transition-colors" title="Reload Game">
                 <Icons.Rotate size={18} />
             </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 md:p-8 w-full max-w-[1300px]"> {/* Left-aligned max-width container */}
        
        {/* Main Game Area */}
        <div className="flex flex-col gap-4">
          
          {/* The Game Container */}
          <div 
            ref={gameContainerRef}
            className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative z-10"
            style={{ maxHeight: '80vh' }}
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
               />
            ) : (
               <PlaceholderGame title={game.title} />
            )}
          </div>

          {/* Controls Bar - Always Visible Below Game */}
          <div className="bg-[#111] border border-white/5 rounded-xl p-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      {game.title}
                      {game.isHot && <Icons.Hot size={16} className="text-orange-500" />}
                  </h2>
                  <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                      {game.category}
                  </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                   <button 
                       onClick={toggleFullScreen}
                       className="btn-icy flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                   >
                       {isFullscreen ? <Icons.Close size={18} /> : <Icons.Maximize size={18} />}
                       <span>{isFullscreen ? 'EXIT FULL SCREEN' : 'FULL SCREEN'}</span>
                   </button>
                   
                   <button className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/5 transition-colors">
                       <Icons.Heart size={20} />
                   </button>
              </div>
          </div>

          {/* Description Section */}
          <div className="bg-transparent pl-2 border-l-2 border-white/10 mt-2">
              <p className="text-gray-400 leading-relaxed max-w-3xl">
                {game.description}
                <br />
                <span className="text-xs text-gray-600 mt-2 block">
                    Game content is provided by external sources. If the game fails to load, try refreshing using the button in the top bar.
                </span>
              </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GamePlayer;
