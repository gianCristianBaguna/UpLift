"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Users, Heart } from "lucide-react";
import clsx from "clsx";

const eventData = [
  {
    id: 1,
    image: "/foodsecurity.jpg",
    title: "Community Feeding Program",
    date: "August 10, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Brgy. Maligaya Community Hall",
    attendees: "150+ families",
    category: "Food Security",
    description:
      "Join us in providing nutritious meals and essential supplies to undernourished children and their families.",
    impact: "Expected to serve 500+ meals",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 2,
    image: "/back2school.jpg",
    title: "Back-to-School Drive",
    date: "August 25, 2025",
    time: "1:00 PM - 5:00 PM",
    location: "Nueva Elementary School",
    attendees: "300+ students",
    category: "Education",
    description:
      "Help us distribute school bags, notebooks, and learning materials to support students for the upcoming academic year.",
    impact: "Supporting 300+ students",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    image: "/greenEarth.jpg",
    title: "Green Earth Initiative",
    date: "September 5, 2025",
    time: "6:30 AM - 11:00 AM",
    location: "Mt. Kalayaan Reforestation Site",
    attendees: "75+ volunteers",
    category: "Environment",
    description:
      "Be part of our reforestation effort to promote environmental sustainability and create a greener future.",
    impact: "Planting 1,000+ trees",
    color: "from-green-600 to-teal-600",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % eventData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentEvent = eventData[current];

  const bubbles = [
    {
      className: "top-1/3 left-8 w-14 h-14",
      colors: "from-[#F3954A]/25 to-orange-300/35",
      animation: "animate-float-1",
    },
    {
      className: "bottom-1/20 left-8 w-14 h-14",
      colors: "from-[#F3954A]/25 to-orange-300/35",
      animation: "animate-float-1",
    },
    {
      className: "top-1/2 right-12 w-11 h-11",
      colors: "from-[#2A61AC]/30 to-blue-300/30",
      animation: "animate-bounce-slow delay-500",
    },
    {
      className: "top-2/3 left-1/3 w-13 h-13",
      colors: "from-amber-300/25 to-orange-200/35",
      animation: "animate-float-2 delay-800",
    },
    {
      className: "top-3/4 right-3/4 w-13 h-13",
      colors: "from-[#F3954A]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
    {
      className: "top-1/8 left-8 w-10 h-10",
      colors: "from-[#F3954A]/25 to-orange-300/35",
      animation: "animate-float-1",
    },
    {
      className: "top-1/6 right-12 w-15 h-15",
      colors: "from-[#2A61AC]/30 to-blue-300/30",
      animation: "animate-bounce-slow delay-500",
    },
    {
      className: "top-2/5 left-1/3 w-11 h-11",
      colors: "from-amber-300/25 to-orange-200/35",
      animation: "animate-float-2 delay-800",
    },
    {
      className: "top-4/10 right-1/4 w-9 h-9",
      colors: "from-[#F3954A]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
    {
      className: "bottom-1/20 right-1/4 w-10 h-10",
      colors: "from-[#2A61AC]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
    {
      className: "top-3/6 right-1/4 w-9 h-9",
      colors: "from-[#F3954A]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
    {
      className: "bottom-1/6 right-1/4 w-10 h-10",
      colors: "from-[#2A61AC]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
  ];

  return (
    <section
      className="relative h-[750px] overflow-hidden bg-white shadow-md z-10 -mt-10"
      id="hero"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Content */}
        <div className="relative w-full md:w-full h-full bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 flex items-center justify-center px-6 py-10 md:p-12 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-200/40 to-amber-200/40 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-orange-300/30 to-amber-300/30 rounded-full blur-3xl translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-orange-100/50 to-amber-100/50 rounded-full blur-2xl"></div>

          {/* Mobile bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {bubbles.map((b, idx) => (
              <div
                key={idx}
                className={clsx(
                  "absolute rounded-full",
                  b.className,
                  "bg-gradient-to-br",
                  b.colors,
                  b.animation
                )}
              ></div>
            ))}
          </div>

          <div className="relative z-10 mt-40 md:mt-40 max-w-md text-center md:text-left">
            <div className="inline-block bg-[#F3954A] text-white text-sm font-medium px-4 py-2 rounded-full mb-6 shadow-lg">
              Making a Difference
            </div>
            <h1 className="font-[Montserrat] text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-6 text-gray-800 leading-tight text-center md:text-left">
              <span>
                <span className="text-gray-800">SERVE.</span>{" "}
                <span className="text-[#F3954A]">SHARE.</span>{" "}
                <span className="text-gray-800">SHINE.</span>
              </span>
            </h1>
            <p className="text-lg md:text-xl font-light mb-8 text-gray-700 leading-relaxed">
              Join us in uplifting communities through{" "}
              <span className="text-[#F3954A] font-semibold">service</span> and{" "}
              <span className="text-[#F3954A] font-semibold">sharing</span>{" "}
              across our neighborhoods.
            </p>
            <div className="flex flex-row md:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
              <a
                href="/pages/donation"
                className="bg-[#F3954A] drop-shadow-[3px_4px_0_#2A61AC] text-white text-base font-semibold px-4 py-3 rounded-full hover:bg-[#e07f2f] hover:drop-shadow-[4px_8px_0_#2A61AC] transition-all transform hover:scale-105 duration-300"
              >
                Donate Now
              </a>
              <a
                href="/pages/about"
                className="bg-white text-gray-700 text-lg font-semibold px-4 py-3 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-[#F3954A] transition-all transform hover:scale-105 duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          {/* Event Card Section */}
          <div className="relative w-full md:w-1/2 h-[230px] md:h-full flex items-center justify-center p-4 md:p-8 bg-transparent mt-40 left-20">
            <div className="w-full max-w-md">
              <div
                key={current}
                className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 transform hover:scale-105"
              >
                <div className="relative h-48 md:h-56">
                  <Image
                    src={currentEvent.image || "/placeholder.svg"}
                    alt={currentEvent.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${currentEvent.color} opacity-20`}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                      {currentEvent.category}
                    </span>
                  </div>

                  {/* Impact Badge */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Heart className="h-3 w-3 text-red-400" />
                      <span className="text-xs font-medium">
                        {currentEvent.impact}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {currentEvent.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {currentEvent.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <CalendarDays className="h-4 w-4 text-[#F3954A]" />
                      <div>
                        <div className="font-semibold text-gray-900 text-xs">
                          {currentEvent.date}
                        </div>
                        <div className="text-xs text-gray-600">
                          {currentEvent.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-[#F3954A]" />
                      <div>
                        <div className="font-semibold text-gray-900 text-xs">
                          Location
                        </div>
                        <div className="text-xs text-gray-600 line-clamp-1">
                          {currentEvent.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg mb-4">
                    <Users className="h-4 w-4 text-[#F3954A]" />
                    <div>
                      <div className="font-semibold text-gray-900 text-xs">
                        Expected Attendees
                      </div>
                      <div className="text-xs text-gray-600">
                        {currentEvent.attendees}
                      </div>
                    </div>
                  </div>

                  <button className="w-full border-2 border-[#F3954A] text-[#F3954A] hover:bg-[#F3954A] hover:text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm">
                    <a href="/pages/events">Join This Event</a>
                  </button>
                </div>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {eventData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === current
                        ? "bg-[#F3954A] w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to event ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
