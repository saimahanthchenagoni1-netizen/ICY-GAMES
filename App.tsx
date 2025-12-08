
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import FrostAI from './components/FrostAI';
import StatusWidget from './components/StatusWidget';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Browser from './components/Browser';
import { IntroAnimation } from './components/IntroAnimation';
import { GAMES, CATEGORIES } from './constants';
import { Game, UserProfile, AppSettings } from './types';
import { Icons } from './components/Icon';

// Snow Component (reused logic)
const Snow = ({ intensity }: { intensity: string }) => {
  if (intensity === 'none') return null;

  const count = intensity === 'blizzard' ? 150 : 50;
  const snowflakes = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * (intensity === 'blizzard' ? 5 : 10) + 5}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.5 + 0.1,
    size: Math.random() * 3 + 1 + 'px',
    animationName: 'animate-fall'
  })), [intensity, count]);

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

// Navigation Button Component for the main dock
const NavButton = ({ icon: Icon, label, onClick, colorClass = "text-white" }: any) => (
    <button 
        onClick={onClick}
        className="group flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-2"
    >
        <div className={`
            w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center 
            bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm
            group-hover:bg-white/10 group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/20
            transition-all duration-300
        `}>
            <Icon size={32} className={`${colorClass} opacity-80 group-hover:opacity-100 transition-opacity`} />
        </div>
        <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">{label}</span>
    </button>
);

function App() {
  // State
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Persisted State
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('icy_favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-1',
    name: 'Player One',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    color: '#22d3ee'
  });

  const [appSettings, setAppSettings] = useState<AppSettings>({
    snowIntensity: 'light',
    customCursor: true,
    brightness: 100,
    theme: 'dark'
  });

  const filteredGames = useMemo(() => {
    let games = GAMES;
    
    // Tab filtering
    if (activeTab === 'apps') {
      games = games.filter(g => g.category === 'Apps');
    } else {
      games = games.filter(g => g.category !== 'Apps');
    }

    // Category filtering
    if (selectedCategory !== 'All' && activeTab !== 'apps') {
      games = games.filter(g => g.category === selectedCategory);
    }

    // Search filtering
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      games = games.filter(g => g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q));
    }

    return games;
  }, [activeTab, searchQuery, selectedCategory]);

  useEffect(() => {
    if (appSettings.customCursor) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }
  }, [appSettings.customCursor]);

  const handleToggleFavorite = (gameId: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(gameId)) {
        newFavs.delete(gameId);
      } else {
        newFavs.add(gameId);
      }
      localStorage.setItem('icy_favorites', JSON.stringify(Array.from(newFavs)));
      return newFavs;
    });
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  if (activeGame) {
    return <GamePlayer game={activeGame} onBack={() => setActiveGame(null)} />;
  }

  return (
    <div 
        className={`min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden ${appSettings.theme === 'light' ? 'bg-slate-100 text-slate-900' : ''}`}
        style={{ filter: `brightness(${appSettings.brightness}%)` }}
    >
        <Snow intensity={appSettings.snowIntensity} />

        {/* Sidebar Removed */}

        <div className="w-full">
            <Header 
                onSearch={(q) => { setSearchQuery(q); if(q && activeTab === 'home') setActiveTab('games'); }} 
                onHome={() => { setActiveTab('home'); setSearchQuery(''); }}
            />

            <main className="p-4 sm:p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-64px)] relative z-10">
                
                {/* HOME TAB - Central Launcher */}
                {activeTab === 'home' && !searchQuery && (
                    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in duration-1000 gap-16">
                        
                        {/* Animated Logo */}
                        <div className="select-none relative group">
                            <h1 className="text-[150px] sm:text-[200px] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 animate-lightning leading-none">
                                ICY
                            </h1>
                        </div>

                        {/* Navigation Dock */}
                        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 animate-in slide-in-from-bottom-8 duration-700">
                             <NavButton icon={Icons.Gamepad} label="Games" onClick={() => setActiveTab('games')} colorClass="text-cyan-400" />
                             <NavButton icon={Icons.LayoutGrid} label="Apps" onClick={() => setActiveTab('apps')} colorClass="text-purple-400" />
                             <NavButton icon={Icons.Bot} label="Frosty AI" onClick={() => setActiveTab('frosty')} colorClass="text-blue-400" />
                             <NavButton icon={Icons.Globe} label="Browser" onClick={() => setActiveTab('browser')} colorClass="text-green-400" />
                             <NavButton icon={Icons.User} label="Profile" onClick={() => setActiveTab('profile')} colorClass="text-yellow-400" />
                             <NavButton icon={Icons.Settings} label="Settings" onClick={() => setActiveTab('settings')} colorClass="text-gray-400" />
                        </div>
                    </div>
                )}

                {/* OTHER TABS */}
                {(activeTab === 'games' || activeTab === 'apps' || searchQuery) && (
                    <div className="animate-in fade-in zoom-in-95 duration-500 pb-20">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <h2 className="text-3xl font-black italic tracking-tight">{activeTab === 'apps' ? 'Apps & Tools' : 'Game Library'}</h2>
                            
                            {activeTab === 'games' && !searchQuery && (
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.filter(c => c !== 'Apps').map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                         </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredGames.map(game => (
                                <GameCard 
                                    key={game.id} 
                                    game={game} 
                                    onClick={setActiveGame} 
                                    isFavorite={favorites.has(game.id)}
                                    onToggleFavorite={() => handleToggleFavorite(game.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'frosty' && (
                    <div className="h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="bg-[#1a1b26]/80 backdrop-blur-xl border border-white/10 rounded-3xl h-full shadow-2xl overflow-hidden relative">
                             <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
                             <FrostAI />
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && <Profile user={userProfile} onUpdateUser={setUserProfile} />}
                {activeTab === 'settings' && <Settings settings={appSettings} onUpdateSettings={setAppSettings} />}
                {activeTab === 'browser' && <Browser onAppClick={setActiveGame} />}

            </main>
        </div>
        
        <StatusWidget isSidebarExpanded={false} />
    </div>
  );
}

export default App;
