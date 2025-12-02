const STATS = [
  { label: "Active Students", value: "5,000+" },
  { label: "Bookings Monthly", value: "12,000+" },
  { label: "Instructor Earnings", value: "$2M+" },
  { label: "Cities Covered", value: "25+" }
];

const Stats = () => {
  return (
    <div className="bg-[#0F172A] py-16 px-6 border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
