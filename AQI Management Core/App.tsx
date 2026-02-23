import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import { streamGeminiResponse } from './services/geminiService';
import { ChatMessage, MessageRole, ChatState } from './types';
import { MarkdownRenderer } from './components/MarkdownRenderer';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      // Create a placeholder for the bot message
      const botMessageId = (Date.now() + 1).toString();
      const initialBotMessage: ChatMessage = {
        id: botMessageId,
        role: MessageRole.MODEL,
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };
      
      setMessages((prev) => [...prev, initialBotMessage]);

      let fullContent = '';

      // Stream the response
      await streamGeminiResponse(userMessage.content, (chunk) => {
        fullContent += chunk;
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === botMessageId 
              ? { ...msg, content: fullContent } 
              : msg
          )
        );
      });

      // Mark streaming as finished
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === botMessageId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );

    } catch (err: any) {
      setError(err.message || 'An error occurred while communicating with Gemini.');
      // Remove the empty bot message if it failed immediately
      setMessages((prev) => prev.filter(msg => msg.content !== '' || msg.role !== MessageRole.MODEL));
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 text-gray-100 font-sans">
      {/* Header */}
      <header className="flex-none p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">Gemini AI Assistant</h1>
              <p className="text-xs text-gray-400">Powered by Gemini 3 Flash</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500 space-y-4">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-300">How can I help you today?</h2>
              <p className="max-w-md">
                I can help you write code, analyze data, brainstorm ideas, or just have a chat.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${
                  msg.role === MessageRole.USER ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-none w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === MessageRole.USER
                      ? 'bg-indigo-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {msg.role === MessageRole.USER ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <div
                  className={`flex-1 max-w-[85%] rounded-2xl p-4 shadow-sm ${
                    msg.role === MessageRole.USER
                      ? 'bg-indigo-600/10 border border-indigo-500/20 text-indigo-50'
                      : 'bg-gray-800/50 border border-gray-700/50 text-gray-100'
                  }`}
                >
                  <div className="prose prose-invert prose-sm max-w-none">
                     <MarkdownRenderer content={msg.content} />
                  </div>
                  {msg.isStreaming && (
                     <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 animate-pulse align-middle" />
                  )}
                </div>
              </div>
            ))
          )}
          
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-200 text-sm">
              <AlertCircle className="w-5 h-5 flex-none" />
              <p>{error}</p>
            </div>
          )}
          
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none p-4 bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
        <div className="max-w-3xl mx-auto relative">
          <div className="relative flex items-end gap-2 p-2 bg-gray-800/50 border border-gray-700 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all shadow-lg">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Gemini..."
              className="w-full bg-transparent text-gray-100 placeholder-gray-500 px-4 py-3 min-h-[52px] max-h-[200px] resize-none focus:outline-none text-base"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className={`flex-none p-3 rounded-xl transition-all duration-200 ${
                input.trim() && !isLoading
                  ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-500">
              Gemini can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;