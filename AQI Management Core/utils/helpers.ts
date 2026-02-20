import { MASK_DATA } from '../data/constants';
import { MaskInfo } from '../types';

export const getMaskRecommendation = (aqi: number = 0): MaskInfo => {
    return MASK_DATA.find(m => aqi >= m.min && aqi <= m.max) || MASK_DATA[MASK_DATA.length - 1];
};