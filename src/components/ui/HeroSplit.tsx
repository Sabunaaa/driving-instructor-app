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
  // When true, hero will fill the viewport height
  fullHeight?: boolean;
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
  fullHeight = false,
}: HeroSplitProps) {
  const stars = Math.max(0, Math.min(5, rating));

  return (
    <section className="w-full">
      <div
        className={`grid md:grid-cols-3 ${
          fullHeight
            ? "min-h-[520px] md:min-h-[80vh]"
            : "min-h-[560px] md:min-h-[680px]"
        } rounded-none overflow-hidden ${leftBgClassName}`}
      >
        {/* Left: content */}
        <div
          className={`md:col-span-2 relative flex items-start text-gray-900 px-6 sm:px-10 pt-6 pb-10 md:pt-8 md:pb-12 lg:pb-[170px]`}
        >
          <div className="max-w-6xl mx-auto md:mx-0">
            {eyebrow && (
              <p className="text-black/80 font-semibold tracking-wide mb-6 text-2xl sm:text-3xl">
                {eyebrow}
              </p>
            )}
            <h1 className="text-7xl sm:text-8xl font-bold leading-tight">
              {title}
            </h1>
            {typeof subtitle === "string" && subtitle.length > 0 && (
              <p className="mt-8 text-gray-800 text-3xl sm:text-4xl">
                {subtitle}
              </p>
            )}

            {/* Rating */}
            <div
              className="mt-10 flex gap-1"
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
              <div className="mt-12 lg:mt-0 lg:absolute lg:left-10 lg:bottom-[100px]">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-full bg-black text-white font-semibold px-6 py-3 shadow-sm hover:shadow-md hover:scale-[1.02] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/60"
                >
                  {ctaLabel}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right: image */}
        <div className="md:col-span-1 relative h-[320px] md:h-full flex items-end justify-center px-6 md:px-8 pb-10 md:pb-12 pt-4 md:pt-0">
          {/* Plain img keeps it simple without Next config for external domains */}
          <img
            src={rightImageSrc}
            alt={rightImageAlt}
            className="w-auto max-w-full max-h-[360px] sm:max-h-[460px] md:max-h-[780px] lg:max-h-[840px] object-contain drop-shadow-md select-none pointer-events-none"
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
