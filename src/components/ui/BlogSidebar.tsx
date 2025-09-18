"use client";

import Image from "next/image";
import React from "react";

type Category = { label: string; count: number; href?: string };

const defaultCategories: Category[] = [
  { label: "All topics", count: 130 },
  { label: "Healthcare system", count: 8 },
  { label: "Hospital quality", count: 5 },
  { label: "Advertising", count: 10 },
  { label: "Medical industry", count: 9 },
  { label: "Life sciences", count: 4 },
  { label: "Herbal medicine", count: 12 },
  { label: "Upcoming events", count: 3 },
  { label: "Family medicine", count: 3 },
];

export default function BlogSidebar({
  categories = defaultCategories,
}: {
  categories?: Category[];
}) {
  return (
    <aside className="space-y-8">
      {/* Categories */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Categories</h2>
        <ul className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {categories.map((c, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-4 py-3"
            >
              <a
                href={c.href || "#"}
                className="text-gray-800 hover:text-gray-900"
              >
                {c.label}
              </a>
              <span className="text-sm text-gray-500">({c.count})</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Show more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m6 9 6 6 6-6"
            />
          </svg>
        </button>
      </section>

      {/* Subscribe */}
      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mx-auto mb-3 flex -space-x-2">
          {/* Small avatar group */}
          <div className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full ring-2 ring-white bg-gray-200">
            <Image
              src="/images/404/404.png"
              alt="avatar"
              width={28}
              height={28}
              className="object-cover"
            />
          </div>
          <div className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full ring-2 ring-white bg-gray-200">
            <Image
              src="/images/404/404.png"
              alt="avatar"
              width={28}
              height={28}
              className="object-cover"
            />
          </div>
        </div>
        <h3 className="mb-3 text-center text-base font-semibold text-gray-900">
          Stay updated with Finder
        </h3>
        <form
          action="#"
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="email"
            required
            placeholder="Your email"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none ring-1 ring-transparent placeholder:text-gray-400 focus:border-gray-300 focus:ring-gray-200"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-800"
          >
            Subscribe
          </button>
        </form>
      </section>
    </aside>
  );
}
