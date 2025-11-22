import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const CTASection = () => (
  <section className="bg-[#F03D3D] py-16 md:py-20 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to Start Learning?
      </h2>
      <p className="text-white/90 mb-8 text-lg">
        Join thousands of students who have found their perfect driving instructor.
      </p>
      <Link href="/find-instructors">
        <Button 
          variant="subtle" 
          size="lg" 
          className="bg-white text-[#F03D3D] hover:bg-gray-100 border-transparent"
        >
          Explore Instructors Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  </section>
);

export default CTASection;
