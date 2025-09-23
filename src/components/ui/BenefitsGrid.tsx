import React from "react";

export type BenefitItem = {
  icon: React.ReactNode;
  label: string;
};

interface BenefitsGridProps {
  items: BenefitItem[];
  className?: string;
}

const BenefitsGrid: React.FC<BenefitsGridProps> = ({
  items,
  className = "",
}) => {
  const count = items.length;
  return (
    <section className={`w-full py-8 sm:py-10 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 justify-items-center">
        {items.map(({ icon, label }, idx) => {
          let itemClasses = "";
          const isLast = idx === count - 1;
          const isSecondLast = idx === count - 2;

          // md: 3 columns
          if (count % 3 === 1 && isLast) {
            // one item on last row -> center in column 2
            itemClasses += " md:col-start-2";
          }
          // For two items on the last row in a 3-col grid, center them
          // by moving the first of the last two to column 2.
          if (count % 3 === 2 && isSecondLast) {
            itemClasses += " md:col-start-2";
          }

          return (
            <div
              key={idx}
              className={`flex flex-col items-center text-center${itemClasses}`}
            >
              <div className="mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-gray-900">
                {/* Icon */}
                <div className="text-white">{icon}</div>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-xs">{label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BenefitsGrid;
