"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { addLesson } from "@/lib/lessons";

export default function NewLessonPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-600">Loading…</div>}>
      <NewLessonInner />
    </Suspense>
  );
}

function NewLessonInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();

  const [form, setForm] = useState({
    studentName: params.get("student") || "",
    date: "",
    time: "",
    durationMins: 60,
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  // If the user is not an instructor, redirect them away – this page is instructor-only
  useEffect(() => {
    if (!user) return;
    if (user.userType !== "instructor") {
      // Send students to lessons page where guidance exists
      router.replace("/lessons");
    }
  }, [user, router]);

  if (!user) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName || !form.date || !form.time) return;
    setSaving(true);
    addLesson(user.id, {
      instructorId: user.id,
      studentName: form.studentName,
      date: form.date,
      time: form.time,
      durationMins: Number(form.durationMins) || 60,
      notes: form.notes,
    });
    // Navigate to lessons list so the newly created lesson is visible immediately
    setTimeout(() => {
      router.push("/lessons");
    }, 150);
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Schedule a Lesson</h1>
        <p className="text-gray-600 mt-1">
          Create a new lesson and notify your student.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 bg-white border border-gray-200 rounded-xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student name
            </label>
            <input
              value={form.studentName}
              onChange={(e) =>
                setForm((f) => ({ ...f, studentName: e.target.value }))
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="e.g., Alex K."
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm((f) => ({ ...f, time: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                value={form.durationMins}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    durationMins: Number(e.target.value),
                  }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              >
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Pick-up point, focus areas, etc."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving}>
              Save lesson
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => history.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
