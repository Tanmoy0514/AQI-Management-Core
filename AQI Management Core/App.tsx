import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudLightning, ShieldAlert } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import InputForm from './views/user/InputForm';
import Report from './views/user/Report';
import DeveloperConsole from './views/DeveloperConsole';
import GovernmentPortal from './views/GovernmentPortal';
import { CITIES } from './data/constants';
import { AQIData, ForecastDay, City, ThemeStyles } from './types';

export default function App() {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [currentMode, setCurrentMode] = useState('user');
  const [currentView, setCurrentView] = useState<'input' | 'report'>('input');
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Form State
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userRole, setUserRole] = useState('student');
  const [loading, setLoading] = useState(false);

  // Data State
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  
  // Simulate Data Fetching when City changes
  useEffect(() => {
    // Simulate API fetch for current city
    const randomFluctuation = Math.floor(Math.random() * 40) - 20;
    const currentAQI = Math.max(20, selectedCity.baseAQI + randomFluctuation);
    
    setAqiData({
      aqi: currentAQI,
      pm25: Math.floor(currentAQI / 2.5),
      pm10: Math.floor(currentAQI / 1.8),
      o3: Math.floor(Math.random() * 50),
      no2: Math.floor(Math.random() * 40),
      temp: Math.floor(32 + (Math.random() * 4 - 2)),
      humidity: Math.floor(40 + Math.random() * 20),
      wind: Math.floor(5 + Math.random() * 10)
    });

    // Simulate 7-Day Forecast with Real Day Names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay();
    
    const next7Days = Array.from({ length: 7 }).map((_, i) => {
      const dayFluctuation = Math.floor(Math.random() * 100) - 30; 
      const dayAQI = Math.max(30, Math.min(500, selectedCity.baseAQI + dayFluctuation));
      const dayLabel = i === 0 ? 'Today' : days[(todayIndex + i) % 7];

      return {
        day: dayLabel,
        aqi: dayAQI,
      };
    });
    setForecast(next7Days);
  }, [selectedCity]);

  const handleGenerate = () => {
    if (!userName || !userAge) {
      alert("Please enter your Name and Age to continue.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setCurrentView('report');
      setLoading(false);
    }, 1500);
  };

  const handleBackToInput = () => {
    setCurrentView('input');
  };
  
  // --- Dynamic Styling Logic (Samsung Weather Style) ---
  const getThemeStyles = (): ThemeStyles => {
    // Default App Theme (Input Mode)
    if (currentView === 'input' || currentMode !== 'user') {
      return {
        wrapper: darkMode ? 'bg-neutral-950 text-white' : 'bg-slate-50 text-slate-900',
        card: darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200 shadow-sm',
        textMuted: darkMode ? 'text-neutral-400' : 'text-slate-500',
        button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30',
        immersive: false
      };
    }

    // Immersive Report Theme (Based on AQI)
    const aqi = aqiData?.aqi || 0;
    let gradient = '';
    let icon = Sun;

    if (aqi <= 50) { // Good
        gradient = 'bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600';
        icon = Sun;
    } else if (aqi <= 100) { // Moderate
        gradient = 'bg-gradient-to-br from-blue-500 via-indigo-400 to-amber-300';
        icon = Cloud;
    } else if (aqi <= 200) { // Poor
        gradient = 'bg-gradient-to-br from-orange-400 via-amber-500 to-slate-500';
        icon = CloudLightning;
    } else { // Hazardous
        gradient = 'bg-gradient-to-br from-purple-700 via-rose-600 to-orange-500';
        icon = ShieldAlert;
    }

    return {
        wrapper: `${gradient} text-white selection:bg-white/30`,
        card: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white',
        textMuted: 'text-white/70',
        button: 'bg-white/20 hover:bg-white/30 text-white border border-white/30',
        immersive: true,
        weatherIcon: icon
    };
  };

  const theme = getThemeStyles();

  return (
    <div className={`flex h-screen w-full transition-all duration-700 font-sans overflow-hidden ${theme.wrapper}`}>
      
      {/* --- SIDEBAR --- */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        theme={theme}
        setCurrentView={setCurrentView}
      />

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        {/* Header */}
        <Header 
          currentMode={currentMode}
          userName={userName}
          currentView={currentView}
          handleBackToInput={handleBackToInput}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          darkMode={darkMode}
          theme={theme}
        />

        {/* --- DYNAMIC MAIN CONTENT --- */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth no-scrollbar">
          
          {/* USER DASHBOARD */}
          {currentMode === 'user' && (
            <>
              {currentView === 'input' && (
                <InputForm 
                  userName={userName} setUserName={setUserName}
                  userAge={userAge} setUserAge={setUserAge}
                  userRole={userRole} setUserRole={setUserRole}
                  loading={loading} handleGenerate={handleGenerate}
                  darkMode={darkMode} theme={theme}
                />
              )}
              {currentView === 'report' && (
                <Report 
                   userName={userName}
                   userRole={userRole}
                   aqiData={aqiData}
                   forecast={forecast}
                   theme={theme}
                   selectedCity={selectedCity}
                   darkMode={darkMode}
                />
              )}
            </>
          )}

          {/* OTHER PORTALS */}
          {currentMode === 'dev' && <DeveloperConsole darkMode={darkMode} />}
          {currentMode === 'gov' && <GovernmentPortal darkMode={darkMode} />}

        </div>
      </div>

      {/* --- CHATBOT (User Mode Only) --- */}
      {currentMode === 'user' && (
        <Chatbot 
          darkMode={darkMode}
          aqiData={aqiData}
          selectedCity={selectedCity}
        />
      )}

    </div>
  );
}