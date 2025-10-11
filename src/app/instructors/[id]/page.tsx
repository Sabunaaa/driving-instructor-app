"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import { MapPin, Mail, Star, BadgeCheck } from "lucide-react";
import Calendar from "@/components/ui/Calendar";

const MOCK_INSTRUCTORS = [
  {
    id: 1,
    name: "Sarah Johnson",
    headline: "Certified Driving Instructor",
    rating: 4.9,
    reviews: 127,
    city: "რუსთავი",
    avatar: "/images/404/profile.jpg",
    bio: "Certified driving instructor with 8+ years of experience. I specialize in helping nervous drivers feel confident behind the wheel. Lessons focus on safety, awareness, and real-world scenarios.",
    certifications: ["Georgia State Certified", "Defensive Driving"],
    languages: ["English", "ქართული"],
    pricing: {
      private: 50,
      group: 30,
      online: 40,
    },
    sessionTypes: ["Private", "Group", "Online"],
    nextAvailable: "Oct 5, 10:00 AM",
    skills: [
      "Beginner lessons",
      "Manual transmission",
      "Highway driving",
      "Road test prep",
      "Vehicle provided",
    ],
    recentReviews: [
      {
        name: "A. K.",
        rating: 5,
        comment: "Patient and clear! I passed on my first try.",
      },
      {
        name: "D. M.",
        rating: 5,
        comment: "Great at explaining maneuvers and rules.",
      },
      {
        name: "S. T.",
        rating: 4,
        comment: "Very helpful and flexible scheduling.",
      },
    ],
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    headline: "Driving Coach – City & Teens",
    rating: 5.0,
    reviews: 45,
    city: "ბათუმი",
    avatar: "/images/404/profile.jpg",
    bio: "Experienced instructor focused on city driving skills and supporting teen drivers. Calm, structured lessons to build confidence quickly.",
    certifications: ["First Aid", "Georgia State Certified"],
    languages: ["English", "Español"],
    pricing: { private: 60, group: 35, online: 45 },
    sessionTypes: ["Private", "Online"],
    nextAvailable: "Oct 6, 2:00 PM",
    skills: ["Automatic only", "City driving", "Night driving"],
    recentReviews: [
      {
        name: "K. R.",
        rating: 5,
        comment: "Amazing! Super calm and knowledgeable.",
      },
      {
        name: "B. L.",
        rating: 5,
        comment: "Helped me master parallel parking.",
      },
    ],
  },
];

export default function InstructorProfile() {
  const params = useParams();
  const id = params?.id as string;
  const numId = Number(id);
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === numId);
  
  // Calendar state
  const [calendarEvents] = React.useState<any[]>([]);
  const [availability] = React.useState<Record<string, boolean>>({});
  
  if (!instructor) return notFound();

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-gray-200">
              {/* Profile Image */}
              <div className="pt-4 px-4">
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="p-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl font-semibold text-gray-900">
                      {instructor.name}
                    </h1>
                    <BadgeCheck size={20} className="text-blue-600 fill-white" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{instructor.headline}</p>
                  
                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const filled = Math.round(instructor.rating);
                        return (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < filled
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300 fill-gray-300"
                            }
                          />
                        );
                      })}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {instructor.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({instructor.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Instructor Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">About Instructor</h2>
              
              <div className="space-y-4">
                {/* Years of Experience */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Years of Experience</p>
                  <p className="text-sm font-medium text-gray-900">8+ years teaching</p>
                </div>

                {/* Total Students */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Students Taught</p>
                  <p className="text-sm font-medium text-gray-900">250+ students</p>
                </div>

                {/* Teaching Vehicle */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Teaching Vehicle</p>
                  <p className="text-sm font-medium text-gray-900">2023 Toyota Camry (Automatic)</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Location</h2>
              
              {/* Google Map */}
              <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95780.15033489928!2d-0.17575639999999998!3d51.5073509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Instructor Location"
                ></iframe>
              </div>
              
              {/* Location Text */}
              <div className="mt-3 flex items-start gap-2">
                <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{instructor.city}</span>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Calendar */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
              <div className="flex">
                <div className="flex-1">
                  <Calendar
                    events={calendarEvents}
                    editable={false}
                    availability={availability}
                  />
                </div>
                <div className="w-56 p-4 border-l border-gray-200 bg-gray-50 flex flex-col">
                  <div className="flex-1">
                    <div className="space-y-6">
                      {/* Booking Header */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Book a Lesson</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Choose an available time slot from the calendar to schedule your driving lesson.
                        </p>
                      </div>

                      {/* Legend */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900">Legend:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-sm text-gray-700">Available</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
                            <span className="text-sm text-gray-700">Booked</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
                            <span className="text-sm text-gray-700">Unavailable</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Booking Button - Fixed at bottom */}
                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Write a Review */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Write a Review</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star
                            size={24}
                            className="text-gray-300 hover:text-yellow-500 hover:fill-yellow-500"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Your Review
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your experience with this instructor..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                    ></textarea>
                  </div>
                  <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Existing Reviews */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Student Reviews ({instructor.reviews})
                </h3>
                
                {instructor.recentReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300 fill-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
