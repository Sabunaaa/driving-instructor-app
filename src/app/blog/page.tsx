'use client';

import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

type Category = 'All' | 'Inside Webflow' | 'Engineering' | 'Design' | 'Strategy' | 'Inspiration' | 'Development';

interface Article {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  author?: string;
}

const categories: Category[] = ['All', 'Inside Webflow', 'Engineering', 'Design', 'Strategy', 'Inspiration', 'Development'];

const latestArticles: Article[] = [
  {
    id: '1',
    title: 'How to build confidence behind the wheel: Tips from expert instructors',
    category: 'TEACHING TIPS',
    categoryColor: 'text-blue-400',
  },
  {
    id: '2',
    title: 'Managing student anxiety during driving lessons: A complete guide',
    category: 'INSTRUCTOR INSIGHTS',
    categoryColor: 'text-cyan-400',
  },
  {
    id: '3',
    title: 'The ultimate checklist for new driving instructors',
    category: 'GETTING STARTED',
    categoryColor: 'text-pink-400',
  },
  {
    id: '4',
    title: 'Best practices for teaching parallel parking to nervous learners',
    category: 'TEACHING TIPS',
    categoryColor: 'text-blue-400',
  },
];

const browseAllArticles: Article[] = [
  {
    id: '5',
    title: 'The technical side of teaching: Structuring your lessons for maximum learning',
    category: 'STRATEGY',
    categoryColor: 'text-blue-400',
    author: 'Sarah Johnson',
  },
  {
    id: '6',
    title: 'Faster feedback cycles: Comment without an account, and more',
    category: 'INSTRUCTOR INSIGHTS',
    categoryColor: 'text-cyan-400',
    author: 'Mike Peterson',
  },
  {
    id: '7',
    title: 'Modern teaching methods vs traditional approaches',
    category: 'DEVELOPMENT',
    categoryColor: 'text-orange-400',
    author: 'Emily Chen',
  },
  {
    id: '8',
    title: 'How to build a successful driving school from scratch',
    category: 'STRATEGY',
    categoryColor: 'text-purple-400',
    author: 'David Williams',
  },
  {
    id: '9',
    title: 'Essential safety protocols every instructor must follow',
    category: 'TEACHING TIPS',
    categoryColor: 'text-blue-400',
    author: 'James Miller',
  },
  {
    id: '10',
    title: 'Building rapport with nervous students: A step-by-step guide',
    category: 'INSTRUCTOR INSIGHTS',
    categoryColor: 'text-cyan-400',
    author: 'Rachel Green',
  },
  {
    id: '11',
    title: 'Digital tools that transform driving instruction',
    category: 'DEVELOPMENT',
    categoryColor: 'text-pink-400',
    author: 'Alex Turner',
  },
  {
    id: '12',
    title: 'Marketing your driving school effectively in 2025',
    category: 'STRATEGY',
    categoryColor: 'text-purple-400',
    author: 'Lisa Anderson',
  },
  {
    id: '13',
    title: 'Understanding different learning styles in driving students',
    category: 'TEACHING TIPS',
    categoryColor: 'text-blue-400',
    author: 'Tom Harrison',
  },
  {
    id: '14',
    title: 'Managing challenging weather conditions during lessons',
    category: 'INSTRUCTOR INSIGHTS',
    categoryColor: 'text-cyan-400',
    author: 'Maria Garcia',
  },
  {
    id: '15',
    title: 'The future of autonomous vehicles and driving instruction',
    category: 'DEVELOPMENT',
    categoryColor: 'text-orange-400',
    author: 'Kevin Lee',
  },
  {
    id: '16',
    title: 'Creating effective lesson plans for beginner drivers',
    category: 'STRATEGY',
    categoryColor: 'text-purple-400',
    author: 'Nina Patel',
  },
  {
    id: '17',
    title: 'Advanced parking techniques: Teaching parallel and reverse bay',
    category: 'TEACHING TIPS',
    categoryColor: 'text-blue-400',
    author: 'Chris Rodriguez',
  },
  {
    id: '18',
    title: 'How to prepare students for their driving test',
    category: 'INSTRUCTOR INSIGHTS',
    categoryColor: 'text-cyan-400',
    author: 'Sophie Brown',
  },
  {
    id: '19',
    title: 'Building a strong online presence for your driving school',
    category: 'DEVELOPMENT',
    categoryColor: 'text-pink-400',
    author: 'Mark Thompson',
  },
  {
    id: '20',
    title: 'Understanding insurance and liability for driving instructors',
    category: 'STRATEGY',
    categoryColor: 'text-purple-400',
    author: 'Jennifer White',
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [visibleArticles, setVisibleArticles] = useState(8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
  };

  const handleShowMore = () => {
    setVisibleArticles(prev => prev + 8);
  };

  return (
    <div className="min-h-screen text-black">
      {/* Hero Section */}
      <section className="px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] pt-8 pb-16">
        <div className="w-full max-w-[1296px] 2xl:max-w-none 3xl:max-w-none mx-auto">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Stories, insights,<br />and advice
          </h1>

          {/* Subtitle and Search on same line */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-20 border-b border-black pb-6">
            <p className="text-xl text-gray-700">
              Expert tips and guidance for driving instructors.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="w-full lg:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What would you like to read about?"
                className="w-full bg-transparent outline-none py-3 px-0 text-black placeholder-gray-500 transition-colors text-lg"
                aria-label="Search articles"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] pb-16">
        <div className="w-full max-w-[1296px] 2xl:max-w-none 3xl:max-w-none mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Features Grid */}
          <div className="lg:col-span-2">
            {/* Image placeholder */}
            <div className="w-3/4 aspect-[16/9] bg-gray-200 rounded-lg mb-6" />

            {/* Featured Article */}
            <div className="cursor-pointer group w-3/4">
              <div className="mb-4">
                <h3 className="text-2xl lg:text-3xl font-bold group-hover:text-cyan-400 transition-colors">
                  10 essential skills every driving instructor should master
                </h3>
              </div>
              <p className="text-gray-600">
                From effective communication to handling difficult situations, discover the key competencies that make great instructors stand out
              </p>
            </div>
          </div>

          {/* Right Column - Latest Articles */}
          <div className="lg:col-span-1 lg:-ml-32">
            <h2 className="text-3xl font-bold mb-8">Latest articles</h2>
            
            <div className="space-y-0">
              {latestArticles.map((article, index) => (
                <a
                  key={article.id}
                  href={`/blog/article-${article.id}`}
                  className={`group cursor-pointer block border-t border-gray-300 pt-6 ${index === latestArticles.length - 1 ? 'pb-6' : 'pb-8'}`}
                >
                  <p className={`text-sm font-bold tracking-wider mb-2 ${article.categoryColor}`}>
                    {article.category}
                  </p>
                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors leading-tight">
                    {article.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscription Section */}
      <section className="px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-16 border-t border-gray-300">
        <div className="w-full max-w-[1296px] 2xl:max-w-none 3xl:max-w-none mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Side - Email Subscription */}
            <div className="lg:col-span-2 w-3/4">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Stay in the loop
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Get the latest insights, tips, and updates delivered straight to your inbox.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-cyan-400 transition-colors text-base"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Right Side - Social Links */}
            <div className="lg:col-span-1 lg:-ml-32 lg:flex lg:flex-col lg:justify-center">
              <h3 className="text-2xl font-bold mb-6">Follow us</h3>
              <div className="flex flex-row gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Facebook"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 group-hover:bg-cyan-400 flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Twitter"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 group-hover:bg-cyan-400 flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Instagram"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 group-hover:bg-cyan-400 flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </div>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="LinkedIn"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 group-hover:bg-cyan-400 flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse All Section */}
      <section className="px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] pt-16 pb-4 border-t border-gray-300">
        <div className="w-full max-w-[1296px] 2xl:max-w-none 3xl:max-w-none mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Browse all
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for an article"
                className="w-96 bg-transparent border-b-2 border-cyan-400 outline-none py-3 px-0 text-black placeholder-gray-500 text-base"
                aria-label="Search articles"
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {browseAllArticles.slice(0, visibleArticles).map((article) => (
              <a
                key={article.id}
                href={`/blog/article-${article.id}`}
                className="cursor-pointer block group"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl mb-4 relative overflow-hidden">
                  {/* Placeholder for article image */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 translate-x-20 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight text-black mb-3">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <p className={`text-xs font-bold tracking-wider uppercase ${article.categoryColor}`}>
                      {article.category}
                    </p>
                    {article.author && (
                      <p className="text-sm text-gray-600">
                        By {article.author}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {/* Show More Button */}
          {visibleArticles < browseAllArticles.length ? (
            <div className="flex justify-center mt-12">
              <button 
                onClick={handleShowMore}
                className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Show more
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-8">
              <div className="w-full border-t border-gray-300 mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">
                You've reached the end of the road!
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Check back soon for more driving insights
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
