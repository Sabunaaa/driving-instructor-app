"use client";

import { Search, Calendar, SlidersHorizontal, Car, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

const ModernFilterBar = () => {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#F03D3D] focus:border-[#F03D3D] sm:text-sm transition duration-150 ease-in-out shadow-sm"
            placeholder="Search by location or instructor name"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-800 hover:bg-gray-50 transition whitespace-nowrap text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4" />
            Availability
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-800 hover:bg-gray-50 transition whitespace-nowrap text-sm font-medium text-gray-700">
            <Car className="w-4 h-4" />
            Vehicle Type
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-800 hover:bg-gray-50 transition whitespace-nowrap text-sm font-medium text-gray-700">
            Price Range
          </button>
          <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block" />
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-800 hover:bg-gray-50 transition whitespace-nowrap text-sm font-medium text-gray-700">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModernFilterBar;
