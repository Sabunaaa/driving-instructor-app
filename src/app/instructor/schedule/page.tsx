"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Calendar, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getLessonsForInstructor, getUpcoming } from "@/lib/lessons";

export default function InstructorSchedulePage() {
  const { user } = useAuth();
  const [upcoming, setUpcoming] = React.useState(
    () => [] as ReturnType<typeof getUpcoming>
  );

  React.useEffect(() => {
    if (!user || user.userType !== "instructor") return;
    const all = getLessonsForInstructor(user.id);
    setUpcoming(getUpcoming(all));
  }, [user]);

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Schedule & Availability
          </h1>
          <p className="text-gray-600 mt-1">
            Set weekly time slots and keep your calendar up to date to maximize
            bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Calendar size={20} className="text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Weekly Planner
              </h2>
            </div>
            <div className="border border-dashed border-gray-300 rounded-lg p-6 text-gray-500 text-sm">
              Sample calendar preview (demo): Mon 9–12, Wed 14–18, Fri 10–13
              available
            </div>
            <div className="mt-4 flex gap-3">
              <Button asChild>
                {/* @ts-ignore */}
                <Link href="/dashboard">Manage in Dashboard</Link>
              </Button>
              <Button asChild>
                {/* @ts-ignore */}
                <Link href="/instructor/schedule/new">Schedule a Lesson</Link>
              </Button>
              <Button variant="outline" asChild>
                {/* @ts-ignore */}
                <Link href="/for-instructors#schedule">Back to Guide</Link>
              </Button>
            </div>
          </div>

          <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock size={18} className="text-red-600" />
              <h3 className="font-semibold text-gray-900">Tips</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Open slots on evenings and weekends for more bookings.</li>
              <li>Enable calendar sync to avoid conflicts.</li>
              <li>Update weekly to stay on top of demand.</li>
            </ul>

            {user?.userType === "instructor" && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Your upcoming lessons
                  </h3>
                  <a
                    href="/lessons"
                    className="text-xs text-red-600 hover:underline"
                  >
                    View all
                  </a>
                </div>
                {upcoming.length === 0 ? (
                  <div className="text-xs text-gray-600">
                    None scheduled yet.{" "}
                    <a
                      className="text-red-600 hover:underline"
                      href="/instructor/schedule/new"
                    >
                      Create one
                    </a>
                    .
                  </div>
                ) : (
                  <ul className="divide-y border border-gray-200 rounded-lg overflow-hidden">
                    {upcoming.slice(0, 5).map((l) => (
                      <li key={l.id} className="p-3 text-xs">
                        <div className="font-medium text-gray-900 truncate">
                          {l.studentName}
                        </div>
                        <div className="text-gray-600">
                          {l.date} · {l.time} · {l.durationMins}m
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
