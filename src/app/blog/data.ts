export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string; avatarUrl?: string };
  date: string;
  tag?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export const articles: Article[] = [
  {
    slug: "choose-right-driving-instructor",
    title: "How to choose the right driving instructor (manual vs automatic)",
    excerpt:
      "Not sure whether to learn on manual or automatic? We break down the differences, what matters for your goals, and how to pick the instructor that fits your schedule and budget.",
    content:
      "Choosing the right instructor matters. Start by deciding whether you want to learn on a manual or automatic gearbox...",
    author: { name: "Team Finder", avatarUrl: "/images/404/404.png" },
    date: "2025-08-12",
    tag: "Getting Started",
    imageUrl: "/window.svg",
  },
  {
    slug: "lesson-pricing-guide-georgia",
    title: "Lesson pricing guide: what’s a fair hourly rate in Georgia?",
    excerpt:
      "We analyzed instructor profiles across the country to estimate typical rates by city, transmission type, and package size—plus tips to save without cutting quality.",
    content:
      "Lesson pricing varies by region and experience. In Tbilisi and Batumi, expect higher rates than smaller cities...",
    author: { name: "Team Finder", avatarUrl: "/images/404/404.png" },
    date: "2025-07-30",
    tag: "Pricing",
    imageUrl: "/window.svg",
  },
  {
    slug: "booking-checklist-first-lesson",
    title: "From first message to first lesson: booking checklist",
    excerpt:
      "A step-by-step checklist to go from shortlisting instructors to booking your first lesson—what to ask, how to compare, and how to lock in a time that sticks.",
    content:
      "Use this checklist to go from search to scheduled: shortlist, verify, confirm pricing, agree a pickup point, and set a calendar invite...",
    author: { name: "Team Finder", avatarUrl: "/images/404/404.png" },
    date: "2025-07-14",
    tag: "Booking",
    imageUrl: "/window.svg",
  },
  {
    slug: "safety-verifying-instructors-vehicles",
    title: "Safety first: verifying instructors and vehicles",
    excerpt:
      "Before you get in the car, make sure your instructor is verified, insured, and teaching in a roadworthy vehicle. Here’s how we help—and what you can double-check yourself.",
    content:
      "Your safety is the priority. Look for verification badges on profiles and ask about insurance and dual controls...",
    author: { name: "Team Finder", avatarUrl: "/images/404/404.png" },
    date: "2025-06-28",
    tag: "Safety",
    imageUrl: "/window.svg",
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
