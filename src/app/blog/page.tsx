import { ArticleCard, BlogSidebar } from "@/components/ui";
import HeroSplit from "@/components/ui/HeroSplit";
import { articles } from "./data";

export const metadata = {
  title: "Our blog",
};

// Articles come from ./data and include slugs

export default function BlogPage() {
  const tags = Array.from(
    new Set(articles.map((a) => a.tag).filter(Boolean) as string[])
  );

  return (
    <main className="w-full pt-0">
      {/* Hero to match other pages */}
      <div id="welcome" className="mb-8">
        <HeroSplit
          eyebrow="Blog"
          title={
            <>
              Insights, tips & updates
              <br /> for learners and instructors
            </>
          }
          subtitle="Learn smarter, book better, and make the most of DriveConnect."
          ctaHref="#articles"
          ctaLabel="Browse articles"
          rightImageSrc="/images/404/profile.jpg"
          rightImageAlt="Reading blog articles"
          leftBgClassName="bg-gradient-to-br from-red-400 to-red-300"
          compact
          rating={5}
        />
      </div>

      <div
        id="articles"
        className="max-w-[1296px] 2xl:max-w-none 3xl:max-w-none mx-auto px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] grid gap-10 lg:grid-cols-[1fr_360px] xl:gap-12"
      >
        {/* Left: content */}
        <div className="space-y-8">
          {/* Featured layout: exactly two large cards */}
          <section className="grid gap-6 md:grid-cols-2">
            {articles.slice(0, 2).map((a, i) => (
              <ArticleCard
                key={`feat-${i}`}
                {...a}
                href={`/blog/${a.slug}`}
                variant="featured"
              />
            ))}
          </section>

          {/* Latest grid */}
          <section>
            <div className="mb-3 flex items-center justify-between">
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
            {/* Tag chips (static UI) */}
            {tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full border border-[#F03D3D] text-[#F03D3D] bg-[#F03D3D]/5 px-3 py-1 text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="grid gap-5">
              {articles.slice(2).map((a, i) => (
                <ArticleCard
                  key={`list-${i}`}
                  {...a}
                  href={`/blog/${a.slug}`}
                  variant="list"
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right: sidebar */}
        <div className="lg:sticky lg:top-20 h-fit">
          <BlogSidebar />
        </div>
      </div>
    </main>
  );
}
