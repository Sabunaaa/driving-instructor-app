"use client";

import React from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import { User, Car, Calendar, BookOpen, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const studentFeatures = [
    {
      icon: Calendar,
      title: "My Lessons",
      description: "View and manage your driving lessons",
      color: "bg-blue-500",
    },
    {
      icon: BookOpen,
      title: "Learning Progress",
      description: "Track your driving skills progress",
      color: "bg-green-500",
    },
    {
      icon: User,
      title: "Find Instructors",
      description: "Browse and connect with instructors",
      color: "bg-purple-500",
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Manage your account preferences",
      color: "bg-gray-500",
    },
  ];

  const instructorFeatures = [
    {
      icon: User,
      title: "My Students",
      description: "Manage your student roster",
      color: "bg-blue-500",
    },
    {
      icon: Calendar,
      title: "Schedule",
      description: "View and manage lesson schedules",
      color: "bg-green-500",
    },
    {
      icon: Car,
      title: "Vehicle Management",
      description: "Manage your teaching vehicles",
      color: "bg-orange-500",
    },
    {
      icon: Settings,
      title: "Business Settings",
      description: "Configure rates and availability",
      color: "bg-gray-500",
    },
  ];

  const features =
    user.userType === "student" ? studentFeatures : instructorFeatures;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">
                {user.userType === "student"
                  ? "Ready to continue your driving journey?"
                  : "Manage your students and lessons from your dashboard."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon as any;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Demo Mode
                  </h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    This is a demo dashboard. In a real application, these
                    features would be fully functional with backend integration.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
