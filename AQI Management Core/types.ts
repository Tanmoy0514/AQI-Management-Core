import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface CityData {
  name: string;
  aqi: number;
  pm25: number;
  temp: number;
  humidity: number;
  main: string;
  trend: string;
}

export type CityKey = 'DELHI' | 'KOLKATA' | 'MUMBAI' | 'AHMEDABAD' | 'CHENNAI';

export interface ThemeConfig {
  bg: string;
  text: string;
  cardBg: string;
  cardBorder: string;
  accent: string;
  highlight: string;
  nav: string;
  font: string;
  button: string;
}

export type ModeKey = 'USER' | 'DEV' | 'GOV';

export interface BoxProps {
  title: string;
  icon: LucideIcon;
  mode: ModeKey;
  children: ReactNode;
  color: string;
  devData?: Record<string, string | number | string[]>;
  govAction?: string;
  onDetailClick?: () => void;
  detailLabel?: string;
}

export interface ModalProps {
  onClose: () => void;
}

export interface GlitchTextProps {
  text: string;
  color?: string;
}

export interface SentinelBoxProps {
  title: string;
  icon: LucideIcon;
  mode: ModeKey;
  data: ReactNode;
  devData?: Record<string, string | number | string[]>;
  govData?: { actions: string[] };
  impactLevel?: 'HIGH' | 'MED' | 'LOW';
}

export interface AIAgentProps {
  mode: ModeKey;
  city: string;
}