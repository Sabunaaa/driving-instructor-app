"use client";

import ModernFilterBar from "@/components/find-instructors-test/ModernFilterBar";
import ModernInstructorGrid from "@/components/find-instructors-test/ModernInstructorGrid";
import { Map } from "lucide-react";

export default function FindInstructorsTestPage() {
  return (
    <div className="min-h-screen bg-white">
      <ModernFilterBar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Driving Instructors in <span className="text-[#F03D3D]">Manchester</span>
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition text-sm font-medium shadow-lg shadow-gray-900/20">
            <Map className="w-4 h-4" />
            Show Map
          </button>
        </div>

        <ModernInstructorGrid />
        
        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 font-medium text-gray-900 transition">
            Show more instructors
          </button>
        </div>
      </main>
    </div>
  );
}
