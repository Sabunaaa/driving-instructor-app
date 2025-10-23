"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface NavLinksProps {
  userType?: string | null;
  onLinkClick?: () => void;
}

export const NavLinks: React.FC<NavLinksProps> = ({ userType, onLinkClick }) => {
  const router = useRouter();

  return (
    <div className="flex items-center flex-1 justify-center min-w-0 max-[1100px]:hidden">
      {/* Find Instructors Link */}
      <div
        className="flex items-center px-4 sm:px-6 py-2 cursor-pointer"
        onClick={() => {
          router.push("/find-instructors");
          onLinkClick?.();
        }}
      >
        <span
          className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
          style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500 }}
        >
          Find Instructors
        </span>
      </div>

      {/* How it Works / For Instructors Link */}
      <div className="flex items-center px-4 sm:px-6 py-2">
        <Link
          href={userType === "instructor" ? "/for-instructors" : "/how-it-works"}
          className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
          style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500 }}
          onClick={onLinkClick}
        >
          {userType === "instructor" ? "For Instructors" : "How it Works"}
        </Link>
      </div>

      {/* Blog Link */}
      <div className="flex items-center px-4 sm:px-6 py-2">
        <Link
          href="/blog"
          className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
          style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500 }}
          onClick={onLinkClick}
        >
          Blog
        </Link>
      </div>

      {/* Contact us Link */}
      <div className="flex items-center px-4 sm:px-6 py-2">
        <Link
          href="/contact"
          className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
          style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 500 }}
          onClick={onLinkClick}
        >
          Contact us
        </Link>
      </div>
    </div>
  );
};
