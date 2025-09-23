import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles, getArticleBySlug } from "../data";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = true;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 2xl:px-[120px] 3xl:px-[120px] py-10">
      <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
        ← Back to blog
      </Link>

      {/* Hero */}
      <header className="mt-4 rounded-2xl bg-gradient-to-r from-rose-50 via-rose-100 to-rose-50 p-6 ring-1 ring-rose-100">
        <h1 className="text-3xl font-semibold text-gray-900">
          {article.title}
        </h1>
        <div className="mt-3 text-sm text-gray-500">
          <span className="font-medium text-gray-700">
            {article.author.name}
          </span>
          <span className="mx-1">·</span>
          <time>{new Date(article.date).toLocaleDateString()}</time>
          {article.tag ? (
            <>
              <span className="mx-2">·</span>
              <span className="inline-flex items-center rounded-md bg-white px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-rose-700 ring-1 ring-inset ring-rose-200">
                {article.tag}
              </span>
            </>
          ) : null}
        </div>
        {article.imageUrl ? (
          <div className="relative mt-4 h-56 w-full overflow-hidden rounded-xl ring-1 ring-rose-100">
            <Image
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover"
            />
          </div>
        ) : null}
      </header>

      <article className="mt-8">
        {/* Key takeaways */}
        <section className="rounded-xl bg-[#FEF2F2] p-4 ring-1 ring-rose-100">
          <h2 className="text-base font-semibold text-[#111827]">
            Key takeaways
          </h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-[#4E5562] space-y-1">
            <li>
              Choose manual vs automatic based on your future driving needs.
            </li>
            <li>Compare instructors by reviews, availability, and location.</li>
            <li>Agree pricing and pickup point before the first lesson.</li>
          </ul>
        </section>

        {/* Content */}
        <div className="prose prose-gray max-w-none mt-6">
          <p>{article.excerpt}</p>
          <p className="mt-4 whitespace-pre-line">{article.content}</p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 p-4">
          <div>
            <h3 className="text-lg font-semibold text-[#111827]">
              Ready to book a lesson?
            </h3>
            <p className="text-sm text-[#4E5562]">
              Find verified instructors near you and compare availability.
            </p>
          </div>
          <Link
            href="/find-instructors"
            className="px-4 py-2 rounded-lg bg-[#F03D3D] text-white text-sm font-medium hover:opacity-90"
          >
            Find instructors
          </Link>
        </div>

        {/* Related */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-[#111827]">
            Related articles
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {articles
              .filter((a) => a.slug !== article.slug)
              .slice(0, 4)
              .map((a) => (
                <li
                  key={a.slug}
                  className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm"
                >
                  <Link
                    href={`/blog/${a.slug}`}
                    className="text-sm font-medium text-[#111827] hover:underline"
                  >
                    {a.title}
                  </Link>
                  <p className="mt-1 text-xs text-[#4E5562] line-clamp-2">
                    {a.excerpt}
                  </p>
                </li>
              ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
