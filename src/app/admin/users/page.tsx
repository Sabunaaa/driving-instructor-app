"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PageHeader from "@/components/admin/PageHeader";
import UsersTable from "@/components/admin/UsersTable";

const UsersPage = () => {
  return (
    <AdminLayout sidebar={<AdminSidebar activeItem="Users" />}>
      <PageHeader
        title="Users"
        description="Manage user accounts and permissions."
      />
      <UsersTable />
    </AdminLayout>
  );
};

export default UsersPage;
