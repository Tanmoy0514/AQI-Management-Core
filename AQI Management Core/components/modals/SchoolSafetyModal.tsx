import React from 'react';
import { School, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { ModalProps } from '../../types';

interface SchoolSafetyModalProps extends ModalProps {
  aqi: number;
}

const SchoolSafetyModal: React.FC<SchoolSafetyModalProps> = ({ aqi, onClose }) => {
  const isSafe = aqi < 200;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-pink-600 p-4 text-white flex justify-between items-center"><h2 className="font-bold flex gap-2"><School/> School & Child Safety</h2><button onClick={onClose}><X/></button></div>
        <div className="p-6 space-y-4">
          <div className={`p-4 rounded-xl text-center border-2 ${isSafe ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`text-6xl mb-2 ${isSafe ? 'text-green-500' : 'text-red-500'}`}>{isSafe ? <CheckCircle className="mx-auto" size={60}/> : <AlertTriangle className="mx-auto" size={60}/>}</div>
            <h3 className={`text-2xl font-bold ${isSafe ? 'text-green-700' : 'text-red-700'}`}>{isSafe ? "Safe for School" : "Severe Risk for Kids"}</h3>
            <p className="text-sm text-slate-600 mt-1">{isSafe ? "Air quality allows for outdoor play." : "Children's lungs are 4x more sensitive. Keep them indoors."}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-slate-50 p-3 rounded-lg"><div className="text-xs font-bold text-slate-400 uppercase">Outdoor Recess</div><div className={`font-bold ${isSafe ? 'text-green-600' : 'text-red-600'}`}>{isSafe ? "Allowed" : "Cancelled"}</div></div>
             <div className="bg-slate-50 p-3 rounded-lg"><div className="text-xs font-bold text-slate-400 uppercase">Sports Day</div><div className={`font-bold ${isSafe ? 'text-green-600' : 'text-red-600'}`}>{isSafe ? "Go Ahead" : "Postpone"}</div></div>
             <div className="bg-slate-50 p-3 rounded-lg"><div className="text-xs font-bold text-slate-400 uppercase">Transport</div><div className="font-bold text-slate-700">Windows Closed</div></div>
             <div className="bg-slate-50 p-3 rounded-lg"><div className="text-xs font-bold text-slate-400 uppercase">Classrooms</div><div className="font-bold text-slate-700">Purifiers ON</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolSafetyModal;
