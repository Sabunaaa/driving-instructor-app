"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Become an Instructor
        </h1>
        <p className="text-gray-600 mt-1">
          Fill in the details below. Verification typically takes 5–7 business
          days.
        </p>

        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 space-y-5">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Personal details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="border border-gray-200 rounded-lg px-3 py-2"
                placeholder="First name"
              />
              <input
                className="border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Last name"
              />
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 sm:col-span-2"
                placeholder="Email"
              />
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Certifications
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Upload proof of your instructor certification.
            </p>
            <input type="file" className="block w-full text-sm" />
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Vehicle
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Provide vehicle details or complete later.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Make & model"
              />
              <input
                className="border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Year"
              />
            </div>
            <div className="mt-2">
              <Link
                href="/instructor/vehicle"
                className="text-sm text-red-600 hover:underline"
              >
                Go to vehicle verification
              </Link>
            </div>
          </section>
          <div className="flex gap-3">
            <Button>Submit application</Button>
            <Button asChild variant="outline">
              {/* @ts-ignore */}
              <Link href="/for-instructors">Back to resources</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
