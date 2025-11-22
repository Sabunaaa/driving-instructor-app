"use client";

import React from "react";
import { Sidebar } from "@/components/dashboard1/Sidebar";
import { Header } from "@/components/dashboard1/Header";
import { StatsGrid } from "@/components/dashboard1/StatsGrid";
import { ScheduleTimeline } from "@/components/dashboard1/ScheduleTimeline";
import { RecentActivity } from "@/components/dashboard1/RecentActivity";

export default function Dashboard1Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 flex">
      <Sidebar />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Instructor!</h2>
              <p className="text-slate-400">Here's what's happening with your students today.</p>
            </div>

            <StatsGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ScheduleTimeline />
              </div>
              <div className="lg:col-span-1">
                <RecentActivity />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
