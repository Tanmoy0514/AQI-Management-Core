import { 
  GraduationCap, Zap, Truck, Building, Sprout, Info,
  LayoutDashboard, Terminal, Building2 
} from 'lucide-react';
import { City, Role, Disease, Mode } from './types';

// Updated City List (5 Cities, no state)
export const CITIES: City[] = [
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, baseAQI: 380 },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639, baseAQI: 220 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, baseAQI: 150 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707, baseAQI: 95 },
  { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, baseAQI: 180 },
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

// Updated Modes (Dev uses Terminal icon)
export const MODES: Mode[] = [
  { id: 'user', label: 'User Dashboard', icon: LayoutDashboard },
  { id: 'dev', label: 'Developer Console', icon: Terminal },
  { id: 'gov', label: 'Government Portal', icon: Building2 },
];