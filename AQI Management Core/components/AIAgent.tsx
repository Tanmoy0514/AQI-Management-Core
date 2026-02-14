import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Send } from 'lucide-react';
import { AIAgentProps } from '../types';
import { CITIES } from '../constants';

const AIAgent: React.FC<AIAgentProps> = ({ mode, city }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { role: 'ai', text: `System Initialized. Connected to ${city} Grid. Waiting for input...` }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
     // Mode switch greeting
     let msg = "";
     if (mode === 'USER') msg = `Hello! I'm your health guardian. Ask me about "${city}" safety.`;
     if (mode === 'DEV') msg = `Debug Console Active. APIs loaded for ${city}. Query JSON endpoints now.`;
     if (mode === 'GOV') msg = `COMMAND MODE: Authorized. Ready to deploy mandates for ${city}.`;
     
     setHistory(prev => [...prev, { role: 'ai', text: msg }]);
  }, [mode, city]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newHistory = [...history, { role: 'user', text: input }];
    setHistory(newHistory);
    setInput('');

    // Simulated AI Response based on context
    setTimeout(() => {
      let response = "Processing...";
      // @ts-ignore - Dynamic key access for mock data compatibility
      const currentCityData = CITIES[city.toUpperCase()] || CITIES.DELHI; 
      
      if (mode === 'USER') response = `Based on AQI ${currentCityData.aqi || 300}, I strongly advise against outdoor activity. Your risk of respiratory inflammation is high.`;
      if (mode === 'DEV') response = `{ "status": "success", "query": "${input}", "dataset": "sentinel_v4", "nodes": 14 }`;
      if (mode === 'GOV') response = `Action Logged: "${input}". Disseminating to district magistrates via secure channel.`;
      
      setHistory(prev => [...prev, { role: 'ai', text: response }]);
    }, 800);
  };

  return (
    <div className={`fixed bottom-0 right-0 w-full md:w-96 h-[300px] bg-slate-950/95 border-t border-l ${mode === 'DEV' ? 'border-green-500' : mode === 'GOV' ? 'border-red-500' : 'border-cyan-500'} flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 transition-colors duration-500`}>
      {/* Agent Header */}
      <div className={`p-3 border-b ${mode === 'DEV' ? 'border-green-900 bg-green-900/20' : mode === 'GOV' ? 'border-red-900 bg-red-900/20' : 'border-cyan-900 bg-cyan-900/20'} flex justify-between items-center`}>
        <div className="flex items-center gap-2">
          <Cpu size={16} className={mode === 'DEV' ? 'text-green-400' : mode === 'GOV' ? 'text-red-400' : 'text-cyan-400'} />
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            {mode === 'DEV' ? 'Dev_Bot_v1.0' : mode === 'GOV' ? 'Gov_Admin_AI' : 'Health_Agent'}
          </span>
        </div>
        <div className="flex gap-1">
          <div className={`w-2 h-2 rounded-full ${mode === 'DEV' ? 'bg-green-500' : mode === 'GOV' ? 'bg-red-500' : 'bg-cyan-500'} animate-pulse`}></div>
        </div>
      </div>

      {/* Chat History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2 rounded ${
              msg.role === 'user' 
                ? 'bg-slate-800 text-slate-200' 
                : mode === 'DEV' ? 'bg-green-900/20 text-green-400 border border-green-900' 
                : mode === 'GOV' ? 'bg-red-900/20 text-red-400 border border-red-900' 
                : 'bg-cyan-900/20 text-cyan-300 border border-cyan-900'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-black/30 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={mode === 'DEV' ? 'Enter SQL/JSON query...' : 'Ask about air safety...'}
          className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-slate-600 font-mono"
        />
        <button onClick={handleSend} className="text-slate-400 hover:text-white"><Send size={16} /></button>
      </div>
    </div>
  );
};

export default AIAgent;