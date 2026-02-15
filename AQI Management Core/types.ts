import { LucideIcon } from 'lucide-react';

export interface City {
  name: string;
  lat: number;
  lon: number;
  baseAQI: number;
  state?: string; // Made optional as provided source removed state data
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
}

export interface ForecastDay {
  day: string;
  aqi: number;
}

export interface AnalysisAdvice {
  mask: string;
  riskLevel: string;
  generalAdvice: string;
  title: string;
  primaryAction: string;
  commute: string;
  specific: string;
}