import React, { useState } from 'react';
import { Cpu, Send, X, MessageSquare } from 'lucide-react';
import { ModeKey } from '../types';

interface ChatWidgetProps {
  mode: ModeKey;
  city: string;
  data: any;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ mode, city, data }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: string, text: string}>>([]);
  const [chatInput, setChatInput] = useState("");

  const handleChatSend = () => {
    if(!chatInput.trim()) return;
    const userMsg = { role: 'user', text: chatInput };
    setChatHistory([...chatHistory, userMsg]);
    setChatInput("");
    setTimeout(() => {
      let reply = "I can help with that.";
      if(mode === 'USER') reply = `In ${city}, the air is currently ${data.aqi > 200 ? 'unsafe' : 'okay'}. Wear a mask!`;
      if(mode === 'DEV') reply = `Query executed. Latency: 45ms. Returning JSON object for ${city}.`;
      if(mode === 'GOV') reply = `Noted. Draft policy for ${city} pollution control saved to dashboard.`;
      setChatHistory(prev => [...prev, { role: 'ai', text: reply }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {chatOpen && (
        <div className={`mb-4 w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in ${mode === 'DEV' ? 'bg-[#0d1117] border border-gray-700 text-green-400' : 'bg-white text-slate-800'}`}>
          <div className={`p-3 flex justify-between items-center ${mode === 'DEV' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'}`}>
            <div className="flex items-center gap-2"><Cpu size={16} /><span className="text-xs font-bold uppercase">{mode} Assistant</span></div><button onClick={() => setChatOpen(false)}><X size={16} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-opacity-50">
             {chatHistory.length === 0 && <div className="text-center text-xs opacity-50 mt-10">Ask me about AQI, Health, or Code...</div>}
             {chatHistory.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] p-2 rounded-xl text-xs ${msg.role === 'user' ? 'bg-slate-200 text-slate-800' : (mode === 'DEV' ? 'bg-gray-800 border border-green-900' : 'bg-blue-50 text-blue-900 border border-blue-100')}`}>{msg.text}</div></div>))}
          </div>
          <div className="p-2 border-t border-gray-100 flex gap-2">
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleChatSend()} className={`flex-1 text-xs p-2 rounded outline-none ${mode === 'DEV' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`} placeholder="Type..." />
            <button onClick={handleChatSend} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"><Send size={14} /></button>
          </div>
        </div>
      )}
      <button onClick={() => setChatOpen(!chatOpen)} className={`h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 ${mode === 'DEV' ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'}`}>{chatOpen ? <X size={24} /> : <MessageSquare size={24} />}</button>
    </div>
  );
};

export default ChatWidget;
