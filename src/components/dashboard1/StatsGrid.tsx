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
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    label: "Active Students",
    value: "24",
    change: "+4",
    trend: "up",
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    label: "Hours Taught",
    value: "156h",
    change: "This Month",
    trend: "neutral",
    icon: Clock,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    label: "Rating",
    value: "4.9",
    change: "Top 5%",
    trend: "up",
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
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
          className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl hover:border-slate-600 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
              stat.trend === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-700 text-slate-400"
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
          <p className="text-slate-400 text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};
