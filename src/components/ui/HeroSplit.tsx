"use client";

import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

type HeroSplitProps = {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  rating?: number; // 0..5
  rightImageSrc?: string;
  rightImageAlt?: string;
  // Tailwind classes for left background color/gradient
  leftBgClassName?: string;
};

export default function HeroSplit({
  eyebrow = "DriveConnect",
  title,
  subtitle,
  ctaHref = "/contact",
  ctaLabel = "Get in touch",
  rating = 5,
  rightImageSrc = "/images/instructor-hero.jpg",
  rightImageAlt = "Driving instructor with car",
  leftBgClassName = "bg-gradient-to-br from-indigo-700 to-indigo-600",
}: HeroSplitProps) {
  const stars = Math.max(0, Math.min(5, rating));

  return (
    <section className="w-full">
      <div className="grid md:grid-cols-3 min-h-[680px] rounded-none md:rounded-xl overflow-hidden">
        {/* Left: content */}
        <div
          className={`md:col-span-2 flex items-center ${leftBgClassName} text-gray-900 px-6 sm:px-10 py-20`}
        >
          <div className="max-w-xl mx-auto md:mx-0">
            {eyebrow && (
              <p className="text-black/80 font-semibold tracking-wide mb-4">
                {eyebrow}
              </p>
            )}
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              {title}
            </h1>
            {typeof subtitle === "string" && subtitle.length > 0 && (
              <p className="mt-4 text-gray-700 text-lg">{subtitle}</p>
            )}

            {/* Rating */}
            <div
              className="mt-5 flex gap-1"
              aria-label={`${stars} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={22}
                  className={
                    i < stars ? "text-red-500 fill-current" : "text-black/20"
                  }
                  strokeWidth={i < stars ? 0 : 2}
                />
              ))}
            </div>

            {/* CTA */}
            {ctaLabel && (
              <div className="mt-8">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 font-semibold px-6 py-3 shadow-sm hover:shadow-md hover:scale-[1.02] transition"
                >
                  {ctaLabel}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right: image */}
        <div className="md:col-span-1 relative h-[320px] md:h-full bg-gray-200">
          {/* Plain img keeps it simple without Next config for external domains */}
          <img
            src={rightImageSrc}
            alt={rightImageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // graceful fallback to a subtle gradient if image missing
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
              (target.parentElement as HTMLElement).classList.add(
                "bg-gradient-to-br",
                "from-gray-300",
                "to-gray-100"
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
