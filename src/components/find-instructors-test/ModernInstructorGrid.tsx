"use client";

import ModernInstructorCard from "./ModernInstructorCard";

const SAMPLE_INSTRUCTORS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    rating: 4.98,
    reviews: 124,
    price: 35,
    location: "Manchester, UK",
    image: "from-blue-400 to-blue-600",
    tags: ["Automatic", "Nervous Pupils"],
    isSuper: true,
  },
  {
    id: 2,
    name: "David Mitchell",
    rating: 4.85,
    reviews: 89,
    price: 32,
    location: "Salford, UK",
    image: "from-red-400 to-red-600",
    tags: ["Manual", "Intensive"],
    isSuper: false,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    rating: 5.0,
    reviews: 42,
    price: 40,
    location: "Didsbury, UK",
    image: "from-green-400 to-green-600",
    tags: ["Automatic", "Spanish Speaker"],
    isSuper: true,
  },
  {
    id: 4,
    name: "James Wilson",
    rating: 4.7,
    reviews: 215,
    price: 30,
    location: "Bolton, UK",
    image: "from-yellow-400 to-yellow-600",
    tags: ["Manual", "Weekend"],
    isSuper: false,
  },
  {
    id: 5,
    name: "Priya Patel",
    rating: 4.92,
    reviews: 156,
    price: 38,
    location: "Stockport, UK",
    image: "from-purple-400 to-purple-600",
    tags: ["Automatic", "Female Only"],
    isSuper: true,
  },
  {
    id: 6,
    name: "Michael Chang",
    rating: 4.88,
    reviews: 94,
    price: 34,
    location: "Trafford, UK",
    image: "from-indigo-400 to-indigo-600",
    tags: ["Manual", "Evening"],
    isSuper: false,
  },
];

const ModernInstructorGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {SAMPLE_INSTRUCTORS.map((instructor) => (
        <ModernInstructorCard key={instructor.id} {...instructor} />
      ))}
    </div>
  );
};

export default ModernInstructorGrid;
