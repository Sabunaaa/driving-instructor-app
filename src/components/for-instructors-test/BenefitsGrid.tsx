import { Wallet, CalendarClock, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Keep 100% of Earnings",
    desc: "We don't take a cut from your lesson fees. You set your prices and keep what you earn.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: CalendarClock,
    title: "Total Flexibility",
    desc: "Work when you want. Our smart calendar blocks out time for you automatically.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed Payments",
    desc: "No more chasing cash. Students pay upfront, and you get paid weekly, guaranteed.",
    color: "text-[#F03D3D]",
    bg: "bg-[#F03D3D]/10",
  },
  {
    icon: Users,
    title: "Steady Stream of Pupils",
    desc: "Get matched with students in your local area who are looking for your specific car and style.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const BenefitsGrid = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Top Instructors Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the technology and marketing so you can focus on what you do best: teaching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
