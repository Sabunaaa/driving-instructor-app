"use client";

import React from "react";
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
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Today's Schedule</h3>
        <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300">View Calendar</button>
      </div>

      <div className="space-y-6">
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="relative pl-8 pb-6 last:pb-0 border-l border-slate-700 last:border-0">
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-slate-800/50" />
            
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <img src={lesson.avatar} alt={lesson.student} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-white font-medium">{lesson.student}</h4>
                    <p className="text-slate-400 text-xs">{lesson.type}</p>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {lesson.time}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
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
