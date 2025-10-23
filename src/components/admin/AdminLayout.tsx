"use client";

import React from "react";

interface AdminLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex gap-8">
          {sidebar}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
