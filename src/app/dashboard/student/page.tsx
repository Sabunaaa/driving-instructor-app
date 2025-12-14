"use client";

import React from "react";
import { NextLessonCard } from "@/components/dashboard/student/NextLessonCard";
import { QuickActions } from "@/components/dashboard/student/QuickActions";
import { DashboardNav } from "@/components/dashboard/student/DashboardNav";
import { StudentStats } from "@/components/dashboard/student/StudentStats";

export default function StudentDashboardPage() {
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
