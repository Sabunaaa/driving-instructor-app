"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Settings, HelpCircle, LogOut, LogIn } from "lucide-react";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
  onLogout: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleNavClick = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 shadow-lg rounded-b-lg overflow-hidden min-[1101px]:hidden">
      <div className="px-4 py-3 flex flex-col gap-1">
        <Link
          href="/find-instructors"
          onClick={onClose}
          className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800"
        >
          Find Instructors
        </Link>
        <Link
          href={user?.userType === "instructor" ? "/for-instructors" : "/how-it-works"}
          onClick={onClose}
          className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800"
        >
          {user?.userType === "instructor" ? "For Instructors" : "How it Works"}
        </Link>
        <Link
          href="/blog"
          onClick={onClose}
          className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800"
        >
          Blog
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800"
        >
          Contact us
        </Link>
        <hr className="my-2 border-gray-200" />

        {user ? (
          <>
            <button
              type="button"
              onClick={() => handleNavClick("/dashboard")}
              className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800 flex items-center gap-2"
            >
              <User size={16} className="text-gray-500" />
              Profile
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("/account-settings")}
              className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800 flex items-center gap-2"
            >
              <Settings size={16} className="text-gray-500" />
              Settings
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("/help")}
              className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-gray-800 flex items-center gap-2"
            >
              <HelpCircle size={16} className="text-gray-500" />
              Help
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onLogout();
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
              onClick={() => handleNavClick("/login")}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-medium border border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 transition-colors"
            >
              <LogIn size={16} className="text-gray-700" />
              Log in
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("/signup")}
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
  );
};
