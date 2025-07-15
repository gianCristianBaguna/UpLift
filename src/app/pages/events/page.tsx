"use client";

import Shell from "@/components/navbar/shell";
import { useState, JSX } from "react";
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
  () => import("@lottiefiles/react-lottie-player").then(m => m.Player),
  { ssr: false }
);

const allEvents: any[] = [
   {
    title: "Back-to-School Drive",
    date: "2025-08-12",
    location: "Quezon City",
    description:
      "Distributing school supplies and uniforms to underprivileged children.",
    icon: <GraduationCap className="w-6 h-6 text-[#1c5091]" />,
  },
  {
    title: "Community Health Fair",
    date: "2025-09-09",
    location: "Cavite",
    description: "Offering free check-ups, dental care, and health education.",
    icon: <Stethoscope className="w-6 h-6 text-[#1c5091]" />,
  },
  {
    title: "Youth Leadership Camp",
    date: "2025-10-21",
    location: "Batangas",
    description: "Empowering young leaders with workshops and team-building.",
    icon: <CalendarCheck className="w-6 h-6 text-[#1c5091]" />,
  },
  {
    title: "Livelihood Skills Workshop",
    date: "2024-11-15", 
    location: "Davao City",
    description: "Teaching practical skills like sewing and freelancing.",
    icon: <HelpingHand className="w-6 h-6 text-[#1c5091]" />,
  },
  {
    title: "Gift of Giving Day",
    date: "2024-12-20", 
    location: "Manila",
    description:
      "Christmas outreach with food packs, toys, and medical support.",
    icon: <HeartHandshake className="w-6 h-6 text-[#1c5091]" />,
  },
];
 
export default function EventsPage() {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">(
    "upcoming"
  );
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
  const filteredEvents = allEvents.filter(e =>
    selectedTab === "upcoming"
      ? new Date(e.date) >= today
      : new Date(e.date) < today
  );

  return (
    <Shell>
      <section className="relative w-full min-h-screen px-4 py-20 space-y-16 mt-20 bg-gradient-to-b from-orange-100 via-orange-50 to-white overflow-hidden">

        <svg
          className="absolute -top-1 left-0 w-full h-90 text-orange-200 pointer-events-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L60,58.7C120,53,240,43,360,58.7C480,75,600,117,720,117.3C840,117,960,75,1080,64C1200,53,1320,75,1380,85.3L1440,96V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
          />
        </svg>

        <svg
          className="absolute -bottom-20 -right-20 w-96 h-96 text-[#1c5091]/20 blur-2xl pointer-events-none"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M46.2,-62.7C59,-52.4,67,-37.4,73.3,-21.3C79.5,-5.3,84,11.8,78.4,27.2C72.9,42.6,57.2,56.3,40.2,61.4C23.3,66.5,5.1,63, -12.4,67.2C-29.9,71.3,-47,82.9,-59.6,78.1C-72.2,73.3,-80.3,52.1,-81.3,32.4C-82.2,12.8,-76, -5.3,-71.6,-24.1C-67.2,-43,-64.7,-62.5,-53.4,-73.1C-42,-83.7,-21,-85.4,-3,-81.2C15,-77,29.9,-66.9,46.2,-62.7Z"
            transform="translate(100 100)"
          />
        </svg>

        <div className="absolute inset-0 pointer-events-none opacity-20">
          <LottiePlayer
            autoplay
            loop
            src="/lottie/particles.json"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="relative text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1c5091]">
            Events
          </h1>
          <p className="text-orange-600 text-lg">
            Engaging communities through action, learning, and care
          </p>

          <div className="mt-6 flex justify-center gap-4">
            {(["upcoming", "past"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedTab === tab
                    ? "bg-[#1c5091] text-white shadow"
                    : "bg-white border border-orange-200 text-[#1c5091]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-orange-200 rounded-2xl p-6 shadow-lg hover:shadow-orange-400/30 hover:-translate-y-1 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {event.icon}
                  <h3 className="text-lg font-bold text-[#1c5091]">
                    {event.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {event.date} · {event.location}
                </p>
                <p className="text-sm text-gray-700">{event.description}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedEvent(event);
                  setShowModal(true);
                }}
                className="mt-6 text-sm text-orange-600 font-semibold hover:underline"
              >
                Register →
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {showModal && selectedEvent && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 pt-10 w-full max-w-md space-y-6 relative border-t-8 border-orange-500"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#1c5091]">
                  {selectedEvent.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedEvent.date} · {selectedEvent.location}
                </p>
                <p className="text-sm text-gray-700">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-semibold text-[#1c5091] mb-2">
                  Join the Event
                </h3>
                <form className="space-y-4">
                  <label className="block text-sm text-gray-600">
                    Name
                    <input
                      type="text"
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block text-sm text-gray-600">
                    Email
                    <input
                      type="email"
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full bg-[#1c5091] text-white font-semibold rounded-lg py-2 hover:bg-[#163e71] transition"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center mb-3">
                  Want to support even more?
                </p>
                <button className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition">
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
