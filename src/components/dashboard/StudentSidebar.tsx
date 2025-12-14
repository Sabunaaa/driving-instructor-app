"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Search,
  Settings, 
  LogOut,
  Car
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard/student" },
  { icon: Calendar, label: "My Lessons", href: "/dashboard/student/lessons" },
  { icon: Search, label: "Find Instructors", href: "/find-instructors" },
  { icon: Settings, label: "Settings", href: "/dashboard/student/settings" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const StudentSidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 hidden md:flex flex-col z-50 shadow-sm`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#F03D3D] rounded-xl flex items-center justify-center shadow-md shadow-red-200">
          <Car className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">DriveMaster</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-red-50 text-[#F03D3D] font-semibold shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${
                isActive ? "text-[#F03D3D]" : "text-gray-400 group-hover:text-gray-600"
              }`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-500 hover:bg-red-50 hover:text-[#F03D3D] transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 text-gray-400 group-hover:text-[#F03D3D]" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
    </>
  );
};
