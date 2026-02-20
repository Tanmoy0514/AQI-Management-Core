import React from 'react';
import { Bike, Calendar, Shield, Fan, MapPin, Activity, Thermometer, Droplets, Wind, Smile, LayoutDashboard } from 'lucide-react';
import { ROLES } from '../../data/constants';
import { getMaskRecommendation } from '../../utils/helpers';
import { AQIData, ForecastDay, ThemeStyles, City } from '../../types';

interface ReportProps {
  userName: string;
  userRole: string;
  aqiData: AQIData | null;
  forecast: ForecastDay[];
  theme: ThemeStyles;
  selectedCity: City;
  darkMode: boolean;
}

const Report: React.FC<ReportProps> = ({
  userName,
  userRole,
  aqiData,
  forecast,
  theme,
  selectedCity,
  darkMode
}) => {

  if (!aqiData) return null;

  const cardBg = darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-100 shadow-sm';
  const maskRec = getMaskRecommendation(aqiData.aqi);

  const getRecs = () => {
    const aqi = aqiData.aqi;
    return {
        sport: aqi > 150 ? { allowed: false, text: "No Outdoor Sports" } : { allowed: true, text: "Outdoor Sports OK" },
        window: aqi > 200 ? { allowed: false, text: "Close Windows" } : { allowed: true, text: "Ventilation OK" },
        mask: aqi > 100 ? { allowed: true, text: "Mask Required" } : { allowed: false, text: "No Mask Needed" },
        purifier: aqi > 150 ? { allowed: true, text: "Use Purifier" } : { allowed: false, text: "Purifier Optional" },
    };
  };
  const recs = getRecs();

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
                    
        {/* Top Row: Main Gauge & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* MAIN AQI CARD */}
            <div className={`lg:col-span-2 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 ${maskRec.colorClass} text-white shadow-2xl`}>
                {/* Abstract Pattern Overlay */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="relative z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        <MapPin size={12} /> {selectedCity.name}, {selectedCity.state}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-2">{aqiData.aqi}</h2>
                    <p className="text-xl md:text-2xl font-bold opacity-90">{maskRec.status}</p>
                    <p className="mt-2 opacity-75 max-w-sm text-sm">{maskRec.note}</p>
                </div>

                {/* Visual Circular Gauge Representation */}
                <div className="relative w-48 h-48 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="opacity-20" />
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * Math.min(aqiData.aqi, 500) / 500)} className="transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {React.createElement(maskRec.icon, { size: 48, className: "mb-2" })}
                        <span className="text-xs font-bold uppercase opacity-80">PM2.5</span>
                        <span className="text-lg font-bold">{aqiData.pm25}</span>
                    </div>
                </div>
            </div>

            {/* POLLUTANT BREAKDOWN & WEATHER */}
            <div className={`rounded-3xl p-6 border flex flex-col justify-between ${cardBg}`}>
                <div>
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Activity size={18} className="text-blue-500"/> Pollutants</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'PM2.5', value: aqiData.pm25, max: 200, color: 'bg-orange-500' },
                            { label: 'PM10', value: aqiData.pm10, max: 300, color: 'bg-yellow-500' },
                            { label: 'O3', value: aqiData.o3, max: 100, color: 'bg-blue-500' },
                            { label: 'NO2', value: aqiData.no2, max: 100, color: 'bg-purple-500' }
                        ].map(p => (
                            <div key={p.label}>
                                <div className="flex justify-between text-xs font-bold mb-1 opacity-70">
                                    <span>{p.label}</span>
                                    <span>{p.value} µg/m³</span>
                                </div>
                                <div className={`h-2 w-full rounded-full ${darkMode ? 'bg-neutral-800' : 'bg-slate-100'}`}>
                                    <div className={`h-full rounded-full ${p.color}`} style={{ width: `${Math.min(100, (p.value/p.max)*100)}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-6 border-t border-inherit mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                        <Thermometer size={16} className="mx-auto text-blue-500 mb-1"/>
                        <span className="text-xs font-bold block">{aqiData.temp}°C</span>
                    </div>
                    <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/20">
                        <Droplets size={16} className="mx-auto text-cyan-500 mb-1"/>
                        <span className="text-xs font-bold block">{aqiData.humidity}%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <Wind size={16} className="mx-auto text-slate-500 mb-1"/>
                        <span className="text-xs font-bold block">{aqiData.wind} km/h</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Middle Row: Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-5 rounded-3xl border flex flex-col items-center text-center justify-center gap-3 transition-transform hover:scale-105 ${cardBg}`}>
                 <div className={`p-3 rounded-full ${recs.sport.allowed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                     <Bike size={24} />
                 </div>
                 <div>
                     <p className="font-bold text-sm">{recs.sport.text}</p>
                     <p className="text-xs opacity-50 mt-1">Outdoor Activities</p>
                 </div>
            </div>
            <div className={`p-5 rounded-3xl border flex flex-col items-center text-center justify-center gap-3 transition-transform hover:scale-105 ${cardBg}`}>
                 <div className={`p-3 rounded-full ${recs.window.allowed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                     <LayoutDashboard size={24} /> {/* Using as Window icon proxy */}
                 </div>
                 <div>
                     <p className="font-bold text-sm">{recs.window.text}</p>
                     <p className="text-xs opacity-50 mt-1">Home Ventilation</p>
                 </div>
            </div>
            <div className={`p-5 rounded-3xl border flex flex-col items-center text-center justify-center gap-3 transition-transform hover:scale-105 ${cardBg}`}>
                 <div className={`p-3 rounded-full ${!recs.mask.allowed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                     <Smile size={24} />
                 </div>
                 <div>
                     <p className="font-bold text-sm">{recs.mask.text}</p>
                     <p className="text-xs opacity-50 mt-1">Facial Protection</p>
                 </div>
            </div>
            <div className={`p-5 rounded-3xl border flex flex-col items-center text-center justify-center gap-3 transition-transform hover:scale-105 ${cardBg}`}>
                 <div className={`p-3 rounded-full ${!recs.purifier.allowed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                     <Fan size={24} />
                 </div>
                 <div>
                     <p className="font-bold text-sm">{recs.purifier.text}</p>
                     <p className="text-xs opacity-50 mt-1">Air Purifier</p>
                 </div>
            </div>
        </div>

        {/* Bottom Row: Detailed Role Advice & Forecast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Role Specific Advice */}
             <div className={`p-6 rounded-3xl border ${cardBg}`}>
                 <h3 className="font-bold mb-4 flex items-center gap-2">
                     <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                        {React.createElement(ROLES.find(r => r.id === userRole)?.icon!, { size: 18 })}
                     </div>
                     Advisory for {ROLES.find(r => r.id === userRole)?.label}
                 </h3>
                 <div className="space-y-4">
                     <div className="flex gap-4">
                         <div className="w-1 bg-blue-500 rounded-full"></div>
                         <div>
                             <p className="text-xs font-bold uppercase opacity-50 mb-1">Primary Action</p>
                             <p className="font-medium text-sm leading-relaxed">
                                 {aqiData.aqi > 200 
                                    ? "Suspend all outdoor activities immediately. Move to a filtered environment." 
                                    : "Reduce prolonged or heavy exertion. Take more breaks during outdoor activities."}
                             </p>
                         </div>
                     </div>
                     <div className="flex gap-4">
                         <div className="w-1 bg-purple-500 rounded-full"></div>
                         <div>
                             <p className="text-xs font-bold uppercase opacity-50 mb-1">Commute Protocol</p>
                             <p className="font-medium text-sm leading-relaxed">
                                 {aqiData.aqi > 200
                                    ? "Avoid non-AC public transport. Keep car windows rolled up with internal circulation ON."
                                    : "Wear a mask while waiting in traffic or using open transport."}
                             </p>
                         </div>
                     </div>
                 </div>
             </div>

             {/* 7 Day Forecast */}
             <div className={`p-6 rounded-3xl border ${cardBg}`}>
                 <h3 className="font-bold mb-4 flex items-center gap-2"><Calendar size={18} className="text-blue-500"/> 7-Day Forecast</h3>
                 <div className="flex items-end justify-between h-32 gap-2">
                     {forecast.map((day, i) => {
                         const height = (day.aqi / 500) * 100;
                         const color = getMaskRecommendation(day.aqi).colorClass;
                         return (
                             <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                                 <div className={`w-full rounded-t-lg transition-all duration-300 group-hover:opacity-80 ${color}`} style={{ height: `${Math.max(10, height)}%` }}></div>
                                 <span className="text-[10px] font-bold mt-2 opacity-60 uppercase">{day.day}</span>
                             </div>
                         );
                     })}
                 </div>
             </div>
        </div>

    </div>
  );
};

export default Report;