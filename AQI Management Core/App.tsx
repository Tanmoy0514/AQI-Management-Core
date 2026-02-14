import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { CitySelector } from './components/CitySelector';
import { AqiCard } from './components/AqiCard';
import { ActivityProfiler } from './components/ActivityProfiler';
import { ResultSection } from './components/ResultSection';
import { Footer } from './components/Footer';
import { MOCK_DATA } from './constants';
import { calculateRisk } from './utils/aqiLogic';
import { CityKey, UserInputs, AnalysisResult } from './types';

const App: React.FC = () => {
    // State
    const [currentCity, setCurrentCity] = useState<CityKey | null>(null);
    const [currentAQI, setCurrentAQI] = useState<number>(0);
    const [cityData, setCityData] = useState({
        status: "--",
        desc: "--",
        temp: "--"
    });

    const [inputs, setInputs] = useState<UserInputs>({
        role: 'student',
        hours: 1,
        transit: 'metro',
        shopping: 'online'
    });

    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

    // Logic: Update City
    const handleCitySelect = useCallback((city: CityKey) => {
        setCurrentCity(city);
        
        // Use Mock Data
        const data = MOCK_DATA[city];
        
        // Add slight randomness to make it feel "live" (Preserving original logic)
        // Original: data.aqi = Math.floor(data.aqi + (Math.random() * 10 - 5));
        const randomizedAqi = Math.floor(data.aqi + (Math.random() * 10 - 5));
        
        setCurrentAQI(randomizedAqi);
        setCityData({
            status: data.status,
            desc: data.desc,
            temp: data.temp
        });

        // Hide previous results if city changes
        setAnalysisResult(null);
    }, []);

    // Logic: Calculate Risk
    const handleAnalyze = useCallback(() => {
        if (!currentCity) {
            alert("Please select a city first.");
            return;
        }
        
        const result = calculateRisk(currentAQI, currentCity, inputs);
        setAnalysisResult(result);
    }, [currentCity, currentAQI, inputs]);

    return (
        <div className="min-h-screen bg-[#f3f4f6]">
            <Navbar currentLocation={currentCity || "Select City"} />
            
            <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
                
                {/* Top Section: City & AQI Status */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CitySelector 
                        selectedCity={currentCity} 
                        onSelectCity={handleCitySelect} 
                    />
                    
                    <AqiCard 
                        city={currentCity}
                        aqi={currentAQI}
                        status={cityData.status}
                        description={cityData.desc}
                        temperature={cityData.temp}
                    />
                </section>

                {/* Middle Section: User Inputs */}
                <ActivityProfiler 
                    inputs={inputs} 
                    setInputs={setInputs} 
                    onAnalyze={handleAnalyze} 
                />

                {/* Result Section: Logic Output */}
                <ResultSection result={analysisResult} />

            </main>

            <Footer />
        </div>
    );
};

export default App;