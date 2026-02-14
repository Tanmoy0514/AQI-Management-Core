import React, { useState, useEffect } from 'react';
import { 
  Wind, Shield, Briefcase, ShoppingBag, Home, 
  School, Eye, MapPin, Stethoscope, 
  Cigarette, Skull, Users, TrendingUp 
} from 'lucide-react';
import Box from './components/Box';
import ChatWidget from './components/ChatWidget';
import MaskAdvisorModal from './components/modals/MaskAdvisorModal';
import PollutionBudgetModal from './components/modals/PollutionBudgetModal';
import SchoolSafetyModal from './components/modals/SchoolSafetyModal';
import VisibilityDriveModal from './components/modals/VisibilityDriveModal';
import CommunityReportModal from './components/modals/CommunityReportModal';
import OutdoorActivityModal from './components/modals/OutdoorActivityModal';

import { CITIES, THEMES, MODES } from './constants';
import { CityKey, ModeKey, CityData } from './types';
import { fetchAirData } from './services/dataService';

export default function AirSentinelPro() {
  const [mode, setMode] = useState<ModeKey>('USER');
  const [city, setCity] = useState<CityKey>('DELHI');
  const [data, setData] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal State Manager
  const [activeModal, setActiveModal] = useState<string | null>(null); 

  const theme = THEMES[mode];

  useEffect(() => {
    setLoading(true);
    fetchAirData(city).then(res => {
      setData(res);
      setLoading(false);
    });
  }, [city]);

  if (loading || !data) return <div className="h-screen w-full flex items-center justify-center bg-white text-slate-500">Initializing Sentinel Core...</div>;

  const aqiColor = data.aqi > 300 ? 'text-red-600' : data.aqi > 200 ? 'text-orange-500' : 'text-green-600';
  const aqiBorder = data.aqi > 300 ? 'border-red-500' : data.aqi > 200 ? 'border-orange-500' : 'border-green-500';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} ${theme.font} pb-20`}>
      
      {/* --- RENDER ACTIVE MODAL --- */}
      {activeModal === 'MASK' && <MaskAdvisorModal initialAqi={data.aqi} onClose={() => setActiveModal(null)} />}
      {activeModal === 'BUDGET' && <PollutionBudgetModal aqi={data.aqi} pm25={data.pm25} onClose={() => setActiveModal(null)} />}
      {activeModal === 'SCHOOL' && <SchoolSafetyModal aqi={data.aqi} onClose={() => setActiveModal(null)} />}
      {activeModal === 'DRIVE' && <VisibilityDriveModal aqi={data.aqi} onClose={() => setActiveModal(null)} />}
      {activeModal === 'COMMUNITY' && <CommunityReportModal city={city} onClose={() => setActiveModal(null)} />}
      {activeModal === 'OUTDOOR' && <OutdoorActivityModal onClose={() => setActiveModal(null)} />}

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-40 h-16 flex items-center justify-between px-4 md:px-8 backdrop-blur-md ${theme.nav}`}>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${mode === 'USER' ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white' : theme.highlight}`}>
            <Shield size={20} />
          </div>
          <h1 className="text-lg font-bold tracking-tight">
            Air<span className={mode === 'USER' ? 'text-blue-600' : ''}>Sentinel</span>
          </h1>
        </div>
        <div className="hidden md:flex bg-black/5 rounded-lg p-1 gap-1">
          {Object.keys(CITIES).map((c) => (
            <button key={c} onClick={() => setCity(c as CityKey)} className={`px-3 py-1 text-xs font-bold rounded transition-all ${city === c ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}>{CITIES[c as CityKey].name}</button>
          ))}
        </div>
        <div className="flex gap-2">
          {['USER', 'DEV', 'GOV'].map(m => (
            <button key={m} onClick={() => setMode(m as ModeKey)} className={`text-[10px] font-bold px-3 py-1 rounded border transition-all ${mode === m ? (m === 'USER' ? 'bg-blue-100 border-blue-300 text-blue-700' : m === 'DEV' ? 'bg-gray-800 border-gray-600 text-green-400' : 'bg-slate-200 border-slate-400 text-slate-900') : 'border-transparent opacity-50 hover:opacity-100'}`}>{m}</button>
          ))}
        </div>
      </nav>

      {/* DASHBOARD GRID */}
      <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
          
          {/* 1. HERO AQI */}
          <div className="col-span-1 sm:col-span-2 row-span-2">
            <Box title="Current Atmosphere" icon={Wind} mode={mode} color={aqiBorder} devData={{ aqi: data.aqi, pm25: data.pm25, sensor: "ONLINE" }} govAction="Broadcast Emergency Alert">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className={`text-6xl font-black mb-2 ${aqiColor}`}>{data.aqi}</div>
                <div className="text-sm font-bold bg-black/5 px-3 py-1 rounded-full uppercase tracking-wider mb-4">{data.aqi > 300 ? 'Hazardous' : data.aqi > 100 ? 'Unhealthy' : 'Good'}</div>
                <div className="grid grid-cols-3 gap-4 w-full px-8 text-center">
                  <div><div className="text-xs opacity-50">PM2.5</div><div className="font-bold">{data.pm25}</div></div>
                  <div><div className="text-xs opacity-50">Temp</div><div className="font-bold">{data.temp}°C</div></div>
                  <div><div className="text-xs opacity-50">Humidity</div><div className="font-bold">{data.humidity}%</div></div>
                </div>
              </div>
            </Box>
          </div>

          {/* 2. MASK RECOMMENDATION */}
          <Box title="Mask Protocol" icon={Shield} mode={mode} color="border-purple-500" devData={{ mask_id: "N95", efficiency: "95%" }} govAction="Subsidize N95 Supply" onDetailClick={() => setActiveModal('MASK')} detailLabel="Mask Guide">
            <div className="text-center">
              <div className="text-4xl mb-2">{data.aqi > 150 ? '😷' : '😊'}</div>
              <div className="font-bold text-lg">{data.aqi > 150 ? 'N95 Required' : 'No Mask Needed'}</div>
              <div className="text-xs opacity-60 mt-1">Cloth masks are ineffective today.</div>
            </div>
          </Box>

          {/* 3. COMMUTE */}
          <Box title="Activity & Commute" icon={Briefcase} mode={mode} color="border-blue-500" devData={{ route: "metro_line_3", congestion: "high" }} govAction="Trigger Odd-Even Rule" onDetailClick={() => setActiveModal('BUDGET')} detailLabel="Plan My Day">
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-green-100/50 rounded text-green-800 text-xs font-bold"><span>🚇 Metro</span> <span>Safe</span></div>
              <div className="flex justify-between p-2 bg-red-100/50 rounded text-red-800 text-xs font-bold"><span>🏍️ Bike</span> <span>Avoid</span></div>
            </div>
          </Box>

          {/* 4. OUTDOOR TIMER */}
          <Box title="Outdoor Window" icon={ShoppingBag} mode={mode} color="border-yellow-500" devData={{ safe_window_start: "1400", safe_window_end: "1600" }} govAction="Close Public Parks" onDetailClick={() => setActiveModal('OUTDOOR')} detailLabel="See Timeline">
            <div className="text-center">
               <div className="text-xs opacity-50">Best time to step out</div>
               <div className="text-2xl font-mono font-bold text-blue-600 mt-1">14:00 - 16:00</div>
               <div className="text-[10px] mt-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded inline-block">Sunlight breaks down smog</div>
            </div>
          </Box>

          {/* 5. VENTILATION */}
          <Box title="Home Air" icon={Home} mode={mode} color="border-green-500" devData={{ indoor_co2: "450ppm", recommendation: "close" }} govAction="Issue HVAC Guidelines">
             <div className="flex items-center gap-4">
               <div className={`p-3 rounded font-bold text-white ${data.aqi > 200 ? 'bg-red-500' : 'bg-green-500'}`}>{data.aqi > 200 ? 'CLOSE' : 'OPEN'}</div>
               <div className="text-xs leading-tight">{data.aqi > 200 ? 'Keep windows sealed. Use purifiers.' : 'Ventilate for 30 mins.'}</div>
             </div>
          </Box>

          {/* 6. SCHOOL STATUS */}
          <Box title="Kids & School" icon={School} mode={mode} color="border-pink-500" devData={{ status: "online", grade_impact: "high" }} govAction="Mandate Online Classes" onDetailClick={() => setActiveModal('SCHOOL')} detailLabel="Child Safety">
             <div className="flex flex-col items-center">
                <div className={`text-lg font-bold ${data.aqi > 250 ? 'text-red-600' : 'text-green-600'}`}>{data.aqi > 250 ? 'INDOOR RECESS' : 'OUTDOOR OK'}</div>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden"><div className={`h-full ${data.aqi > 250 ? 'bg-red-500 w-[90%]' : 'bg-green-500 w-[20%]'}`}></div></div>
             </div>
          </Box>

          {/* 7. VISIBILITY */}
          <Box title="Road Visibility" icon={Eye} mode={mode} color="border-gray-500" devData={{ vis_meters: "1200", fog: "false" }} govAction="Highway Speed Limits" onDetailClick={() => setActiveModal('DRIVE')} detailLabel="Driver Mode">
             <div className="text-center">
                <div className="text-3xl font-bold">1.2 km</div>
                <div className="text-xs text-gray-500">Safe for driving</div>
             </div>
          </Box>

          {/* 8. BIO-IMPACT */}
          <Box title="Health Impact" icon={Cigarette} mode={mode} color="border-orange-600" devData={{ eq_cigs: (data.aqi/22).toFixed(1) }} govAction="Deploy Mobile Clinics">
             <div className="flex items-center gap-3">
               <div className="bg-orange-100 p-2 rounded-full text-orange-600"><Skull size={20} /></div>
               <div><div className="text-2xl font-bold text-slate-800">{(data.aqi / 22).toFixed(1)}</div><div className="text-[10px] font-bold uppercase text-slate-400">Cigarettes / Day</div></div>
             </div>
          </Box>

          {/* 9. SYMPTOMS */}
          <Box title="Symptom Check" icon={Stethoscope} mode={mode} color="border-red-400" devData={{ symptoms: ["cough", "eye_burn"] }} govAction="Alert Pulmonologists">
             <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-red-50 p-2 rounded text-red-700">Burning Eyes</div>
                <div className="bg-red-50 p-2 rounded text-red-700">Coughing</div>
                <div className="bg-red-50 p-2 rounded text-red-700">Breathless</div>
                <div className="bg-green-50 p-2 rounded text-green-700">No Fever</div>
             </div>
          </Box>

          {/* 10. NEAREST OASIS */}
          <Box title="Clean Air Zone" icon={MapPin} mode={mode} color="border-emerald-500" devData={{ location: "city_mall", dist: "2km" }} govAction="Designate Shelters">
             <div className="flex items-center gap-2">
                <div className="bg-emerald-100 text-emerald-700 font-bold p-2 rounded">0.8km</div>
                <div><div className="font-bold text-sm">DLF Mall Atrium</div><div className="text-[10px] text-green-600">AQI: 45 (HEPA Active)</div></div>
             </div>
          </Box>

          {/* 11. HISTORICAL TREND */}
          <Box title="24h Trend" icon={TrendingUp} mode={mode} color="border-indigo-500" devData={{ slope: "+12.4", prediction: "worsening" }} govAction="Extend Restrictions">
             <div className="h-full flex items-end justify-between px-2 pb-2 gap-1">{[40, 60, 45, 70, 90, 80, 100].map((h, i) => (<div key={i} style={{height: `${h}%`}} className="w-full bg-indigo-400/50 rounded-t hover:bg-indigo-500 transition-colors"></div>))}</div>
          </Box>

          {/* 12. COMMUNITY REPORTS */}
          <Box title="Community" icon={Users} mode={mode} color="border-teal-500" devData={{ reports: 14, type: "garbage_fire" }} govAction="Dispatch Fire Tender" onDetailClick={() => setActiveModal('COMMUNITY')} detailLabel="Live Reports">
             <div className="text-center space-y-2">
                <div className="text-xs text-slate-500">Live Reports near you</div>
                <button className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">🔥 3 Garbage Fires</button>
             </div>
          </Box>

        </div>
      </main>

      {/* FLOATING CHAT AGENT */}
      <ChatWidget mode={mode} city={city} data={data} />

    </div>
  );
}
