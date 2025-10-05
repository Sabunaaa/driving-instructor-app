import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
// @ts-ignore
import {
  Star,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Clock,
  Calendar,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import Button from "@/components/ui/Button";

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

function RatingStars({ value }: { value: number }) {
  const filled = Math.round(value);
  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < filled ? "text-yellow-500 fill-current" : "text-gray-300"
          }
        />
      ))}
      <span className="text-sm text-gray-900 ml-1">{value.toFixed(1)}</span>
    </div>
  );
}

export default async function InstructorProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === numId);
  if (!instructor) return notFound();

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        {/* Header / Hero */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={instructor.avatar}
              alt={`${instructor.name} photo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {instructor.name}
            </h1>
            <p className="text-gray-600">{instructor.headline}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <RatingStars value={instructor.rating} />
              <span className="text-sm text-gray-500">
                ({instructor.reviews} reviews)
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                <MapPin size={16} className="text-gray-500" /> {instructor.city}
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                <ShieldCheck size={16} className="text-gray-500" /> Verified
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Button className="rounded-full">Book Now</Button>
            <Link
              href={`/instructors/${instructor.id}/message`}
              className="inline-flex items-center gap-2 rounded-full border border-[#F03D3D] text-[#F03D3D] hover:bg-[#F03D3D]/5 px-4 py-2.5 text-sm"
              title="Message Instructor"
            >
              <MessageSquare size={16} />
              Message
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">{instructor.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {instructor.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-800 text-sm"
                  >
                    <BadgeCheck size={16} /> {cert}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-medium text-gray-800">Languages:</span>{" "}
                {instructor.languages.join(", ")}
              </div>
            </section>

            {/* Availability & Booking */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Availability & Booking
              </h2>
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Calendar size={18} /> Next available:{" "}
                <span className="font-medium">{instructor.nextAvailable}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Private</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${instructor.pricing.private}/hr
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Group</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${instructor.pricing.group}/hr
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Online</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${instructor.pricing.online}/hr
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button>Request Session</Button>
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Reviews
              </h2>
              <div className="space-y-4">
                {instructor.recentReviews.map((r, idx) => (
                  <div
                    key={idx}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {r.name}
                      </span>
                      <RatingStars value={r.rating} />
                    </div>
                    <p className="text-gray-700 mt-1">{r.comment}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm">
                <Link href="#" className="text-gray-700 underline">
                  See more reviews
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Skills & Services */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Skills & Services
              </h2>
              <div className="flex flex-wrap gap-2">
                {instructor.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {/* Contact & Messaging */}
            <section
              id="contact"
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Contact
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Typically responds in{" "}
                <span className="font-medium text-gray-800">2 hours</span>
              </p>
              <Link
                href={`/instructors/${instructor.id}/message`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#F03D3D] border border-[#F03D3D] text-white hover:opacity-90 px-4 py-2.5 text-sm"
              >
                <MessageSquare size={16} className="text-white" />
                Message Instructor
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
