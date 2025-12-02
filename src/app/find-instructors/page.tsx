"use client";

import SearchHeader from "@/components/find-instructors/SearchHeader";
import HorizontalFilterBar from "@/components/find-instructors/HorizontalFilterBar";
import InstructorList from "@/components/find-instructors/InstructorList";
import { useInstructorFilters } from "@/hooks/useInstructorFilters";
import { useMemo, useState, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data
const MOCK_INSTRUCTORS = [
  {
    id: 1,
    name: "Giorgi Beridze",
    rating: 4.9,
    reviewCount: 124,
    specialty: "Nervous Students",
    price: 35,
    tags: ["Manual", "Georgian & English"],
    imageUrl: undefined
  },
  {
    id: 2,
    name: "Nino Kalandadze",
    rating: 5.0,
    reviewCount: 89,
    specialty: "Defensive Driving",
    price: 40,
    tags: ["Automatic", "Weekend Availability"],
    imageUrl: undefined
  },
  {
    id: 3,
    name: "David Gelashvili",
    rating: 4.8,
    reviewCount: 56,
    specialty: "Test Preparation",
    price: 30,
    tags: ["Manual", "Evening Classes"],
    imageUrl: undefined
  },
  {
    id: 4,
    name: "Ana Makharadze",
    rating: 4.7,
    reviewCount: 32,
    specialty: "Beginner Basics",
    price: 25,
    tags: ["Automatic", "Morning Classes"],
    imageUrl: undefined
  },
  {
    id: 5,
    name: "Levan Maisuradze",
    rating: 4.9,
    reviewCount: 210,
    specialty: "Advanced Maneuvers",
    price: 45,
    tags: ["Manual", "Intensive Course"],
    imageUrl: undefined
  },
  {
    id: 6,
    name: "Mariam Tsereteli",
    rating: 4.6,
    reviewCount: 45,
    specialty: "Eco Driving",
    price: 28,
    tags: ["Automatic", "Student Discount"],
    imageUrl: undefined
  },
  {
    id: 7,
    name: "Sandro Kvaratskhelia",
    rating: 4.8,
    reviewCount: 150,
    specialty: "Highway Driving",
    price: 50,
    tags: ["Manual", "English Speaking"],
    imageUrl: undefined
  },
  {
    id: 8,
    name: "Tamuna Japaridze",
    rating: 4.9,
    reviewCount: 95,
    specialty: "Parking Expert",
    price: 35,
    tags: ["Automatic", "Patient"],
    imageUrl: undefined
  },
  {
    id: 9,
    name: "Luka Tsiklauri",
    rating: 4.7,
    reviewCount: 42,
    specialty: "Winter Driving",
    price: 45,
    tags: ["Manual", "4x4 Training"],
    imageUrl: undefined
  },
  {
    id: 10,
    name: "Elena Abashidze",
    rating: 5.0,
    reviewCount: 67,
    specialty: "Refresher Courses",
    price: 40,
    tags: ["Automatic", "Weekend Availability"],
    imageUrl: undefined
  },
  {
    id: 11,
    name: "Vakho Kipiani",
    rating: 4.5,
    reviewCount: 28,
    specialty: "Quick License",
    price: 30,
    tags: ["Manual", "Flexible Hours"],
    imageUrl: undefined
  },
  {
    id: 12,
    name: "Nika Giorgadze",
    rating: 4.9,
    reviewCount: 112,
    specialty: "City Driving",
    price: 35,
    tags: ["Manual", "Experienced"],
    imageUrl: undefined
  },
  {
    id: 13,
    name: "Salome Dolidze",
    rating: 4.7,
    reviewCount: 54,
    specialty: "Anxiety Management",
    price: 45,
    tags: ["Automatic", "Psychology Background"],
    imageUrl: undefined
  },
  {
    id: 14,
    name: "Irakli Beriashvili",
    rating: 4.8,
    reviewCount: 88,
    specialty: "Night Driving",
    price: 40,
    tags: ["Manual", "Late Hours"],
    imageUrl: undefined
  },
  {
    id: 15,
    name: "Teona Maisuradze",
    rating: 5.0,
    reviewCount: 41,
    specialty: "Beginner Friendly",
    price: 30,
    tags: ["Automatic", "Patient"],
    imageUrl: undefined
  },
  {
    id: 16,
    name: "Giga Samkharadze",
    rating: 4.6,
    reviewCount: 156,
    specialty: "Exam Route Expert",
    price: 55,
    tags: ["Manual", "High Pass Rate"],
    imageUrl: undefined
  },
  {
    id: 17,
    name: "Lia Kordzaia",
    rating: 4.9,
    reviewCount: 73,
    specialty: "Defensive Driving",
    price: 35,
    tags: ["Automatic", "Safety First"],
    imageUrl: undefined
  },
  {
    id: 18,
    name: "Beka Lomidze",
    rating: 4.7,
    reviewCount: 92,
    specialty: "Sport Driving",
    price: 60,
    tags: ["Manual", "Advanced"],
    imageUrl: undefined
  },
  {
    id: 19,
    name: "Natia Gogoladze",
    rating: 4.8,
    reviewCount: 65,
    specialty: "Theory & Practice",
    price: 25,
    tags: ["Automatic", "Comprehensive"],
    imageUrl: undefined
  },
  {
    id: 20,
    name: "Zurab Kiknadze",
    rating: 4.5,
    reviewCount: 34,
    specialty: "Weekend Intensive",
    price: 50,
    tags: ["Manual", "Fast Track"],
    imageUrl: undefined
  }
];

export default function FindInstructorsPage() {
  const { filters, updateFilter, toggleWeekday, resetFilters, hasActiveFilters } = useInstructorFilters();
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const filteredInstructors = useMemo(() => {
    let result = MOCK_INSTRUCTORS.filter(instructor => {
      if (filters.transmissionType && !instructor.tags.includes(filters.transmissionType)) {
        return false;
      }
      if (instructor.price < filters.budget[0] || instructor.price > filters.budget[1]) {
        return false;
      }
      return true;
    });

    // Sort logic
    if (sortBy === 'price_low') {
        result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
        result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE);
  const currentInstructors = filteredInstructors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <SearchHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        <HorizontalFilterBar 
            filters={filters}
            updateFilter={updateFilter}
            toggleWeekday={toggleWeekday}
            resetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
        />

        {/* Results Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div>
            <h2 className="text-lg font-bold text-gray-900">Available Instructors</h2>
            <p className="text-sm text-gray-500">Found {filteredInstructors.length} instructors matching your criteria</p>
            </div>
            
            <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
            <div className="relative">
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/10 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                    <option value="recommended">Recommended</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            </div>
        </div>

        <InstructorList instructors={currentInstructors} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                  currentPage === page
                    ? "bg-[#F03D3D] text-white shadow-lg shadow-red-500/20"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
        
        {/* Empty State */}
        {filteredInstructors.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SlidersHorizontal className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No instructors found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">We couldn't find any instructors matching your current filters. Try adjusting your search criteria.</p>
                <button 
                    onClick={resetFilters}
                    className="px-6 py-2 bg-[#F03D3D] text-white rounded-xl font-bold hover:bg-[#d62f2f] transition"
                >
                    Clear All Filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
}
