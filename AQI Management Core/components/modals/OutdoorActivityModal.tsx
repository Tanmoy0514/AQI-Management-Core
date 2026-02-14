import React from 'react';
import { ShoppingBag, X, Sun, AlertTriangle, CheckCircle } from 'lucide-react';
import { ModalProps } from '../../types';

const OutdoorActivityModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="bg-yellow-500 p-4 text-white flex justify-between items-center"><h2 className="font-bold flex gap-2"><ShoppingBag/> Outdoor Planner</h2><button onClick={onClose}><X/></button></div>
        <div className="p-6">
           <h3 className="text-slate-700 font-bold mb-4">24-Hour Forecast</h3>
           <div className="flex gap-2 overflow-x-auto pb-4">
              {[8,9,10,11,12,13,14,15,16,17,18].map(h => {
                 const isSafe = h >= 14 && h <= 16;
                 return (
                   <div key={h} className={`flex-shrink-0 w-16 p-2 rounded-lg text-center border ${isSafe ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <div className="text-xs text-slate-500 mb-1">{h}:00</div>
                      <div className={`text-lg font-bold ${isSafe ? 'text-green-600' : 'text-red-500'}`}>{isSafe ? <Sun size={20} className="mx-auto"/> : <AlertTriangle size={20} className="mx-auto"/>}</div>
                      <div className={`text-[10px] font-bold mt-1 ${isSafe ? 'text-green-700' : 'text-red-700'}`}>{isSafe ? 'Good' : 'Bad'}</div>
                   </div>
                 )
              })}
           </div>
           <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                 <div className="text-slate-400 text-xs uppercase font-bold mb-2">Jogging</div>
                 <div className="text-red-500 font-bold flex items-center justify-center gap-1"><X size={16}/> Unsafe</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                 <div className="text-slate-400 text-xs uppercase font-bold mb-2">Shopping</div>
                 <div className="text-green-600 font-bold flex items-center justify-center gap-1"><CheckCircle size={16}/> 2PM - 4PM</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                 <div className="text-slate-400 text-xs uppercase font-bold mb-2">Cycling</div>
                 <div className="text-red-500 font-bold flex items-center justify-center gap-1"><X size={16}/> Avoid</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OutdoorActivityModal;
