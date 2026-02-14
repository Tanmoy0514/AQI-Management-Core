import { AQIData, Advisory, ThemeColors, AnalysisResult } from './types';

export const getAQIColor = (aqi: number): ThemeColors => {
  if (aqi <= 50) return { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500', label: 'Good' };
  if (aqi <= 100) return { bg: 'bg-yellow-400', text: 'text-yellow-600', border: 'border-yellow-400', label: 'Moderate' };
  if (aqi <= 200) return { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-500', label: 'Unhealthy' };
  if (aqi <= 300) return { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-500', label: 'Very Unhealthy' };
  return { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-600', label: 'Hazardous' };
};

export const generateAdvisory = (
  aqiData: AQIData | null,
  selectedConditions: string[],
  userRole: string,
  userAge: string
): Advisory | null => {
  if (!aqiData) return null;
  
  const aqi = aqiData.aqi;
  const hasRisk = selectedConditions.some(c => ['asthma', 'copd', 'heart', 'bronchitis'].includes(c));
  const isOutdoor = ['athlete', 'outdoor', 'farmer'].includes(userRole);
  const isElderly = parseInt(userAge) > 60;

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
    timeLimit = (isOutdoor && !isElderly) ? "Max 30 mins" : "Only emergencies";
    safeTime = "Early Morning (4 AM - 6 AM)";
  } else if (aqi > 100) {
    mask = (hasRisk || isElderly) ? "N95 Recommended" : "Surgical Mask";
    maskType = (hasRisk || isElderly) ? "N95" : "Surgical";
    timeLimit = isOutdoor ? "Max 2 hours" : "Limit exposure";
    safeTime = "Late Afternoon";
  }

  return { mask, maskType, timeLimit, safeTime, hasRisk, isOutdoor };
};

export const getRoleBasedAnalysis = (
  aqiData: AQIData | null,
  userRole: string,
  institutionName: string
): AnalysisResult | null => {
  if (!aqiData) return null;
  const aqi = aqiData.aqi;
  const isSevere = aqi > 300;
  const isPoor = aqi > 200;
  const isModerate = aqi > 100;

  const baseAdvice = {
      mask: isModerate ? (isSevere ? "N99/P100" : "N95") : "Cloth/Surgical",
      riskLevel: isSevere ? "Critical" : isPoor ? "High" : isModerate ? "Moderate" : "Low",
      generalAdvice: "Stay hydrated and monitor breathing."
  };

  let roleAdvice = {
      title: "General Advisory",
      primaryAction: "Limit outdoor exposure.",
      commute: "Use public transport.",
      specific: "Keep windows closed."
  };

  // Role Specific Logic
  switch(userRole) {
      case 'student':
          roleAdvice = {
              title: `Student Advisory: ${institutionName || 'School'}`,
              primaryAction: isSevere ? "Classes likely Suspended/Online." : isPoor ? "No Outdoor Sports/Assembly." : "Attend school with Mask.",
              commute: isSevere ? "Avoid School Bus if non-AC." : "Wear mask during commute.",
              specific: isSevere ? "School playground closed." : "Outdoor recess allowed for < 15 mins."
          };
          break;
      case 'farmer':
          roleAdvice = {
              title: "Agricultural Field Advisory",
              primaryAction: isSevere ? "Suspend burning/spraying. Stay indoors." : "Work only during 10 AM - 3 PM.",
              commute: "Cover face with wet cloth if mask unavailable.",
              specific: "Avoid heavy exertion in fields. Wash eyes frequently."
          };
          break;
      case 'delivery':
          roleAdvice = {
              title: `Logistics Protocol: ${institutionName || 'Company'}`,
              primaryAction: isSevere ? "Request Shift Cancellation/Hazard Pay." : "Mandatory 10-min break every hour indoors.",
              commute: "Full-face helmet + N95 Mask mandatory.",
              specific: `Company Health Check: Report breathing issues to ${institutionName || 'HR'} immediately.`
          };
          break;
      case 'office':
          roleAdvice = {
              title: "Workplace Advisory",
              primaryAction: isSevere ? "Request Work From Home (WFH)." : "Lunch breaks strictly indoors.",
              commute: "Use Metro or Car with HEPA filter. Avoid auto-rickshaws.",
              specific: "Ensure office HVAC filters are cleaned."
          };
          break;
      case 'athlete':
          roleAdvice = {
              title: "Training Advisory",
              primaryAction: isPoor ? "ALL Training Indoors only." : "Low-intensity training allowed.",
              commute: "Wear mask strictly pre/post workout.",
              specific: "Monitor heart rate. Stop if chest feels heavy."
          };
          break;
      default:
          break;
  }

  return { ...baseAdvice, ...roleAdvice };
};
