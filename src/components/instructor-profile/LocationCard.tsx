import { MapPin } from "lucide-react";

interface LocationCardProps {
  location: string;
}

const LocationCard = ({ location }: LocationCardProps) => {
  const encodedLocation = encodeURIComponent(location);
  
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-400" />
        Location
      </h3>
      <p className="text-gray-600 mb-4 text-sm">{location}</p>
      <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden relative">
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src={`https://maps.google.com/maps?q=${encodedLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          className="absolute inset-0"
        ></iframe>
      </div>
    </div>
  );
};

export default LocationCard;
