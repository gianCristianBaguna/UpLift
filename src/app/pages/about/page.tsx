"use client";

import Shell from "@/components/navbar/shell";
import AboutMission from "@/components/about/aboutMission";
import AboutFocus from "@/components/about/aboutFocus";
import  AboutTeam  from "@/components/about/aboutTeam";
import { motion } from "framer-motion";
import AboutHeroSection from "@/components/about/aboutHero";
import Footer from "@/components/navbar/footer";

export default function AboutPage() {
  return (
    <Shell>
      <div className="bg-orange-50 ">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          
        >
          <AboutHeroSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AboutMission />
        </motion.div>
        <div className="h-px bg-gray-300 shadow-md" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AboutFocus />
        </motion.div>
        <div className="h-px bg-gray-300 shadow-md" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AboutTeam />
        </motion.div>
        <div className="h-px bg-gray-300 shadow-md" />
      </div>
      <Footer />
    </Shell>
  );
}
