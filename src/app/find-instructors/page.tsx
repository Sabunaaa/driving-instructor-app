"use client";

import React from "react";
import Link from "next/link";
// @ts-ignore
import {
  ChevronRight,
  ChevronLeft,
  X,
  ArrowUpDown,
  Grid2X2,
  List,
  ChevronDown,
  User,
} from "lucide-react";
import FilterSidebar from "./components/FilterSidebar";
import InstructorCard from "./components/InstructorCard";

const FindInstructorsPage = () => {
  const DEFAULT_LOCATION = "რუსთავი";
  const DEFAULT_SPECIALTY = "ავტომატიკა";
  const DEFAULT_BUDGET: [number, number] = [40, 100];

  const [selectedLocation, setSelectedLocation] =
    React.useState(DEFAULT_LOCATION);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] =
    React.useState(false);
  const [selectedRadius, setSelectedRadius] = React.useState("50 mi");

  const [selectedSpecialty, setSelectedSpecialty] =
    React.useState(DEFAULT_SPECIALTY);
  const [budgetRange, setBudgetRange] =
    React.useState<[number, number]>(DEFAULT_BUDGET);
  const [selectedWeekdays, setSelectedWeekdays] = React.useState([
    "Monday",
    "Tuesday",
  ]);
  const [selectedRatings, setSelectedRatings] = React.useState(["5", "4"]);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const totalPages = 10; // keep consistent with UI expectation

  const getPageNumbers = (current: number, total: number): number[] => {
    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 1) return [1, 2, 3];
    if (current >= total) return [total - 2, total - 1, total];
    return [current - 1, current, current + 1];
  };

  const instructors = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "რუსთავი",
      specialties: "Manual transmission · Highway driving",
      bio: "Certified driving instructor with 8+ years of experience. Specializing in nervous drivers and manual transmission training.",
      rating: 4.9,
      reviews: 127,
      badges: ["Verified", "Top Instructor"],
      avatar: User,
      verified: true,
      budget: "$$",
      features: ["Verified instructors", "Flexible scheduling"],
      images: [],
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
      avatar: User,
      verified: false,
      budget: "$$$",
      features: ["Online booking", "Weekend availability", "Modern vehicles"],
      images: [],
    },
  ];

  // Build removable chips only for non-default selections
  const chips: { label: string; onRemove: () => void }[] = [];
  if (selectedLocation !== DEFAULT_LOCATION) {
    chips.push({
      label: `Location: ${selectedLocation}`,
      onRemove: () => setSelectedLocation(DEFAULT_LOCATION),
    });
  }
  if (selectedSpecialty !== DEFAULT_SPECIALTY) {
    chips.push({
      label: `Specialty: ${selectedSpecialty}`,
      onRemove: () => setSelectedSpecialty(DEFAULT_SPECIALTY),
    });
  }
  if (
    budgetRange[0] !== DEFAULT_BUDGET[0] ||
    budgetRange[1] !== DEFAULT_BUDGET[1]
  ) {
    chips.push({
      label: `Budget: ${budgetRange[0]}-${budgetRange[1]}`,
      onRemove: () => setBudgetRange(DEFAULT_BUDGET),
    });
  }
  selectedWeekdays.forEach((weekday) => {
    chips.push({
      label: `Day: ${weekday}`,
      onRemove: () =>
        setSelectedWeekdays(selectedWeekdays.filter((w) => w !== weekday)),
    });
  });
  selectedRatings.forEach((rating) => {
    chips.push({
      label: `${rating} ⭐`,
      onRemove: () =>
        setSelectedRatings(selectedRatings.filter((r) => r !== rating)),
    });
  });

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (isLocationDropdownOpen) {
        setIsLocationDropdownOpen(false);
      }
    };

    if (isLocationDropdownOpen && typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("click", handleClickOutside);
      }
    };
  }, [isLocationDropdownOpen]);

  // Mobile filters toggle
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-6 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm font-medium text-gray-600">Homepage</span>
          <ChevronRight size={14} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-900">
            Find Instructors
          </span>
        </div>

        {/* Main Content */}
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
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            isLocationDropdownOpen={isLocationDropdownOpen}
            setIsLocationDropdownOpen={setIsLocationDropdownOpen}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
            budgetRange={budgetRange}
            setBudgetRange={setBudgetRange}
            selectedWeekdays={selectedWeekdays}
            setSelectedWeekdays={setSelectedWeekdays}
            selectedRatings={selectedRatings}
            setSelectedRatings={setSelectedRatings}
            isMobileFiltersOpen={isMobileFiltersOpen}
          />

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Active Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex gap-2 overflow-x-auto sm:overflow-visible whitespace-nowrap sm:whitespace-normal sm:flex-wrap">
                {chips.slice(0, 12).map((chip, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={chip.onRemove}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-300"
                  >
                    <X size={12} />
                    {chip.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedLocation(DEFAULT_LOCATION);
                  setSelectedSpecialty(DEFAULT_SPECIALTY);
                  setBudgetRange(DEFAULT_BUDGET);
                  setSelectedWeekdays([]);
                  setSelectedRatings([]);
                }}
                className="text-sm font-medium text-gray-900 hover:text-gray-700 self-start sm:self-auto"
              >
                Clear all
              </button>
            </div>

            {/* Sorting + View Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-sm text-[#4E5562]">Showing 73 results</span>

              <div className="flex items-center gap-4">
                {/* Sort Select */}
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-[#111827] mr-3">
                    Sort by:
                  </span>
                  <button className="flex items-center justify-between px-4 py-2.5 w-[160px] sm:w-[180px] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    {/* Left side: Icon + Text */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-5 h-5">
                        <ArrowUpDown size={16} className="text-[#4E5562]" />
                      </div>
                      <span className="text-sm text-[#4E5562]">Popular</span>
                    </div>
                    {/* Right side: Dropdown Arrow */}
                    <div className="flex items-center justify-center w-4 h-5">
                      <ChevronDown size={14} className="text-[#4E5562]" />
                    </div>
                  </button>
                </div>

                {/* View Switcher */}
                <div className="hidden md:flex gap-1 bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Grid2X2 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
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

            {/* Instructor Listings */}
            <div
              className={
                viewMode === "list"
                  ? "space-y-4"
                  : "grid grid-cols-1 sm:grid-cols-2 gap-6"
              }
            >
              {instructors.map((instructor) => (
                <InstructorCard
                  key={instructor.id}
                  instructor={instructor}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Results Pagination */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {/* Prev */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`px-2 py-2 rounded-lg transition-colors text-black ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              {/* Page numbers (always 3 max) */}
              {getPageNumbers(currentPage, totalPages).map((page) => {
                const isActive = page === currentPage;
                return (
                  <button
                    key={`page-${page}`}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={isActive ? "page" : undefined}
                    className={`min-w-9 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`px-2 py-2 rounded-lg transition-colors text-black ${
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindInstructorsPage;
