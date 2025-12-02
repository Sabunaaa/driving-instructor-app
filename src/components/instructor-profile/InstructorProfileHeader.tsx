import { Star, ShieldCheck, MapPin, Award, Users, Clock, Car } from "lucide-react";

interface InstructorProfileHeaderProps {
  name: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  experience: number;
  studentsPassed: number;
  languages: string[];
  vehicles: string[];
  bio: string;
  imageUrl?: string;
}

const InstructorProfileHeader = ({
  name,
  rating,
  reviewCount,
  specialty,
  location,
  experience,
  studentsPassed,
  languages,
  vehicles,
  bio,
  imageUrl
}: InstructorProfileHeaderProps) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
      {/* Cover Area */}
      <div className="h-48 bg-gradient-to-r from-gray-900 to-gray-800 relative">
        <div className="absolute inset-0 bg-[#F03D3D]/10 mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="px-8 pb-8 relative">
        {/* Profile Image & Main Info */}
        <div className="flex flex-col md:flex-row gap-6 items-start -mt-16 mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl border-4 border-white bg-gray-200 shadow-lg overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-3xl font-bold text-gray-400">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white p-1.5 rounded-full shadow-md">
              <ShieldCheck className="w-6 h-6 text-green-500 fill-green-100" />
            </div>
          </div>

          <div className="flex-1 pt-16 md:pt-0 md:mt-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {name}
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
                    Verified Instructor
                  </span>
                </h1>
                <p className="text-gray-500 text-lg">{specialty}</p>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900 leading-none">{rating}</span>
                  <span className="text-xs text-gray-500">{reviewCount} reviews</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                {location}
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gray-400" />
                {experience} Years Experience
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-gray-400" />
                {studentsPassed}+ Students Passed
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-8" />

        {/* Bio & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">About Me</h3>
              <p className="text-gray-600 leading-relaxed">
                {bio}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Vehicles</h3>
              <div className="flex flex-wrap gap-3">
                {vehicles.map((vehicle, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-medium">
                    <Car className="w-4 h-4 text-gray-400" />
                    {vehicle}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Availability</h3>
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl border border-green-100">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Available this week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfileHeader;
