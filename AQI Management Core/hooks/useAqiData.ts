import { useState, useEffect } from 'react';
import { City, AqiData, ForecastDay } from '../types';

export const useAqiData = (selectedCity: City) => {
  const [aqiData, setAqiData] = useState<AqiData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  useEffect(() => {
    const randomFluctuation = Math.floor(Math.random() * 40) - 20;
    const currentAQI = Math.max(20, selectedCity.baseAQI + randomFluctuation);
    
    setAqiData({
      aqi: currentAQI,
      pm25: Math.floor(currentAQI / 2.5),
      pm10: Math.floor(currentAQI / 1.8),
      o3: Math.floor(Math.random() * 50),
      no2: Math.floor(Math.random() * 40),
      temp: Math.floor(32 + (Math.random() * 4 - 2)),
      humidity: Math.floor(40 + Math.random() * 20),
      wind: Math.floor(5 + Math.random() * 10)
    });

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay();
    const next7Days = Array.from({ length: 7 }).map((_, i) => {
      const dayFluctuation = Math.floor(Math.random() * 100) - 30; 
      return {
        day: i === 0 ? 'Today' : days[(todayIndex + i) % 7],
        aqi: Math.max(30, Math.min(500, selectedCity.baseAQI + dayFluctuation)),
      };
    });
    setForecast(next7Days);
  }, [selectedCity]);

  return { aqiData, forecast };
};