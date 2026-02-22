import React from 'react';
import { ArrowLeft, MapPin, ChevronDown } from 'lucide-react';
import { City, ThemeStyles } from '../types';
import { CITIES } from '../constants';

interface HeaderProps {
  currentMode: string;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCity: City;
  setSelectedCity: (city: City) => void;
  theme: ThemeStyles;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
  currentMode,
  currentView,
  setCurrentView,
  selectedCity,
  setSelectedCity,
  theme,
  darkMode
}) => {
  return (
    <header className={`h-16 flex items-center justify-between px-6 z-20 ${theme.immersive ? '' : 'border-b ' + (darkMode ? 'border-neutral-800 bg-neutral-950/80' : 'border-slate-200 bg-white/80')} backdrop-blur-md`}>
       <div className="flex items-center gap-4">
          {currentView === 'report' && currentMode === 'user' && (
              <button onClick={() => setCurrentView('input')} className={`p-2 rounded-full transition-colors ${theme.immersive ? 'bg-white/20 hover:bg-white/30 text-white' : 'hover:bg-slate-100'}`}>
                  <ArrowLeft size={20} />
              </button>
          )}
          <h1 className="font-bold text-lg flex items-center gap-2">
             {currentMode === 'user' ? (currentView === 'input' ? 'Home' : 'Dashboard') : 'Developer Console'}
          </h1>
       </div>

       <div className="relative group">
           <button className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all ${theme.immersive ? 'bg-white/20 border-transparent hover:bg-white/30 text-white' : (darkMode ? 'border-neutral-700 hover:bg-neutral-800' : 'border-slate-200 hover:bg-slate-50')}`}>
               <MapPin size={16} className={theme.immersive ? 'text-white' : 'text-blue-500'} />
               {selectedCity.name}
               <ChevronDown size={14} className="opacity-70" />
           </button>
           {/* City Dropdown */}
           <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-xl overflow-hidden hidden group-hover:block z-50 ${theme.immersive ? 'bg-black/40 backdrop-blur-xl border-white/20 text-white' : theme.card}`}>
              {CITIES.map(city => (
                  <button key={city.name} onClick={() => setSelectedCity(city)} className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-blue-500 hover:text-white`}>
                      {city.name}
                  </button>
              ))}
           </div>
       </div>
    </header>
  );
};

export default Header;