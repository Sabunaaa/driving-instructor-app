'use client';

import { useState } from 'react';
import { ArrowLeft, X, Facebook, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { logger } from '@/utils/secureLogger';

interface ArticleContent {
  title: string;
  subtitle: string;
  category: string;
  authors: Array<{ name: string; title: string; profileUrl: string }>;
  publishedDate: string;
  readTime: number;
  imageUrl: string;
  content: Array<{
    type: 'paragraph' | 'heading' | 'list' | 'blockquote' | 'image';
    content?: string;
    items?: string[];
  }>;
}

interface RelatedArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  url: string;
}

const articleData: ArticleContent = {
  title: 'Faster feedback cycles: Comment without an account, and more',
  subtitle: 'Introducing two big improvements to streamline review cycles and teamwork.',
  category: 'Inside Platform',
  authors: [
    { name: 'Jace Wade', title: 'Senior Product Marketing Manager', profileUrl: '/people/jace-wade' },
    { name: 'Irene Chung', title: 'Senior Product Manager', profileUrl: '/people/irene-chung' }
  ],
  publishedDate: 'October 15, 2025',
  readTime: 5,
  imageUrl: '/api/placeholder/1200/600',
  content: [
    { type: 'paragraph', content: 'Build with your team, not around them' },
    { type: 'paragraph', content: 'Now your entire team can work together in Webflow at the same time — even on the same page — without time-consuming bottlenecks or unnecessary handoffs.' },
    { type: 'heading', content: 'Great websites start with great feedback' },
    { type: 'paragraph', content: 'Because great websites start with great feedback, we\'re making reviews easier than ever for teams of all sizes.' },
    { type: 'paragraph', content: 'To keep projects moving forward, it\'s crucial to involve the right people at the right time, with the right tools. Too often, review cycles slow down because stakeholders can\'t quickly review and leave feedback just by clicking on a link, or because designers and developers don\'t have enough context to understand exactly what a reviewer saw when leaving a comment. These moments of friction add unnecessary delays and force teams to rely on email threads, manual screenshots, live syncs, or other third-party tools.' },
    { type: 'paragraph', content: 'We\'ve been investing heavily in making collaboration smoother and more powerful for teams of all sizes working together on website experiences.' },
    { type: 'paragraph', content: 'Today, we\'re excited to announce two new updates designed to streamline reviews and reduce friction for how teams work together:' },
    { type: 'list', items: [
      'Comment-only links – no account required: Share a link so stakeholders can quickly review and leave feedback on the site without needing a Webflow account.',
      'Comment metadata: Every parent comment now includes helpful context like device and operating system, browser and browser version, and screen size.'
    ]},
    { type: 'paragraph', content: 'These two improvements are available to all Webflow customers starting today.' },
    { type: 'heading', content: 'Comment-only links – no account required' },
    { type: 'paragraph', content: 'When you\'re working with clients, leadership, or other external stakeholders, not everyone should have to set up a Webflow account just to review and leave feedback. This friction often pushes feedback into third-party tools, halting progress because teams are forced to context-switch and coordinate across additional platforms.' },
    { type: 'paragraph', content: 'With comment-only links, you can now share a simple link that lets anyone review your site and leave comments without creating a Webflow account. They just enter their name and email when posting a comment.' },
    { type: 'image', content: '/api/placeholder/800/500' },
    { type: 'heading', content: 'Comment metadata' },
    { type: 'paragraph', content: 'Even when feedback happens inside Webflow, it can sometimes be tricky to find out precise details about the reviewer that shared the feedback — especially with differences in browsers or devices.' },
    { type: 'paragraph', content: 'That\'s why we\'re introducing comment metadata. Every new comment now comes with helpful context that indicates details about the reviewer when they left their feedback — like device and operating system, browser and browser version, and viewport size.' },
    { type: 'heading', content: 'What\'s next' },
    { type: 'paragraph', content: 'Today\'s updates are part of our ongoing investment in making Webflow the best place for teams to collaborate on building, managing, and optimizing website experiences that drive results for your business.' }
  ]
};

const relatedArticles: RelatedArticle[] = [
  { id: '1', title: 'How to deliver location-based content with geotargeting', category: 'Strategy', author: 'Webflow Team', url: '#' },
  { id: '2', title: 'Presenting your web design portfolio: The complete guide for winning new clients', category: 'Design', author: 'Webflow Team', url: '#' },
  { id: '3', title: 'Using AI for data analytics: A complete guide to improving your analytics', category: 'Strategy', author: 'Webflow Team', url: '#' },
  { id: '4', title: '10 Initiatives nurturing Black creatives in design and beyond', category: 'Inspiration', author: 'Leah Retta', url: '#' },
  { id: '5', title: '9 things to keep in mind when looking for a web design mentor', category: 'Design', author: 'Jeff Cardello', url: '#' },
  { id: '6', title: 'Pushing the boundaries of enterprise website design and development', category: 'Design', author: 'Lindsey Crompton', url: '#' }
];

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = articleData.title;
    
    const urls: { [key: string]: string } = {
      twitter: `https://twitter.com/share?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    logger.debug('Subscribing', { email, country });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % relatedArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + relatedArticles.length) % relatedArticles.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation & Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm mb-6">
            <a href="/blog" className="text-purple-600 hover:text-purple-700 flex items-center gap-1 font-medium">
              <ArrowLeft className="w-4 h-4" />
              Blog
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{articleData.category}</span>
          </div>

          {/* Title & Metadata */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
            {articleData.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6 text-center">
            {articleData.subtitle}
          </p>

          {/* Metadata Bar */}
          <div className="flex items-center gap-6 text-sm text-gray-600 border-t border-gray-200 pt-6">
            <div>
              <span className="font-medium text-gray-900">{articleData.publishedDate}</span>
            </div>
            <span>•</span>
            <div>
              <span className="font-medium text-gray-900">{articleData.readTime} min read</span>
            </div>
            <span>•</span>
            <div>
              <span className="font-medium text-purple-600">{articleData.category}</span>
            </div>

            {/* Share Buttons */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-gray-600 font-medium">Share</span>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Share on X"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full mx-auto px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-12 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="w-full aspect-video bg-gradient-to-br from-purple-200 to-blue-200 rounded-xl overflow-hidden max-h-[800px]" />
      </div>

      {/* Main Layout: Subscription Sidebar + Article Content */}
      <div className="w-full mx-auto px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-12 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Sidebar: Newsletter Subscribe */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 bg-gradient-to-b from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Unlock exclusive content</h3>
              <p className="text-gray-600 mb-8 text-base leading-relaxed">
                Subscribe now for best practices, research reports, and more.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Business email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 text-base rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200"
                    aria-label="Email address"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="marketing-consent"
                    defaultChecked
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer mt-0.5 flex-shrink-0"
                    aria-label="Marketing consent"
                  />
                  <label htmlFor="marketing-consent" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                    I'd like to receive marketing communications regarding Webflow's products, services, and events. I understand I can unsubscribe at any time.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-4 text-base bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>

          {/* Right Content: Article */}
          <main className="lg:col-span-9">
            <article className="prose prose-lg max-w-none">
              {articleData.content.map((section, idx) => {
                switch (section.type) {
                  case 'heading':
                    return (
                      <h2 key={idx} className="text-3xl font-bold text-gray-900 mt-12 mb-6 first:mt-0">
                        {section.content}
                      </h2>
                    );
                  case 'paragraph':
                    return (
                      <p key={idx} className="text-lg text-gray-700 mb-6 leading-relaxed">
                        {section.content}
                      </p>
                    );
                  case 'list':
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-3 mb-6 text-lg text-gray-700">
                        {section.items?.map((item, i) => (
                          <li key={i} className="ml-4">{item}</li>
                        ))}
                      </ul>
                    );
                  case 'image':
                    return (
                      <div key={idx} className="w-full aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl my-12" />
                    );
                  case 'blockquote':
                    return (
                      <blockquote key={idx} className="border-l-4 border-purple-600 pl-6 py-4 my-8 bg-gray-50 rounded-r-lg">
                        <p className="text-xl text-gray-700 italic">{section.content}</p>
                      </blockquote>
                    );
                  default:
                    return null;
                }
              })}
            </article>

            {/* Authors Section */}
            <section className="py-12 border-t border-gray-200 mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-8">Authors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articleData.authors.map((author) => (
                  <div key={author.name} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900">{author.name}</h4>
                      <p className="text-sm text-gray-600">{author.title}</p>
                      <a href={author.profileUrl} className="text-sm text-purple-600 hover:text-purple-700 font-medium mt-1 inline-block">
                        View profile →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Meta Information */}
            <section className="py-8 border-t border-gray-200 bg-gray-50 rounded-lg px-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Updated</p>
                  <p className="font-semibold text-gray-900">{articleData.publishedDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Category</p>
                  <p className="font-semibold text-purple-600">{articleData.category}</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Related Articles Carousel */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related articles</h2>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute -left-16 top-0 p-2 text-gray-400 hover:text-gray-900 disabled:opacity-50 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide >= relatedArticles.length - 3}
            className="absolute -right-16 top-0 p-2 text-gray-400 hover:text-gray-900 disabled:opacity-50 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel - 3 items visible */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 328}px)` }}
            >
              {relatedArticles.map((article) => (
                <a
                  key={article.id}
                  href={article.url}
                  className="group cursor-pointer flex-shrink-0 w-80"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 mb-4 aspect-[4/3]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <span className="text-sm font-medium text-purple-600 mb-2 block">{article.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600">By {article.author}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
