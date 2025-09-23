"use client";

import Link from "next/link";
import React from "react";
import { Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-black text-white">
      <div className="mx-auto px-6 2xl:px-[120px] 3xl:px-[120px] py-10 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-xl font-semibold tracking-tight">
                Instru
              </span>
            </Link>
            <p className="text-sm/6 opacity-90 max-w-xs">
              Learn to drive with confidence. Find trusted instructors near you
              and book lessons online.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase/relaxed tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/find-instructors" className="hover:underline">
                  Find instructors
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase/relaxed tracking-wide">
              Account
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/signup" className="hover:underline">
                  Create account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/account-settings" className="hover:underline">
                  Account settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase/relaxed tracking-wide">
              Contact us
            </h4>
            <p className="text-sm/6 opacity-90 mb-3">
              Questions or feedback? Drop us a line.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-white" />
                <a
                  href="mailto:support@instru.app"
                  className="text-sm underline decoration-white/60 hover:decoration-white"
                >
                  support@instru.app
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-white" />
                <a
                  href="tel:+995555123456"
                  className="text-sm underline decoration-white/60 hover:decoration-white"
                >
                  +995 555 123 456
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/20 my-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm opacity-90">
            © {year} Instru. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm opacity-90">
            <Link href="/help" className="hover:underline">
              Support
            </Link>
            <Link href="/help" className="hover:underline">
              FAQ
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
