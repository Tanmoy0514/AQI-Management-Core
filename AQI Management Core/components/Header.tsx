import React from 'react';
import { Wind, MapPin, ChevronDown, Sun, Moon } from 'lucide-react';
import { City } from '../types';
import { MVP_MODES, CITIES } from '../constants';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  mvpMode: string;
  setMvpMode: (v: string) => void;
  selectedCity: City;
  setSelectedCity: (c: City) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  darkMode, setDarkMode, mvpMode, setMvpMode, selectedCity, setSelectedCity 
}) => {
  return (
    <header className={`px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50 ${darkMode ? 'bg-slate-900/80 backdrop-blur' : 'bg-white/80 backdrop-blur'}`}>
      
      {/* LEFT: MVP Mode Switcher */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-blue-600 rounded-lg shadow-blue-500/20 shadow-lg">
          <Wind className="w-6 h-6 text-white" />
        </div>
        
        <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {MVP_MODES.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setMvpMode(mode.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all
                  ${mvpMode === mode.id 
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              >
                <Icon className="w-3 h-3" />
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: City & Theme */}
      <div className="flex items-center gap-4">
        
        {/* City Dropdown */}
        <div className="relative group">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'}`}>
            <MapPin className="w-4 h-4 text-blue-500" />
            {selectedCity.name}
            <ChevronDown className="w-4 h-4 opacity-50" />
          </button>
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2">
            <div className={`flex flex-col ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              {CITIES.map(city => (
                <button
                  key={city.name}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-3 text-left text-sm hover:bg-blue-50 dark:hover:bg-slate-700 ${darkMode ? 'text-slate-200' : 'text-slate-700'} ${selectedCity.name === city.name ? 'font-bold bg-blue-50/50 text-blue-600' : ''}`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full shadow-lg transition-transform hover:scale-105 ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white text-blue-600'}`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
