"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Instructors", value: "500+", color: "text-indigo-400" },
  { label: "Successful Learners", value: "12k+", color: "text-cyan-400" },
  { label: "Cities Covered", value: "45", color: "text-purple-400" },
  { label: "Average Rating", value: "4.9", color: "text-emerald-400" },
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-slate-950 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
