"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronDown,
  Languages,
  LogIn,
  User,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import type { User as UserType } from "@/contexts/AuthContext";

interface NavbarDesktopProps {
  user: UserType | null;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({
  user,
  isDropdownOpen,
  setIsDropdownOpen,
  onLogout,
  onNavigate,
}) => {
  return (
    <>
      {/* Navigation (hidden under 1100px) */}
      <div className="flex items-center flex-1 justify-center min-w-0 max-[1100px]:hidden">
        {/* Nav link: Find Instructors */}
        <div
          className="flex items-center px-4 sm:px-6 py-2 cursor-pointer"
          onClick={() => onNavigate("/find-instructors")}
        >
          <span
            className="text-gray-700 font-medium"
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 500,
              color: "#333D4C",
            }}
          >
            Find Instructors
          </span>
        </div>

        {/* Nav link: How it Works / For Instructors */}
        <div className="flex items-center px-4 sm:px-6 py-2">
          <Link
            href={
              user?.userType === "instructor"
                ? "/for-instructors"
                : "/how-it-works"
            }
            className="text-gray-700 font-medium hover:text-gray-900 hover:underline underline-offset-4 transition-colors"
            style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500 }}
          >
            {user?.userType === "instructor"
              ? "For Instructors"
              : "How it Works"}
          </Link>
        </div>

        {/* Nav link: Blog */}
        <div className="flex items-center px-4 sm:px-6 py-2">
          <Link
            href="/blog"
            className="text-gray-700 font-medium hover:text-gray-900 hover:underline underline-offset-4 transition-colors"
            style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500 }}
          >
            Blog
          </Link>
        </div>

        {/* Nav link: Contact us */}
        <div className="flex items-center px-4 sm:px-6 py-2">
          <Link
            href="/contact"
            className="text-gray-700 font-medium hover:text-gray-900 hover:underline underline-offset-4 transition-colors"
            style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500 }}
          >
            Contact us
          </Link>
        </div>
      </div>

      {/* Desktop Buttons (hidden under 1100px) */}
      <div className="flex items-center gap-1 flex-shrink-0 flex-wrap max-[1100px]:hidden">
        {/* Languages button */}
        <div className="flex items-center p-2.75">
          <Languages size={18} color="#333D4C" />
        </div>

        {/* Conditional Button group */}
        {user ? (
          /* Authenticated user - show user dropdown */
          <div className="flex items-center gap-3 pl-2 relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer min-w-[192px]"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatarUrl}
                      alt={`${user.name} avatar`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={16} className="text-gray-600" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.userType}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform flex-shrink-0 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onNavigate("/dashboard");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={16} className="text-gray-400" />
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onNavigate("/account-settings");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings size={16} className="text-gray-400" />
                  Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onNavigate("/help");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <HelpCircle size={16} className="text-gray-400" />
                  Help
                </button>
                <hr className="my-2 border-gray-200" />
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogout();
                    onNavigate("/");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} className="text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Non-authenticated user - show login/signup buttons */
          <div className="flex items-center gap-2 sm:gap-3 pl-2">
            {/* Log in button - Secondary/Outline */}
            <button
              type="button"
              onClick={() => onNavigate("/login")}
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg font-medium border border-gray-200 text-gray-700 bg-transparent hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 500,
                color: "#333D4C",
                borderColor: "#E0E5EB",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F3F4F6";
                e.currentTarget.style.borderColor = "#D1D5DB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "#E0E5EB";
              }}
            >
              <LogIn size={16} color="#333D4C" />
              <span>Log in</span>
            </button>

            {/* Sign up button - Primary/Solid */}
            <button
              type="button"
              onClick={() => onNavigate("/signup")}
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 text-white rounded-lg font-medium hover:opacity-90 cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: "#F03D3D",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 500,
              }}
            >
              <User size={16} color="white" />
              <span>Sign up</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarDesktop;
