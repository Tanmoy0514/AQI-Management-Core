export interface WeatherState {
    aqi: number;
    windSpeed: number;
    windDeg: number;
}

export interface BurnStatus {
    canBurn: boolean;
    reason: string;
    icon: string;
    text: string;
    subText: string;
    advice: string;
    statusColor: string; // CSS variable or color string
}

export interface UserInputs {
    role: string;
    hours: number;
    transit: string;
    shopping: string;
}

export interface AnalysisResult {
    score: number;
    scoreText: string;
    scoreClass: string;
    cardBorderClass: string;
    recommendations: string[];
    showAutoWarning: boolean;
    showShoppingWarning: boolean;
}

export type CityKey = string;
