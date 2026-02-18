import React from 'react';
import { Calendar, Thermometer, Shield, Wind, AlertTriangle, Truck, Heart, Activity } from 'lucide-react';
import { ROLES } from '../../constants';
import { AQIData, ForecastDay } from '../../types';
import { getAQIColor, getRoleBasedAnalysis } from '../../utils';

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

        {/* Card 3: Protection Level */}
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
        {/* Left: Detailed Advisory */}
        <div className="lg:col-span-2 space-y-6">
             <div className={`p-8 rounded-3xl shadow-lg border ${cardBg}`}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-blue-500" />
                    {analysis.title}
                </h2>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'}`}>
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold mb-1">Primary Action</h4>
                            <p className="opacity-70 text-sm leading-relaxed">{analysis.primaryAction}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                            <Truck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold mb-1">Commute Strategy</h4>
                            <p className="opacity-70 text-sm leading-relaxed">{analysis.commute}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                            <Heart className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold mb-1">Specific Health Measure</h4>
                            <p className="opacity-70 text-sm leading-relaxed">{analysis.specific}</p>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        {/* Right: Forecast */}
        <div className={`p-6 rounded-3xl shadow-lg border h-full ${cardBg}`}>
            <h3 className="font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 opacity-50"/> 7-Day Forecast
            </h3>
            <div className="space-y-3">
                {forecast.map((day, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                        <span className="text-sm font-medium w-12">{day.day}</span>
                        <div className="flex-1 mx-4 h-2 bg-slate-100 dark:bg-stone-800 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${getAQIColor(day.aqi).bg}`} 
                                style={{ width: `${Math.min(100, (day.aqi/500)*100)}%` }}
                            />
                        </div>
                        <span className={`text-xs font-bold w-8 text-right ${getAQIColor(day.aqi).text}`}>{day.aqi}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;