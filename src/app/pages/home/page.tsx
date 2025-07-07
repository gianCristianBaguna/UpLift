"use client";

import Shell from "@/components/navbar/shell";
import HeroSection from "@/components/home-sections/heroSection";
import FocusSection from "@/components/home-sections/focusSection";
import AboutSection from "@/components/home-sections/aboutSection";
import HowItWorksSection from "@/components/home-sections/eventSection";
import CallToActionSection from "@/components/home-sections/gallerySection";
import FooterSection from "@/components/home-sections/getInTouchSection";

export default function HomePage() {
  return (
    <Shell>
      <main className="pt-10 font-poppins">
        <HeroSection />
        <FocusSection />
        <AboutSection />
        <HowItWorksSection />
        <CallToActionSection />
        <FooterSection />
      </main>
    </Shell>
  );
}
