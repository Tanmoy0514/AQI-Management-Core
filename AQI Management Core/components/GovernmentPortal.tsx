import React from 'react';
import { Construction, Building2 } from 'lucide-react';
import { CITIES } from '../constants';
import { getAQIColor } from '../utils';

interface GovernmentPortalProps {
  darkMode: boolean;
}

const GovernmentPortal: React.FC<GovernmentPortalProps> = ({ darkMode }) => {
  return (
     <div className="flex-1 flex flex-col gap-6 animate-in fade-in">
         
         {/* Under Construction Banner */}
         <div className="bg-amber-100 border border-amber-300 text-amber-800 px-4 py-3 rounded-xl flex items-center justify-between">
             <div className="flex items-center gap-3">
                <Construction className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">System Upgrade in Progress: AI Predictive Modeling module integration underway.</span>
             </div>
             <span className="text-[10px] font-mono bg-white/50 px-2 py-1 rounded">ETA: 48h</span>
         </div>

         {/* National Command Dashboard Header */}
         <div className={`p-6 rounded-3xl border shadow-xl flex justify-between items-center ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-blue-100'}`}>
             <div>
                 <h2 className="text-2xl font-bold flex items-center gap-2">
                     <Building2 className="w-6 h-6 text-blue-600" />
                     National Air Quality Command Center
                 </h2>
                 <p className="opacity-60 text-sm mt-1">Real-time monitoring & decision support system.</p>
             </div>
             <div className="text-right">
                 <div className="text-3xl font-black text-blue-600">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                 <div className="text-xs font-bold uppercase tracking-widest opacity-50">Live Sync</div>
             </div>
         </div>

         {/* Key Metrics / Decision Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className={`p-5 rounded-2xl border border-l-4 border-l-red-500 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-100'}`}>
                 <h3 className="text-xs font-bold uppercase opacity-50 mb-2">Critical Zones</h3>
                 <div className="text-3xl font-black text-red-500">03</div>
                 <p className="text-xs mt-1">Regions requiring immediate GRAP-IV intervention.</p>
             </div>
             <div className={`p-5 rounded-2xl border border-l-4 border-l-orange-500 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-100'}`}>
                 <h3 className="text-xs font-bold uppercase opacity-50 mb-2">High Alert</h3>
                 <div className="text-3xl font-black text-orange-500">12</div>
                 <p className="text-xs mt-1">Schools advised to close in these districts.</p>
             </div>
             <div className={`p-5 rounded-2xl border border-l-4 border-l-emerald-500 ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-100'}`}>
                 <h3 className="text-xs font-bold uppercase opacity-50 mb-2">Safe Zones</h3>
                 <div className="text-3xl font-black text-emerald-500">28</div>
                 <p className="text-xs mt-1">Air quality within permissible limits.</p>
             </div>
         </div>

         {/* State-Wise Data Table (Simulating collection from Dev Console) */}
         <div className={`flex-1 rounded-3xl border shadow-xl overflow-hidden flex flex-col ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-100'}`}>
             <div className={`p-4 border-b font-bold flex justify-between items-center ${darkMode ? 'bg-black/20 border-stone-800' : 'bg-slate-50 border-slate-200'}`}>
                 <span>State-Wise Status Report</span>
                 <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded shadow hover:bg-blue-700">Export Report</button>
             </div>
             <div className="flex-1 overflow-y-auto p-4">
                 <div className="space-y-3">
                     {CITIES.map((city, idx) => {
                         const color = getAQIColor(city.baseAQI);
                         return (
                             <div key={idx} className={`p-4 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${darkMode ? 'bg-stone-800 border-stone-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                                 <div className="flex items-center gap-4">
                                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white ${color.bg}`}>
                                         {city.baseAQI}
                                     </div>
                                     <div>
                                         <h4 className="font-bold text-lg">{city.state}</h4>
                                         <p className="text-xs opacity-60">Key City: {city.name}</p>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                     <div className={`px-3 py-1 rounded-full text-xs font-bold ${darkMode ? 'bg-black/30' : 'bg-slate-100'}`}>
                                         {city.baseAQI > 300 ? 'SEVERE' : city.baseAQI > 200 ? 'POOR' : 'MODERATE'}
                                     </div>
                                     {city.baseAQI > 300 && (
                                         <button className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg shadow-lg hover:bg-red-700 animate-pulse">
                                             INITIATE PROTOCOL
                                         </button>
                                     )}
                                 </div>
                             </div>
                         );
                     })}
                 </div>
             </div>
         </div>

     </div>
  );
};

export default GovernmentPortal;