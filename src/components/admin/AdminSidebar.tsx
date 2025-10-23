"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Users,
  UserCheck,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  BookOpen,
  Inbox,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AdminSidebarProps {
  activeItem?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeItem }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/admin",
    },
    {
      icon: Users,
      label: "Users",
      href: "/admin/users",
    },
    {
      icon: UserCheck,
      label: "Instructors",
      href: "/admin/instructors",
    },
    {
      icon: Inbox,
      label: "Requests",
      href: "/admin/requests",
    },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/admin/payments",
    },
    {
      icon: BookOpen,
      label: "Blog",
      href: "/admin/blog",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="w-full max-w-xs flex flex-col" style={{ width: "266px" }}>
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full"
        style={{ minHeight: "600px" }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 p-6 pb-4 border-b border-gray-100">
          {/* Avatar */}
          <div
            className="rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden"
            style={{ width: "64px", height: "64px" }}
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`${user.name}'s avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-xl">A</span>
            )}
          </div>

          {/* Name and Role */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-900 font-semibold text-center text-base">
              Admin Panel
            </span>
            <span className="text-gray-500 text-center text-sm">
              {user?.name || "Administrator"}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col px-4 py-4 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive =
              activeItem === item.label ||
              (pathname === "/admin" && item.href === "/admin") ||
              (pathname.startsWith(item.href) && item.href !== "/admin");

            return (
              <button
                key={index}
                onClick={() => router.push(item.href)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left w-full ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full text-left"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
