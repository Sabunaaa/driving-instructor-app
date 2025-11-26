import { Mail } from "lucide-react";

const NewsletterCTA = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto bg-[#F03D3D] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
        {/* Background patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-8 backdrop-blur-sm">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Don't Miss a Gear Shift
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join 15,000+ learners getting weekly driving tips, test updates, and exclusive discounts delivered straight to their inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-6 py-4 rounded-xl text-gray-900 outline-none focus:ring-4 focus:ring-white/30 transition-all"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-white/60 text-sm mt-6">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
