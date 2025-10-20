"use client";

import React from "react";
import { ChevronDown, User } from "lucide-react";

const PaymentsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent payments received
        </h2>
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

      {/* February 2025 Section */}
      <div>
        <div className="px-6 py-3 bg-gray-50">
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <ChevronDown className="w-4 h-4" />
            February 2025
          </button>
        </div>

        {/* Payment Row 1 */}
        <div className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4">
              <span className="text-sm text-gray-900 font-semibold">$210</span>
            </div>
            <div className="col-span-4 text-sm text-gray-600">
              Feb 17, 2025
            </div>
            <div className="col-span-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                Adam Barber
              </span>
            </div>
          </div>
        </div>

        {/* Payment Row 2 */}
        <div className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4">
              <span className="text-sm text-gray-900 font-semibold">$180</span>
            </div>
            <div className="col-span-4 text-sm text-gray-600">
              Feb 17, 2025
            </div>
            <div className="col-span-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                Cameron Wilson
              </span>
            </div>
          </div>
        </div>

        {/* Payment Row 3 */}
        <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4">
              <span className="text-sm text-gray-900 font-semibold">$150</span>
            </div>
            <div className="col-span-4 text-sm text-gray-600">
              Feb 16, 2025
            </div>
            <div className="col-span-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                Floyd Miles
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;
