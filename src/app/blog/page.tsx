import { ArticleCard, BlogSidebar } from "@/components/ui";

export const metadata = {
  title: "Our blog",
};

const articles = [
  {
    title: "Best practices for using AI in digital pharma advertising",
    excerpt:
      "Today’s healthcare consumers have a strong preference for a patient-centric approach, prioritizing personalized experiences and convenience...",
    author: { name: "Dr. Martha Simpson", avatarUrl: "/images/404/404.png" },
    date: "2024-06-23",
    tag: "Healthcare Trends",
    imageUrl: "/window.svg",
    href: "#",
  },
  {
    title: "How Healthgrades rates America’s best hospitals",
    excerpt:
      "Since its establishment in 1998, Healthgrades has been aiding consumers in assessing and contrasting hospital performance concerning care delivered during a hospital...",
    author: { name: "Dr. Jacob Cruz", avatarUrl: "/images/404/404.png" },
    date: "2024-06-08",
    tag: "Hospital Quality",
    imageUrl: "/window.svg",
    href: "#",
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Our blog</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Left: content */}
        <div>
          {/* Featured grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {articles.slice(0, 2).map((a, i) => (
              <ArticleCard key={i} {...a} variant="featured" />
            ))}
          </div>

          <hr className="my-10 border-gray-200" />

          {/* List */}
          <div className="space-y-4">
            {articles.map((a, i) => (
              <ArticleCard key={`list-${i}`} {...a} variant="list" />
            ))}
          </div>
        </div>

        {/* Right: sidebar */}
        <div className="lg:sticky lg:top-20 h-fit">
          <BlogSidebar />
        </div>
      </div>
    </main>
  );
}
