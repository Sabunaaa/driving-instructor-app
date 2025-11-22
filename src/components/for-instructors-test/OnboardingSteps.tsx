import { ClipboardList, Car, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Sign Up Online",
    desc: "Create your profile in minutes. Upload your ADI badge and insurance documents securely.",
  },
  {
    icon: CheckCircle,
    title: "Get Verified",
    desc: "Our team checks your documents within 24 hours to ensure platform safety.",
  },
  {
    icon: Car,
    title: "Start Teaching",
    desc: "Open your calendar, set your rates, and start receiving bookings from local students.",
  },
];

const OnboardingSteps = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Get Started</h2>
          <p className="text-xl text-gray-600">Three simple steps to launching your digital driving school.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10" />

          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white rounded-full border-2 border-gray-100 flex items-center justify-center mb-6 group-hover:border-[#F03D3D] group-hover:scale-110 transition duration-300 shadow-sm">
                <step.icon className="w-10 h-10 text-gray-400 group-hover:text-[#F03D3D] transition" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSteps;
