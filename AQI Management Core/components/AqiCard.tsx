import React from 'react';
import { getAqiThemeClass } from '../utils/aqiLogic';

interface AqiCardProps {
    city: string | null;
    aqi: number;
    status: string;
    description: string;
    temperature: string;
}

export const AqiCard: React.FC<AqiCardProps> = ({ city, aqi, status, description, temperature }) => {
    const themeClass = city ? getAqiThemeClass(aqi) : '';
    const isPulse = aqi > 200;
    
    // Default styling for "unselected" state
    const baseClasses = "bg-white rounded-2xl shadow-lg p-6 col-span-1 md:col-span-2 relative overflow-hidden transition-all duration-500";
    const textClass = city ? "text-white" : "text-gray-800"; // Original used JS to remove/add specific classes, effectively resetting to default if no city or specific city selected. 
    // In React logic, we apply gradient if city is selected.
    
    const containerClass = `${baseClasses} ${city ? themeClass : ''} ${isPulse ? 'pulse-ring' : ''} ${textClass}`;

    return (
        <div id="aqi-card" className={containerClass}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <i className="fa-solid fa-cloud text-9xl"></i>
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-semibold opacity-70 uppercase tracking-wider">Live Air Quality Index</p>
                        <h2 id="city-title" className="text-3xl font-bold mt-1">
                            {city || "Select a City"}
                        </h2>
                        <p id="weather-desc" className="text-sm mt-1 opacity-80">
                            {city ? `${temperature} | ${description}` : "--"}
                        </p>
                    </div>
                    {city && (
                        <div id="aqi-badge" className="px-4 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                            LIVE
                        </div>
                    )}
                </div>

                <div className="mt-8 flex items-end gap-4">
                    <div className="text-6xl font-bold tracking-tighter" id="aqi-value">
                        {city ? aqi : "--"}
                    </div>
                    <div className="mb-2">
                        <div className="text-xl font-semibold" id="aqi-status">
                            {city ? status : "--"}
                        </div>
                        <div className="text-sm opacity-80">PM2.5 Concentration</div>
                    </div>
                </div>

                {/* PM2.5 Alert Box (Dynamic) */}
                {city && aqi > 200 && (
                    <div id="pm-alert" className="mt-6 bg-white/20 backdrop-blur-md rounded-lg p-3 text-sm">
                        <i className="fa-solid fa-circle-exclamation mr-2"></i> High PM2.5 levels detected. Mask recommended.
                    </div>
                )}
            </div>
        </div>
    );
};