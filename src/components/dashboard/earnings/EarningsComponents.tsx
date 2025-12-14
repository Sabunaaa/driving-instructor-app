"use client";

import React from "react";
import { DollarSign, TrendingUp, CreditCard, Download } from "lucide-react";

const transactions = [
  { id: 1, student: "Sarah Jenkins", date: "Dec 6, 2025", amount: 150.00, status: "Paid", method: "Credit Card" },
  { id: 2, student: "Michael Chen", date: "Dec 5, 2025", amount: 75.00, status: "Paid", method: "PayPal" },
  { id: 3, student: "Emma Wilson", date: "Dec 4, 2025", amount: 300.00, status: "Pending", method: "Bank Transfer" },
  { id: 4, student: "David Miller", date: "Dec 3, 2025", amount: 150.00, status: "Paid", method: "Credit Card" },
  { id: 5, student: "Lisa Anderson", date: "Dec 1, 2025", amount: 75.00, status: "Paid", method: "Cash" },
];

export const EarningsStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
            <DollarSign className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg">+12.5%</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">$4,250.00</h3>
        <p className="text-gray-500 text-sm">Total Earnings (Dec)</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">+5 new</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">28</h3>
        <p className="text-gray-500 text-sm">Paid Lessons</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-500 rounded-lg">Pending</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">$300.00</h3>
        <p className="text-gray-500 text-sm">Pending Payouts</p>
      </div>
    </div>
  );
};

export const TransactionList = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Student</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Method</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{tx.student}</td>
              <td className="px-6 py-4 text-gray-500 text-sm">{tx.date}</td>
              <td className="px-6 py-4 text-gray-500 text-sm">{tx.method}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  tx.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {tx.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right font-bold text-gray-900">${tx.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
