import React from 'react';
import { ArrowLeft, MapPin, ChevronDown } from 'lucide-react';
import { City, Mode } from '../types';
import { CITIES, MODES } from '../constants';

interface HeaderProps {
  currentMode: string;
  userName: string;
  currentView: string;
  handleBackToInput: () => void;
  selectedCity: City;
  setSelectedCity: (city: City) => void;
  headerBg: string;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
  currentMode,
  userName,
  currentView,
  handleBackToInput,
  selectedCity,
  setSelectedCity,
  headerBg,
  darkMode
}) => {

  const getHeaderTitle = () => {
    if (currentMode === 'user' && userName) return `${userName}'s Dashboard`;
    return MODES.find((m: Mode) => m.id === currentMode)?.label || 'Dashboard';
  };

  return (
    <header className={`px-6 py-4 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md ${headerBg}`}>
       <h2 className="text-xl font-bold flex items-center gap-2">
         {currentMode === 'user' && currentView === 'report' && (
            <button onClick={handleBackToInput} className="mr-2 p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full">
               <ArrowLeft className="w-5 h-5" />
            </button>
         )}
         {getHeaderTitle()}
       </h2>

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
    </header>
  );
};

export default Header;