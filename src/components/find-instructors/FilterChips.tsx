"use client";

import React from "react";
// @ts-ignore
import { X } from "lucide-react";

interface FilterChip {
  label: string;
  onRemove: () => void;
}

interface FilterChipsProps {
  chips: FilterChip[];
  onClearAll: () => void;
}

const FilterChipsComponent: React.FC<FilterChipsProps> = ({ chips, onClearAll }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex gap-2 overflow-x-auto sm:overflow-visible whitespace-nowrap sm:whitespace-normal sm:flex-wrap">
        {chips.slice(0, 12).map((chip, index) => (
          <button
            key={index}
            type="button"
            onClick={chip.onRemove}
            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-300"
          >
            <X size={12} />
            {chip.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearAll}
        className="text-sm font-medium text-gray-900 hover:text-gray-700 self-start sm:self-auto"
      >
        Clear all
      </button>
    </div>
  );
};

// Memoized component to prevent unnecessary re-renders
export const FilterChips = React.memo(
  FilterChipsComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.chips.length === nextProps.chips.length &&
      prevProps.chips.every(
        (chip, index) => chip.label === nextProps.chips[index]?.label
      )
    );
  }
);
