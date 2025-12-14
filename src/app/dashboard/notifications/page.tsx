"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardNav } from "@/components/dashboard/student/DashboardNav";
import { InstructorDashboardNav } from "@/components/dashboard/instructor/InstructorDashboardNav";
import { NotificationsList } from "@/components/dashboard/NotificationsList";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationsPage() {
  const { user } = useAuth();
  const isInstructor = user?.userType === "instructor";
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications(user?.userType);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20">
      {isInstructor ? <InstructorDashboardNav /> : <DashboardNav />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated with your latest activities.</p>
        </div>
        
        <NotificationsList 
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onRemove={removeNotification}
        />
      </div>
    </div>
  );
}
