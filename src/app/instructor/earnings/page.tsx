"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { CreditCard, Receipt } from "lucide-react";

export default function InstructorEarningsPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Earnings & Payouts
          </h1>
          <p className="text-gray-600 mt-1">
            Track your weekly earnings, manage payout details, and download
            invoices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <CreditCard size={20} className="text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Weekly Summary
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "This week", value: "$300" },
                { label: "Lessons", value: "6" },
                { label: "Avg rate", value: "$50/hr" },
                { label: "Next payout", value: "Fri" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center"
                >
                  <p className="text-xl font-semibold text-gray-900">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <Button asChild>
                {/* @ts-ignore */}
                <Link href="/dashboard">View Detailed Report</Link>
              </Button>
              <Button variant="outline" asChild>
                {/* @ts-ignore */}
                <Link href="/for-instructors#earnings">Back to Guide</Link>
              </Button>
            </div>
          </section>

          <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Receipt size={18} className="text-red-600" />
              <h3 className="font-semibold text-gray-900">Payout Settings</h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Add or update your payout method in account settings.
            </p>
            <Button variant="outline" asChild>
              {/* @ts-ignore */}
              <Link href="/account-settings">Manage Payouts</Link>
            </Button>
          </aside>
        </div>
      </div>
    </main>
  );
}
