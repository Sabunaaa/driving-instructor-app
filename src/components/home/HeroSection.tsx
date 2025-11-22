import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

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
        <Link href="/find-instructors">
          <Button size="lg" className="w-full sm:w-auto flex items-center justify-center">
            Find Instructors
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
        <Link href="/for-instructors">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Become an Instructor
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default HeroSection;
