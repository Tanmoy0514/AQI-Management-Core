import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface City {
  name: string;
  lat: number;
  lon: number;
  baseAQI: number;
}

export interface Role {
  id: string;
  label: string;
  icon: LucideIcon;
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

export interface ForecastItem {
  day: string;
  aqi: number;
}

export interface Advisory {
  mask: string;
  maskType: string;
  timeLimit: string;
  safeTime: string;
  hasRisk: boolean;
  isOutdoor: boolean;
}

export interface ThemeColors {
  bg: string;
  text: string;
  border: string;
  label: string;
}

export interface GlitchTextProps {
  text: string;
  color?: string;
}

export interface SentinelBoxProps {
  title: string;
  icon: LucideIcon;
  mode: string;
  data: ReactNode;
  devData?: Record<string, any>;
  govData?: { actions: string[] };
  impactLevel?: string;
}

export interface AIAgentProps {
  mode: string;
  city: string;
}

export type CityKey = string;
export type CityData = City;

export interface BoxProps {
  title: string;
  icon: LucideIcon;
  mode: string;
  children?: ReactNode;
  color: string;
  devData?: Record<string, any>;
  govAction?: string;
  onDetailClick?: () => void;
  detailLabel?: string;
}

export interface ModalProps {
  onClose: () => void;
}

export type ModeKey = 'USER' | 'DEV' | 'GOV';
