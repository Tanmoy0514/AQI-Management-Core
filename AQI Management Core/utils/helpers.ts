import { MASK_DATA } from '../data/constants';
import { MaskInfo } from '../types';

export const getMaskRecommendation = (aqi: number = 0): MaskInfo => {
    return MASK_DATA.find(m => aqi >= m.min && aqi <= m.max) || MASK_DATA[MASK_DATA.length - 1];
};

export const getAQIColor = (aqi: number) => {
    // Basic helper for legacy components if needed, though App.tsx handles theme
    if (aqi <= 50) return { text: 'text-green-500', bg: 'bg-green-500' };
    if (aqi <= 100) return { text: 'text-yellow-500', bg: 'bg-yellow-500' };
    if (aqi <= 200) return { text: 'text-orange-500', bg: 'bg-orange-500' };
    if (aqi <= 300) return { text: 'text-red-500', bg: 'bg-red-500' };
    return { text: 'text-purple-500', bg: 'bg-purple-500' };
};