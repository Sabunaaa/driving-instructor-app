"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import Link from "next/link";
import Image from "next/image";

const ProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) router.push("/login");
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

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar activeItem="My profile" />
          <main className="flex-1">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-3xl font-semibold text-gray-900">
                My profile
              </h1>
              <Link
                href="/account-settings"
                className="px-4 py-2 rounded-lg bg-[#F03D3D] text-white border border-[#F03D3D] text-sm font-medium hover:opacity-90"
              >
                Edit profile
              </Link>
            </div>

            {/* Header card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/404/profile.jpg"
                    alt="Profile"
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user.firstName || user.lastName
                      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
                      : user.name}
                  </h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {user.userType}
                  </p>
                </div>
              </div>
            </div>

            {/* Details grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileRow
                  label="First name"
                  value={user.firstName || (user.name?.split(" ")[0] ?? "—")}
                />
                <ProfileRow
                  label="Last name"
                  value={
                    user.lastName ||
                    user.name?.split(" ").slice(1).join(" ") ||
                    "—"
                  }
                />
                <ProfileRow label="Email address" value={user.email || "—"} />
                <ProfileRow label="Phone number" value={user.phone || "—"} />
                <ProfileRow
                  label="Languages you speak"
                  value={user.languages || "—"}
                />
                <ProfileRow
                  label="Date of birth"
                  value={user.dateOfBirth || "—"}
                />
                <ProfileRow label="City" value={user.city || "—"} />
                <ProfileRow
                  label="Transmission"
                  value={
                    user.transmission
                      ? user.transmission.charAt(0).toUpperCase() +
                        user.transmission.slice(1)
                      : "—"
                  }
                />
                <ProfileRow label="Address" value={user.address || "—"} />
              </div>
              <div className="mt-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  About
                </h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {user.bio || "No bio yet."}
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>
      <div className="h-11 flex items-center px-3 rounded-md bg-gray-50 border border-gray-200 text-sm text-gray-900">
        {value}
      </div>
    </div>
  );
}

export default ProfilePage;
