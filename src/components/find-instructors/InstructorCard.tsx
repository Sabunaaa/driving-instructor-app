"use client";

import React from "react";
import Link from "next/link";
// @ts-ignore
import { Bookmark, Shield, Award, Mail, Star } from "lucide-react";
import Button from "@/components/ui/Button";

interface Instructor {
  id: number;
  name: string;
  location: string;
  specialties: string;
  bio: string;
  rating: number;
  reviews: number;
  badges: string[];
  verified: boolean;
  budget: string;
}

interface InstructorCardProps {
  instructor: Instructor;
}

const InstructorCardComponent: React.FC<InstructorCardProps> = ({
  instructor,
}) => {
  return (
    <Link
      href={`/instructors/${instructor.id}`}
      className="block"
    >
      <div className="flex flex-col lg:flex-row bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        {/* Image Gallery */}
        <div className="w-full h-40 lg:w-[220px] lg:h-[180px] bg-gray-100 relative flex items-center justify-center overflow-hidden">
          <img
            src="/images/404/profile.jpg"
            alt={`${instructor.name} photo`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/16"></div>

          {/* Pagination numbers */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {[1, 2, 3, 4].map((n, idx) => (
              <div
                key={n}
                className={
                  `w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium border ` +
                  (idx === 0
                    ? "bg-black text-white border-black"
                    : "bg-white/90 text-black border-black/80")
                }
              >
                {n}
              </div>
            ))}
          </div>

          {/* Bookmark button */}
          <button className="absolute top-3 right-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
            <Bookmark
              size={16}
              className="text-gray-600 hover:text-red-500 transition-colors duration-200"
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Main Content Area */}
          <div className="flex-1 p-4">
            <div className="space-y-2">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src="/images/404/profile.jpg"
                    alt={`${instructor.name} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="text-sm font-semibold text-gray-900 leading-5"
                  style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px" }}
                >
                  {instructor.name}
                </h3>
              </div>

              {/* Mobile: Rating next to name */}
              <div className="flex items-center gap-1 lg:hidden">
                <Star
                  size={14}
                  className="text-orange-400 fill-current"
                />
                <span
                  className="text-xs text-gray-900"
                  style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px" }}
                >
                  {instructor.rating}
                </span>
                <span
                  className="text-[10px] text-gray-500"
                  style={{ fontFamily: "Inter", fontWeight: 400 }}
                >
                  ({instructor.reviews})
                </span>
              </div>

              {/* Mobile: Badges under name */}
              <div className="flex flex-wrap items-center gap-2 lg:hidden">
                {instructor.verified && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#3D7A81] rounded text-white text-[10px] font-medium">
                    <Shield size={12} className="text-white" />
                    <span>Verified</span>
                  </div>
                )}
                {instructor.badges.includes("Top Instructor") && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-medium">
                    <Award size={12} />
                    <span>Top instructor</span>
                  </div>
                )}
                {instructor.badges
                  .filter((b) => b !== "Top Instructor" && b !== "Verified")
                  .map((badge, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium"
                    >
                      <span>{badge}</span>
                    </div>
                  ))}
              </div>

              {/* Services */}
              <p
                className="text-xs font-medium text-gray-900 leading-[1.43em]"
                style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "12px" }}
              >
                {instructor.specialties}
              </p>

              {/* Bio */}
              <p
                className="text-xs text-gray-600 leading-[1.57em] line-clamp-2"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "#4E5562",
                }}
              >
                {instructor.bio}
              </p>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-gray-200 hidden lg:block"></div>

          {/* Listing Info */}
          <div className="w-full lg:w-40 p-4 flex flex-col justify-between">
            {/* Top section with rating and badges (desktop only) */}
            <div className="hidden lg:block space-y-2 lg:pt-6">
              <div className="flex items-center gap-1">
                <Star
                  size={14}
                  className="text-orange-400 fill-current"
                />
                <span
                  className="text-xs text-gray-900"
                  style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px" }}
                >
                  {instructor.rating}
                </span>
                <span
                  className="text-xs text-gray-500"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "10px",
                    color: "#6C727F",
                  }}
                >
                  ({instructor.reviews})
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {instructor.verified && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#3D7A81] rounded text-white text-[11px] font-medium w-max">
                    <Shield size={12} className="text-white" />
                    <span>Verified</span>
                  </div>
                )}
                {instructor.badges.includes("Top Instructor") && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[11px] font-medium w-max">
                    <Award size={12} />
                    <span>Top instructor</span>
                  </div>
                )}
                {instructor.badges
                  .filter((b) => b !== "Top Instructor" && b !== "Verified")
                  .map((badge, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[11px] font-medium w-max"
                    >
                      <span>{badge}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Connect Button */}
            <Button
              className="flex items-center justify-center gap-1 w-full"
              size="sm"
              style={{ fontFamily: "Inter", fontWeight: 500, fontSize: "12px" }}
            >
              <Mail size={14} className="text-white" />
              <span>Connect</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Memoized component to prevent unnecessary re-renders
export const InstructorCard = React.memo(InstructorCardComponent, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return (
    prevProps.instructor.id === nextProps.instructor.id &&
    prevProps.instructor.name === nextProps.instructor.name &&
    prevProps.instructor.rating === nextProps.instructor.rating &&
    prevProps.instructor.reviews === nextProps.instructor.reviews
  );
});
