"use client";

import React from "react";
// @ts-ignore
import { ArrowUpDown, Grid2X2, List, ChevronDown } from "lucide-react";

interface SortingControlsProps {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  resultsCount: number;
}

export const SortingControls: React.FC<SortingControlsProps> = ({
  viewMode,
  onViewModeChange,
  resultsCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <span className="text-sm text-[#4E5562]">Showing {resultsCount} results</span>

      <div className="flex items-center gap-4">
        {/* Sort Select */}
        <div className="flex items-center">
          <span className="text-sm font-semibold text-[#111827] mr-3">
            Sort by:
          </span>
          <button className="flex items-center justify-between px-4 py-2.5 w-[160px] sm:w-[180px] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-5 h-5">
                <ArrowUpDown size={16} className="text-[#4E5562]" />
              </div>
              <span className="text-sm text-[#4E5562]">Popular</span>
            </div>
            <div className="flex items-center justify-center w-4 h-5">
              <ChevronDown size={14} className="text-[#4E5562]" />
            </div>
          </button>
        </div>

        {/* View Switcher */}
        <div className="hidden md:flex gap-1 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Grid2X2 size={18} />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === "list"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
