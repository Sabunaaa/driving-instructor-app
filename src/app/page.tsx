import Link from "next/link";
import { ArrowRight, CheckCircle, Car } from "lucide-react";

const HeroSection = () => (
  <section className="px-6 py-20 md:py-32 max-w-6xl mx-auto">
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Find Your Perfect Driving Instructor
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Connect with experienced, certified driving instructors in your area. Book lessons that fit your schedule and learn at your own pace.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/find-instructors"
          className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Find Instructors
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
        <Link
          href="/for-instructors"
          className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
        >
          Become an Instructor
        </Link>
      </div>
    </div>
  </section>
);

const AnimatedCarsBanner = () => {
  const cars = Array.from({ length: 40 });

  return (
    <section className="bg-gray-50 py-2 overflow-hidden border-t border-gray-200">
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .cars-banner {
          animation: scroll-left 75s linear infinite;
          width: max-content;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
      <div className="cars-banner">
        {cars.map((_, i) => (
          <div key={i} className="flex-shrink-0 inline-flex" style={{ marginRight: '60px' }}>
            <Car className="w-12 h-12 text-blue-600" />
          </div>
        ))}
      </div>
    </section>
  );
};

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-blue-600 mb-2">{value}</div>
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

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureItemProps) => (
  <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition">
    <CheckCircle className="w-6 h-6 text-blue-600 mb-3" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features: FeatureItemProps[] = [
    {
      title: "Verified Instructors",
      description: "All instructors are certified and background-checked for your safety.",
    },
    {
      title: "Flexible Scheduling",
      description: "Book lessons at times that work for you, no rigid schedules.",
    },
    {
      title: "Transparent Pricing",
      description: "Clear, upfront rates with no hidden fees or surprises.",
    },
    {
      title: "Real-Time Booking",
      description: "See availability instantly and confirm lessons in seconds.",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed lesson feedback.",
    },
    {
      title: "Local Instructors",
      description: "Find experienced drivers in your area who know local roads.",
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <FeatureItem key={idx} {...feature} />
        ))}
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="bg-blue-600 py-16 md:py-20 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to Start Learning?
      </h2>
      <p className="text-blue-100 mb-8 text-lg">
        Join thousands of students who have found their perfect driving instructor.
      </p>
      <Link
        href="/find-instructors"
        className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
      >
        Explore Instructors Now
        <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <HeroSection />
      <AnimatedCarsBanner />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
