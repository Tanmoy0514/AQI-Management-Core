import { LucideIcon } from 'lucide-react';

export interface City {
  name: string;
  lat: number;
  lon: number;
  baseAQI: number;
  state: string;
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

export interface AQIData {
  aqi: number;
  pm25: number;
  temp: number;
  humidity: number;
}

export interface ForecastDay {
  day: string;
  aqi: number;
}

export interface AnalysisAdvice {
  mask: string;
  maskNote?: string;
  maskLayers?: string;
  riskLevel: string;
  generalAdvice: string;
  title: string;
  primaryAction: string;
  commute: string;
  specific: string;
}

export interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

export interface MaskInfo {
  min: number;
  max: number;
  name: string;
  layers: string;
  note: string;
  colorClass: string;
  textClass: string;
  icon: LucideIcon;
  status: string;
}