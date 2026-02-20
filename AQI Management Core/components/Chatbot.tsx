import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, MessageCircle, Send } from 'lucide-react';
import { ChatMessage, AQIData, City } from '../types';
import { getMaskRecommendation } from '../utils/helpers';

interface ChatbotProps {
  darkMode: boolean;
  aqiData: AQIData | null;
  selectedCity: City;
}

const Chatbot: React.FC<ChatbotProps> = ({ darkMode, aqiData, selectedCity }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, type: 'bot', text: 'Hi! I am AirGuard. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen && chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [chatMessages, isBotTyping, chatOpen]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userText }]);
    setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      const maskInfo = getMaskRecommendation(aqiData?.aqi || 0);
      let botResponse = `Current AQI in ${selectedCity.name} is ${aqiData?.aqi}. Recommendation: ${maskInfo.name}.`;
      setChatMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
      setIsBotTyping(false);
    }, 1000);
  };
  
  const cardBg = darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-100 shadow-sm';

  return (
    <div className="fixed bottom-6 right-6 z-50">
       {chatOpen ? (
           <div className={`w-80 h-96 rounded-3xl shadow-2xl flex flex-col border overflow-hidden animate-in slide-in-from-bottom-10 fade-in ${cardBg}`}>
               <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
                   <div className="flex items-center gap-2">
                       <Bot size={20} /> <span className="font-bold">AirGuard AI</span>
                   </div>
                   <button onClick={() => setChatOpen(false)}><X size={18} /></button>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-3">
                   {chatMessages.map(msg => (
                       <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                           <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 dark:bg-neutral-800 rounded-bl-none'}`}>
                               {msg.text}
                           </div>
                       </div>
                   ))}
                   {isBotTyping && <div className="text-xs opacity-50 ml-4">AirGuard is typing...</div>}
                   <div ref={chatEndRef}></div>
               </div>
               <div className="p-3 border-t border-inherit flex gap-2">
                   <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} placeholder="Ask about AQI..." className={`flex-1 p-2 rounded-xl text-sm outline-none ${darkMode ? 'bg-neutral-800' : 'bg-slate-50'}`} />
                   <button onClick={handleSendMessage} className="p-2 bg-blue-600 text-white rounded-xl"><Send size={18} /></button>
               </div>
           </div>
       ) : (
           <button onClick={() => setChatOpen(true)} className="p-4 rounded-full bg-blue-600 text-white shadow-xl hover:scale-110 transition-transform">
               <MessageCircle size={24} />
           </button>
       )}
    </div>
  );
};

export default Chatbot;