import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const FeaturedPost = () => {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
           {/* Placeholder for image since I don't have specific assets, using a colored div for now or a generic placeholder if available. 
               In a real app, this would be <Image ... /> */}
          <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          <div className="absolute bottom-6 left-6 right-6">
             <span className="inline-block py-1 px-3 rounded-lg bg-[#F03D3D] text-white text-xs font-bold mb-3">
              Featured
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Nov 24, 2025</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            10 Essential Tips to Pass Your Driving Test First Time
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Nervous about your upcoming driving test? We've compiled the ultimate guide to help you prepare, stay calm, and impress your examiner. From observation checks to parallel parking secrets.
          </p>
          
          <Link href="/blog/post-1" className="inline-flex items-center text-[#F03D3D] font-bold text-lg hover:gap-2 transition-all group">
            Read Full Article 
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;
