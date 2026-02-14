import React from 'react';
import { User, Activity, Stethoscope } from 'lucide-react';
import { ROLES, DISEASES } from '../constants';

interface ProfileFormProps {
  cardStyles: string;
  darkMode: boolean;
  userRole: string;
  setUserRole: (r: string) => void;
  userName: string;
  setUserName: (n: string) => void;
  userAge: string;
  setUserAge: (r: string) => void;
  institutionName: string;
  setInstitutionName: (i: string) => void;
  selectedConditions: string[];
  handleConditionToggle: (id: string) => void;
  handleGenerate: () => void;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  cardStyles, darkMode, userRole, setUserRole, 
  userName, setUserName, userAge, setUserAge,
  institutionName, setInstitutionName,
  selectedConditions, handleConditionToggle, handleGenerate, loading
}) => {
  const inputBg = darkMode ? 'bg-stone-800 hover:bg-stone-700 text-white border-stone-700' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-transparent';
  const activeInputBg = darkMode ? 'bg-stone-700 border-amber-500 text-amber-400' : 'bg-blue-50 border-blue-500 text-blue-600';

  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
        <User className="w-6 h-6 text-blue-500" />
        Your Profile
      </h2>

      {/* BOX 1: Identity */}
      <div className={`p-5 rounded-2xl shadow-lg border ${cardStyles}`}>
        <div className="flex items-center gap-2 mb-4 text-blue-500">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-xs font-bold">1</span>
          <span className="font-bold text-sm uppercase">Identity</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
              <label className={`text-xs font-bold uppercase ml-1 block mb-1 opacity-60`}>Name</label>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Name"
                className={`w-full p-2.5 rounded-lg border outline-none text-sm ${inputBg}`}
              />
          </div>
          <div>
              <label className={`text-xs font-bold uppercase ml-1 block mb-1 opacity-60`}>Age</label>
              <input 
                type="number" 
                value={userAge}
                onChange={(e) => setUserAge(e.target.value)}
                placeholder="Years"
                className={`w-full p-2.5 rounded-lg border outline-none text-sm ${inputBg}`}
              />
          </div>
        </div>
      </div>

      {/* BOX 2: Professional Role */}
      <div className={`p-5 rounded-2xl shadow-lg border ${cardStyles}`}>
        <div className="flex items-center gap-2 mb-4 text-purple-500">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-xs font-bold">2</span>
          <span className="font-bold text-sm uppercase">Role & Context</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {ROLES.map((role) => {
              const Icon = role.icon;
              const isSelected = userRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setUserRole(role.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center gap-1
                    ${isSelected ? activeInputBg : inputBg}`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? '' : 'opacity-50'}`} />
                  <span className="text-[10px] font-bold">{role.label}</span>
                </button>
              );
            })}
        </div>

        {/* Dynamic Input based on Role */}
        <div>
            <label className={`text-xs font-bold uppercase ml-1 block mb-1 opacity-60`}>
              {ROLES.find(r => r.id === userRole)?.contextLabel || 'Details'}
            </label>
            <input 
              type="text" 
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              placeholder={`Enter ${ROLES.find(r => r.id === userRole)?.contextLabel || 'details'}...`}
              className={`w-full p-2.5 rounded-lg border outline-none text-sm ${inputBg}`}
            />
        </div>
      </div>

      {/* BOX 3: Health */}
      <div className={`p-5 rounded-2xl shadow-lg border ${cardStyles}`}>
        <div className="flex items-center gap-2 mb-4 text-rose-500">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-xs font-bold">3</span>
            <span className="font-bold text-sm uppercase">Health Profile</span>
        </div>
        <div className="flex flex-wrap gap-2">
            {DISEASES.map((disease) => {
              const isSelected = selectedConditions.includes(disease.id);
              return (
                <button
                  key={disease.id}
                  onClick={() => handleConditionToggle(disease.id)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all
                    ${isSelected 
                      ? (darkMode ? 'bg-rose-900/30 border-rose-800 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600') 
                      : inputBg}`}
                >
                  {disease.label}
                </button>
              );
            })}
        </div>
      </div>

      <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Stethoscope className="w-5 h-5" />}
          {loading ? 'Analyzing Profile...' : 'Generate Analysis Report'}
      </button>

    </div>
  );
};

export default ProfileForm;
