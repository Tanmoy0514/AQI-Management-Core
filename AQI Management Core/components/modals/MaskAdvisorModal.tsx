import React, { useState } from 'react';
import { Shield, CheckCircle, User, Skull, X } from 'lucide-react';
import { ModalProps } from '../../types';

interface MaskAdvisorModalProps extends ModalProps {
  initialAqi: number;
}

const MaskAdvisorModal: React.FC<MaskAdvisorModalProps> = ({ initialAqi, onClose }) => {
  const [aqiInput, setAqiInput] = useState(initialAqi);
  const maskData = [
    { min: 0, max: 50, name: "No Mask Required", layers: "0 Layers", note: "Breathing natural air is best here.", color: "text-green-500", bg: "bg-green-100", icon: <CheckCircle size={40}/> },
    { min: 51, max: 100, name: "Cloth Mask", layers: "2-3 Layers", note: "Good for hygiene, weak against smog.", color: "text-yellow-500", bg: "bg-yellow-100", icon: <Shield size={40}/> },
    { min: 101, max: 200, name: "Surgical Mask", layers: "3 Layers (SMS)", note: "Designed for fluids, leaks air from sides.", color: "text-orange-500", bg: "bg-orange-100", icon: <User size={40}/> },
    { min: 201, max: 300, name: "N95 / KN95", layers: "4-5 Layers", note: "Filters 95% of particles. Gold Standard.", color: "text-purple-600", bg: "bg-purple-100", icon: <Shield size={40} className="fill-current"/> },
    { min: 301, max: 9999, name: "N99 / P100 Respirator", layers: "Industrial", note: "Absolute protection for hazardous zones.", color: "text-red-700", bg: "bg-red-100", icon: <Skull size={40}/> },
  ];
  const currentMask = maskData.find(m => aqiInput >= m.min && aqiInput <= m.max) || maskData[maskData.length-1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-slate-900 p-6 text-white text-center relative">
          <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X/></button>
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2"><Shield /> Mask Advisor</h2>
        </div>
        <div className="p-6 space-y-6">
          <input type="number" value={aqiInput} onChange={(e) => setAqiInput(Number(e.target.value))} className="w-full text-center text-3xl font-bold border-b-2 py-2 text-slate-700"/>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">{[50, 150, 250, 350, 500].map(val => (<button key={val} onClick={() => setAqiInput(val)} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold text-slate-600">AQI {val}</button>))}</div>
          <div className={`border-2 rounded-xl p-6 text-center transition-colors ${currentMask.bg.replace('bg-', 'border-')}`}>
             <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${currentMask.bg} ${currentMask.color}`}>{currentMask.icon}</div>
             <h3 className="text-2xl font-bold text-slate-800">{currentMask.name}</h3>
             <p className="text-sm text-slate-600 bg-white/50 p-2 rounded mt-2">{currentMask.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaskAdvisorModal;
