"use client";

import React from "react";
import Image from "next/image";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      {/* Image */}
      <div className="relative flex justify-center">
        <Image
          src="/images/404/404.png"
          alt="404 Error"
          width={500}
          height={500}
          className="object-contain w-[400px] h-auto"
          quality={100}
          priority
        />
      </div>

      {/* Title */}
      <h1
        className="text-center text-gray-900 font-semibold"
        style={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: "48px",
          lineHeight: "56px",
          color: "#111827",
        }}
      >
        Error 404...
      </h1>

      {/* Back to Home Button */}
      <button
        className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#F03D3D] text-white rounded-lg font-medium hover:opacity-90 transition-colors"
        style={{
          backgroundColor: "#F03D3D",
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 500,
        }}
        onClick={() => (window.location.href = "/")}
      >
        <span>Back to Home</span>
      </button>
    </div>
  );
};

export default Error404;
