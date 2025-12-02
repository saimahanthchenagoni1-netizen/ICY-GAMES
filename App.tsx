import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import { GAMES, CATEGORIES } from './constants';
import { Game, Category } from './types';
import { Icons } from './components/Icon';
import { getRecommendedGame } from './services/geminiService';

// Snow Component
const Snow = () => {
  // Generate static random values for snowflakes to avoid hydration mismatch or re-renders causing jumps
  // In a real app, we might use a seeded random or useEffect, but this is sufficient for a demo
  const snowflakes = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 10 + 10}s`, // 10-20s fall time
    animationDelay: `${Math.random() * 10}s`,
    opacity: Math.random() * 0.5 + 0.1,
    size: Math.random() * 3 + 2 + 'px'
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full animate-fall"
          style={{
            left: flake.left,
            top: '-20px', // Start slightly above viewport
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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

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

  const handleRandomGame = () => {
    if (GAMES.length > 0) {
        const randomGame = GAMES[Math.floor(Math.random() * GAMES.length)];
        setActiveGame(randomGame);
    }
  };

  // View: Game Player
  if (activeGame) {
    return <GamePlayer game={activeGame} onBack={() => setActiveGame(null)} />;
  }

  // View: Home / Grid
  return (
    <div className="min-h-screen bg-[#050505] text-white relative selection:bg-cyan-500 selection:text-black">
      <Snow />
      
      <div className="relative z-10">
        <Header 
          onSearch={setSearchQuery} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        <div className="mx-auto flex max-w-7xl pt-6 px-4 lg:px-8 gap-6">
          <Sidebar 
            isOpen={sidebarOpen} 
            selectedCategory={selectedCategory} 
            onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setSearchQuery(''); // Reset search when category changes
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-1 pb-12">
              {/* Hero / Banner Area (Only on 'All') */}
              {selectedCategory === 'All' && !searchQuery && (
                  <div className="mb-10 relative w-full h-72 sm:h-80 rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center group shadow-[0_0_40px_rgba(8,145,178,0.15)] transition-all hover:border-cyan-400/50">
                      {/* Background gradient (Static but smooth transition) */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-600/5 to-purple-500/5 transition-opacity duration-1000"></div>
                      
                      {/* ICY Text with Glow */}
                      <div className="relative z-10 text-center select-none">
                          <h1 className="text-8xl sm:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_35px_rgba(34,211,238,0.6)] transform hover:scale-105 transition-transform duration-500">
                              ICY
                          </h1>
                      </div>

                      {/* Slogan */}
                      <p className="relative z-10 mt-4 sm:mt-6 text-lg sm:text-2xl font-bold text-cyan-50 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-3">
                          <Icons.Sparkles className="text-cyan-300" size={20} /> 
                          More Games Coming Soon.. Stay Cool! 
                          <Icons.Sparkles className="text-cyan-300" size={20} />
                      </p>
                      
                      {/* Decorative Elements */}
                      <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
                      <div className="absolute -top-24 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
                  </div>
              )}

              {/* AI Recommendation Banner */}
              {aiSuggestion && (
                   <div className="mb-6 bg-slate-900/80 border border-cyan-500/30 text-white p-4 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(6,182,212,0.1)] backdrop-blur-sm">
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

              {/* Content Header */}
              <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                      {searchQuery ? `Search: "${searchQuery}"` : `${selectedCategory} Games`}
                  </h2>
              </div>

              {/* Game Grid */}
              {filteredGames.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr">
                      {filteredGames.map((game) => (
                          <GameCard 
                              key={game.id} 
                              game={game} 
                              onClick={setActiveGame}
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
    </div>
  );
}

export default App;