import React, { useState, useEffect } from 'react';
import { 
  Wind, Shield, Briefcase, ShoppingBag, Home, 
  School, Activity, Eye, MapPin, Stethoscope, 
  Skull, Cigarette 
} from 'lucide-react';
import SentinelBox from './components/SentinelBox';
import GlitchText from './components/GlitchText';
import AIAgent from './components/AIAgent';
import { CITIES, MODES } from './constants';
import { CityKey, ModeKey } from './types';

export default function AirSentinelDashboard() {
  const [mode, setMode] = useState<ModeKey>('USER');
  const [selectedCity, setSelectedCity] = useState<CityKey>('DELHI');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const cityData = CITIES[selectedCity];
  const aqiLevel = cityData.aqi > 300 ? 'HAZARDOUS' : cityData.aqi > 200 ? 'VERY POOR' : cityData.aqi > 100 ? 'MODERATE' : 'GOOD';
  
  // Dynamic Calculations based on AQI
  const cigarettes = (cityData.aqi / 22).toFixed(1);
  const lifeLost = Math.floor(cityData.aqi * 0.12); // Minutes per day lost
  
  if (!mounted) return <div className="bg-black h-screen w-screen text-white flex items-center justify-center">Initializing Sentinel OS...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden pb-[320px] md:pb-0">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 h-16 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Shield className="text-cyan-400 animate-pulse" size={24} />
          <h1 className="text-lg md:text-xl font-black tracking-widest text-white">
            AIR<span className="text-cyan-400">SENTINEL</span>
          </h1>
        </div>

        {/* City Selector */}
        <div className="hidden md:flex bg-slate-800 rounded-lg p-1 gap-1">
          {Object.keys(CITIES).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city as CityKey)}
              className={`px-3 py-1 text-xs font-bold rounded transition-all ${selectedCity === city ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Mode Toggle (The "Konami Code" Switch) */}
        <div className="flex gap-2">
          {(Object.keys(MODES) as ModeKey[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                mode === m 
                  ? `bg-${MODES[m].color}-500/20 border-${MODES[m].color}-500 text-${MODES[m].color}-400 shadow-[0_0_10px_rgba(0,0,0,0.5)]` 
                  : 'border-transparent text-slate-600 hover:text-slate-300'
              }`}
              title={MODES[m].label}
            >
              {React.createElement(MODES[m].icon, { size: 18 })}
            </button>
          ))}
        </div>
      </nav>

      {/* SUB-HEADER (Mobile City Selector) */}
      <div className="md:hidden pt-20 px-4">
        <select 
          value={selectedCity} 
          onChange={(e) => setSelectedCity(e.target.value as CityKey)}
          className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700 outline-none"
        >
          {Object.keys(CITIES).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* MAIN CONTENT GRID - 10 Boxes */}
      <main className="pt-24 md:pt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* BOX 1: MAIN AQI (Double Width) */}
          <div className="col-span-1 md:col-span-2 row-span-2">
            <SentinelBox
              title="Real-Time Atmosphere"
              icon={Wind}
              mode={mode}
              impactLevel={aqiLevel === 'HAZARDOUS' ? 'HIGH' : 'MED'}
              data={
                <div className="flex flex-col items-center justify-center h-full gap-4">
                   <div className="relative">
                      <div className={`w-40 h-40 rounded-full border-4 flex items-center justify-center relative ${cityData.aqi > 300 ? 'border-red-500 bg-red-500/10' : 'border-yellow-500 bg-yellow-500/10'}`}>
                        <div className="text-center">
                          <span className="text-5xl font-black text-white">{cityData.aqi}</span>
                          <p className="text-xs uppercase tracking-widest mt-1 text-slate-400">US AQI</p>
                        </div>
                        {/* Pulse Ring */}
                        <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${cityData.aqi > 300 ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                      </div>
                   </div>
                   <div className="text-center">
                     <GlitchText text={aqiLevel} color={cityData.aqi > 300 ? 'text-red-500' : 'text-yellow-400'} />
                     <p className="text-xs text-slate-400 mt-2 max-w-md">Primary Pollutant: <span className="text-white font-bold">{cityData.mainPollutant}</span>. {cityData.aqi > 300 ? 'Air is toxic. Immediate health risk.' : 'Air is unhealthy for sensitive groups.'}</p>
                   </div>
                </div>
              }
              devData={{ "sensor_id": "DL-0492", "pm25_raw": cityData.pm25, "calibrated": "true", "uptime": "99.9%" }}
              govData={{ actions: ["Declare Public Emergency", "Send SMS Alert (All Citizens)", "Trigger Sirens"] }}
            />
          </div>

          {/* BOX 2: MASK PROTOCOL */}
          <SentinelBox
            title="Defense Protocol: Masks"
            icon={Shield}
            mode={mode}
            data={
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`p-3 rounded-full ${cityData.aqi > 200 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {cityData.aqi > 200 ? <Skull size={32} /> : <Shield size={32} />}
                </div>
                <h4 className="text-lg font-bold text-white">{cityData.aqi > 200 ? 'N95 MANDATORY' : 'Cloth Mask OK'}</h4>
                <p className="text-xs text-slate-400">Surgical masks are <span className="text-red-400">Ineffective</span> against current PM2.5 levels.</p>
              </div>
            }
            devData={{ "rec_engine": "v2.1", "stock_check": "API_DOWN", "compliance_rate": "12%" }}
            govData={{ actions: ["Subsidize N95 Distribution", "Fine Non-Compliance (₹2000)"] }}
          />

          {/* BOX 3: COMMUTE */}
          <SentinelBox
            title="Commute Logic"
            icon={Briefcase}
            mode={mode}
            data={
              <div className="space-y-3">
                 <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                    <span className="text-xs text-slate-300">Metro/Train</span>
                    <span className="text-xs font-bold text-green-400">RECOMMENDED</span>
                 </div>
                 <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded opacity-50">
                    <span className="text-xs text-slate-300">Car (Windows Down)</span>
                    <span className="text-xs font-bold text-red-500">LETHAL</span>
                 </div>
                 <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded opacity-50">
                    <span className="text-xs text-slate-300">Bike/Walk</span>
                    <span className="text-xs font-bold text-red-500">AVOID</span>
                 </div>
              </div>
            }
            devData={{ "traffic_api": "gmaps_v3", "congestion": "High", "avg_speed": "12km/h" }}
            govData={{ actions: ["Enforce Odd-Even Rule", "Ban Diesel Vehicles (>10yr)"] }}
          />

          {/* BOX 4: OUTDOOR WINDOW */}
          <SentinelBox
            title="Outdoor Window"
            icon={ShoppingBag}
            mode={mode}
            data={
              <div className="text-center">
                <div className="text-xs text-slate-400 mb-2">Safest time to step out:</div>
                <div className="text-2xl font-mono text-cyan-400">14:00 - 16:00</div>
                <div className="mt-2 h-1 w-full bg-slate-800 rounded overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 w-full"></div>
                </div>
                <div className="flex justify-between text-[8px] text-slate-500 mt-1 uppercase">
                  <span>Morning (Toxic)</span>
                  <span>Afternoon (Poor)</span>
                  <span>Night (Hazard)</span>
                </div>
              </div>
            }
            devData={{ "forecast_model": "WRF-Chem", "confidence": "88%", "wind_vector": "NW" }}
            govData={{ actions: ["Close Markets (Post 6PM)", "Suspend Outdoor Construction"] }}
          />

          {/* BOX 5: VENTILATION */}
          <SentinelBox
            title="Home Ventilation"
            icon={Home}
            mode={mode}
            data={
              <div className="flex items-center gap-4">
                 <div className={`p-4 rounded-lg border-2 ${cityData.aqi > 150 ? 'border-red-500 text-red-500 bg-red-900/10' : 'border-green-500 text-green-500'}`}>
                    {cityData.aqi > 150 ? "CLOSE" : "OPEN"}
                 </div>
                 <div className="text-xs text-slate-300">
                    {cityData.aqi > 150 
                      ? "Keep windows sealed. Use purifier on 'High'. Indoor CO2 is safer than outdoor PM2.5."
                      : "Open windows for 30 mins to flush CO2."}
                 </div>
              </div>
            }
            devData={{ "indoor_sensor": "offline", "ext_temp": cityData.temp, "calc_method": "diff_pressure" }}
            govData={{ actions: ["Subsidize HEPA Filters", "Mandate Office Air Scrubbers"] }}
          />

          {/* BOX 6: SCHOOL/KIDS */}
          <SentinelBox
            title="School & Play"
            icon={School}
            mode={mode}
            impactLevel="HIGH"
            data={
              <div className="text-center space-y-2">
                 <div className="text-4xl">🚫 ⚽</div>
                 <h4 className="font-bold text-red-400">NO OUTDOOR PLAY</h4>
                 <p className="text-xs text-slate-400">Children's lung capacity reduces by <span className="text-white">5%</span> permanently with chronic exposure at this level.</p>
              </div>
            }
            devData={{ "pediatric_risk_index": "0.89", "school_api": "connected" }}
            govData={{ actions: ["Order School Closure", "Online Classes Mandate"] }}
          />

          {/* BOX 7: THE BIO-IMPACT (THE SHOCK FACTOR) */}
          <SentinelBox
            title="Bio-Impact Tracker"
            icon={Cigarette}
            mode={mode}
            impactLevel="HIGH"
            data={
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <Skull className="text-slate-500" size={20} />
                    <div>
                      <div className="text-xs text-slate-400">Equivalent to Smoking:</div>
                      <div className="text-xl font-bold text-orange-400">{cigarettes} Cigarettes <span className="text-xs text-slate-500">/ day</span></div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <Activity className="text-slate-500" size={20} />
                    <div>
                      <div className="text-xs text-slate-400">Life Expectancy Lost:</div>
                      <div className="text-xl font-bold text-red-500 animate-pulse">{lifeLost} Minutes <span className="text-xs text-slate-500">/ day</span></div>
                    </div>
                 </div>
                 <p className="text-[10px] text-slate-600 italic border-t border-slate-800 pt-1 mt-1">Based on Berkley Earth methodology.</p>
              </div>
            }
            devData={{ "conversion_factor": "22ug=1cig", "mortality_rate": "+4.2%" }}
            govData={{ actions: ["Release Health Advisory", "Activate Hospital Respiratory Wards"] }}
          />

           {/* BOX 8: VISIBILITY */}
           <SentinelBox
            title="Visibility & Drive"
            icon={Eye}
            mode={mode}
            data={
              <div className="flex justify-between items-end h-full">
                <div className="flex flex-col">
                   <span className="text-3xl font-bold text-slate-200">{cityData.humidity > 60 && cityData.aqi > 200 ? '200m' : '1.2km'}</span>
                   <span className="text-xs text-slate-500">Visual Range</span>
                </div>
                <div className="text-right">
                   <div className={`px-2 py-1 rounded text-xs font-bold ${cityData.humidity > 60 && cityData.aqi > 200 ? 'bg-yellow-500 text-black' : 'bg-green-900 text-green-400'}`}>
                     {cityData.humidity > 60 && cityData.aqi > 200 ? 'DENSE SMOG' : 'CLEAR'}
                   </div>
                   <div className="text-[10px] text-slate-400 mt-1">Headlights: ON</div>
                </div>
              </div>
            }
            devData={{ "fog_sensor": "IR_scatter", "hygrometer": `${cityData.humidity}%` }}
            govData={{ actions: ["Reduce Highway Speed Limit", "Deploy Traffic Marshals"] }}
          />

          {/* BOX 9: OXYGEN OASIS */}
          <SentinelBox
            title="Nearest Oxygen Zone"
            icon={MapPin}
            mode={mode}
            data={
              <div className="space-y-2">
                 <div className="flex items-center gap-3 bg-slate-800/30 p-2 rounded border border-green-500/20">
                    <div className="w-8 h-8 rounded bg-green-900/50 flex items-center justify-center text-green-400 font-bold">1</div>
                    <div>
                       <div className="text-xs font-bold text-slate-200">DLF Mall (Atrium)</div>
                       <div className="text-[10px] text-green-400">AQI: 45 (HEPA Active)</div>
                    </div>
                    <div className="ml-auto text-xs text-slate-500">0.8km</div>
                 </div>
                 <div className="flex items-center gap-3 bg-slate-800/30 p-2 rounded border border-green-500/20">
                    <div className="w-8 h-8 rounded bg-green-900/50 flex items-center justify-center text-green-400 font-bold">2</div>
                    <div>
                       <div className="text-xs font-bold text-slate-200">City Forest Park</div>
                       <div className="text-[10px] text-yellow-400">AQI: 180 (Trees)</div>
                    </div>
                    <div className="ml-auto text-xs text-slate-500">2.1km</div>
                 </div>
              </div>
            }
            devData={{ "places_api": "active", "filter": "type=mall|park" }}
            govData={{ actions: ["Mandate Mall Open Access", "Setup Portable O2 Shelters"] }}
          />

          {/* BOX 10: SYMPTOM CHECKER */}
          <SentinelBox
            title="Symptom Check"
            icon={Stethoscope}
            mode={mode}
            data={
              <div className="grid grid-cols-2 gap-2">
                 <div className="bg-slate-800 p-2 rounded text-center">
                    <span className="block text-xl">👀</span>
                    <span className="text-[10px] text-slate-400">Burning Eyes</span>
                    <span className="block text-xs text-red-400 font-bold mt-1">NO2 High</span>
                 </div>
                 <div className="bg-slate-800 p-2 rounded text-center">
                    <span className="block text-xl">😮‍💨</span>
                    <span className="block text-[10px] text-slate-400">Wheezing</span>
                    <span className="block text-xs text-red-400 font-bold mt-1">PM2.5 High</span>
                 </div>
                 <div className="col-span-2 text-[10px] text-slate-500 text-center mt-1">
                    *Not medical advice. Visit a Pulmonologist if persistent.
                 </div>
              </div>
            }
            devData={{ "health_db": "ICMR_guidelines", "symptom_match": "89%" }}
            govData={{ actions: ["Alert Hospitals", "Release Tele-Medicine Numbers"] }}
          />

        </div>
      </main>

      {/* AI AGENT (Sticky) */}
      <div className="md:block hidden">
        <AIAgent mode={mode} city={selectedCity} />
      </div>
    </div>
  );
}