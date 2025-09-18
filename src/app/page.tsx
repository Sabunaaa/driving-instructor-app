import HeroSplit from "@/components/ui/HeroSplit";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-6">
        <HeroSplit
          eyebrow="Trusted local instructors"
          title={
            <>
              Your road to confident
              <br /> driving begins here
            </>
          }
          subtitle="Book lessons with highly-rated instructors in your area. Flexible schedules, friendly teaching, real results."
          ctaHref="/contact"
          ctaLabel="Get in touch"
          rating={5}
          // Suggest a bold but friendly palette: blue-cyan gradient
          leftBgClassName="bg-gradient-to-br from-red-300 to-red-100"
          rightImageSrc="/images/404/instructor.png"
          rightImageAlt="Smiling driving instructor next to a training car"
        />
      </div>
    </div>
  );
}
