"use client";

import React from "react";
import { ChevronDown, User } from "lucide-react";

export interface PaymentRow {
  id: string;
  amount: string;
  date: string;
  studentName: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface PaymentsTableProps {
  payments: PaymentRow[];
}

export const PaymentsTable: React.FC<PaymentsTableProps> = ({ payments }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Recent payments received</h2>
      </div>

      {/* Table Header */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
          <div className="col-span-4">Amount</div>
          <div className="col-span-4 flex items-center gap-1">
            Date
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="col-span-4">Student</div>
        </div>
      </div>

      {/* Payments Section */}
      <div>
        <div className="px-6 py-3 bg-gray-50">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-900"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "" : "-rotate-90"}`} />
            February 2025
          </button>
        </div>

        {isExpanded && (
          <div>
            {payments.map((payment, index) => (
              <div
                key={payment.id}
                className={`px-6 py-4 ${
                  index !== payments.length - 1 ? "border-b border-gray-100" : ""
                } hover:bg-gray-50 transition-colors`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <span className="text-sm text-gray-900 font-semibold">{payment.amount}</span>
                  </div>
                  <div className="col-span-4 text-sm text-gray-600">
                    {payment.date}
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${payment.gradientFrom} ${payment.gradientTo} rounded-full flex items-center justify-center`}>
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{payment.studentName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
