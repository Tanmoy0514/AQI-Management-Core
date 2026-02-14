import React from 'react';
import { Wind, Menu, Sun, Moon } from 'lucide-react';
import { MODES } from '../constants';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  currentMode: string;
  setCurrentMode: (v: string) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  sidebarOpen, setSidebarOpen, currentMode, setCurrentMode, darkMode, setDarkMode 
}) => {
  const sidebarBg = darkMode ? 'bg-neutral-900 border-stone-800' : 'bg-white border-slate-200';

  return (
    <aside 
      className={`sticky top-0 h-screen flex flex-col justify-between border-r shadow-2xl transition-all duration-300 z-50 ${sidebarBg} ${sidebarOpen ? 'w-80' : 'w-20'}`}
    >
      <div>
        {/* Logo & Toggle */}
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2 animate-in fade-in">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-800'}`}>AirGuard</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${!sidebarOpen ? 'mx-auto' : ''}`}
          >
            <Menu className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
          </button>
        </div>

        {/* Nav Items (Modes) */}
        <div className="mt-8 px-3 space-y-2">
          {sidebarOpen && <p className="px-4 text-xs font-bold opacity-50 uppercase mb-2">Portals</p>}
          
          {MODES.map(mode => {
            const Icon = mode.icon;
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setCurrentMode(mode.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all w-full
                  ${isActive 
                    ? (darkMode ? 'bg-stone-800 text-amber-400' : 'bg-blue-50 text-blue-600') 
                    : (darkMode ? 'text-stone-400 hover:bg-stone-800' : 'text-slate-500 hover:bg-slate-100')
                  } ${!sidebarOpen ? 'justify-center' : ''}`}
                title={!sidebarOpen ? mode.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{mode.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-100 dark:border-stone-800">
        <button 
           onClick={() => setDarkMode(!darkMode)}
           className={`flex items-center gap-3 p-3 rounded-xl w-full transition-all
             ${darkMode ? 'bg-stone-800 text-yellow-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
             ${!sidebarOpen ? 'justify-center' : ''}`}
           title="Toggle Theme"
        >
           {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
           {sidebarOpen && <span className="font-medium text-sm">Theme</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
