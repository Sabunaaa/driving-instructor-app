"use client";

import React from "react";
import Link from "next/link";
// @ts-ignore
import { BadgeCheck, Award, Star, Mail, MapPin } from "lucide-react";
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

interface InstructorGridProps {
  instructors: Instructor[];
}

export const InstructorGrid: React.FC<InstructorGridProps> = ({
  instructors,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {instructors.map((instructor) => (
        <Link
          key={instructor.id}
          href={`/instructors/${instructor.id}`}
          className="block group"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col h-full cursor-pointer">
            {/* Body */}
            <div className="flex gap-4 pb-6 border-b border-gray-200">
              {/* Avatar with gradient and pagination dots */}
              <div className="w-[100px] h-[110px] rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <img
                  src="/images/404/profile.jpg"
                  alt={`${instructor.name} avatar`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                
                {/* Pagination dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {[1, 2, 3, 4].map((n, idx) => (
                    <div
                      key={n}
                      className={
                        `w-1 h-1 rounded-full transition-all duration-300 ` +
                        (idx === 0
                          ? "w-3 bg-white shadow-sm"
                          : "bg-white/70 hover:bg-white")
                      }
                    >
                    </div>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2 min-w-0">
                {/* Name with verification badge */}
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate"
                    style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "14px" }}>
                    {instructor.name}
                  </h3>
                  {instructor.verified && (
                    <BadgeCheck size={16} className="text-blue-600 fill-white flex-shrink-0" />
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin size={12} />
                  <span className="text-xs">{instructor.location}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-900 font-medium" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    {instructor.rating}
                  </span>
                  <span className="text-xs text-gray-500" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "10px" }}>
                    ({instructor.reviews})
                  </span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {instructor.verified && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-medium">
                      <BadgeCheck size={10} className="text-blue-600" />
                      <span>Verified</span>
                    </div>
                  )}
                  {instructor.badges.includes("Top Instructor") && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-medium">
                      <Award size={10} />
                      <span>Top instructor</span>
                    </div>
                  )}
                  {instructor.badges
                    .filter((b) => b !== "Top Instructor" && b !== "Verified")
                    .map((badge, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[10px] font-medium"
                      >
                        <span>{badge}</span>
                      </div>
                    ))}
                </div>

                {/* Profession */}
                <p className="text-xs font-medium text-gray-900 truncate" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                  {instructor.specialties}
                </p>

                {/* Bio */}
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed"
                  style={{ fontFamily: "Inter", fontWeight: 400, color: "#4E5562" }}>
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
              <Button 
                size="md" 
                className="flex items-center gap-1 flex-shrink-0 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
                style={{ fontFamily: "Inter", fontWeight: 500 }}
              >
                <Mail size={14} className="text-white" />
                <span>Book Now</span>
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
