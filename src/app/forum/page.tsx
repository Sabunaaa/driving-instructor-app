"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Search, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ForumPage() {
  const topics = [
    {
      id: 1,
      title: "Best tips for nervous beginners",
      author: "Sarah J.",
      replies: 12,
      lastActivity: "2h",
    },
    {
      id: 2,
      title: "Manual vs automatic: which to learn first?",
      author: "Mike R.",
      replies: 8,
      lastActivity: "5h",
    },
    {
      id: 3,
      title: "Preparing students for the road test",
      author: "Admin",
      replies: 20,
      lastActivity: "1d",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Community Forum
            </h1>
            <p className="text-gray-600">
              Share tips, ask questions, and help others.
            </p>
          </div>
          <Button asChild>
            {/* @ts-ignore */}
            <Link href="/help/chat">Start a chat</Link>
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Search topics..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 divide-y">
          {topics.map((t) => (
            <div
              key={t.id}
              className="p-4 sm:p-5 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <Link
                  href="#"
                  className="text-gray-900 font-medium hover:underline line-clamp-1"
                >
                  {t.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  By {t.author} · {t.replies} replies · {t.lastActivity} ago
                </p>
              </div>
              <Button variant="outline" size="sm">
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} /> Reply
                </div>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end">
          <Link
            href="#"
            className="text-sm text-gray-700 hover:underline flex items-center gap-1"
          >
            View more <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
