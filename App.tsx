
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import Browser from './components/Browser';
import Profile from './components/Profile';
import Settings from './components/Settings';
import StatusWidget from './components/StatusWidget';
import { IntroAnimation } from './components/IntroAnimation';
import { GAMES, CATEGORIES } from './constants';
import { Game, AppSettings, UserProfile } from './types';
import { Icons } from './components/Icon';

const AmbientParticles = React.memo(({ intensity }: { intensity: string }) => {
  if (intensity === 'none') return null;
  const count = intensity === 'blizzard' ? 60 : 30;
  const particles = useMemo(() => Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      tx: `${(Math.random() - 0.5) * 200}px`, 
      ty: `${(Math.random() - 0.5) * 200}px`,
      duration: `${Math.random() * 20 + 20}s`,
      delay: `${Math.random() * -20}s`, 
      opacity: Math.random() * 0.4 + 0.1,
      size: Math.random() * 2 + 1 + 'px', 
  })), [intensity, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-white rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: `0 0 10px white`,
            animation: `float-${p.id} ${p.duration} linear infinite`,
            animationDelay: p.delay
          }}
        />
      ))}
      <style>
        {particles.map(p => `
          @keyframes float-${p.id} {
            0% { transform: translate3d(0, 0, 0); opacity: 0; }
            50% { opacity: ${p.opacity}; }
            100% { transform: translate3d(${p.tx}, ${p.ty}, 0); opacity: 0; }
          }
        `).join('')}
      </style>
    </div>
  );
});

const FeedbackModal = ({ onClose }: { onClose: () => void }) => {
  const [review, setReview] = useState('');
  const [reviews] = useState([
    { user: 'SpeedDemon', text: 'This site is literally the best!', rating: 5, time: '2m ago' },
    { user: 'GlitchMaster', text: 'Love the premium feel. 10/10.', rating: 5, time: '15m ago' },
  ]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="w-full max-w-md bg-[#1a1b26] border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><Icons.Close /></button>
            <h2 className="text-2xl font-bold text-white mb-6">Feedback & Reviews</h2>
            <div className="space-y-4 mb-6">
                {reviews.map((r, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-cyan-400 text-sm">{r.user}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{r.text}</p>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input 
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write a review..."
                    className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                />
                <button className="btn-icy bg-cyan-500 text-black px-4 rounded-xl font-bold">
                    <Icons.SendHorizontal size={18} />
                </button>
            </div>
        </div>
    </div>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  
  const [user, setUser] = useState<UserProfile>({
      id: 'user-01',
      name: 'Vincenzo', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      color: '#3b82f6'
  });

  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('icy_favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('icy_favorites', JSON.stringify([...favorites]));
  }, [favorites]);
  
  const [appSettings, setAppSettings] = useState<AppSettings>({
    snowIntensity: 'light',
    customCursor: true,
    brightness: 100,
    theme: 'dark'
  });

  // Scroll to top when tab changes
  useEffect(() => {
    if (mainRef.current) {
        mainRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeTab, activeGame]);

  useEffect(() => {
    if (appSettings.customCursor) document.body.classList.add('custom-cursor');
    else document.body.classList.remove('custom-cursor');
  }, [appSettings.customCursor]);

  const filteredGames = useMemo(() => {
    let games = GAMES;
    if (activeTab === 'favorites') games = games.filter(g => favorites.has(g.id));
    if (activeTab === 'games' || activeTab === 'home') {
        if (selectedCategory !== 'All') games = games.filter(g => g.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      games = GAMES.filter(g => g.title.toLowerCase().includes(q));
    }
    return games;
  }, [searchQuery, selectedCategory, activeTab, favorites]);

  const handleToggleFavorite = (gameId: string) => {
    setFavorites(prev => {
        const next = new Set(prev);
        if (next.has(gameId)) next.delete(gameId);
        else next.add(gameId);
        return next;
    });
  };

  if (showIntro) return <IntroAnimation onComplete={() => setShowIntro(false)} />;

  if (activeGame) {
    return (
      <GamePlayer 
        game={activeGame} 
        onBack={() => setActiveGame(null)} 
        isFavorite={favorites.has(activeGame.id)}
        onToggleFavorite={() => handleToggleFavorite(activeGame.id)}
      />
    );
  }

  return (
    <div 
        className="flex h-screen text-white font-sans selection:bg-cyan-500/30 overflow-hidden relative"
        style={{ 
            filter: `brightness(${appSettings.brightness}%)`,
            background: 'radial-gradient(circle at 50% -20%, #1e293b 0%, #0f172a 40%, #020617 80%, #000000 100%)'
        }}
    >
        <AmbientParticles intensity={appSettings.snowIntensity} />
        <Sidebar 
            activeTab={activeTab} 
            onTabChange={(tab) => { setActiveTab(tab); setSearchQuery(''); }} 
            userProfile={user} 
            isExpanded={isSidebarExpanded} 
            toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />

        <div className={`flex-1 flex flex-col h-full bg-transparent relative transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-64' : 'ml-20'}`}>
            {activeTab !== 'browser' && (
                <Header 
                  activeTab={activeTab} 
                  onSearch={setSearchQuery} 
                  searchQuery={searchQuery} 
                  onOpenFeedback={() => setShowFeedback(true)}
                />
            )}

            <main 
                ref={mainRef}
                className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 scroll-smooth page-enter relative z-20"
            >
                 {activeTab === 'browser' ? (
                     <div className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                         <Browser />
                     </div>
                 ) : (
                     <div className="max-w-[1600px] mx-auto space-y-8 pb-32">
                         {activeTab === 'home' && !searchQuery && (
                             <>
                                 <Hero onStartGaming={() => setActiveTab('games')} />
                                 <div className="flex items-center justify-between pt-4 px-4">
                                     <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Icons.Hot size={20} className="text-orange-500" /> Trending Now
                                     </h2>
                                     <button onClick={() => setActiveTab('games')} className="text-sm text-cyan-400 hover:text-cyan-300">View All</button>
                                 </div>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
                                     {GAMES.filter(g => g.isHot).slice(0, 4).map(game => (
                                         <GameCard 
                                            key={game.id} game={game} onClick={setActiveGame} 
                                            isFavorite={favorites.has(game.id)} onToggleFavorite={() => handleToggleFavorite(game.id)}
                                         />
                                     ))}
                                 </div>
                             </>
                         )}
                         {(activeTab === 'games' || activeTab === 'favorites' || (searchQuery)) && (
                             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 px-4">
                                 <div className="flex items-center justify-between mb-6">
                                     <h2 className="text-2xl font-bold text-white">
                                         {searchQuery ? `Search Results for "${searchQuery}"` : activeTab === 'favorites' ? 'Your Favorites' : 'All Games'}
                                     </h2>
                                     {!searchQuery && activeTab !== 'favorites' && (
                                         <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-300 outline-none focus:border-cyan-500">
                                             {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                         </select>
                                     )}
                                 </div>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                     {filteredGames.map(game => (
                                         <GameCard key={game.id} game={game} onClick={setActiveGame} isFavorite={favorites.has(game.id)} onToggleFavorite={() => handleToggleFavorite(game.id)} />
                                     ))}
                                 </div>
                                 {filteredGames.length === 0 && <div className="text-center py-20 text-zinc-500"><Icons.Ghost size={48} className="mx-auto mb-4 opacity-20" /><p>No matching games found.</p></div>}
                             </div>
                         )}
                         {activeTab === 'profile' && <Profile user={user} onUpdateUser={setUser} />}
                         {activeTab === 'settings' && <Settings settings={appSettings} onUpdateSettings={setAppSettings} />}
                     </div>
                 )}
            </main>
            <StatusWidget />
        </div>
        {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </div>
  );
}

export default App;
