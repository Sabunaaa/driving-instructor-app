"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreVertical, MapPin, Clock } from "lucide-react";

const lessons = [
  {
    id: 1,
    student: "Sarah Jenkins",
    type: "Practical Lesson",
    time: "09:00 AM - 11:00 AM",
    location: "Downtown Center",
    status: "Upcoming",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    student: "Michael Chen",
    type: "Highway Driving",
    time: "01:00 PM - 03:00 PM",
    location: "Westside Route",
    status: "Upcoming",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    student: "Emma Wilson",
    type: "Parking Practice",
    time: "04:00 PM - 05:00 PM",
    location: "Training Ground",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
  },
];

export const ScheduleTimeline = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Today&apos;s Schedule</h3>
      </div>

      <div className="space-y-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="relative pl-8 pb-6 last:pb-0 border-l border-gray-200 last:border-0">
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#F03D3D] ring-4 ring-white" />
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-red-200 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <Image 
                    src={lesson.avatar} 
                    alt={lesson.student} 
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                  <div>
                    <h4 className="text-gray-900 font-medium">{lesson.student}</h4>
                    <p className="text-gray-500 text-xs">{lesson.type}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F03D3D]" />
                  {lesson.time}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F03D3D]" />
                  {lesson.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
