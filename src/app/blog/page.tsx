import { ArticleCard, BlogSidebar } from "@/components/ui";
import { articles } from "./data";

export const metadata = {
  title: "Our blog",
};

// Articles come from ./data and include slugs

export default function BlogPage() {
  return (
    <main className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-[120px] 3xl:px-[120px] py-8 max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-none 3xl:max-w-none">
      {/* Removed hero banner per request */}

      <div className="grid gap-10 lg:grid-cols-[1fr_360px] xl:gap-12">
        {/* Left: content */}
        <div>
          {/* Featured grid */}
          <div className="grid gap-8 md:grid-cols-2 xl:gap-10">
            {articles.slice(0, 2).map((a, i) => (
              <ArticleCard
                key={i}
                {...a}
                href={`/blog/${a.slug}`}
                variant="featured"
              />
            ))}
          </div>

          <div className="my-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#111827]">
              Latest articles
            </h2>
            <a
              href="#"
              className="text-sm font-medium text-[#D85151] hover:opacity-90"
            >
              Browse all
            </a>
          </div>

          {/* List */}
          <div className="space-y-5 xl:space-y-6">
            {articles.map((a, i) => (
              <ArticleCard
                key={`list-${i}`}
                {...a}
                href={`/blog/${a.slug}`}
                variant="list"
              />
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
