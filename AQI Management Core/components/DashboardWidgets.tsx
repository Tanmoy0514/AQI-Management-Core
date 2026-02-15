import React from 'react';
import { Sparkles, Building2, AlertTriangle, CheckCircle } from 'lucide-react';
import { AQIData } from '../types';

interface DashboardWidgetsProps {
  darkMode: boolean;
  aqiData: AQIData | null;
}

const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({ darkMode, aqiData }) => {
  return (
    <div className="mt-auto pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
       
       {/* 1. Developer System Console (Play Store Style) */}
       <div className={`p-5 rounded-2xl border shadow-xl ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-100'}`}>
          <div className="flex items-center gap-2 mb-3 border-b border-gray-100 dark:border-stone-800 pb-2">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span className={`font-bold uppercase tracking-wider text-xs ${darkMode ? 'text-white' : 'text-slate-800'}`}>What's New</span>
            <span className="ml-auto text-xs opacity-50">v2.5.1</span>
          </div>
          <div className="space-y-2">
             <div className="flex justify-between items-center text-xs opacity-60 mb-2">
                <span>Updated today at 09:00 AM</span>
             </div>
             <ul className={`space-y-1 text-xs list-disc pl-4 ${darkMode ? 'text-stone-300' : 'text-slate-600'}`}>
                <li>Fixed bug in profile switching for mobile.</li>
                <li>Enhanced 7-Day Forecast visualization.</li>
                <li>Improved keyboard navigation for input forms.</li>
                <li>Optimized API response time for heat maps.</li>
             </ul>
          </div>
       </div>

       {/* 2. Government Notice Console */}
       <div className={`p-5 rounded-2xl border-l-4 shadow-xl ${darkMode ? 'bg-stone-900 border-blue-500' : 'bg-white border-blue-600'}`}>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="font-bold uppercase tracking-wider text-xs text-blue-600">Official Government Notice</span>
          </div>
          
          <div className="text-sm">
            {(aqiData?.aqi || 0) > 300 ? (
              <>
                <p className="font-bold text-red-600 flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  CRITICAL: GRAP Stage IV Active
                </p>
                <p className={`text-xs ${darkMode ? 'text-stone-300' : 'text-slate-600'}`}>
                  Strict ban on construction. Schools closed. Odd-Even vehicle rationing in effect.
                </p>
              </>
            ) : (aqiData?.aqi || 0) > 200 ? (
              <>
                <p className="font-bold text-orange-600 mb-1">Advisory: Poor Air Quality</p>
                <p className={`text-xs ${darkMode ? 'text-stone-300' : 'text-slate-600'}`}>
                   Diesel generator ban in effect. Use public transport.
                </p>
              </>
            ) : (
              <p className={`flex items-center gap-2 ${darkMode ? 'text-stone-400' : 'text-slate-500'}`}>
                 <CheckCircle className="w-4 h-4 text-emerald-500" />
                 No active severe weather alerts issued by the authority.
              </p>
            )}
          </div>
       </div>
    </div>
  );
};

export default DashboardWidgets;