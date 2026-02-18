import React from 'react';
import { Map as MapIcon, Construction, ExternalLink, Key, Database } from 'lucide-react';

interface DeveloperConsoleProps {
  darkMode: boolean;
  showDevPopup: boolean;
  setShowDevPopup: (show: boolean) => void;
}

const DeveloperConsole: React.FC<DeveloperConsoleProps> = ({
  darkMode,
  showDevPopup,
  setShowDevPopup
}) => {
  return (
    <div className="flex-1 flex flex-col gap-6 animate-in fade-in">
      
      {/* Map Integration Workspace (Visual) */}
      <div className={`flex-1 rounded-3xl border shadow-2xl relative overflow-hidden flex flex-col ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-200'}`}>
         
         {/* Top Toolbar */}
         <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-stone-800 bg-stone-900' : 'border-slate-100 bg-slate-50'}`}>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600 rounded-lg text-white"><MapIcon className="w-4 h-4" /></div>
                <div>
                    <h3 className="font-bold text-sm">Global Heat Map Integration</h3>
                    <p className="text-[10px] opacity-60">Status: <span className="text-yellow-500">Initializing...</span></p>
                </div>
            </div>
            <div className="flex gap-2">
                 <button className="px-3 py-1.5 text-xs font-mono rounded bg-blue-600 text-white shadow-lg shadow-blue-500/30">Connect API</button>
                 <button className={`px-3 py-1.5 text-xs font-mono rounded border ${darkMode ? 'border-stone-700' : 'border-slate-200'}`}>Settings</button>
            </div>
         </div>

         {/* The "Map" Placeholder Area */}
         <div className="flex-1 relative bg-slate-900 flex items-center justify-center overflow-hidden">
             
             {/* Abstract Grid Map Simulation */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
             
             {/* Pulsing Nodes */}
             <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
             <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
             <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>

             {/* Construction Popup */}
             {showDevPopup && (
                 <div className="absolute z-50 animate-in zoom-in duration-300">
                     <div className="bg-yellow-400 text-black p-6 rounded-3xl shadow-2xl border-4 border-black max-w-sm text-center transform rotate-2 hover:rotate-0 transition-transform cursor-pointer">
                         <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                             <Construction className="w-8 h-8 text-yellow-400 animate-spin-slow" />
                         </div>
                         <h2 className="text-2xl font-black uppercase mb-2">Under Construction</h2>
                         <p className="text-sm font-bold opacity-80 mb-4">
                             We are currently wiring up the Google Maps API for real-time global heat tracking.
                         </p>
                         <div className="bg-black/10 p-2 rounded-xl text-xs font-mono mb-4">
                             Error: MISSING_API_KEY_GMAPS
                         </div>
                         <div className="flex flex-col gap-2">
                            <button onClick={() => setShowDevPopup(false)} className="px-6 py-2 bg-black text-yellow-400 font-bold rounded-full hover:scale-105 transition-transform">
                                Acknowledged
                            </button>
                            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-white/50 text-black font-bold rounded-full hover:bg-white/70 transition-colors text-sm">
                                View Analytics Build <ExternalLink className="w-3 h-3"/>
                            </button>
                         </div>
                     </div>
                 </div>
             )}
         </div>

         {/* Bottom Console Log */}
         <div className={`h-32 border-t p-4 font-mono text-xs overflow-y-auto ${darkMode ? 'bg-black text-green-400 border-stone-800' : 'bg-slate-900 text-green-400 border-slate-200'}`}>
             <p>{">"} System Initialized.</p>
             <p>{">"} Loading Modules: [Auth, Database, Analytics]... OK</p>
             <p>{">"} Attempting connection to MapServer...</p>
             <p className="text-yellow-500">{">"} Warning: API Key validation pending.</p>
             <p className="text-blue-400 animate-pulse">{">"} Waiting for developer input...</p>
         </div>
      </div>

      {/* API & Guide Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-5 rounded-2xl border shadow-lg ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-100'}`}>
              <h4 className="font-bold flex items-center gap-2 mb-3"><Key className="w-4 h-4 text-purple-500"/> API Configuration</h4>
              <div className="space-y-3">
                  <div className={`p-3 rounded-xl border flex justify-between items-center ${darkMode ? 'bg-black border-stone-800' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="text-xs font-mono opacity-50">GOOGLE_MAPS_KEY</span>
                      <span className="text-xs text-red-500 font-bold">MISSING</span>
                  </div>
                  <div className={`p-3 rounded-xl border flex justify-between items-center ${darkMode ? 'bg-black border-stone-800' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="text-xs font-mono opacity-50">AQI_DATA_STREAM</span>
                      <span className="text-xs text-green-500 font-bold">CONNECTED</span>
                  </div>
              </div>
          </div>
          
          <div className={`p-5 rounded-2xl border shadow-lg ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-slate-100'}`}>
              <h4 className="font-bold flex items-center gap-2 mb-3"><Database className="w-4 h-4 text-blue-500"/> System Architecture</h4>
              <p className="text-xs opacity-60 mb-2">Data flow pipeline overview for developers.</p>
              <div className="flex items-center justify-between text-[10px] font-mono opacity-70">
                  <div className="p-2 border rounded">CLIENT</div>
                  <div className="h-px w-4 bg-current"></div>
                  <div className="p-2 border rounded bg-blue-500/10">SERVER</div>
                  <div className="h-px w-4 bg-current"></div>
                  <div className="p-2 border rounded">DB</div>
              </div>
          </div>
      </div>

    </div>
  );
};

export default DeveloperConsole;