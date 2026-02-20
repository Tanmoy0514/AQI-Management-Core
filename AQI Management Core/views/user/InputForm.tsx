import React from 'react';
import { Shield, Activity } from 'lucide-react';
import { ROLES } from '../../data/constants';
import { ThemeStyles } from '../../types';

interface InputFormProps {
  userName: string;
  setUserName: (val: string) => void;
  userAge: string;
  setUserAge: (val: string) => void;
  userRole: string;
  setUserRole: (val: string) => void;
  loading: boolean;
  handleGenerate: () => void;
  darkMode: boolean;
  theme: ThemeStyles;
}

const InputForm: React.FC<InputFormProps> = ({
  userName, setUserName,
  userAge, setUserAge,
  userRole, setUserRole,
  loading, handleGenerate,
  darkMode, theme
}) => {

  const cardBg = darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-100 shadow-sm';

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-10">
        <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-4">
                <Shield size={32} />
            </div>
            <h2 className="text-3xl font-bold">Personalized Protection</h2>
            <p className={theme.textMuted}>Get tailored health advice based on real-time air quality data.</p>
        </div>

        <div className={`p-6 rounded-3xl border shadow-sm space-y-6 ${cardBg}`}>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase opacity-50 ml-1">Name</label>
                    <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter Name" className={`w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-2 ring-blue-500/20 transition-all ${darkMode ? 'border-neutral-700' : 'border-slate-200'}`} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase opacity-50 ml-1">Age</label>
                    <input type="number" value={userAge} onChange={e => setUserAge(e.target.value)} placeholder="Years" className={`w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-2 ring-blue-500/20 transition-all ${darkMode ? 'border-neutral-700' : 'border-slate-200'}`} />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase opacity-50 ml-1">I am a...</label>
                <div className="grid grid-cols-3 gap-2">
                    {ROLES.map(role => (
                        <button key={role.id} onClick={() => setUserRole(role.id)} className={`p-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-2 ${userRole === role.id ? 'bg-blue-600 border-blue-600 text-white' : `${darkMode ? 'border-neutral-700 hover:bg-neutral-800' : 'border-slate-200 hover:bg-slate-50'}`}`}>
                            <role.icon size={18} />
                            {role.label}
                        </button>
                    ))}
                </div>
            </div>

            <button onClick={handleGenerate} disabled={loading} className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? <Activity className="animate-spin" /> : 'Generate Report'}
            </button>
        </div>
    </div>
  );
};

export default InputForm;