"use client";

import Shell from "@/components/navbar/shell";
import { usePathname } from "next/navigation";
import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  Stethoscope,
  GraduationCap,
  HelpingHand,
  HeartHandshake,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((m) => m.Player),
  { ssr: false }
);

const allEvents: any[] = [
  {
    title: "Back-to-School Drive",
    date: "2025-08-12",
    location: "Quezon City",
    description:
      "Distributing school supplies and uniforms to underprivileged children.",
    icon: <GraduationCap className="w-6 h-6 text-[#F3954A]" />,
  },
  {
    title: "Community Health Fair",
    date: "2025-09-09",
    location: "Cavite",
    description: "Offering free check-ups, dental care, and health education.",
    icon: <Stethoscope className="w-6 h-6 text-[#F3954A]" />,
  },
  {
    title: "Youth Leadership Camp",
    date: "2025-10-21",
    location: "Batangas",
    description: "Empowering young leaders with workshops and team-building.",
    icon: <CalendarCheck className="w-6 h-6 text-[#F3954A]" />,
  },
  {
    title: "Livelihood Skills Workshop",
    date: "2024-11-15",
    location: "Davao City",
    description: "Teaching practical skills like sewing and freelancing.",
    icon: <HelpingHand className="w-6 h-6 text-[#F3954A]" />,
  },
  {
    title: "Gift of Giving Day",
    date: "2024-12-20",
    location: "Manila",
    description:
      "Christmas outreach with food packs, toys, and medical support.",
    icon: <HeartHandshake className="w-6 h-6 text-[#F3954A]" />,
  },
];

export default function EventsPage() {
  const pathname = usePathname(); // triggers re-render when pathname changes
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming");

  type EventType = {
    title: string;
    date: string;
    location: string;
    description: string;
    icon: JSX.Element;
  };

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const filteredEvents = allEvents.filter((e) =>
    selectedTab === "upcoming"
      ? new Date(e.date) >= today
      : new Date(e.date) < today
  );

  // Ensure animations reset when route changes
  useEffect(() => {
    setSelectedTab("upcoming");
    setShowModal(false);
    setSelectedEvent(null);
  }, [pathname]);

  return (
    <Shell key={pathname}>
      <section className="relative w-full min-h-screen px-4 py-20 space-y-16 bg-gradient-to-b from-[#0f0f0f] via-[#111827] to-[#1f2937] text-white overflow-hidden">
        <svg
          className="absolute -top-1 left-0 w-full h-90 text-[#F3954A]/10 pointer-events-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L60,58.7C120,53,240,43,360,58.7C480,75,600,117,720,117.3C840,117,960,75,1080,64C1200,53,1320,75,1380,85.3L1440,96V0H0Z"
          />
        </svg>

        <div className="relative text-center space-y-4 mt-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Events</h1>
          <p className="text-lg text-[#F3954A]">
            Engaging communities through action, learning, and care
          </p>

          <div className="mt-6 flex justify-center gap-4">
            {(["upcoming", "past"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedTab === tab
                    ? "bg-[#2A61AC] text-white shadow"
                    : "bg-[#1f2937] border border-[#F3954A]/30 text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#111827]/70 backdrop-blur-md border border-transparent hover:border-[#F3954A] rounded-2xl p-6 shadow-lg hover:shadow-[#F3954A]/20 hover:-translate-y-1 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {event.icon}
                  <h3 className="text-lg font-bold text-white">{event.title}</h3>
                </div>
                <p className="text-sm text-gray-400">
                  {event.date} · {event.location}
                </p>
                <p className="text-sm text-gray-300">{event.description}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedEvent(event);
                  setShowModal(true);
                }}
                className="mt-6 text-sm text-[#F3954A] font-semibold hover:underline"
              >
                Register →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <AnimatePresence mode="wait">
        {showModal && selectedEvent && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1f2937] text-white rounded-2xl shadow-xl p-6 pt-10 w-full max-w-md space-y-6 relative border-t-8 border-[#F3954A]"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
                <p className="text-sm text-gray-400">
                  {selectedEvent.date} · {selectedEvent.location}
                </p>
                <p className="text-sm text-gray-300">{selectedEvent.description}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-semibold mb-2">Join the Event</h3>
                <form className="space-y-4">
                  <label className="block text-sm">
                    Name
                    <input
                      type="text"
                      className="mt-1 w-full bg-[#111827] border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block text-sm">
                    Email
                    <input
                      type="email"
                      className="mt-1 w-full bg-[#111827] border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400"
                      placeholder="you@email.com"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full bg-[#2A61AC] text-white font-semibold rounded-lg py-2 hover:bg-[#234e8b] transition"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="pt-4 border-t border-gray-600">
                <p className="text-sm text-gray-400 text-center mb-3">
                  Want to support even more?
                </p>
                <button className="w-full bg-[#F3954A] text-white font-semibold py-2 rounded-lg hover:bg-[#e38436] transition">
                  Donate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}
