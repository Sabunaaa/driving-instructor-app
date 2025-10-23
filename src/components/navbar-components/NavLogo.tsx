"use client";

import React from "react";
import Link from "next/link";

export interface NavLogoProps {
  onClick?: () => void;
}

export const NavLogo: React.FC<NavLogoProps> = ({ onClick }) => {
  return (
    <Link
      href="/"
      aria-label="DriveConnect home"
      className="flex items-center gap-2 h-14 cursor-pointer flex-shrink-0"
      onClick={onClick}
    >
      <div className="w-8.5 h-8.5 relative">
        <div className="w-8.5 h-8.5 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-5 h-5 bg-white rounded-full opacity-20"></div>
        </div>
      </div>
      <span
        className="text-gray-900 font-semibold"
        style={{ fontSize: "24px", lineHeight: "32px", fontWeight: 600 }}
      >
        DriveConnect
      </span>
    </Link>
  );
};
