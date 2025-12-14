"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ResponsiveCalendarProps {
  availability?: Record<string, boolean>;
  onDateClick?: (date: Date, hour: number) => void;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const ResponsiveCalendar: React.FC<ResponsiveCalendarProps> = ({
  availability = {},
  onDateClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  // Get Monday of the current week
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const getSlotKey = (date: Date, hour: number) => {
    const dateStr = date.toISOString().split("T")[0];
    return `${dateStr}_${hour.toString().padStart(2, "0")}:00`;
  };

  const isSlotAvailable = (date: Date, hour: number) => {
    const key = getSlotKey(date, hour);
    return availability[key] || false;
  };

  const handleSlotClick = (date: Date, hour: number) => {
    onDateClick?.(date, hour);
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousWeek}
            className="p-2 hover:bg-red-50 text-gray-600 hover:text-[#F03D3D] rounded-lg transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-base font-bold text-gray-900 min-w-[200px] text-center">
            {weekStart.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            - {weekDays[6].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
          <button
            onClick={goToNextWeek}
            className="p-2 hover:bg-red-50 text-gray-600 hover:text-[#F03D3D] rounded-lg transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={goToToday}
          className="px-4 py-2 text-sm font-semibold text-[#F03D3D] bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors duration-200"
        >
          Today
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-max pb-4">
          {/* Day headers */}
          <div className="grid grid-cols-8 gap-2 mb-6">
            <div className="w-16"></div>
            {weekDays.map((day, idx) => (
              <div key={idx} className="w-28 text-center">
                <div className={`text-xs font-bold transition-colors ${
                  isToday(day) ? "text-[#F03D3D]" : "text-gray-900"
                }`}>
                  {DAYS_OF_WEEK[day.getDay() === 0 ? 6 : day.getDay() - 1]}
                </div>
                <div className={`text-sm font-semibold mt-1 px-2 py-1 rounded-lg ${
                  isToday(day) 
                    ? "text-white bg-[#F03D3D]" 
                    : "text-gray-600 bg-gray-50"
                }`}>
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div className="space-y-2">
            {HOURS.map((hour) => (
              <div key={hour} className="grid grid-cols-8 gap-2 items-center">
                <div className="w-16 text-right pr-4">
                  <span className="text-xs font-semibold text-gray-400">
                    {hour.toString().padStart(2, "0")}:00
                  </span>
                </div>
                {weekDays.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSlotClick(day, hour)}
                    className={`
                      w-28 h-14 rounded-xl font-semibold text-xs transition-all duration-200 transform hover:scale-105 active:scale-95
                      ${
                        isSlotAvailable(day, hour)
                          ? "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-md hover:shadow-lg hover:from-emerald-500 hover:to-emerald-600"
                          : "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-400 border border-gray-200 hover:from-gray-150 hover:to-gray-100 hover:text-gray-600 hover:border-gray-300"
                      }
                    `}
                  >
                    {isSlotAvailable(day, hour) ? "✓ Free" : ""}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet View - 3 days at a time */}
      <div className="hidden md:block lg:hidden overflow-x-auto">
        <div className="space-y-6 pb-4">
          {Array.from({ length: Math.ceil(7 / 3) }, (_, daySetIdx) => {
            const daySet = weekDays.slice(daySetIdx * 3, (daySetIdx + 1) * 3);
            return (
              <div key={daySetIdx} className="min-w-max">
                {/* Day headers */}
                <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: "64px repeat(3, 1fr)" }}>
                  <div></div>
                  {daySet.map((day, idx) => (
                    <div key={idx} className="text-center">
                      <div className={`text-xs font-bold transition-colors ${
                        isToday(day) ? "text-[#F03D3D]" : "text-gray-900"
                      }`}>
                        {DAYS_OF_WEEK[day.getDay() === 0 ? 6 : day.getDay() - 1]}
                      </div>
                      <div className={`text-sm font-semibold mt-1 px-2 py-1 rounded-lg ${
                        isToday(day) 
                          ? "text-white bg-[#F03D3D]" 
                          : "text-gray-600 bg-gray-50"
                      }`}>
                        {day.getDate()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time slots */}
                <div className="space-y-2">
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className="grid gap-2 items-center"
                      style={{ gridTemplateColumns: "64px repeat(3, 1fr)" }}
                    >
                      <div className="text-right pr-2">
                        <span className="text-xs font-semibold text-gray-400">
                          {hour.toString().padStart(2, "0")}:00
                        </span>
                      </div>
                      {daySet.map((day, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSlotClick(day, hour)}
                          className={`
                            h-12 rounded-lg font-semibold text-xs transition-all duration-200 transform hover:scale-105 active:scale-95
                            ${
                              isSlotAvailable(day, hour)
                                ? "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-md hover:shadow-lg hover:from-emerald-500 hover:to-emerald-600"
                                : "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-400 border border-gray-200 hover:from-gray-150 hover:to-gray-100 hover:text-gray-600 hover:border-gray-300"
                            }
                          `}
                        >
                          {isSlotAvailable(day, hour) ? "✓" : "-"}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View - 1 day at a time */}
      <div className="md:hidden space-y-6 pb-4">
        {weekDays.map((day, dayIdx) => (
          <div key={dayIdx} className="space-y-4">
            <div className={`px-4 py-3 rounded-xl transition-colors ${
              isToday(day)
                ? "bg-gradient-to-r from-red-50 to-red-100 border border-red-200"
                : "bg-gray-50 border border-gray-200"
            }`}>
              <div className={`text-sm font-bold transition-colors ${
                isToday(day) ? "text-[#F03D3D]" : "text-gray-900"
              }`}>
                {DAYS_OF_WEEK[day.getDay() === 0 ? 6 : day.getDay() - 1]}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {day.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {HOURS.map((hour) => (
                <button
                  key={hour}
                  onClick={() => handleSlotClick(day, hour)}
                  className={`
                    py-3 rounded-lg text-xs font-semibold transition-all duration-200 transform hover:scale-110 active:scale-95
                    ${
                      isSlotAvailable(day, hour)
                        ? "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-md hover:shadow-lg hover:from-emerald-500 hover:to-emerald-600"
                        : "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-400 border border-gray-200 hover:from-gray-150 hover:to-gray-100 hover:text-gray-600 hover:border-gray-300"
                    }
                  `}
                >
                  {hour.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
