import React, { useState, useEffect } from 'react';
import { CITIES } from './constants';
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
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Form State
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userRole, setUserRole] = useState('student');
  const [institutionName, setInstitutionName] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['none']);
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Data State
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);

  // Simulate Data Fetching when City changes
  useEffect(() => {
    // Reset generation when city changes
    setIsGenerated(false);
    
    // Simulate API fetch for current city
    const randomFluctuation = Math.floor(Math.random() * 40) - 20;
    const currentAQI = Math.max(20, selectedCity.baseAQI + randomFluctuation);
    
    setAqiData({
      aqi: currentAQI,
      pm25: currentAQI / 2.5,
      temp: 32 + (Math.random() * 4 - 2),
    });

    // Simulate 7-Day Forecast (Linear Heatmap Data)
    const next7Days = Array.from({ length: 7 }).map((_, i) => {
      const dayFluctuation = Math.floor(Math.random() * 60) - 30;
      return {
        day: `Day ${i + 1}`,
        aqi: Math.max(30, selectedCity.baseAQI + dayFluctuation),
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
      setIsGenerated(true);
      setLoading(false);
    }, 1500);
  };

  const analysis = getRoleBasedAnalysis(aqiData, userRole, institutionName);
  
  // Theme Styles
  const mainBg = darkMode ? 'bg-neutral-950 text-white' : 'bg-blue-50 text-slate-900';
  const cardBg = darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-blue-100';

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

        {/* Content Body */}
        <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: INPUTS */}
          <div className="lg:col-span-5 space-y-6">
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
          </div>

          {/* RIGHT COLUMN: RESULTS */}
          <div className="lg:col-span-7">
            <AdvisoryDisplay 
              isGenerated={isGenerated}
              loading={loading}
              aqiData={aqiData}
              forecast={forecast}
              analysis={analysis}
              darkMode={darkMode}
              cardStyles={cardBg}
              userName={userName}
              userAge={userAge}
              userRole={userRole}
              institutionName={institutionName}
            />
          </div>

          {/* --- BOTTOM SECTION: Info Consoles --- */}
          <InfoPanel 
            currentMode={currentMode}
            userRole={userRole}
            userAge={userAge}
            userName={userName}
            selectedCity={selectedCity}
            aqiData={aqiData}
            darkMode={darkMode}
          />

        </main>
      </div>
    </div>
  );
}
