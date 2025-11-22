"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Car, Award, Map, Smartphone } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Safety",
    desc: "Every instructor is background checked and every vehicle is safety inspected.",
    col: "md:col-span-2",
    bg: "bg-indigo-900/20",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Book lessons that fit your lifestyle, 7 days a week.",
    col: "md:col-span-1",
    bg: "bg-slate-900",
  },
  {
    icon: Car,
    title: "Premium Fleet",
    desc: "Learn in modern, dual-control vehicles equipped with latest safety tech.",
    col: "md:col-span-1",
    bg: "bg-slate-900",
  },
  {
    icon: Smartphone,
    title: "Real-time Tracking",
    desc: "Track your route, speed, and progress with our advanced app integration.",
    col: "md:col-span-2",
    bg: "bg-cyan-900/20",
  },
];

export const FeatureGrid = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-indigo-500">DriveMaster</span>?
          </h2>
          <p className="text-slate-400 text-lg">
            We're revolutionizing driver education with technology and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${feature.col} p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors group ${feature.bg}`}
            >
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
