import { Sun, Cloud, CloudLightning, ShieldAlert } from 'lucide-react';
import { MASK_DATA } from './constants';
import { MaskData, AqiData, ThemeStyles, Recommendations } from './types';

export const getMaskRecommendation = (aqi: number): MaskData => {
  return MASK_DATA.find(m => aqi >= m.min && aqi <= m.max) || MASK_DATA[MASK_DATA.length - 1];
};

export const getRecs = (aqiData: AqiData | null): Recommendations => {
    if (!aqiData) return {} as Recommendations;
    const aqi = aqiData.aqi;
    return {
        sport: aqi > 150 ? { allowed: false, text: "No Outdoor Sports" } : { allowed: true, text: "Outdoor Sports OK" },
        window: aqi > 200 ? { allowed: false, text: "Close Windows" } : { allowed: true, text: "Ventilation OK" },
        mask: aqi > 100 ? { allowed: true, text: "Mask Required" } : { allowed: false, text: "No Mask Needed" },
        purifier: aqi > 150 ? { allowed: true, text: "Use Purifier" } : { allowed: false, text: "Purifier Optional" },
    };
};

export const getThemeStyles = (
  currentView: string,
  currentMode: string,
  darkMode: boolean,
  aqiData: AqiData | null
): ThemeStyles => {
    // Default App Theme (Input Mode)
    if (currentView === 'input' || currentMode !== 'user') {
      return {
        wrapper: darkMode ? 'bg-neutral-950 text-white' : 'bg-slate-50 text-slate-900',
        card: darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200 shadow-sm',
        textMuted: darkMode ? 'text-neutral-400' : 'text-slate-500',
        button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'
      };
    }

    // Immersive Report Theme (Based on AQI)
    const aqi = aqiData?.aqi || 0;
    let gradient = '';
    let icon = Sun;
    let accent = '';

    if (aqi <= 50) { // Good
        gradient = 'bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600';
        icon = Sun;
        accent = 'bg-cyan-500';
    } else if (aqi <= 100) { // Moderate
        gradient = 'bg-gradient-to-br from-blue-500 via-indigo-400 to-amber-300';
        icon = Cloud;
        accent = 'bg-amber-400';
    } else if (aqi <= 200) { // Poor
        gradient = 'bg-gradient-to-br from-orange-400 via-amber-500 to-slate-500';
        icon = CloudLightning;
        accent = 'bg-orange-500';
    } else { // Hazardous
        gradient = 'bg-gradient-to-br from-purple-700 via-rose-600 to-orange-500';
        icon = ShieldAlert;
        accent = 'bg-rose-500';
    }

    return {
        wrapper: `${gradient} text-white selection:bg-white/30`,
        card: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white',
        textMuted: 'text-white/70',
        button: 'bg-white/20 hover:bg-white/30 text-white border border-white/30',
        immersive: true,
        weatherIcon: icon
    };
};