import React from 'react';
import { Terminal, Building2, AlertTriangle } from 'lucide-react';
import { AQIData, City } from '../types';

interface InfoPanelProps {
  userRole: string;
  selectedCity: City;
  aqiData: AQIData | null;
  darkMode: boolean;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ userRole, selectedCity, aqiData, darkMode }) => {
  return (
    <div className="col-span-1 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      
      {/* Developer Notification Box */}
      <div className="bg-black text-green-400 p-6 rounded-2xl font-mono text-sm border border-gray-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-4 right-4 text-xs bg-gray-900 px-2 py-1 rounded text-gray-500 border border-gray-800">DEV CONSOLE</div>
        <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
          <Terminal className="w-4 h-4" />
          <span className="font-bold">System Diagnostics</span>
        </div>
        <div className="space-y-2 opacity-80 h-32 overflow-y-auto">
          <p>User Role: <span className="text-white">{userRole}</span></p>
          <p>Selected City: <span className="text-white">{selectedCity.name}</span> (Lat: {selectedCity.lat}, Lon: {selectedCity.lon})</p>
          <p>DOM Status: <span className="text-green-500">Active</span></p>
          <p>API Connection: <span className="text-yellow-500">Simulated (Mock Data)</span></p>
          {aqiData && aqiData.aqi > 300 && <p className="text-red-500">{">>"} ALERT: Extreme AQI values detected. Triggering Hazard protocols.</p>}
        </div>
      </div>

      {/* Government Authority Notice */}
      <div className={`p-6 rounded-2xl border-l-4 shadow-xl ${darkMode ? 'bg-slate-900 border-blue-500' : 'bg-white border-blue-600'}`}>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
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
              <p className="text-sm opacity-80">Primary schools closed. Ban on construction activities. Heavy vehicles entry restricted in {selectedCity.name}. Work from home advised for 50% staff.</p>
            </>
          ) : aqiData && aqiData.aqi > 200 ? (
            <>
              <p className="font-bold text-orange-600">Advisory: GRAP Stage II Active</p>
              <p className="text-sm opacity-80">Ban on diesel generators. Parking fees enhanced to discourage private transport. Increased frequency of metro/bus services.</p>
            </>
          ) : (
            <>
                <p className="font-bold text-emerald-600">Status: Standard Monitoring</p>
                <p className="text-sm opacity-80">No special restrictions. Citizens are encouraged to use public transport to maintain air quality levels.</p>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default InfoPanel;
