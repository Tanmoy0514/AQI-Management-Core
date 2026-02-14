import React from 'react';
import { Terminal, Building2, AlertTriangle, CheckCircle, PenTool } from 'lucide-react';
import { AQIData, City } from '../types';

interface InfoPanelProps {
  currentMode: string;
  userRole: string;
  selectedCity: City;
  aqiData: AQIData | null;
  darkMode: boolean;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ currentMode, userRole, selectedCity, aqiData, darkMode }) => {
  return (
    <div className="col-span-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      
      {/* Box 1: System Info (Varies by Mode) */}
      {currentMode === 'user' && (
         <div className={`p-6 rounded-2xl border shadow-lg ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-100'}`}>
           <div className="flex items-center gap-2 mb-3 text-emerald-500">
             <CheckCircle className="w-5 h-5" />
             <span className="font-bold text-sm">System Updates</span>
           </div>
           <p className={`text-sm ${darkMode ? 'text-stone-300' : 'text-slate-600'}`}>
             AirGuard platform is running optimally. 
             <br/>
             <span className="opacity-50 text-xs">Last updated: Today at 09:00 AM • v1.2.4</span>
           </p>
         </div>
      )}

      {currentMode === 'dev' && (
        <div className="bg-black text-green-400 p-6 rounded-2xl font-mono text-sm border border-gray-800 shadow-xl overflow-hidden relative">
          <div className="absolute top-4 right-4 text-xs bg-gray-900 px-2 py-1 rounded text-gray-500 border border-gray-800 animate-pulse">LIVE DEBUG</div>
          <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
            <Terminal className="w-4 h-4" />
            <span className="font-bold">Developer Dashboard</span>
          </div>
          <div className="space-y-2 opacity-80 h-32 overflow-y-auto">
            <p>{">"} Status: <span className="text-yellow-400">IN PROGRESS</span></p>
            <p>{">"} User Role: <span className="text-white">{userRole}</span></p>
            <p>{">"} Active City: <span className="text-white">{selectedCity.name}</span></p>
            <p>{">"} AQI Fetch: <span className="text-blue-400">Simulated {aqiData?.aqi}</span></p>
            <div className="mt-4 p-2 bg-gray-900 rounded border border-gray-800 text-xs text-gray-400">
               TODO: Integrate real OpenWeather API.<br/>
               TODO: Fix heat map rendering on mobile.
            </div>
          </div>
        </div>
      )}

      {currentMode === 'gov' && (
         <div className="bg-blue-50 border-2 border-dashed border-blue-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <PenTool className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="font-bold text-blue-900">Government Notices Draft</h4>
            <p className="text-xs text-blue-600 mb-4 max-w-xs">Draft and publish new health directives for the public.</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow hover:bg-blue-700">
               + Create New Advisory
            </button>
         </div>
      )}

      {/* Box 2: Public Government Notice (Always Visible) */}
      <div className={`p-6 rounded-2xl border-l-4 shadow-xl ${darkMode ? 'bg-stone-900 border-blue-500' : 'bg-white border-blue-600'}`}>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-800 dark:border-stone-700">
          <Building2 className="w-5 h-5 text-blue-600" />
          <span className="font-bold uppercase tracking-wider text-sm text-blue-600">Official Government Notice</span>
        </div>
        
        <div className="space-y-3">
          {aqiData && aqiData.aqi > 300 ? (
            <>
              <p className="font-bold text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                ACTION: GRAP Stage IV Implemented
              </p>
              <p className={`text-sm ${darkMode ? 'text-stone-300' : 'text-slate-600'}`}>Primary schools closed. Ban on construction activities. Heavy vehicles entry restricted in {selectedCity.name}. Work from home advised for 50% staff.</p>
            </>
          ) : aqiData && aqiData.aqi > 200 ? (
            <>
              <p className="font-bold text-orange-600">Advisory: GRAP Stage II Active</p>
              <p className={`text-sm ${darkMode ? 'text-stone-300' : 'text-slate-600'}`}>Ban on diesel generators. Parking fees enhanced to discourage private transport. Increased frequency of metro/bus services.</p>
            </>
          ) : (
            <>
                <p className="font-bold text-emerald-600">Status: Standard Monitoring</p>
                <p className={`text-sm ${darkMode ? 'text-stone-300' : 'text-slate-600'}`}>No special restrictions. Citizens are encouraged to use public transport to maintain air quality levels.</p>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default InfoPanel;
