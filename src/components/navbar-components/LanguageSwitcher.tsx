"use client";

import React from "react";
import { Languages } from "lucide-react";

export interface LanguageSwitcherProps {
  onLanguageChange?: (language: string) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  onLanguageChange,
}) => {
  return (
    <div className="flex items-center p-2.75">
      <button
        type="button"
        aria-label="Language selector"
        onClick={() => onLanguageChange?.("en")}
        className="hover:opacity-75 transition-opacity"
      >
        <Languages size={18} color="#333D4C" />
      </button>
    </div>
  );
};
