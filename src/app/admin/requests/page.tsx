"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PageHeader from "@/components/admin/PageHeader";
import RequestsTable from "@/components/admin/RequestsTable";

const RequestsPage = () => {
  return (
    <AdminLayout sidebar={<AdminSidebar activeItem="Requests" />}>
      <PageHeader
        title="Instructor Requests"
        description="Review and manage instructor registration applications."
      />
      <RequestsTable />
    </AdminLayout>
  );
};

export default RequestsPage;
