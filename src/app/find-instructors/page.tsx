"use client";

import React from "react";
import { useInstructorFilters, usePagination } from "@/hooks";
import { FilterSidebar } from "@/components/find-instructors/FilterSidebar";
import { InstructorCard } from "@/components/find-instructors/InstructorCard";
import { InstructorGrid } from "@/components/find-instructors/InstructorGrid";
import { Pagination } from "@/components/find-instructors/Pagination";
import { FilterChips } from "@/components/find-instructors/FilterChips";
import { SortingControls } from "@/components/find-instructors/SortingControls";

// Constants
const DEFAULT_LOCATION = "რუსთავი";
const DEFAULT_SPECIALTY = "ავტომატიკა";
const DEFAULT_BUDGET: [number, number] = [40, 100];
const SPECIALTY_OPTIONS = ["ავტომატიკა", "მექანიკა"];
const WEEKDAY_OPTIONS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const LOCATION_OPTIONS = [
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

interface Instructor {
  id: number;
  name: string;
  location: string;
  specialties: string;
  bio: string;
  rating: number;
  reviews: number;
  badges: string[];
  verified: boolean;
  budget: string;
}

const FindInstructorsPage = () => {
  // Use custom hooks for filters and pagination
  const { filters, updateFilter, updateBudget, toggleWeekday, resetFilters, hasActiveFilters, getActiveFilterCount } = useInstructorFilters();
  const { currentPage, handlePageChange, getTotalPages } = usePagination(1, 10);

  // View State
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);

  const totalPages = getTotalPages(730);

  // Handler wrappers for filter changes
  const handleWeekdaysChange = React.useCallback((days: string[]) => {
    // Sync weekdays: for any day not in current selection, toggle it on
    // for any day in current but not in new, toggle it off
    const currentDays = new Set(filters.weekdays);
    const newDays = new Set(days);
    
    // Toggle off old days
    currentDays.forEach(day => {
      if (!newDays.has(day)) {
        toggleWeekday(day);
      }
    });
    
    // Toggle on new days
    newDays.forEach(day => {
      if (!currentDays.has(day)) {
        toggleWeekday(day);
      }
    });
  }, [filters.weekdays, toggleWeekday]);

  const handleRatingsChange = React.useCallback((ratings: string[]) => {
    if (ratings.length > 0) {
      const highestRating = Math.max(...ratings.map(r => parseInt(r)));
      updateFilter('rating', highestRating);
    } else {
      updateFilter('rating', 0);
    }
  }, [updateFilter]);

  // Sample instructors data
  const instructors: Instructor[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "რუსთავი",
      specialties: "Manual transmission · Highway driving",
      bio: "Certified driving instructor with 8+ years of experience. Specializing in nervous drivers and manual transmission training.",
      rating: 4.9,
      reviews: 127,
      badges: ["Verified", "Top Instructor"],
      verified: true,
      budget: "$$",
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      location: "ბათუმი",
      specialties: "Automatic only · City driving · Teen drivers",
      bio: "Patient and experienced instructor focusing on city driving skills and working with teenage students.",
      rating: 5.0,
      reviews: 45,
      badges: ["Eco-friendly"],
      verified: false,
      budget: "$$$",
    },
  ];

  // Build filter chips
  const chips: { label: string; onRemove: () => void }[] = [];
  
  if (filters.city) {
    chips.push({
      label: `Location: ${filters.city}`,
      onRemove: () => updateFilter('city', ''),
    });
  }
  if (filters.specialty) {
    chips.push({
      label: `Specialty: ${filters.specialty}`,
      onRemove: () => updateFilter('specialty', ''),
    });
  }
  if (filters.budget[0] !== DEFAULT_BUDGET[0] || filters.budget[1] !== DEFAULT_BUDGET[1]) {
    chips.push({
      label: `Budget: ${filters.budget[0]}-${filters.budget[1]}`,
      onRemove: () => updateBudget(DEFAULT_BUDGET),
    });
  }
  
  filters.weekdays.forEach((weekday) => {
    chips.push({
      label: `Day: ${weekday}`,
      onRemove: () => toggleWeekday(weekday),
    });
  });
  
  if (filters.rating > 0) {
    chips.push({
      label: `${filters.rating} ⭐`,
      onRemove: () => updateFilter('rating', 0),
    });
  }

  const handleClearFilters = () => {
    resetFilters();
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-6 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Filters</span>
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen((s) => !s)}
              className="px-3 py-2 text-sm rounded-lg border bg-black border-black text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-expanded={isMobileFiltersOpen}
            >
              {isMobileFiltersOpen ? "Hide" : "Show"}
            </button>
          </div>

          {/* Filters Sidebar */}
          <FilterSidebar
            selectedLocation={filters.city}
            onLocationChange={(location) => updateFilter('city', location)}
            selectedSpecialty={filters.specialty}
            onSpecialtyChange={(specialty) => updateFilter('specialty', specialty)}
            budgetRange={filters.budget}
            onBudgetChange={updateBudget}
            selectedWeekdays={filters.weekdays}
            onWeekdaysChange={handleWeekdaysChange}
            selectedRatings={filters.rating > 0 ? [filters.rating.toString()] : []}
            onRatingsChange={handleRatingsChange}
            isMobileOpen={isMobileFiltersOpen}
            locationOptions={LOCATION_OPTIONS}
            specialtyOptions={SPECIALTY_OPTIONS}
            weekdayOptions={WEEKDAY_OPTIONS}
          />

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Active Filters */}
            <FilterChips chips={chips} onClearAll={handleClearFilters} />

            {/* Sorting + View Switcher */}
            <SortingControls
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              resultsCount={73}
            />

            {/* Instructor Listings */}
            {viewMode === "list" ? (
              <div className="space-y-4">
                {instructors.map((instructor) => (
                  <InstructorCard key={instructor.id} instructor={instructor} />
                ))}
              </div>
            ) : (
              <InstructorGrid instructors={instructors} />
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindInstructorsPage;
