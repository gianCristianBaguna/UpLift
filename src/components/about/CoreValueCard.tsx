"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type CoreValueCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
};

export default function CoreValueCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: CoreValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 border border-orange-100"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
        <Icon className="w-6 h-6 text-[#1c5091]" />
      </div>
      <div>
        <h4 className="text-xl font-semibold text-[#1c5091]">{title}</h4>
        <p className="text-gray-700 text-sm mt-1">{description}</p>
      </div>
    </motion.div>
  );
}
