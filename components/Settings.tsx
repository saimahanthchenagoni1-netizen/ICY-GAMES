
import React from 'react';
import { AppSettings } from '../types';
import { Icons } from './Icon';

interface SettingsProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdateSettings }) => {
  
  const update = (key: keyof AppSettings, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-[#1a1b26]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
           <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400">
             <Icons.Settings size={32} />
           </div>
           <div>
             <h2 className="text-3xl font-black text-white tracking-tight">Settings</h2>
             <p className="text-gray-400">Customize your visual experience</p>
           </div>
        </div>

        <div className="space-y-8">
            
            {/* Theme & Brightness Group */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Icons.Monitor size={20} className="text-cyan-400" /> Display
                </h3>
                
                <div className="space-y-6">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-white">App Theme</div>
                            <div className="text-sm text-gray-400">Switch between Midnight and Frost mode</div>
                        </div>
                        <div className="flex bg-black/40 rounded-lg p-1">
                            <button 
                                onClick={() => update('theme', 'dark')}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${settings.theme === 'dark' ? 'bg-slate-700 text-white shadow-md' : 'text-gray-500 hover:text-white'}`}
                            >
                                Dark
                            </button>
                            <button 
                                onClick={() => update('theme', 'light')}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${settings.theme === 'light' ? 'bg-cyan-100 text-cyan-900 shadow-md' : 'text-gray-500 hover:text-white'}`}
                            >
                                Light
                            </button>
                        </div>
                    </div>

                    {/* Brightness Slider */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="font-medium text-white">Brightness</span>
                            <span className="text-cyan-400 font-mono">{settings.brightness}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="50" 
                            max="150" 
                            value={settings.brightness}
                            onChange={(e) => update('brightness', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                    </div>
                </div>
            </div>

            {/* Visual Effects Group */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Icons.Sparkles size={20} className="text-purple-400" /> Visual Effects
                </h3>

                <div className="space-y-6">
                    
                    {/* Snow Control */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-white">Snow Effect</div>
                            <div className="text-sm text-gray-400">Adjust the intensity of the background snow</div>
                        </div>
                        <select 
                            value={settings.snowIntensity}
                            onChange={(e) => update('snowIntensity', e.target.value)}
                            className="bg-black/40 text-white border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-cyan-500 cursor-pointer"
                        >
                            <option value="none">Off</option>
                            <option value="light">Light Snow</option>
                            <option value="blizzard">Blizzard</option>
                        </select>
                    </div>

                    {/* Custom Cursor Toggle */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-white">Custom Cursor</div>
                            <div className="text-sm text-gray-400">Use the 3D icy cursor style</div>
                        </div>
                        <button 
                            onClick={() => update('customCursor', !settings.customCursor)}
                            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${settings.customCursor ? 'bg-green-500' : 'bg-gray-700'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${settings.customCursor ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
