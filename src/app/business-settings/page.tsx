"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import CalendarComponent from "@/components/ui/Calendar";
import { Calendar, DollarSign } from "lucide-react";

const BusinessSettingsPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  // View state - toggle between schedule and rates
  const [activeView, setActiveView] = React.useState<'schedule' | 'rates'>('schedule');

  // Calendar events state (booked lessons)
  const [calendarEvents] = React.useState<any[]>([]);

  // Availability state - tracks which time slots instructor is available
  // Format: { "2025-10-09_14:00": true, ... }
  const [availability, setAvailability] = React.useState<Record<string, boolean>>({});

  // Rates state - tracks hourly rates for different time slots
  // Format: { "2025-10-09_14:00": 40, ... }
  const [rates, setRates] = React.useState<Record<string, number>>({});

  // Multi-select for rates (always enabled in rates view)
  const [selectedSlots, setSelectedSlots] = React.useState<string[]>([]);
  const [bulkRate, setBulkRate] = React.useState('');

  // Redirect if not authenticated or not an instructor
  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.userType !== "instructor") {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Clear selections when switching views
  React.useEffect(() => {
    setSelectedSlots([]);
    setBulkRate('');
  }, [activeView]);

  // Handler to toggle availability for a time slot
  const handleDateClick = (date: Date, hour: number) => {
    const dateStr = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    const key = `${dateStr}_${timeStr}`;
    
    // Toggle availability (only for schedule view)
    setAvailability(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handler to update rate for a specific time slot
  const handleRateChange = (key: string, rate: number) => {
    setRates(prev => ({
      ...prev,
      [key]: rate
    }));
  };

  // Save schedule
  const handleSaveSchedule = () => {
    // TODO: Save availability to backend/database
    console.log('Saving availability:', availability);
    alert('Schedule saved successfully!');
  };

  // Clear all availability
  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all availability?')) {
      setAvailability({});
    }
  };

  // Save rates
  const handleSaveRates = () => {
    // TODO: Save rates to backend/database
    console.log('Saving rates:', rates);
    alert('Rates saved successfully!');
  };

  // Clear all rates
  const handleClearAllRates = () => {
    if (confirm('Are you sure you want to clear all rates?')) {
      setRates({});
    }
  };

  // Handle slot selection in multi-select mode
  const handleSlotSelect = (key: string) => {
    setSelectedSlots(prev => {
      if (prev.includes(key)) {
        return prev.filter(k => k !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  // Apply rate to all selected slots
  const handleApplyBulkRate = () => {
    const rateValue = parseFloat(bulkRate);
    if (isNaN(rateValue) || rateValue <= 0) {
      alert('Please enter a valid rate');
      return;
    }

    const newRates = { ...rates };
    selectedSlots.forEach(key => {
      newRates[key] = rateValue;
    });
    
    setRates(newRates);
    setSelectedSlots([]);
    setBulkRate('');
    alert(`Rate of $${rateValue} applied to ${selectedSlots.length} slots!`);
  };

  // Clear selected slots
  const handleClearSelection = () => {
    setSelectedSlots([]);
  };

  if (!user || user.userType !== "instructor") {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar activeItem="Business settings" />
          <main className="flex-1">
            {/* Navigation Buttons */}
            <div className="flex gap-4 mb-4">
              <button 
                onClick={() => setActiveView('schedule')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3 ${
                  activeView === 'schedule' 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Calendar size={18} className="flex-shrink-0" />
                <div className={`h-6 w-px ${activeView === 'schedule' ? 'bg-white/30' : 'bg-gray-300'}`}></div>
                <span>Schedule Management</span>
              </button>
              <button 
                onClick={() => setActiveView('rates')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3 ${
                  activeView === 'rates' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <DollarSign size={18} className="flex-shrink-0" />
                <div className={`h-6 w-px ${activeView === 'rates' ? 'bg-white/30' : 'bg-gray-300'}`}></div>
                <span>Rates Management</span>
              </button>
            </div>

            {/* Calendar and Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex">
                <div className="flex-1">
                  <CalendarComponent
                    events={calendarEvents}
                    onDateClick={handleDateClick}
                    editable={true}
                    availability={availability}
                    rates={rates}
                    onRateChange={handleRateChange}
                    viewMode={activeView}
                    multiSelectMode={activeView === 'rates'}
                    selectedSlots={selectedSlots}
                    onSlotSelect={handleSlotSelect}
                  />
                </div>
                <div className="w-56 p-4 border-l border-gray-200 bg-gray-50 flex flex-col">
                  <div className="flex-1">
                  {activeView === 'schedule' ? (
                    <div className="space-y-6">
                      {/* Instructions */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Your Availability</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Click on time slots to mark when you're available for lessons.
                        </p>
                      </div>

                      {/* Legend */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900">Legend:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-sm text-gray-700">Available</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
                            <span className="text-sm text-gray-700">Booked</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
                            <span className="text-sm text-gray-700">Unavailable</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Instructions */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Hourly Rates</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Select multiple slots and set the same rate, or click individual slots to edit them.
                        </p>
                      </div>

                      {/* Bulk Rate Input */}
                      <div className="space-y-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div>
                          <label className="text-xs font-semibold text-gray-700 block mb-1">
                            Selected: {selectedSlots.length} slots
                          </label>
                          <input
                            type="number"
                            value={bulkRate}
                            onChange={(e) => setBulkRate(e.target.value)}
                            placeholder="Enter rate (e.g., 40)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                        <button
                          onClick={handleApplyBulkRate}
                          disabled={selectedSlots.length === 0 || !bulkRate}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          Apply to {selectedSlots.length} slots
                        </button>
                        <button
                          onClick={handleClearSelection}
                          disabled={selectedSlots.length === 0}
                          className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          Clear Selection
                        </button>
                      </div>

                      {/* Legend */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900">Tip:</h4>
                        <div className="space-y-2 text-xs">
                          <p className="text-gray-600">• Click slots to select them</p>
                          <p className="text-gray-600">• Or click to edit one slot</p>
                          <p className="text-gray-600">• Set peak hour pricing</p>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>

                  {/* Action Buttons - Fixed at bottom */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={activeView === 'schedule' ? handleSaveSchedule : handleSaveRates}
                      className={`w-full px-4 py-3 text-white rounded-lg font-semibold transition-colors ${
                        activeView === 'schedule' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {activeView === 'schedule' ? 'Save Schedule' : 'Save Rates'}
                    </button>
                    <button
                      onClick={activeView === 'schedule' ? handleClearAll : handleClearAllRates}
                      className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BusinessSettingsPage;