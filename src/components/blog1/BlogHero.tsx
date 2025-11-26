import { Search } from "lucide-react";

const BlogHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gray-50">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-[#F03D3D] font-semibold text-sm mb-6">
          Driving Tips & News
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Master the Road with <br />
          <span className="text-[#F03D3D]">Expert Advice</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Everything you need to know about learning to drive, passing your test, and staying safe on the road.
        </p>

        <div className="max-w-xl mx-auto relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for articles..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-[#F03D3D] focus:ring-2 focus:ring-red-100 outline-none transition-all shadow-sm text-lg"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["Learning to Drive", "Test Tips", "Road Safety", "Car Maintenance"].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#F03D3D] hover:text-[#F03D3D] transition-colors text-sm font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-red-50 blur-3xl opacity-60" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-3xl opacity-60" />
      </div>
    </section>
  );
};

export default BlogHero;
