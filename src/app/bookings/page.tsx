"use client";

import React from 'react';
import { useRouter } from "next/navigation";
// @ts-ignore
import { Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import Calendar from "@/components/ui/Calendar";

export default function BookingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Mock booking requests for demonstration - moved before early return
  const [pendingBookings, setPendingBookings] = React.useState([
    {
      id: 1,
      studentName: "Michael Thompson",
      studentAvatar: null,
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
      time: "14:00",
      duration: "2 hours",
      lessonType: "Advanced Driving",
      message: "I need practice with city driving and traffic situations. Looking for a 2-hour intensive session.",
      status: "pending",
      urgency: "normal",
      studentLevel: "Intermediate"
    },
    {
      id: 2,
      studentName: "Sarah Johnson",
      studentAvatar: null,
      date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Day after tomorrow
      time: "10:00",
      duration: "1 hour",
      lessonType: "Parallel Parking",
      message: "I have my driving test next week and really need help with parallel parking. Just one hour should be enough.",
      status: "pending",
      urgency: "high",
      studentLevel: "Beginner"
    },
    {
      id: 3,
      studentName: "David Martinez",
      studentAvatar: null,
      date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
      time: "16:00",
      duration: "1.5 hours",
      lessonType: "Highway Driving",
      message: "Need confidence building for highway merging and lane changes. 1.5 hours would be perfect.",
      status: "pending",
      urgency: "normal",
      studentLevel: "Intermediate"
    },
    {
      id: 4,
      studentName: "Emily Rodriguez",
      studentAvatar: null,
      date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
      time: "09:00",
      duration: "1 hour",
      lessonType: "Basic Driving",
      message: "First time driver, need basic introduction to vehicle controls and safety.",
      status: "pending",
      urgency: "normal",
      studentLevel: "Beginner"
    },
    {
      id: 5,
      studentName: "Alex Chen",
      studentAvatar: null,
      date: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days from now
      time: "18:00",
      duration: "1 hour",
      lessonType: "Night Driving",
      message: "Need practice with night driving conditions and headlight usage.",
      status: "pending",
      urgency: "high",
      studentLevel: "Experienced"
    }
  ]);

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

  const handleAcceptBooking = (bookingId: number) => {
    const booking = pendingBookings.find(b => b.id === bookingId);
    if (booking) {
      // Create separate hourly calendar events from booking
      const durationHours = parseFloat(booking.duration.replace(' hours', '').replace(' hour', ''));
      const startHour = parseInt(booking.time.split(':')[0]);
      const startMinutes = parseInt(booking.time.split(':')[1]);
      
       const newEvents: any[] = [];
       for (let i = 0; i < durationHours; i++) {
         const currentHour = startHour + i;
         const eventStartTime = `${currentHour.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`;
         const eventEndTime = `${(currentHour + 1).toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`;
         
         newEvents.push({
           id: `booking-${bookingId}-${i}`,
           type: 'regular' as const,
           date: new Date(booking.date),
           startTime: eventStartTime,
           endTime: eventEndTime,
           title: formatStudentName(booking.studentName)
         });
       }
      
      setCalendarEvents(prev => [...prev, ...newEvents]);
      setPendingBookings(prev => prev.filter(booking => booking.id !== bookingId));
      alert(`Booking accepted! ${formatStudentName(booking.studentName)} has been added to your schedule.`);
    }
  };

  const calculateEndTime = (startTime: string, duration: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const durationHours = parseFloat(duration.replace(' hours', '').replace(' hour', ''));
    const endHours = hours + Math.floor(durationHours);
    const endMinutes = minutes + (durationHours % 1) * 60;
    
    const finalHours = endHours + Math.floor(endMinutes / 60);
    const finalMinutes = endMinutes % 60;
    
    return `${finalHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
  };

  const handleRejectBooking = (bookingId: number) => {
    setPendingBookings(prev => prev.filter(booking => booking.id !== bookingId));
    // TODO: Send rejection notification to student
    alert(`Booking rejected. The student will be notified.`);
  };

  const handleDateClick = (date: Date, hour?: number) => {
    console.log('Date clicked:', date, 'Hour:', hour);
    // TODO: Show bookings for specific date/time or open booking modal
  };

  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event);
    console.log('Current calendar events:', calendarEvents);
    
    // Show cancel confirmation for bookings
    if (event.id.startsWith('booking-') || event.id.startsWith('existing-')) {
      const confirmCancel = window.confirm(
        `Cancel lesson with ${event.title}?\n\nTime: ${event.startTime}-${event.endTime}\nThis will remove only this specific hour from your schedule.`
      );
      
      if (confirmCancel) {
        handleCancelBooking(event.id);
      }
    }
  };

  const handleCancelBooking = (eventId: string) => {
    console.log('Canceling event with ID:', eventId);
    console.log('Events before cancellation:', calendarEvents);
    
    // Remove the specific event from calendar
    setCalendarEvents(prev => {
      const filtered = prev.filter(event => event.id !== eventId);
      console.log('Events after cancellation:', filtered);
      return filtered;
    });
    
    // Extract student name from the event for confirmation
    const canceledEvent = calendarEvents.find(event => event.id === eventId);
    if (canceledEvent) {
      alert(`Lesson with ${canceledEvent.title} (${canceledEvent.startTime}-${canceledEvent.endTime}) has been cancelled.`);
    }
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
          onEventClick={handleEventClick}
          editable={true}
        />
      </div>

      {/* Booking Requests */}
      {pendingBookings.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">New Requests</h2>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {pendingBookings.length} pending
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                {/* Student Info & Urgency */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{booking.studentName}</h3>
                    <p className="text-xs text-gray-500">{booking.studentLevel} Driver</p>
                  </div>
                  {booking.urgency === 'high' && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>

                {/* Lesson Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CalendarIcon size={14} className="text-gray-400" />
                    <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock size={14} className="text-gray-400" />
                    <span>{booking.time} - {calculateEndTime(booking.time, booking.duration)}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAcceptBooking(booking.id)}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs font-medium"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectBooking(booking.id)}
                    className="flex-1 px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-xs font-medium"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
            onEventClick={handleEventClick}
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
