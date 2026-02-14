import React from 'react';
import { UserInputs } from '../types';

interface ActivityProfilerProps {
    inputs: UserInputs;
    setInputs: React.Dispatch<React.SetStateAction<UserInputs>>;
    onAnalyze: () => void;
}

export const ActivityProfiler: React.FC<ActivityProfilerProps> = ({ inputs, setInputs, onAnalyze }) => {

    const handleChange = (field: keyof UserInputs, value: string | number) => {
        setInputs(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <section className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <i className="fa-solid fa-sliders text-blue-500 mr-2"></i> Activity Profiler
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. Role */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Occupation / Role</label>
                    <div className="relative">
                        <select 
                            id="user-role" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                            value={inputs.role}
                            onChange={(e) => handleChange('role', e.target.value)}
                        >
                            <option value="student">Student</option>
                            <option value="office">Office Worker</option>
                            <option value="outdoor">Outdoor Job (Delivery, Construction)</option>
                            <option value="home">Homemaker / Retired</option>
                        </select>
                        <i className="fa-solid fa-chevron-down absolute right-4 top-4 text-slate-400 text-xs"></i>
                    </div>
                </div>

                {/* 2. Exposure Duration */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Hours Outside: <span id="hours-display" className="text-blue-600 font-bold">{inputs.hours}</span> hr
                    </label>
                    <input 
                        type="range" 
                        id="exposure-hours" 
                        min="0" 
                        max="12" 
                        step="0.5" 
                        value={inputs.hours}
                        className="w-full mb-2"
                        onChange={(e) => handleChange('hours', parseFloat(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>0h</span>
                        <span>6h</span>
                        <span>12h+</span>
                    </div>
                </div>

                {/* 3. Transit Mode */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Transit Mode</label>
                    <div className="relative">
                        <select 
                            id="transit-mode" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                            value={inputs.transit}
                            onChange={(e) => handleChange('transit', e.target.value)}
                        >
                            <option value="metro">Metro / Train (Safest)</option>
                            <option value="car_ac">AC Car</option>
                            <option value="bus_ev">Electric Bus</option>
                            <option value="bike">Motorbike / Scooter</option>
                            <option value="auto">Auto-Rickshaw</option>
                            <option value="walk">Walking / Cycling</option>
                        </select>
                        <i className="fa-solid fa-chevron-down absolute right-4 top-4 text-slate-400 text-xs"></i>
                    </div>
                </div>

                {/* 4. Shopping Method */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Shopping / Market</label>
                    <div className="relative">
                        <select 
                            id="shopping-mode" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                            value={inputs.shopping}
                            onChange={(e) => handleChange('shopping', e.target.value)}
                        >
                            <option value="online">Online Delivery (Safe)</option>
                            <option value="mall">Shopping Mall (Indoor)</option>
                            <option value="bazaar">Open Market / Bazaar (High Risk)</option>
                        </select>
                        <i className="fa-solid fa-chevron-down absolute right-4 top-4 text-slate-400 text-xs"></i>
                    </div>
                </div>
            </div>

            {/* Analysis Button */}
            <div className="mt-8 flex justify-end">
                <button 
                    onClick={onAnalyze} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                    <i className="fa-solid fa-chart-pie"></i> Analyze Exposure Risk
                </button>
            </div>
        </section>
    );
};