"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Star, 
  ChevronDown, 
  SlidersHorizontal,
  Grid3X3,
  List,
  Heart,
  BadgeCheck,
  Clock,
  Car,
  X,
  ArrowUpDown
} from "lucide-react";

// Mock instructor data
const mockInstructors = [
  {
    id: 1,
    name: "გიორგი მამუკელაშვილი",
    avatar: "/images/404/profile.jpg",
    rating: 4.9,
    reviews: 127,
    price: 45,
    location: "თბილისი",
    transmission: "ავტომატიკა",
    experience: 8,
    badges: ["Top Rated", "Quick Response"],
    available: true,
    bio: "პროფესიონალი ინსტრუქტორი 8 წლიანი გამოცდილებით. სპეციალიზდება ნერვიულ მოსწავლეებზე.",
  },
  {
    id: 2,
    name: "ანა ბერიძე",
    avatar: "/images/404/profile.jpg",
    rating: 5.0,
    reviews: 89,
    price: 50,
    location: "თბილისი",
    transmission: "მექანიკა",
    experience: 12,
    badges: ["Verified", "Female Instructor"],
    available: true,
    bio: "გამოცდილი ინსტრუქტორი, რომელიც სწავლას სახალისო და სტრესის გარეშე პროცესად აქცევს.",
  },
  {
    id: 3,
    name: "დავით წულუკიძე",
    avatar: "/images/404/profile.jpg",
    rating: 4.7,
    reviews: 203,
    price: 40,
    location: "რუსთავი",
    transmission: "ავტომატიკა",
    experience: 5,
    badges: ["Budget Friendly"],
    available: false,
    bio: "ხელმისაწვდომი ფასი, მაღალი ხარისხი. გამოცდის ჩაბარების მაღალი მაჩვენებელი.",
  },
  {
    id: 4,
    name: "მარიამ ჯავახიშვილი",
    avatar: "/images/404/profile.jpg",
    rating: 4.8,
    reviews: 156,
    price: 55,
    location: "ბათუმი",
    transmission: "მექანიკა",
    experience: 10,
    badges: ["Premium", "Intensive Courses"],
    available: true,
    bio: "ინტენსიური კურსების სპეციალისტი. სწრაფი შედეგი გარანტირებული.",
  },
  {
    id: 5,
    name: "ლევან გოგიაშვილი",
    avatar: "/images/404/profile.jpg",
    rating: 4.6,
    reviews: 98,
    price: 35,
    location: "ქუთაისი",
    transmission: "ავტომატიკა",
    experience: 3,
    badges: ["New", "Flexible Schedule"],
    available: true,
    bio: "მოქნილი განრიგი, პაციენტური მიდგომა. იდეალური დამწყებთათვის.",
  },
  {
    id: 6,
    name: "ნინო კაპანაძე",
    avatar: "/images/404/profile.jpg",
    rating: 4.9,
    reviews: 178,
    price: 48,
    location: "თბილისი",
    transmission: "ავტომატიკა",
    experience: 7,
    badges: ["Top Rated", "Weekend Available"],
    available: true,
    bio: "შაბათ-კვირას ხელმისაწვდომი. სპეციალიზდება თავდაჯერებულობის აშენებაზე.",
  },
];

const locations = ["ყველა", "თბილისი", "რუსთავი", "ბათუმი", "ქუთაისი", "გორი"];
const transmissions = ["ყველა", "ავტომატიკა", "მექანიკა"];
const priceRanges = ["ყველა", "30-40₾", "40-50₾", "50₾+"];
const sortOptions = ["რეიტინგით", "ფასით (დაბალი)", "ფასით (მაღალი)", "გამოცდილებით"];

export default function FindInstructorsTest2Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("ყველა");
  const [selectedTransmission, setSelectedTransmission] = useState("ყველა");
  const [selectedPrice, setSelectedPrice] = useState("ყველა");
  const [sortBy, setSortBy] = useState("რეიტინგით");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Filter instructors
  const filteredInstructors = mockInstructors.filter((instructor) => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          instructor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "ყველა" || instructor.location === selectedLocation;
    const matchesTransmission = selectedTransmission === "ყველა" || instructor.transmission === selectedTransmission;
    
    let matchesPrice = true;
    if (selectedPrice === "30-40₾") matchesPrice = instructor.price >= 30 && instructor.price <= 40;
    else if (selectedPrice === "40-50₾") matchesPrice = instructor.price > 40 && instructor.price <= 50;
    else if (selectedPrice === "50₾+") matchesPrice = instructor.price > 50;
    
    return matchesSearch && matchesLocation && matchesTransmission && matchesPrice;
  });

  // Sort instructors
  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    if (sortBy === "რეიტინგით") return b.rating - a.rating;
    if (sortBy === "ფასით (დაბალი)") return a.price - b.price;
    if (sortBy === "ფასით (მაღალი)") return b.price - a.price;
    if (sortBy === "გამოცდილებით") return b.experience - a.experience;
    return 0;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedLocation("ყველა");
    setSelectedTransmission("ყველა");
    setSelectedPrice("ყველა");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedLocation !== "ყველა" || 
                           selectedTransmission !== "ყველა" || 
                           selectedPrice !== "ყველა" ||
                           searchQuery !== "";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Drive<span className="text-[#F03D3D]">Forward</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/for-instructors" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
              For Instructors
            </Link>
            <Link href="/login" className="text-sm font-medium px-4 py-2 bg-[#F03D3D] text-white rounded-full hover:bg-red-600 transition">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Search Section */}
      <section className="pt-28 pb-8 px-6 bg-gradient-to-b from-white to-[#FAFAFA]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            იპოვე შენი იდეალური ინსტრუქტორი
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            აღმოაჩინე ვერიფიცირებული ინსტრუქტორები შენს მახლობლად
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="flex-1 flex items-center px-5">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="მოძებნე სახელით ან ლოკაციით..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-4 px-3 text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                />
              </div>
              <button className="m-2 px-6 py-3 bg-[#F03D3D] text-white font-medium rounded-xl hover:bg-red-600 transition-colors">
                ძებნა
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-3">
              {/* Location */}
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/20 cursor-pointer transition"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc === "ყველა" ? "ლოკაცია" : loc}</option>
                  ))}
                </select>
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Transmission */}
              <div className="relative">
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/20 cursor-pointer transition"
                >
                  {transmissions.map(t => (
                    <option key={t} value={t}>{t === "ყველა" ? "გადაცემათა კოლოფი" : t}</option>
                  ))}
                </select>
                <Car className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Price */}
              <div className="relative">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/20 cursor-pointer transition"
                >
                  {priceRanges.map(p => (
                    <option key={p} value={p}>{p === "ყველა" ? "ფასი" : p}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#F03D3D] hover:bg-red-50 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                  გასუფთავება
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              ფილტრები
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-[#F03D3D] rounded-full" />
              )}
            </button>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative hidden sm:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none cursor-pointer transition"
                >
                  {sortOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc === "ყველა" ? "ლოკაცია" : loc}</option>
                ))}
              </select>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              >
                {transmissions.map(t => (
                  <option key={t} value={t}>{t === "ყველა" ? "გადაცემათა კოლოფი" : t}</option>
                ))}
              </select>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              >
                {priceRanges.map(p => (
                  <option key={p} value={p}>{p === "ყველა" ? "ფასი" : p}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              >
                {sortOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            ნაპოვნია <span className="font-semibold text-gray-900">{sortedInstructors.length}</span> ინსტრუქტორი
          </p>
        </div>

        {/* Grid/List View */}
        {sortedInstructors.length > 0 ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
          }>
            {sortedInstructors.map((instructor) => (
              <div
                key={instructor.id}
                className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative bg-gradient-to-br from-gray-100 to-gray-200 ${
                  viewMode === "list" ? "w-48 h-48" : "h-48"
                }`}>
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Availability Badge */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${
                    instructor.available 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {instructor.available ? "ხელმისაწვდომი" : "დაკავებული"}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(instructor.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition shadow-sm"
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.includes(instructor.id) ? "fill-[#F03D3D] text-[#F03D3D]" : "text-gray-600"}`} 
                    />
                  </button>
                </div>

                {/* Content */}
                <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#F03D3D] transition">
                        {instructor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {instructor.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{instructor.rating}</span>
                      <span className="text-xs text-gray-500">({instructor.reviews})</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {instructor.bio}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {instructor.badges.slice(0, 2).map((badge, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {badge}
                      </span>
                    ))}
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      {instructor.transmission}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {instructor.experience} წლის გამოცდილება
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-gray-900">{instructor.price}₾</span>
                      <span className="text-sm text-gray-500">/საათი</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href={`/instructors/${instructor.id}`}
                    className="mt-4 block w-full py-3 bg-gray-900 text-white text-center text-sm font-medium rounded-xl hover:bg-gray-800 transition"
                  >
                    პროფილის ნახვა
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ინსტრუქტორი ვერ მოიძებნა</h3>
            <p className="text-gray-500 mb-4">სცადე სხვა ფილტრების გამოყენება</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-[#F03D3D] text-white font-medium rounded-xl hover:bg-red-600 transition"
            >
              ფილტრების გასუფთავება
            </button>
          </div>
        )}
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Drive<span className="text-[#F03D3D]">Forward</span>
          </Link>
          <p className="text-gray-400 mt-4 text-sm">
            © 2025 DriveForward Inc. ყველა უფლება დაცულია.
          </p>
        </div>
      </footer>
    </div>
  );
}
