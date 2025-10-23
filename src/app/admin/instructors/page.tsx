"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PageHeader from "@/components/admin/PageHeader";
import InstructorsTable from "../../../components/admin/InstructorsTable";

const InstructorsPage = () => {
  return (
    <AdminLayout sidebar={<AdminSidebar activeItem="Instructors" />}>
      <PageHeader
        title="Instructors"
        description="Manage and verify instructor profiles and applications."
      />
      <InstructorsTable />
    </AdminLayout>
  );
};

export default InstructorsPage;
