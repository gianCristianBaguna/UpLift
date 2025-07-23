"use client";

import { useEffect, useMemo, useState } from "react";
import Shell from "@/components/navbar/shell";
import HeroSection from "@/components/home-sections/heroSection";
import FocusSection from "@/components/home-sections/focusSection";
import UpcomingEventsSection from "@/components/home-sections/upcomingSection";
import AboutSection from "@/components/home-sections/impactSection";
import GallerySection from "@/components/home-sections/gallerySection";
import GetInTouchSection from "@/components/home-sections/getInTouchSection";
import Footer from "@/components/navbar/footer";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function HomePage() {
  const heroKey = useMemo(() => Date.now(), []);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("seenDonateModal");
    if (!hasSeenModal) {
      setShowModal(true);
      sessionStorage.setItem("seenDonateModal", "true");
    }
  }, []);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <Shell>
      <main className=" font-poppins bg-gray-50 min-h-screen w-full relative">
        {showModal && (
          <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md mx-auto relative text-center space-y-4">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
              <h2 className="text-3xl font-extrabold text-[#F3954A]">
                Donate Now!
              </h2>
              <p className="text-gray-700 text-base sm:text-lg">
                Help us make a difference in the lives of those who need it
                most. Your support powers our mission and brings hope to
                communities in need.
              </p>
              <a
                href="/pages/donation"
                className="inline-block bg-[#4565CD] text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-[#e07f2f] transition-transform transform hover:scale-105 duration-300"
              >
                Donate Today
              </a>
            </div>
          </div>
        )}

        <motion.div
          key={heroKey}
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
          <UpcomingEventsSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GallerySection />
        </motion.div>

         <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GetInTouchSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Footer />
        </motion.div>
      </main>
    </Shell>
  );
}
