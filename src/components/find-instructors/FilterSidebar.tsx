"use client";

import { FilterOptions } from "@/hooks/useInstructorFilters";
import { Filter } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterOptions;
  updateFilter: (key: keyof FilterOptions, value: any) => void;
  toggleWeekday: (day: string) => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

const FilterSidebar = ({ filters, updateFilter, toggleWeekday, resetFilters, hasActiveFilters }: FilterSidebarProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-gray-900">
            <Filter className="w-5 h-5" />
            <h3 className="font-bold text-lg">Filters</h3>
        </div>
        {hasActiveFilters() && (
          <button 
            onClick={resetFilters}
            className="text-xs font-medium text-[#F03D3D] hover:text-[#d62f2f] bg-red-50 px-2 py-1 rounded-md transition-colors"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Transmission Type */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Transmission</h4>
        <div className="grid grid-cols-2 gap-3">
          {['Manual', 'Automatic'].map((type) => {
            const isSelected = filters.transmissionType === type;
            return (
                <label 
                    key={type} 
                    className={`
                        relative flex items-center justify-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all
                        ${isSelected 
                            ? 'border-[#F03D3D] bg-red-50/50 text-[#F03D3D]' 
                            : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50'
                        }
                    `}
                >
                    <input 
                        type="radio" 
                        name="transmission"
                        checked={isSelected}
                        onChange={() => updateFilter('transmissionType', type)}
                        className="sr-only"
                    />
                    <span className="text-sm font-bold">{type}</span>
                    {isSelected && <div className="absolute top-1 right-1 w-2 h-2 bg-[#F03D3D] rounded-full" />}
                </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Hourly Rate (₾)</h4>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex-1">
                    <label className="text-xs text-gray-400 mb-1 block">Min Price</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₾</span>
                        <input 
                            type="number" 
                            value={filters.budget[0]}
                            onChange={(e) => updateFilter('budget', [Number(e.target.value), filters.budget[1]])}
                            className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#F03D3D] focus:ring-1 focus:ring-[#F03D3D]"
                        />
                    </div>
                </div>
                <div className="w-2 h-[2px] bg-gray-300 mt-4" />
                <div className="flex-1">
                    <label className="text-xs text-gray-400 mb-1 block">Max Price</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₾</span>
                        <input 
                            type="number" 
                            value={filters.budget[1]}
                            onChange={(e) => updateFilter('budget', [filters.budget[0], Number(e.target.value)])}
                            className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#F03D3D] focus:ring-1 focus:ring-[#F03D3D]"
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Availability</h4>
        <div className="flex flex-wrap gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
            const isSelected = filters.weekdays.includes(day);
            return (
                <button
                key={day}
                onClick={() => toggleWeekday(day)}
                className={`
                    w-10 h-10 rounded-full text-xs font-bold transition-all flex items-center justify-center border
                    ${isSelected
                        ? 'bg-[#F03D3D] border-[#F03D3D] text-white shadow-md shadow-red-500/20'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                    }
                `}
                >
                {day.charAt(0)}
                </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
