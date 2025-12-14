"use client";

import React from "react";
import { InstructorDashboardNav } from "@/components/dashboard/instructor/InstructorDashboardNav";

export default function InstructorStudentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20">
      <InstructorDashboardNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 mt-1">View and manage your students' progress.</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500">
          Student list will appear here.
        </div>
      </div>
    </div>
  );
}
