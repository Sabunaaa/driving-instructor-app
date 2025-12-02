import { UserPlus, FileCheck, Calendar, Car } from "lucide-react";

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
    <div id="how-it-works" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg">
            Getting started is simple. Follow these four steps to launch your profile.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center mb-6 group-hover:border-[#F03D3D] group-hover:shadow-lg transition-all duration-300 relative">
                  <step.icon className="w-8 h-8 text-gray-400 group-hover:text-[#F03D3D] transition-colors" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#F03D3D] text-white flex items-center justify-center font-bold text-sm border-4 border-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
