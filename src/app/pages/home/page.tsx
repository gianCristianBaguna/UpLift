"use client";

import Shell from "@/components/navbar/shell";
import HeroSection from "@/components/home-sections/heroSection";
import FocusSection from "@/components/home-sections/focusSection";
import AboutSection from "@/components/home-sections/aboutSection";
import CallToActionSection from "@/components/home-sections/gallerySection";
import FooterSection from "@/components/home-sections/getInTouchSection";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function HomePage() {
  // ✅ Only set key once during component initialization
  const heroKey = useMemo(() => Date.now(), []);

  return (
    <Shell>
      <main className="pt-10 font-poppins bg-gray-50 min-h-screen w-full">
        <motion.div
          key={heroKey} // ✅ Will only remount when the whole page remounts
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FocusSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AboutSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CallToActionSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FooterSection />
        </motion.div>
      </main>
    </Shell>
  );
}
