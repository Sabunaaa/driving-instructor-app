"use client";

import React from "react";
// @ts-ignore
import { MapPin, Calendar, GeorgianLari, ChevronDown, Star } from "lucide-react";
import BudgetSlider from "./BudgetSlider";

interface FilterSidebarProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  isLocationDropdownOpen: boolean;
  setIsLocationDropdownOpen: (open: boolean) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
  budgetRange: [number, number];
  setBudgetRange: (range: [number, number]) => void;
  selectedWeekdays: string[];
  setSelectedWeekdays: (weekdays: string[]) => void;
  selectedRatings: string[];
  setSelectedRatings: (ratings: string[]) => void;
  isMobileFiltersOpen: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedLocation,
  setSelectedLocation,
  isLocationDropdownOpen,
  setIsLocationDropdownOpen,
  selectedSpecialty,
  setSelectedSpecialty,
  budgetRange,
  setBudgetRange,
  selectedWeekdays,
  setSelectedWeekdays,
  selectedRatings,
  setSelectedRatings,
  isMobileFiltersOpen,
}) => {
  const specialtyOptions = ["ავტომატიკა", "მექანიკა"];

  const weekdayOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const locationOptions = [
    "რუსთავი",
    "თელავი",
    "გორი",
    "ახალციხე",
    "საჩხერე",
    "ქუთაისი",
    "ოზურგეთი",
    "ფოთი",
    "ბათუმი",
  ];

  return (
    <aside
      className={`w-full lg:w-[266px] space-y-10 ${
        isMobileFiltersOpen ? "block" : "hidden"
      } lg:block`}
      aria-label="Filters"
    >
      {/* Location and Radius */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-500" />
          <h3 className="text-base font-semibold text-gray-900">Location</h3>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-white w-full text-left hover:bg-gray-50"
            >
              <span className="flex-1 text-sm text-gray-900">
                {selectedLocation}
              </span>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${
                  isLocationDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLocationDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                {locationOptions.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsLocationDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedLocation === location
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Specialties */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">
          გადაცემათა კოლოფი
        </h3>
        <div className="space-y-4">
          {specialtyOptions.map((specialty) => (
            <label
              key={specialty}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="specialty"
                className="h-4 w-4 accent-gray-900 border-gray-900"
                value={specialty}
                checked={selectedSpecialty === specialty}
                onChange={() => setSelectedSpecialty(specialty)}
              />
              <span className="text-sm text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <GeorgianLari size={16} className="text-gray-600" />
          Budget
        </h3>
        <BudgetSlider
          budgetRange={budgetRange}
          setBudgetRange={setBudgetRange}
          min={40}
          max={100}
        />
      </div>

      {/* Available Days */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <Calendar size={16} className="text-gray-600" />
          Available Days
        </h3>
        <div className="space-y-4">
          {weekdayOptions.map((weekday) => (
            <div key={weekday} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={weekday}
                checked={selectedWeekdays.includes(weekday)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedWeekdays([...selectedWeekdays, weekday]);
                  } else {
                    setSelectedWeekdays(
                      selectedWeekdays.filter((w) => w !== weekday)
                    );
                  }
                }}
                className="w-5 h-5 rounded border-gray-900 accent-gray-900"
              />
              <label
                htmlFor={weekday}
                className="text-sm text-gray-900 cursor-pointer"
              >
                {weekday}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Average Rating */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">
          Average rating
        </h3>
        <div className="space-y-4">
          {["5", "4", "3", "2-1"].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={rating}
                checked={selectedRatings.includes(rating)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRatings([...selectedRatings, rating]);
                  } else {
                    setSelectedRatings(
                      selectedRatings.filter((r) => r !== rating)
                    );
                  }
                }}
                className="w-5 h-5 rounded border-gray-900 accent-gray-900"
              />
              <label
                htmlFor={rating}
                className="flex items-center gap-1 text-sm text-gray-900 cursor-pointer"
              >
                {rating}{" "}
                <Star size={12} className="text-orange-400 fill-current" />
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
