import { Check, ChevronRight, Shield } from "lucide-react";

interface BookingSidebarProps {
  price: number;
  lessonDuration: number; // in minutes
}

const BookingSidebar = ({ price, lessonDuration }: BookingSidebarProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6 sticky top-24">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-sm text-gray-500 font-medium">Price per lesson</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">₾{price}</span>
            <span className="text-gray-500">/ {lessonDuration}min</span>
          </div>
        </div>
        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
          Best Value
        </div>
      </div>

      <button className="w-full py-4 bg-[#F03D3D] text-white rounded-xl font-bold text-lg hover:bg-[#d62f2f] transition-all shadow-lg shadow-red-500/20 active:scale-95 flex items-center justify-center gap-2 mb-4">
        Book First Lesson <ChevronRight className="w-5 h-5" />
      </button>

      <button className="w-full py-3 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold hover:border-gray-200 hover:bg-gray-50 transition-all mb-6">
        Message Instructor
      </button>

      <div className="space-y-4 pt-6 border-t border-gray-100">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-blue-50 rounded-full text-blue-600 mt-0.5">
            <Shield className="w-3 h-3" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Secure Payment</h4>
            <p className="text-xs text-gray-500">Your money is held until the lesson is complete.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-1 bg-green-50 rounded-full text-green-600 mt-0.5">
            <Check className="w-3 h-3" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Free Cancellation</h4>
            <p className="text-xs text-gray-500">Cancel up to 24 hours before your lesson.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
