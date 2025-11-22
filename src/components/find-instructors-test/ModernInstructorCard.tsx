"use client";

import { Star, Heart, ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";

interface InstructorProps {
  name: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  image: string;
  tags: string[];
  isSuper?: boolean;
}

const ModernInstructorCard = ({ name, rating, reviews, price, location, image, tags, isSuper }: InstructorProps) => {
  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 mb-3">
        <div className="absolute top-3 right-3 z-10">
          <button className="p-2 rounded-full bg-white/80 hover:bg-white hover:scale-110 transition backdrop-blur-sm">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        {isSuper && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm text-xs font-bold shadow-sm border border-gray-100">
              SUPER INSTRUCTOR
            </span>
          </div>
        )}
        {/* Placeholder for Image - using colored div for now if no image */}
        <div className={`w-full h-full bg-gradient-to-br ${image} group-hover:scale-105 transition duration-500`} />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#F03D3D] transition">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-black text-black" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500 text-sm">({reviews})</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm">{location}</p>
        
        <div className="flex gap-2 py-1">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-baseline gap-1 mt-2">
          <span className="font-bold text-lg">£{price}</span>
          <span className="text-gray-600">/ hour</span>
        </div>
      </div>
    </div>
  );
};

export default ModernInstructorCard;
