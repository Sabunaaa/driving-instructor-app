"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const RatesPage = () => {
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

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar activeItem="Business settings" />
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Rates
              </h1>
              <p className="text-gray-600">
                Configure your pricing and rates for lessons.
              </p>
            </div>

            {/* Content will go here */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default RatesPage;
