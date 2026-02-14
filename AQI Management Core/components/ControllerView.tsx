import React from 'react';
import { WeatherState } from '../types';
import { getCardinalDirection } from '../utils/burnLogic';

interface ControllerViewProps {
    state: WeatherState;
    onStateChange: (field: keyof WeatherState, value: number) => void;
}

export const ControllerView: React.FC<ControllerViewProps> = ({ state, onStateChange }) => {
    return (
        <div className="card controller-view">
            <h2 className="text-xl font-bold text-gray-800">📡 Controller / API Dashboard</h2>
            <div>
                <span className="api-badge badge-sim">MODE: SIMULATION (Review)</span>
            </div>
            <p className="text-gray-600 mb-6">Monitor environmental variables and trigger "Mini-Lockdowns".</p>

            <div className="data-grid">
                <div className="data-point">
                    <label>Current AQI (Delhi)</label>
                    <span id="dispAQI">{state.aqi}</span>
                </div>
                <div className="data-point">
                    <label>Wind Speed (km/h)</label>
                    <span id="dispWindSpeed">{state.windSpeed}</span>
                </div>
                <div className="data-point">
                    <label>Wind Direction</label>
                    <span id="dispWindDir">{getCardinalDirection(state.windDeg)}</span>
                </div>
                <div className="data-point">
                    <label>System Logic</label>
                    <span id="dispLogic">Active</span>
                </div>
            </div>

            <div className="simulation-controls">
                <h3 className="font-bold mb-2">🎛️ Simulation Controls</h3>
                <p style={{ fontSize: '0.8rem', color: '#666' }} className="mb-4">
                    Adjust sliders to test the Farmer View response (Simulating API Data).
                </p>
                
                <div className="slider-group">
                    <label>AQI Level: <span id="valAQI">{state.aqi}</span></label>
                    <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        value={state.aqi}
                        onChange={(e) => onStateChange('aqi', parseInt(e.target.value))}
                    />
                </div>

                <div className="slider-group">
                    <label>Wind Speed: <span id="valWind">{state.windSpeed}</span> km/h</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        value={state.windSpeed}
                        onChange={(e) => onStateChange('windSpeed', parseInt(e.target.value))}
                    />
                </div>

                <div className="slider-group">
                    <label>Wind Direction (Degrees): <span id="valDir">{state.windDeg}</span>°</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="360" 
                        value={state.windDeg}
                        onChange={(e) => onStateChange('windDeg', parseInt(e.target.value))}
                    />
                    <small style={{ color: '#7f8c8d' }}>(Assuming 135°-225° blows toward Delhi)</small>
                </div>
            </div>
        </div>
    );
};