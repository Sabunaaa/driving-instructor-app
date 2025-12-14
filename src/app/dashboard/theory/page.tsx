"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardNav } from "@/components/dashboard/student/DashboardNav";
import { ProgressOverview } from "@/components/dashboard/student/ProgressOverview";
import { redirect } from "next/navigation";

export default function TheoryPage() {
  const { user } = useAuth();
  const isInstructor = user?.userType === "instructor";

  // Instructors don't have theory page, redirect to dashboard
  if (isInstructor) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20">
      <DashboardNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Theory & Progress</h1>
          <p className="text-gray-500 mt-1">Track your learning journey and theory test preparation.</p>
        </div>

        <section>
          <ProgressOverview />
        </section>
      </div>
    </div>
  );
}
