import { useState, useRef, useEffect } from 'react';
import { AQIData, City, ChatMessage } from '../types';
import { getAQIColor } from '../utils';

export const useChatbot = (
  userName: string, 
  aqiData: AQIData | null, 
  selectedCity: City
) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, type: 'bot', text: 'Hi! I am your AirGuard Assistant. Ask me about the current AQI, health tips, or weather updates for your city.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      const status = getAQIColor(currentAQI).label;
      const city = selectedCity.name;

      if (lowerText.includes('aqi') || lowerText.includes('pollution') || lowerText.includes('level')) {
        botResponse = `Searching live data for ${city}... \n\nThe current AQI in ${city} is ${currentAQI} (${status}). PM2.5 levels are approx ${aqiData?.pm25} µg/m³.`;
      } else if (lowerText.includes('mask') || lowerText.includes('wear')) {
        const mask = currentAQI > 200 ? "N95 or N99 mask" : "Standard surgical mask";
        botResponse = `Based on the current level (${status}), I recommend wearing a ${mask} if you are going outdoors.`;
      } else if (lowerText.includes('temperature') || lowerText.includes('weather')) {
        botResponse = `It is currently ${aqiData?.temp}°C in ${city} with humidity around ${aqiData?.humidity}%.`;
      } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
        botResponse = `Hello ${userName || 'there'}! I'm scanning real-time environmental data for ${city}. How can I assist you?`;
      } else if (lowerText.includes('advice') || lowerText.includes('health')) {
        botResponse = `For ${city} right now: \n1. Stay hydrated. \n2. Keep windows closed during peak traffic hours. \n3. Use an air purifier indoors if possible.`;
      } else {
        botResponse = `I'm searching the latest updates for ${city}... \n\nI can help you with: \n• Current AQI details \n• Mask recommendations \n• Weather updates \n• Health precautions`;
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
    handleSendMessage
  };
};