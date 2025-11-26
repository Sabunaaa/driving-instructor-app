import Link from "next/link";
import { Calendar, User } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Understanding Road Signs: A Complete Guide",
    excerpt: "Don't let road signs confuse you. Learn the meanings behind the most common and obscure signs you'll encounter.",
    category: "Theory",
    author: "Sarah Jenkins",
    date: "Nov 20, 2025",
    readTime: "8 min",
    imageColor: "bg-blue-100"
  },
  {
    id: 2,
    title: "How to Choose the Right Driving Instructor",
    excerpt: "Finding a compatible instructor is key to your success. Here are the questions you should ask before booking.",
    category: "Tips",
    author: "Mike Ross",
    date: "Nov 18, 2025",
    readTime: "4 min",
    imageColor: "bg-green-100"
  },
  {
    id: 3,
    title: "Manual vs. Automatic: Which Should You Choose?",
    excerpt: "Pros and cons of each transmission type to help you decide which learning path is right for your lifestyle.",
    category: "Advice",
    author: "David Kim",
    date: "Nov 15, 2025",
    readTime: "6 min",
    imageColor: "bg-orange-100"
  },
  {
    id: 4,
    title: "The Cost of Learning to Drive in 2025",
    excerpt: "Breakdown of lesson prices, test fees, and hidden costs you need to budget for this year.",
    category: "Finance",
    author: "Emma Wilson",
    date: "Nov 10, 2025",
    readTime: "5 min",
    imageColor: "bg-purple-100"
  },
  {
    id: 5,
    title: "Night Driving: Safety Tips for New Drivers",
    excerpt: "Driving at night brings new challenges. Learn how to handle glare, reduced visibility, and fatigue.",
    category: "Safety",
    author: "James Hall",
    date: "Nov 05, 2025",
    readTime: "7 min",
    imageColor: "bg-indigo-100"
  },
  {
    id: 6,
    title: "Eco-Driving: Save Fuel and the Environment",
    excerpt: "Simple driving habits that can reduce your fuel consumption and carbon footprint significantly.",
    category: "Eco",
    author: "Lisa Chen",
    date: "Nov 01, 2025",
    readTime: "4 min",
    imageColor: "bg-teal-100"
  }
];

const BlogGrid = () => {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
        <Link href="/blog/archive" className="text-[#F03D3D] font-semibold hover:underline hidden md:block">
          View All Posts
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div className={`h-48 ${post.imageColor} relative overflow-hidden`}>
              {/* Placeholder for actual images */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                {post.category}
              </span>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F03D3D] transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              
              <Link href={`/blog/post-${post.id}`} className="inline-block text-sm font-bold text-gray-900 hover:text-[#F03D3D] transition-colors mt-auto">
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-12 text-center md:hidden">
        <Link href="/blog/archive" className="btn btn-outline">
          View All Posts
        </Link>
      </div>
    </section>
  );
};

export default BlogGrid;
