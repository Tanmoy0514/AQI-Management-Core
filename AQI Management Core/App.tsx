import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserInput from './components/user/UserInput';
import ReportView from './components/user/ReportView';
import DeveloperConsole from './components/DeveloperConsole';
import GovernmentPortal from './components/GovernmentPortal';
import { CITIES } from './constants';
import { AQIData, ForecastDay } from './types';

export default function App() {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [currentMode, setCurrentMode] = useState('user');
  const [currentView, setCurrentView] = useState('input'); // 'input' or 'report'
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Form State
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userRole, setUserRole] = useState('student');
  const [institutionName, setInstitutionName] = useState('');
  const [selectedConditions, setSelectedConditions] = useState(['none']);
  const [loading, setLoading] = useState(false);

  // Data State
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  
  // Dev Mode State
  const [showDevPopup, setShowDevPopup] = useState(true);

  // Simulate Data Fetching when City changes
  useEffect(() => {
    // Simulate API fetch for current city
    const randomFluctuation = Math.floor(Math.random() * 40) - 20;
    const currentAQI = Math.max(20, selectedCity.baseAQI + randomFluctuation);
    
    setAqiData({
      aqi: currentAQI,
      pm25: currentAQI / 2.5,
      temp: 32 + (Math.random() * 4 - 2),
    });

    // Simulate 7-Day Forecast with Real Day Names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay();
    
    const next7Days = Array.from({ length: 7 }).map((_, i) => {
      const dayFluctuation = Math.floor(Math.random() * 150) - 50; 
      const dayAQI = Math.max(30, Math.min(500, selectedCity.baseAQI + dayFluctuation));
      const dayLabel = i === 0 ? 'Today' : days[(todayIndex + i) % 7];

      return {
        day: dayLabel,
        aqi: dayAQI,
      };
    });
    setForecast(next7Days);
  }, [selectedCity]);

  // Dev Popup reset
  useEffect(() => {
    if (currentMode === 'dev') {
        setShowDevPopup(true);
    }
  }, [currentMode]);

  const handleConditionToggle = (id: string) => {
    if (id === 'none') {
      setSelectedConditions(['none']);
      return;
    }
    const newConditions = selectedConditions.filter(c => c !== 'none');
    if (selectedConditions.includes(id)) {
      setSelectedConditions(newConditions.filter(c => c !== id));
    } else {
      setSelectedConditions([...newConditions, id]);
    }
  };

  const handleGenerate = () => {
    if (!userName || !userAge) {
      alert("Please complete your Identity details (Name & Age).");
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

  // Theme Styles
  const mainBg = darkMode ? 'bg-neutral-950 text-white' : 'bg-blue-50 text-slate-900';
  const cardBg = darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-blue-100';
  const headerBg = darkMode ? 'bg-neutral-900/90' : 'bg-white/90';
  const sidebarBg = darkMode ? 'bg-neutral-900 border-stone-800' : 'bg-white border-slate-200';
  const inputBg = darkMode ? 'bg-stone-800 hover:bg-stone-700 text-white border-stone-700' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-transparent';
  const activeInputBg = darkMode ? 'bg-stone-700 border-amber-500 text-amber-400' : 'bg-blue-50 border-blue-500 text-blue-600';

  return (
    <div className={`min-h-screen flex transition-colors duration-500 font-sans ${mainBg}`}>
      
      {/* --- SIDEBAR --- */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        sidebarBg={sidebarBg}
      />

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        
        {/* Header */}
        <Header 
            currentMode={currentMode}
            userName={userName}
            currentView={currentView}
            handleBackToInput={handleBackToInput}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            headerBg={headerBg}
            darkMode={darkMode}
        />

        {/* --- DYNAMIC MAIN CONTENT --- */}
        <main className="flex-1 p-6 flex flex-col">
          
          {/* USER DASHBOARD */}
          {currentMode === 'user' && (
            <>
              {currentView === 'input' && (
                <UserInput 
                  userName={userName} setUserName={setUserName}
                  userAge={userAge} setUserAge={setUserAge}
                  userRole={userRole} setUserRole={setUserRole}
                  institutionName={institutionName} setInstitutionName={setInstitutionName}
                  selectedConditions={selectedConditions} handleConditionToggle={handleConditionToggle}
                  loading={loading} handleGenerate={handleGenerate}
                  darkMode={darkMode} cardBg={cardBg} inputBg={inputBg} activeInputBg={activeInputBg}
                />
              )}
              {currentView === 'report' && (
                <ReportView 
                  userName={userName}
                  userAge={userAge}
                  userRole={userRole}
                  institutionName={institutionName}
                  aqiData={aqiData}
                  forecast={forecast}
                  darkMode={darkMode}
                  cardBg={cardBg}
                />
              )}
            </>
          )}

          {/* DEVELOPER CONSOLE */}
          {currentMode === 'dev' && (
            <DeveloperConsole 
                darkMode={darkMode} 
                showDevPopup={showDevPopup} 
                setShowDevPopup={setShowDevPopup} 
            />
          )}

          {/* GOVERNMENT PORTAL */}
          {currentMode === 'gov' && (
             <GovernmentPortal darkMode={darkMode} />
          )}

          {/* Footer (Common) */}
          <div className="text-center mt-8 pb-2 opacity-30 text-[10px]">
             © Hack The Galaxy 2026
          </div>

        </main>
      </div>
    </div>
  );
}