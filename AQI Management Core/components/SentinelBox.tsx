import React from 'react';
import { Radio } from 'lucide-react';
import { SentinelBoxProps } from '../types';

const SentinelBox: React.FC<SentinelBoxProps> = ({ title, icon: Icon, mode, data, devData, govData, impactLevel }) => {
  const getBorderColor = () => {
    if (mode === 'DEV') return 'border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
    if (mode === 'GOV') return 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
    if (impactLevel === 'HIGH') return 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
    if (impactLevel === 'MED') return 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]';
    return 'border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]';
  };

  return (
    <div className={`relative backdrop-blur-xl bg-slate-900/60 border ${getBorderColor()} rounded-xl p-4 transition-all duration-500 hover:scale-[1.02] overflow-hidden group h-full flex flex-col`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
        <Icon size={18} className={mode === 'DEV' ? 'text-green-400' : mode === 'GOV' ? 'text-red-400' : 'text-cyan-400'} />
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">{title}</h3>
      </div>

      {/* Content Body Based on Mode */}
      <div className="flex-1 flex flex-col justify-center">
        {mode === 'USER' && (
          <div className="animate-fadeIn">
            {data}
          </div>
        )}

        {mode === 'DEV' && devData && (
          <div className="font-mono text-[10px] text-green-400 space-y-1 animate-fadeIn">
            <p className="opacity-50">// API Response 200 OK</p>
            {Object.entries(devData).map(([key, val]) => (
              <div key={key} className="flex justify-between border-b border-green-900/30 pb-1">
                <span className="text-green-600">{key}:</span>
                <span>{val}</span>
              </div>
            ))}
            <div className="mt-2 text-xs bg-black/40 p-1 rounded border border-green-800">
              Latency: {Math.floor(Math.random() * 50) + 10}ms
            </div>
          </div>
        )}

        {mode === 'GOV' && govData && (
          <div className="animate-fadeIn space-y-2">
            <div className="text-[10px] text-red-300 uppercase font-bold tracking-widest mb-1">Action Required</div>
            {govData.actions.map((action, i) => (
              <button key={i} className="w-full text-xs bg-red-900/40 hover:bg-red-500 hover:text-white border border-red-700 text-red-200 py-2 rounded flex items-center justify-center gap-2 transition-all">
                <Radio size={12} className="animate-pulse" />
                {action}
              </button>
            ))}
            <div className="text-[9px] text-slate-500 text-center mt-2">Auth: Level 4 Clearance</div>
          </div>
        )}
      </div>

      {/* Decorative Corner Canvas */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-xl pointer-events-none"></div>
    </div>
  );
};

export default SentinelBox;