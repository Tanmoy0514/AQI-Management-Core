import React from 'react';
import { Bike, Calendar, Shield, Fan } from 'lucide-react';
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
}

const Report: React.FC<ReportProps> = ({
  userName,
  userRole,
  aqiData,
  forecast,
  theme,
  selectedCity
}) => {

  if (!aqiData) return null;

  const WeatherIcon = theme.weatherIcon;
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
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700">
                    
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col items-center text-center justify-center py-10 relative">
            {/* Animated Weather Icon */}
            <div className="animate-bounce" style={{ animationDuration: '3s' }}>
               {WeatherIcon && <WeatherIcon size={120} strokeWidth={1} className="drop-shadow-2xl opacity-90" />}
            </div>
            
            <div className="mt-4 relative">
                <h1 className="text-9xl font-black tracking-tighter drop-shadow-lg leading-none">
                    {aqiData.aqi}
                </h1>
                <span className="absolute -top-4 -right-8 text-2xl font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">AQI</span>
            </div>
            
            <h2 className="text-3xl font-medium mt-2 drop-shadow-md">{maskRec.status}</h2>
            <p className="opacity-80 mt-1 max-w-md text-lg font-light leading-relaxed">{maskRec.note}</p>

            <div className="flex gap-8 mt-8">
                 <div className="text-center">
                     <div className="text-sm opacity-70 uppercase tracking-widest font-bold">Temp</div>
                     <div className="text-2xl font-medium">{aqiData.temp}°</div>
                 </div>
                 <div className="w-px bg-white/30"></div>
                 <div className="text-center">
                     <div className="text-sm opacity-70 uppercase tracking-widest font-bold">PM2.5</div>
                     <div className="text-2xl font-medium">{aqiData.pm25}</div>
                 </div>
                 <div className="w-px bg-white/30"></div>
                 <div className="text-center">
                     <div className="text-sm opacity-70 uppercase tracking-widest font-bold">Humidity</div>
                     <div className="text-2xl font-medium">{aqiData.humidity}%</div>
                 </div>
            </div>
        </div>

        {/* --- GLASS CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Mask Recommendation Card */}
            <div className={`col-span-1 md:col-span-2 rounded-[2.5rem] p-8 flex items-center justify-between relative overflow-hidden ${theme.card}`}>
                 <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-2 opacity-70 text-sm font-bold uppercase tracking-wider">
                         <Shield size={16} /> Recommendation
                     </div>
                     <h3 className="text-3xl font-bold mb-2">{maskRec.name}</h3>
                     <div className="inline-block px-3 py-1 bg-white/20 rounded-lg text-sm font-medium mb-4">
                         {maskRec.layers}
                     </div>
                     <p className="text-sm opacity-80 max-w-xs leading-relaxed">
                         Based on current PM2.5 levels in {selectedCity.name}.
                     </p>
                 </div>
                 <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
                     {React.createElement(maskRec.icon, { size: 180 })}
                 </div>
            </div>

            {/* Quick Stats Cards */}
            <div className={`rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center gap-2 ${theme.card}`}>
                 <div className={`p-4 rounded-full ${recs.sport.allowed ? 'bg-green-400/20' : 'bg-red-400/20'} mb-2`}>
                     <Bike size={32} />
                 </div>
                 <div className="font-bold text-lg">{recs.sport.text}</div>
            </div>
            <div className={`rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center gap-2 ${theme.card}`}>
                 <div className={`p-4 rounded-full ${!recs.purifier.allowed ? 'bg-blue-400/20' : 'bg-orange-400/20'} mb-2`}>
                     <Fan size={32} />
                 </div>
                 <div className="font-bold text-lg">{recs.purifier.text}</div>
            </div>
        </div>

        {/* --- FORECAST & ROLE ADVICE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Role Advice */}
            <div className={`lg:col-span-2 rounded-[2.5rem] p-8 ${theme.card}`}>
                 <div className="flex items-center gap-3 mb-6">
                     <div className="p-3 bg-white/20 rounded-2xl">
                        {React.createElement(ROLES.find(r => r.id === userRole)?.icon!, { size: 24 })}
                     </div>
                     <div>
                         <h3 className="font-bold text-xl">Advisor: {ROLES.find(r => r.id === userRole)?.label}</h3>
                         <p className="text-sm opacity-60">Personalized for {userName}</p>
                     </div>
                 </div>
                 <div className="space-y-4 bg-black/10 rounded-3xl p-6">
                     <p className="leading-relaxed font-medium">
                         {aqiData.aqi > 200 
                             ? "⚠️ Critical Action: Suspend all outdoor operations. Ensure all indoor environments have active air filtration. Commute only in sealed vehicles." 
                             : "✅ Safe to proceed with normal routine, but keep a mask handy if you are traveling through high-traffic zones."}
                     </p>
                 </div>
            </div>

            {/* Vertical Forecast */}
            <div className={`rounded-[2.5rem] p-8 ${theme.card} flex flex-col justify-between`}>
                <h3 className="font-bold mb-4 opacity-80 flex items-center gap-2"><Calendar size={16}/> 7-Day Trend</h3>
                <div className="space-y-3">
                    {forecast.slice(0,5).map((day, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="w-12 font-bold opacity-60">{day.day}</span>
                            <div className="flex-1 mx-4 h-1.5 bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white/80 rounded-full" style={{ width: `${(day.aqi/500)*100}%` }}></div>
                            </div>
                            <span className="w-8 text-right font-bold">{day.aqi}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    </div>
  );
};

export default Report;