"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { getLessonsForInstructor, getUpcoming } from "@/lib/lessons";

export default function LessonsPage() {
  const { user } = useAuth();

  // IMPORTANT: Hooks must run unconditionally on every render.
  // Keep state/effects above any early returns.
  const [upcoming, setUpcoming] = React.useState(
    () => [] as ReturnType<typeof getUpcoming>
  );
  const [past, setPast] = React.useState<typeof upcoming>([]);

  React.useEffect(() => {
    if (!user) return;
    if (user.userType === "instructor") {
      const all = getLessonsForInstructor(user.id);
      const up = getUpcoming(all);
      setUpcoming(up);
      const nowTs = Date.now();
      const prev = all
        .filter((l) => new Date(`${l.date}T${l.time}`).getTime() < nowTs)
        .sort(
          (a, b) =>
            new Date(`${b.date}T${b.time}`).getTime() -
            new Date(`${a.date}T${a.time}`).getTime()
        );
      setPast(prev);
    } else {
      setUpcoming([]);
      setPast([]);
    }
  }, [user]);

  // Render a lightweight loading state while user is resolving
  if (!user) {
    return (
      <main className="min-h-screen bg-[#F5F7FA]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-5xl">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-gray-700">Loading…</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lessons</h1>
            <p className="text-gray-600 mt-1">
              {user.userType === "instructor"
                ? "Manage upcoming and past lessons."
                : "Your scheduled and completed lessons will appear here."}
            </p>
          </div>
          {user.userType === "instructor" && (
            <Button asChild>
              {/* @ts-ignore */}
              <Link href="/instructor/schedule/new">Schedule a lesson</Link>
            </Button>
          )}
        </div>

        {user.userType === "student" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-700">
            <p>
              You don’t have any lessons yet.{" "}
              <a
                href="/find-instructors"
                className="text-red-600 hover:underline"
              >
                Find instructors
              </a>{" "}
              to book your first lesson.
            </p>
          </div>
        )}

        {user.userType === "instructor" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-white border border-gray-200 rounded-xl">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Upcoming
                </h2>
              </div>
              {upcoming.length === 0 ? (
                <div className="p-4 text-sm text-gray-600">
                  No upcoming lessons.{" "}
                  <a
                    href="/instructor/schedule/new"
                    className="text-red-600 hover:underline"
                  >
                    Create one
                  </a>
                  .
                </div>
              ) : (
                <ul className="divide-y">
                  {upcoming.map((l) => (
                    <li
                      key={l.id}
                      className="p-4 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <Link
                          href={`/lessons/${l.id}`}
                          className="font-medium text-gray-900 hover:underline"
                        >
                          {l.studentName}
                        </Link>
                        <div className="text-sm text-gray-600">
                          {l.date} · {l.time} · {l.durationMins}m
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Link
                          href={`/lessons/${l.id}`}
                          className="text-sm text-gray-700 hover:underline"
                        >
                          Details
                        </Link>
                        <Link
                          href={`/instructor/students/message?student=${encodeURIComponent(
                            l.studentName
                          )}`}
                          className="text-sm text-gray-700 hover:underline"
                        >
                          Message
                        </Link>
                        <Link
                          href={`/instructor/schedule/new?student=${encodeURIComponent(
                            l.studentName
                          )}`}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Reschedule
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="bg-white border border-gray-200 rounded-xl">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Past</h2>
              </div>
              {past.length === 0 ? (
                <div className="p-4 text-sm text-gray-600">
                  No past lessons.
                </div>
              ) : (
                <ul className="divide-y">
                  {past.map((l) => (
                    <li
                      key={l.id}
                      className="p-4 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <Link
                          href={`/lessons/${l.id}`}
                          className="font-medium text-gray-900 hover:underline"
                        >
                          {l.studentName}
                        </Link>
                        <div className="text-sm text-gray-600">
                          {l.date} · {l.time} · {l.durationMins}m
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Link
                          href={`/lessons/${l.id}`}
                          className="text-sm text-gray-700 hover:underline"
                        >
                          Details
                        </Link>
                        <Link
                          href={`/instructor/schedule/new?student=${encodeURIComponent(
                            l.studentName
                          )}`}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Schedule again
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
