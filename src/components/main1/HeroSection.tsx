"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2800&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              #1 Rated Driving School Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Master the Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Confident Driving
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Connect with elite instructors and premium vehicles. 
              Experience a modern way to learn driving with real-time tracking and personalized feedback.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2"
          >
            <div className="flex-1 flex items-center px-4 h-14 bg-white/5 rounded-xl border border-white/5 focus-within:border-indigo-500/50 transition-colors">
              <MapPin className="text-slate-400 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Enter your location"
                className="bg-transparent border-none outline-none text-white placeholder-slate-500 w-full"
              />
            </div>
            <div className="flex-1 flex items-center px-4 h-14 bg-white/5 rounded-xl border border-white/5 focus-within:border-indigo-500/50 transition-colors">
              <Calendar className="text-slate-400 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Preferred date"
                className="bg-transparent border-none outline-none text-white placeholder-slate-500 w-full"
              />
            </div>
            <button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Find Instructors
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-slate-500 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Verified Instructors
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Dual-Control Cars
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              Instant Booking
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
