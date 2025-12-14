"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", 
  "04:00 PM", "05:00 PM", "06:00 PM"
];

const appointments = [
  {
    day: "Mon",
    time: "09:00 AM",
    duration: 2,
    student: "Sarah Jenkins",
    type: "Practical Lesson",
    color: "bg-blue-100 border-blue-200 text-blue-700"
  },
  {
    day: "Mon",
    time: "01:00 PM",
    duration: 2,
    student: "Michael Chen",
    type: "Highway Driving",
    color: "bg-purple-100 border-purple-200 text-purple-700"
  },
  {
    day: "Wed",
    time: "10:00 AM",
    duration: 1,
    student: "Emma Wilson",
    type: "Parking",
    color: "bg-emerald-100 border-emerald-200 text-emerald-700"
  },
  {
    day: "Thu",
    time: "02:00 PM",
    duration: 2,
    student: "David Miller",
    type: "Test Prep",
    color: "bg-orange-100 border-orange-200 text-orange-700"
  },
  {
    day: "Fri",
    time: "09:00 AM",
    duration: 2,
    student: "Sarah Jenkins",
    type: "Practical Lesson",
    color: "bg-blue-100 border-blue-200 text-blue-700"
  }
];

export const CalendarView = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <h2 className="text-lg font-bold text-gray-900">December 2025</h2>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
            Day
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#F03D3D] rounded-lg shadow-sm shadow-red-200">
            Week
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
            Month
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Days Header */}
          <div className="grid grid-cols-8 border-b border-gray-100">
            <div className="p-4 text-xs font-medium text-gray-400 uppercase text-center border-r border-gray-50">
              Time
            </div>
            {days.map((day, i) => (
              <div key={day} className="p-4 text-center border-r border-gray-50 last:border-0">
                <div className="text-xs font-medium text-gray-400 uppercase mb-1">{day}</div>
                <div className={`text-sm font-bold w-8 h-8 mx-auto flex items-center justify-center rounded-full ${i === 0 ? 'bg-[#F03D3D] text-white' : 'text-gray-900'}`}>
                  {8 + i}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="relative">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-8 border-b border-gray-50 h-24">
                <div className="p-2 text-xs text-gray-400 text-center border-r border-gray-50 -mt-2.5 bg-white">
                  {time}
                </div>
                {days.map((day) => (
                  <div key={`${day}-${time}`} className="border-r border-gray-50 last:border-0 relative group hover:bg-gray-50/50 transition-colors">
                    {/* Add Button on Hover */}
                    <button className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-[#F03D3D] hover:text-white transition-colors">
                        +
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            ))}

            {/* Appointments Overlay */}
            {appointments.map((apt, index) => {
              const dayIndex = days.indexOf(apt.day);
              const timeIndex = timeSlots.indexOf(apt.time);
              if (dayIndex === -1 || timeIndex === -1) return null;

              return (
                <div
                  key={index}
                  className={`absolute left-0 right-0 mx-1 p-2 rounded-lg border text-xs cursor-pointer hover:brightness-95 transition-all shadow-sm z-10 flex flex-col gap-1 ${apt.color}`}
                  style={{
                    top: `${timeIndex * 6}rem`, // 6rem = h-24
                    height: `${apt.duration * 6}rem`,
                    left: `${(dayIndex + 1) * 12.5}%`,
                    width: '12%',
                  }}
                >
                  <div className="font-bold truncate">{apt.student}</div>
                  <div className="opacity-80 truncate">{apt.type}</div>
                  <div className="mt-auto flex items-center gap-1 opacity-70">
                    <Clock className="w-3 h-3" />
                    <span>{apt.duration}h</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
