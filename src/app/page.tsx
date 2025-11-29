import HeroModern from "@/components/home/HeroModern";
import TrustStrip from "@/components/home/TrustStrip";
import BentoFeatures from "@/components/home/BentoFeatures";
import LearningRoadmap from "@/components/home/LearningRoadmap";
import InstructorShowcase from "@/components/home/InstructorShowcase";
import Link from "next/link";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroModern />
      <TrustStrip />
      <BentoFeatures />
      <LearningRoadmap />
      <InstructorShowcase />
      
      {/* Simple Footer CTA */}

      <section className="py-20 bg-[#F03D3D] text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to get behind the wheel?</h2>
        <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">Join the fastest growing community of learner drivers and pass your test with confidence.</p>
        <Link href="/find-instructors">
          <button className="px-8 py-4 bg-white text-[#F03D3D] rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl">
            Find Your Instructor Now
          </button>
        </Link>
      </section>
    </div>
  );
}

