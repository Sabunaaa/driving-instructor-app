import React from "react";
import { NavbarMain1 } from "@/components/main1/NavbarMain1";
import { HeroSection } from "@/components/main1/HeroSection";
import { StatsSection } from "@/components/main1/StatsSection";
import { FeatureGrid } from "@/components/main1/FeatureGrid";
import { InstructorShowcase } from "@/components/main1/InstructorShowcase";
import { FooterMain1 } from "@/components/main1/FooterMain1";

export default function Main1Page() {
  return (
    <main className="bg-slate-950 min-h-screen text-slate-200 selection:bg-indigo-500/30">
      <NavbarMain1 />
      <HeroSection />
      <StatsSection />
      <FeatureGrid />
      <InstructorShowcase />
      <FooterMain1 />
    </main>
  );
}
