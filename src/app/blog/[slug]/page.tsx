import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles, getArticleBySlug } from "../data";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = true;

export default async function BlogPostPage({ params }: any) {
  // Next.js 15 may pass params as a Promise; await generically
  const resolved = await params;
  const slug = (resolved?.slug ?? "") as string;
  const article = getArticleBySlug(slug);
  if (!article) return notFound();

  const readingTime = computeReadingTime(article.content, article.excerpt);

  return (
    <main className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-[120px] 3xl:px-[120px] py-6 sm:py-8 max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-none 3xl:max-w-none">
      {/* Top hero with soft gradient */}
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-[#F5F7FA] p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/blog" className="hover:text-gray-900">
            Blog
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 line-clamp-1">{article.title}</span>
        </div>

        <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-gray-900">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <AuthorAvatar
              name={article.author.name}
              src={article.author.avatarUrl}
            />
            <span className="font-medium text-gray-800">
              {article.author.name}
            </span>
          </div>
          <span className="hidden sm:inline">•</span>
          <time className="text-gray-500">
            {new Date(article.date).toLocaleDateString()}
          </time>
          <span className="hidden sm:inline">•</span>
          <span className="text-gray-500">{readingTime} min read</span>
          {article.tag ? (
            <span className="ml-auto inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-gray-700 ring-1 ring-inset ring-gray-200">
              {article.tag}
            </span>
          ) : null}
        </div>

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
          <Image
            src="/images/404/instru.png"
            alt={article.imageAlt || article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Content layout */}
      <div className="mt-8 grid gap-8 xl:grid-cols-12">
        {/* Main article */}
        <article className="xl:col-span-8">
          {/* Highlights */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 className="text-base font-semibold text-[#111827]">
              Key takeaways
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-[#4E5562]">
              <li className="flex gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 text-[#F03D3D]" />
                <span>
                  Choose manual vs automatic based on your future driving needs.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 text-[#F03D3D]" />
                <span>
                  Compare instructors by reviews, availability, and location.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 text-[#F03D3D]" />
                <span>
                  Agree pricing and pickup point before the first lesson.
                </span>
              </li>
            </ul>
          </section>

          {/* Body */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <p className="text-[15px] leading-relaxed text-gray-700">
              {article.excerpt}
            </p>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-gray-800">
              <p className="whitespace-pre-line">{article.content}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F03D3D] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              <span>Find instructors</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {/* Related */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-[#111827]">
              More from the blog
            </h2>
            <ul className="mt-4 grid gap-5 sm:grid-cols-2">
              {articles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 4)
                .map((a) => (
                  <li
                    key={a.slug}
                    className="rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-sm"
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

        {/* Sidebar */}
        <aside className="xl:col-span-4 space-y-6">
          {/* Author card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <AuthorAvatar
                name={article.author.name}
                src={article.author.avatarUrl}
                size={40}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {article.author.name}
                </p>
                <p className="text-xs text-gray-500">Editorial Team</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              We share practical tips to help you book the right instructor and
              pass with confidence.
            </p>
          </div>

          {/* Share */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-medium text-gray-900">Share</p>
            <div className="mt-3 flex gap-2">
              <ShareButton label="Twitter" />
              <ShareButton label="Facebook" />
              <ShareButton label="LinkedIn" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

// Helpers
function computeReadingTime(content: string, excerpt?: string) {
  const words = `${excerpt ?? ""} ${content ?? ""}`
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function AuthorAvatar({
  name,
  src,
  size = 28,
}: {
  name: string;
  src?: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-600 ring-1 ring-gray-200"
      style={{ width: size, height: size }}
      aria-label={name}
      title={name}
    >
      {src ? (
        <Image src={src} alt={name} width={size} height={size} />
      ) : (
        <span className="text-[0.65rem] font-medium">{initials}</span>
      )}
    </span>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zm14.28-2.03a.75.75 0 10-1.06-1.06l-4.72 4.72-1.72-1.72a.75.75 0 10-1.06 1.06l2.25 2.25c.3.3.79.3 1.09 0l5.22-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M13.5 4.5a.75.75 0 000 1.5h4.19l-8.72 8.72a.75.75 0 101.06 1.06l8.72-8.72V11a.75.75 0 001.5 0V5.25A.75.75 0 0019.5 4.5h-6z" />
    </svg>
  );
}

function ShareButton({
  label,
}: {
  label: "Twitter" | "Facebook" | "LinkedIn";
}) {
  const Icon =
    label === "Twitter"
      ? TwitterIcon
      : label === "Facebook"
      ? FacebookIcon
      : LinkedInIcon;
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function TwitterIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.633 7.997c.013.18.013.36.013.54 0 5.49-4.182 11.82-11.82 11.82-2.35 0-4.533-.68-6.37-1.86.33.04.65.053.99.053 1.95 0 3.74-.66 5.17-1.78a4.163 4.163 0 01-3.88-2.88c.26.04.52.066.79.066.38 0 .76-.053 1.12-.146a4.156 4.156 0 01-3.33-4.08v-.053c.56.31 1.2.5 1.88.526a4.15 4.15 0 01-1.85-3.46c0-.766.2-1.47.56-2.08a11.81 11.81 0 008.57 4.35c-.06-.31-.1-.62-.1-.94a4.155 4.155 0 017.19-2.84 8.2 8.2 0 002.64-1.01 4.17 4.17 0 01-1.82 2.29 8.31 8.31 0 002.39-.64 8.94 8.94 0 01-2.08 2.16z" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M22.5 12a10.5 10.5 0 10-12.15 10.4v-7.36H7.6V12h2.75V9.83c0-2.71 1.6-4.21 4.05-4.21 1.17 0 2.4.21 2.4.21v2.64h-1.35c-1.33 0-1.74.83-1.74 1.68V12h2.96l-.47 3.04h-2.49v7.36A10.5 10.5 0 0022.5 12z" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.329-.024-3.039-1.852-3.039-1.853 0-2.136 1.447-2.136 2.943v5.665H9.35V9h3.413v1.561h.048c.476-.9 1.637-1.852 3.367-1.852 3.6 0 4.266 2.37 4.266 5.455v6.288zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zM7.114 20.452H3.56V9h3.554v11.452z" />
    </svg>
  );
}
