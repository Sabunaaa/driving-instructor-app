"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import {
  getLessonsForInstructor,
  getUpcoming,
  removeLesson,
} from "@/lib/lessons";

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // IMPORTANT: Hooks must run unconditionally on every render.
  // Keep state/effects above any early returns.
  const [upcoming, setUpcoming] = React.useState<
    ReturnType<typeof getUpcoming>
  >([]);
  const [recent, setRecent] = React.useState<typeof upcoming>([]);

  React.useEffect(() => {
    if (!user) return;
    if (user.userType === "instructor") {
      const list = getLessonsForInstructor(user.id);
      const up = getUpcoming(list);
      setUpcoming(up);
      // If none upcoming, show up to 3 most recent past lessons as context
      if (up.length === 0 && list.length > 0) {
        const nowTs = Date.now();
        const past = list
          .filter((l) => new Date(`${l.date}T${l.time}`).getTime() < nowTs)
          .sort(
            (a, b) =>
              new Date(`${b.date}T${b.time}`).getTime() -
              new Date(`${a.date}T${a.time}`).getTime()
          )
          .slice(0, 3);
        setRecent(past);
      } else {
        setRecent([]);
      }
    }
  }, [user]);

  const cancelLesson = (id: string) => {
    if (!user) return;
    removeLesson(user.id, id);
    const list = getLessonsForInstructor(user.id);
    setUpcoming(getUpcoming(list));
  };


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


            {user.userType === "instructor" && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Upcoming lessons
                </h2>
                {upcoming.length === 0 ? (
                  recent.length > 0 ? (
                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="p-4 border-b">
                        <p className="text-sm text-gray-700">
                          No upcoming lessons. Here are your recent lessons:
                        </p>
                      </div>
                      <div className="divide-y">
                        {recent.map((l) => (
                          <div
                            key={l.id}
                            className="p-4 flex items-center justify-between"
                          >
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {l.studentName}
                              </div>
                              <div className="text-gray-600">
                                {l.date} · {l.time} · {l.durationMins}m
                              </div>
                            </div>
                            <a
                              href="/business-settings/schedule"
                              className="text-sm text-red-600 hover:underline"
                            >
                              Schedule another
                            </a>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-right">
                        <a
                          href="/lessons"
                          className="text-sm text-gray-700 hover:underline"
                        >
                          View all lessons
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-700 flex items-center justify-between">
                      <div>
                        No upcoming lessons yet.
                        <a
                          href="/business-settings/schedule"
                          className="text-red-600 hover:underline ml-1"
                        >
                          Create one now
                        </a>
                        .
                      </div>
                      <a
                        href="/business-settings/schedule"
                        className="rounded-lg font-medium transition-colors bg-[#F03D3D] border border-[#F03D3D] text-white hover:opacity-90 px-3 py-2 text-sm"
                      >
                        Schedule a lesson
                      </a>
                    </div>
                  )
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl divide-y">
                    {upcoming.map((l) => (
                      <div
                        key={l.id}
                        className="p-4 flex items-center justify-between"
                      >
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {l.studentName}
                          </div>
                          <div className="text-gray-600">
                            {l.date} · {l.time} · {l.durationMins}m
                          </div>
                        </div>
                        <button
                          onClick={() => cancelLesson(l.id)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {user.userType === "student" && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Upcoming lessons
                </h2>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-700 flex items-center justify-between">
                  <div>
                    You don’t have any scheduled lessons yet.
                    <a
                      href="/find-instructors"
                      className="text-red-600 hover:underline ml-1"
                    >
                      Find instructors
                    </a>
                    <span className="mx-1">or</span>
                    <a href="/help" className="text-red-600 hover:underline">
                      visit Help Center
                    </a>
                    .
                  </div>
                  <a
                    href="/find-instructors"
                    className="rounded-lg font-medium transition-colors bg-[#F03D3D] border border-[#F03D3D] text-white hover:opacity-90 px-3 py-2 text-sm"
                  >
                    Browse instructors
                  </a>
                </div>
              </div>
            )}

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
