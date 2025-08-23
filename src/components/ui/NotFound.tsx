import React from 'react';
import Image from 'next/image';

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden gap-12">
      {/* Image */}
      <div className="relative">
        <Image
          src="/images/404/404.png"
          alt="404 Error"
          width={500}
          height={500}
          className="object-contain w-[196px] h-auto"
          quality={100}
          priority
        />
      </div>
      
      {/* Title + Search */}
      <div className="flex flex-col items-center gap-6">
        {/* Title */}
        <h1 
          className="text-center text-gray-900"
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '42px',
            color: '#111827'
          }}
        >
          Sorry, we can&apos;t find that page
        </h1>
      </div>
    </div>
  );
};

export default Error404;
