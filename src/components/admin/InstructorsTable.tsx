"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, Star, Mail, Phone } from "lucide-react";

interface Instructor {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: number;
  rating: number;
  students: number;
  status: "verified" | "pending" | "rejected";
  joinDate: string;
}

const InstructorsTable: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [instructors] = useState<Instructor[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      experience: 8,
      rating: 4.8,
      students: 45,
      status: "verified",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 234-5678",
      experience: 5,
      rating: 4.6,
      students: 32,
      status: "verified",
      joinDate: "2023-03-20",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 (555) 345-6789",
      experience: 3,
      rating: 4.2,
      students: 18,
      status: "pending",
      joinDate: "2024-10-01",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 (555) 456-7890",
      experience: 6,
      rating: 4.7,
      students: 52,
      status: "verified",
      joinDate: "2023-05-10",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      phone: "+1 (555) 567-8901",
      experience: 2,
      rating: 3.9,
      students: 8,
      status: "pending",
      joinDate: "2024-09-15",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle size={18} className="text-green-600" />;
      case "pending":
        return <Clock size={18} className="text-yellow-600" />;
      case "rejected":
        return <XCircle size={18} className="text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const badgeClasses = {
      verified: "bg-green-50 text-green-700 border border-green-200",
      pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      rejected: "bg-red-50 text-red-700 border border-red-200",
    };
    return badgeClasses[status as keyof typeof badgeClasses] || "";
  };

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
          All
        </button>
        <button
          onClick={() => setSelectedFilter("verified")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            selectedFilter === "verified"
              ? "bg-green-600 text-white"
              : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
          }`}
        >
          <CheckCircle size={16} />
          Verified
        </button>
        <button
          onClick={() => setSelectedFilter("pending")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            selectedFilter === "pending"
              ? "bg-yellow-600 text-white"
              : "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100"
          }`}
        >
          <Clock size={16} />
          Pending
        </button>
        <button
          onClick={() => setSelectedFilter("rejected")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            selectedFilter === "rejected"
              ? "bg-red-600 text-white"
              : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
          }`}
        >
          <XCircle size={16} />
          Rejected
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Instructor
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Experience
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Students
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {instructors
              .filter((instructor) =>
                selectedFilter ? instructor.status === selectedFilter : true
              )
              .map((instructor, index) => (
                <tr
                  key={instructor.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index === instructors.length - 1 ? "" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-gray-900">{instructor.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <span>{instructor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone size={16} />
                      <span className="text-xs">{instructor.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {instructor.experience} years
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{instructor.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {instructor.students}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        instructor.status
                      )}`}
                    >
                      {getStatusIcon(instructor.status)}
                      <span className="capitalize">{instructor.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(instructor.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorsTable;
