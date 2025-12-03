import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Icons } from './Icon';
import { chatWithFrost } from '../services/geminiService';
import { ChatMessage } from '../types';

// Enhanced Snow Component for AI View
const SnowAI = () => {
  const snowflakes = useMemo(() => Array.from({ length: 80 }).map((_, i) => {
    const direction = Math.random() > 0.5 ? 'animate-fall-right' : 'animate-fall-left';
    return {
      id: i,
      left: `${Math.random() * 100}%`,
      animationName: direction,
      // Fast blizzard speed
      animationDuration: `${Math.random() * 5 + 3}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.6 + 0.2,
      size: Math.random() * 3 + 2 + 'px'
    };
  }), []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={`absolute bg-cyan-100 rounded-full ${flake.animationName} shadow-[0_0_8px_rgba(34,211,238,0.9)]`}
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

// Voice Visualizer Component
const VoiceVisualizer = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return <Icons.Mic size={20} />;
  
  return (
    <div className="flex items-center gap-1 h-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className="w-1 bg-gradient-to-t from-red-500 to-pink-500 rounded-full animate-pulse"
          style={{ 
            height: `${Math.random() * 100}%`, 
            animationDuration: '0.4s',
            animationDelay: `${i * 0.1}s` 
          }}
        />
      ))}
    </div>
  );
};

interface FrostAIProps {
  onBack: () => void;
}

const FrostAI: React.FC<FrostAIProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Stay frosty! I'm ready to chat. Ask me anything or upload a screenshot!", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    const imageToSend = selectedImage;
    setSelectedImage(null); 
    setIsTyping(true);

    try {
      const responseText = await chatWithFrost(userMsg.text, imageToSend || undefined);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Browser does not support voice recognition.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.start();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white relative overflow-hidden font-sans cursor-pointer">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-[#050505] to-black pointer-events-none" />
      <SnowAI />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
        >
          <Icons.Back size={18} className="text-gray-400 group-hover:text-cyan-400 transition-colors" /> 
          <span className="text-sm font-medium text-gray-300 group-hover:text-white">Exit</span>
        </button>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
                <Icons.Bot size={28} className="text-cyan-400 animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="absolute inset-0 bg-cyan-400/30 blur-lg rounded-full animate-pulse" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-cyan-400 to-blue-600 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              FROST
            </h1>
          </div>
          <span className="text-[10px] text-cyan-400/80 uppercase tracking-[0.3em] font-bold text-shadow-sm">AI Assistant</span>
        </div>
        
        <div className="w-24" /> {/* Spacer for balance */}
      </div>

      {/* Chat Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 hide-scrollbar scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}
          >
            <div className={`
              max-w-[85%] sm:max-w-[70%] rounded-2xl p-5 shadow-xl backdrop-blur-md border relative overflow-hidden group
              ${msg.role === 'user' 
                ? 'bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border-blue-500/40 text-white rounded-br-sm' 
                : 'bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-cyan-500/30 text-cyan-50 rounded-bl-sm shadow-[0_0_25px_rgba(6,182,212,0.1)]'}
            `}>
              {/* Shine effect for bubbles */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none`} />

              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                  <div className="p-1 rounded-md bg-cyan-950/60 border border-cyan-500/30">
                    <Icons.Sparkles size={12} className="text-cyan-300" />
                  </div>
                  <span className="text-cyan-300 text-xs font-bold uppercase tracking-wider">Frost</span>
                </div>
              )}
              
              <p className="leading-relaxed whitespace-pre-wrap text-sm sm:text-base font-light tracking-wide">{msg.text}</p>
              
              <p className={`text-[10px] mt-3 font-medium ${msg.role === 'user' ? 'text-blue-200/50 text-right' : 'text-cyan-600'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl rounded-bl-sm p-4 flex gap-2 items-center shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
              <div className="w-2 h-2 bg-cyan-200 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              <span className="text-xs text-cyan-400 font-bold ml-2 animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative z-20 p-4 pb-6 bg-gradient-to-t from-black via-slate-950/95 to-transparent pt-10">
        
        {/* Image Preview */}
        {selectedImage && (
          <div className="absolute bottom-24 left-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/30 blur-lg rounded-lg group-hover:bg-cyan-500/40 transition-all" />
              <img src={selectedImage} alt="Upload preview" className="relative h-24 w-auto rounded-xl border-2 border-cyan-500/50 object-cover shadow-2xl" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors z-10 scale-0 group-hover:scale-100 duration-200"
              >
                <Icons.Close size={14} />
              </button>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto flex items-end gap-3 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 shadow-[0_0_40px_rgba(0,0,0,0.5)] focus-within:border-cyan-500/50 focus-within:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300">
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3.5 text-gray-400 hover:text-cyan-300 hover:bg-white/5 rounded-2xl transition-all active:scale-95 group"
            title="Upload Image"
          >
            <Icons.Paperclip size={20} className="group-hover:rotate-45 transition-transform" />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileSelect}
          />

          <button 
            onClick={handleVoiceInput}
            className={`p-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center w-12 h-12 ${
              isListening 
                ? 'text-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.3)] ring-1 ring-red-500/50' 
                : 'text-gray-400 hover:text-cyan-300 hover:bg-white/5'
            }`}
            title="Voice Input"
          >
            <VoiceVisualizer isActive={isListening} />
          </button>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={isListening ? "Listening..." : "Ask Frost..."}
            className="flex-1 bg-transparent text-white placeholder-gray-500 p-3.5 max-h-32 min-h-[52px] resize-none focus:outline-none text-base font-light"
            rows={1}
          />

          <button 
            onClick={handleSend}
            disabled={!input.trim() && !selectedImage}
            className="p-3.5 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-2xl shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.7)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
          >
            <Icons.SendHorizontal size={22} className={input.trim() || selectedImage ? "fill-white/20" : ""} />
          </button>
        </div>
        
        <p className="text-center text-[10px] text-gray-500 mt-3 font-medium tracking-wide">
          <span className="text-cyan-500 animate-pulse">●</span> FROST AI v2.5 <span className="mx-2 text-gray-700">|</span> Powered by Gemini
        </p>
      </div>
    </div>
  );
};

export default FrostAI;