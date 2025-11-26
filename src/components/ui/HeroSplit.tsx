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
  // When true, use a more compact height/typography
  compact?: boolean;
};

export default function HeroSplit({
  eyebrow = "DriveConnect",
  title,
  subtitle,
  ctaHref = "/help",
  ctaLabel = "Get in touch",
  rating = 5,
  rightImageSrc = "/images/instructor-hero.jpg",
  rightImageAlt = "Driving instructor with car",
  leftBgClassName = "bg-gradient-to-br from-indigo-700 to-indigo-600",
  fullHeight = false,
  compact = false,
}: HeroSplitProps) {
  const stars = Math.max(0, Math.min(5, rating));
  const heightClasses = fullHeight
    ? "min-h-[520px] md:min-h-[80vh]"
    : compact
    ? "min-h-[260px] md:min-h-[340px]"
    : "min-h-[560px] md:min-h-[680px]";
  const eyebrowClasses = compact
    ? "text-black/80 font-semibold tracking-wide mb-3 text-lg sm:text-xl"
    : "text-black/80 font-semibold tracking-wide mb-6 text-2xl sm:text-3xl";
  const titleClasses = compact
    ? "text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
    : "text-7xl sm:text-8xl font-bold leading-tight";
  const subtitleClasses = compact
    ? "mt-3 text-gray-800 text-lg sm:text-xl md:text-2xl"
    : "mt-8 text-gray-800 text-3xl sm:text-4xl";
  const ratingMargin = compact ? "mt-4" : "mt-10";
  // In compact mode keep CTA in normal flow to avoid overlap with stars
  const ctaOffset = compact
    ? "mt-6"
    : "mt-12 lg:mt-0 lg:absolute lg:left-10 lg:bottom-[100px]";

  return (
    <section className="w-full">
      <div
        className={`grid md:grid-cols-3 ${heightClasses} rounded-none overflow-hidden ${leftBgClassName}`}
      >
        {/* Left: content */}
        <div
          className={`md:col-span-2 relative flex items-start text-gray-900 ${
            compact
              ? "px-6 sm:px-8 pt-6 pb-8 md:pt-6 md:pb-8 lg:pb-16"
              : "px-6 sm:px-10 pt-6 pb-10 md:pt-8 md:pb-12 lg:pb-[170px]"
          }`}
        >
          <div className="max-w-6xl mx-auto md:mx-0">
            {eyebrow && <p className={eyebrowClasses}>{eyebrow}</p>}
            <h1 className={titleClasses}>{title}</h1>
            {typeof subtitle === "string" && subtitle.length > 0 && (
              <p className={subtitleClasses}>{subtitle}</p>
            )}

            {/* Rating */}
            <div
              className={`${ratingMargin} flex gap-1`}
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
              <div className={ctaOffset}>
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
            className={`${
              compact
                ? "w-auto max-w-full max-h-[260px] sm:max-h-[320px] md:max-h-[420px]"
                : "w-auto max-w-full max-h-[360px] sm:max-h-[460px] md:max-h-[780px] lg:max-h-[840px]"
            } object-contain drop-shadow-md select-none pointer-events-none`}
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
