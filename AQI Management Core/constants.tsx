import { 
  GraduationCap, Zap, Truck, Building, Sprout, Info,
  LayoutDashboard, Code, Building2,
  Smile, Layers, Stethoscope, Fan, Shield, Frown, ShieldAlert, HardHat
} from 'lucide-react';
import { City, Role, Disease, Mode, MaskInfo } from './types';

export const CITIES: City[] = [
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, baseAQI: 380, state: 'Delhi' },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639, baseAQI: 220, state: 'West Bengal' },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, baseAQI: 150, state: 'Maharashtra' },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707, baseAQI: 95, state: 'Tamil Nadu' },
  { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, baseAQI: 180, state: 'Gujarat' },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946, baseAQI: 85, state: 'Karnataka' },
  { name: 'Lucknow', lat: 26.8467, lon: 80.9462, baseAQI: 310, state: 'Uttar Pradesh' },
];

export const ROLES: Role[] = [
  { id: 'student', label: 'Student', icon: GraduationCap, contextLabel: 'School/University Name' },
  { id: 'athlete', label: 'Athlete', icon: Zap, contextLabel: 'Sports Club/Team' },
  { id: 'delivery', label: 'Delivery/Logistics', icon: Truck, contextLabel: 'Company Name' },
  { id: 'office', label: 'Office Worker', icon: Building, contextLabel: 'Company Name' },
  { id: 'farmer', label: 'Farmer', icon: Sprout, contextLabel: 'Region/Field Location' },
  { id: 'other', label: 'Others', icon: Info, contextLabel: 'Profession Name' },
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
  { id: 'user', label: 'User Dashboard', icon: LayoutDashboard },
  { id: 'dev', label: 'Developer Console', icon: Code },
  { id: 'gov', label: 'Government Portal', icon: Building2 },
];

// --- ADVANCED MASK DATA ---
export const MASK_DATA: MaskInfo[] = [
    { min: 0, max: 50, name: "No Mask Required", layers: "0 Layers", note: "Breathing natural air is best here; no filtration needed.", colorClass: "bg-emerald-500", textClass: "text-emerald-600", icon: Smile, status: "Good" },
    { min: 51, max: 100, name: "Cloth Mask / Handkerchief", layers: "2 – 3 Layers", note: "Good for hygiene/dust. Handkerchiefs are for emergency use only.", colorClass: "bg-yellow-400", textClass: "text-yellow-600", icon: Layers, status: "Satisfactory" },
    { min: 101, max: 150, name: "Surgical Mask (Medical)", layers: "3 Layers (SMS)", note: "Designed for fluids/germs. Loose fit leaks air.", colorClass: "bg-orange-400", textClass: "text-orange-600", icon: Stethoscope, status: "Moderate" },
    { min: 151, max: 200, name: "Activated Carbon Mask", layers: "4 Layers (+ Carbon)", note: "Ideal for traffic fumes, odors, and ozone.", colorClass: "bg-red-500", textClass: "text-red-600", icon: Fan, status: "Poor" },
    { min: 201, max: 300, name: "N95 / KN95 / FFP2", layers: "4 – 5 Layers", note: "The 'Gold Standard'. Filters 95% of particles.", colorClass: "bg-purple-600", textClass: "text-purple-600", icon: Shield, status: "Very Poor" },
    { min: 301, max: 400, name: "N95 / N99 (Valved)", layers: "4 – 5 Layers (Valved)", note: "Easier to breathe in hot weather. Not for virus control.", colorClass: "bg-rose-700", textClass: "text-rose-700", icon: Frown, status: "Severe" },
    { min: 401, max: 499, name: "N99 / FFP3 / P100", layers: "5 – 7 Layers", note: "Filters 99%+. Thicker, used in 'Airpocalypse' conditions.", colorClass: "bg-rose-900", textClass: "text-rose-900", icon: ShieldAlert, status: "Hazardous" },
    { min: 500, max: 9999, name: "Elastomeric Respirator", layers: "Replaceable Cartridges", note: "Industrial protection. Absolute maximum safety.", colorClass: "bg-black", textClass: "text-slate-900", icon: HardHat, status: "Industrial Hazardous" }
];