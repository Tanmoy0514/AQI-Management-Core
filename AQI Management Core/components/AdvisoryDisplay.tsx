import React from 'react';
import { Bike, Calendar } from 'lucide-react';
import { AQIData, ForecastItem, AnalysisResult } from '../types';
import { getAQIColor } from '../utils';
import { ROLES } from '../constants';

interface AdvisoryDisplayProps {
  aqiData: AQIData | null;
  forecast: ForecastItem[];
  analysis: AnalysisResult | null;
  darkMode: boolean;
  cardStyles: string;
  userName: string;
  userAge: string;
  userRole: string;
}

const AdvisoryDisplay: React.FC<AdvisoryDisplayProps> = ({
  aqiData, forecast, analysis, darkMode, cardStyles,
  userName, userAge, userRole
}) => {
  if (!aqiData || !analysis) return null;

  return (
    <div className="max-w-5xl mx-auto w-full space-y-6 animate-in slide-in-from-right-8 duration-500">
      
      {/* 1. Header Report Card */}
      <div className={`p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden ${cardStyles}`}>
        <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-2xl opacity-20 ${getAQIColor(aqiData.aqi).bg}`}></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Health Intelligence Report</h2>
            <p className="text-sm opacity-60 mt-1">Generated for <span className="font-bold text-blue-500">{userName}</span> ({userAge} yrs) • {ROLES.find(r => r.id === userRole)?.label}</p>
          </div>
          <div className={`px-5 py-3 rounded-2xl text-center ${getAQIColor(aqiData.aqi).bg} text-white min-w-[120px]`}>
            <span className="block text-4xl font-black">{aqiData.aqi}</span>
            <span className="text-xs uppercase font-bold tracking-wider">AQI Level</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Role Advisory Card */}
           <div className={`col-span-2 p-6 rounded-2xl border-l-4 border-blue-500 ${darkMode ? 'bg-stone-800' : 'bg-blue-50'}`}>
              <h3 className="font-bold text-blue-600 mb-3 flex items-center gap-2 text-lg">
                 {ROLES.find(r => r.id === userRole)?.icon && React.createElement(ROLES.find(r => r.id === userRole)!.icon, { className: "w-5 h-5" })}
                 {analysis.title}
              </h3>
              <p className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{analysis.primaryAction}</p>
              <p className="text-sm opacity-70 leading-relaxed">{analysis.specific}</p>
           </div>

           {/* Mask Card */}
           <div className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center ${darkMode ? 'bg-stone-800' : 'bg-slate-50'}`}>
              <span className="text-4xl mb-3">😷</span>
              <p className="font-bold text-sm uppercase opacity-60">Required Mask</p>
              <p className="text-blue-500 font-bold text-2xl mt-1">{analysis.mask}</p>
           </div>
        </div>
      </div>

      {/* 2. Commute & Exposure Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className={`p-6 rounded-2xl shadow-lg border ${cardStyles}`}>
            <h4 className="font-bold mb-4 flex items-center gap-2 text-orange-500 text-lg">
               <Bike className="w-5 h-5" /> Travel & Commute
            </h4>
            <p className={`text-base leading-relaxed ${darkMode ? 'text-stone-300' : 'text-slate-600'}`}>
               {analysis.commute}
            </p>
         </div>
         
         <div className={`p-6 rounded-2xl shadow-lg border ${cardStyles}`}>
            <h4 className="font-bold mb-4 flex items-center gap-2 text-purple-500 text-lg">
               <Calendar className="w-5 h-5" /> 7-Day Forecast
            </h4>
            {/* Forecast Bars */}
            <div className="flex gap-2 items-end h-32 pt-4 px-2">
               {forecast.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                      {/* Value Label (Floating) */}
                      <span className={`text-[10px] font-bold mb-1 transition-transform group-hover:-translate-y-1 ${getAQIColor(d.aqi).text}`}>
                          {d.aqi}
                      </span>
                      
                      {/* Bar Track (Background) */}
                      <div className={`w-full max-w-[16px] h-full rounded-full relative ${darkMode ? 'bg-stone-800' : 'bg-slate-100'} overflow-hidden`}>
                          {/* Filled Bar (Foreground) */}
                          <div 
                              className={`absolute bottom-0 w-full rounded-full transition-all duration-1000 ${getAQIColor(d.aqi).bg}`} 
                              style={{ height: `${Math.min(100, (d.aqi/500)*100)}%` }}
                          ></div>
                      </div>
                      
                      {/* Day Label */}
                      <span className={`text-[10px] mt-2 font-medium uppercase ${darkMode ? 'text-stone-400' : 'text-slate-400'}`}>
                          {d.day}
                      </span>
                  </div>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
};

export default AdvisoryDisplay;
