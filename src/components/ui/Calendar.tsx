"use client";

import React, { useState } from 'react';
// @ts-ignore
import { ChevronLeft, ChevronRight, Edit3, Lock } from 'lucide-react';

interface CalendarEvent {
  id: string;
  type: 'regular' | 'walk-in' | 'intensive' | 'test-prep';
  count?: number;
  date: Date;
  startTime: string; // Format: "HH:MM"
  endTime: string;   // Format: "HH:MM"
  title?: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date, hour: number) => void;
  onEventClick?: (event: CalendarEvent) => void;
  editable?: boolean;
  availability?: Record<string, boolean>;
  rates?: Record<string, number>;
  onRateChange?: (key: string, rate: number) => void;
  viewMode?: 'schedule' | 'rates';
  multiSelectMode?: boolean;
  selectedSlots?: string[];
  onSlotSelect?: (key: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ 
  events = [], 
  onDateClick, 
  onEventClick,
  editable = true,
  availability = {},
  rates = {},
  onRateChange,
  viewMode = 'schedule',
  multiSelectMode = false,
  selectedSlots = [],
  onSlotSelect
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    return new Date(today.setDate(diff));
  });

  const [editingRateKey, setEditingRateKey] = useState<string | null>(null);
  const [rateInputValue, setRateInputValue] = useState<string>('');

  const eventTypeConfig = {
    regular: { color: 'bg-green-100 text-green-800 border-green-300', label: 'Regular' },
    'walk-in': { color: 'bg-orange-100 text-orange-800 border-orange-300', label: 'Walk-in' },
    intensive: { color: 'bg-purple-100 text-purple-800 border-purple-300', label: 'Intensive' },
    'test-prep': { color: 'bg-blue-100 text-blue-800 border-blue-300', label: 'Test Prep' }
  };

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Generate hours from 08:00 to 20:00
  const hours = [];
  for (let i = 8; i <= 20; i++) {
    hours.push(`${i.toString().padStart(2, '0')}:00`);
  }

  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart);
      day.setDate(currentWeekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prev => {
      const newDate = new Date(prev);
      const change = direction === 'prev' ? -7 : 7;
      newDate.setDate(prev.getDate() + change);
      return newDate;
    });
  };

  const getEventsForDateAndHour = (date: Date, hour: string) => {
    return events.filter(event => {
      if (event.date.toDateString() !== date.toDateString()) return false;
      
      const eventStartHour = parseInt(event.startTime.split(':')[0]);
      const eventEndHour = parseInt(event.endTime.split(':')[0]);
      const slotHour = parseInt(hour.split(':')[0]);
      
      // Event shows in slot if the slot time is between start and end time (inclusive of start, exclusive of end)
      return slotHour >= eventStartHour && slotHour < eventEndHour;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatWeekRange = () => {
    const weekDays = getWeekDays();
    const start = weekDays[0];
    const end = weekDays[6];
    
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
    } else {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
  };

  const weekDays = getWeekDays();

  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <button
          onClick={() => navigateWeek('prev')}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
        
        <h2 className="text-base font-semibold text-gray-900">
          {formatWeekRange()}
        </h2>
        
        <button
          onClick={() => navigateWeek('next')}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid Container */}
      <div className="overflow-x-auto">
        {/* Date Row */}
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-1 bg-gray-50 border-r border-gray-200"></div>
          {weekDays.map((date, index) => (
            <div key={index} className="p-1 text-center bg-gray-50 border-r border-gray-200 last:border-r-0">
              <div className={`text-xs font-semibold ${
                isToday(date) 
                  ? 'bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto' 
                  : 'text-gray-900'
              }`}>
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-2 bg-gray-50 border-r border-gray-200 text-xs font-medium text-gray-500 text-center">
            Time
          </div>
          {dayNames.map((day, index) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-gray-500 bg-gray-50 border-r border-gray-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="grid grid-cols-8">
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              {/* Time Column */}
              <div className="p-2 bg-gray-50 border-r border-b border-gray-200 text-xs text-gray-500 text-center font-medium h-[40px] flex items-center justify-center">
                {hour}
              </div>
              
              {/* Day Columns */}
              {weekDays.map((date, dayIndex) => {
                const hourEvents = getEventsForDateAndHour(date, hour);
                const isCurrentDay = isToday(date);
                const isPast = isPastDate(date);
                const hourNum = parseInt(hour.split(':')[0]);
                
                // Check availability
                const dateStr = date.toISOString().split('T')[0];
                const timeStr = `${hourNum.toString().padStart(2, '0')}:00`;
                const availabilityKey = `${dateStr}_${timeStr}`;
                const isAvailable = availability[availabilityKey];
                const hasEvent = hourEvents.length > 0;

                // Check if this time slot is in the past
                const now = new Date();
                const slotDateTime = new Date(date);
                slotDateTime.setHours(hourNum, 0, 0, 0);
                const isPastSlot = slotDateTime < now;

                // Determine background color and borders
                let bgColor = 'bg-white';
                let borderClasses = 'border-r border-b border-gray-100';
                
                if (hasEvent) {
                  bgColor = 'bg-blue-50'; // Booked lesson
                } else if (isAvailable) {
                  bgColor = 'bg-green-500'; // Available - nice darker green
                  borderClasses = 'border-r border-b border-gray-100';
                } else if (isCurrentDay && !hasEvent) {
                  bgColor = 'bg-blue-50'; // Current day
                } else if (isPastSlot) {
                  bgColor = 'bg-gray-100'; // Past slots - gray
                }

                const handleCellClick = () => {
                  if (isPastSlot) return; // Don't allow clicking past slots
                  
                  if (viewMode === 'rates' && !hasEvent) {
                    // In rates view with multi-select mode, clicking the cell toggles selection
                    if (multiSelectMode) {
                      onSlotSelect?.(availabilityKey);
                    }
                  } else if (!hasEvent) {
                    onDateClick?.(date, hourNum);
                  }
                };

                const handleRateClick = (e: React.MouseEvent) => {
                  e.stopPropagation(); // Prevent cell click
                  if (isPastSlot) return;
                  
                  // Clicking on the rate number opens inline editing
                  setEditingRateKey(availabilityKey);
                  setRateInputValue(rates[availabilityKey]?.toString() || '');
                };

                const handleRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  setRateInputValue(e.target.value);
                };

                const handleRateInputBlur = () => {
                  if (rateInputValue && !isNaN(parseFloat(rateInputValue))) {
                    onRateChange?.(availabilityKey, parseFloat(rateInputValue));
                  }
                  setEditingRateKey(null);
                  setRateInputValue('');
                };

                const handleRateInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    handleRateInputBlur();
                  } else if (e.key === 'Escape') {
                    setEditingRateKey(null);
                    setRateInputValue('');
                  }
                };

                const currentRate = rates[availabilityKey];
                const isSelected = selectedSlots.includes(availabilityKey);

                return (
                  <div
                    key={`${date.toDateString()}-${hour}`}
                    className={`relative h-[40px] ${borderClasses} last:border-r-0 transition-all ${bgColor} ${
                      isPastSlot 
                        ? 'cursor-not-allowed opacity-50' 
                        : `cursor-pointer hover:border-2 ${viewMode === 'rates' ? 'hover:border-blue-600' : 'hover:border-green-600'}`
                    } ${isSelected ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                    onClick={handleCellClick}
                  >
                    {/* Events */}
                    {hasEvent && (
                      <div className="p-1 space-y-1">
                        {hourEvents.map(event => (
                          <div
                            key={event.id}
                            className={`text-xs px-2 py-1 rounded border-l-2 cursor-pointer hover:opacity-80 ${
                              eventTypeConfig[event.type].color
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick?.(event);
                            }}
                          >
                            <div className="font-medium truncate">
                              {event.title || eventTypeConfig[event.type].label}
                            </div>
                            <div className="text-[10px] opacity-75">
                              {event.startTime} - {event.endTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Rate Input or Display */}
                    {viewMode === 'rates' && !hasEvent && !isPastSlot && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {editingRateKey === availabilityKey ? (
                          <input
                            type="number"
                            value={rateInputValue}
                            onChange={handleRateInputChange}
                            onBlur={handleRateInputBlur}
                            onKeyDown={handleRateInputKeyDown}
                            autoFocus
                            className="w-full h-full text-center text-sm font-semibold bg-blue-100 bg-opacity-30 border-none outline-none focus:bg-blue-200 focus:bg-opacity-40"
                            placeholder="$"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : currentRate ? (
                          <div 
                            className="text-xs font-semibold text-black cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={handleRateClick}
                          >
                            ${currentRate}
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Lock Icon for Past Slots */}
                    {isPastSlot && hourEvents.length === 0 && (
                      <div className="absolute top-1 right-1">
                        <Lock size={12} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
