import React from 'react';
import { Eye, Car, AlertOctagon, Navigation, X } from 'lucide-react';
import { ModalProps } from '../../types';

interface VisibilityDriveModalProps extends ModalProps {
  aqi: number;
}

const VisibilityDriveModal: React.FC<VisibilityDriveModalProps> = ({ aqi, onClose }) => {
  const visibility = aqi > 300 ? 200 : 1200; // Mock calculation
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-slate-200">
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center"><h2 className="font-bold flex gap-2"><Eye/> Driver Vision Assistant</h2><button onClick={onClose}><X/></button></div>
        <div className="p-6 relative overflow-hidden">
          {/* Fog Simulation Overlay */}
          <div className={`absolute inset-0 pointer-events-none z-0 ${aqi > 300 ? 'bg-white/10 backdrop-blur-sm' : ''}`}></div>
          <div className="relative z-10 text-center mb-6">
             <div className="text-5xl font-mono font-bold text-white mb-2">{visibility}m</div>
             <div className="text-sm text-slate-400 uppercase tracking-widest">Effective Visibility</div>
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10">
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <Car className="mb-2 text-blue-400" />
                <div className="text-xs text-slate-500 uppercase">Max Speed</div>
                <div className="text-xl font-bold text-white">{aqi > 300 ? "40 km/h" : "60 km/h"}</div>
             </div>
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <AlertOctagon className={`mb-2 ${aqi > 300 ? 'text-red-400' : 'text-yellow-400'}`} />
                <div className="text-xs text-slate-500 uppercase">Fog Lights</div>
                <div className="text-xl font-bold text-white">{aqi > 300 ? "REQUIRED" : "Optional"}</div>
             </div>
          </div>
          <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg text-xs text-center text-blue-200">
             <Navigation size={12} className="inline mr-1"/> AI Route Suggestion: Avoid Highway NH-48 due to dense smog patches.
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisibilityDriveModal;
