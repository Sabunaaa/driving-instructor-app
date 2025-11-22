interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-[#F03D3D] mb-2">{value}</div>
    <p className="text-gray-600">{label}</p>
  </div>
);

const StatsSection = () => (
  <section className="bg-white py-12 md:py-16 border-t border-gray-200">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatItem value="500+" label="Certified Instructors" />
        <StatItem value="4.8★" label="Average Rating" />
        <StatItem value="10k+" label="Lessons Completed" />
      </div>
    </div>
  </section>
);

export default StatsSection;
