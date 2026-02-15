import { useState, useEffect } from 'react';
import { City, AQIData, ForecastDay } from '../types';

export const useSimulation = (selectedCity: City) => {
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  useEffect(() => {
    // Simulate API fetch for current city
    const randomFluctuation = Math.floor(Math.random() * 40) - 20;
    const currentAQI = Math.max(20, selectedCity.baseAQI + randomFluctuation);
    
    setAqiData({
      aqi: currentAQI,
      pm25: currentAQI / 2.5,
      temp: 32 + (Math.random() * 4 - 2),
    });

    // Simulate 7-Day Forecast with Real Day Names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay();
    
    const next7Days = Array.from({ length: 7 }).map((_, i) => {
      const dayFluctuation = Math.floor(Math.random() * 150) - 50; 
      const dayAQI = Math.max(30, Math.min(500, selectedCity.baseAQI + dayFluctuation));
      const dayLabel = i === 0 ? 'Today' : days[(todayIndex + i) % 7];

      return {
        day: dayLabel,
        aqi: dayAQI,
      };
    });
    setForecast(next7Days);
  }, [selectedCity]);

  return { aqiData, forecast };
};