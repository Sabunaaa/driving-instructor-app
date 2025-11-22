"use client";

import { Car } from "lucide-react";

const AnimatedCarsBanner = () => {
  const cars = Array.from({ length: 40 });

  return (
    <section className="bg-gray-50 py-2 overflow-hidden border-t border-gray-200">
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .cars-banner {
          animation: scroll-left 75s linear infinite;
          width: max-content;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
      <div className="cars-banner">
        {cars.map((_, i) => (
          <div key={i} className="flex-shrink-0 inline-flex" style={{ marginRight: '60px' }}>
            <Car className="w-12 h-12 text-[#F03D3D]" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedCarsBanner;
