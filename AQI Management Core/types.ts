import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface CityData {
  name: string;
  aqi: number;
  pm25: number;
  temp: number;
  humidity: number;
  mainPollutant: string;
}

export type CityKey = 'DELHI' | 'KOLKATA' | 'MUMBAI' | 'AHMEDABAD' | 'CHENNAI';

export interface ModeConfig {
  color: string;
  label: string;
  icon: LucideIcon;
}

export type ModeKey = 'USER' | 'DEV' | 'GOV';

export interface SentinelBoxProps {
  title: string;
  icon: LucideIcon;
  mode: ModeKey;
  data: ReactNode;
  devData?: Record<string, string | number>;
  govData?: {
    actions: string[];
  };
  impactLevel?: 'HIGH' | 'MED' | 'LOW';
}

export interface GlitchTextProps {
  text: string;
  color?: string;
}

export interface AIAgentProps {
  mode: ModeKey;
  city: string;
}
