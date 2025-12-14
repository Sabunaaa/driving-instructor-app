"use client";

import React from "react";
import { InstructorDashboardNav } from "@/components/dashboard/instructor/InstructorDashboardNav";
import { InstructorStats } from "@/components/dashboard/instructor/InstructorStats";
import { InstructorNextLessonCard } from "@/components/dashboard/instructor/InstructorNextLessonCard";
import { InstructorQuickActions } from "@/components/dashboard/instructor/InstructorQuickActions";

export default function InstructorDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20">
      <InstructorDashboardNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your schedule and students.</p>
        </div>

        {/* Stats Overview */}
        <section>
          <InstructorStats />
        </section>

        {/* Next Lesson - Hero Card */}
        <section>
          <InstructorNextLessonCard />
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
          <InstructorQuickActions />
        </section>
      </div>
    </div>
  );
}
