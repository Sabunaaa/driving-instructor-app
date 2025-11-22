import { CheckCircle, Clock, DollarSign, Calendar, TrendingUp, MapPin } from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Verified Instructors",
      description: "All instructors are certified and background-checked for your safety.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book lessons at times that work for you, no rigid schedules.",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "Clear, upfront rates with no hidden fees or surprises.",
    },
    {
      icon: Calendar,
      title: "Real-Time Booking",
      description: "See availability instantly and confirm lessons in seconds.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed lesson feedback.",
    },
    {
      icon: MapPin,
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
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
