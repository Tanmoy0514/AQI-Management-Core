import React from 'react';
import { MapPin, ChevronDown, ArrowLeft } from 'lucide-react';
import { CITIES } from '../data/constants';
import { City, ThemeStyles } from '../types';

interface HeaderProps {
  currentMode: string;
  userName: string;
  currentView: 'input' | 'report';
  handleBackToInput: () => void;
  selectedCity: City;
  setSelectedCity: (city: City) => void;
  darkMode: boolean;
  theme: ThemeStyles;
}

const Header: React.FC<HeaderProps> = ({
  currentMode,
  currentView,
  handleBackToInput,
  selectedCity,
  setSelectedCity,
  darkMode,
  theme
}) => {
  
  const headerClasses = darkMode ? 'border-neutral-800 bg-neutral-950/80' : 'border-slate-200 bg-white/80';
  const cardBg = darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-100 shadow-sm';

  const getHeaderTitle = () => {
    if (currentMode === 'user') return currentView === 'input' ? 'Setup Profile' : 'Live Dashboard';
    return 'Console';
  };

  return (
    <header className={`h-16 border-b flex items-center justify-between px-6 z-10 backdrop-blur-md ${headerClasses}`}>
       <div className="flex items-center gap-4">
          {currentView === 'report' && currentMode === 'user' && (
              <button onClick={handleBackToInput} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                  <ArrowLeft size={20} />
              </button>
          )}
          <h1 className="font-bold text-lg">
             {getHeaderTitle()}
          </h1>
       </div>

       <div className="relative group">
           <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${darkMode ? 'border-neutral-700 hover:bg-neutral-800' : 'border-slate-200 hover:bg-slate-50'}`}>
               <MapPin size={16} className="text-blue-500" />
               {selectedCity.name}
               <ChevronDown size={14} className="opacity-50" />
           </button>
           {/* City Dropdown */}
           <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-xl overflow-hidden hidden group-hover:block z-50 ${cardBg}`}>
              {CITIES.map(city => (
                  <button key={city.name} onClick={() => setSelectedCity(city)} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-500 hover:text-white transition-colors ${selectedCity.name === city.name ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500' : ''}`}>
                      {city.name}
                  </button>
              ))}
           </div>
       </div>
    </header>
  );
};

export default Header;