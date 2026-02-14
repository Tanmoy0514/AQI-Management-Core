import React from 'react';
import { BurnStatus } from '../types';

interface FarmerViewProps {
    status: BurnStatus;
}

export const FarmerView: React.FC<FarmerViewProps> = ({ status }) => {
    return (
        <div className="card farmer-view">
            <h2 className="text-xl font-bold text-gray-800">🧑‍🌾 Farmer Interface</h2>
            <p className="text-gray-600 mb-4">Simple guidance based on current wind & air quality.</p>
            
            <div 
                id="burnStatus" 
                className="status-box"
                style={{ backgroundColor: status.statusColor }}
            >
                <span className="status-icon" id="statusIcon">{status.icon}</span>
                <div className="status-text" id="statusText">{status.text}</div>
                <div className="status-sub" id="statusSub">{status.subText}</div>
            </div>

            <div className="recommendation">
                <strong>ℹ️ Advice:</strong> <span id="farmerAdvice">{status.advice}</span>
            </div>
        </div>
    );
};