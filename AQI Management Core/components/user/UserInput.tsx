import React, { useRef } from 'react';
import { Activity, Stethoscope } from 'lucide-react';
import { ROLES, DISEASES } from '../../constants';

interface UserInputProps {
  userName: string;
  setUserName: (val: string) => void;
  userAge: string;
  setUserAge: (val: string) => void;
  userRole: string;
  setUserRole: (val: string) => void;
  institutionName: string;
  setInstitutionName: (val: string) => void;
  selectedConditions: string[];
  handleConditionToggle: (id: string) => void;
  loading: boolean;
  handleGenerate: () => void;
  darkMode: boolean;
  cardBg: string;
  inputBg: string;
  activeInputBg: string;
}

const UserInput: React.FC<UserInputProps> = ({
  userName, setUserName,
  userAge, setUserAge,
  userRole, setUserRole,
  institutionName, setInstitutionName,
  selectedConditions, handleConditionToggle,
  loading, handleGenerate,
  darkMode, cardBg, inputBg, activeInputBg
}) => {
  
  // Focus Refs
  const ageRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLInputElement>(null);
  const generateBtnRef = useRef<HTMLButtonElement>(null);

  // Keyboard UX
  const handleNameKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') ageRef.current?.focus(); };
  const handleAgeKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') detailsRef.current?.focus(); };
  const handleDetailsKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleGenerate(); };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 animate-in fade-in slide-in-from-left-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Configure Your Profile</h1>
        <p className="opacity-60">Enter your details to generate a personalized health advisory.</p>
      </div>
      
      {/* BOX 1: Identity */}
      <div className={`p-6 rounded-2xl shadow-lg border ${cardBg}`}>
        <div className="flex items-center gap-2 mb-4 text-blue-500">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-xs font-bold">1</span>
          <span className="font-bold text-sm uppercase">Identity</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase ml-1 block mb-1 opacity-60">Name</label>
            <input 
              type="text" 
              value={userName} 
              onKeyDown={handleNameKeyDown} 
              onChange={(e) => setUserName(e.target.value)} 
              placeholder="Your Name (e.g. Tommy)" 
              className={`w-full p-3 rounded-xl border outline-none text-sm ${inputBg}`} 
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase ml-1 block mb-1 opacity-60">Age</label>
            <input 
              type="number" 
              value={userAge} 
              ref={ageRef} 
              onKeyDown={handleAgeKeyDown} 
              onChange={(e) => setUserAge(e.target.value)} 
              placeholder="Years" 
              className={`w-full p-3 rounded-xl border outline-none text-sm ${inputBg}`} 
            />
          </div>
        </div>
      </div>

      {/* BOX 2: Professional Role */}
      <div className={`p-6 rounded-2xl shadow-lg border ${cardBg}`}>
        <div className="flex items-center gap-2 mb-4 text-purple-500">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-xs font-bold">2</span>
          <span className="font-bold text-sm uppercase">Role & Context</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {ROLES.map((role) => {
            const Icon = role.icon; const isSelected = userRole === role.id;
            return (
              <button key={role.id} onClick={() => setUserRole(role.id)} className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center gap-2 ${isSelected ? activeInputBg : inputBg}`}>
                <Icon className={`w-5 h-5 ${isSelected ? '' : 'opacity-50'}`} /> <span className="text-xs font-bold">{role.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Input based on Role */}
        <div>
          <label className="text-xs font-bold uppercase ml-1 block mb-1 opacity-60">{ROLES.find(r => r.id === userRole)?.contextLabel || 'Details'}</label>
          <input 
             type="text" 
             value={institutionName} 
             ref={detailsRef} 
             onKeyDown={handleDetailsKeyDown} 
             onChange={(e) => setInstitutionName(e.target.value)} 
             placeholder={`Enter ${ROLES.find(r => r.id === userRole)?.contextLabel || 'details'}...`} 
             className={`w-full p-3 rounded-xl border outline-none text-sm ${inputBg}`} 
          />
        </div>
      </div>

      {/* BOX 3: Health */}
      <div className={`p-6 rounded-2xl shadow-lg border ${cardBg}`}>
        <div className="flex items-center gap-2 mb-4 text-rose-500">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-xs font-bold">3</span>
          <span className="font-bold text-sm uppercase">Health Profile</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {DISEASES.map((disease) => {
            const isSelected = selectedConditions.includes(disease.id);
            return (
              <button key={disease.id} onClick={() => handleConditionToggle(disease.id)} className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${isSelected ? (darkMode ? 'bg-rose-900/30 border-rose-800 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600') : inputBg}`}>
                {disease.label}
              </button>
            );
          })}
        </div>
      </div>

      <button ref={generateBtnRef} onClick={handleGenerate} disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
        {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Stethoscope className="w-5 h-5" />}
        {loading ? 'Analyzing Profile...' : 'Generate Analysis Report'}
      </button>
    </div>
  );
};

export default UserInput;