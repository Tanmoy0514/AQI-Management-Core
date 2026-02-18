import React, { useState, useEffect } from 'react';
import { Construction } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserInput from './components/user/UserInput';
import ReportView from './components/user/ReportView';
import DeveloperConsole from './components/DeveloperConsole';
import GovernmentPortal from './components/GovernmentPortal';
import Chatbot from './components/Chatbot';
import { CITIES } from './constants';
import { useSimulation } from './hooks/useSimulation';
import { useUserProfile } from './hooks/useUserProfile';
import { useChatbot } from './hooks/useChatbot';

export default function App() {
  // Navigation & Theme State
  const [darkMode, setDarkMode] = useState(false);
  const [currentMode, setCurrentMode] = useState('user');
  const [currentView, setCurrentView] = useState('input'); // 'input' or 'report'
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDevPopup, setShowDevPopup] = useState(true);

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

  const chatbotProps = useChatbot(userName, aqiData, selectedCity);

  // Reset Dev Popup when entering Dev mode
  useEffect(() => {
    if (currentMode === 'dev') {
        setShowDevPopup(true);
    }
  }, [currentMode]);

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
        <main className="flex-1 p-6 flex flex-col relative">
          
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

          {/* FALLBACK FOR UNKNOWN MODES */}
          {currentMode !== 'user' && currentMode !== 'dev' && currentMode !== 'gov' && (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
                <Construction className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-bold">Portal Under Maintenance</h3>
                <p>Please switch to User Dashboard.</p>
            </div>
          )}

          {/* Footer (Common) */}
          <div className="text-center mt-8 pb-2 opacity-30 text-[10px]">
             © Hack The Galaxy 2026
          </div>

        </main>
      </div>

      {/* CHATBOT (User Mode Only) */}
      {currentMode === 'user' && (
        <Chatbot {...chatbotProps} darkMode={darkMode} />
      )}
    </div>
  );
}