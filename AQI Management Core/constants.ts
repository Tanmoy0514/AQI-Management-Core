export const CONFIG = {
    weatherApiKey: null, // Placeholder
    aqiApiKey: null,     // Placeholder
    useLiveApi: false,   // Simulation mode
    
    // Thresholds for logic
    AQI_DANGER_THRESHOLD: 300,  // If AQI is above this, pause burning regardless of wind
    WIND_SPEED_THRESHOLD: 5,    // Low wind speed traps smoke
    DELHI_BEARING_START: 135,   // Degrees (SE) - Example direction pointing to Delhi
    DELHI_BEARING_END: 225      // Degrees (SW)
};

export const CITIES = [
    { key: 'delhi', label: 'Delhi', region: 'NCT' },
    { key: 'noida', label: 'Noida', region: 'UP' },
    { key: 'gurugram', label: 'Gurugram', region: 'Haryana' },
    { key: 'ghaziabad', label: 'Ghaziabad', region: 'UP' },
    { key: 'faridabad', label: 'Faridabad', region: 'Haryana' }
];

export const TRANSIT_MULTIPLIERS: Record<string, number> = {
    metro: 0.5,
    car_ac: 0.6,
    bus_ev: 0.8,
    bike: 1.5,
    auto: 1.5,
    walk: 1.8,
    default: 1.0
};

export const SHOPPING_MULTIPLIERS: Record<string, number> = {
    online: 0.2,
    mall: 0.6,
    bazaar: 1.6,
    default: 1.0
};
