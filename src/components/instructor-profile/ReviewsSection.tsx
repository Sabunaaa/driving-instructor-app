import { Star, SlidersHorizontal } from "lucide-react";
import ReviewCard, { Review } from "./ReviewCard";

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewsSection = ({ reviews, averageRating, totalReviews }: ReviewsSectionProps) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-bold text-gray-900">{averageRating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{totalReviews} reviews</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
          <select className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium bg-white hover:bg-gray-50 transition-colors outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>Most Recent</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-3 rounded-xl bg-gray-50 text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors">
          Show More Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
