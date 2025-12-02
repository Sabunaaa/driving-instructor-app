import InstructorHero from "@/components/for-instructors/InstructorHero";
import BenefitsGrid from "@/components/for-instructors/BenefitsGrid";
import InstructorCTA from "@/components/for-instructors/InstructorCTA";
import HowItWorks from "@/components/for-instructors/HowItWorks";
import Testimonials from "@/components/for-instructors/Testimonials";
import FAQ from "@/components/for-instructors/FAQ";

export default function ForInstructorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <InstructorHero />
      <BenefitsGrid />
      <HowItWorks />
      <Testimonials />
      <InstructorCTA />
      <FAQ />
    </main>
  );
}
