"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// @ts-ignore
import {
  ChevronDown,
  Languages,
  LogIn,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = React.useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
      if (isHelpDropdownOpen) {
        setIsHelpDropdownOpen(false);
      }
    };

    if (isDropdownOpen || isHelpDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen, isHelpDropdownOpen]);

  return (
    <nav className="w-full bg-white text-base sticky top-0 z-50 border-b border-gray-200/60 backdrop-blur supports-[backdrop-filter]:bg-white/95">
      <div className="relative w-full mx-auto flex items-center justify-between gap-3 px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-2.5 flex-wrap max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        {/* Logo (click to go home) */}
        <Link
          href="/"
          aria-label="DriveConnect home"
          className="flex items-center gap-2 h-14 cursor-pointer flex-shrink-0"
        >
          <div className="w-8.5 h-8.5 relative">
            {/* Logo icon placeholder - using a simple red circle for now */}
            <div className="w-8.5 h-8.5 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-full opacity-20"></div>
            </div>
          </div>
          <span
            className="text-gray-900 font-semibold hover:underline underline-offset-4"
            style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }}
          >
            DriveConnect
          </span>
        </Link>

        {/* Navigation (hidden under 1100px) */}
        <div className="flex items-center flex-1 justify-center min-w-0 max-[1100px]:hidden">
          {/* Nav link: Find Instructors */}
          <div
            className="flex items-center px-4 sm:px-6 py-2 cursor-pointer"
            onClick={() => router.push("/find-instructors")}
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

          {/* Nav link: How it Works */}
          <div className="flex items-center px-4 sm:px-6 py-2">
            <Link
              href="/how-it-works"
              className="text-gray-700 font-medium hover:text-gray-900 hover:underline underline-offset-4 transition-colors"
              style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500 }}
            >
              How it Works
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

          {/* Dropdown: Help */}
          <div className="flex items-center gap-2 px-6 py-2 relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsHelpDropdownOpen(!isHelpDropdownOpen);
              }}
              className="flex items-center gap-2"
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
                Help
              </span>
              <div className="flex items-center pt-0.75">
                <ChevronDown size={16} color="#333D4C" />
              </div>
            </button>

            {/* Help Dropdown Menu */}
            {isHelpDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setIsHelpDropdownOpen(false);
                    router.push("/help");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Help Center
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsHelpDropdownOpen(false);
                    router.push("/for-instructors");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  For Instructors
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsHelpDropdownOpen(false);
                    router.push("/contact");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Contact Us
                </button>
              </div>
            )}
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
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
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
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${
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
                      router.push("/dashboard");
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LayoutDashboard size={16} className="text-gray-400" />
                    Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push("/account-settings");
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} className="text-gray-400" />
                    Settings
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                      router.push("/");
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
                onClick={() => router.push("/login")}
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
                onClick={() => router.push("/signup")}
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

        {/* Burger button (shown under 1100px) */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isMobileNavOpen}
          onClick={() => {
            setIsMobileNavOpen((v) => !v);
            setIsDropdownOpen(false);
            setIsHelpDropdownOpen(false);
          }}
          className="flex items-center justify-center p-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors min-[1101px]:hidden"
        >
          {isMobileNavOpen ? (
            <X size={18} className="text-gray-700" />
          ) : (
            <Menu size={18} className="text-gray-700" />
          )}
        </button>

        {/* Mobile dropdown panel */}
        {isMobileNavOpen && (
          <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 shadow-lg rounded-b-lg overflow-hidden min-[1101px]:hidden">
            <div className="px-4 py-3 flex flex-col gap-1">
              <Link
                href="/find-instructors"
                onClick={() => setIsMobileNavOpen(false)}
                className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800"
              >
                Find Instructors
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setIsMobileNavOpen(false)}
                className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800"
              >
                How it Works
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMobileNavOpen(false)}
                className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800"
              >
                Blog
              </Link>
              <Link
                href="/help"
                onClick={() => setIsMobileNavOpen(false)}
                className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800"
              >
                Help
              </Link>
              <hr className="my-2 border-gray-200" />
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      router.push("/dashboard");
                    }}
                    className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800 flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} className="text-gray-500" />
                    Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      router.push("/account-settings");
                    }}
                    className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800 flex items-center gap-2"
                  >
                    <Settings size={16} className="text-gray-500" />
                    Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      logout();
                      router.push("/");
                    }}
                    className="w-full text-left px-2 py-2 rounded-md hover:bg-red-50 text-red-600 flex items-center gap-2"
                  >
                    <LogOut size={16} className="text-red-500" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      router.push("/login");
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-medium border border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 transition-colors"
                  >
                    <LogIn size={16} className="text-gray-700" />
                    Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      router.push("/signup");
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-white rounded-lg font-medium transition-colors"
                    style={{ backgroundColor: "#D85151" }}
                  >
                    <User size={16} color="white" />
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
