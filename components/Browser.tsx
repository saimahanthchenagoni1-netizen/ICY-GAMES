
import React from 'react';
import { GAMES } from '../constants';
import { Game } from '../types';
import { Icons } from './Icon';
import GameCard from './GameCard';

interface BrowserProps {
  onAppClick: (game: Game) => void;
}

const Browser: React.FC<BrowserProps> = ({ onAppClick }) => {
  const apps = GAMES.filter(g => g.category === 'Apps');

  return (
    <div className="space-y-6">
       <div className="bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4 text-gray-400">
             <div className="w-full h-8 bg-black/30 rounded-lg flex items-center px-3 border border-white/5">
                <Icons.Lock size={12} className="mr-2 opacity-50" />
                <span className="text-xs">secure-browse://apps</span>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
             {apps.map(app => (
                <GameCard 
                    key={app.id} 
                    game={app} 
                    onClick={onAppClick} 
                    isFavorite={false} 
                    onToggleFavorite={() => {}} 
                />
             ))}
          </div>
       </div>

       <div className="text-center text-gray-600 text-xs">
          <p>This browser is sandboxed for your safety.</p>
       </div>
    </div>
  );
};

export default Browser;
