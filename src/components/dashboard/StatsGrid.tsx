"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, Star } from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    label: "Active Students",
    value: "24",
    change: "+4",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    label: "Hours Taught",
    value: "156h",
    change: "This Month",
    trend: "neutral",
    icon: Clock,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    label: "Rating",
    value: "4.9",
    change: "Top 5%",
    trend: "up",
    icon: Star,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white border border-gray-100 p-6 rounded-2xl hover:shadow-md transition-all shadow-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
              stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-gray-500 text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};
