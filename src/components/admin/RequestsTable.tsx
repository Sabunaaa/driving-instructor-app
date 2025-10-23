"use client";

import React, { useState } from "react";
import { Check, X, Eye, Clock, AlertCircle } from "lucide-react";

interface InstructorRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: number;
  licenseNumber: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  documents: {
    license: boolean;
    insurance: boolean;
    background: boolean;
  };
}

const RequestsTable: React.FC = () => {
  const [requests, setRequests] = useState<InstructorRequest[]>([
    {
      id: 1,
      name: "James Wilson",
      email: "james@example.com",
      phone: "+1 (555) 111-2222",
      experience: 10,
      licenseNumber: "DL123456",
      status: "pending",
      submittedAt: "2024-10-20",
      documents: {
        license: true,
        insurance: true,
        background: true,
      },
    },
    {
      id: 2,
      name: "Amanda Martinez",
      email: "amanda@example.com",
      phone: "+1 (555) 222-3333",
      experience: 7,
      licenseNumber: "DL789012",
      status: "pending",
      submittedAt: "2024-10-21",
      documents: {
        license: true,
        insurance: true,
        background: false,
      },
    },
    {
      id: 3,
      name: "Robert Taylor",
      email: "robert@example.com",
      phone: "+1 (555) 333-4444",
      experience: 12,
      licenseNumber: "DL345678",
      status: "approved",
      submittedAt: "2024-10-15",
      documents: {
        license: true,
        insurance: true,
        background: true,
      },
    },
    {
      id: 4,
      name: "Jennifer Lee",
      email: "jennifer@example.com",
      phone: "+1 (555) 444-5555",
      experience: 5,
      licenseNumber: "DL567890",
      status: "rejected",
      submittedAt: "2024-10-18",
      documents: {
        license: true,
        insurance: false,
        background: false,
      },
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<InstructorRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleApprove = (id: number) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
  };

  const handleReject = (id: number) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  const handleViewDetails = (request: InstructorRequest) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const badgeClasses = {
      pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      approved: "bg-green-50 text-green-700 border border-green-200",
      rejected: "bg-red-50 text-red-700 border border-red-200",
    };
    return badgeClasses[status as keyof typeof badgeClasses] || "";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={16} className="text-yellow-600" />;
      case "approved":
        return <Check size={16} className="text-green-600" />;
      case "rejected":
        return <X size={16} className="text-red-600" />;
      default:
        return null;
    }
  };

  const filteredRequests = selectedFilter
    ? requests.filter((req) => req.status === selectedFilter)
    : requests;

  const allDocumentsComplete = (request: InstructorRequest) =>
    request.documents.license &&
    request.documents.insurance &&
    request.documents.background;

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
          All Requests ({requests.length})
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
          Pending ({requests.filter((r) => r.status === "pending").length})
        </button>
        <button
          onClick={() => setSelectedFilter("approved")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            selectedFilter === "approved"
              ? "bg-green-600 text-white"
              : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
          }`}
        >
          <Check size={16} />
          Approved ({requests.filter((r) => r.status === "approved").length})
        </button>
        <button
          onClick={() => setSelectedFilter("rejected")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            selectedFilter === "rejected"
              ? "bg-red-600 text-white"
              : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
          }`}
        >
          <X size={16} />
          Rejected ({requests.filter((r) => r.status === "rejected").length})
        </button>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Application Details
            </h2>

            {/* Personal Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {selectedRequest.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-base font-medium text-gray-900">
                    {selectedRequest.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-base font-medium text-gray-900">
                    {selectedRequest.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">License Number</p>
                  <p className="text-base font-medium text-gray-900">
                    {selectedRequest.licenseNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Professional Information
              </h3>
              <div>
                <p className="text-sm text-gray-600">Years of Experience</p>
                <p className="text-base font-medium text-gray-900">
                  {selectedRequest.experience} years
                </p>
              </div>
            </div>

            {/* Documents */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Documents Submitted
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {selectedRequest.documents.license ? (
                    <Check size={20} className="text-green-600" />
                  ) : (
                    <X size={20} className="text-red-600" />
                  )}
                  <span className="text-gray-900">Driver's License</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedRequest.documents.insurance ? (
                    <Check size={20} className="text-green-600" />
                  ) : (
                    <X size={20} className="text-red-600" />
                  )}
                  <span className="text-gray-900">Insurance Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedRequest.documents.background ? (
                    <Check size={20} className="text-green-600" />
                  ) : (
                    <X size={20} className="text-red-600" />
                  )}
                  <span className="text-gray-900">Background Check</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">Current Status</p>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                  selectedRequest.status
                )}`}
              >
                {getStatusIcon(selectedRequest.status)}
                <span className="capitalize">{selectedRequest.status}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedRequest.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      handleReject(selectedRequest.id);
                      setIsDetailModalOpen(false);
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedRequest.id);
                      setIsDetailModalOpen(false);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Experience
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Documents
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Submitted
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No requests found with this status.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.experience} years
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-1">
                        {allDocumentsComplete(request) ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Check size={16} />
                            <span>Complete</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-yellow-600">
                            <AlertCircle size={16} />
                            <span>Incomplete</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          request.status
                        )}`}
                      >
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(request.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewDetails(request)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        {request.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Reject"
                            >
                              <X size={18} />
                            </button>
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="text-green-600 hover:text-green-800 transition-colors"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                          </>
                        )}
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

export default RequestsTable;
