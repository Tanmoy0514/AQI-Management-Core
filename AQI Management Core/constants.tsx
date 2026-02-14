import { User, Terminal, Building2 } from 'lucide-react';
import { CityData, ModeConfig, CityKey, ModeKey } from './types';

export const CITIES: Record<CityKey, CityData> = {
  DELHI: { name: 'Delhi', aqi: 420, pm25: 380, temp: 18, humidity: 45, mainPollutant: 'PM2.5' },
  KOLKATA: { name: 'Kolkata', aqi: 180, pm25: 140, temp: 26, humidity: 70, mainPollutant: 'NO2' },
  MUMBAI: { name: 'Mumbai', aqi: 150, pm25: 85, temp: 28, humidity: 65, mainPollutant: 'PM10' },
  AHMEDABAD: { name: 'Ahmedabad', aqi: 210, pm25: 110, temp: 32, humidity: 30, mainPollutant: 'O3' },
  CHENNAI: { name: 'Chennai', aqi: 85, pm25: 40, temp: 29, humidity: 80, mainPollutant: 'CO' }
};

export const MODES: Record<ModeKey, ModeConfig> = {
  USER: { color: 'cyan', label: 'Citizen View', icon: User },
  DEV: { color: 'green', label: 'Dev Console', icon: Terminal },
  GOV: { color: 'red', label: 'Command Center', icon: Building2 }
};
