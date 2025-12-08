import React, { useState, useRef } from 'react';
import { Icons } from './Icon';

const Browser = () => {
    const [url, setUrl] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');
    const [isBrowsing, setIsBrowsing] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        let target = url.trim();
        if (!target) return;

        // Smart URL handling:
        // 1. If it starts with http:// or https://, use it directly (User must be explicit)
        // 2. Otherwise, treat as a search query to Google with igu=1 (Iframe Google Unblocker)
        // This prevents "google.com" from leading to a blank screen due to X-Frame-Options.
        
        if (target.startsWith('http://') || target.startsWith('https://')) {
             setCurrentUrl(target);
        } else {
             // Use Google with igu=1 which generally permits iframe embedding
             setCurrentUrl(`https://www.google.com/search?igu=1&source=hp&q=${encodeURIComponent(target)}`);
        }
        
        setIsBrowsing(true);
    };

    const handleHome = () => {
        setIsBrowsing(false);
        setCurrentUrl('');
        setUrl('');
    };

    const handleRefresh = () => {
        if (iframeRef.current) {
            // eslint-disable-next-line no-self-assign
            iframeRef.current.src = iframeRef.current.src;
        }
    };

    return (
        <div className="w-full h-full relative flex flex-col bg-[#050505] overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
            {/* Background Effects for Home */}
            {!isBrowsing && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                     <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
                     <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                     {/* Subtle grid pattern */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                </div>
            )}

            {isBrowsing ? (
                <div className="flex flex-col h-full animate-in fade-in duration-300">
                    {/* Browser Toolbar */}
                    <div className="flex items-center gap-3 p-3 bg-[#0f1016] border-b border-white/5 z-20">
                        <div className="flex items-center gap-1">
                            <button onClick={handleHome} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors" title="Home">
                                <Icons.Home size={18} />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-not-allowed opacity-50">
                                <Icons.ChevronLeft size={18} />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-not-allowed opacity-50">
                                <Icons.ChevronRight size={18} />
                            </button>
                            <button onClick={handleRefresh} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors" title="Refresh">
                                <div className="rotate-45"><Icons.Back size={18} className="rotate-[135deg]" /></div>
                            </button>
                        </div>
                        
                        {/* Address Bar */}
                        <form onSubmit={handleSearch} className="flex-1 relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <Icons.Lock size={14} />
                            </div>
                            <input 
                                type="text" 
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full bg-[#050505] border border-white/10 hover:border-white/20 focus:border-cyan-500/50 rounded-full pl-9 pr-4 py-2 text-sm text-gray-300 focus:text-white outline-none transition-all shadow-inner"
                            />
                        </form>

                        <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-cyan-400 transition-colors">
                             <Icons.Settings size={18} />
                        </button>
                    </div>
                    
                    {/* Content Frame */}
                    <div className="flex-1 relative bg-white w-full h-full">
                        <iframe 
                            ref={iframeRef}
                            src={currentUrl}
                            className="absolute inset-0 w-full h-full border-none"
                            title="Browser View"
                            referrerPolicy="no-referrer"
                            allow="fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            sandbox="allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                        />
                    </div>
                </div>
            ) : (
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 animate-in fade-in zoom-in-95 duration-500 pb-20">
                    <div className="mb-8 relative">
                        <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter text-white select-none">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-500 drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                                Icy
                            </span> Browser
                        </h1>
                        <span className="absolute -top-4 -right-8 bg-cyan-500 text-black text-xs font-bold px-2 py-1 rounded-md rotate-12 shadow-lg">BETA</span>
                    </div>
                    
                    <p className="text-gray-400 text-lg md:text-xl mb-12 font-medium tracking-wide">
                        What would you like to explore today?
                    </p>
                    
                    <form onSubmit={handleSearch} className="w-full max-w-3xl relative group">
                        <input 
                            type="text" 
                            placeholder="Search or enter a URL" 
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-[#1a1b26]/60 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-6 text-lg text-white placeholder:text-gray-500 shadow-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent outline-none transition-all group-hover:bg-[#1a1b26]/80 group-hover:scale-[1.01]"
                            autoFocus
                        />
                        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-cyan-500 text-black rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-95 group-hover:rotate-0 rotate-0">
                            <Icons.Search size={24} />
                        </button>
                    </form>
                    
                    <div className="mt-16 flex gap-8 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            Proxy Inactive (Client-Side Only)
                        </div>
                        <div className="flex items-center gap-2 hover:text-cyan-400 cursor-pointer transition-colors">
                            <Icons.Lock size={14} />
                            Encrypted
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Browser;