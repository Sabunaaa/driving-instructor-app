"use client";

import React from 'react';
import { useRouter } from "next/navigation";
// @ts-ignore
import { Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import Calendar from "@/components/ui/Calendar";
import { logger } from "@/utils/secureLogger";

export default function BookingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Calendar events state - with some pre-existing events for testing
  const [calendarEvents, setCalendarEvents] = React.useState<any[]>([
    {
      id: 'existing-1',
      type: 'regular' as const,
      date: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      title: 'Emma W.'
    },
    {
      id: 'existing-2',
      type: 'regular' as const,
      date: new Date(),
      startTime: '11:00',
      endTime: '12:00',
      title: 'John D.'
    }
  ]);

  const studentBookings: any[] = [];

  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const formatStudentName = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length < 2) return fullName;
    return `${names[0]} ${names[names.length - 1][0]}.`;
  };

  const handleDateClick = (date: Date, hour?: number) => {
    logger.debug('Date clicked', { date, hour });
    // TODO: Show bookings for specific date/time or open booking modal
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      case 'rejected':
        return <XCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  const renderInstructorView = () => (
    <>
      {/* Calendar */}
      <div className="mb-8">
        <Calendar
          events={calendarEvents}
          onDateClick={handleDateClick}
          editable={true}
        />
      </div>
    </>
  );

  const renderStudentView = () => {
    // Empty student calendar events - data will come from backend
    const studentCalendarEvents: any[] = [];

    return (
      <>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Lessons
          </h1>
          <p className="text-gray-600">
            View and track your upcoming driving lessons.
          </p>
        </div>

        {/* Calendar - Read-only for students */}
        <div className="mb-8">
          <Calendar
            events={studentCalendarEvents}
            onDateClick={handleDateClick}
            editable={false}
          />
        </div>

        {/* Upcoming Lessons Section */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Lessons</h2>
        </div>

        {studentBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600">You haven't booked any lessons yet. Start by finding an instructor!</p>
            <button
              onClick={() => router.push('/find-instructors')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Find Instructors
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {studentBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-900">{booking.instructorName}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 capitalize">{booking.status}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={14} />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{booking.time}</span>
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span> {booking.duration}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {booking.lessonType}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    {booking.status === 'pending' && (
                      <span className="text-sm text-gray-500">Waiting for confirmation</span>
                    )}
                    {booking.status === 'confirmed' && (
                      <span className="text-sm text-green-600 font-medium">Confirmed</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar activeItem="Bookings" />
          <main className="flex-1">
            {user.userType === "instructor" ? renderInstructorView() : renderStudentView()}
          </main>
        </div>
      </div>
    </div>
  );
}
