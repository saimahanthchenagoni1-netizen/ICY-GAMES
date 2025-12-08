
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icon';
import { chatWithFrost } from '../services/geminiService';
import { ChatMessage } from '../types';

interface FrostAIProps {
  onBack?: () => void;
}

const FrostAI: React.FC<FrostAIProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Greetings. I am Frosty, your intelligent assistant. How may I be of service today?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await chatWithFrost(userMsg.text);
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

  return (
    <div className="flex flex-col h-full bg-transparent text-white relative font-sans">
      
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-black/20">
         <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-pulse">
            <Icons.Bot size={24} className="text-white" />
         </div>
         <div>
            <h2 className="text-xl font-bold">Frosty AI</h2>
            <div className="flex items-center gap-2 text-xs text-cyan-400">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
               </span>
               Online & Ready
            </div>
         </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`
              max-w-[80%] px-6 py-4 rounded-2xl shadow-md text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-sm' 
                : 'bg-[#0f1016] text-gray-200 border border-white/5 rounded-bl-sm'}
            `}>
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#0f1016] border border-white/5 rounded-2xl rounded-bl-sm px-6 py-4 flex gap-2 items-center">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/5 bg-black/20">
        <div className="relative flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 bg-[#0a0b10] border border-white/10 focus:border-cyan-500/50 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 outline-none transition-all shadow-inner"
            autoFocus
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <Icons.SendHorizontal size={20} />
          </button>
        </div>
        <div className="text-center mt-3 text-[10px] text-gray-600">
           AI generated responses may vary. Powered by Gemini.
        </div>
      </div>
    </div>
  );
};

export default FrostAI;
