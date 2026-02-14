import React from 'react';
import { Wind, Calendar, Bike, Building, Activity } from 'lucide-react';
import { AQIData, ForecastItem, AnalysisResult } from '../types';
import { getAQIColor } from '../utils';
import { ROLES } from '../constants';

interface AdvisoryDisplayProps {
  isGenerated: boolean;
  loading: boolean;
  aqiData: AQIData | null;
  forecast: ForecastItem[];
  analysis: AnalysisResult | null;
  darkMode: boolean;
  cardStyles: string;
  userName: string;
  userAge: string;
  userRole: string;
  institutionName: string;
}

const AdvisoryDisplay: React.FC<AdvisoryDisplayProps> = ({
  isGenerated, loading, aqiData, forecast, analysis, darkMode, cardStyles,
  userName, userAge, userRole, institutionName
}) => {
  if (!isGenerated || !aqiData || !analysis) {
    return (
      <div className={`h-full min-h-[500px] flex flex-col items-center justify-center rounded-3xl border-2 border-dashed ${darkMode ? 'border-stone-800' : 'border-slate-200'}`}>
        <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${darkMode ? 'bg-stone-900' : 'bg-slate-100'}`}>
           {loading ? <Activity className="w-16 h-16 animate-pulse text-blue-500" /> : <Wind className={`w-16 h-16 ${darkMode ? 'text-stone-700' : 'text-slate-300'}`} />}
        </div>
        <p className={`${darkMode ? 'text-stone-500' : 'text-slate-400'} font-medium`}>
          {loading ? 'Processing AQI & Profile Data...' : 'Complete profile to view Report'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* 1. Header Report Card */}
      <div className={`p-6 rounded-3xl shadow-2xl relative overflow-hidden ${cardStyles}`}>
        <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-2xl opacity-20 ${getAQIColor(aqiData.aqi).bg}`}></div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Health Intelligence Report</h2>
            <p className="text-sm opacity-60">Generated for <span className="font-bold text-blue-500">{userName}</span> ({userAge} yrs)</p>
          </div>
          <div className={`px-4 py-2 rounded-xl text-center ${getAQIColor(aqiData.aqi).bg} text-white`}>
            <span className="block text-2xl font-black">{aqiData.aqi}</span>
            <span className="text-[10px] uppercase font-bold">AQI Level</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* Role Advisory Card */}
           <div className={`col-span-2 p-4 rounded-2xl border-l-4 border-blue-500 ${darkMode ? 'bg-stone-800' : 'bg-blue-50'}`}>
              <h3 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                 {ROLES.find(r => r.id === userRole)?.icon && React.createElement(ROLES.find(r => r.id === userRole)!.icon, { className: "w-4 h-4" })}
                 {analysis.title}
              </h3>
              <p className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{analysis.primaryAction}</p>
              <p className="text-sm opacity-70">{analysis.specific}</p>
           </div>

           {/* Mask Card */}
           <div className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center ${darkMode ? 'bg-stone-800' : 'bg-slate-50'}`}>
              <span className="text-3xl mb-2">😷</span>
              <p className="font-bold text-sm">Required Mask</p>
              <p className="text-blue-500 font-bold text-lg">{analysis.mask}</p>
           </div>
        </div>
      </div>

      {/* 2. Commute & Exposure Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className={`p-5 rounded-2xl shadow-lg border ${cardStyles}`}>
            <h4 className="font-bold mb-3 flex items-center gap-2 text-orange-500">
               <Bike className="w-5 h-5" /> Travel & Commute
            </h4>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-stone-300' : 'text-slate-600'}`}>
               {analysis.commute}
            </p>
         </div>
         
         <div className={`p-5 rounded-2xl shadow-lg border ${cardStyles}`}>
            <h4 className="font-bold mb-3 flex items-center gap-2 text-purple-500">
               <Calendar className="w-5 h-5" /> 7-Day Forecast
            </h4>
            <div className="flex gap-1 items-end h-16">
               {forecast.map((d, i) => (
                  <div key={i} className={`flex-1 rounded-t-lg transition-all hover:opacity-80 ${getAQIColor(d.aqi).bg}`} style={{ height: `${(d.aqi/400)*100}%` }} title={`Day ${i+1}: ${d.aqi}`}></div>
               ))}
            </div>
            <div className="flex justify-between text-[10px] opacity-50 mt-1">
               <span>Today</span>
               <span>7 Days</span>
            </div>
         </div>
      </div>

      {/* 3. Company/School Interaction (Mock) */}
      {(userRole === 'student' || userRole === 'delivery' || userRole === 'office') && (
        <div className={`p-4 rounded-2xl border border-dashed flex items-center justify-between ${darkMode ? 'border-stone-700 bg-stone-900/50' : 'border-slate-300 bg-slate-50'}`}>
           <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-stone-800 rounded-full text-blue-600">
                 <Building className="w-5 h-5" />
              </div>
              <div>
                 <p className="font-bold text-sm">{institutionName || 'Organization'} Portal</p>
                 <p className="text-xs opacity-60">View official health guidelines</p>
              </div>
           </div>
           <button className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              Connect
           </button>
        </div>
      )}

    </div>
  );
};

export default AdvisoryDisplay;
