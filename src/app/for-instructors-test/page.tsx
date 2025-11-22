import InstructorHero from "@/components/for-instructors-test/InstructorHero";
import BenefitsGrid from "@/components/for-instructors-test/BenefitsGrid";
import EarningsCalculator from "@/components/for-instructors-test/EarningsCalculator";
import OnboardingSteps from "@/components/for-instructors-test/OnboardingSteps";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ForInstructorsTestPage() {
  return (
    <div className="min-h-screen bg-white">
      <InstructorHero />
      <BenefitsGrid />
      <EarningsCalculator />
      <OnboardingSteps />
      
      {/* Final CTA */}
      <section className="py-24 bg-[#F03D3D] text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to grow your business?</h2>
          <p className="text-white/90 text-xl mb-10">
            Join thousands of instructors who have simplified their admin and increased their earnings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/for-instructors/signup" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#F03D3D] rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl">
              Create Instructor Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          <p className="mt-6 text-white/60 text-sm">No credit card required for signup. Free 30-day trial.</p>
        </div>
      </section>
    </div>
  );
}
