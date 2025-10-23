"use client";

import React, { useState } from "react";
import { Trash2, Eye, Shield, Lock } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  type: "student" | "instructor" | "admin";
  status: "active" | "suspended" | "inactive";
  joinDate: string;
  lastActive: string;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      type: "student",
      status: "active",
      joinDate: "2023-01-15",
      lastActive: "2024-10-22",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      type: "instructor",
      status: "active",
      joinDate: "2023-03-20",
      lastActive: "2024-10-21",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      type: "student",
      status: "active",
      joinDate: "2023-06-10",
      lastActive: "2024-10-20",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      type: "instructor",
      status: "suspended",
      joinDate: "2023-02-14",
      lastActive: "2024-09-15",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      type: "student",
      status: "inactive",
      joinDate: "2022-11-05",
      lastActive: "2024-08-01",
    },
    {
      id: 6,
      name: "Lisa Davis",
      email: "lisa@example.com",
      type: "admin",
      status: "active",
      joinDate: "2023-01-01",
      lastActive: "2024-10-23",
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const badgeClasses = {
      active: "bg-green-50 text-green-700 border border-green-200",
      suspended: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      inactive: "bg-gray-50 text-gray-700 border border-gray-200",
    };
    return badgeClasses[status as keyof typeof badgeClasses] || "";
  };

  const getTypeBadge = (type: string) => {
    const badgeClasses = {
      student: "bg-blue-50 text-blue-700 border border-blue-200",
      instructor: "bg-purple-50 text-purple-700 border border-purple-200",
      admin: "bg-red-50 text-red-700 border border-red-200",
    };
    return badgeClasses[type as keyof typeof badgeClasses] || "";
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSuspendUser = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "suspended" ? "active" : "suspended" }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const statusMatch = selectedFilter
      ? user.status === selectedFilter
      : true;
    const typeMatch = selectedTypeFilter
      ? user.type === selectedTypeFilter
      : true;
    return statusMatch && typeMatch;
  });

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-6 flex gap-3 flex-wrap">
        <button
          onClick={() => setSelectedFilter(null)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedFilter === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Users ({users.length})
        </button>
        <button
          onClick={() => setSelectedFilter("active")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedFilter === "active"
              ? "bg-green-600 text-white"
              : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
          }`}
        >
          Active ({users.filter((u) => u.status === "active").length})
        </button>
        <button
          onClick={() => setSelectedFilter("suspended")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedFilter === "suspended"
              ? "bg-yellow-600 text-white"
              : "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100"
          }`}
        >
          Suspended ({users.filter((u) => u.status === "suspended").length})
        </button>
        <button
          onClick={() => setSelectedFilter("inactive")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedFilter === "inactive"
              ? "bg-gray-600 text-white"
              : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
          }`}
        >
          Inactive ({users.filter((u) => u.status === "inactive").length})
        </button>
      </div>

      {/* User Type Filters */}
      <div className="mb-6 flex gap-3 flex-wrap">
        <button
          onClick={() => setSelectedTypeFilter(null)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedTypeFilter === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Types
        </button>
        <button
          onClick={() => setSelectedTypeFilter("student")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedTypeFilter === "student"
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
          }`}
        >
          Students ({users.filter((u) => u.type === "student").length})
        </button>
        <button
          onClick={() => setSelectedTypeFilter("instructor")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedTypeFilter === "instructor"
              ? "bg-purple-600 text-white"
              : "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100"
          }`}
        >
          Instructors ({users.filter((u) => u.type === "instructor").length})
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Last Active
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No users found with this status.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeBadge(
                          user.type
                        )}`}
                      >
                        {user.type === "admin" && <Shield size={14} className="mr-1" />}
                        <span className="capitalize">{user.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          user.status
                        )}`}
                      >
                        <span className="capitalize">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleSuspendUser(user.id)}
                          className="text-yellow-600 hover:text-yellow-800 transition-colors"
                          title={
                            user.status === "suspended" ? "Reactivate" : "Suspend"
                          }
                        >
                          <Lock size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
