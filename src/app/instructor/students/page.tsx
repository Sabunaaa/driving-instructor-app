"use client";

import Link from "next/link";
import { Calendar, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { getLessonsForInstructor } from "@/lib/lessons";

export default function InstructorStudentsPage() {
  const { user } = useAuth();
  const seed = useMemo(
    () => [
      { id: 101, name: "Alex K." },
      { id: 102, name: "Maya R." },
    ],
    []
  );

  const [rows, setRows] = useState(
    seed.map((s) => ({ id: s.id, name: s.name, lessons: 0, nextLesson: "—" }))
  );

  useEffect(() => {
    if (!user) return;
    const lessons = getLessonsForInstructor(user.id);
    const now = new Date();
    const map: Record<string, { count: number; next?: Date }> = {};
    for (const s of seed) {
      map[s.name] = { count: 0 };
    }
    for (const l of lessons) {
      const name = l.studentName || "Unknown";
      const when = new Date(`${l.date}T${l.time}`);
      if (!map[name]) map[name] = { count: 0 };
      map[name].count += 1;
      if (when > now && (!map[name].next || when < map[name].next!)) {
        map[name].next = when;
      }
    }
    const list = Object.keys(map).map((name, idx) => {
      const { count, next } = map[name];
      const nextStr = next
        ? next.toLocaleString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })
        : "—";
      // Try to keep existing ids for seeded students for stable keys
      const seedMatch = seed.find((s) => s.name === name);
      return {
        id: seedMatch ? seedMatch.id : 1000 + idx,
        name,
        lessons: count,
        nextLesson: nextStr,
      };
    });
    setRows(list);
  }, [user, seed]);

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Students</h1>
        <p className="text-gray-600 mb-6">
          Manage student details and lesson history.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Lessons</th>
                <th className="py-3 px-4">Next lesson</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((s) => (
                <tr key={s.id} className="text-sm">
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {s.name}
                  </td>
                  <td className="py-3 px-4">{s.lessons}</td>
                  <td className="py-3 px-4">{s.nextLesson}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        {/* @ts-ignore */}
                        <Link
                          href={`/instructor/schedule/new?student=${encodeURIComponent(
                            s.name
                          )}`}
                        >
                          <Calendar size={14} />
                          <span className="ml-2">Schedule</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        {/* @ts-ignore */}
                        <Link
                          href={`/instructor/students/message?student=${encodeURIComponent(
                            s.name
                          )}`}
                        >
                          <MessageSquare size={14} />
                          <span className="ml-2">Message</span>
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
