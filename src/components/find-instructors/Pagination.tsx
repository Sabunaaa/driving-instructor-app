"use client";

import React from "react";
// @ts-ignore
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (current: number, total: number): number[] => {
    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 1) return [1, 2, 3];
    if (current >= total) return [total - 2, total - 1, total];
    return [current - 1, current, current + 1];
  };

  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      {/* Prev */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`px-2 py-2 rounded-lg transition-colors text-black ${
          currentPage === 1
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page numbers */}
      {getPageNumbers(currentPage, totalPages).map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={`page-${page}`}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? "page" : undefined}
            className={`min-w-9 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`px-2 py-2 rounded-lg transition-colors text-black ${
          currentPage === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
