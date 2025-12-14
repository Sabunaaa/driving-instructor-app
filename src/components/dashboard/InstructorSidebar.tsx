"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Settings, 
  LogOut,
  Car
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard/instructor" },
  { icon: Calendar, label: "Schedule", href: "/dashboard/instructor/schedule" },
  { icon: Users, label: "Students", href: "/dashboard/instructor/students" },
  { icon: DollarSign, label: "Earnings", href: "/dashboard/instructor/earnings" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/instructor/messages" },
  { icon: Settings, label: "Settings", href: "/dashboard/instructor/settings" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const InstructorSidebar = ({ isOpen, onClose }: SidebarProps) => {
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

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50 shadow-sm transition-transform duration-300 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#F03D3D] rounded-xl flex items-center justify-center shadow-md shadow-red-200">
          <Car className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-gray-900">
          Drive<span className="text-[#F03D3D]">Forward</span>
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#F03D3D] text-white shadow-lg shadow-red-200"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-500 hover:bg-red-50 hover:text-[#F03D3D] transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
    </>
  );
};
