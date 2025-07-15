"use client";

import { Sparkles, Users, Heart, GraduationCap, HelpingHand, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function AboutStory() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      icon: <Sparkles className="w-6 h-6" />, title: "Rooted in Purpose", color: "orange-400", border: "orange-400", bg: "orange-300",
      text: "Welcome to Uplift Foundation International! We are driven by the passion to empower and uplift marginalized communities, inspired by personal journeys and commitment to service."
    },
    {
      icon: <Users className="w-6 h-6" />, title: "Inspired by Family", color: "blue-700", border: "blue-700", bg: "orange-300",
      text: "Founded by Alex and Vi-anne Calipusan, who hail from Loboc, Bohol and La Castellana, Negros Occidental, Philippines, our foundation is rooted in a legacy of generosity and compassion. Guided by her mother, Eva, and his grandmother, Sixta Calipusan, the couple was inspired to serve communities with love and integrity."
    },
    {
      icon: <GraduationCap className="w-6 h-6" />, title: "Founding Uplift", color: "orange-400", border: "orange-400", bg: "orange-300",
      text: "With encouragement from friends, Alex and Vi-anne founded Uplift Foundation International in November 2018 in Las Vegas, Nevada. It began with granting seniors their last wishes and expanded to closing educational gaps for children in the Philippines."
    },
    {
      icon: <HelpingHand className="w-6 h-6" />, title: "Expanding Reach", color: "blue-700", border: "blue-700", bg: "orange-300",
      text: "Our community projects are driven by volunteers and partners. With a focus on youth and elderly care, we inspire through programs like CarePro Quarterly to give back and build stronger communities."
    },
    {
      icon: <Heart className="w-6 h-6" />, title: "Join Our Journey", color: "orange-400", border: "orange-400", bg: "orange-300",
      text: "Be part of lasting change. Help us spark potential, uplift lives, and create meaningful pathways for everyone’s dreams."
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="space-y-10 px-6 md:px-20 py-10 bg-orange-50 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-lg">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-center text-orange-400"
      >
        Our Story
      </motion.h2>

      {/* Shared Carousel View for All Devices */}
      <div className="w-full mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className={`bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-4 border-l-4 border-${cards[currentIndex].border}`}
          >
            <div className={`flex items-center gap-3 text-${cards[currentIndex].color}`}>
              {cards[currentIndex].icon}
              <h3 className="text-xl font-bold">{cards[currentIndex].title}</h3>
            </div>
            <div className={`rounded-lg w-full h-64 bg-${cards[currentIndex].bg}`}></div>
            <p className="text-gray-700">{cards[currentIndex].text}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center pt-4">
          <button onClick={handlePrev} className="p-2 text-orange-400">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-orange-400' : 'bg-gray-300'}`}
              ></button>
            ))}
          </div>
          <button onClick={handleNext} className="p-2 text-orange-400">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
