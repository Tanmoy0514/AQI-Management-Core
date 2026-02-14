import React from 'react';
import { Wind, MapPin, ChevronDown, Sun, Moon, Settings } from 'lucide-react';
import { City } from '../types';
import { MODES, CITIES } from '../constants';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  currentMode: string;
  setCurrentMode: (v: string) => void;
  selectedCity: City;
  setSelectedCity: (c: City) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  darkMode, setDarkMode, currentMode, setCurrentMode, selectedCity, setSelectedCity 
}) => {
  const headerBg = darkMode ? 'bg-neutral-900/90' : 'bg-white/80';

  return (
    <header className={`px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50 backdrop-blur ${headerBg}`}>
      
      {/* LEFT: Admin Dropdown */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
          <Wind className="w-6 h-6 text-white" />
        </div>
        
        <div className="relative group">
          <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${darkMode ? 'bg-stone-800 border-stone-700 text-stone-300' : 'bg-white border-slate-200 text-slate-600'}`}>
             <Settings className="w-4 h-4" />
             <span className="hidden sm:inline">Admin View:</span> {MODES.find(m => m.id === currentMode)?.label}
             <ChevronDown className="w-3 h-3" />
          </button>
          
          <div className={`absolute left-0 top-full mt-2 w-56 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-100'}`}>
            <div className="flex flex-col">
              {MODES.map(mode => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setCurrentMode(mode.id)}
                    className={`px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors ${
                      currentMode === mode.id 
                        ? (darkMode ? 'bg-stone-800 text-amber-400' : 'bg-blue-50 text-blue-600') 
                        : (darkMode ? 'text-stone-300 hover:bg-stone-800' : 'text-slate-600 hover:bg-slate-50')
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: City & Theme */}
      <div className="flex items-center gap-4">
        {/* City Dropdown */}
        <div className="relative group">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm transition-all ${darkMode ? 'bg-stone-800 border-stone-700 text-white' : 'bg-white border-slate-200 text-slate-700'}`}>
            <MapPin className="w-4 h-4 text-blue-500" />
            {selectedCity.name}
            <ChevronDown className="w-4 h-4 opacity-50" />
          </button>
          <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block z-50 border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-100'}`}>
            <div className="flex flex-col">
              {CITIES.map(city => (
                <button
                  key={city.name}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-3 text-left text-sm ${
                      selectedCity.name === city.name 
                        ? (darkMode ? 'bg-stone-800 text-amber-400 font-bold' : 'bg-blue-50 text-blue-600 font-bold') 
                        : (darkMode ? 'text-stone-300 hover:bg-stone-800' : 'text-slate-700 hover:bg-slate-50')
                    }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full shadow-lg transition-transform hover:scale-105 ${darkMode ? 'bg-stone-800 text-amber-400' : 'bg-white text-blue-600'}`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
