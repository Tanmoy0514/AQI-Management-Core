import { GraduationCap, Zap, User, Briefcase, Sun, Info, Terminal, Building2 } from 'lucide-react';
import { City, Role, Disease, Mode } from './types';

export const CITIES: City[] = [
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, baseAQI: 380 },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639, baseAQI: 220 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, baseAQI: 150 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707, baseAQI: 95 },
  { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, baseAQI: 180 },
];

export const ROLES: Role[] = [
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'athlete', label: 'Athlete/Runner', icon: Zap },
  { id: 'outdoor', label: 'Outdoor Worker', icon: User },
  { id: 'office', label: 'Office Worker', icon: Briefcase },
  { id: 'farmer', label: 'Farmer', icon: Sun },
  { id: 'other', label: 'Others', icon: Info },
];

export const DISEASES: Disease[] = [
  { id: 'none', label: 'None / Healthy' },
  { id: 'asthma', label: 'Asthma' },
  { id: 'copd', label: 'COPD (Lung Disease)' },
  { id: 'bronchitis', label: 'Chronic Bronchitis' },
  { id: 'heart', label: 'Heart Disease' },
  { id: 'allergies', label: 'Seasonal Allergies' },
];

export const MODES: Mode[] = [
  { id: 'user', label: 'User View', icon: User },
  { id: 'dev', label: 'Developer View', icon: Terminal },
  { id: 'gov', label: 'Government View', icon: Building2 },
];

export const THEMES: Record<string, { cardBg: string; cardBorder: string; font: string; accent: string }> = {
  USER: { cardBg: 'bg-white', cardBorder: 'border-slate-100', font: 'font-sans', accent: 'text-blue-500' },
  DEV: { cardBg: 'bg-[#0d1117]', cardBorder: 'border-green-900', font: 'font-mono', accent: 'text-green-500' },
  GOV: { cardBg: 'bg-slate-50', cardBorder: 'border-red-200', font: 'font-serif', accent: 'text-red-600' }
};
