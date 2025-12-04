import { UserPlus, FileCheck, Calendar, Car, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    title: "Create Account",
    description: "Sign up in minutes. Tell us about your experience, vehicle, and teaching preferences.",
    icon: UserPlus
  },
  {
    title: "Verify Documents",
    description: "Upload your driving instructor license and insurance documents for quick verification.",
    icon: FileCheck
  },
  {
    title: "Set Your Schedule",
    description: "Choose when you want to work. Our calendar system handles the bookings automatically.",
    icon: Calendar
  },
  {
    title: "Start Teaching",
    description: "Receive booking requests from students and start earning money immediately.",
    icon: Car
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#F03D3D] text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F03D3D]"></span>
            </span>
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Start your journey in <span className="text-[#F03D3D]">4 steps</span>
          </h2>
          <p className="text-xl text-gray-500 leading-relaxed">
            We've streamlined the onboarding process so you can focus on what matters most—teaching students how to drive safely.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-gray-200 via-[#F03D3D]/20 to-gray-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                {/* Icon Container */}
                <div className="w-24 h-24 rounded-3xl bg-white shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center justify-center mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-transparent w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/for-instructors/signup">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#F03D3D] text-white rounded-full font-bold text-lg shadow-lg shadow-red-500/25 hover:bg-red-600">
              Become an Instructor <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            No credit card required • Free to join
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
