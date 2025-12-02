import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Icons } from './Icon';
import { chatWithFrost } from '../services/geminiService';
import { ChatMessage } from '../types';

// Snow Component (Reused for consistent aesthetics)
const Snow = () => {
  const snowflakes = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 10 + 10}s`,
    animationDelay: `${Math.random() * 10}s`,
    opacity: Math.random() * 0.5 + 0.1,
    size: Math.random() * 3 + 2 + 'px'
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full animate-fall"
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

interface FrostAIProps {
  onBack: () => void;
}

const FrostAI: React.FC<FrostAIProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Stay cool! I'm FROST AI. Ask me anything, upload an image, or use your voice!", timestamp: Date.now() }
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
    setSelectedImage(null); // Clear image after sending
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
    <div className="flex flex-col h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black pointer-events-none" />
      <Snow />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
        <button onClick={onBack} className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors">
          <Icons.Back size={20} /> <span className="font-medium">Back</span>
        </button>
        <div className="flex items-center gap-3">
          <Icons.Bot size={28} className="text-cyan-400 animate-pulse" />
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            FROST AI
          </h1>
        </div>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Chat Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 hide-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[85%] sm:max-w-[70%] rounded-2xl p-4 shadow-xl backdrop-blur-md border
              ${msg.role === 'user' 
                ? 'bg-blue-600/20 border-blue-500/30 text-white rounded-br-none' 
                : 'bg-slate-800/60 border-cyan-500/20 text-cyan-50 rounded-bl-none shadow-[0_0_15px_rgba(6,182,212,0.1)]'}
            `}>
              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Icons.Bot size={14} /> Frost AI
                </div>
              )}
              
              {/* If this is a user message and had an image attached (this is a simplification, ideally we store image in message history) */}
              
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <p className="text-[10px] opacity-50 mt-2 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800/60 border border-cyan-500/20 rounded-2xl rounded-bl-none p-4 flex gap-2 items-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative z-20 p-4 bg-slate-900/90 backdrop-blur-xl border-t border-white/10">
        
        {/* Image Preview */}
        {selectedImage && (
          <div className="absolute bottom-full left-4 mb-2 p-2 bg-slate-800 rounded-lg border border-white/10 shadow-lg">
            <div className="relative">
              <img src={selectedImage} alt="Upload preview" className="h-20 w-auto rounded-md object-cover" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
              >
                <Icons.Close size={12} />
              </button>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-inner focus-within:border-cyan-500/50 transition-colors">
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all"
            title="Upload Image"
          >
            <Icons.Paperclip size={20} />
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
            className={`p-3 rounded-xl transition-all ${isListening ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-gray-400 hover:text-cyan-400 hover:bg-white/5'}`}
            title="Voice Input"
          >
            <Icons.Mic size={20} />
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
            placeholder={isListening ? "Listening..." : "Ask FROST AI anything..."}
            className="flex-1 bg-transparent text-white placeholder-gray-500 p-3 max-h-32 min-h-[48px] resize-none focus:outline-none scrollbar-hide"
            rows={1}
          />

          <button 
            onClick={handleSend}
            disabled={!input.trim() && !selectedImage}
            className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Icons.SendHorizontal size={20} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-600 mt-2">
          FROST AI can make mistakes. It is powered by Gemini.
        </p>
      </div>
    </div>
  );
};

export default FrostAI;