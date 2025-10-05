"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, DollarSign, Car } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const BusinessSettingsPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated or not an instructor
  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.userType !== "instructor") {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user || user.userType !== "instructor") {
    return <LoadingSpinner />;
  }

  const businessFeatures = [
    {
      icon: Calendar,
      title: "Schedule",
      description: "View and manage lesson schedules",
      color: "bg-green-500",
      href: "/business-settings/schedule",
    },
    {
      icon: DollarSign,
      title: "Rates",
      description: "Configure your pricing and rates",
      color: "bg-blue-500",
      href: "/business-settings/rates",
    },
    {
      icon: Car,
      title: "Vehicle Management",
      description: "Manage your teaching vehicles",
      color: "bg-orange-500",
      href: "/business-settings/vehicle",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar activeItem="Business settings" />
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Business settings
              </h1>
              <p className="text-gray-600">
                Manage your business information and preferences.
              </p>
            </div>

            {/* Business Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={feature.href}
                    href={feature.href}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
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
                  </Link>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BusinessSettingsPage;