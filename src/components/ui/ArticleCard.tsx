"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";

export type ArticleCardProps = {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  date: string | Date;
  tag?: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
  variant?: "list" | "featured"; // layout variant
};

function formatDate(date: string | Date) {
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    // e.g., May 16, 2024
    return d.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return String(date);
  }
}

const Avatar: React.FC<{ name: string; src?: string; size?: number }> = ({
  name,
  src,
  size = 32,
}) => {
  const initials = React.useMemo(() => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [name]);

  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-600 ring-1 ring-gray-200 overflow-hidden"
      style={{ width: size, height: size }}
      aria-label={name}
      title={name}
    >
      {src ? (
        // Using next/image here to keep optimization while preserving circle crop via parent overflow-hidden
        <Image src={src} alt={name} width={size} height={size} />
      ) : (
        <span className="text-[0.65rem] font-medium">{initials}</span>
      )}
    </span>
  );
};

export default function ArticleCard({
  title,
  excerpt,
  author,
  date,
  tag,
  imageUrl,
  imageAlt = "",
  href,
  className,
  variant = "list",
}: ArticleCardProps) {
  const isFeatured = variant === "featured";
  const defaultImage = "/images/404/instru.png";

  const card = isFeatured ? (
    // Featured: large top image, content below
    <article
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-64 sm:h-72 md:h-80 w-full">
        <Image
          src={imageUrl || defaultImage}
          alt={imageAlt || title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
          <Avatar name={author.name} src={author.avatarUrl} />
          <span className="truncate">
            <span className="font-medium text-gray-700">{author.name}</span>
            <span className="mx-1">·</span>
            <time>{formatDate(date)}</time>
          </span>
        </div>
        <h3 className="text-2xl font-semibold leading-snug text-gray-900">
          {title}
        </h3>
        {tag ? (
          <div className="mt-4">
            <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-gray-700 ring-1 ring-inset ring-gray-200">
              {tag}
            </span>
          </div>
        ) : null}
      </div>
    </article>
  ) : (
    // List: compact horizontal, thumbnail on right
    <article
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md",
        className
      )}
    >
      <div className="grid grid-cols-[1fr_auto] gap-6 p-5 sm:p-6">
        {/* Left: Text */}
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <Avatar name={author.name} src={author.avatarUrl} />
            <span className="truncate">
              <span className="font-medium text-gray-700">{author.name}</span>
              <span className="mx-1">·</span>
              <time>{formatDate(date)}</time>
            </span>
          </div>

          <h3 className="line-clamp-2 text-xl font-semibold leading-snug text-gray-900 decoration-purple-500/40 underline-offset-2 group-hover:underline">
            {title}
          </h3>

          <p className="mt-2 line-clamp-2 text-gray-600">{excerpt}</p>

          {tag ? (
            <div className="mt-4">
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-gray-700 ring-1 ring-inset ring-gray-200">
                {tag}
              </span>
            </div>
          ) : null}
        </div>

        {/* Right: Image with dashed divider */}
        <div className="flex items-center pl-6 border-l border-dashed border-gray-200">
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md ring-1 ring-gray-200/70">
            <Image
              src={imageUrl || defaultImage}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 640px) 8rem, 12rem"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="block focus:outline-none">
      {card}
    </Link>
  ) : (
    card
  );
}

// Simple local cn util if not present
function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}
