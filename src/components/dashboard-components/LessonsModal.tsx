"use client";

import React from "react";
import { Calendar, X } from "lucide-react";
import { ModalChart } from "./ModalChart";
import { LessonCard, LessonCardProps } from "./LessonCard";

export interface LessonsModalProps {
  isOpen: boolean;
  isAnimating: boolean;
  onClose: () => void;
  lessons: LessonCardProps[];
}

export const LessonsModal: React.FC<LessonsModalProps> = ({
  isOpen,
  isAnimating,
  onClose,
  lessons,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300 ease-out ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden transition-all duration-300 ease-out ${
          isAnimating ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Lessons This Week</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section - Left Side */}
            <div className="lg:col-span-2">
              <ModalChart />
            </div>

            {/* Lessons Cards - Right Side */}
            <div className="lg:col-span-1 space-y-2 overflow-y-auto max-h-[calc(85vh-160px)] pr-2">
              {lessons.map((lesson, index) => (
                <LessonCard key={index} {...lesson} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
