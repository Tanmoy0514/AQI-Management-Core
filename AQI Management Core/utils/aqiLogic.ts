import { AnalysisResult, UserInputs } from '../types';
import { TRANSIT_MULTIPLIERS, SHOPPING_MULTIPLIERS } from '../constants';

export const getAqiThemeClass = (aqi: number): string => {
    if (aqi <= 50) return "aqi-gradient-good";
    if (aqi <= 100) return "aqi-gradient-good"; // Satisfactory
    if (aqi <= 200) return "aqi-gradient-moderate";
    if (aqi <= 300) return "aqi-gradient-poor";
    if (aqi <= 400) return "aqi-gradient-severe";
    return "aqi-gradient-hazardous";
};

export const calculateRisk = (
    currentAQI: number,
    currentCity: string,
    inputs: UserInputs
): AnalysisResult => {
    const { hours, role, transit, shopping } = inputs;

    // Multipliers
    const transitMult = TRANSIT_MULTIPLIERS[transit] || TRANSIT_MULTIPLIERS['default'];
    const shopMult = SHOPPING_MULTIPLIERS[shopping] || SHOPPING_MULTIPLIERS['default'];

    // 3. Calculation Algo: (AQI * Hours * TransitRisk) / 100 (Original said / 50 in code)
    // Code in original: let exposureScore = (currentAQI * hours * transitMult * shopMult) / 50;
    const exposureScore = (currentAQI * hours * transitMult * shopMult) / 50;

    const finalScore = Math.min(Math.round(exposureScore), 100);

    let scoreText = "";
    let scoreClass = "";
    let cardBorderClass = "";

    if (finalScore < 15) {
        cardBorderClass = "border-green-500";
        scoreText = "Low Risk. Good to go!";
        scoreClass = "text-green-600 font-bold mt-2";
    } else if (finalScore < 40) {
        cardBorderClass = "border-yellow-500";
        scoreText = "Moderate Risk. Take precautions.";
        scoreClass = "text-yellow-600 font-bold mt-2";
    } else {
        cardBorderClass = "border-red-500";
        scoreText = "High Health Risk! Limit exposure.";
        scoreClass = "text-red-600 font-bold mt-2";
    }

    // Generate Recommendations
    const recs: string[] = [];

    // Role specific logic
    if (role === 'outdoor' && currentAQI > 200) {
        recs.push(`As an outdoor worker in ${currentCity}, wear an N95 mask constantly.`);
        recs.push(`Take breaks in indoor filtered environments every 2 hours.`);
    }
    if (role === 'student' && currentAQI > 300) {
        recs.push(`AQI is severe. Avoid outdoor sports or playground activities today.`);
    }

    // General AQI
    if (currentAQI > 150 && hours > 2) {
        recs.push(`You are spending ${hours} hours outside in poor air. Consider reducing this to <1 hour.`);
    }

    // Transit Warning Logic
    const showAutoWarning = (transit === 'auto');
    if (showAutoWarning) {
        recs.push(`Switching from Auto-Rickshaw to Metro can reduce your PM2.5 intake by 66%.`);
    }

    // Shopping Warning Logic
    const showShoppingWarning = (shopping === 'bazaar' && currentAQI > 150);
    if (showShoppingWarning) {
        recs.push(`Market areas are hotspots for dust. Order groceries online today.`);
    }

    if (recs.length === 0) {
        recs.push("Conditions are acceptable for your planned activity level.");
    }

    return {
        score: finalScore,
        scoreText,
        scoreClass,
        cardBorderClass,
        recommendations: recs,
        showAutoWarning,
        showShoppingWarning
    };
};