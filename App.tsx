import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import FrostAI from './components/FrostAI';
import { GAMES, CATEGORIES } from './constants';
import { Game, Category } from './types';
import { Icons } from './components/Icon';
import { getRecommendedGame } from './services/geminiService';

// Snow Component
const Snow = () => {
  const snowflakes = useMemo(() => Array.from({ length: 75 }).map((_, i) => {
    const direction = Math.random() > 0.5 ? 'animate-fall-right' : 'animate-fall-left';
    return {
      id: i,
      left: `${Math.random() * 100}%`,
      animationName: direction,
      // Faster duration: 3s to 8s for blizzard feel
      animationDuration: `${Math.random() * 5 + 3}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.3,
      size: Math.random() * 4 + 2 + 'px'
    };
  }), []);

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
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <Icon className={color} size={24} />
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        <button className="text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg transition-colors border border-white/5">
          View All
        </button>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x px-2 -mx-2">
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [showFrostAI, setShowFrostAI] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  
  // Favorites State with LocalStorage and Error Handling
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('icy_favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      console.error("Failed to parse favorites", e);
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('icy_favorites', JSON.stringify(Array.from(favorites)));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  }, [favorites]);

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

  // Filter Logic
  const filteredGames = useMemo(() => {
    let result = GAMES;

    if (selectedCategory !== 'All') {
      result = result.filter(g => g.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(g => 
        g.title.toLowerCase().includes(q) || 
        g.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  // Derived Lists for Home Page sections
  const favoriteGamesList = useMemo(() => GAMES.filter(g => favorites.has(g.id)), [favorites]);
  const recommendedGamesList = useMemo(() => GAMES.filter(g => g.isHot || g.isNew), []);

  // View Switcher Logic
  if (showFrostAI) {
    return <FrostAI onBack={() => setShowFrostAI(false)} />;
  }

  if (activeGame) {
    return <GamePlayer game={activeGame} onBack={() => setActiveGame(null)} />;
  }

  // View: Home / Grid
  return (
    <div className="min-h-screen bg-[#050505] text-white relative selection:bg-cyan-500 selection:text-black flex flex-col">
      <Snow />
      
      <div className="relative z-10 flex flex-col flex-1 lg:pl-20">
        <Header 
          onSearch={setSearchQuery} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        {/* Sidebar is fixed, but we render it here to keep structure clean */}
        <Sidebar 
            isOpen={sidebarOpen} 
            selectedCategory={selectedCategory} 
            onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setShowFrostAI(false);
            }}
            onClose={() => setSidebarOpen(false)}
            onOpenFrostAI={() => {
                setShowFrostAI(true);
            }}
        />

        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            
            {/* Show Sectioned Layout ONLY on Home (All) with no search */}
            {selectedCategory === 'All' && !searchQuery ? (
              <>
                {/* Hero / Banner Area */}
                <div className="mb-10 relative w-full h-72 sm:h-80 rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center group shadow-[0_0_40px_rgba(8,145,178,0.15)] transition-all hover:border-cyan-400/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-600/5 to-purple-500/5 transition-opacity duration-1000"></div>
                    
                    <div className="relative z-10 text-center select-none lightning-text">
                        <h1 className="text-8xl sm:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_35px_rgba(34,211,238,0.6)] transform hover:scale-105 transition-transform duration-500 animate-ice-flicker">
                            ICY
                        </h1>
                    </div>

                    <p className="relative z-10 mt-4 sm:mt-6 text-lg sm:text-2xl font-bold text-cyan-50 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-3">
                        <Icons.Sparkles className="text-cyan-300 animate-pulse" size={20} /> 
                        More Games Coming Soon.. Stay Cool! 
                        <Icons.Sparkles className="text-cyan-300 animate-pulse" size={20} />
                    </p>
                    
                    <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
                    <div className="absolute -top-24 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
                </div>

                {/* AI Recommendation Banner */}
                {aiSuggestion && (
                      <div className="mb-8 bg-slate-900/80 border border-cyan-500/30 text-white p-4 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(6,182,212,0.1)] backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-300"><Icons.Brain size={24} /></div>
                            <div>
                                <p className="text-xs text-cyan-300 font-bold uppercase">AI Recommendation</p>
                                <p className="font-medium">You should try: <span className="text-cyan-200 font-bold">{aiSuggestion}</span></p>
                            </div>
                        </div>
                        <button onClick={() => setAiSuggestion(null)} className="text-cyan-400 hover:text-white"><Icons.Close size={20} /></button>
                      </div>
                )}

                {/* Favorites Section */}
                <GameSection 
                  title="Favorites" 
                  icon={Icons.Heart} 
                  color="text-red-500"
                  games={favoriteGamesList} 
                  onGameClick={setActiveGame}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />

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

                {/* All Games Grid Header */}
                <div className="mb-4 mt-8 flex items-center gap-2 px-2">
                   <Icons.Gamepad size={24} className="text-cyan-400" />
                   <h2 className="text-xl font-bold text-white tracking-tight">All Games</h2>
                </div>
              </>
            ) : (
              /* Header for filtered views */
              <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                      {searchQuery ? `Search: "${searchQuery}"` : `${selectedCategory} Games`}
                  </h2>
              </div>
            )}

            {/* Standard Grid (used for 'All Games' at bottom, or filter results) */}
            {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {filteredGames.map((game) => (
                        <GameCard 
                            key={game.id} 
                            game={game} 
                            onClick={setActiveGame}
                            isFavorite={favorites.has(game.id)}
                            onToggleFavorite={() => toggleFavorite(game.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5">
                    <Icons.Search size={48} className="mx-auto text-gray-500 mb-4" />
                    <h3 className="text-xl font-medium text-gray-300">No games found</h3>
                    <p className="text-gray-500">Try adjusting your search or category.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}

export default App;