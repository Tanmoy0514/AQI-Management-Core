import React, { useState, useEffect, useMemo } from 'react';

interface MaskAdvisorProps {
    currentAqi: number;
}

interface MaskData {
    min: number;
    max: number;
    name: string;
    layers: string;
    note: string;
    colorClass: string;
    icon: string;
    status: string;
}

const MASK_DATA: MaskData[] = [
    {
        min: 0, max: 50,
        name: "No Mask Required",
        layers: "0 Layers",
        note: "Breathing natural air is best here; no filtration needed.",
        colorClass: "bg-green-500",
        icon: "fa-face-smile",
        status: "Good"
    },
    {
        min: 51, max: 100,
        name: "Cloth Mask",
        layers: "2 – 3 Layers",
        note: "Good for hygiene and coarse dust, but offers little protection against smog.",
        colorClass: "bg-yellow-400",
        icon: "fa-shirt",
        status: "Satisfactory"
    },
    {
        min: 101, max: 150,
        name: "Surgical Mask",
        layers: "3 Layers (SMS)",
        note: "Designed for fluids/germs. Weak against heavy PM2.5 smoke due to loose fit.",
        colorClass: "bg-orange-400",
        icon: "fa-user-nurse",
        status: "Moderate"
    },
    {
        min: 151, max: 200,
        name: "Activated Carbon",
        layers: "4 Layers (+ Carbon)",
        note: "Ideal for traffic fumes, odors, and ozone. Absorbs gases typical masks miss.",
        colorClass: "bg-red-500",
        icon: "fa-mask-ventilator",
        status: "Poor"
    },
    {
        min: 201, max: 300,
        name: "N95 / KN95 / FFP2",
        layers: "4 – 5 Layers",
        note: "The 'Gold Standard' for pollution. Filters 95% of particles.",
        colorClass: "bg-purple-600",
        icon: "fa-head-side-mask",
        status: "Very Poor"
    },
    {
        min: 301, max: 400,
        name: "N95 / N99 (Valved)",
        layers: "4 – 5 Layers",
        note: "Plastic valve lets heat escape. Easier to breathe in hot weather.",
        colorClass: "bg-rose-800",
        icon: "fa-mask-face",
        status: "Severe"
    },
    {
        min: 401, max: 9999,
        name: "N99 / P100 / Resp.",
        layers: "5 – 7 Layers",
        note: "Filters >99% of particles. Used in 'Airpocalypse' conditions.",
        colorClass: "bg-rose-950",
        icon: "fa-shield-virus",
        status: "Hazardous"
    }
];

export const MaskAdvisor: React.FC<MaskAdvisorProps> = ({ currentAqi }) => {
    // Allows user to click buttons to preview other AQI ranges
    const [previewAqi, setPreviewAqi] = useState<number | null>(null);

    // If preview is active, use it, otherwise use live prop
    const activeAqi = previewAqi !== null ? previewAqi : currentAqi;

    // Reset preview when prop changes significantly (optional logic, keeping it simple here)
    useEffect(() => {
        setPreviewAqi(null);
    }, [currentAqi < 10 ? 'reset' : 'no-reset']); // Simple trick: if AQI drops to 0 (reset), clear preview

    const maskInfo = useMemo(() => {
        return MASK_DATA.find(m => activeAqi >= m.min && activeAqi <= m.max) || MASK_DATA[MASK_DATA.length - 1];
    }, [activeAqi]);

    return (
        <div className="card mask-view relative overflow-hidden">
            {/* Background Texture similar to original HTML */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <i className="fa-solid fa-head-side-mask text-9xl"></i>
            </div>

            <h2 className="text-xl font-bold text-gray-800 relative z-10 flex items-center gap-2">
                <i className="fa-solid fa-lungs-virus text-purple-600"></i> Mask Advisor
            </h2>
            <p className="text-gray-600 mb-4 text-sm relative z-10">
                Current Mode: <span className="font-bold">{previewAqi !== null ? "Manual Preview" : "Live Simulation"}</span>
            </p>

            {/* Quick Select Buttons */}
            <div className="mb-6">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Check Ranges</label>
                <div className="flex gap-2 overflow-x-auto pb-2 range-scroll">
                    <button 
                        onClick={() => setPreviewAqi(null)}
                        className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-bold border transition-all ${previewAqi === null ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                    >
                        LIVE
                    </button>
                    {MASK_DATA.map((data, idx) => (
                        <button
                            key={idx}
                            onClick={() => setPreviewAqi(Math.floor((data.min + Math.min(data.max, 500)) / 2))}
                            className="flex-shrink-0 px-3 py-1 rounded-md text-xs font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                            <span className={`w-2 h-2 rounded-full ${data.colorClass}`}></span>
                            {data.min}{data.max > 1000 ? '+' : `-${data.max}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Result Display */}
            <div className={`border-2 rounded-xl overflow-hidden shadow-sm transition-all duration-300 relative bg-white`} style={{ borderColor: 'var(--border-color)' }}>
                {/* Dynamic Border Color Hack using style prop isn't fully ideal for Tailwind classes, utilizing class logic below */}
                
                <div className={`p-2 text-center text-white font-bold tracking-wide uppercase text-xs ${maskInfo.colorClass}`}>
                    {maskInfo.status} | AQI {activeAqi}
                </div>

                <div className="p-4 text-center">
                    <div className="mb-3 flex justify-center">
                        <div className={`w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl shadow-inner ${maskInfo.colorClass.replace('bg-', 'text-')}`}>
                            <i className={`fa-solid ${maskInfo.icon}`}></i>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-1">{maskInfo.name}</h3>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block mb-3">
                        {maskInfo.layers}
                    </span>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-left">
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Protection Note</span>
                         <p className="text-slate-600 text-sm leading-snug">{maskInfo.note}</p>
                    </div>
                </div>
            </div>

            {/* Helper Text */}
            <div className="mt-4 text-center">
                <p className="text-xs text-slate-400">
                    {previewAqi !== null 
                        ? <button onClick={() => setPreviewAqi(null)} className="text-blue-500 hover:underline">Reset to Live Data</button>
                        : "Syncing with Controller Dashboard..."}
                </p>
            </div>
        </div>
    );
};