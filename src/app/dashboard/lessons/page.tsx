"use client";

import React, { useState, useCallback, memo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardNav } from "@/components/dashboard/student/DashboardNav";
import { InstructorDashboardNav } from "@/components/dashboard/instructor/InstructorDashboardNav";
import Button from "@/components/ui/Button";
import { Clock, Star, MoreVertical, CheckCircle2, XCircle } from "lucide-react";

// Types for lessons
interface UpcomingLesson {
  id: number;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  location: string;
  price: string;
  avatar: string | null;
  status: "confirmed" | "pending";
}

interface PastLesson {
  id: number;
  instructor: string;
  date: string;
  time: string;
  type: string;
  rating: number | null;
  status: "completed";
}

// Static mock data - moved outside component to prevent recreation
const UPCOMING_LESSONS: UpcomingLesson[] = [
  {
    id: 1,
    instructor: "Sarah Wilson",
    date: "Tomorrow, Dec 14",
    time: "10:00 AM - 12:00 PM",
    duration: "2 hours",
    type: "City Driving",
    location: "123 Main St, Downtown",
    price: "₾80",
    avatar: null,
    status: "confirmed"
  },
  {
    id: 2,
    instructor: "Mike Johnson",
    date: "Wed, Dec 18",
    time: "02:00 PM - 04:00 PM",
    duration: "2 hours",
    type: "Parking Practice",
    location: "Training Ground A",
    price: "₾70",
    avatar: null,
    status: "pending"
  }
];

const PAST_LESSONS: PastLesson[] = [
  {
    id: 101,
    instructor: "Sarah Wilson",
    date: "Dec 10, 2023",
    time: "10:00 AM",
    type: "Highway Driving",
    rating: 5,
    status: "completed"
  },
  {
    id: 102,
    instructor: "Sarah Wilson",
    date: "Dec 05, 2023",
    time: "10:00 AM",
    type: "Basics",
    rating: null,
    status: "completed"
  }
];

// Define tab IDs as a union type for type safety
type TabId = "upcoming" | "past" | "cancelled";

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "cancelled", label: "Cancelled" },
];

export default function LessonsPage() {
  const { user } = useAuth();
  const isInstructor = user?.userType === "instructor";
  const [activeTab, setActiveTab] = useState<TabId>("upcoming");

  // Memoize tab click handler
  const handleTabClick = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20">
      {isInstructor ? <InstructorDashboardNav /> : <DashboardNav />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Lessons</h1>
            <p className="text-gray-500 mt-1">Manage your upcoming and past driving lessons.</p>
          </div>
          <Button className="w-full sm:w-auto">Book New Lesson</Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white p-1 rounded-xl border border-gray-100 w-fit shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                px-6 py-2.5 text-sm font-medium rounded-lg transition-all
                ${activeTab === tab.id 
                  ? "bg-gray-900 text-white shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === "upcoming" && <UpcomingLessons />}
          {activeTab === "past" && <PastLessons />}
          {activeTab === "cancelled" && <CancelledLessons />}
        </div>
      </div>
    </div>
  );
}

// Memoized lesson card for upcoming lessons
interface UpcomingLessonCardProps {
  lesson: UpcomingLesson;
}

const UpcomingLessonCard = memo(function UpcomingLessonCard({ lesson }: UpcomingLessonCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left: Time & Date */}
        <div className="flex items-start gap-4 min-w-[200px]">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex flex-col items-center justify-center text-[#F03D3D] border border-red-100">
            <span className="text-xs font-bold uppercase">{lesson.date.split(',')[0]}</span>
            <span className="text-lg font-bold">{lesson.date.split(' ')[2]}</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{lesson.date}</h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4" />
              {lesson.time}
            </div>
          </div>
        </div>

        {/* Middle: Instructor & Details */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
              {lesson.instructor[0]}
            </div>
            <div>
              <p className="text-sm text-gray-500">Instructor</p>
              <p className="font-medium text-gray-900">{lesson.instructor}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Lesson Type</p>
            <p className="font-medium text-gray-900">{lesson.type}</p>
          </div>
        </div>

        {/* Right: Status & Actions */}
        <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            lesson.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
          }`}>
            {lesson.status === 'confirmed' ? 'Confirmed' : 'Pending Approval'}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Reschedule</Button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
});

// Memoized lesson card for past lessons
interface PastLessonCardProps {
  lesson: PastLesson;
}

const PastLessonCard = memo(function PastLessonCard({ lesson }: PastLessonCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm opacity-75 hover:opacity-100 transition-opacity">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{lesson.type}</h3>
            <p className="text-sm text-gray-500">{lesson.date} • {lesson.instructor}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {lesson.rating ? (
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(lesson.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          ) : (
            <Button variant="subtle" size="sm">Rate Lesson</Button>
          )}
          <Button variant="outline" size="sm">Book Again</Button>
        </div>
      </div>
    </div>
  );
});

// Memoized list components
const UpcomingLessons = memo(function UpcomingLessons() {
  return (
    <div className="grid gap-4">
      {UPCOMING_LESSONS.map((lesson) => (
        <UpcomingLessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
});

const PastLessons = memo(function PastLessons() {
  return (
    <div className="grid gap-4">
      {PAST_LESSONS.map((lesson) => (
        <PastLessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
});

const CancelledLessons = memo(function CancelledLessons() {
  return (
    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <XCircle className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">No cancelled lessons</h3>
      <p className="text-gray-500 mt-1">You haven&apos;t cancelled any lessons recently.</p>
    </div>
  );
});
