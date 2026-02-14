import React from 'react';

interface NavbarProps {
    currentLocation: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLocation }) => {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-lungs-virus text-blue-600 text-2xl"></i>
                    <h1 className="text-xl font-bold tracking-tight text-slate-800">AQI LifeGuard</h1>
                </div>
                <div className="text-sm font-medium text-slate-500">
                    <i className="fa-solid fa-location-dot mr-1"></i> 
                    <span id="current-location-display">{currentLocation}</span>
                </div>
            </div>
        </nav>
    );
};