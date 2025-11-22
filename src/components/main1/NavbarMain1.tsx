"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Car, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const NavbarMain1 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/main1" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <Car className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Drive<span className="text-indigo-500">Master</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Instructors", "Vehicles", "How it Works", "Pricing"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-slate-300 hover:text-white font-medium transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-white font-medium hover:text-indigo-400 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 group"
          >
            Get Started
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 p-6 md:hidden flex flex-col gap-4"
          >
            {["Instructors", "Vehicles", "How it Works", "Pricing"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-slate-300 hover:text-white font-medium text-lg"
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-slate-800 my-2" />
            <Link
              href="/login"
              className="text-white font-medium hover:text-indigo-400"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 text-center text-white px-5 py-3 rounded-xl font-medium"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
