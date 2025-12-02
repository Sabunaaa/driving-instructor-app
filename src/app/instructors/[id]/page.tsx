import InstructorProfileHeader from "@/components/instructor-profile/InstructorProfileHeader";
import BookingSidebar from "@/components/instructor-profile/BookingSidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// Mock Data
const MOCK_INSTRUCTOR = {
  id: 1,
  name: "Giorgi Beridze",
  rating: 4.9,
  reviewCount: 124,
  specialty: "Nervous Students Specialist",
  location: "Tbilisi, Saburtalo",
  experience: 8,
  studentsPassed: 450,
  languages: ["Georgian", "English", "Russian"],
  vehicles: ["Toyota Prius (2020)", "Hyundai Elantra (2022)"],
  bio: "Hi, I'm Giorgi! I specialize in helping nervous students build confidence behind the wheel. With over 8 years of experience and hundreds of successful students, I've developed a patient, step-by-step teaching method that takes the stress out of learning to drive. Whether you're a complete beginner or looking to refresh your skills, I'll tailor each lesson to your pace.",
  price: 35,
  lessonDuration: 60,
  imageUrl: undefined
};

export default function InstructorProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link 
            href="/find-instructors" 
            className="inline-flex items-center text-gray-500 hover:text-[#F03D3D] transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Instructors
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <InstructorProfileHeader {...MOCK_INSTRUCTOR} />
            
            {/* Reviews Placeholder */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500">Reviews section coming soon...</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar 
              price={MOCK_INSTRUCTOR.price} 
              lessonDuration={MOCK_INSTRUCTOR.lessonDuration} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
