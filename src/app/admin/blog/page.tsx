"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PageHeader from "@/components/admin/PageHeader";
import BlogTable from "@/components/admin/BlogTable";

const BlogPage = () => {
  return (
    <AdminLayout sidebar={<AdminSidebar activeItem="Blog" />}>
      <PageHeader
        title="Blog"
        description="Manage blog posts and content."
      />
      <BlogTable />
    </AdminLayout>
  );
};

export default BlogPage;
