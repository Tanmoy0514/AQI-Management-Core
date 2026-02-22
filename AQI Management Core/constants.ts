import { 
  GraduationCap, Zap, Truck, Building, Sprout, Info, 
  LayoutDashboard, Code, Building2, Smile, Layers, 
  Stethoscope, Fan, Shield, ShieldAlert 
} from 'lucide-react';
import { City, Role, Mode, MaskData } from './types';

export const CITIES: City[] = [
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, baseAQI: 380, state: 'Delhi', trend: 'up' },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639, baseAQI: 220, state: 'West Bengal', trend: 'down' },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, baseAQI: 150, state: 'Maharashtra', trend: 'stable' },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707, baseAQI: 95, state: 'Tamil Nadu', trend: 'down' },
  { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, baseAQI: 180, state: 'Gujarat', trend: 'up' },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946, baseAQI: 85, state: 'Karnataka', trend: 'stable' },
  { name: 'Lucknow', lat: 26.8467, lon: 80.9462, baseAQI: 310, state: 'Uttar Pradesh', trend: 'up' },
  { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, baseAQI: 110, state: 'Telangana', trend: 'down' },
  { name: 'Pune', lat: 18.5204, lon: 73.8567, baseAQI: 130, state: 'Maharashtra', trend: 'up' },
];

export const ROLES: Role[] = [
  { id: 'student', label: 'Student', icon: GraduationCap, contextLabel: 'School/University Name' },
  { id: 'athlete', label: 'Athlete', icon: Zap, contextLabel: 'Sports Club/Team' },
  { id: 'delivery', label: 'Logistics', icon: Truck, contextLabel: 'Company Name' },
  { id: 'office', label: 'Office', icon: Building, contextLabel: 'Company Name' },
  { id: 'farmer', label: 'Farmer', icon: Sprout, contextLabel: 'Region/Field Location' },
  { id: 'other', label: 'Others', icon: Info, contextLabel: 'Profession Name' },
];

export const MODES: Mode[] = [
  { id: 'user', label: 'User Dashboard', icon: LayoutDashboard },
  { id: 'dev', label: 'Developer Console', icon: Code },
  { id: 'gov', label: 'Government Portal', icon: Building2 },
];

export const MASK_DATA: MaskData[] = [
    { min: 0, max: 50, name: "No Mask Needed", layers: "0 Layers", note: "Enjoy the fresh air.", icon: Smile, status: "Good" },
    { min: 51, max: 100, name: "Cloth Mask", layers: "2-3 Layers", note: "Optional for sensitive groups.", icon: Layers, status: "Moderate" },
    { min: 101, max: 150, name: "Surgical Mask", layers: "3 Layers", note: "Recommended for sensitive groups.", icon: Stethoscope, status: "Unhealthy for Sensitive" },
    { min: 151, max: 200, name: "N95 / KN95", layers: "4 Layers", note: "Recommended for everyone outdoors.", icon: Fan, status: "Unhealthy" },
    { min: 201, max: 300, name: "N95 / FFP2", layers: "5 Layers", note: "Avoid outdoor exertion.", icon: Shield, status: "Very Unhealthy" },
    { min: 301, max: 9999, name: "N99 / P100", layers: "5+ Layers", note: "Emergency conditions. Stay indoors.", icon: ShieldAlert, status: "Hazardous" }
];