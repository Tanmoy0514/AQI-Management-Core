import { CityData, CityKey, ModeKey, ThemeConfig } from './types';

export const API_CONFIG = {
  GOOGLE_MAPS_KEY: "", 
  OPENWEATHER_KEY: "", 
  AQICN_TOKEN: ""      
};

export const CITIES: Record<CityKey, CityData> = {
  DELHI: { name: 'Delhi', aqi: 412, pm25: 380, temp: 18, humidity: 45, main: 'PM2.5', trend: 'UP' },
  KOLKATA: { name: 'Kolkata', aqi: 185, pm25: 140, temp: 26, humidity: 70, main: 'NO2', trend: 'STABLE' },
  MUMBAI: { name: 'Mumbai', aqi: 152, pm25: 85, temp: 28, humidity: 65, main: 'PM10', trend: 'DOWN' },
  AHMEDABAD: { name: 'Ahmedabad', aqi: 210, pm25: 110, temp: 32, humidity: 30, main: 'O3', trend: 'UP' },
  CHENNAI: { name: 'Chennai', aqi: 85, pm25: 40, temp: 29, humidity: 80, main: 'CO', trend: 'STABLE' }
};

export const MODES: ModeKey[] = ['USER', 'DEV', 'GOV'];

export const THEMES: Record<ModeKey, ThemeConfig> = {
  USER: {
    bg: "bg-gradient-to-br from-sky-50 via-white to-orange-50",
    text: "text-slate-800",
    cardBg: "bg-white/90 backdrop-blur-md shadow-xl border-white/50",
    cardBorder: "border-transparent",
    accent: "text-blue-600",
    highlight: "bg-blue-600 text-white",
    nav: "bg-white/80 border-b border-slate-200",
    font: "font-sans",
    button: "bg-white shadow-md hover:scale-105 text-blue-600"
  },
  DEV: {
    bg: "bg-[#0d1117]",
    text: "text-[#c9d1d9]",
    cardBg: "bg-[#161b22]",
    cardBorder: "border-[#30363d]",
    accent: "text-[#58a6ff]",
    highlight: "bg-[#238636] text-white",
    nav: "bg-[#161b22] border-b border-[#30363d]",
    font: "font-mono",
    button: "bg-[#21262d] border border-[#30363d] text-[#c9d1d9]"
  },
  GOV: {
    bg: "bg-slate-50",
    text: "text-slate-900",
    cardBg: "bg-white shadow-sm border border-slate-300",
    cardBorder: "border-slate-300",
    accent: "text-slate-900",
    highlight: "bg-slate-900 text-white",
    nav: "bg-white border-b border-slate-300 shadow-sm",
    font: "font-serif",
    button: "bg-slate-200 border border-slate-400 text-slate-900 hover:bg-slate-300"
  }
};