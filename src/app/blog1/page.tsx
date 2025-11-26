import NavbarTest from "@/components/layout/NavbarTest";
import FooterModern from "@/components/layout/FooterModern";
import BlogHero from "@/components/blog1/BlogHero";
import FeaturedPost from "@/components/blog1/FeaturedPost";
import BlogGrid from "@/components/blog1/BlogGrid";
import NewsletterCTA from "@/components/blog1/NewsletterCTA";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarTest />
      
      <main>
        <BlogHero />
        <FeaturedPost />
        <BlogGrid />
        <NewsletterCTA />
      </main>

      <FooterModern />
    </div>
  );
}
