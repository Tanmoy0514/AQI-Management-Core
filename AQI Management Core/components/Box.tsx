import React from 'react';
import { Radio, ChevronRight } from 'lucide-react';
import { THEMES } from '../constants';
import { BoxProps } from '../types';

const Box: React.FC<BoxProps> = ({ title, icon: Icon, mode, children, color, devData, govAction, onDetailClick, detailLabel }) => {
  const theme = THEMES[mode];
  const userBorder = mode === 'USER' ? `border-l-4 ${color}` : '';

  return (
    <div className={`
      ${theme.cardBg} ${theme.cardBorder} ${userBorder}
      relative rounded-xl p-4 flex flex-col h-full transition-all duration-300 
      ${mode === 'USER' ? 'hover:-translate-y-1 hover:shadow-2xl' : ''}
    `}>
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100/10">
        <div className="flex items-center gap-2">
          <Icon size={18} className={mode === 'USER' ? color.replace('border-', 'text-') : theme.accent} />
          <h3 className={`text-xs font-bold uppercase tracking-widest opacity-70 ${theme.font}`}>{title}</h3>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center relative">
        {mode === 'USER' && <div className="animate-fadeIn">{children}</div>}
        
        {mode === 'DEV' && (
          <div className="font-mono text-[10px] space-y-1 text-green-400">
            <p className="opacity-50">// JSON Stream</p>
            {Object.entries(devData || {}).map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-blue-300">{k}:</span>
                <span className="truncate ml-2">{String(v)}</span>
              </div>
            ))}
          </div>
        )}

        {mode === 'GOV' && (
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-red-600">Administrative Action</div>
            <button className="w-full py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold rounded flex items-center justify-center gap-2">
              <Radio size={12} /> {govAction}
            </button>
            <div className="text-[9px] text-slate-400 text-center">Protocol #884-Alpha</div>
          </div>
        )}
      </div>

      {/* Button for detailed views (USER MODE ONLY) */}
      {mode === 'USER' && onDetailClick && (
        <button 
          onClick={onDetailClick}
          className="mt-4 w-full py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-xs font-bold rounded border border-slate-200 flex items-center justify-center gap-1 transition-colors"
        >
          {detailLabel || "View Details"} <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
};

export default Box;
