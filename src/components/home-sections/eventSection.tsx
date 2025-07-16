"use client";

import { useState, useRef, useEffect } from "react";
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
    when: "September 10, 8 AM – 5 PM",
    where: "La Castellana",
    why: "Your health, our priority.",
    who: "Medical, Minor Surgery, Dental, Pediatrics, Gynecology, Health Expo",
  },
];

export default function EventSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) setCardWidth(wrapperRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handlePrev = () =>
    setActiveIndex((i) => (i - 1 + eventData.length) % eventData.length);
  const handleNext = () => setActiveIndex((i) => (i + 1) % eventData.length);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-[#2A61AC] py-12 sm:py-16 px-4 rounded-b-3xl">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">

          {/* Grid view on desktop */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-2/3">
            {eventData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Right-side header */}
          <div className="text-center lg:text-right lg:w-1/3 mt-12 lg:mt-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1c5091] leading-tight">
              UPCOMING{" "}
              <span className="text-orange-400 drop-shadow-[2px_4px_0_#2A61AC]">
                EVENTS
              </span>
            </h2>
            <p className="mt-4 text-orange-400 font-medium text-base lg:text-lg">
              Discover what’s happening next in our community
            </p>

            <div className="hidden md:flex justify-center lg:justify-end mt-20 mr-20">
              <a
                href="/pages/events"
                className="bg-orange-400 text-white font-semibold block drop-shadow-[2px_4px_0_#2A61AC] text-lg px-6 py-3 rounded-full shadow-lg hover:bg-orange-500 transition-transform transform hover:scale-105"
              >
                View All Events
              </a>
            </div>
          </div>

          {/* Carousel view on mobile */}
          <div className="flex items-center justify-center gap-4 w-full sm:hidden">
            <button
              onClick={handlePrev}
              className="text-[#1c5091] hover:opacity-90 transition"
              aria-label="Previous Event"
            >
              <ChevronLeft className="w-8 h-8 opacity-80" />
            </button>

            <div className="overflow-hidden w-full max-w-sm sm:max-w-md" ref={wrapperRef}>
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeIndex * cardWidth}px)`,
                }}
              >
                {eventData.map((event) => (
                  <div
                    key={event.id}
                    style={{ width: cardWidth }}
                    className="flex-shrink-0 px-2"
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="text-[#1c5091] hover:opacity-70 transition"
              aria-label="Next Event"
            >
              <ChevronRight className="w-8 h-8 opacity-80" />
            </button>
          </div>

          <div className="sm:hidden flex justify-center mt-10">
            <a
              href="/pages/events"
              className="bg-orange-400 text-white font-semibold block drop-shadow-[2px_4px_0_#2A61AC] text-lg px-6 py-3 rounded-full shadow-lg hover:bg-orange-500 transition-transform transform hover:scale-105"
            >
              View All Events
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ✅ Shared Card Component */
function EventCard({ event }: { event: (typeof eventData)[0] }) {
  return (
    <div className="h-full rounded-2xl p-5 shadow-xl bg-[#1c5091] text-white flex flex-col">
      <div className="h-40 sm:h-48 lg:h-60 w-full rounded-xl mb-4 overflow-hidden relative group">
        <Image
          src={event.image}
          alt={event.what}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">{event.what}</h3>
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

      <button className="mt-auto bg-orange-400 py-2 px-4 rounded-full text-sm hover:bg-orange-500 transition self-end mt-6">
        Learn&nbsp;More
      </button>
    </div>
  );
}
