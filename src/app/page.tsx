import HeroSplit from "@/components/ui/HeroSplit";
import FeatureCard from "@/components/ui/FeatureCard";
import BenefitsGrid from "@/components/ui/BenefitsGrid";
// @ts-ignore
import {
  Car,
  Calendar,
  ShieldCheck,
  CreditCard,
  Clock,
  BarChart3,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSplit
        eyebrow="Trusted local instructors"
        title={
          <>
            Your road to confident
            <br /> driving begins here
          </>
        }
        subtitle="Book lessons with highly-rated instructors in your area. Flexible schedules, friendly teaching, real results."
        ctaHref="/contact"
        ctaLabel="Get in touch"
        rating={5}
        leftBgClassName="bg-gradient-to-br from-red-400 to-red-300"
        rightImageSrc="/images/404/instructor.png"
        rightImageAlt="Smiling driving instructor next to a training car"
        compact
      />
      {/* Benefits - below hero */}
      <BenefitsGrid
        className="mt-12 px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px]"
        items={[
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="28"
                height="28"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="22" x2="16" y2="22"></line>
              </svg>
            ),
            label:
              "Flexible schedule – choose the days and times you want to work",
          },
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="28"
                height="28"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            ),
            label: "Paid Training + DMV licensing provided",
          },
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="28"
                height="28"
                aria-hidden="true"
              >
                <path d="M10 21v-6a4 4 0 0 1 8 0v6"></path>
                <path d="M2 9l10-5 10 5"></path>
                <path d="M2 9v6h20V9"></path>
              </svg>
            ),
            label: "Time off benefits",
          },
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="28"
                height="28"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="8" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            ),
            label: "Teach in a company vehicle",
          },
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="28"
                height="28"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            ),
            label:
              "Health, dental, and vision insurance plans for full‑time driving instructors",
          },
          {
            icon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="28"
                height="28"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            ),
            label: "Ongoing training and mentorship support",
          },
        ]}
      />
      {/* Feature Cards full-width section */}
      <section className="mt-10 w-full">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] w-full items-stretch">
          <FeatureCard
            icon={Car}
            title="Certified Instructors"
            description="Learn with vetted, friendly pros who tailor lessons to your pace."
          />
          <FeatureCard
            icon={Calendar}
            title="Flexible Scheduling"
            description="Book, reschedule, and plan lessons around your calendar."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Safety First"
            description="Dual-control vehicles and safety-focused instruction every time."
          />
          <FeatureCard
            icon={CreditCard}
            title="Transparent Pricing"
            description="Clear, upfront rates with no hidden fees—know exactly what you pay."
          />
          <FeatureCard
            icon={Clock}
            title="Real-Time Availability"
            description="See open slots instantly and lock in times that work for you."
          />
          <FeatureCard
            icon={BarChart3}
            title="Pass-Rate Insights"
            description="Data-backed progress tracking to help you pass with confidence."
          />
        </div>
      </section>
    </div>
  );
}
