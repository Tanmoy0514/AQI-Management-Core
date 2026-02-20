import React from 'react';
import { Wind, Menu, Sun, Moon, Activity } from 'lucide-react';
import { MODES, CITIES } from '../data/constants';
import { ThemeStyles } from '../types';
import { getMaskRecommendation } from '../utils/helpers';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentMode: string;
  setCurrentMode: (mode: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  theme: ThemeStyles;
  setCurrentView: (view: 'input' | 'report') => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  currentMode,
  setCurrentMode,
  darkMode,
  setDarkMode,
  theme,
  setCurrentView
}) => {
  
  const sidebarClasses = theme.immersive 
    ? 'bg-black/10 backdrop-blur-lg border-r border-white/10' 
    : (darkMode ? 'bg-neutral-900 border-r border-neutral-800' : 'bg-white border-r border-slate-200');

  const textClasses = theme.immersive ? 'text-white' : (darkMode ? 'text-white' : 'text-slate-800');
  const borderClass = theme.immersive ? 'border-white/10' : 'border-inherit';

  return (
    <aside 
      className={`flex-shrink-0 transition-all duration-300 flex flex-col z-20 ${sidebarClasses} ${sidebarOpen ? 'w-64' : 'w-20'}`}
    >
      <div className={`h-16 flex items-center justify-between px-4 border-b ${borderClass}`}>
        {sidebarOpen && (
            <div className={`font-bold text-xl tracking-tight flex items-center gap-2 ${textClasses}`}>
                <Wind className={theme.immersive ? 'text-white' : 'text-blue-500'} /> AirGuard
            </div>
        )}
        <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 ${!sidebarOpen && 'mx-auto'}`}
        >
          <Menu size={20} className={textClasses} />
        </button>
      </div>

      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {MODES.map(mode => (
          <button
            key={mode.id}
            onClick={() => { setCurrentMode(mode.id); }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-medium text-sm
              ${currentMode === mode.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : `${theme.textMuted} hover:bg-black/5 dark:hover:bg-white/5`
              } ${!sidebarOpen && 'justify-center'}`}
            title={!sidebarOpen ? mode.label : ''}
          >
            <mode.icon size={20} />
            {sidebarOpen && <span>{mode.label}</span>}
          </button>
        ))}
        
        {/* LIVE RANKING WIDGET */}
        {sidebarOpen && (
          <div className={`mt-8 pt-6 border-t ${borderClass}`}>
              <div className={`px-3 mb-3 flex items-center justify-between`}>
                  <span className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>Live Ranking</span>
                  <Activity size={12} className={theme.textMuted} />
              </div>
              <div className="space-y-2">
                  {CITIES.sort((a,b) => b.baseAQI - a.baseAQI).slice(0, 5).map((city, idx) => {
                       const mask = getMaskRecommendation(city.baseAQI);
                       return (
                          <div key={idx} className={`mx-2 p-2 rounded-lg flex items-center justify-between text-xs hover:bg-white/5 transition-colors ${textClasses}`}>
                              <div className="flex items-center gap-2">
                                  <span className="w-5 text-center font-mono opacity-50">{idx+1}</span>
                                  <span className="font-medium">{city.name}</span>
                              </div>
                              <div className={`px-2 py-0.5 rounded font-bold ${mask.colorClass} ${mask.colorClass.includes('bg-white') || mask.colorClass.includes('bg-slate') ? 'text-slate-800' : 'text-white'}`}>
                                  {city.baseAQI}
                              </div>
                          </div>
                       );
                  })}
              </div>
          </div>
        )}
      </nav>

      <div className={`p-4 border-t ${borderClass}`}>
         <button onClick={() => setDarkMode(!darkMode)} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${darkMode ? 'bg-neutral-800 text-yellow-400' : 'bg-slate-100 text-slate-600'} ${!sidebarOpen && 'justify-center'}`}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {sidebarOpen && <span className="text-sm font-medium">Toggle Theme</span>}
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;