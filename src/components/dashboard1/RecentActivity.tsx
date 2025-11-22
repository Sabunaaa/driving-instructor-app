"use client";

import React from "react";
import { CheckCircle2, DollarSign, UserPlus } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Lesson Completed",
    desc: "with Sarah Jenkins",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    id: 2,
    title: "New Booking Request",
    desc: "from David Miller",
    time: "4 hours ago",
    icon: UserPlus,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    id: 3,
    title: "Payment Received",
    desc: "+$150.00",
    time: "Yesterday",
    icon: DollarSign,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
];

export const RecentActivity = () => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        <button className="text-slate-400 hover:text-white text-sm">View All</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bg}`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium text-sm">{activity.title}</h4>
              <p className="text-slate-400 text-xs">{activity.desc}</p>
            </div>
            <span className="text-slate-500 text-xs">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
