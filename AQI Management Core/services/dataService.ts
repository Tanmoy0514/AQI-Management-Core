import { CITIES } from '../constants';
import { CityKey, CityData } from '../types';

export const fetchAirData = async (city: string): Promise<CityData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // @ts-ignore
      resolve(CITIES[city] || CITIES['DELHI']);
    }, 600); 
  });
};
