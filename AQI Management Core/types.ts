export interface CityData {
    aqi: number;
    status: string;
    desc: string;
    temp: string;
}

export type CityKey = 'Delhi' | 'Mumbai' | 'Kolkata' | 'Gujarat';

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