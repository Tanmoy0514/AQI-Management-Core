import React, { useState } from 'react';
import { CITIES } from './constants';
import { useAqiData } from './hooks/useAqiData';
import { getThemeStyles } from './utils';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SetupView from './components/SetupView';
import DashboardView from './components/DashboardView';
import PlaceholderView from './components/PlaceholderView';
import ChatWidget from './components/ChatWidget';

export default function AirGuardApp() {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [currentMode, setCurrentMode] = useState('user');
  const [currentView, setCurrentView] = useState('input');
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Form State
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userRole, setUserRole] = useState('student');
  const [loading, setLoading] = useState(false);

  // Data Hook
  const { aqiData, forecast } = useAqiData(selectedCity);

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

  // Get dynamic styles based on state
  const theme = getThemeStyles(currentView, currentMode, darkMode, aqiData);

  return (
    <div className={`flex h-screen w-full transition-all duration-700 font-sans ${theme.wrapper} overflow-hidden`}>
      
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        setCurrentView={setCurrentView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        theme={theme}
      />

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        <Header 
            currentMode={currentMode}
            currentView={currentView}
            setCurrentView={setCurrentView}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            theme={theme}
            darkMode={darkMode}
        />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth no-scrollbar">
            
            {/* 1. HOME / SETUP VIEW */}
            {currentMode === 'user' && currentView === 'input' && (
                <SetupView 
                    userName={userName}
                    setUserName={setUserName}
                    userAge={userAge}
                    setUserAge={setUserAge}
                    userRole={userRole}
                    setUserRole={setUserRole}
                    loading={loading}
                    handleGenerate={handleGenerate}
                    darkMode={darkMode}
                    theme={theme}
                />
            )}

            {/* 2. DASHBOARD (Immersive) */}
            {currentMode === 'user' && currentView === 'report' && aqiData && (
                <DashboardView 
                    aqiData={aqiData}
                    forecast={forecast}
                    selectedCity={selectedCity}
                    userName={userName}
                    userRole={userRole}
                    theme={theme}
                />
            )}

            {/* OTHER MODES */}
            {(currentMode === 'dev' || currentMode === 'gov') && (
                <PlaceholderView />
            )}
        </div>
      </main>

      {/* --- CHATBOT WIDGET --- */}
      {currentMode === 'user' && (
        <ChatWidget 
            aqiData={aqiData}
            selectedCity={selectedCity}
        />
      )}
    </div>
  );
}