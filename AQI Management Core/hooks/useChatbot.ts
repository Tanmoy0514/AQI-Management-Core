import { useState, useRef, useEffect } from 'react';
import { AQIData, City, ChatMessage } from '../types';
import { getMaskRecommendation } from '../utils';

export const useChatbot = (
  userName: string, 
  aqiData: AQIData | null, 
  selectedCity: City
) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, type: 'bot', text: 'Hi! I am your AirGuard Assistant. Ask me about the current AQI, mask recommendations, or health tips.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // FIX: Smooth Scrolling for Chatbot
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

    // Simulate AI Processing & Search
    setTimeout(() => {
      let botResponse = '';
      const lowerText = userText.toLowerCase();
      const currentAQI = aqiData?.aqi || 0;
      const maskInfo = getMaskRecommendation(currentAQI);
      const city = selectedCity.name;

      if (lowerText.includes('aqi') || lowerText.includes('pollution') || lowerText.includes('level')) {
        botResponse = `Searching live data for ${city}... \n\nThe current AQI in ${city} is ${currentAQI} (${maskInfo.status}). PM2.5 levels are approx ${aqiData?.pm25} µg/m³.`;
      } else if (lowerText.includes('mask') || lowerText.includes('wear') || lowerText.includes('protection')) {
        botResponse = `Based on the AQI of ${currentAQI} (${maskInfo.status}), I strictly recommend:\n\n👉 **${maskInfo.name}**\n• Layers: ${maskInfo.layers}\n• Note: ${maskInfo.note}`;
      } else if (lowerText.includes('temperature') || lowerText.includes('weather')) {
        botResponse = `It is currently ${aqiData?.temp}°C in ${city} with humidity around ${aqiData?.humidity}%.`;
      } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
        botResponse = `Hello ${userName || 'there'}! I'm monitoring the air quality in ${city}. The current level requires ${maskInfo.name} if you go outside. How can I assist?`;
      } else if (lowerText.includes('advice') || lowerText.includes('health')) {
        botResponse = `For ${city} right now (${maskInfo.status}): \n1. Stay hydrated. \n2. Primary protection: ${maskInfo.name}. \n3. Use an air purifier indoors.`;
      } else {
        botResponse = `I'm tracking updates for ${city} (AQI: ${currentAQI})... \n\nI can help you with: \n• Specific Mask type (${maskInfo.name}) \n• Weather updates \n• Health precautions`;
      }

      setChatMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
      setIsBotTyping(false);
    }, 1200);
  };

  return {
    chatOpen, setChatOpen,
    chatMessages,
    chatInput, setChatInput,
    isBotTyping,
    chatEndRef,
    chatContainerRef,
    handleSendMessage
  };
};