import React, { useState, useEffect } from 'react';
import { CITIES, MODES } from './constants';
import { AQIData, ForecastItem } from './types';
import { getRoleBasedAnalysis } from './utils';
import { Hammer } from 'lucide-react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProfileForm from './components/ProfileForm';
import AdvisoryDisplay from './components/AdvisoryDisplay';
import InfoPanel from './components/InfoPanel';

export default function AirGuardApp() {
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
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['none']);
  const [loading, setLoading] = useState(false);

  // Data State
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);

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
      // Create varied fluctuation to show different colors in chart
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

  const analysis = getRoleBasedAnalysis(aqiData, userRole, institutionName);
  
  // Theme Styles
  const mainBg = darkMode ? 'bg-neutral-950 text-white' : 'bg-blue-50 text-slate-900';
  const cardBg = darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-blue-100';

  // Dynamic Header Title
  const getHeaderTitle = () => {
    if (currentMode === 'user' && userName) {
      return `${userName}'s Dashboard`;
    }
    return MODES.find(m => m.id === currentMode)?.label || 'Dashboard';
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-500 font-sans ${mainBg}`}>
      
      {/* --- SIDEBAR --- */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        
        <Header 
          darkMode={darkMode}
          currentMode={currentMode}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          title={getHeaderTitle()}
          showBack={currentView === 'report'}
          onBack={handleBackToInput}
        />

        {/* Banners */}
        {currentMode === 'dev' && (
          <div className="bg-amber-500/10 border-b border-amber-500/50 p-2 text-center mx-6 mt-2 rounded-lg">
              <p className="text-amber-600 dark:text-amber-400 text-xs font-mono font-bold flex items-center justify-center gap-2">
                  <Hammer className="w-3 h-3" />
                  DEVELOPER MODE ACTIVE
              </p>
          </div>
        )}

        {/* Main Body */}
        <main className="flex-1 p-6 flex flex-col">
          
          {/* VIEW 1: INPUT FORM */}
          {currentView === 'input' && (
            <ProfileForm 
              cardStyles={cardBg}
              darkMode={darkMode}
              userRole={userRole}
              setUserRole={setUserRole}
              userName={userName}
              setUserName={setUserName}
              userAge={userAge}
              setUserAge={setUserAge}
              institutionName={institutionName}
              setInstitutionName={setInstitutionName}
              selectedConditions={selectedConditions}
              handleConditionToggle={handleConditionToggle}
              handleGenerate={handleGenerate}
              loading={loading}
            />
          )}

          {/* VIEW 2: REPORT DASHBOARD */}
          {currentView === 'report' && (
            <AdvisoryDisplay 
              aqiData={aqiData}
              forecast={forecast}
              analysis={analysis}
              darkMode={darkMode}
              cardStyles={cardBg}
              userName={userName}
              userAge={userAge}
              userRole={userRole}
            />
          )}

          {/* --- BOTTOM SECTION (ALWAYS VISIBLE - Dual Console) --- */}
          <InfoPanel 
            aqiData={aqiData}
            darkMode={darkMode}
          />

          {/* Footer */}
          <div className="text-center mt-8 pb-2 opacity-30 text-[10px]">
             © Hack The Galaxy 2026
          </div>

        </main>
      </div>
    </div>
  );
}
