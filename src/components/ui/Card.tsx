import React from "react";
import Link from "next/link";

type CardPadding = "sm" | "md" | "lg";

export type CardProps = React.PropsWithChildren<{
  href?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
  className?: string;
  padding?: CardPadding;
  interactive?: boolean; // adds hover shadow and cursor-pointer
  as?: "div" | "section" | "article";
  role?: string;
  // Accessibility: custom aria-label when the whole card is clickable
  ariaLabel?: string;
}>;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const paddingMap: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const isExternalHref = (href: string) =>
  /^(https?:)?\/\//.test(href) ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");

/**
 * Generic reusable Card container used across pages. It centralizes the
 * rounded, shadowed, bordered styling so all cards stay consistent.
 */
const Card: React.FC<CardProps> = ({
  href,
  onClick,
  className,
  padding = "md",
  interactive,
  as = "div",
  role,
  ariaLabel,
  children,
}) => {
  const base = cn(
    "bg-white rounded-xl shadow-sm border border-gray-200",
    paddingMap[padding],
    (interactive || !!href) &&
      "hover:shadow-md transition-shadow cursor-pointer",
    "h-full",
    className
  );

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick as any}
          className={cn(
            base,
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
          )}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        onClick={onClick as any}
        aria-label={ariaLabel}
        className={cn(
          base,
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 block"
        )}
      >
        {children}
      </Link>
    );
  }

  const Component: any = as;
  return (
    <Component
      className={cn(
        base,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
      )}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
};

export default Card;
