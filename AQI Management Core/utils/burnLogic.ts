import { CONFIG } from '../constants';
import { WeatherState, BurnStatus } from '../types';

export const calculateBurnStatus = (state: WeatherState): BurnStatus => {
    // 1. Determine Logic
    // Logic: Is the wind blowing towards Delhi?
    const blowingToDelhi = (state.windDeg >= CONFIG.DELHI_BEARING_START && state.windDeg <= CONFIG.DELHI_BEARING_END);
    
    // Logic: Is the air quality already terrible?
    const criticalAQI = state.aqi > CONFIG.AQI_DANGER_THRESHOLD;

    // Logic: Is the wind too slow to disperse smoke?
    const stagnantAir = state.windSpeed < CONFIG.WIND_SPEED_THRESHOLD;

    let canBurn = true;
    let reason = "Conditions are favorable for dispersion.";

    if (criticalAQI) {
        canBurn = false;
        reason = "CRITICAL: Delhi AQI is already hazardous.";
    } else if (blowingToDelhi) {
        canBurn = false;
        reason = "Wind is blowing directly towards Delhi. Burning paused.";
    } else if (stagnantAir) {
        canBurn = false;
        reason = "Wind speed too low. Smoke will not disperse.";
    }

    if (canBurn) {
        return {
            canBurn: true,
            reason: reason,
            icon: "✅",
            text: "SAFE TO BURN",
            subText: "Wind is carrying smoke away from city.",
            advice: "You may proceed. Please complete within 4 hours.",
            statusColor: "var(--primary-green)"
        };
    } else {
        return {
            canBurn: false,
            reason: reason,
            icon: "⛔",
            text: "PAUSE BURNING",
            subText: "Mini-Lockdown Active",
            advice: `${reason} Estimated Delay: 24-48 hours.`,
            statusColor: "var(--primary-red)"
        };
    }
};

export const getCardinalDirection = (deg: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const dirIndex = Math.round(deg / 45) % 8;
    return `${deg}° (${directions[dirIndex]})`;
};