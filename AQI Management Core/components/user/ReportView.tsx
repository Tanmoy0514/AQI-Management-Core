import React from 'react';
import { Calendar, Thermometer, Shield, Wind, AlertTriangle, Truck, Heart, Activity } from 'lucide-react';
import { AQIData, ForecastDay } from '../../types';
import { getAQIColor, getRoleBasedAnalysis, getMaskRecommendation } from '../../utils';
import { ROLES } from '../../constants';

interface ReportViewProps {
  userName: string;
  userAge: string;
  userRole: string;
  institutionName: string;
  aqiData: AQIData | null;
  forecast: ForecastDay[];
  darkMode: boolean;
  cardBg: string;
}

const ReportView: React.FC<ReportViewProps> = ({
  userName,
  userAge,
  userRole,
  institutionName,
  aqiData,
  forecast,
  darkMode,
  cardBg
}) => {
  const analysis = getRoleBasedAnalysis(aqiData, userRole, institutionName);
  
  if (!analysis || !aqiData) return null;

  return (
    <div className="max-w-6xl mx-auto w-full space-y-6 animate-in fade-in slide-in-from-bottom-8">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Real-time AQI */}
        <div className={`p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg border-2 ${getAQIColor(aqiData.aqi).bg.replace('500', '100')} ${getAQIColor(aqiData.aqi).border} ${darkMode ? 'bg-opacity-10' : ''}`}>
           <h3 className={`text-sm font-bold uppercase mb-2 ${getAQIColor(aqiData.aqi).text}`}>Real-time AQI</h3>
           <div className={`text-6xl font-black mb-2 ${getAQIColor(aqiData.aqi).text}`}>{aqiData.aqi}</div>
           <span className={`px-4 py-1 rounded-full text-sm font-bold bg-white/50 ${getAQIColor(aqiData.aqi).text}`}>{getAQIColor(aqiData.aqi).label}</span>
        </div>

        {/* Card 2: Environment */}
        <div className={`p-6 rounded-3xl shadow-lg border flex flex-col justify-center ${cardBg}`}>
            <div className="flex items-center gap-2 mb-4 opacity-50">
                <Thermometer className="w-4 h-4"/> <span className="text-xs font-bold uppercase">Environment</span>
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-3xl font-bold mb-1">{aqiData.temp}°C</div>
                    <div className="text-xs opacity-60">Temperature</div>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold mb-1">{aqiData.pm25}</div>
                    <div className="text-xs opacity-60">PM 2.5 (µg/m³)</div>
                </div>
            </div>
        </div>

        {/* Card 3: Protection Level (Original Design) -> Replaced/Updated in Logic below, but keeping header stats mostly same, maybe update risk level color */}
         <div className={`p-6 rounded-3xl shadow-lg border overflow-hidden relative ${darkMode ? 'bg-gradient-to-br from-indigo-900 to-purple-900 border-indigo-800' : 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-500'} text-white`}>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-white/70">
                    <Shield className="w-4 h-4"/> <span className="text-xs font-bold uppercase">Protection Level</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{analysis.riskLevel} Risk</h3>
                <p className="text-sm text-white/80">{analysis.mask} Recommended</p>
            </div>
            <Wind className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" />
        </div>
      </div>

      {/* Main Advisory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Detailed Advisory & Mask Card */}
        <div className="lg:col-span-2 space-y-6">
             <div className={`p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden ${cardBg}`}>
                <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-2xl opacity-20 ${getMaskRecommendation(aqiData?.aqi).colorClass}`}></div>
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <div>
                    <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Health Intelligence Report</h2>
                    <p className="text-sm opacity-60 mt-1">Generated for <span className="font-bold text-blue-500">{userName}</span> ({userAge} yrs) • {ROLES.find(r => r.id === userRole)?.label}</p>
                  </div>
                  <div className={`px-5 py-3 rounded-2xl text-center ${getMaskRecommendation(aqiData?.aqi).colorClass} text-white min-w-[120px]`}>
                    <span className="block text-4xl font-black">{aqiData?.aqi}</span>
                    <span className="text-xs uppercase font-bold tracking-wider">AQI Level</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {/* Advisory Details */}
                   <div className={`col-span-2 p-6 rounded-2xl border-l-4 border-blue-500 ${darkMode ? 'bg-stone-800' : 'bg-blue-50'}`}>
                    <h3 className="font-bold text-blue-600 mb-3 flex items-center gap-2 text-lg">
                      {ROLES.find(r => r.id === userRole)?.icon && React.createElement(ROLES.find(r => r.id === userRole)?.icon, { className: "w-5 h-5" })}
                      {analysis.title}
                    </h3>
                    <p className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{analysis.primaryAction}</p>
                    <p className="text-sm opacity-70 leading-relaxed">{analysis.specific}</p>
                  </div>

                  {/* --- MASK RECOMMENDATION CARD (INTEGRATED) --- */}
                  <div className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center border relative overflow-hidden ${darkMode ? 'bg-stone-800 border-stone-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                     <div className={`absolute inset-0 opacity-5 ${getMaskRecommendation(aqiData?.aqi).colorClass}`}></div>
                     
                     {/* Dynamic Icon */}
                     <div className={`mb-3 w-14 h-14 rounded-full flex items-center justify-center ${getMaskRecommendation(aqiData?.aqi).textClass} bg-slate-100 dark:bg-stone-900`}>
                         {React.createElement(getMaskRecommendation(aqiData?.aqi).icon, { size: 28 })}
                     </div>

                     <p className="font-bold text-[10px] uppercase opacity-60 tracking-wider mb-1">Recommended Mask</p>
                     <h4 className={`font-bold text-lg leading-tight mb-2 ${getMaskRecommendation(aqiData?.aqi).textClass}`}>
                         {getMaskRecommendation(aqiData?.aqi).name}
                     </h4>
                     
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 bg-slate-100 dark:bg-stone-900 opacity-80`}>
                         {getMaskRecommendation(aqiData?.aqi).layers}
                     </span>

                     <p className="text-xs opacity-70 leading-relaxed px-2">
                        "{getMaskRecommendation(aqiData?.aqi).note}"
                     </p>
                  </div>
                </div>
             </div>

             {/* Secondary Advisory Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-2xl shadow-lg border ${cardBg}`}>
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-orange-500 text-lg"><Truck className="w-5 h-5" /> Travel & Commute</h4>
                  <p className={`text-base leading-relaxed ${darkMode ? 'text-stone-300' : 'text-slate-600'}`}>{analysis.commute}</p>
                </div>
                <div className={`p-6 rounded-2xl shadow-lg border ${cardBg}`}>
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-purple-500 text-lg"><Calendar className="w-5 h-5" /> 7-Day Forecast</h4>
                  <div className="flex gap-2 items-end h-32 pt-4 px-2">
                    {forecast.map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                        <span className={`text-[10px] font-bold mb-1 transition-transform group-hover:-translate-y-1 ${getAQIColor(d.aqi).text}`}>{d.aqi}</span>
                        <div className={`w-full max-w-[16px] h-full rounded-full relative ${darkMode ? 'bg-stone-800' : 'bg-slate-100'} overflow-hidden`}>
                          <div className={`absolute bottom-0 w-full rounded-full transition-all duration-1000 ${getAQIColor(d.aqi).bg}`} style={{ height: `${Math.min(100, (d.aqi/500)*100)}%` }}></div>
                        </div>
                        <span className={`text-[10px] mt-2 font-medium uppercase ${darkMode ? 'text-stone-400' : 'text-slate-400'}`}>{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
        </div>

        {/* Right Column was forecast in previous version, but we moved forecast to bottom grid. 
            We can keep this column for additional widgets or remove if using 2/3 layout logic.
            The provided code puts forecast in the bottom grid. 
            I will adapt the layout to match the provided source which has a cleaner structure. 
        */}
      </div>
    </div>
  );
};

export default ReportView;