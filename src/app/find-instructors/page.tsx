"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
// @ts-ignore
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  Navigation,
  Search,
  Star,
  X,
  ChevronDown,
  User,
  Car,
  Calendar,
  Award,
  Shield,
  Clock,
  BookOpen,
  Mail,
  Bookmark,
  ArrowUpDown,
  Grid2X2,
  List,
  GeorgianLari,
} from "lucide-react";

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

  // Budget slider drag helpers
  // Track ref for the budget slider (used for pointer math)
  const budgetTrackRef = React.useRef<HTMLDivElement | null>(null);
  const draggingRef = React.useRef<null | "left" | "right">(null);

  const valueFromClientX = (clientX: number) => {
    const rect = budgetTrackRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(40 + pct * (100 - 40));
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!draggingRef.current) return;
    const val = valueFromClientX(e.clientX);
    if (val == null) return;
    if (draggingRef.current === "left") {
      const clamped = Math.min(val, budgetRange[1] - 1);
      if (clamped !== budgetRange[0]) setBudgetRange([clamped, budgetRange[1]]);
    } else if (draggingRef.current === "right") {
      const clamped = Math.max(val, budgetRange[0] + 1);
      if (clamped !== budgetRange[1]) setBudgetRange([budgetRange[0], clamped]);
    }
  };

  const stopDrag = () => {
    draggingRef.current = null;
    if (typeof window !== "undefined") {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDrag);
    }
  };

  const startDrag =
    (side: "left" | "right") => (e: React.PointerEvent<HTMLDivElement>) => {
      draggingRef.current = side;
      // Kick off with initial move
      onPointerMove(e.nativeEvent);
      if (typeof window !== "undefined") {
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", stopDrag);
      }
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
      images: [Car, Calendar, BookOpen],
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
      images: [User, Car, BookOpen],
    },
  ];

  const activeFilters = [
    selectedLocation,
    selectedSpecialty,
    `Budget: ${budgetRange[0]}-${budgetRange[1]}`,
    ...selectedWeekdays,
    ...selectedRatings.map((r) => `${r} ⭐`),
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
                <h3 className="text-base font-semibold text-gray-900">
                  Location
                </h3>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsLocationDropdownOpen(!isLocationDropdownOpen)
                    }
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
              <div className="pt-6 pb-1">
                {/* Functional Range Slider */}
                <div className="relative" ref={budgetTrackRef}>
                  {/* Helper function to convert value to percentage */}
                  {(() => {
                    const getPercentage = (value: number) =>
                      ((value - 40) / (100 - 40)) * 100;
                    const leftPercent = getPercentage(budgetRange[0]);
                    const rightPercent = getPercentage(budgetRange[1]);

                    return (
                      <>
                        {/* Base Track Input (for track clicking) */}
                        <input
                          type="range"
                          min="40"
                          max="100"
                          value={budgetRange[0]}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            // Determine which handle is closer and move that one
                            const leftDist = Math.abs(value - budgetRange[0]);
                            const rightDist = Math.abs(value - budgetRange[1]);

                            if (
                              leftDist <= rightDist &&
                              value < budgetRange[1]
                            ) {
                              setBudgetRange([value, budgetRange[1]]);
                            } else if (
                              rightDist < leftDist &&
                              value > budgetRange[0]
                            ) {
                              setBudgetRange([budgetRange[0], value]);
                            }
                          }}
                          className="absolute inset-0 w-full h-10 opacity-0 cursor-pointer z-10"
                          style={{
                            WebkitAppearance: "none",
                            appearance: "none",
                          }}
                          onDragStart={(e) => e.preventDefault()}
                        />

                        {/* Left Handle Input */}
                        <input
                          type="range"
                          min="40"
                          max={budgetRange[1] - 1}
                          value={budgetRange[0]}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setBudgetRange([value, budgetRange[1]]);
                          }}
                          className="absolute inset-0 w-full h-10 opacity-0 cursor-grab active:cursor-grabbing z-30"
                          style={{
                            clipPath: `polygon(0% 0%, ${
                              leftPercent + 14
                            }% 0%, ${leftPercent + 14}% 100%, 0% 100%)`,
                            WebkitAppearance: "none",
                            appearance: "none",
                          }}
                          onDragStart={(e) => e.preventDefault()}
                        />

                        {/* Right Handle Input */}
                        <input
                          type="range"
                          min={budgetRange[0] + 1}
                          max="100"
                          value={budgetRange[1]}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setBudgetRange([budgetRange[0], value]);
                          }}
                          className="absolute inset-0 w-full h-10 opacity-0 cursor-grab active:cursor-grabbing z-30"
                          style={{
                            clipPath: `polygon(${
                              rightPercent - 14
                            }% 0%, 100% 0%, 100% 100%, ${
                              rightPercent - 14
                            }% 100%)`,
                            WebkitAppearance: "none",
                            appearance: "none",
                          }}
                          onDragStart={(e) => e.preventDefault()}
                        />

                        {/* Visual Track */}
                        <div className="w-full h-0.5 bg-gray-200 rounded-full relative pointer-events-none">
                          {/* Active Track (between handles) */}
                          <div
                            className="absolute top-0 h-0.5 bg-gray-900 rounded-full"
                            style={{
                              left: `${leftPercent}%`,
                              width: `${rightPercent - leftPercent}%`,
                            }}
                          ></div>
                        </div>

                        {/* Big hit targets for easier grab */}
                        <div
                          className="absolute z-50 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 cursor-grab active:cursor-grabbing"
                          style={{ left: `${leftPercent}%` }}
                          onPointerDown={startDrag("left")}
                        />
                        <div
                          className="absolute z-50 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 cursor-grab active:cursor-grabbing"
                          style={{ left: `${rightPercent}%` }}
                          onPointerDown={startDrag("right")}
                        />

                        {/* Left Handle Visual */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-black border-2 border-black rounded-full pointer-events-none z-40 shadow-sm"
                          style={{ left: `calc(${leftPercent}% - 10px)` }}
                        >
                          {/* Left Tooltip */}
                          <div
                            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-gray-900 text-sm font-normal whitespace-nowrap select-none pointer-events-none"
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 400,
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                          >
                            {budgetRange[0]}
                          </div>
                        </div>

                        {/* Right Handle Visual */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-black border-2 border-black rounded-full pointer-events-none z-40 shadow-sm"
                          style={{ left: `calc(${rightPercent}% - 10px)` }}
                        >
                          {/* Right Tooltip */}
                          <div
                            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-gray-900 text-sm font-normal whitespace-nowrap select-none pointer-events-none"
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 400,
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                          >
                            {budgetRange[1]}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
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
                      <Star
                        size={12}
                        className="text-orange-400 fill-current"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

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
            {viewMode === "list" ? (
              // List View (Current Design)
              <div className="space-y-4">
                {instructors.map((instructor) => {
                  const AvatarIcon = instructor.avatar;

                  return (
                    <Link
                      key={instructor.id}
                      href={`/instructors/${instructor.id}`}
                      className="block"
                    >
                      <div className="flex flex-col lg:flex-row bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                        {/* Image Gallery */}
                        <div className="w-full h-40 lg:w-[220px] lg:h-[180px] bg-gray-100 relative flex items-center justify-center overflow-hidden">
                          {/* Instructor photo */}
                          <img
                            src="/images/404/profile.jpg"
                            alt={`${instructor.name} photo`}
                            className="w-full h-full object-cover"
                          />

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/16"></div>

                          {/* Pagination numbers (static for now) */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                            {[1, 2, 3, 4].map((n, idx) => (
                              <div
                                key={n}
                                className={
                                  `w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium border ` +
                                  (idx === 0
                                    ? "bg-black text-white border-black"
                                    : "bg-white/90 text-black border-black/80")
                                }
                              >
                                {n}
                              </div>
                            ))}
                          </div>

                          {/* Bookmark button */}
                          <button className="absolute top-3 right-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                            <Bookmark
                              size={16}
                              className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                            />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col lg:flex-row flex-1">
                          {/* Main Content Area */}
                          <div className="flex-1 p-4">
                            {/* Contractor Info */}
                            <div className="space-y-2">
                              {/* Header */}
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                                  <img
                                    src="/images/404/profile.jpg"
                                    alt={`${instructor.name} avatar`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h3
                                  className="text-sm font-semibold text-gray-900 leading-5"
                                  style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                  }}
                                >
                                  {instructor.name}
                                </h3>
                              </div>

                              {/* Mobile: Rating next to name */}
                              <div className="flex items-center gap-1 lg:hidden">
                                <Star
                                  size={14}
                                  className="text-orange-400 fill-current"
                                />
                                <span
                                  className="text-xs text-gray-900"
                                  style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "12px",
                                  }}
                                >
                                  {instructor.rating}
                                </span>
                                <span
                                  className="text-[10px] text-gray-500"
                                  style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                  }}
                                >
                                  ({instructor.reviews})
                                </span>
                              </div>

                              {/* Mobile: Badges under name */}
                              <div className="flex flex-wrap items-center gap-2 lg:hidden">
                                {instructor.verified && (
                                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#3D7A81] rounded text-white text-[10px] font-medium">
                                    <Shield size={12} className="text-white" />
                                    <span>Verified</span>
                                  </div>
                                )}
                                {instructor.badges.includes(
                                  "Top Instructor"
                                ) && (
                                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-medium">
                                    <Award size={12} />
                                    <span>Top instructor</span>
                                  </div>
                                )}
                                {instructor.badges
                                  .filter(
                                    (b) =>
                                      b !== "Top Instructor" && b !== "Verified"
                                  )
                                  .map((badge, idx) => (
                                    <div
                                      key={idx}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium"
                                    >
                                      <span>{badge}</span>
                                    </div>
                                  ))}
                              </div>

                              {/* Services */}
                              <p
                                className="text-xs font-medium text-gray-900 leading-[1.43em]"
                                style={{
                                  fontFamily: "Inter",
                                  fontWeight: 500,
                                  fontSize: "12px",
                                }}
                              >
                                {instructor.specialties}
                              </p>

                              {/* Bio */}
                              <p
                                className="text-xs text-gray-600 leading-[1.57em] line-clamp-2"
                                style={{
                                  fontFamily: "Inter",
                                  fontWeight: 400,
                                  fontSize: "12px",
                                  color: "#4E5562",
                                }}
                              >
                                {instructor.bio}
                              </p>
                            </div>
                          </div>

                          {/* Vertical Divider */}
                          <div className="w-px bg-gray-200 hidden lg:block"></div>

                          {/* Listing Info */}
                          <div className="w-full lg:w-40 p-4 flex flex-col justify-between">
                            {/* Top section with rating and badges (desktop only) */}
                            <div className="hidden lg:block space-y-2 lg:pt-6">
                              {/* Rating */}
                              <div className="flex items-center gap-1">
                                <Star
                                  size={14}
                                  className="text-orange-400 fill-current"
                                />
                                <span
                                  className="text-xs text-gray-900"
                                  style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "12px",
                                  }}
                                >
                                  {instructor.rating}
                                </span>
                                <span
                                  className="text-xs text-gray-500"
                                  style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "10px",
                                    color: "#6C727F",
                                  }}
                                >
                                  ({instructor.reviews})
                                </span>
                              </div>
                              {/* Badges */}
                              <div className="flex flex-col gap-1">
                                {instructor.verified && (
                                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#3D7A81] rounded text-white text-[11px] font-medium w-max">
                                    <Shield size={12} className="text-white" />
                                    <span>Verified</span>
                                  </div>
                                )}
                                {instructor.badges.includes(
                                  "Top Instructor"
                                ) && (
                                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[11px] font-medium w-max">
                                    <Award size={12} />
                                    <span>Top instructor</span>
                                  </div>
                                )}
                                {instructor.badges
                                  .filter(
                                    (b) =>
                                      b !== "Top Instructor" && b !== "Verified"
                                  )
                                  .map((badge, idx) => (
                                    <div
                                      key={idx}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[11px] font-medium w-max"
                                    >
                                      <span>{badge}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>

                            {/* Connect Button */}
                            <Button
                              className="flex items-center justify-center gap-1 w-full"
                              size="sm"
                              style={{
                                fontFamily: "Inter",
                                fontWeight: 500,
                                fontSize: "12px",
                              }}
                            >
                              <Mail size={14} className="text-white" />
                              <span>Connect</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              // Grid View (Figma Design)
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {instructors.map((instructor) => {
                  const AvatarIcon = instructor.avatar;

                  return (
                    <Link
                      key={instructor.id}
                      href={`/instructors/${instructor.id}`}
                      className="block"
                    >
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer">
                        {/* Body */}
                        <div className="flex gap-4 pb-6 border-b border-gray-200">
                          {/* Avatar */}
                          <div className="w-[100px] h-[110px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                            <img
                              src="/images/404/profile.jpg"
                              alt={`${instructor.name} avatar`}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 space-y-3 min-w-0">
                            {/* Name + Rating */}
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-lg font-semibold text-[#111827] truncate">
                                {instructor.name}
                              </h3>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Star
                                  size={14}
                                  className="text-[#FC9231] fill-current"
                                />
                                <span className="text-sm text-[#111827]">
                                  {instructor.rating}
                                </span>
                                <span className="text-xs text-[#6C727F]">
                                  ({instructor.reviews})
                                </span>
                              </div>
                            </div>

                            {/* Profession */}
                            <p className="text-sm font-semibold text-[#111827] truncate">
                              {instructor.specialties}
                            </p>

                            {/* Badge + Expertise */}
                            <div className="flex flex-wrap items-center gap-2">
                              {instructor.verified && (
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#3D7A81] rounded text-white text-xs font-medium">
                                  <Shield size={12} className="text-white" />
                                  <span>Verified</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Award size={14} className="text-[#333D4C]" />
                                <span className="text-sm text-[#333D4C]">
                                  8+ years experience
                                </span>
                              </div>
                            </div>

                            {/* Bio */}
                            <p className="text-sm text-[#4E5562] line-clamp-2 leading-relaxed">
                              {instructor.bio}
                            </p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-end justify-between pt-4 mt-auto">
                          {/* Price */}
                          <div className="flex-1">
                            <p className="text-xl font-semibold text-[#111827]">
                              From $
                              {instructor.budget === "$"
                                ? "30"
                                : instructor.budget === "$$"
                                ? "50"
                                : "80"}
                              .00
                            </p>
                            <p className="text-sm text-[#4E5562]">
                              Online / Offline
                            </p>
                          </div>

                          {/* Button */}
                          <Button size="md" className="flex-shrink-0">
                            Book a lesson
                          </Button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

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
