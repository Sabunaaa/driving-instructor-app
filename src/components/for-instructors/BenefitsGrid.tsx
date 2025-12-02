import BenefitCard from "./BenefitCard";
import { Calendar, DollarSign, Users, Shield, TrendingUp, Clock } from "lucide-react";

const BENEFITS = [
  {
    title: "Flexible Schedule",
    description: "Set your own working hours and manage your availability with our easy-to-use calendar system.",
    icon: Calendar
  },
  {
    title: "Earn More",
    description: "Keep more of your earnings with our competitive commission rates and automated payment processing.",
    icon: DollarSign
  },
  {
    title: "More Students",
    description: "Get discovered by thousands of students looking for instructors in your area every month.",
    icon: Users
  },
  {
    title: "Secure Payments",
    description: "Never worry about cancellations or late payments. We handle the billing so you can focus on teaching.",
    icon: Shield
  },
  {
    title: "Business Growth",
    description: "Access analytics and tools to help you track your performance and grow your driving school business.",
    icon: TrendingUp
  },
  {
    title: "Save Time",
    description: "Automated booking management and student communications save you hours of admin work every week.",
    icon: Clock
  }
];

const BenefitsGrid = () => {
  return (
    <div className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Join Us?
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to manage and grow your driving instruction business in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsGrid;
