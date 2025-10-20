"use client";

import React from "react";
import { Calendar, DollarSign, Star, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  onLessonsCardClick: () => void; // Opens lessons modal
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  onLessonsCardClick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Lessons This Week */}
      <button
        onClick={onLessonsCardClick}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow text-left w-full cursor-pointer hover:border-purple-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-50 rounded-lg">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +5
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">12</h3>
        <p className="text-sm text-gray-600">Lessons This Week</p>
      </button>

      {/* Weekly Revenue */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-emerald-50 rounded-lg">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">$100</h3>
        <p className="text-sm text-gray-600 mb-3">This Week's Revenue</p>
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Last week:</span>
            <span className="font-semibold text-gray-900">$800</span>
          </div>
        </div>
      </div>

      {/* Average Rating */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-amber-50 rounded-lg">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
          </div>
          <span className="text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
            142 reviews
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-1">
          4.8
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
        </h3>
        <p className="text-sm text-gray-600">Average Rating</p>
      </div>
    </div>
  );
};

export default DashboardStats;
