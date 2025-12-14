"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Search, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "/dashboard/student" },
  { icon: Calendar, label: "Lessons", href: "/dashboard/student/lessons" },
  { icon: Search, label: "Find", href: "/find-instructors" },
  { icon: User, label: "Profile", href: "/dashboard/student/settings" },
];

export const StudentBottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden z-50 pb-safe">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center gap-1 ${
                isActive ? "text-[#F03D3D]" : "text-gray-400"
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
