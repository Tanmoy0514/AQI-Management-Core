import React, { useState } from 'react';
import { Users, Flame, ThumbsUp, Plus, X } from 'lucide-react';
import { ModalProps } from '../../types';

interface CommunityReportModalProps extends ModalProps {
  city: string;
}

const CommunityReportModal: React.FC<CommunityReportModalProps> = ({ city, onClose }) => {
  const [reports, setReports] = useState([
    { id: 1, type: "Garbage Fire", loc: "Sector 4", votes: 12, time: "10m ago" },
    { id: 2, type: "Construction Dust", loc: "Main Road", votes: 5, time: "1h ago" },
  ]);

  const addReport = () => {
    setReports([{ id: Date.now(), type: "User Report", loc: "Near You", votes: 0, time: "Just now" }, ...reports]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]">
        <div className="bg-teal-600 p-4 text-white flex justify-between items-center"><h2 className="font-bold flex gap-2"><Users/> Community Watch</h2><button onClick={onClose}><X/></button></div>
        <div className="p-4 bg-teal-50 border-b border-teal-100 flex justify-between items-center">
           <span className="text-sm text-teal-800 font-bold">Live Reports in {city}</span>
           <button onClick={addReport} className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Plus size={12}/> Report</button>
        </div>
        <div className="p-4 overflow-y-auto space-y-3">
           {reports.map(r => (
             <div key={r.id} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="bg-orange-100 text-orange-600 p-2 rounded-full"><Flame size={16}/></div>
                   <div>
                      <div className="font-bold text-slate-800 text-sm">{r.type}</div>
                      <div className="text-xs text-slate-500">{r.loc} • {r.time}</div>
                   </div>
                </div>
                <div className="flex flex-col items-center">
                   <button className="text-slate-400 hover:text-blue-500"><ThumbsUp size={14}/></button>
                   <span className="text-xs font-bold text-slate-600">{r.votes}</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityReportModal;
