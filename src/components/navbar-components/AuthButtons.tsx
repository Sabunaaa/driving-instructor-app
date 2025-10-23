"use client";

import React from "react";
import { LogIn, User } from "lucide-react";
import { useRouter } from "next/navigation";

export interface AuthButtonsProps {
  onButtonClick?: () => void;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({ onButtonClick }) => {
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
    onButtonClick?.();
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 pl-2">
      {/* Log in button - Secondary/Outline */}
      <button
        type="button"
        onClick={() => handleClick("/login")}
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
        onClick={() => handleClick("/signup")}
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
  );
};
