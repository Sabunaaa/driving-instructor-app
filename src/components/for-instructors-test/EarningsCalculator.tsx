"use client";

import { useState } from "react";
import { PoundSterling } from "lucide-react";

const EarningsCalculator = () => {
  const [hours, setHours] = useState(25);
  const [rate, setRate] = useState(35);

  const weekly = hours * rate;
  const monthly = weekly * 4;
  const yearly = monthly * 12;

  return (
    <section className="py-24 px-6 bg-gray-900 text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F03D3D] rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Estimate Your Earnings</h2>
          <p className="text-gray-400">See how much you could earn with full control over your schedule.</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Controls */}
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-bold text-lg">Hours per week</label>
                  <span className="text-[#F03D3D] font-bold text-xl">{hours} hrs</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  value={hours} 
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#F03D3D]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Part Time</span>
                  <span>Full Time</span>
                  <span>Overtime</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-bold text-lg">Hourly Rate</label>
                  <span className="text-[#F03D3D] font-bold text-xl">£{rate}</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="60" 
                  value={rate} 
                  onChange={(e) => setRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#F03D3D]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Competitive</span>
                  <span>Standard</span>
                  <span>Premium</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white text-gray-900 rounded-2xl p-8 flex flex-col justify-center space-y-6">
              <div className="text-center pb-6 border-b border-gray-100">
                <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Weekly Income</div>
                <div className="text-4xl font-bold text-gray-900">£{weekly.toLocaleString()}</div>
              </div>
              <div className="text-center pb-6 border-b border-gray-100">
                <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Monthly Income</div>
                <div className="text-4xl font-bold text-gray-900">£{monthly.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Yearly Potential</div>
                <div className="text-5xl font-bold text-[#F03D3D]">£{yearly.toLocaleString()}</div>
              </div>
            </div>

          </div>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-8">
          *Estimates are based on your inputs and do not include potential expenses like fuel or insurance.
        </p>
      </div>
    </section>
  );
};

export default EarningsCalculator;
