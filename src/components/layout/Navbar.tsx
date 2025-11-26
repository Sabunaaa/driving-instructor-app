"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NavLogo } from "@/components/navbar-components/NavLogo";
import { NavLinks } from "@/components/navbar-components/NavLinks";
import { UserMenu } from "@/components/navbar-components/UserMenu";
import { AuthButtons } from "@/components/navbar-components/AuthButtons";
import { MobileMenu } from "@/components/navbar-components/MobileMenu";
import { LanguageSwitcher } from "@/components/navbar-components/LanguageSwitcher";

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  // Hide navbar on test pages
  if (pathname === "/" || pathname === "/main" || pathname === "/main1" || pathname === "/dashboard1" || pathname === "/minigame" || pathname?.startsWith("/find-instructors-test") || pathname?.startsWith("/for-instructors-test") || pathname?.startsWith("/for-instructors/signup-test")) {
    return null;
  }

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

  const handleMobileNavToggle = () => {
    setIsMobileNavOpen((v) => !v);
    setIsDropdownOpen(false);
  };

  const handleMobileMenuClose = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <nav className="w-full bg-white text-base sticky top-0 z-50 border-b border-gray-200">
      <div className="relative w-full mx-auto flex items-center justify-between gap-3 px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-2.5 flex-wrap max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        {/* Logo */}
        <NavLogo />

        {/* Navigation Links */}
        <NavLinks userType={user?.userType} onLinkClick={() => {}} />

        {/* Desktop Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0 flex-wrap max-[1100px]:hidden">
          <LanguageSwitcher />

          {user ? (
            <UserMenu
              user={user}
              isDropdownOpen={isDropdownOpen}
              onDropdownToggle={setIsDropdownOpen}
              onLogout={logout}
            />
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Mobile Burger Button */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isMobileNavOpen}
          onClick={handleMobileNavToggle}
          className="flex items-center justify-center p-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors min-[1101px]:hidden"
        >
          {isMobileNavOpen ? (
            <X size={18} className="text-gray-700" />
          ) : (
            <Menu size={18} className="text-gray-700" />
          )}
        </button>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileNavOpen}
          onClose={handleMobileMenuClose}
          user={user}
          onLogout={logout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
