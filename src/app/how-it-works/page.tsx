"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  MessageCircle,
  Car,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import HeroSplit from "@/components/ui/HeroSplit";
import FeatureCard from "@/components/ui/FeatureCard";
import BenefitsGrid from "@/components/ui/BenefitsGrid";

const steps = [
  {
    icon: Search,
    title: "Find your instructor",
    desc: "Browse trusted local instructors with real reviews, specialties, and pricing.",
  },
  {
    icon: Calendar,
    title: "Pick a time",
    desc: "See live availability and book lessons that fit your schedule.",
  },
  {
    icon: MessageCircle,
    title: "Confirm details",
    desc: "Chat about pickup location, goals, and what you'll cover in lessons.",
  },
  {
    icon: Car,
    title: "Start driving",
    desc: "Learn in dual-control cars with safety-first, friendly instruction.",
  },
];

const faqs = [
  {
    q: "Do I need my own car?",
    a: "No—instructors typically provide dual-control cars for lessons. If you prefer, some instructors can teach in your own vehicle.",
  },
  {
    q: "How do payments work?",
    a: "You pay securely online. Prices are shown upfront, and you can see any package discounts before booking.",
  },
  {
    q: "Can I reschedule?",
    a: "Yes. You can reschedule from your dashboard. Please review your instructor's policy for time windows.",
  },
  {
    q: "Are instructors vetted?",
    a: "Yes. We verify licenses, experience, and reviews to ensure quality and safety.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSplit
        eyebrow="Simple, safe, and flexible"
        title={
          <>
            How it works
            <br /> in 4 easy steps
          </>
        }
        subtitle="From finding the right instructor to your first solo drive—we make the journey smooth."
        ctaHref="/find-instructors"
        ctaLabel="Find instructors"
        rating={5}
        leftBgClassName="bg-gradient-to-br from-red-300 to-red-100"
        rightImageSrc="/images/404/profile.jpg"
        rightImageAlt="Learner driver with instructor"
        fullHeight
      />

      {/* Steps */}
      <section className="mt-12 px-6 sm:px-8">
        <div className="max-w-[1296px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#FEEAEA" }}
                >
                  <Icon size={24} className="text-[#D85151]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Safety / Guarantees */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={ShieldCheck}
              title="Vetted instructors"
              description="All instructors are verified and reviewed to ensure a safe, consistent experience."
            />
            <FeatureCard
              icon={CreditCard}
              title="Secure payments"
              description="Pay online with confidence—no hidden fees, clear receipts, easy refunds when applicable."
            />
            <FeatureCard
              icon={Star}
              title="Top-rated experience"
              description="We monitor ratings and feedback to keep quality high and learning fun."
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsGrid
        className="mt-6 px-6 sm:px-8"
        items={[
          {
            icon: <CheckCircle2 size={24} />,
            label: "Flexible scheduling that fits your week",
          },
          {
            icon: <CheckCircle2 size={24} />,
            label: "Clear pricing with package discounts",
          },
          {
            icon: <CheckCircle2 size={24} />,
            label: "Friendly, patient instruction for all levels",
          },
          {
            icon: <CheckCircle2 size={24} />,
            label: "Progress tracking to help you pass faster",
          },
          {
            icon: <CheckCircle2 size={24} />,
            label: "Pickup and drop-off options in many areas",
          },
          {
            icon: <CheckCircle2 size={24} />,
            label: "Support if anything goes wrong—we've got your back",
          },
        ]}
      />

      {/* FAQ */}
      <section className="mt-4 px-6 sm:px-8">
        <div className="max-w-[1296px] mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
            {faqs.map(({ q, a }, i) => (
              <details key={i} className="group">
                <summary className="list-none cursor-pointer p-5 flex items-center justify-between">
                  <span className="text-gray-900 font-medium">{q}</span>
                  <ChevronRight
                    size={18}
                    className="text-gray-400 group-open:rotate-90 transition-transform"
                  />
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="mt-10 mb-16 px-6 sm:px-8">
        <div className="max-w-[1296px] mx-auto bg-[#F5F7FA] border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Ready to get started?
            </h3>
            <p className="text-gray-600 mt-1">
              Find the right instructor and book your first lesson in minutes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/find-instructors"
              className="rounded-lg font-medium transition-colors bg-[#F03D3D] border border-[#F03D3D] text-white hover:opacity-90 px-4 py-2.5 text-sm"
            >
              Find instructors
            </Link>
            <Link
              href="/help"
              className="rounded-lg font-medium transition-colors bg-transparent border border-[#F03D3D] text-[#F03D3D] hover:bg-[#F03D3D]/5 px-4 py-2.5 text-sm"
            >
              Get help
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
