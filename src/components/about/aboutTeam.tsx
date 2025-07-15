"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Users, Globe2 } from "lucide-react";

export function AboutTeam() {
  return (
    <section className="space-y-10 px-6 md:px-12 py-14 bg-white rounded-2xl shadow-md text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-extrabold text-orange-500">
          Meet the Team
        </h2>
        <p className="text-sm uppercase tracking-wide text-[#1c5091] mt-2">
          Built with compassion, led by love
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed space-y-4">
          <p>
            Uplift Foundation International thrives through the heart and hands of passionate individuals. At the core are our founders,{" "}
            <span className="font-semibold text-[#1c5091]">Alex and Vi-anne Calipusan</span>, whose unwavering dedication, humility, and leadership inspire everything we do.
          </p>
          <p>
            From volunteers in Las Vegas to grassroots partners across the Philippines, each member brings unique strength, spirit, and purpose to the movement—united by the mission to uplift lives.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8 max-w-4xl mx-auto">
          {/* Founder Card */}
          <div className="flex items-start gap-4 bg-orange-50 p-6 rounded-xl shadow-sm hover:shadow-md transition w-full md:w-1/3">
            <HeartHandshake className="text-[#1c5091] w-8 h-8 mt-1" />
            <div className="text-left">
              <h4 className="text-lg font-bold text-[#1c5091]">Alex & Vi-anne Calipusan</h4>
              <p className="text-gray-700 text-sm">Founders & Heart of Uplift</p>
            </div>
          </div>

          {/* Volunteers Card */}
          <div className="flex items-start gap-4 bg-orange-50 p-6 rounded-xl shadow-sm hover:shadow-md transition w-full md:w-1/3">
            <Users className="text-[#1c5091] w-8 h-8 mt-1" />
            <div className="text-left">
              <h4 className="text-lg font-bold text-[#1c5091]">Volunteers</h4>
              <p className="text-gray-700 text-sm">
                Everyday heroes in the U.S. and abroad, dedicating time and talent.
              </p>
            </div>
          </div>

          {/* Partners Card */}
          <div className="flex items-start gap-4 bg-orange-50 p-6 rounded-xl shadow-sm hover:shadow-md transition w-full md:w-1/3">
            <Globe2 className="text-[#1c5091] w-8 h-8 mt-1" />
            <div className="text-left">
              <h4 className="text-lg font-bold text-[#1c5091]">Global Partners</h4>
              <p className="text-gray-700 text-sm">
                Community builders across the Philippines supporting our mission on the ground.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
