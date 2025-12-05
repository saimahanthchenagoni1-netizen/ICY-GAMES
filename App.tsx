
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import FrostAI from './components/FrostAI';
import StatusWidget from './components/StatusWidget';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Settings from './components/Settings';
import { GAMES } from './constants';
import { Game, UserProfile, AppSettings } from './types';
import { Icons } from './components/Icon';
import { IntroAnimation } from './components/IntroAnimation';

// Snow Component
const Snow = ({ intensity }: { intensity: 'none' | 'light' | 'blizzard' }) => {
  if (intensity === 'none') return null;

  const count = intensity === 'blizzard' ? 150 : 50;

  const snowflakes = useMemo(() => Array.from({ length: count }).map((_, i) => {
    const direction = Math.random() > 0.5 ? 'animate-fall-right' : 'animate-fall-left';
    return {
      id: i,
      left: `${Math.random() * 100}%`,
      animationName: direction,
      animationDuration: `${Math.random() * (intensity === 'blizzard' ? 5 : 10) + 5}s`,
      animationDelay: `${Math.random() * 10}s`,
      opacity: Math.random() * 0.3 + 0.1,
      size: Math.random() * 3 + 1 + 'px'
    };
  }), [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={`absolute bg-white rounded-full ${flake.animationName}`}
          style={{
            left: flake.left,
            top: '-20px',
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

// Section Component for Horizontal Scrolling
interface SectionProps {
  title: string;
  icon: React.ElementType;
  games: Game[];
  onGameClick: (game: Game) => void;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  color?: string;
}

const GameSection: React.FC<SectionProps> = ({ title, icon: Icon, games, onGameClick, favorites, toggleFavorite, color = "text-white" }) => {
  if (games.length === 0) return null;

  return (
    <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
             <Icon size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        <button className="text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
          View All <Icons.ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
        </button>
      </div>
      
      <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x px-2 -mx-2">
        {games.map((game) => (
          <div key={game.id} className="min-w-[280px] sm:min-w-[320px] snap-center">
            <GameCard 
              game={game} 
              onClick={onGameClick}
              isFavorite={favorites.has(game.id)}
              onToggleFavorite={() => toggleFavorite(game.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home'); // home, games, apps, browser, profile, settings
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [showFrostAI, setShowFrostAI] = useState(false);
  const [isGamingStarted, setIsGamingStarted] = useState(false);
  const [showDiscordPopup, setShowDiscordPopup] = useState(false);
  
  // Sidebar State
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
  const gamesSectionRef = useRef<HTMLDivElement>(null);
  
  // Settings State
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('icy_settings');
    return saved ? JSON.parse(saved) : {
      snowIntensity: 'light',
      customCursor: true,
      brightness: 100,
      theme: 'dark'
    };
  });

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('icy_user_profile');
    return saved ? JSON.parse(saved) : {
      id: 'user-slot-1',
      name: 'Guest Player',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      color: '#22d3ee'
    };
  });

  // Favorites State with LocalStorage
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('icy_favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist State
  useEffect(() => {
    localStorage.setItem('icy_settings', JSON.stringify(settings));
    
    // Apply Cursor
    if (settings.customCursor) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }

  }, [settings]);

  useEffect(() => {
    localStorage.setItem('icy_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('icy_favorites', JSON.stringify(Array.from(favorites)));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  }, [favorites]);

  // Discord Popup Logic
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowDiscordPopup(true);
    }, 5000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
      if (showDiscordPopup) {
          const hideTimer = setTimeout(() => {
              setShowDiscordPopup(false);
          }, 10000);
          return () => clearTimeout(hideTimer);
      }
  }, [showDiscordPopup]);

  const toggleFavorite = (gameId: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(gameId)) {
        newFavs.delete(gameId);
      } else {
        newFavs.add(gameId);
      }
      return newFavs;
    });
  };

  const handleStartGaming = () => {
    setIsGamingStarted(true);
    setTimeout(() => {
        gamesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Featured Games Logic - Select top 5 hot games or defaults
  const featuredGames = useMemo(() => {
      const hotGames = GAMES.filter(g => g.isHot);
      const otherGames = GAMES.filter(g => !g.isHot).slice(0, 5 - hotGames.length);
      return [...hotGames, ...otherGames].slice(0, 5);
  }, []);
  
  // Increased slice to 8 for the top carousel
  const carouselGames = useMemo(() => GAMES.filter(g => g.category !== 'Apps').slice(0, 8), []);
  
  // Derived Lists
  const favoriteGamesList = useMemo(() => GAMES.filter(g => favorites.has(g.id)), [favorites]);
  const recommendedGamesList = useMemo(() => GAMES.filter(g => g.isHot || g.isNew), []);

  // Filter Logic based on Tabs
  const displayedGames = useMemo(() => {
    if (activeTab === 'apps') {
        return GAMES.filter(g => g.category === 'Apps');
    }
    if (activeTab === 'games') {
        return GAMES.filter(g => g.category !== 'Apps');
    }
    return GAMES.filter(g => g.category !== 'Apps');
  }, [activeTab]);

  // View Switcher Logic
  if (showFrostAI) {
    return <FrostAI onBack={() => setShowFrostAI(false)} />;
  }

  if (activeGame) {
    return <GamePlayer game={activeGame} onBack={() => setActiveGame(null)} />;
  }

  // Theme Styling
  const mainBgClass = settings.theme === 'light' 
    ? 'bg-slate-100 text-slate-900' 
    : 'bg-[#050505] text-white';

  return (
    <div 
      className={`flex h-screen font-sans overflow-hidden selection:bg-cyan-500 selection:text-black transition-colors duration-500 ${mainBgClass}`}
      style={{ filter: `brightness(${settings.brightness}%)` }}
    >
      {/* Intro Animation */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      <Snow intensity={settings.snowIntensity} />

      {/* Discord Popup Notification */}
      {showDiscordPopup && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-500 group">
             <div className="bg-[#1a1b26]/90 backdrop-blur-xl border border-[#5865F2]/50 p-4 rounded-2xl shadow-[0_0_50px_rgba(88,101,242,0.4)] flex items-center gap-4 min-w-[320px] relative">
                 
                 {/* Close Button */}
                 <button 
                    onClick={() => setShowDiscordPopup(false)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    title="Close"
                 >
                     <Icons.Close size={14} />
                 </button>

                 <div className="bg-[#5865F2] p-2.5 rounded-xl text-white shadow-lg shadow-[#5865F2]/20">
                     <Icons.Gamepad size={24} />
                 </div>
                 <div className="flex-1">
                     <h3 className="text-white font-bold text-sm leading-tight">Want more games?</h3>
                     <p className="text-gray-400 text-xs">Join our Discord!</p>
                 </div>
                 <a 
                     href="https://discord.gg/sj8fPcuWgr" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold rounded-lg transition-all shadow-lg hover:shadow-[#5865F2]/30 active:scale-95"
                 >
                     JOIN
                 </a>
             </div>
          </div>
      )}
      
      {/* Sidebar - Fixed Left */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        userProfile={userProfile}
      />

      {/* Main Content - Right Side */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${isSidebarExpanded ? 'ml-64' : 'ml-20'} h-full relative z-10 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Top Bar removed (Profile access moved to sidebar) */}

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 scroll-smooth">
            <div className="max-w-[1600px] mx-auto space-y-12 pb-24">
                
                {/* Home View */}
                {activeTab === 'home' && (
                    <>
                        {/* Hero Section */}
                        <Hero 
                            featuredGames={featuredGames} 
                            carouselGames={carouselGames} 
                            onPlay={setActiveGame}
                            onStartGaming={handleStartGaming}
                        />

                        {/* Games Content - Only visible after clicking Start Gaming */}
                        {isGamingStarted && (
                            <div ref={gamesSectionRef} className="space-y-16 pt-8">
                                
                                {/* Favorites Section */}
                                {favoriteGamesList.length > 0 && (
                                    <GameSection 
                                        title="Favorites" 
                                        icon={Icons.Heart} 
                                        color="text-red-500"
                                        games={favoriteGamesList} 
                                        onGameClick={setActiveGame}
                                        favorites={favorites}
                                        toggleFavorite={toggleFavorite}
                                    />
                                )}

                                {/* Recommended Section */}
                                <GameSection 
                                    title="Recommended" 
                                    icon={Icons.Star} 
                                    color="text-yellow-400"
                                    games={recommendedGamesList} 
                                    onGameClick={setActiveGame}
                                    favorites={favorites}
                                    toggleFavorite={toggleFavorite}
                                />

                                {/* Popular / All Games Grid */}
                                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                                    <div className="flex items-center justify-between mb-6 px-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/5 text-cyan-400">
                                                <Icons.Gamepad size={24} />
                                            </div>
                                            <h2 className={`text-2xl font-bold ${settings.theme === 'light' ? 'text-slate-800' : 'text-white'}`}>All Games</h2>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                        {displayedGames.map((game) => (
                                            <GameCard 
                                                key={game.id} 
                                                game={game} 
                                                onClick={setActiveGame}
                                                isFavorite={favorites.has(game.id)}
                                                onToggleFavorite={() => toggleFavorite(game.id)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Apps Section */}
                                <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                                    <div className="mb-6 mt-16 flex items-center justify-center gap-3 px-2 border-t border-cyan-500/20 pt-12">
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/30"></div>
                                        <Icons.LayoutGrid size={28} className="text-cyan-400 animate-pulse" />
                                        <h2 className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 tracking-wider drop-shadow-lg uppercase">Apps & Tools</h2>
                                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/30"></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                        {GAMES.filter(g => g.category === 'Apps').map((game) => (
                                            <GameCard 
                                                key={game.id} 
                                                game={game} 
                                                onClick={setActiveGame}
                                                isFavorite={favorites.has(game.id)}
                                                onToggleFavorite={() => toggleFavorite(game.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Games / Apps Views */}
                {(activeTab === 'games' || activeTab === 'apps') && (
                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold mb-8 capitalize">{activeTab}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {displayedGames.map((game) => (
                                <GameCard 
                                    key={game.id} 
                                    game={game} 
                                    onClick={setActiveGame}
                                    isFavorite={favorites.has(game.id)}
                                    onToggleFavorite={() => toggleFavorite(game.id)}
                                />
                            ))}
                        </div>
                     </div>
                )}

                {/* Browser View */}
                {activeTab === 'browser' && (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in zoom-in duration-500">
                        <div className="p-6 bg-white/5 rounded-full mb-6">
                            <Icons.Globe size={48} className="text-cyan-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Web Browser</h2>
                        <p className="text-gray-400 max-w-md">
                            Securely browse the web without leaving the app. <br/>
                            (Feature coming soon)
                        </p>
                    </div>
                )}

                {/* Profile View */}
                {activeTab === 'profile' && (
                    <Profile user={userProfile} onUpdateUser={setUserProfile} />
                )}

                {/* Settings View */}
                {activeTab === 'settings' && (
                    <Settings settings={settings} onUpdateSettings={setSettings} />
                )}

            </div>
        </main>

        {/* Status Widget (Bottom Left) */}
        {activeTab === 'home' && <StatusWidget isSidebarExpanded={isSidebarExpanded} />}

        {/* Notification Bell (Bottom Right) */}
        <div className="fixed bottom-6 right-6 z-40">
            <button className="bg-white text-black p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 relative">
                <Icons.Bell size={24} />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#050505]"></span>
            </button>
        </div>

        {/* Floating Action Button for AI */}
        <div className="fixed bottom-24 right-6 z-40">
             <button 
                onClick={() => setShowFrostAI(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 border border-white/20 group"
            >
                <Icons.Bot size={24} className="group-hover:animate-spin" />
            </button>
        </div>

      </div>
    </div>
  );
}

export default App;
