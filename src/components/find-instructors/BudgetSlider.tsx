"use client";

import React from "react";

interface BudgetSliderProps {
  budgetRange: [number, number];
  onBudgetChange: (range: [number, number]) => void;
  min?: number;
  max?: number;
}

export const BudgetSlider: React.FC<BudgetSliderProps> = ({
  budgetRange,
  onBudgetChange,
  min = 40,
  max = 100,
}) => {
  const budgetTrackRef = React.useRef<HTMLDivElement | null>(null);
  const draggingRef = React.useRef<null | "left" | "right">(null);

  const valueFromClientX = (clientX: number) => {
    const rect = budgetTrackRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(min + pct * (max - min));
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!draggingRef.current) return;
    const val = valueFromClientX(e.clientX);
    if (val == null) return;

    if (draggingRef.current === "left") {
      const clamped = Math.min(val, budgetRange[1] - 1);
      if (clamped !== budgetRange[0])
        onBudgetChange([clamped, budgetRange[1]]);
    } else if (draggingRef.current === "right") {
      const clamped = Math.max(val, budgetRange[0] + 1);
      if (clamped !== budgetRange[1])
        onBudgetChange([budgetRange[0], clamped]);
    }
  };

  const stopDrag = () => {
    draggingRef.current = null;
    if (typeof window !== "undefined") {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDrag);
    }
  };

  const startDrag =
    (side: "left" | "right") => (e: React.PointerEvent<HTMLDivElement>) => {
      draggingRef.current = side;
      onPointerMove(e.nativeEvent);
      if (typeof window !== "undefined") {
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", stopDrag);
      }
    };

  const getPercentage = (value: number) =>
    ((value - min) / (max - min)) * 100;

  const leftPercent = getPercentage(budgetRange[0]);
  const rightPercent = getPercentage(budgetRange[1]);

  return (
    <div className="pt-6 pb-1">
      <div className="relative" ref={budgetTrackRef}>
        {/* Base Track Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={budgetRange[0]}
          onChange={(e) => {
            const value = Number(e.target.value);
            const leftDist = Math.abs(value - budgetRange[0]);
            const rightDist = Math.abs(value - budgetRange[1]);

            if (leftDist <= rightDist && value < budgetRange[1]) {
              onBudgetChange([value, budgetRange[1]]);
            } else if (rightDist < leftDist && value > budgetRange[0]) {
              onBudgetChange([budgetRange[0], value]);
            }
          }}
          className="absolute inset-0 w-full h-10 opacity-0 cursor-pointer z-10"
          style={{ WebkitAppearance: "none", appearance: "none" }}
          onDragStart={(e) => e.preventDefault()}
        />

        {/* Left Handle Input */}
        <input
          type="range"
          min={min}
          max={budgetRange[1] - 1}
          value={budgetRange[0]}
          onChange={(e) => {
            const value = Number(e.target.value);
            onBudgetChange([value, budgetRange[1]]);
          }}
          className="absolute inset-0 w-full h-10 opacity-0 cursor-grab active:cursor-grabbing z-30"
          style={{
            clipPath: `polygon(0% 0%, ${leftPercent + 14}% 0%, ${
              leftPercent + 14
            }% 100%, 0% 100%)`,
            WebkitAppearance: "none",
            appearance: "none",
          }}
          onDragStart={(e) => e.preventDefault()}
        />

        {/* Right Handle Input */}
        <input
          type="range"
          min={budgetRange[0] + 1}
          max={max}
          value={budgetRange[1]}
          onChange={(e) => {
            const value = Number(e.target.value);
            onBudgetChange([budgetRange[0], value]);
          }}
          className="absolute inset-0 w-full h-10 opacity-0 cursor-grab active:cursor-grabbing z-30"
          style={{
            clipPath: `polygon(${rightPercent - 14}% 0%, 100% 0%, 100% 100%, ${
              rightPercent - 14
            }% 100%)`,
            WebkitAppearance: "none",
            appearance: "none",
          }}
          onDragStart={(e) => e.preventDefault()}
        />

        {/* Visual Track */}
        <div className="w-full h-0.5 bg-gray-200 rounded-full relative pointer-events-none">
          <div
            className="absolute top-0 h-0.5 bg-gray-900 rounded-full"
            style={{
              left: `${leftPercent}%`,
              width: `${rightPercent - leftPercent}%`,
            }}
          />
        </div>

        {/* Hit targets for easier grab */}
        <div
          className="absolute z-50 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 cursor-grab active:cursor-grabbing"
          style={{ left: `${leftPercent}%` }}
          onPointerDown={startDrag("left")}
        />
        <div
          className="absolute z-50 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 cursor-grab active:cursor-grabbing"
          style={{ left: `${rightPercent}%` }}
          onPointerDown={startDrag("right")}
        />

        {/* Left Handle Visual */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-black border-2 border-black rounded-full pointer-events-none z-40 shadow-sm"
          style={{ left: `calc(${leftPercent}% - 10px)` }}
        >
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-gray-900 text-sm font-normal whitespace-nowrap select-none pointer-events-none"
            style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px" }}
          >
            {budgetRange[0]}
          </div>
        </div>

        {/* Right Handle Visual */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-black border-2 border-black rounded-full pointer-events-none z-40 shadow-sm"
          style={{ left: `calc(${rightPercent}% - 10px)` }}
        >
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-gray-900 text-sm font-normal whitespace-nowrap select-none pointer-events-none"
            style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px" }}
          >
            {budgetRange[1]}
          </div>
        </div>
      </div>
    </div>
  );
};
