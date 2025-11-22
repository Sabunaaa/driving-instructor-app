"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

const instructors = [
  {
    name: "Sarah Jenkins",
    rating: 5.0,
    reviews: 124,
    car: "Tesla Model 3",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Michael Chen",
    rating: 4.9,
    reviews: 89,
    car: "BMW 3 Series",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "David Wilson",
    rating: 4.9,
    reviews: 215,
    car: "Audi A4",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  },
];

export const InstructorShowcase = () => {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Top Rated Instructors
            </h2>
            <p className="text-slate-400 text-lg">
              Learn from the best in your area.
            </p>
          </div>
          <button className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
            View all instructors →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5]"
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    {instructor.rating}
                  </span>
                  <span className="text-slate-400 text-xs">({instructor.reviews} reviews)</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{instructor.name}</h3>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  Certified Instructor
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Vehicle</span>
                  <span className="text-white font-medium">{instructor.car}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
