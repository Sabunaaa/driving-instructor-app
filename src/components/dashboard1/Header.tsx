"use client";

import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <h1 className="text-xl font-bold text-white hidden md:block">Dashboard</h1>
        <div className="relative max-w-md w-full ml-8 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search students, lessons..."
            className="w-full bg-slate-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-white">{user?.name || "Instructor"}</div>
            <div className="text-xs text-slate-500">Pro Instructor</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold border-2 border-slate-800">
            {user?.name?.[0] || "I"}
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </header>
  );
};
