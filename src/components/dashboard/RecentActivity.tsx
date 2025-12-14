"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, DollarSign, UserPlus } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Lesson Completed",
    desc: "with Sarah Jenkins",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    id: 2,
    title: "New Booking Request",
    desc: "from David Miller",
    time: "4 hours ago",
    icon: UserPlus,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    id: 3,
    title: "Payment Received",
    desc: "+$150.00",
    time: "Yesterday",
    icon: DollarSign,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

export const RecentActivity = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bg}`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900 font-medium text-sm">{activity.title}</h4>
              <p className="text-gray-500 text-xs">{activity.desc}</p>
            </div>
            <span className="text-gray-400 text-xs">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
