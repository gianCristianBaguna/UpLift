"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarDays, MapPin, Users, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import type { PanInfo } from "framer-motion"
import { Event, getAllEvents } from "@/utils/actions/event-actions"

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

useEffect(() => {
  const interval = setInterval(() => {
    setCurrent(prev => {
      const next = (prev + 1) % events.length;
      return next;
    });
  }, 20000);
  return () => clearInterval(interval);
}, [events.length]);


  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % events.length)
  }

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + events.length) % events.length)
  }

  const handleSwipe = (_: MouseEvent | TouchEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipePower = Math.abs(offset.x) * velocity.x
    if (swipePower < -500) {
      setCurrent((prev) => (prev + 1) % events.length)
    } else if (swipePower > 500) {
      setCurrent((prev) => (prev - 1 + events.length) % events.length)
    }
  }

  const currentEvent = events[current]

  return (
    <section className="relative lg:h-[810px] overflow-hidden shadow-md z-10 bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100" id="hero ">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top row bubbles */}
          <div className="absolute top-10 left-8 w-20 h-20 bg-orange-200/25 rounded-full animate-float-1"></div>
          <div className="absolute top-16 left-1/4 w-12 h-12 bg-blue-200/30 rounded-full animate-float-2"></div>
          <div className="absolute top-8 left-1/2 w-16 h-16 bg-orange-300/20 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-20 right-1/3 w-14 h-14 bg-blue-300/25 rounded-full animate-float-3"></div>
          <div className="absolute top-12 right-16 w-18 h-18 bg-orange-200/30 rounded-full animate-float-1"></div>
          <div className="absolute top-24 right-8 w-10 h-10 bg-blue-200/35 rounded-full animate-float-2"></div>

          {/* Middle row bubbles */}
          <div className="absolute top-1/3 left-4 w-24 h-24 bg-orange-300/20 rounded-full animate-float-3"></div>
          <div className="absolute top-1/3 left-1/5 w-8 h-8 bg-blue-200/40 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-2/5 left-1/3 w-32 h-32 bg-orange-200/15 rounded-full animate-float-1"></div>
          <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-blue-300/45 rounded-full animate-float-2"></div>
          <div className="absolute top-2/5 right-1/4 w-22 h-22 bg-orange-300/25 rounded-full animate-float-3"></div>
          <div className="absolute top-1/3 right-12 w-28 h-28 bg-blue-200/20 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-1/2 right-6 w-14 h-14 bg-orange-200/35 rounded-full animate-float-1"></div>

          {/* Bottom row bubbles */}
          <div className="absolute bottom-32 left-6 w-18 h-18 bg-blue-300/30 rounded-full animate-float-2"></div>
          <div className="absolute bottom-24 left-1/4 w-26 h-26 bg-orange-200/25 rounded-full animate-float-3"></div>
          <div className="absolute bottom-40 left-1/2 w-12 h-12 bg-blue-200/40 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-28 right-1/3 w-20 h-20 bg-orange-300/20 rounded-full animate-float-1"></div>
          <div className="absolute bottom-36 right-16 w-16 h-16 bg-blue-300/35 rounded-full animate-float-2"></div>
          <div className="absolute bottom-20 right-8 w-24 h-24 bg-orange-200/30 rounded-full animate-float-3"></div>

          {/* Additional scattered bubbles for full coverage */}
          <div className="absolute top-1/4 left-1/6 w-10 h-10 bg-blue-200/25 rounded-full animate-float-1"></div>
          <div className="absolute top-3/4 left-1/3 w-14 h-14 bg-orange-300/30 rounded-full animate-float-2"></div>
          <div className="absolute top-1/6 right-1/5 w-8 h-8 bg-blue-300/40 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-1/4 left-1/5 w-12 h-12 bg-orange-200/35 rounded-full animate-float-3"></div>
          <div className="absolute bottom-1/3 right-1/4 w-18 h-18 bg-blue-200/25 rounded-full animate-float-1"></div>
          <div className="absolute top-2/3 right-1/6 w-22 h-22 bg-orange-300/20 rounded-full animate-float-2"></div>
        </div>
        {/* Content Section */}
        <div className="relative w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen flex items-center justify-center px-4 py-8 md:px-8 md:py-12 lg:p-12 overflow-hidden">
          <div className="relative z-10 max-w-lg text-center lg:text-left mt-20 lg:mt-0">
            <div className="inline-block bg-[#F3954A] text-white text-sm font-medium px-4 py-2 rounded-full mb-4 md:mb-6 shadow-lg">
              Making a Difference
            </div>
            <h1 className="font-[Montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 md:mb-6 text-gray-800 leading-tight">
              <span>
                <span className="text-gray-800">SERVE.</span> <span className="text-[#F3954A]">SHARE.</span>{" "}
                <span className="text-gray-800">SHINE.</span>
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-light mb-6 md:mb-8 text-gray-700 leading-relaxed">
              Join us in uplifting communities through <span className="text-[#F3954A] font-semibold">service</span> and{" "}
              <span className="text-[#F3954A] font-semibold">sharing</span> across our neighborhoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center lg:justify-start">
              <a
                href="/pages/donation"
                className="w-full sm:w-auto bg-[#F3954A] drop-shadow-[3px_4px_0_#2A61AC] text-white text-base font-semibold px-6 py-3 rounded-full hover:bg-[#e07f2f] hover:drop-shadow-[4px_8px_0_#2A61AC] transition-all transform hover:scale-105 duration-300 text-center"
              >
                Donate Now
              </a>
              <a
                href="/pages/about"
                className="w-full sm:w-auto bg-white text-gray-700 text-base md:text-lg font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-[#F3954A] transition-all transform hover:scale-105 duration-300 text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Event Card Section */}

        {(loading) ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-20">
            <p className="text-gray-600 text-lg">Loading events...</p>
          </div>
        ) : (events.length === 0) ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-20">
            <p className="text-gray-600 text-lg">No upcoming events available.</p>
          </div>
        ) : (
          <div className="relative lg:max-w-[1200px] min-h-[50vh] flex items-center justify-start p-4 md:p-8">
            <div className="w-full max-w-md lg:max-w-lg">
              <div className="flex items-center justify-center gap-2 md:gap-4 w-full">
                {/* Prev Button */}
                <button
                  onClick={goToPrev}
                  className="className=flex-shrink-0  text-black hover:text-[#F3954A] p-2 transition-all duration-300"
                  aria-label="Previous event"
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                </button>

                <div className="flex-1 flex justify-center max-w-lg md:max-w-xl lg:max-w-2xl w-[600px] md:mt-5">

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      drag={isMobile ? "x" : false}
                      dragConstraints={isMobile ? { left: 0, right: 0 } : undefined}
                      onDragEnd={isMobile ? handleSwipe : undefined}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden transition-all duration-500 transform hover:scale-105 w-full"
                    >
                      {/* Image */}
                      <div className="relative h-40 sm:h-48 md:h-56">
                        <Image
                          src={currentEvent.image ? currentEvent.image : "/placeholder.svg"}
                          alt={currentEvent.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                          className="object-cover"
                          priority
                        />
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 md:top-4 md:left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold">
                            {currentEvent.category}
                          </span>
                        </div>

                        {/* Impact Badge */}
                        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-white">
                          <div className="flex items-center gap-1 md:gap-2 bg-black/30 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1 rounded-full">
                            <Heart className="h-3 w-3 text-red-400" />
                            <span className="text-xs font-medium">{currentEvent.impact}</span>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-4 md:p-6">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2">
                          {currentEvent.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 md:mb-4 line-clamp-2">{currentEvent.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <CalendarDays className="h-4 w-4 text-[#F3954A] flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="font-semibold text-gray-900 text-xs truncate">{currentEvent.date.toLocaleString()}</div>
                              <div className="text-xs text-gray-600 truncate">{currentEvent.time}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <MapPin className="h-4 w-4 text-[#F3954A] flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="font-semibold text-gray-900 text-xs">Location</div>
                              <div className="text-xs text-gray-600 line-clamp-1">{currentEvent.location}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg mb-3 md:mb-4">
                          <Users className="h-4 w-4 text-[#F3954A] flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 text-xs">Expected Attendees</div>
                            <div className="text-xs text-gray-600">{currentEvent.attendees}</div>
                          </div>
                        </div>

                        <button className="w-full border-2 border-[#F3954A] text-[#F3954A] hover:bg-[#F3954A] hover:text-white px-4 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm">
                          <a href="/pages/events">Join This Event</a>
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNext}
                  className="flex-shrink-0  text-black hover:text-[#F3954A] p-2 transition-all duration-300 "
                  aria-label="Next event"
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4 md:mt-6">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current ? "bg-[#F3954A] w-6" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    aria-label={`Go to event ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
