"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle, FileText, Info } from "lucide-react";
import Button from "@/components/ui/Button";

// Mock Data (should be fetched based on params.id)
const INSTRUCTOR = {
  id: 1,
  name: "Giorgi Beridze",
  price: 35,
  lessonDuration: 60,
  image: undefined, // Placeholder
};

const AVAILABLE_SLOTS = [
  // Dec 8 - Full day
  { date: "2025-12-08", time: "09:00" },
  { date: "2025-12-08", time: "10:00" },
  { date: "2025-12-08", time: "11:00" },
  { date: "2025-12-08", time: "12:00" },
  { date: "2025-12-08", time: "13:00" },
  { date: "2025-12-08", time: "14:00" },
  { date: "2025-12-08", time: "15:00" },
  { date: "2025-12-08", time: "16:00" },
  { date: "2025-12-08", time: "17:00" },
  
  // Dec 9 - Partial
  { date: "2025-12-09", time: "10:00" },
  { date: "2025-12-09", time: "13:00" },
  { date: "2025-12-09", time: "15:00" },
  
  // Dec 15 - Morning
  { date: "2025-12-15", time: "09:00" },
  { date: "2025-12-15", time: "10:00" },
];

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState<{date: string, time: string}[]>([]);
  const [viewingDate, setViewingDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // Dec 2025 for demo
  const [notes, setNotes] = useState("");

  const handleSlotSelect = (date: string, time: string) => {
    setSelectedSlots(prev => {
      const exists = prev.find(s => s.date === date && s.time === time);
      if (exists) {
        return prev.filter(s => s.date !== date || s.time !== time);
      }
      return [...prev, { date, time }];
    });
  };

  const handleConfirm = () => {
    setStep(3);
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  };

  // Group slots by date
  const slotsByDate = AVAILABLE_SLOTS.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot.time);
    return acc;
  }, {} as Record<string, string[]>);

  // Calendar Helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    
    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    const startDay = firstDay === 0 ? 6 : firstDay - 1;
    
    return { days, startDay };
  };

  const { days, startDay } = getDaysInMonth(currentMonth);
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const isDateAvailable = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return !!slotsByDate[dateStr];
  };

  const isDateSelected = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return viewingDate === dateStr;
  };

  const isDateHasSelection = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return selectedSlots.some(s => s.date === dateStr);
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (slotsByDate[dateStr]) {
      setViewingDate(dateStr);
    }
  };

  const formatTimeRange = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    
    const endDate = new Date(date.getTime() + INSTRUCTOR.lessonDuration * 60000);
    const endHours = String(endDate.getHours()).padStart(2, '0');
    const endMinutes = String(endDate.getMinutes()).padStart(2, '0');
    
    return `${startTime} - ${endHours}:${endMinutes}`;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link 
            href={`/instructors/${id}`}
            className="inline-flex items-center text-sm text-[#F03D3D] hover:text-[#d62f2f] transition-colors font-medium mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Book a Lesson</h1>
          <p className="text-gray-500 mt-2">
            with {INSTRUCTOR.name} <span className="text-gray-400">(₾{INSTRUCTOR.price}/hr)</span>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#F03D3D]" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? "bg-[#F03D3D] text-white" : "bg-gray-200 text-gray-500"}`}>1</div>
            <span className="font-medium hidden sm:inline">Time</span>
          </div>
          <div className="w-12 h-px bg-gray-200" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#F03D3D]" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? "bg-[#F03D3D] text-white" : "bg-gray-200 text-gray-500"}`}>2</div>
            <span className="font-medium hidden sm:inline">Confirm</span>
          </div>
          <div className="w-12 h-px bg-gray-200" />
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-[#F03D3D]" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? "bg-[#F03D3D] text-white" : "bg-gray-200 text-gray-500"}`}>3</div>
            <span className="font-medium hidden sm:inline">Done</span>
          </div>
        </div>

        {/* Step 1: Select Time */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 items-stretch">
            {/* Calendar Column */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-xs font-bold text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: days }).map((_, i) => {
                  const day = i + 1;
                  const available = isDateAvailable(day);
                  const selected = isDateSelected(day);
                  const hasSelection = isDateHasSelection(day);
                  
                  return (
                    <button
                      key={day}
                      disabled={!available}
                      onClick={() => handleDateClick(day)}
                      className={`
                        aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all relative
                        ${selected 
                          ? "bg-gray-900 text-white shadow-lg" 
                          : available 
                            ? "bg-red-50 text-red-600 hover:bg-red-100 font-bold" 
                            : "text-gray-300 cursor-not-allowed"
                        }
                      `}
                    >
                      {day}
                      {hasSelection && (
                        <div className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full ${selected ? "bg-red-500" : "bg-[#F03D3D]"}`} />
                      )}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-6 flex items-center gap-4 text-xs text-gray-500 justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-50 border border-red-100" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-900" />
                  <span>Viewing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F03D3D]" />
                  <span>Selected</span>
                </div>
              </div>
            </div>

            {/* Time Slots Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm min-h-[400px] flex flex-col">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#F03D3D]" />
                Available Times
              </h2>

              {!viewingDate ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 p-8">
                  <CalendarIcon className="w-12 h-12 mb-4 opacity-20" />
                  <p>Select a date from the calendar to see available time slots</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-4">
                    Available slots for <span className="font-bold text-gray-900">{new Date(viewingDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-8">
                    {slotsByDate[viewingDate]?.map((time) => {
                      const isSelected = selectedSlots.some(s => s.date === viewingDate && s.time === time);
                      return (
                        <button
                          key={`${viewingDate}-${time}`}
                          onClick={() => handleSlotSelect(viewingDate, time)}
                          className={`py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border ${
                            isSelected
                              ? "bg-[#F03D3D] text-white border-[#F03D3D] shadow-lg shadow-red-500/20 scale-105"
                              : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-100"
                          }`}
                        >
                          {formatTimeRange(time)}
                          {isSelected && <CheckCircle className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500 text-sm">{selectedSlots.length} slots selected</span>
                      <span className="font-bold text-gray-900">₾{selectedSlots.length * INSTRUCTOR.price}</span>
                    </div>
                    <Button 
                      disabled={selectedSlots.length === 0}
                      onClick={() => setStep(2)}
                      className="w-full"
                    >
                      Continue to Confirm
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Confirm */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#F03D3D]" />
              Confirm Booking
            </h2>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{INSTRUCTOR.name}</h3>
                  <p className="text-gray-500">{selectedSlots.length} Driving Lesson{selectedSlots.length > 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-lg">₾{INSTRUCTOR.price * selectedSlots.length}</p>
                  <p className="text-gray-500">{INSTRUCTOR.lessonDuration * selectedSlots.length} min total</p>
                </div>
              </div>
              
              <div className="h-px bg-gray-200 my-4" />
              
              <div className="space-y-4">
                {Object.entries(
                  selectedSlots.reduce((acc, slot) => {
                    if (!acc[slot.date]) acc[slot.date] = [];
                    acc[slot.date].push(slot);
                    return acc;
                  }, {} as Record<string, typeof selectedSlots>)
                )
                .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                .map(([date, slots]) => (
                  <div key={date} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-center gap-2 mb-3 text-gray-900 font-medium border-b border-gray-100 pb-2">
                      <CalendarIcon className="w-4 h-4 text-[#F03D3D]" />
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {slots.sort((a, b) => a.time.localeCompare(b.time)).map((slot, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>{formatTimeRange(slot.time)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details Form */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes for Instructor (Optional)
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or things the instructor should know?"
                    rows={3}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#F03D3D] focus:ring-1 focus:ring-[#F03D3D] outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl text-gray-600 text-sm">
                <Info className="w-5 h-5 shrink-0 mt-0.5 text-gray-400" />
                <p>Free cancellation up to 24 hours before the lesson start time. Late cancellations may be charged 50% of the lesson fee.</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <button 
                onClick={() => setStep(1)}
                className="text-gray-500 font-medium hover:text-gray-900 transition-colors"
              >
                Back
              </button>
              <Button 
                onClick={handleConfirm} 
                className="px-8"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-gray-100 p-12 shadow-sm text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-8">
              Your {selectedSlots.length} lesson{selectedSlots.length > 1 ? 's' : ''} with {INSTRUCTOR.name} have been scheduled. <br />
              You'll receive a confirmation email shortly.
            </p>
            <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}
