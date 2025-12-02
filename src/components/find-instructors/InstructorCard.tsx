import { Star, ShieldCheck, Car } from "lucide-react";
import Link from "next/link";

interface InstructorCardProps {
  id: number;
  name: string;
  rating: number;
  specialty: string;
  price: number;
  tags: string[];
  imageUrl?: string;
  reviewCount?: number;
}

const InstructorCard = ({ id, name, rating, specialty, price, tags, imageUrl, reviewCount = 0 }: InstructorCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#F03D3D]/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4">
            <div className="relative">
                <div className={`w-16 h-16 rounded-2xl ${imageUrl ? '' : 'bg-gradient-to-br from-gray-100 to-gray-200'} overflow-hidden shadow-inner`}>
                    {imageUrl ? (
                        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-green-500 fill-green-100" />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#F03D3D] transition-colors line-clamp-1">{name}</h3>
                <p className="text-sm text-gray-500 mb-1">{specialty}</p>
                <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">{rating}</span>
                    <span className="text-xs text-gray-400">({reviewCount} reviews)</span>
                </div>
            </div>
        </div>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
            <span key={index} className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-xs font-medium text-gray-600 flex items-center gap-1">
                {tag.includes('Manual') || tag.includes('Automatic') ? <Car className="w-3 h-3" /> : null}
                {tag}
            </span>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Hourly Rate</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-900">₾{price}</span>
          </div>
        </div>
        <Link href={`/instructors/${id}`} className="w-1/2">
            <button className="w-full py-2.5 px-4 bg-white border-2 border-[#F03D3D] text-[#F03D3D] rounded-xl font-bold text-sm hover:bg-[#F03D3D] hover:text-white transition-all shadow-sm hover:shadow-md active:scale-95">
            View Profile
            </button>
        </Link>
      </div>
    </div>
  );
};

export default InstructorCard;
