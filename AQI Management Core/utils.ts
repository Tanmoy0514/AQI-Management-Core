import { AQIData, Advisory, ThemeColors } from './types';

export const getAQIColor = (aqi: number): ThemeColors => {
  if (aqi <= 50) return { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500', label: 'Good' };
  if (aqi <= 100) return { bg: 'bg-yellow-400', text: 'text-yellow-600', border: 'border-yellow-400', label: 'Moderate' };
  if (aqi <= 200) return { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-500', label: 'Unhealthy' };
  if (aqi <= 300) return { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-500', label: 'Very Unhealthy' };
  return { bg: 'bg-rose-900', text: 'text-rose-900', border: 'border-rose-900', label: 'Hazardous' };
};

export const generateAdvisory = (
  aqiData: AQIData | null,
  selectedConditions: string[],
  userRole: string
): Advisory | null => {
  if (!aqiData) return null;
  
  const aqi = aqiData.aqi;
  const hasRisk = selectedConditions.some(c => ['asthma', 'copd', 'heart', 'bronchitis'].includes(c));
  const isOutdoor = ['athlete', 'outdoor', 'farmer'].includes(userRole);

  let mask = "Standard Cloth Mask";
  let maskType = "Cloth";
  let timeLimit = "Unlimited";
  let safeTime = "Any time";
  
  if (aqi > 300) {
    mask = "N99 / P100 Respirator";
    maskType = "N99";
    timeLimit = "Avoid all outdoor exposure";
    safeTime = "None - Stay Indoors";
  } else if (aqi > 200) {
    mask = "N95 Mandatory";
    maskType = "N95";
    timeLimit = isOutdoor ? "Max 30 mins" : "Only emergencies";
    safeTime = "Early Morning (4 AM - 6 AM)";
  } else if (aqi > 100) {
    mask = hasRisk ? "N95 Recommended" : "Surgical Mask";
    maskType = hasRisk ? "N95" : "Surgical";
    timeLimit = isOutdoor ? "Max 2 hours" : "Limit exposure";
    safeTime = "Late Afternoon";
  }

  return { mask, maskType, timeLimit, safeTime, hasRisk, isOutdoor };
};
