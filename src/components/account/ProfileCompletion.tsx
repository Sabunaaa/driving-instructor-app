"use client";

import React from "react";
// @ts-ignore
import { Plus } from "lucide-react";

interface ProfileCompletionProps {
  completionPercentage?: number;
  tasks: string[];
}

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({
  completionPercentage = 65,
  tasks,
}) => {
  return (
    <div className="bg-orange-50 rounded-lg p-6 flex items-center gap-6">
      {/* Progress Circle */}
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#FC9231"
            strokeWidth="2"
            strokeDasharray={`${completionPercentage}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-900 font-inter">
            {completionPercentage}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-gray-900 font-semibold text-base mb-3 font-inter">
          Complete your profile
        </h3>
        <div className="flex gap-8">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-2">
              <Plus size={16} className="text-gray-500" />
              <span className="text-gray-500 text-sm font-inter">{task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
