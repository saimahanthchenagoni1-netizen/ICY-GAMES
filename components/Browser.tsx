import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icon';

interface Tab {
    id: string;
    title: string;
    url: string;
    mode: 'search' | 'proxy' | 'direct';
}

// Safe default that works in iframes
const SEARCH_PREFIX = 'https://www.google.com/search?igu=1&source=hp&q=';
const PROXY_PREFIX = 'https://translate.google.com/translate?sl=auto&tl=en&hl=en&u=';

const SHORTCUTS = [
    { name: 'Google', url: 'https://google.com', icon: Icons.Globe, color: 'text-blue-400' },
    { name: 'Spotify', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M', icon: Icons.Play, color: 'text-green-500' }, // Use Embed
    { name: 'Discord', url: 'https://discord.com', icon: Icons.MessageSquare, color: 'text-indigo-400' },
    { name: 'Youtube', url: 'https://www.youtube.com/embed/?listType=playlist&list=PLMC9KNkIncKtPzgY-5rmhvj7cx8Xc8q2z', icon: Icons.Youtube, color: 'text-red-500' }, // Use Embed
    { name: 'Wiki', url: 'https://wikipedia.org', icon: Icons.Brain, color: 'text-gray-200' },
];

const Browser = () => {
    // State
    const [tabs, setTabs] = useState<Tab[]>([
        { id: '1', title: 'New Tab', url: '', mode: 'search' }
    ]);
    const [activeTabId, setActiveTabId] = useState('1');
    const [urlInput, setUrlInput] = useState('');
    const [proxyMode, setProxyMode] = useState<'search' | 'proxy' | 'direct'>('search');
    const [showTabs, setShowTabs] = useState(false);
    
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

    // Sync Input with Active Tab
    useEffect(() => {
        if (activeTab) {
            let display = activeTab.url;
            // Clean up internal proxy URLs for better UX
            if (display.startsWith(SEARCH_PREFIX)) {
                display = decodeURIComponent(display.replace(SEARCH_PREFIX, ''));
            } else if (display.startsWith(PROXY_PREFIX)) {
                display = decodeURIComponent(display.replace(PROXY_PREFIX, ''));
            }
            setUrlInput(display);
            setProxyMode(activeTab.mode);
        }
    }, [activeTabId, tabs]);

    const updateTab = (id: string, updates: Partial<Tab>) => {
        setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const navigate = (input: string, mode: 'search' | 'proxy' | 'direct' = proxyMode) => {
        const trimmed = input.trim();
        if (!trimmed) return;

        let finalUrl = trimmed;
        let finalTitle = trimmed;
        
        // Smart URL handling
        const isUrl = /^(http|https):\/\/[^ "]+$/.test(trimmed) || /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/.*)?$/.test(trimmed);
        
        // Special Case: Spotify
        if (trimmed.toLowerCase().includes('spotify.com') && !trimmed.includes('embed')) {
             finalUrl = 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M'; // Fallback to a popular playlist embed if generic
             if (trimmed.includes('playlist') || trimmed.includes('track')) {
                 // Convert normal spotify link to embed
                 finalUrl = trimmed.replace('open.spotify.com', 'open.spotify.com/embed');
                 if (!finalUrl.startsWith('http')) finalUrl = 'https://' + finalUrl;
             }
             mode = 'direct'; // Embeds work directly
        } 
        // Special Case: YouTube
        else if (trimmed.toLowerCase().includes('youtube.com') || trimmed.toLowerCase().includes('youtu.be')) {
             if (!trimmed.includes('embed')) {
                 finalUrl = SEARCH_PREFIX + encodeURIComponent(trimmed); // Fallback to Google Search for YT as full YT blocks embeds mostly unless specific
                 mode = 'search';
             }
        }
        else if (isUrl) {
            if (!trimmed.startsWith('http')) {
                finalUrl = `https://${trimmed}`;
            }
            
            if (mode === 'proxy') {
                finalUrl = PROXY_PREFIX + encodeURIComponent(finalUrl);
            } else if (mode === 'search') {
                 // If user explicitly typed a domain but uses search mode, maybe they want the site?
                 // Let's use Google Search as the "Gateway"
                 finalUrl = SEARCH_PREFIX + encodeURIComponent(finalUrl);
            }
        } else {
            // It's a query
            finalUrl = SEARCH_PREFIX + encodeURIComponent(trimmed);
            mode = 'search'; // Force search mode for queries
        }

        updateTab(activeTabId, { url: finalUrl, title: finalTitle, mode });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(urlInput);
    };

    const addTab = () => {
        const newId = Date.now().toString();
        setTabs([...tabs, { id: newId, title: 'New Tab', url: '', mode: 'search' }]);
        setActiveTabId(newId);
    };

    const closeTab = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (tabs.length === 1) {
            updateTab(id, { url: '', title: 'New Tab', mode: 'search' });
            return;
        }
        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);
        if (activeTabId === id) setActiveTabId(newTabs[newTabs.length - 1].id);
    };

    const reload = () => {
        if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
    };

    const toggleMode = () => {
        const modes: ('search' | 'proxy' | 'direct')[] = ['search', 'proxy', 'direct'];
        const nextIndex = (modes.indexOf(proxyMode) + 1) % modes.length;
        setProxyMode(modes[nextIndex]);
        // Re-navigate current URL with new mode if not empty
        if (activeTab.url) {
            // Strip existing prefixes
            let clean = activeTab.url;
            if (clean.startsWith(SEARCH_PREFIX)) clean = decodeURIComponent(clean.replace(SEARCH_PREFIX, ''));
            else if (clean.startsWith(PROXY_PREFIX)) clean = decodeURIComponent(clean.replace(PROXY_PREFIX, ''));
            
            navigate(clean, modes[nextIndex]);
        }
    };

    return (
        <div ref={containerRef} className="flex flex-row h-full w-full bg-[#121212] rounded-xl border border-white/5 relative shadow-2xl overflow-hidden">
            
            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* Navbar */}
                <div className="flex items-center gap-2 p-3 bg-[#1e1e24] border-b border-white/5 z-20">
                    <div className="flex items-center gap-1 text-gray-400">
                        <button onClick={() => updateTab(activeTabId, { url: '', title: 'New Tab' })} className="p-2 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                            <Icons.Home size={18} />
                        </button>
                        <button onClick={reload} className="p-2 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                            <Icons.Rotate size={18} />
                        </button>
                    </div>

                    {/* Address Bar */}
                    <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center relative group">
                        <button 
                            type="button"
                            onClick={toggleMode}
                            className="absolute left-1.5 p-1.5 rounded-md hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer z-10"
                            title={`Current Mode: ${proxyMode.toUpperCase()} (Click to switch)`}
                        >
                            {proxyMode === 'search' && <Icons.Search size={14} className="text-blue-400" />}
                            {proxyMode === 'proxy' && <Icons.Lock size={14} className="text-green-400" />}
                            {proxyMode === 'direct' && <Icons.Globe size={14} className="text-red-400" />}
                        </button>

                        <input 
                            type="text" 
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-full py-2 pl-12 pr-4 text-sm text-gray-200 focus:text-white focus:outline-none focus:border-cyan-500/50 transition-all shadow-inner font-mono placeholder:text-gray-600"
                            placeholder={proxyMode === 'search' ? "Search Google..." : proxyMode === 'proxy' ? "Enter URL (Secure Proxy)..." : "Enter Direct URL..."}
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onFocus={(e) => e.target.select()}
                        />
                    </form>

                    {/* Right Controls */}
                    <div className="flex items-center gap-1 text-gray-400">
                        <button onClick={() => setShowTabs(!showTabs)} className={`p-2 rounded-lg transition-colors ${showTabs ? 'bg-cyan-500 text-black' : 'hover:bg-white/10'}`}>
                            <Icons.LayoutGrid size={18} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 relative bg-[#0f0f0f] w-full h-full overflow-hidden">
                   {tabs.map(tab => {
                       const isActive = activeTabId === tab.id;
                       return (
                           <div key={tab.id} className={`absolute inset-0 w-full h-full ${isActive ? 'z-10' : 'z-0 opacity-0 pointer-events-none'}`}>
                               {!tab.url ? (
                                   /* New Tab Page */
                                   <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#000]">
                                        <div className="mb-12 text-center">
                                            <h1 className="text-4xl font-bold text-white mb-2">Icy Browser</h1>
                                            <p className="text-gray-500">Secure. Unblocked. Fast.</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 max-w-4xl px-4">
                                            {SHORTCUTS.map(s => (
                                                <button 
                                                    key={s.name}
                                                    onClick={() => navigate(s.url, s.name === 'Spotify' || s.name === 'Youtube' ? 'direct' : 'search')}
                                                    className="flex flex-col items-center gap-3 group"
                                                >
                                                    <div className="w-16 h-16 bg-[#1e293b] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#334155] transition-all">
                                                        <s.icon size={28} className={s.color} />
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-400 group-hover:text-white">{s.name}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="mt-16 text-center max-w-lg px-6">
                                            <p className="text-xs text-gray-600 mb-2">
                                                <Icons.Lock size={10} className="inline mr-1" />
                                                Using <strong>{proxyMode === 'search' ? 'Google Unblocker' : proxyMode === 'proxy' ? 'Translation Proxy' : 'Direct Connection'}</strong>
                                            </p>
                                            <p className="text-[10px] text-gray-700">
                                                Tip: Use the icon in the address bar to switch modes if a site fails to load.
                                            </p>
                                        </div>
                                   </div>
                               ) : (
                                   /* Active Browser Frame */
                                   <iframe
                                       ref={isActive ? iframeRef : undefined}
                                       src={tab.url}
                                       className="w-full h-full border-none bg-white"
                                       title={tab.title}
                                       sandbox="allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                   />
                               )}
                           </div>
                       );
                   })}
                </div>
            </div>

            {/* Sidebar Tabs */}
            <div className={`w-64 bg-[#1a1b26] border-l border-white/5 absolute right-0 top-0 bottom-0 z-30 transform transition-transform duration-300 shadow-2xl ${showTabs ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <span className="font-bold text-gray-300 text-xs uppercase">Tabs ({tabs.length})</span>
                    <button onClick={addTab} className="bg-cyan-500 hover:bg-cyan-400 text-black p-1 rounded-md transition-colors"><Icons.Plus size={16} /></button>
                </div>
                <div className="p-2 space-y-2 overflow-y-auto h-full pb-20">
                    {tabs.map(tab => (
                        <div 
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 border transition-all ${activeTabId === tab.id ? 'bg-white/10 border-white/10 text-white' : 'border-transparent text-gray-500 hover:bg-white/5'}`}
                        >
                            <Icons.Globe size={14} />
                            <span className="truncate text-xs font-medium flex-1">{tab.title || 'Untitled'}</span>
                            <button onClick={(e) => closeTab(e, tab.id)} className="hover:text-red-400"><Icons.Close size={12} /></button>
                        </div>
                    ))}
                </div>
            </div>
            
            {showTabs && <div className="absolute inset-0 bg-black/50 z-20 md:hidden" onClick={() => setShowTabs(false)} />}
        </div>
    );
};

export default Browser;