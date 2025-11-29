import BlogHero from "@/components/blog-test/BlogHero";
import BlogGrid from "@/components/blog-test/BlogGrid";
import NewsletterCTA from "@/components/blog-test/NewsletterCTA";

export default function BlogTestPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <main>
        <BlogHero />
        <BlogGrid />
        <NewsletterCTA />
      </main>
    </div>
  );
}
