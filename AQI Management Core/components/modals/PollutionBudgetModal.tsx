import React, { useState } from 'react';
import { Wallet, X } from 'lucide-react';
import { ModalProps } from '../../types';

interface PollutionBudgetModalProps extends ModalProps {
  aqi: number;
  pm25: number;
}

const PollutionBudgetModal: React.FC<PollutionBudgetModalProps> = ({ aqi, pm25, onClose }) => {
  const [activity, setActivity] = useState(1);
  const [duration, setDuration] = useState<number | string>(30);
  const [budget] = useState(50.0);
  const impact = ((pm25 * activity * (Number(duration) / 60)) / 10).toFixed(1);
  const remaining = (budget - Number(impact)).toFixed(1);
  const percentUsed = Math.min(100, (Number(impact) / budget) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center"><h2 className="font-bold flex gap-2"><Wallet/> Pollution Budget</h2><button onClick={onClose}><X/></button></div>
        <div className="p-6 overflow-y-auto">
          <div className="mb-8"><div className="flex justify-between items-end mb-2"><span className="text-sm font-bold text-slate-500">Daily Exposure Budget</span><span className={`text-2xl font-bold ${Number(remaining) < 0 ? 'text-red-500' : 'text-blue-600'}`}>{remaining} <span className="text-sm text-slate-400">/ 50µg</span></span></div><div className="h-4 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full transition-all duration-1000 ${Number(remaining) < 0 ? 'bg-red-500' : 'bg-blue-500'}`} style={{width: `${percentUsed}%`}}></div></div></div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
             <label className="text-xs font-bold text-slate-400 block mb-1">Activity</label>
             <select className="w-full p-2 rounded border mb-3 text-sm" onChange={(e) => setActivity(Number(e.target.value))}><option value="1">Office / Commute</option><option value="2.5">Walking</option><option value="4">Bike / Heavy Work</option></select>
             <label className="text-xs font-bold text-slate-400 block mb-1">Duration (Mins)</label>
             <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full p-2 rounded border mb-4 text-sm" />
             <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-sm font-bold text-center">Cost: {impact}µg</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollutionBudgetModal;
