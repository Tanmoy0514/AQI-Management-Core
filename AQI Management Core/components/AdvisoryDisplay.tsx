import React from 'react';
import { Wind, Shield, Clock, Calendar } from 'lucide-react';
import { AQIData, ForecastItem, Advisory, City } from '../types';
import { getAQIColor } from '../utils';

interface AdvisoryDisplayProps {
  isGenerated: boolean;
  aqiData: AQIData | null;
  selectedCity: City;
  forecast: ForecastItem[];
  advisory: Advisory | null;
  darkMode: boolean;
  cardStyles: string;
}

const AdvisoryDisplay: React.FC<AdvisoryDisplayProps> = ({
  isGenerated, aqiData, selectedCity, forecast, advisory, darkMode, cardStyles
}) => {
  if (!isGenerated || !aqiData || !advisory) {
    return (
      <div className={`h-full min-h-[500px] flex flex-col items-center justify-center rounded-3xl border-2 border-dashed ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <Wind className="w-16 h-16 text-slate-300 dark:text-slate-600" />
        </div>
        <p className="text-slate-400 font-medium">Complete your profile to generate analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      
      {/* 1. Main Advisory Card */}
      <div className={`p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className={`absolute top-0 left-0 w-2 h-full ${getAQIColor(aqiData.aqi).bg}`}></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getAQIColor(aqiData.aqi).bg}`}>
                AQI {aqiData.aqi} • {getAQIColor(aqiData.aqi).label}
              </span>
              <span className="text-xs text-slate-400">Live in {selectedCity.name}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {aqiData.aqi > 200 ? "High Risk Warning" : "Health Advisory"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <div className="flex items-center gap-2 mb-1 text-blue-500">
                  <Shield className="w-5 h-5" />
                  <span className="font-bold text-sm">Recommended Mask</span>
                </div>
                <p className="text-lg font-semibold">{advisory.mask}</p>
                <p className="text-xs opacity-60 mt-1">Wear when outdoors</p>
              </div>
              
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <div className="flex items-center gap-2 mb-1 text-orange-500">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold text-sm">Safe Duration</span>
                </div>
                <p className="text-lg font-semibold">{advisory.timeLimit}</p>
                <p className="text-xs opacity-60 mt-1">Best time: {advisory.safeTime}</p>
              </div>
            </div>
          </div>

          {/* Visual Mask Graphic */}
          <div className={`hidden md:flex flex-col items-center justify-center p-6 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-blue-50'} min-w-[140px]`}>
              <div className="text-center">
                <span className="text-4xl">😷</span>
                <p className="mt-2 font-bold text-blue-600">{advisory.maskType}</p>
              </div>
          </div>
        </div>
      </div>

      {/* 2. 7-Day Forecast (Linear Heat Map) */}
      <div className={`p-6 rounded-3xl shadow-lg border ${cardStyles}`}>
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-500" />
          7-Day AQI Forecast
        </h3>
        
        <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          {forecast.map((day, idx) => {
            const color = getAQIColor(day.aqi);
            return (
              <div key={idx} className="flex-1 min-w-[80px] flex flex-col items-center group">
                <span className="text-xs font-medium mb-2 opacity-50">{day.day}</span>
                {/* Bar */}
                <div className={`w-full h-24 rounded-xl relative overflow-hidden transition-all hover:scale-105 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    <div 
                      className={`absolute bottom-0 w-full rounded-xl transition-all ${color.bg}`}
                      style={{ height: `${Math.min(100, (day.aqi / 400) * 100)}%` }}
                    ></div>
                </div>
                <span className={`text-sm font-bold mt-2 ${color.text}`}>{day.aqi}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AdvisoryDisplay;
