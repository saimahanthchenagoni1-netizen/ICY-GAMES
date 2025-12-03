import React, { useState } from 'react';
import { Icons } from './Icon';

interface HeaderProps {
  onSearch: (query: string) => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSearch(val);
  };

  const openInAboutBlank = () => {
     // Create the about:blank window
     const win = window.open('about:blank', '_blank');
     if (!win) return;
     
     // Get the current URL to embed
     const url = window.location.href;
     
     // The HTML structure to write into the new window
     const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Drive - Google Drive</title>
            <link rel="icon" href="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png">
            <style>
                body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #fff; }
                iframe { width: 100%; height: 100%; border: none; display: block; }
            </style>
        </head>
        <body>
            <iframe 
                src="${url}" 
                allow="fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; microphone; camera; geolocation" 
                allowfullscreen
            ></iframe>
        </body>
        </html>
     `;
     
     win.document.write(html);
     win.document.close();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="rounded-md p-2 text-gray-400 hover:bg-white/10 lg:hidden"
          >
            <Icons.Menu size={24} />
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <Icons.Gamepad size={24} />
            </div>
            <span className="text-2xl font-black tracking-tight text-white hidden sm:block">ICY</span>
          </div>
        </div>

        <div className="flex flex-1 max-w-lg mx-4">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Icons.Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full rounded-full border border-transparent bg-[#1f1f1f] py-2.5 pl-10 pr-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:bg-[#2a2a2a] focus:ring-1 focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all"
              placeholder="Search games..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button 
             onClick={openInAboutBlank}
             className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 border border-white/5 transition-all group hover:border-cyan-500/30"
             title="Open in about:blank (Cloak as Google Drive)"
           >
             <Icons.Ghost size={18} className="text-cyan-400 group-hover:text-cyan-300 group-hover:animate-pulse" />
             <span className="hidden lg:inline">Cloak</span>
           </button>
        </div>

      </div>
    </header>
  );
};

export default Header;