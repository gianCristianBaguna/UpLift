"use client";

import { motion } from "framer-motion";
import { Eye, HeartHandshake, Flag } from "lucide-react";

const CARD_STYLES = [
  {
    title: "VISION",
    color: "#F3954A",
    Icon: Eye,
    text:
      "We envision a world where marginalized individuals have access to education, healthcare, and sustainable opportunities.",
  },
  {
    title: "MISSION",
    color: "#2A61AC",
    Icon: HeartHandshake,
    text:
      "We support marginalized communities by providing essential resources and services. We empower families through livelihood opportunities, quality education, medical assistance, and emergency relief—honouring seniors' dreams while nurturing every individual's potential.",
  },
  {
    title: "OUR GOAL",
    color: "#22C55E",
    Icon: Flag,
    text:
      "Our goal is to foster thriving communities where children grow into leaders and seniors find dignity and belonging, creating a global movement that uplifts humanity across generations.",
  },
];

export function AboutMission() {
  return (
    <section className="relative py-20 px-4 mt-10 bg-orange-50 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-lg overflow-hidden">
      <div className="absolute top-2 left-0 w-0 h-0 border-t-[60px] border-t-transparent border-b-[60px] border-b-transparent border-r-[100px] border-r-[#F3954A] opacity-80"></div>
      <div className="absolute top-0 left-10 w-0 h-0 border-t-[60px] border-t-transparent border-b-[60px] border-b-transparent border-r-[100px] border-r-[#2A61AC] opacity-80"></div>
      <div className="absolute bottom-10 right-0 w-0 h-0 border-t-[40px] border-t-transparent border-b-[40px] border-b-transparent border-l-[80px] border-l-[#F3954A] opacity-80"></div>
      <div className="absolute bottom-12 right-10 w-0 h-0 border-t-[40px] border-t-transparent border-b-[40px] border-b-transparent border-l-[80px] border-l-[#2A61AC] opacity-80"></div>

      <div className="space-y-10 mt-12 max-w-6xl mx-auto">
        {CARD_STYLES.map(({ title, color, Icon, text }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:flex-row ${
              idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-6`}
          >
            <div
              className="flex-shrink-0 w-20 h-20 rounded-full grid place-items-center shadow-lg"
              style={{ backgroundColor: color }}
            >
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div
              className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl shadow-md p-6 border-l-4"
              style={{ borderColor: color }}
            >
              <h3 className="text-2xl font-semibold mb-2" style={{ color }}>
                {title}
              </h3>
              <p className="leading-relaxed text-slate-800 dark:text-black/90">
                {text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
