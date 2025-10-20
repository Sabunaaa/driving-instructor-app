"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

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

        {/* Desktop Navigation and Auth */}
        <NavbarDesktop
          user={user}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          onLogout={logout}
          onNavigate={(path) => router.push(path)}
        />

        {/* Burger button (shown under 1100px) */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isMobileNavOpen}
          onClick={() => {
            setIsMobileNavOpen((v) => !v);
            setIsDropdownOpen(false);
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
        <NavbarMobile
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          user={user}
          onLogout={logout}
          onNavigate={(path) => router.push(path)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
