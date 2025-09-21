"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  CalendarCheck,
  Users,
  HelpingHand,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const impactItems = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community-Driven",
    description: "Passionate volunteers creating real change together.",
    image: "/communityDriven.jpg",
  },
  {
    icon: <HelpingHand className="h-8 w-8" />,
    title: "Direct Support",
    description: "Food, supplies, and aid delivered to families in need.",
    image: "/directSupp.png",
  },
  {
    icon: <CalendarCheck className="h-8 w-8" />,
    title: "Consistent Impact",
    description: "Regular events that uplift and empower communities.",
    image: "/consistence.png",
  },
  {
    icon: <HeartHandshake className="h-8 w-8" />,
    title: "Lasting Bonds",
    description: "Building meaningful relationships beyond aid.",
    image: "/bond.jpg",
  },
];

export default function AboutImpactSection() {
  const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });
const controls = useAnimation();

useEffect(() => {
  const hash = window.location.hash;

  if (isInView || hash === "#core") {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    });
  }
}, [isInView, controls]);

  return (
    <section className="py-24 bg-white" id="events">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Empowering communities through action and compassion
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="relative rounded-3xl outline-2 outline-blue-500 overflow-hidden shadow-2xl" id="events">
            <Image
              src="/together.jpg"
              alt="Community volunteers working together"
              className="w-full h-[400px] md:h-[500px] object-cover"
              width={1200}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Together We Make a Difference
              </h3>
              <p className="text-lg opacity-90">
                Join hundreds of volunteers creating positive change
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {impactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white  outline-[0.1px] outline-blue-500 rounded-3xl border border-gray-100 hover:border-[#F3954A]/20 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                  />
                  <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl text-[#F3954A] shadow-lg">
                    {item.icon}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-[#F3954A]/5 to-[#F3954A]/10 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#F3954A] mb-2">
                  500+
                </div>
                <div className="text-gray-600 font-medium">Families Helped</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#F3954A] mb-2">
                  50+
                </div>
                <div className="text-gray-600 font-medium">
                  Events Organized
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#F3954A] mb-2">
                  200+
                </div>
                <div className="text-gray-600 font-medium">
                  Active Volunteers
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#F3954A] mb-2">
                  5+
                </div>
                <div className="text-gray-600 font-medium">Years of Impact</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=1200"
              alt="Community celebration"
              className="w-full h-80 object-cover"
              width={1200}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F3954A]/90 to-[#F3954A]/80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Make a Difference?
                </h3>
                <p className="text-xl mb-8 max-w-md mx-auto opacity-90">
                  Join our community of volunteers and help us create lasting
                  change
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-[#F3954A] hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg text-lg flex items-center justify-center">
                    <a href="/pages/events">Get Involved</a>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
