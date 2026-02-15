import React, { useState, useEffect } from 'react';
import { Hammer } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserInput from './components/user/UserInput';
import ReportView from './components/user/ReportView';
import DashboardWidgets from './components/DashboardWidgets';
import { CITIES } from './constants';
import { useSimulation } from './hooks/useSimulation';
import { useUserProfile } from './hooks/useUserProfile';

export default function App() {
  // Navigation & Theme State
  const [darkMode, setDarkMode] = useState(false);
  const [currentMode, setCurrentMode] = useState('user');
  const [currentView, setCurrentView] = useState('input'); // 'input' or 'report'
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Logic Hooks
  const { aqiData, forecast } = useSimulation(selectedCity);
  const {
    userName, setUserName,
    userAge, setUserAge,
    userRole, setUserRole,
    institutionName, setInstitutionName,
    selectedConditions, handleConditionToggle,
    loading, setLoading
  } = useUserProfile();

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

        {/* Banners */}
        {currentMode === 'dev' && (
          <div className="bg-amber-500/10 border-b border-amber-500/50 p-2 text-center mx-6 mt-2 rounded-lg">
              <p className="text-amber-600 dark:text-amber-400 text-xs font-mono font-bold flex items-center justify-center gap-2">
                  <Hammer className="w-3 h-3" />
                  DEVELOPER MODE ACTIVE
              </p>
          </div>
        )}

        {/* --- DYNAMIC MAIN CONTENT --- */}
        <main className="flex-1 p-6 flex flex-col">
          
          {/* VIEW 1: INPUT FORM */}
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

          {/* VIEW 2: REPORT DASHBOARD */}
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

          {/* --- BOTTOM SECTION (ALWAYS VISIBLE - Dual Console) --- */}
          <DashboardWidgets darkMode={darkMode} aqiData={aqiData} />

          {/* Footer (Common) */}
          <div className="text-center mt-8 pb-2 opacity-30 text-[10px]">
             © Hack The Galaxy 2026
          </div>

        </main>
      </div>
    </div>
  );
}