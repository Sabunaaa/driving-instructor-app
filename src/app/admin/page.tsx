"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PageHeader from "@/components/admin/PageHeader";
import StatsGrid from "@/components/admin/StatsGrid";
import StatCard from "@/components/admin/StatCard";
import { Users, UserCheck, Calendar, CreditCard } from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
  icon: typeof Users;
  iconBgColor: string;
  iconColor: string;
}

const AdminPage = () => {
  const stats: Stat[] = [
    {
      label: "Total Users",
      value: "1,234",
      icon: Users,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Instructors",
      value: "456",
      icon: UserCheck,
      iconBgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Total Bookings",
      value: "789",
      icon: Calendar,
      iconBgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Revenue",
      value: "$12.5K",
      icon: CreditCard,
      iconBgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <AdminLayout sidebar={<AdminSidebar activeItem="Analytics" />}>
      <PageHeader
        title="Analytics"
        description="View platform performance and key metrics."
      />
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
            iconColor={stat.iconColor}
          />
        ))}
      </StatsGrid>
    </AdminLayout>
  );
};

export default AdminPage;
