"use client";

import { FilterOptions } from "@/hooks/useInstructorFilters";
import { Filter, X, ChevronDown, MapPin, Banknote, Car } from "lucide-react";
import { useState } from "react";

interface HorizontalFilterBarProps {
  filters: FilterOptions;
  updateFilter: (key: keyof FilterOptions, value: any) => void;
  toggleWeekday: (day: string) => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

const HorizontalFilterBar = ({ filters, updateFilter, toggleWeekday, resetFilters, hasActiveFilters }: HorizontalFilterBarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 relative">
      <div className="flex flex-wrap items-center gap-4">
        
        {/* Label */}
        <div className="flex items-center gap-2 text-gray-900 mr-2">
            <Filter className="w-5 h-5" />
            <span className="font-bold">Filters:</span>
        </div>

        {/* City Pill */}
        <div className="relative">
            <button 
                onClick={() => toggleDropdown('city')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                    filters.city 
                    ? 'border-[#F03D3D] bg-red-50 text-[#F03D3D]' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
            >
                <MapPin className="w-4 h-4" />
                <span>City</span>
                {filters.city && (
                    <>
                        <div className="w-px h-3 bg-current opacity-30" />
                        <span className="font-bold">{filters.city}</span>
                    </>
                )}
                <ChevronDown className="w-4 h-4" />
            </button>
            
            {openDropdown === 'city' && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20">
                    {['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi'].map((city) => (
                        <button
                            key={city}
                            onClick={() => {
                                updateFilter('city', filters.city === city ? '' : city);
                                setOpenDropdown(null);
                            }}
                            className={`w-full text-center px-4 py-2 rounded-lg text-sm transition-colors ${
                                filters.city === city 
                                ? 'bg-red-50 text-[#F03D3D] font-bold' 
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                            {city}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Transmission Pill */}
        <div className="relative">
            <button 
                onClick={() => toggleDropdown('transmission')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                    filters.transmissionType 
                    ? 'border-[#F03D3D] bg-red-50 text-[#F03D3D]' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
            >
                <Car className="w-4 h-4" />
                <span>Transmission</span>
                {filters.transmissionType && (
                    <>
                        <div className="w-px h-3 bg-current opacity-30" />
                        <span className="font-bold">{filters.transmissionType}</span>
                    </>
                )}
                <ChevronDown className="w-4 h-4" />
            </button>
            
            {openDropdown === 'transmission' && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20">
                    {['Manual', 'Automatic'].map((type) => (
                        <button
                            key={type}
                            onClick={() => {
                                updateFilter('transmissionType', filters.transmissionType === type ? '' : type);
                                setOpenDropdown(null);
                            }}
                            className={`w-full text-center px-4 py-2 rounded-lg text-sm transition-colors ${
                                filters.transmissionType === type 
                                ? 'bg-red-50 text-[#F03D3D] font-bold' 
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Price Pill */}
        <div className="relative">
            <button 
                onClick={() => toggleDropdown('price')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                    (filters.budget[0] > 40 || filters.budget[1] < 100) // Assuming default is 40-100
                    ? 'border-[#F03D3D] bg-red-50 text-[#F03D3D]' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
            >
                <Banknote className="w-4 h-4" />
                <span>Price Range</span>
                <ChevronDown className="w-4 h-4" />
            </button>

            {openDropdown === 'price' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-20">
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 mb-1 block">Min</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₾</span>
                                <input 
                                    type="number" 
                                    value={filters.budget[0]}
                                    onChange={(e) => updateFilter('budget', [Number(e.target.value), filters.budget[1]])}
                                    className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#F03D3D]"
                                />
                            </div>
                        </div>
                        <div className="w-2 h-[2px] bg-gray-300 mt-4" />
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 mb-1 block">Max</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₾</span>
                                <input 
                                    type="number" 
                                    value={filters.budget[1]}
                                    onChange={(e) => updateFilter('budget', [filters.budget[0], Number(e.target.value)])}
                                    className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#F03D3D]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 mx-2" />

        {/* Availability Buttons */}
        <div className="flex items-center gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                const isSelected = filters.weekdays.includes(day);
                return (
                    <button
                        key={day}
                        onClick={() => toggleWeekday(day)}
                        className={`
                            w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center border
                            ${isSelected
                                ? 'bg-[#F03D3D] border-[#F03D3D] text-white shadow-md'
                                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                            }
                        `}
                    >
                        {day.charAt(0)}
                    </button>
                );
            })}
        </div>

        {/* Reset Button */}
        {hasActiveFilters() && (
          <button 
            onClick={resetFilters}
            className="ml-auto text-sm font-medium text-[#F03D3D] hover:text-[#d62f2f] flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <X className="w-4 h-4" /> Reset Filters
          </button>
        )}
      </div>
      
      {/* Overlay to close dropdowns when clicking outside */}
      {openDropdown && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
      )}
    </div>
  );
};

export default HorizontalFilterBar;
