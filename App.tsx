import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import Browser from './components/Browser';
import Profile from './components/Profile';
import Settings from './components/Settings';
import FrostAI from './components/FrostAI';
import StatusWidget from './components/StatusWidget';
import { IntroAnimation } from './components/IntroAnimation';
import { GAMES, CATEGORIES } from './constants';
import { Game, AppSettings, UserProfile } from './types';
import { Icons } from './components/Icon';

const Snow = ({ intensity }: { intensity: string }) => {
  if (intensity === 'none') return null;
  const count = intensity === 'blizzard' ? 100 : 30;
  const snowflakes = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 10 + 5}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.3 + 0.1,
    size: Math.random() * 3 + 'px',
  })), [intensity, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full animate-fall"
          style={{
            left: flake.left,
            top: '-10px',
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

const DiscordNotification = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed top-6 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 z-[100] animate-in slide-in-from-top-4 fade-in duration-500">
    <div className="bg-[#5865F2]/90 backdrop-blur-xl border border-white/20 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm">
       <div className="bg-white/20 p-2 rounded-xl">
          <Icons.Gamepad size={24} />
       </div>
       <div>
          <h4 className="font-bold text-sm">More Links?</h4>
          <p className="text-xs text-blue-100">Join our Discord for exclusive content.</p>
       </div>
       <div className="flex items-center gap-2 ml-2">
         <a 
           href="https://discord.gg/sj8fPcuWgr" 
           target="_blank"
           className="px-3 py-1.5 bg-white text-[#5865F2] text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors"
         >
           JOIN
         </a>
         <button 
           onClick={onClose}
           className="p-1 hover:bg-white/20 rounded-lg transition-colors"
         >
           <Icons.Close size={16} />
         </button>
       </div>
    </div>
  </div>
);

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showDiscordPopup, setShowDiscordPopup] = useState(false);
  
  const [user, setUser] = useState<UserProfile>({
      id: 'user-01',
      name: 'Player One',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      color: '#3b82f6'
  });

  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('icy_favorites');
      if (!saved) return new Set();
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? new Set(parsed) : new Set();
    } catch {
      return new Set();
    }
  });

  // Popup Timer
  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => {
        setShowDiscordPopup(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  useEffect(() => {
    try {
      localStorage.setItem('icy_favorites', JSON.stringify([...favorites]));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  }, [favorites]);
  
  const [appSettings, setAppSettings] = useState<AppSettings>({
    snowIntensity: 'light',
    customCursor: true,
    brightness: 100,
    theme: 'dark'
  });

  useEffect(() => {
    if (appSettings.customCursor) document.body.classList.add('custom-cursor');
    else document.body.classList.remove('custom-cursor');
  }, [appSettings.customCursor]);

  const filteredGames = useMemo(() => {
    let games = GAMES;
    
    // Only filter for Category logic if we are in Games tab
    if (activeTab === 'games') {
        if (selectedCategory !== 'All') {
            games = games.filter(g => g.category === selectedCategory);
        }
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      games = GAMES.filter(g => g.title.toLowerCase().includes(q));
    }

    return games;
  }, [searchQuery, selectedCategory, activeTab]);

  const handleToggleFavorite = (gameId: string) => {
    setFavorites(prev => {
        const next = new Set(prev);
        if (next.has(gameId)) next.delete(gameId);
        else next.add(gameId);
        return next;
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
        className="flex h-screen bg-[#02040a] text-white font-sans selection:bg-cyan-500/30 overflow-hidden"
        style={{ filter: `brightness(${appSettings.brightness}%)` }}
    >
        <Snow intensity={appSettings.snowIntensity} />
        
        {/* Fixed Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} userProfile={user} />

        {/* Discord Popup */}
        {showDiscordPopup && <DiscordNotification onClose={() => setShowDiscordPopup(false)} />}

        {/* Main Content Area */}
        <div className="flex-1 ml-[88px] relative h-full flex flex-col">
            
            {/* Top Right Actions - Absolute */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
                 <div className="relative group hidden sm:block">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#0b0d14] border border-white/5 rounded-full px-4 py-2 text-sm text-white w-32 focus:w-64 transition-all outline-none focus:border-cyan-500/50"
                    />
                    <Icons.Search className="absolute right-3 top-2.5 text-gray-500 w-4 h-4 pointer-events-none" />
                 </div>
                 
                 <button className="w-10 h-10 bg-[#0b0d14] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5 shadow-lg">
                    <Icons.Bell size={18} />
                 </button>
            </div>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-32 scroll-smooth">
                 {/* 
                    If Browser tab is active, we use a different container to allow full height. 
                    Otherwise we use the centered max-width container.
                 */}
                 {activeTab === 'browser' ? (
                     <div className="h-[calc(100vh-4rem)] w-full">
                         <Browser />
                     </div>
                 ) : (
                     <div className="max-w-[1600px] mx-auto">
                         
                         {/* Home View */}
                         {activeTab === 'home' && !searchQuery && (
                             <div className="space-y-12 animate-in fade-in duration-500">
                                 <Hero 
                                    onStartGaming={() => setActiveTab('games')}
                                 />
                             </div>
                         )}

                         {/* Games Grid View */}
                         {(activeTab === 'games' || searchQuery) && (
                             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8">
                                 {activeTab === 'games' && !searchQuery && (
                                     <div className="flex gap-2 overflow-x-auto pb-6 mb-2 hide-scrollbar">
                                         {CATEGORIES.filter(c => c !== 'Apps').map(cat => (
                                             <button
                                                 key={cat}
                                                 onClick={() => setSelectedCategory(cat)}
                                                 className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                                             >
                                                 {cat}
                                             </button>
                                         ))}
                                     </div>
                                 )}

                                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                     {filteredGames.map(game => (
                                         <GameCard 
                                            key={game.id} 
                                            game={game} 
                                            onClick={setActiveGame} 
                                            isFavorite={favorites.has(game.id)}
                                            onToggleFavorite={() => handleToggleFavorite(game.id)}
                                            style={{ height: '220px' }}
                                         />
                                     ))}
                                 </div>
                                 
                                 {filteredGames.length === 0 && (
                                     <div className="text-center py-20 text-gray-500">
                                         <p>No games found.</p>
                                     </div>
                                 )}
                             </div>
                         )}

                         {/* Other Tabs */}
                         {activeTab === 'profile' && <Profile user={user} onUpdateUser={setUser} />}
                         {activeTab === 'settings' && <Settings settings={appSettings} onUpdateSettings={setAppSettings} />}
                         
                     </div>
                 )}
            </main>
        </div>

        {/* Status Widget */}
        <StatusWidget />
    </div>
  );
}

export default App;