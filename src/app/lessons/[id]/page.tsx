"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { getLessonsForInstructor, removeLesson } from "@/lib/lessons";

export default function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();

  const [notFound, setNotFound] = React.useState(false);
  const [lesson, setLesson] = React.useState(
    () => null as null | ReturnType<typeof getLessonsForInstructor>[number]
  );

  React.useEffect(() => {
    if (!user || !id) return;
    // Demo scope: instructor lessons only
    const list = getLessonsForInstructor(user.id);
    const match = list.find((l) => l.id === String(id));
    if (!match) setNotFound(true);
    else setLesson(match);
  }, [user, id]);

  if (!user) return null;

  if (notFound) {
    return (
      <main className="min-h-screen bg-[#F5F7FA]">
        <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Lesson not found
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              It may have been removed or the link is invalid.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Button asChild>
                {/* @ts-ignore */}
                <Link href="/lessons">Back to lessons</Link>
              </Button>
              <Button variant="outline" asChild>
                {/* @ts-ignore */}
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!lesson) return null;

  const cancel = () => {
    if (!user || !lesson) return;
    removeLesson(user.id, lesson.id);
    router.replace("/lessons");
  };

  const when = `${lesson.date} · ${lesson.time} · ${lesson.durationMins}m`;

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="mb-4">
          <a href="/lessons" className="text-sm text-gray-700 hover:underline">
            ← Back to lessons
          </a>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Lesson with {lesson.studentName}
          </h1>
          <p className="mt-2 text-gray-700">{when}</p>

          {lesson.notes && (
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-900">Notes</h2>
              <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                {lesson.notes}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              {/* @ts-ignore */}
              <Link
                href={`/instructor/schedule/new?student=${encodeURIComponent(
                  lesson.studentName
                )}`}
              >
                Reschedule
              </Link>
            </Button>
            <Button variant="outline" asChild>
              {/* @ts-ignore */}
              <Link
                href={`/instructor/students/message?student=${encodeURIComponent(
                  lesson.studentName
                )}`}
              >
                Message
              </Link>
            </Button>
            <Button variant="subtle" onClick={cancel}>
              Cancel lesson
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
