import React, { useState, useEffect } from 'react';
import { CITIES } from './constants';
import { AQIData, ForecastItem } from './types';
import { generateAdvisory } from './utils';
import { Hammer, Building2 } from 'lucide-react';

import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import AdvisoryDisplay from './components/AdvisoryDisplay';
import InfoPanel from './components/InfoPanel';

export default function AirGuardApp() {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [currentMode, setCurrentMode] = useState('user');
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  
  // Form State
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' or 'health'
  const [userRole, setUserRole] = useState('student');
  const [customRole, setCustomRole] = useState('');
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
    setLoading(true);
    setTimeout(() => {
      setIsGenerated(true);
      setLoading(false);
    }, 1200);
  };

  const advisory = generateAdvisory(aqiData, selectedConditions, userRole);
  
  // Theme Styles
  const mainBg = darkMode ? 'bg-neutral-950 text-white' : 'bg-blue-50 text-slate-900';
  const cardBg = darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-blue-100';

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${mainBg}`}>
      
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      {/* --- MODE SPECIFIC BANNERS --- */}
      {currentMode === 'dev' && (
        <div className="bg-amber-500/10 border-b border-amber-500/50 p-2 text-center">
            <p className="text-amber-600 dark:text-amber-400 text-xs font-mono font-bold flex items-center justify-center gap-2">
                <Hammer className="w-3 h-3" />
                DEVELOPER MODE ACTIVE: DEBUGGING & PROGRESS OVERLAY ENABLED
            </p>
        </div>
      )}
      {currentMode === 'gov' && (
        <div className="bg-blue-900 text-white p-2 text-center">
            <p className="text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Building2 className="w-3 h-3" />
                Official Government Portal - Restricted Access
            </p>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="lg:col-span-5 space-y-6">
          <ProfileForm 
            cardStyles={cardBg}
            darkMode={darkMode}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userRole={userRole}
            setUserRole={setUserRole}
            customRole={customRole}
            setCustomRole={setCustomRole}
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
            aqiData={aqiData}
            selectedCity={selectedCity}
            forecast={forecast}
            advisory={advisory}
            darkMode={darkMode}
            cardStyles={cardBg}
          />
        </div>

        {/* --- BOTTOM SECTION: Info Consoles --- */}
        <InfoPanel 
          currentMode={currentMode}
          userRole={userRole}
          selectedCity={selectedCity}
          aqiData={aqiData}
          darkMode={darkMode}
        />

      </main>
    </div>
  );
}
