import { LucideIcon } from 'lucide-react';

export interface City {
  name: string;
  lat: number;
  lon: number;
  baseAQI: number;
  state: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Role {
  id: string;
  label: string;
  icon: LucideIcon;
  contextLabel: string;
}

export interface Disease {
  id: string;
  label: string;
}

export interface Mode {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface MaskInfo {
  min: number;
  max: number;
  name: string;
  layers: string;
  note: string;
  icon: LucideIcon;
  status: string;
}

export interface AQIData {
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  temp: number;
  humidity: number;
  wind: number;
}

export interface ForecastDay {
  day: string;
  aqi: number;
}

export interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

export interface ThemeStyles {
  wrapper: string;
  card: string;
  textMuted: string;
  button: string;
  immersive: boolean;
  weatherIcon?: LucideIcon;
  accent?: string;
}