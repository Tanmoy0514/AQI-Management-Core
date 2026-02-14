import React from 'react';
import { CITIES } from '../constants';
import { CityKey } from '../types';

interface CitySelectorProps {
    selectedCity: string | null;
    onSelectCity: (city: CityKey) => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onSelectCity }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1 md:col-span-1 border border-slate-100">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">Select Region</h2>
            <div className="space-y-3">
                {CITIES.map((city) => (
                    <button
                        key={city.key}
                        onClick={() => onSelectCity(city.key)}
                        className={`city-btn w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 border transition-all flex justify-between items-center group focus:ring-2 focus:ring-blue-500 ${
                            selectedCity === city.key
                                ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-500'
                                : 'border-transparent hover:border-slate-200'
                        }`}
                        data-city={city.key}
                    >
                        <span className="font-medium">{city.label}</span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full group-hover:bg-white">
                            {city.region}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};