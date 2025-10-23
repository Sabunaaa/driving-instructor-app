"use client";

import React from "react";
import { Calendar } from "lucide-react";

export interface ModalChartProps {
  dateRange?: string;
}

export const ModalChart: React.FC<ModalChartProps> = ({ dateRange = "14 - 25 Aug 2020" }) => {
  return (
    <div className="bg-white rounded-xl p-6 h-full border border-gray-100">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Statistics</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
          <span>{dateRange}</span>
          <Calendar className="w-4 h-4" />
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-[400px]">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400">
          <span>+60k</span>
          <span>50k</span>
          <span>40k</span>
          <span>30k</span>
          <span>20k</span>
          <span>10k</span>
          <span>0</span>
        </div>

        {/* Chart container */}
        <div className="absolute left-12 right-0 top-0 bottom-0">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pb-8">
            <div className="border-t border-gray-100"></div>
            <div className="border-t border-gray-100"></div>
            <div className="border-t border-gray-100"></div>
            <div className="border-t border-gray-100"></div>
            <div className="border-t border-gray-100"></div>
            <div className="border-t border-gray-100"></div>
            <div className="border-t border-gray-100"></div>
          </div>

          {/* SVG Chart */}
          <svg className="w-full h-full" viewBox="0 0 700 400" preserveAspectRatio="none">
            {/* Smooth curve path */}
            <path
              d="M 0 300 Q 50 280 100 250 Q 150 200 200 150 Q 250 120 300 110 Q 350 105 400 110 Q 450 115 500 120 Q 550 160 600 140 Q 650 80 700 50"
              fill="none"
              stroke="#000000"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* End point circle */}
            <circle cx="700" cy="50" r="6" fill="#000000" />
            {/* Vertical dashed line at end */}
            <line
              x1="700"
              y1="50"
              x2="700"
              y2="360"
              stroke="#E5E7EB"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
    </div>
  );
};
