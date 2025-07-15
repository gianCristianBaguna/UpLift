"use client";

import Shell from "@/components/navbar/shell";
import HeroSection from "@/components/home-sections/heroSection";
import FocusSection from "@/components/home-sections/focusSection";
import AboutSection from "@/components/home-sections/aboutSection";
import HowItWorksSection from "@/components/home-sections/eventSection";
import CallToActionSection from "@/components/home-sections/gallerySection";
import FooterSection from "@/components/home-sections/getInTouchSection";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <Shell>
      <main className="pt-10 font-poppins bg-gray-50 min-h-screen space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FocusSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AboutSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HowItWorksSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CallToActionSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FooterSection />
        </motion.div>
      </main>
    </Shell>
  );
}
