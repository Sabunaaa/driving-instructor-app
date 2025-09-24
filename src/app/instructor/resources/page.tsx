"use client";

import Link from "next/link";
import {
  BookOpen,
  FileDown,
  Users,
  Star,
  ShieldCheck,
  Megaphone,
} from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";
import Button from "@/components/ui/Button";

export default function InstructorResourcesPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-[120px] py-8 max-w-7xl 2xl:max-w-none">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Instructor Resources
          </h1>
          <p className="text-gray-600 mt-1">
            Guides, templates, and tips to run successful, safe lessons and grow
            your business.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={BookOpen}
            title="Teaching playbooks"
            description="Lesson plans for beginners, highway driving, and test prep."
            href="/help/category/for-instructors"
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Safety & vehicle"
            description="Requirements and guidelines for a safe learning environment."
            href="/help/articles/safety-security-safety-protocols"
          />
          <FeatureCard
            icon={Users}
            title="Student management"
            description="Best practices to onboard, retain, and support students."
            href="/instructor/students"
          />
          <FeatureCard
            icon={Star}
            title="Reviews that convert"
            description="Collect and respond to feedback to boost your profile."
            href="/instructor/reviews"
          />
          <FeatureCard
            icon={Megaphone}
            title="Marketing tips"
            description="Profile tweaks and offers that attract more bookings."
            href="/for-instructors#performance"
          />
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <FileDown className="text-red-600" size={18} />
              <h3 className="font-semibold text-gray-900">Downloads</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="text-gray-700 hover:underline"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  New student intake checklist (PDF)
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 hover:underline"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Road test prep checklist (PDF)
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 hover:underline"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Lesson plan template (DOCX)
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Button variant="outline" asChild>
                {/* @ts-ignore */}
                <Link href="/help">Browse help center</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
