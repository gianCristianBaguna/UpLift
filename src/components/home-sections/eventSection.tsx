"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  HelpCircle,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const eventData = [
  {
    id: 1,
    image: "/event1.png",
    what: "Make a Change – Save A Life",
    when: "May 23, 2025",
    where: "Interface, Don Salvador, Los Confianza",
    why: "Because every life matters.",
    who: "Volunteers, donors, local health workers",
  },
  {
    id: 2,
    image: "/event2.png",
    what: "Free Medical Mission",
    when: "September 10, 8AM to 5PM",
    where: "La Castellana",
    why: "Up to your health, our priority.",
    who: "Medical, Minor Surgery, Dental, Pediatrics, Gynecology, Health Expo",
  },
  {
    id: 3,
    image: "/event3.png",
    what: "Community Outreach Fair",
    when: "December 5, 2025",
    where: "Bacolod City Plaza",
    why: "Support. Serve. Smile.",
    who: "Local NGOs, Government Units, Volunteers",
  },
];

export default function EventSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const cardWidth = isMobile ? 340 : 520;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + eventData.length) % eventData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % eventData.length);
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-full mx-auto">
        <h2 className="text-4xl font-bold text-[#1c5091] mb-10 text-center">
          Upcoming Events
        </h2>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="text-[#1c5091] mr-10 hover:opacity-90 transition"
          >
            <ChevronLeft className="w-8 h-8 opacity-80" />
          </button>

          <div
            className="overflow-hidden"
            style={{ width: isMobile ? "340px" : "520px" }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * cardWidth}px)` }}
            >
  
            </div>
          </div>

          <button
            onClick={handleNext}
            className="text-[#1c5091] ml-10 hover:opacity-70 transition"
          >
            <ChevronRight className="w-8 h-8 opacity-80" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4">

          <div
            className=""
            style={{
              width: isMobile ? "340px" : "520px",
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * cardWidth}px)`,
              }}
            >
              {eventData.map((event, index) => (
                <div
                  key={index}
                  className={`min-w-[320px] lg:min-w-[500px] max-w-full transition-all duration-300 rounded-2xl p-5 shadow-xl relative overflow-hidden flex flex-col bg-[#1c5091] text-white ${
                    index === activeIndex
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-30 scale-95 z-0"
                  }`}
                >
                  <div className="h-40 lg:h-60 w-full rounded-xl mb-4 overflow-hidden relative group">
                    <Image
                      src={event.image}
                      alt={`Event ${index}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {event.what}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-200">
                      <CalendarDays className="w-4 h-4 text-orange-300" />
                      <span>{event.when}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-orange-300 mt-0.5" />
                      <span>{event.where}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-orange-300 mt-0.5" />
                      <span>{event.why}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-orange-300 mt-0.5" />
                      <span>{event.who}</span>
                    </div>
                  </div>

                  <button className="mt-auto bg-orange-400 text-white py-2 px-4 rounded-full text-sm hover:bg-orange-500 transition w-fit self-end mt-6">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
