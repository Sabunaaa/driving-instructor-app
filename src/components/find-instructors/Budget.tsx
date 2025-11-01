"use client";

import React from "react";

interface BudgetProps {
  budgetRange: [number, number];
  onBudgetChange: (range: [number, number]) => void;
}

export const Budget: React.FC<BudgetProps> = ({
  budgetRange,
  onBudgetChange,
}) => {
  const MIN_VALUE = 40;
  const MAX_VALUE = 100;

  const [minInput, setMinInput] = React.useState(String(budgetRange[0]));
  const [maxInput, setMaxInput] = React.useState(String(budgetRange[1]));

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinInput(e.target.value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxInput(e.target.value);
  };

  const handleMinBlur = () => {
    if (minInput === "") {
      setMinInput(String(MIN_VALUE));
      onBudgetChange([MIN_VALUE, budgetRange[1]]);
      return;
    }

    let value = parseInt(minInput, 10);
    if (isNaN(value)) {
      setMinInput(String(budgetRange[0]));
      return;
    }

    if (value < MIN_VALUE) value = MIN_VALUE;
    if (value > MAX_VALUE) value = MAX_VALUE;

    setMinInput(String(value));
    onBudgetChange([value, budgetRange[1]]);
  };

  const handleMaxBlur = () => {
    if (maxInput === "") {
      setMaxInput(String(MAX_VALUE));
      onBudgetChange([budgetRange[0], MAX_VALUE]);
      return;
    }

    let value = parseInt(maxInput, 10);
    if (isNaN(value)) {
      setMaxInput(String(budgetRange[1]));
      return;
    }

    if (value < MIN_VALUE) value = MIN_VALUE;
    if (value > MAX_VALUE) value = MAX_VALUE;

    setMaxInput(String(value));
    onBudgetChange([budgetRange[0], value]);
  };

  return (
    <div className="space-y-4">
      {/* Min and Max Input Fields */}
      <div className="flex gap-3">
        {/* Min Input */}
        <div className="w-16">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Min (₾)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={minInput}
            onChange={handleMinChange}
            onBlur={handleMinBlur}
            placeholder="40"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        {/* Max Input */}
        <div className="w-16">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Max (₾)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={maxInput}
            onChange={handleMaxChange}
            onBlur={handleMaxBlur}
            placeholder="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>

    </div>
  );
};
