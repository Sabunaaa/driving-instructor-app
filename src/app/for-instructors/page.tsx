"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Car,
  ChartBarBig,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  HelpCircle,
  MessageSquare,
  Star,
  Users,
  BookOpen,
} from "lucide-react";
import HeroSplit from "@/components/ui/HeroSplit";
import FeatureCard from "@/components/ui/FeatureCard";
import BenefitsGrid from "@/components/ui/BenefitsGrid";
import Button from "@/components/ui/Button";

const Section: React.FC<
  React.PropsWithChildren<{ id: string; title: string; ariaLabel?: string }>
> = ({ id, title, ariaLabel, children }) => (
  <section
    id={id}
    aria-label={ariaLabel || `${title} section`}
    className="scroll-mt-24"
  >
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="text-gray-600 space-y-4">{children}</div>
    </div>
  </section>
);

export default function ForInstructorsPage() {
  const nav = [
    { href: "#welcome", label: "Welcome" },
    { href: "#getting-started", label: "Getting Started" },
    { href: "#schedule", label: "Schedule" },
    { href: "#students", label: "Students" },
    { href: "#earnings", label: "Earnings" },
    { href: "#vehicle", label: "Vehicle & Safety" },
    { href: "#resources", label: "Resources" },
    { href: "#performance", label: "Performance" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Hero */}
      <div id="welcome" className="mb-10">
        <HeroSplit
          eyebrow="For Instructors"
          title={
            <>
              Join a growing network of
              <br /> certified driving instructors
            </>
          }
          subtitle="Connect with eager learners worldwide and grow your business."
          ctaHref="/instructor/apply"
          ctaLabel="Get Started"
          rightImageSrc="/images/404/instructor.png"
          rightImageAlt="Instructor with student"
          leftBgClassName="bg-gradient-to-br from-red-400 to-red-300"
          rating={5}
        />

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Active students monthly", value: "500+" },
            { label: "Avg earnings", value: "$50/hr" },
            { label: "Weekly payouts", value: "Every Friday" },
            { label: "Avg rating", value: "4.8/5" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center"
            >
              <p className="text-3xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 items-start">
        {/* Sticky in-page nav */}
        <nav className="hidden lg:block sticky top-20 self-start">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              On this page
            </p>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Content sections */}
        <div className="space-y-8">
          {/* Getting Started */}
          <Section id="getting-started" title="Getting Started Guide">
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Create an account and complete your profile with certifications
                and vehicle details.
              </li>
              <li>Submit your application for review (takes 5–7 days).</li>
              <li>
                Set your availability and start receiving booking requests.
              </li>
            </ol>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FeatureCard
                icon={ClipboardCheck}
                title="Complete profile"
                description="Upload certifications, add bio and service areas."
                href="/account-settings"
              />
              <FeatureCard
                icon={CheckCircle2}
                title="Submit application"
                description="We review within 5–7 business days."
                href="/instructor/apply"
              />
              <FeatureCard
                icon={Calendar}
                title="Set availability"
                description="Keep your calendar up to date to maximize bookings."
                href="/dashboard"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                "Profile 100% complete",
                "Identity verified",
                "Vehicle approved",
              ].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded-full px-3 py-1"
                >
                  <CheckCircle2 size={16} className="text-green-600" />
                  {c}
                </span>
              ))}
            </div>
          </Section>

          {/* Schedule */}
          <Section
            id="schedule"
            title="Managing Your Schedule"
            ariaLabel="Schedule Management section"
          >
            <p>
              Set time slots in your dashboard. Update weekly to stay on top of
              demand. Enable calendar sync to avoid conflicts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard
                icon={Calendar}
                title="Manage time slots"
                description="Quickly add, edit, and repeat weekly schedules."
                href="/dashboard"
              />
              <FeatureCard
                icon={ChartBarBig}
                title="Optimize availability"
                description="Get tips on peak hours in your area."
              />
            </div>
            {/* Mock calendar */}
            <div className="mt-4 border border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-500">
              Sample calendar: Mon 9–12, Wed 14–18, Fri 10–13 available
            </div>
            <div className="mt-4">
              <Button asChild>
                {/* @ts-ignore next/link supports passHref */}
                <Link href="/dashboard">Update Availability</Link>
              </Button>
            </div>
          </Section>

          {/* Students */}
          <Section id="students" title="Student Management">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Access student details and lesson history in your dashboard.
              </li>
              <li>
                Use the chat feature to confirm schedules or answer questions.
              </li>
              <li>Provide feedback via reviews to build your reputation.</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <FeatureCard
                icon={Users}
                title="View students"
                description="Keep track of progress and upcoming lessons."
                href="/instructor/students"
              />
              <FeatureCard
                icon={MessageSquare}
                title="Chat & confirm"
                description="Streamline communication and reduce no‑shows."
                href="/forum"
              />
              <FeatureCard
                icon={Star}
                title="Collect reviews"
                description="Boost your profile by responding to feedback."
                href="/instructor/reviews"
              />
            </div>
          </Section>

          {/* Earnings */}
          <Section id="earnings" title="Earnings and Payments">
            <ul className="list-disc pl-6 space-y-2">
              <li>Earn 80% of lesson fees, paid weekly.</li>
              <li>Add and manage payment methods in your account settings.</li>
              <li>Track earnings and download invoices.</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <FeatureCard
                icon={CreditCard}
                title="Payout settings"
                description="Securely manage where your earnings go."
                href="/account-settings"
              />
              <FeatureCard
                icon={ChartBarBig}
                title="Weekly summary"
                description="Week of Sep 17: $300 (6 lessons)"
              />
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild>
                {/* @ts-ignore */}
                <Link href="/dashboard">Check Earnings</Link>
              </Button>
            </div>
          </Section>

          {/* Vehicle & Safety */}
          <Section id="vehicle" title="Vehicle and Safety Requirements">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Vehicle must be insured, registered, and equipped with dual
                controls.
              </li>
              <li>Submit photos and details for approval.</li>
              <li>Follow safety protocols during lessons.</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <FeatureCard
                icon={Car}
                title="Submit vehicle"
                description="Upload documents and photos for verification."
                href="/instructor/vehicle"
              />
              <FeatureCard
                icon={BookOpen}
                title="Safety guidelines"
                description="Best practices to keep every lesson safe."
                href="/help/articles/safety"
              />
            </div>
          </Section>

          {/* Resources */}
          <Section id="resources" title="Resources and Support">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FeatureCard
                icon={BookOpen}
                title="Training materials"
                description="Teaching tips and lesson plans."
                href="/instructor/resources"
              />
              <FeatureCard
                icon={Users}
                title="Community forum"
                description="Connect with other instructors."
                href="/forum"
              />
              <FeatureCard
                icon={HelpCircle}
                title="Contact support"
                description="We’re here to help with any issues."
                href="/help"
              />
            </div>
            {/* Simple FAQ */}
            <div className="mt-4">
              <details className="group border border-gray-200 rounded-lg p-4 bg-white">
                <summary className="cursor-pointer font-medium text-gray-900 flex items-center justify-between">
                  How do I handle cancellations?
                  <span className="text-gray-400 group-open:rotate-180 transition">
                    ▾
                  </span>
                </summary>
                <p className="mt-2 text-gray-600">
                  Follow your regional policy in Account Settings. Communicate
                  early with students and offer alternative slots when possible.
                </p>
              </details>
            </div>
          </Section>

          {/* Performance */}
          <Section id="performance" title="Performance and Ratings">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                <p className="text-3xl font-bold text-gray-900">4.8/5</p>
                <p className="text-sm text-gray-500 mt-1">Average rating</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                <p className="text-3xl font-bold text-gray-900">120</p>
                <p className="text-sm text-gray-500 mt-1">Reviews</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                <p className="text-3xl font-bold text-gray-900">260</p>
                <p className="text-sm text-gray-500 mt-1">Lessons taught</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard
                icon={Star}
                title="Respond to reviews"
                description="Engage with feedback to improve your profile."
                href="/instructor/reviews"
              />
              <FeatureCard
                icon={Users}
                title="Attract more students"
                description="Offer a free consultation to increase conversions."
              />
            </div>
          </Section>

          {/* Final CTA */}
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6">
            <p className="text-gray-800 font-medium">
              Ready to get started? Join DriveConnect today.
            </p>
            <Button asChild>
              {/* @ts-ignore */}
              <Link href="/instructor/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
