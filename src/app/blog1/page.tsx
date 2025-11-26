import BlogHero from "@/components/blog1/BlogHero";
import FeaturedPost from "@/components/blog1/FeaturedPost";
import BlogGrid from "@/components/blog1/BlogGrid";
import NewsletterCTA from "@/components/blog1/NewsletterCTA";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <main>
        <BlogHero />
        <FeaturedPost />
        <BlogGrid />
        <NewsletterCTA />
      </main>
    </div>
  );
}
