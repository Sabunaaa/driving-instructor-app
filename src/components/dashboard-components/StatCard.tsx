"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: {
    icon: LucideIcon;
    text: string;
    color: string;
  };
  comparison?: {
    label: string;
    value: string;
  };
  onClick?: () => void;
  isClickable?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  bgColor,
  iconColor,
  title,
  value,
  subtitle,
  badge,
  comparison,
  onClick,
  isClickable = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow text-left w-full ${
        isClickable ? "cursor-pointer hover:border-purple-200" : ""
      }`}
      disabled={!isClickable}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        {badge && (
          <span className={`text-xs font-medium ${badge.color} px-2 py-1 rounded-full flex items-center gap-1`}>
            <badge.icon className="w-3 h-3" />
            {badge.text}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-1">
        {value}
        {badge?.icon && title.includes("Rating") && (
          <Icon className={`w-5 h-5 ${iconColor} fill-current`} />
        )}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{title}</p>
      {comparison && (
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{comparison.label}:</span>
            <span className="font-semibold text-gray-900">{comparison.value}</span>
          </div>
        </div>
      )}
    </button>
  );
};
