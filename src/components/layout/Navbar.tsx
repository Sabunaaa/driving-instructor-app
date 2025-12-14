"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Languages, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/hooks";
import Button from "@/components/ui/Button";
import NotificationsDropdown from "@/components/navbar-components/NotificationsDropdown";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const pathname = usePathname();

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications(user?.userType);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsNotificationsOpen(false);
  }, [pathname]);

  const isDashboard = pathname?.startsWith('/dashboard');

  // Hide navbar on signup pages
  if (pathname === '/for-instructors/signup') {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/find-instructors", label: "Find Instructors" },
    { href: "/for-instructors", label: "For Instructors" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      <nav 
        className={`${isDashboard ? "absolute" : "fixed"} top-0 left-0 right-0 z-50 ${!isDashboard ? "transition-all duration-300" : ""} ${
          (!isDashboard && isScrolled) || isMobileMenuOpen
            ? "bg-white/90 backdrop-blur-md py-3 shadow-sm" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#F03D3D] rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition duration-300">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled || isMobileMenuOpen ? "text-gray-900" : "text-gray-900"}`}>
              Drive<span className="text-[#F03D3D]">Forward</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#F03D3D] ${
                  pathname === link.href ? "text-[#F03D3D]" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth/User */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 text-gray-600 hover:text-[#F03D3D] transition-colors rounded-full hover:bg-gray-50"
                  aria-label="Change language"
                >
                  <Languages className="w-5 h-5" />
                </button>
                
                <NotificationsDropdown
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                  onToggle={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsUserMenuOpen(false);
                  }}
                  notifications={notifications}
                  unreadCount={unreadCount}
                  onMarkAsRead={markAsRead}
                  onMarkAllAsRead={markAllAsRead}
                  onRemove={removeNotification}
                />
                
                <div className="relative">
                  <button 
                    onClick={() => {
                      setIsUserMenuOpen(!isUserMenuOpen);
                      setIsNotificationsOpen(false);
                    }}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-gray-200 hover:border-gray-300 bg-white transition"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <User className="w-4 h-4" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-2">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#F03D3D]">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    
                    <div className="border-t border-gray-50 mt-2 pt-2">
                      <button 
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
              </div>
            ) : (
              <>
                <button 
                  className="p-2 text-gray-600 hover:text-[#F03D3D] transition-colors rounded-full hover:bg-gray-50"
                  aria-label="Change language"
                >
                  <Languages className="w-5 h-5" />
                </button>
                <Link href="/login" className="text-sm font-bold text-gray-900 hover:text-[#F03D3D] transition">
                  Log In
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="rounded-full px-6 shadow-lg shadow-red-500/20">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-in slide-in-from-top-10 duration-300">
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-xl font-bold text-gray-900 hover:text-[#F03D3D]"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="h-px bg-gray-100 my-2" />
            
            <button className="flex items-center justify-center gap-2 text-lg font-medium text-gray-600 hover:text-[#F03D3D] mx-auto">
               <Languages className="w-5 h-5" />
               <span>Language</span>
            </button>

            <div className="h-px bg-gray-100 my-2" />
            
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="flex items-center justify-center gap-2 text-lg font-medium text-gray-600 hover:text-[#F03D3D]"
                >
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-[#F03D3D] text-white text-xs font-bold rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link href="/dashboard" className="text-lg font-medium text-gray-600">Dashboard</Link>
                <button onClick={logout} className="text-lg font-bold text-red-600">Log Out</button>
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <Link href="/login" className="w-full py-3 rounded-xl border border-gray-200 font-bold text-gray-900">
                  Log In
                </Link>
                <Link href="/signup" className="w-full py-3 rounded-xl bg-[#F03D3D] text-white font-bold shadow-lg shadow-red-500/20">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
