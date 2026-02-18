import { AQIData, AnalysisAdvice, MaskInfo } from './types';
import { MASK_DATA } from './constants';

// Helper to get Detailed Mask Info
export const getMaskRecommendation = (aqi: number): MaskInfo => {
    return MASK_DATA.find(m => aqi >= m.min && aqi <= m.max) || MASK_DATA[MASK_DATA.length - 1];
};

// Helper to get color based on AQI (Using Mask Data for consistency)
export const getAQIColor = (aqi: number) => {
  const maskInfo = getMaskRecommendation(aqi);
  // Extract base color name from class (e.g., bg-emerald-500 -> emerald) to build border class
  const colorName = maskInfo.colorClass.split('-')[1];
  return { 
      bg: maskInfo.colorClass, 
      text: maskInfo.textClass, 
      border: `border-${colorName}-500`, 
      label: maskInfo.status 
  };
};

// Analysis Logic
export const getRoleBasedAnalysis = (
  aqiData: AQIData | null,
  userRole: string,
  institutionName: string
): AnalysisAdvice | null => {
  if (!aqiData) return null;
  const aqi = aqiData.aqi;
  const maskInfo = getMaskRecommendation(aqi);
  
  const isSevere = aqi > 300;
  const isPoor = aqi > 200;
  const isModerate = aqi > 100;

  const baseAdvice = {
      mask: maskInfo.name,
      maskNote: maskInfo.note,
      maskLayers: maskInfo.layers,
      riskLevel: maskInfo.status,
      generalAdvice: "Stay hydrated and monitor breathing."
  };

  let roleAdvice = {
      title: "General Advisory",
      primaryAction: "Limit outdoor exposure.",
      commute: "Use public transport.",
      specific: "Keep windows closed."
  };

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
              specific: `Company Health Check: Report breathing issues to ${institutionName} HR immediately.`
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