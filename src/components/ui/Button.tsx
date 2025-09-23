"use client";

import React from "react";

type Variant = "primary" | "outline" | "subtle";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
}

const COLORS = {
  primary: {
    base: "bg-[#F03D3D] border border-[#F03D3D] text-white hover:opacity-90",
    disabled:
      "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed",
  },
  outline: {
    base: "bg-transparent border border-[#F03D3D] text-[#F03D3D] hover:bg-[#F03D3D]/5",
    disabled:
      "bg-transparent border border-gray-200 text-gray-400 cursor-not-allowed",
  },
  subtle: {
    base: "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200",
    disabled:
      "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed",
  },
} as const;

const SIZES: Record<Size, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3",
};

export default function Button({
  variant = "primary",
  size = "md",
  block,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const color = disabled ? COLORS[variant].disabled : COLORS[variant].base;
  const width = block ? "w-full" : "";

  return (
    <button
      className={[
        "rounded-lg font-medium transition-colors",
        color,
        SIZES[size],
        width,
        className,
      ].join(" ")}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
