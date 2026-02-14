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
  return (
    <div className={`p-6 rounded-3xl shadow-xl border ${cardStyles}`}>
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <User className="w-6 h-6 text-blue-500" />
        Your Profile
      </h2>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
        <button 
          onClick={() => setActiveTab('personal')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'personal' ? 'bg-white dark:bg-slate-700 shadow text-blue-600' : 'text-slate-500'}`}
        >
          1. Personal Details
        </button>
        <button 
          onClick={() => setActiveTab('health')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'health' ? 'bg-white dark:bg-slate-700 shadow text-blue-600' : 'text-slate-500'}`}
        >
          2. Health Condition
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'personal' ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
            <label className="text-xs font-bold uppercase opacity-60 ml-1">Who you are</label>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => setUserRole(role.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center gap-2
                      ${userRole === role.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600' 
                        : 'border-transparent bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{role.label}</span>
                  </button>
                );
              })}
            </div>
            
            {userRole === 'other' && (
              <div className="mt-4">
                <label className="text-xs font-bold uppercase opacity-60 ml-1">Please specify</label>
                <input 
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="e.g. Traffic Police, Vendor..."
                  className={`w-full mt-2 p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
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
            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 mb-4">
              <p className="text-xs text-orange-700 dark:text-orange-400 font-medium flex items-center gap-2">
                <Info className="w-4 h-4" />
                Select conditions sensitive to air pollution.
              </p>
            </div>

            <div className="space-y-2">
              {DISEASES.map((disease) => (
                <button
                  key={disease.id}
                  onClick={() => handleConditionToggle(disease.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left
                    ${selectedConditions.includes(disease.id)
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-600' 
                      : 'border-transparent bg-slate-50 dark:bg-slate-800 hover:bg-slate-100'}`}
                >
                  <span className="text-sm font-medium">{disease.label}</span>
                  {selectedConditions.includes(disease.id) && <CheckCircle className="w-5 h-5" />}
                </button>
              ))}
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
