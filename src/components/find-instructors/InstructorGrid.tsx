"use client";

import React from "react";
import Link from "next/link";
// @ts-ignore
import { Shield, Award, Star } from "lucide-react";
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
                    <Star
                      size={14}
                      className="text-[#FC9231] fill-current"
                    />
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
      ))}
    </div>
  );
};
