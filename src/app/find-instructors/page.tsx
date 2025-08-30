'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
// @ts-ignore
import { 
  ChevronRight, 
  MapPin, 
  Navigation, 
  Search, 
  Star, 
  X, 
  ChevronDown,
  User,
  Car,
  Calendar,
  Award,
  Shield,
  Clock,
  BookOpen,
  Mail,
  Bookmark
} from 'lucide-react';

const FindInstructorsPage = () => {
  const [selectedLocation, setSelectedLocation] = React.useState('რუსთავი');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = React.useState(false);
  const [selectedRadius, setSelectedRadius] = React.useState('50 mi');

  const [selectedSpecialty, setSelectedSpecialty] = React.useState('ავტომატიკა');
  const [selectedBudget, setSelectedBudget] = React.useState('$$');
  const [selectedFeatures, setSelectedFeatures] = React.useState(['Verified instructors', 'Flexible scheduling']);
  const [selectedRatings, setSelectedRatings] = React.useState(['5', '4']);

  const instructors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'რუსთავი',
      specialties: 'Manual transmission · Highway driving',
      bio: 'Certified driving instructor with 8+ years of experience. Specializing in nervous drivers and manual transmission training.',
      rating: 4.9,
      reviews: 127,
      badges: ['Verified', 'Top Instructor'],
      avatar: User,
      verified: true,
      budget: '$$',
      features: ['Verified instructors', 'Flexible scheduling'],
      images: [Car, Calendar, BookOpen]
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      location: 'ბათუმი',
      specialties: 'Automatic only · City driving · Teen drivers',
      bio: 'Patient and experienced instructor focusing on city driving skills and working with teenage students.',
      rating: 5.0,
      reviews: 45,
      badges: ['Eco-friendly'],
      avatar: User,
      verified: false,
      budget: '$$$',
      features: ['Online booking', 'Weekend availability', 'Modern vehicles'],
      images: [User, Car, BookOpen]
    }
  ];

  const activeFilters = [
    selectedLocation,
    selectedSpecialty,
    selectedBudget,
    ...selectedFeatures,
    ...selectedRatings.map(r => `${r} ⭐`)
  ];

  const specialtyOptions = [
    'ავტომატიკა',
    'მექანიკა'
  ];

  const featureOptions = [
    'Verified instructors',
    'Flexible scheduling',
    'Online booking',
    'Free consultation',
    'Weekend availability',
    'Pickup service',
    'Modern vehicles',
    'Dual controls'
  ];

  const locationOptions = [
    'რუსთავი',
    'თელავი',
    'გორი',
    'ახალციხე',
    'საჩხერე',
    'ქუთაისი',
    'ოზურგეთი',
    'ფოთი',
    'ბათუმი'
  ];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLocationDropdownOpen) {
        setIsLocationDropdownOpen(false);
      }
    };

    if (isLocationDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isLocationDropdownOpen]);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      
      <div className="max-w-[1296px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm font-medium text-gray-600">Homepage</span>
          <ChevronRight size={14} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-900">Find Instructors</span>
        </div>

        {/* Main Content */}
        <div className="flex gap-16">
          {/* Filters Sidebar */}
          <div className="w-[266px] space-y-10">
            {/* Location and Radius */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <h3 className="text-base font-semibold text-gray-900">Location</h3>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <button
                    onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-white w-full text-left hover:bg-gray-50"
                  >
                    <span className="flex-1 text-sm text-gray-900">{selectedLocation}</span>
                    <ChevronDown size={16} className={`text-gray-500 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isLocationDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                      {locationOptions.map((location) => (
                        <button
                          key={location}
                          onClick={() => {
                            setSelectedLocation(location);
                            setIsLocationDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                            selectedLocation === location ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">გადაცემათა კოლოფი</h3>
              <div className="space-y-4">
                {specialtyOptions.map((specialty) => (
                  <label key={specialty} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="specialty"
                      className="form-radio h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                      value={specialty}
                      checked={selectedSpecialty === specialty}
                      onChange={() => setSelectedSpecialty(specialty)}
                    />
                    <span className="text-sm text-gray-700">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Budget</h3>
              <div className="space-y-4">
                {['$$$$', '$$$', '$$', '$'].map((budget) => (
                  <div key={budget} className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      id={budget}
                      name="budget"
                      checked={selectedBudget === budget}
                      onChange={() => setSelectedBudget(budget)}
                      className="w-5 h-5"
                    />
                    <label htmlFor={budget} className="text-sm text-gray-900 cursor-pointer">
                      {budget}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Features</h3>
              <div className="space-y-4">
                {featureOptions.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id={feature}
                      checked={selectedFeatures.includes(feature)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFeatures([...selectedFeatures, feature]);
                        } else {
                          setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                        }
                      }}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <label htmlFor={feature} className="text-sm text-gray-900 cursor-pointer">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Average Rating */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Average rating</h3>
              <div className="space-y-4">
                {['5', '4', '3', '2-1'].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id={rating}
                      checked={selectedRatings.includes(rating)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRatings([...selectedRatings, rating]);
                        } else {
                          setSelectedRatings(selectedRatings.filter(r => r !== rating));
                        }
                      }}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <label htmlFor={rating} className="flex items-center gap-1 text-sm text-gray-900 cursor-pointer">
                      {rating} <Star size={12} className="text-orange-400 fill-current" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Active Filters */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {activeFilters.slice(0, 8).map((filter, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                    <X size={12} className="cursor-pointer" />
                    {filter}
                  </span>
                ))}
              </div>
              <button className="text-sm font-medium text-gray-900 hover:text-gray-700">
                Clear all
              </button>
            </div>

            {/* Sorting */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Showing {instructors.length} results</span>
              <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-white">
                <span className="text-sm text-gray-900">Popular</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>

            {/* Instructor Listings */}
            <div className="space-y-6">
              {instructors.map((instructor) => {
                const AvatarIcon = instructor.avatar;
                
                return (
                  <div key={instructor.id} className="flex bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    {/* Image Gallery */}
                    <div className="w-[306px] h-[261px] bg-gray-100 relative flex items-center justify-center">
                      {/* Single centered icon instead of grid */}
                      <AvatarIcon size={80} className="text-gray-400" />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/16"></div>
                      
                      {/* Pagination dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      </div>

                      {/* Bookmark button */}
                      <button className="absolute top-0 right-0 p-3 rounded-full border border-gray-200 bg-white m-3 hover:bg-gray-50 transition-colors">
                        <Bookmark size={16} className="text-gray-700" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1">
                      {/* Main Content Area */}
                      <div className="flex-1 p-6">
                        {/* Contractor Info */}
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <AvatarIcon size={24} className="text-gray-600" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 leading-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                              {instructor.name}
                            </h3>
                          </div>
                          
                          {/* Services */}
                          <p className="text-sm font-medium text-gray-900 leading-[1.43em]" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
                            {instructor.specialties}
                          </p>
                          
                          {/* Bio */}
                          <p className="text-sm text-gray-600 leading-[1.57em]" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', color: '#4E5562' }}>
                            {instructor.bio}
                          </p>
                        </div>
                      </div>

                      {/* Vertical Divider */}
                      <div className="w-px bg-gray-200"></div>

                      {/* Listing Info */}
                      <div className="w-48 p-6 flex flex-col justify-between">
                        {/* Top section with rating and badges */}
                        <div className="space-y-2 pt-11">
                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            <Star size={16} className="text-orange-400 fill-current" />
                            <span className="text-sm text-gray-900" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px' }}>
                              {instructor.rating}
                            </span>
                            <span className="text-xs text-gray-500" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', color: '#6C727F' }}>
                              ({instructor.reviews})
                            </span>
                          </div>
                          
                          {/* Badge */}
                          {instructor.badges.map((badge, idx) => (
                            <div key={idx} className="inline-flex items-center gap-1 py-0.5 rounded">
                              <div className="w-3.5 h-3.5 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 border border-gray-700 rounded-sm flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 bg-gray-700 rounded-sm"></div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-900" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', color: '#333D4C' }}>
                                {badge}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Connect Button */}
                        <button className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-gray-900 border border-gray-800 text-white text-sm font-medium hover:bg-gray-800 transition-colors w-full" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
                          <Mail size={16} className="text-white" />
                          <span>Connect</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-1 pt-2">
              {[1, 2, 3, 4, '...', 10].map((page, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    page === 1 
                      ? 'bg-gray-200 text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindInstructorsPage;
