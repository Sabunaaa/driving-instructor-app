"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { InstructorDashboardNav } from "@/components/dashboard/instructor/InstructorDashboardNav";
import { ResponsiveCalendar } from "@/components/dashboard/instructor/ResponsiveCalendar";
import Button from "@/components/ui/Button";
import { Save, RotateCcw } from "lucide-react";
import { redirect } from "next/navigation";

export default function SchedulePage() {
  const { user } = useAuth();
  const isInstructor = user?.userType === "instructor";
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Students don't have schedule page, redirect to dashboard
  if (!isInstructor) {
    redirect("/dashboard");
  }

  const handleDateClick = (date: Date, hour: number) => {
    const dateStr = date.toISOString().split('T')[0];
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    const key = `${dateStr}_${timeStr}`;
    
    setAvailability(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // TODO: Save to backend
    setHasChanges(false);
    alert("Schedule saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Discard unsaved changes?")) {
      setAvailability({});
      setHasChanges(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20">
      <InstructorDashboardNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Schedule</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage your weekly availability.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={!hasChanges}
              className="text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!hasChanges}
              className="text-sm"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-200"></div>
              <span>Unavailable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-100 border-2 border-green-300"></div>
              <span>Available</span>
            </div>
          </div>

          <ResponsiveCalendar 
            availability={availability}
            onDateClick={handleDateClick}
          />
        </div>
      </div>
    </div>
  );
}
