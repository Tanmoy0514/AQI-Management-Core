import React, { useRef, useEffect } from 'react';
import { AnalysisResult } from '../types';

interface ResultSectionProps {
    result: AnalysisResult | null;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ result }) => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (result && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [result]);

    if (!result) return null;

    return (
        <section id="result-section" ref={sectionRef}>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Detailed Health Analysis</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Score Card */}
                <div 
                    className={`bg-white rounded-2xl shadow-md p-6 border-l-8 transition-colors duration-300 ${result.cardBorderClass}`} 
                    id="risk-card"
                >
                    <h4 className="text-slate-500 text-sm font-semibold uppercase">Total Exposure Score</h4>
                    <div className="text-4xl font-bold mt-2" id="risk-score">{result.score}/100</div>
                    <p className={`text-sm mt-2 ${result.scoreClass}`} id="risk-text">{result.scoreText}</p>
                </div>

                {/* Recommendation List */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
                    <h4 className="text-slate-700 font-bold mb-4 flex items-center">
                        <i className="fa-solid fa-user-doctor text-green-600 mr-2"></i> Smart Recommendations
                    </h4>
                    <ul id="recommendation-list" className="space-y-3 text-sm text-slate-600">
                        {result.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <i className="fa-solid fa-check text-blue-500 mt-1"></i> 
                                <span>{rec}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Specific Warnings (Research Notes) */}
            {result.showAutoWarning && (
                <div id="auto-warning" className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <i className="fa-solid fa-triangle-exclamation text-amber-600 mt-1"></i>
                    <div>
                        <h5 className="font-bold text-amber-800">Transit Alert: Auto-Rickshaw</h5>
                        <p className="text-sm text-amber-700 mt-1">
                            Research indicates commuting by <strong>Auto-Rickshaw exposes you to 3x more PM2.5</strong> than the Metro due to lack of filtration and proximity to exhaust fumes. Consider switching to Metro or AC Bus if possible.
                        </p>
                    </div>
                </div>
            )}

            {result.showShoppingWarning && (
                <div id="shopping-warning" className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <i className="fa-solid fa-store text-red-600 mt-1"></i>
                    <div>
                        <h5 className="font-bold text-red-800">Shopping Alert: Open Bazaar</h5>
                        <p className="text-sm text-red-700 mt-1">
                            Shopping in crowded open bazaars (Bajar) significantly increases lung particle deposition. With current AQI, switching to <strong>Online Shopping</strong> is strongly recommended today.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};