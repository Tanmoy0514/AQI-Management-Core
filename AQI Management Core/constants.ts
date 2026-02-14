import { CityData, CityKey } from './types';

// --- MOCK DATA FOR PREVIEW ---
// Preserving original data structure and values
export const MOCK_DATA: Record<CityKey, CityData> = {
    'Delhi': { aqi: 380, status: 'Severe', desc: 'Haze & Smoke', temp: '22°C' },
    'Mumbai': { aqi: 155, status: 'Moderate', desc: 'Humid Haze', temp: '29°C' },
    'Kolkata': { aqi: 210, status: 'Poor', desc: 'Mist', temp: '26°C' },
    'Gujarat': { aqi: 95, status: 'Satisfactory', desc: 'Clear Sky', temp: '32°C' }
};

export const CITIES: { key: CityKey; label: string; region: string }[] = [
    { key: 'Delhi', label: 'Delhi (NCR)', region: 'North' },
    { key: 'Mumbai', label: 'Mumbai', region: 'West' },
    { key: 'Kolkata', label: 'Kolkata', region: 'East' },
    { key: 'Gujarat', label: 'Ahmedabad (Gujarat)', region: 'West' }
];

// Multipliers for Logic
export const TRANSIT_MULTIPLIERS: Record<string, number> = {
    'auto': 3.0,
    'bike': 2.5,
    'walk': 2.0,
    'bus_ev': 1.2,
    'metro': 0.8,
    'car_ac': 0.5,
    // Default fallback
    'default': 1.0
};

export const SHOPPING_MULTIPLIERS: Record<string, number> = {
    'bazaar': 2.0,
    'mall': 0.8,
    'online': 0.1,
    // Default fallback
    'default': 1.0
};