import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FarmerView } from './components/FarmerView';
import { ControllerView } from './components/ControllerView';
import { MaskAdvisor } from './components/MaskAdvisor';
import { calculateBurnStatus } from './utils/burnLogic';
import { WeatherState, BurnStatus } from './types';

const App: React.FC = () => {
    // Initial State
    const [weatherState, setWeatherState] = useState<WeatherState>({
        aqi: 150,
        windSpeed: 10,
        windDeg: 180 // South
    });

    const [burnStatus, setBurnStatus] = useState<BurnStatus>({
        canBurn: false,
        reason: 'Initializing...',
        icon: '--',
        text: 'Loading...',
        subText: 'Checking satellites...',
        advice: 'Please wait for the system to calculate weather conditions.',
        statusColor: '#95a5a6'
    });

    // Update system logic when state changes
    useEffect(() => {
        const status = calculateBurnStatus(weatherState);
        setBurnStatus(status);
    }, [weatherState]);

    const handleStateChange = (field: keyof WeatherState, value: number) => {
        setWeatherState(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            
            <div className="container mx-auto px-4 py-6 flex-1 flex flex-wrap justify-center gap-6">
                
                {/* Farmer View Card */}
                <div className="w-full max-w-[500px]">
                    <FarmerView status={burnStatus} />
                </div>

                {/* Mask Advisor Card (New) */}
                <div className="w-full max-w-[500px]">
                    <MaskAdvisor currentAqi={weatherState.aqi} />
                </div>

                {/* Controller View Card */}
                <div className="w-full max-w-[500px]">
                    <ControllerView state={weatherState} onStateChange={handleStateChange} />
                </div>

            </div>
        </div>
    );
};

export default App;