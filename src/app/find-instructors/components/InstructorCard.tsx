"use client";

import React from "react";
import Link from "next/link";
// @ts-ignore
import { Star, Shield, Award, Mail, Bookmark } from "lucide-react";
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
  avatar: any; // Icon component
  verified: boolean;
  budget: string;
  features: string[];
  images: any[];
}

interface InstructorCardProps {
  instructor: Instructor;
  viewMode: "list" | "grid";
}

const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  viewMode,
}) => {
  const AvatarIcon = instructor.avatar;

  if (viewMode === "list") {
    return (
      <Link
        href={`/instructors/${instructor.id}`}
        className="block"
      >
        <div className="flex flex-col lg:flex-row bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
          {/* Image Gallery */}
          <div className="w-full h-40 lg:w-[220px] lg:h-[180px] bg-gray-100 relative flex items-center justify-center overflow-hidden">
            {/* Instructor photo */}
            <img
              src="/images/404/profile.jpg"
              alt={`${instructor.name} photo`}
              className="w-full h-full object-cover"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/16"></div>

            {/* Pagination numbers (static for now) */}
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
              {/* Contractor Info */}
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
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    {instructor.name}
                  </h3>
                </div>

                {/* Mobile: Rating next to name */}
                <div className="flex items-center gap-1 lg:hidden">
                  <Star size={14} className="text-orange-400 fill-current" />
                  <span
                    className="text-xs text-gray-900"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "12px",
                    }}
                  >
                    {instructor.rating}
                  </span>
                  <span
                    className="text-[10px] text-gray-500"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                    }}
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
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
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
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-orange-400 fill-current" />
                  <span
                    className="text-xs text-gray-900"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "12px",
                    }}
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
                {/* Badges */}
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
                style={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "12px",
                }}
              >
                <Mail size={14} className="text-white" />
                <span>Connect</span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid View
  return (
    <Link
      href={`/instructors/${instructor.id}`}
      className="block"
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer">
        {/* Body */}
        <div className="flex gap-4 pb-6 border-b border-gray-200">
          {/* Avatar */}
          <div className="w-[100px] h-[110px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <img
              src="/images/404/profile.jpg"
              alt={`${instructor.name} avatar`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-3 min-w-0">
            {/* Name + Rating */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#111827] truncate">
                {instructor.name}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star size={14} className="text-[#FC9231] fill-current" />
                <span className="text-sm text-[#111827]">
                  {instructor.rating}
                </span>
                <span className="text-xs text-[#6C727F]">
                  ({instructor.reviews})
                </span>
              </div>
            </div>

            {/* Profession */}
            <p className="text-sm font-semibold text-[#111827] truncate">
              {instructor.specialties}
            </p>

            {/* Badge + Expertise */}
            <div className="flex flex-wrap items-center gap-2">
              {instructor.verified && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#3D7A81] rounded text-white text-xs font-medium">
                  <Shield size={12} className="text-white" />
                  <span>Verified</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Award size={14} className="text-[#333D4C]" />
                <span className="text-sm text-[#333D4C]">
                  8+ years experience
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-[#4E5562] line-clamp-2 leading-relaxed">
              {instructor.bio}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between pt-4 mt-auto">
          {/* Price */}
          <div className="flex-1">
            <p className="text-xl font-semibold text-[#111827]">
              From $
              {instructor.budget === "$"
                ? "30"
                : instructor.budget === "$$"
                ? "50"
                : "80"}
              .00
            </p>
            <p className="text-sm text-[#4E5562]">Online / Offline</p>
          </div>

          {/* Button */}
          <Button size="md" className="flex-shrink-0">
            Book a lesson
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default InstructorCard;
