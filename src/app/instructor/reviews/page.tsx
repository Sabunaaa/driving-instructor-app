"use client";

import { Star, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function InstructorReviewsPage() {
  const reviews = [
    {
      name: "A. K.",
      rating: 5,
      comment: "Patient and clear! I passed first try.",
      date: "Sep 2025",
    },
    {
      name: "D. M.",
      rating: 4,
      comment: "Great tips for parking.",
      date: "Aug 2025",
    },
  ];
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Reviews</h1>
        <p className="text-gray-600 mb-6">
          Respond to feedback and improve your profile.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 divide-y">
          {reviews.map((r, i) => (
            <div key={i} className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={16}
                      className={
                        s < r.rating
                          ? "text-yellow-500 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{r.date}</span>
              </div>
              <p className="mt-2 text-gray-800">{r.comment}</p>
              <div className="mt-3">
                <Button variant="outline" size="sm">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} /> Reply
                  </div>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
