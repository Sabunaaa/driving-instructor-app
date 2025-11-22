import { Search, CalendarCheck, Car } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find an Instructor",
    description: "Browse profiles, read reviews, and compare prices to find the perfect match.",
  },
  {
    icon: CalendarCheck,
    title: "Book a Lesson",
    description: "Choose a time slot that fits your schedule and book instantly.",
  },
  {
    icon: Car,
    title: "Start Driving",
    description: "Meet your instructor and start your journey to becoming a licensed driver.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-gray-50 py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6 border border-gray-100">
                <step.icon className="w-10 h-10 text-[#F03D3D]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
