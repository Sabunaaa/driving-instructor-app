"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";

// Student components
import { NextLessonCard } from "@/components/dashboard/student/NextLessonCard";
import { QuickActions } from "@/components/dashboard/student/QuickActions";
import { DashboardNav } from "@/components/dashboard/student/DashboardNav";
import { StudentStats } from "@/components/dashboard/student/StudentStats";

// Instructor components
import { InstructorDashboardNav } from "@/components/dashboard/instructor/InstructorDashboardNav";
import { InstructorStats } from "@/components/dashboard/instructor/InstructorStats";
import { InstructorNextLessonCard } from "@/components/dashboard/instructor/InstructorNextLessonCard";
import { InstructorQuickActions } from "@/components/dashboard/instructor/InstructorQuickActions";

export default function DashboardPage() {
  const { user } = useAuth();
  const isInstructor = user?.userType === "instructor";

  if (isInstructor) {
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

  // Default: Student Dashboard
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20">
      <DashboardNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back! 👋</h1>
          <p className="text-gray-500 mt-1">Here&apos;s your driving progress.</p>
        </div>

        {/* Stats Overview */}
        <section>
          <StudentStats />
        </section>

        {/* Next Lesson - Hero Card */}
        <section>
          <NextLessonCard />
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
          <QuickActions />
        </section>
      </div>
    </div>
  );
}
