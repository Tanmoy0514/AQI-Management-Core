import React from 'react';
import { User, Info, CheckCircle, Activity, Stethoscope } from 'lucide-react';
import { ROLES, DISEASES } from '../constants';

interface ProfileFormProps {
  cardStyles: string;
  darkMode: boolean;
  activeTab: string;
  setActiveTab: (t: string) => void;
  userRole: string;
  setUserRole: (r: string) => void;
  customRole: string;
  setCustomRole: (r: string) => void;
  selectedConditions: string[];
  handleConditionToggle: (id: string) => void;
  handleGenerate: () => void;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  cardStyles, darkMode, activeTab, setActiveTab, userRole, setUserRole, 
  customRole, setCustomRole, selectedConditions, handleConditionToggle, 
  handleGenerate, loading
}) => {
  const inputBg = darkMode ? 'bg-stone-800 hover:bg-stone-700 text-white border-stone-700' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-transparent';
  const activeInputBg = darkMode ? 'bg-stone-700 border-amber-500 text-amber-400' : 'bg-blue-50 border-blue-500 text-blue-600';

  return (
    <div className={`p-6 rounded-3xl shadow-xl border ${cardStyles}`}>
      <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
        <User className="w-6 h-6 text-blue-500" />
        Your Profile
      </h2>

      {/* Tabs */}
      <div className={`flex p-1 rounded-xl mb-6 ${darkMode ? 'bg-stone-800' : 'bg-slate-100'}`}>
        <button 
          onClick={() => setActiveTab('personal')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'personal' 
              ? (darkMode ? 'bg-stone-600 text-white shadow' : 'bg-white text-blue-600 shadow') 
              : (darkMode ? 'text-stone-400' : 'text-slate-500')
          }`}
        >
          1. Personal Details
        </button>
        <button 
          onClick={() => setActiveTab('health')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'health' 
              ? (darkMode ? 'bg-stone-600 text-white shadow' : 'bg-white text-blue-600 shadow') 
              : (darkMode ? 'text-stone-400' : 'text-slate-500')
          }`}
        >
          2. Health Condition
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'personal' ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
            <label className={`text-xs font-bold uppercase ml-1 ${darkMode ? 'text-stone-400' : 'text-slate-400'}`}>Who you are</label>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = userRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setUserRole(role.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center gap-2
                      ${isSelected ? activeInputBg : inputBg}`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? '' : darkMode ? 'text-stone-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-medium">{role.label}</span>
                  </button>
                );
              })}
            </div>
            
            {userRole === 'other' && (
              <div className="mt-4">
                <label className={`text-xs font-bold uppercase ml-1 ${darkMode ? 'text-stone-400' : 'text-slate-400'}`}>Please specify</label>
                <input 
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="e.g. Traffic Police, Vendor..."
                  className={`w-full mt-2 p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
                />
              </div>
            )}

            <button 
              onClick={() => setActiveTab('health')}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all"
            >
              Next: Health Details
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className={`p-4 rounded-xl border mb-4 ${darkMode ? 'bg-amber-900/20 border-amber-900/50' : 'bg-orange-50 border-orange-100'}`}>
              <p className={`text-xs font-medium flex items-center gap-2 ${darkMode ? 'text-amber-400' : 'text-orange-700'}`}>
                <Info className="w-4 h-4" />
                Select conditions sensitive to air pollution.
              </p>
            </div>

            <div className="space-y-2">
              {DISEASES.map((disease) => {
                  const isSelected = selectedConditions.includes(disease.id);
                  return (
                    <button
                      key={disease.id}
                      onClick={() => handleConditionToggle(disease.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left
                        ${isSelected 
                          ? (darkMode ? 'bg-rose-900/30 border-rose-800 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600') 
                          : inputBg}`}
                    >
                      <span className="text-sm font-medium">{disease.label}</span>
                      {isSelected && <CheckCircle className="w-5 h-5" />}
                    </button>
                  );
              })}
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-6 py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Stethoscope className="w-5 h-5" />}
              {loading ? 'Analyzing...' : 'Generate Health Advisory'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProfileForm;
