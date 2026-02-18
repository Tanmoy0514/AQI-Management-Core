import React from 'react';
import { MessageCircle, Send, X, Bot, Search } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatbotProps {
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (val: string) => void;
  isBotTyping: boolean;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
  handleSendMessage: () => void;
  darkMode: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({
  chatOpen, setChatOpen,
  chatMessages,
  chatInput, setChatInput,
  isBotTyping,
  chatEndRef,
  chatContainerRef,
  handleSendMessage,
  darkMode
}) => {
  
  const handleChatKeyDown = (e: React.KeyboardEvent) => { 
    if (e.key === 'Enter') handleSendMessage(); 
  };

  return (
    <>
      {/* Chat Window with FIX for Border and Smooth Scroll */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-[60] animate-in slide-in-from-bottom-10 fade-in zoom-in-95">
          {/* Wrapper for the Colorful Gradient Border with Rounded Corners */}
          <div className="p-[2px] rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 shadow-2xl">
            <div className={`w-80 md:w-96 rounded-[22px] overflow-hidden flex flex-col bg-white dark:bg-stone-900`}>
              
              {/* Header */}
              <div className="p-4 bg-slate-50 dark:bg-stone-800 border-b dark:border-stone-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                     <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>AirGuard Assistant</h3>
                     <p className="text-[10px] text-green-500 flex items-center gap-1 font-bold">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> Online
                     </p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className={`p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-stone-700 text-stone-400' : 'hover:bg-slate-200 text-slate-400'}`}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 h-80 overflow-y-auto p-4 space-y-3 bg-white dark:bg-stone-900 scroll-smooth" ref={chatContainerRef}>
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm
                       ${msg.type === 'user' 
                         ? 'bg-blue-600 text-white rounded-br-none' 
                         : (darkMode ? 'bg-stone-800 text-slate-200 rounded-bl-none border border-stone-700' : 'bg-slate-50 text-slate-700 border border-slate-200 rounded-bl-none')
                       }`}
                     >
                       {msg.text.split('\n').map((line, i) => (
                         <React.Fragment key={i}>
                           {line}
                           {i !== msg.text.split('\n').length - 1 && <br />}
                         </React.Fragment>
                       ))}
                     </div>
                  </div>
                ))}
                {isBotTyping && (
                  <div className="flex justify-start">
                    <div className={`rounded-2xl rounded-bl-none px-4 py-3 bg-slate-50 dark:bg-stone-800 border dark:border-stone-700 flex gap-1 items-center`}>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                      <span className="text-xs ml-2 text-slate-400 flex items-center gap-1"><Search className="w-3 h-3"/> Searching...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t bg-slate-50 dark:bg-stone-800 dark:border-stone-700">
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleChatKeyDown}
                    placeholder="Type 'Mask', 'AQI'..." 
                    className={`flex-1 p-2.5 text-sm rounded-xl outline-none border transition-all
                      ${darkMode ? 'bg-stone-900 border-stone-700 text-white focus:border-purple-500' : 'bg-white border-slate-200 focus:border-purple-500'}
                    `}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isBotTyping}
                    className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setChatOpen(!chatOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-all hover:scale-110 active:scale-95
          ${chatOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white'}
        `}
      >
        {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!chatOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        )}
      </button>
    </>
  );
};

export default Chatbot;