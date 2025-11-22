"use client";

import React from "react";
// @ts-ignore
import { ArrowUpDown, Grid2X2, List, ChevronDown } from "lucide-react";

interface SortingControlsProps {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  resultsCount: number;
}

type SortOption = "popular" | "rating" | "price-low" | "price-high" | "newest";

export const SortingControls: React.FC<SortingControlsProps> = ({
  viewMode,
  onViewModeChange,
  resultsCount,
}) => {
  const [sortBy, setSortBy] = React.useState<SortOption>("popular");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: "popular" as SortOption, label: "Popular" },
    { value: "rating" as SortOption, label: "Top Rated" },
    { value: "price-low" as SortOption, label: "$ Low to High" },
    { value: "price-high" as SortOption, label: "$ High to Low" },
    { value: "newest" as SortOption, label: "Newest" },
  ];

  const selectedLabel = sortOptions.find((opt) => opt.value === sortBy)?.label || "Popular";

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortSelect = (value: SortOption) => {
    setSortBy(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <span className="text-sm text-[#4E5562]">Showing {resultsCount} results</span>

      <div className="flex items-center gap-4">
        {/* Sort Select */}
        <div className="flex items-center" ref={dropdownRef}>
          <span className="text-sm font-semibold text-[#111827] mr-3">
            Sort by:
          </span>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between px-4 py-2.5 w-[160px] sm:w-[180px] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-5 h-5">
                  <ArrowUpDown size={16} className="text-[#4E5562]" />
                </div>
                <span className="text-sm text-[#4E5562]">{selectedLabel}</span>
              </div>
              <div className="flex items-center justify-center w-4 h-5">
                <ChevronDown
                  size={14}
                  className={`text-[#4E5562] transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 w-[160px] sm:w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={`flex items-center w-full px-4 py-2.5 text-left text-sm transition-colors ${
                      sortBy === option.value
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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
