"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarDays, MapPin, Users, ChevronLeft, ChevronRight, Clock, Heart, Sparkles } from "lucide-react"
import type { PanInfo } from "framer-motion"
import { Event, getAllEvents } from "@/utils/actions/event-actions"

export default function UpcomingEventsSection() {
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

  // Remove the redundant 'current' state - only use 'index'
  const [index, setIndex] = useState(0)
  const ref = useRef(null)

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % events.length);
  }

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + events.length) % events.length);
  }

  const handleSwipe = (_: MouseEvent | TouchEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipePower = Math.abs(offset.x) * velocity.x;
    if (swipePower < -500) {
      setIndex((prev) => (prev + 1) % events.length);
    } else if (swipePower > 500) {
      setIndex((prev) => (prev - 1 + events.length) % events.length);
    }
  }

  const currentEvent = events[index];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (loading || events.length === 0) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-gray-600 text-lg">Loading events...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-[#F3954A]" />
            <span className="text-[#F3954A] font-semibold uppercase tracking-wide text-sm">Upcoming Events</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Join Our Latest Initiatives</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Be part of meaningful change in our community. Every event is an opportunity to make a difference.
          </p>
        </motion.div>

        <div className="relative mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              drag={isMobile ? "x" : false}
              dragConstraints={isMobile ? { left: 0, right: 0 } : undefined}
              onDragEnd={isMobile ? handleSwipe : undefined}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {(currentEvent && currentEvent.image) && (
                  <div className="relative h-80 lg:h-full">
                    <Image
                      src={currentEvent.image || "/placeholder.svg"}
                      alt={currentEvent.title}
                      fill
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                        {currentEvent.category}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Heart className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-medium">{currentEvent.impact}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{currentEvent.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{currentEvent.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <CalendarDays className="h-5 w-5 text-[#F3954A]" />
                      <div>
                        <div className="font-semibold text-gray-900">{currentEvent.date.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{currentEvent.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <MapPin className="h-5 w-5 text-[#F3954A]" />
                      <div>
                        <div className="font-semibold text-gray-900">Location</div>
                        <div className="text-sm text-gray-600">{currentEvent.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Users className="h-5 w-5 text-[#F3954A]" />
                      <div>
                        <div className="font-semibold text-gray-900">Expected</div>
                        <div className="text-sm text-gray-600">{currentEvent.attendees}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Clock className="h-5 w-5 text-[#F3954A]" />
                      <div>
                        <div className="font-semibold text-gray-900">Duration</div>
                        <div className="text-sm text-gray-600">4 hours</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="border-2 border-[#F3954A] text-[#F3954A] hover:bg-[#F3954A] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex-1 sm:flex-none bg-transparent">
                      <a href="/pages/events">Learn More</a>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls - fixed to use 'index' consistently */}
          <div className="hidden md:flex justify-center items-center gap-6 mt-8">
            <button
              onClick={goToPrev}
              className="bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              aria-label="Previous event"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex gap-2">
              {events.map((_, dotIndex) => (
                <button
                  key={dotIndex} // Fixed: use dotIndex instead of current
                  onClick={() => setIndex(dotIndex)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${dotIndex === index // Fixed: compare dotIndex with index
                    ? "bg-[#F3954A] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to event ${dotIndex + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              aria-label="Next event"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Thumbnail carousel - fixed to use 'index' consistently */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:grid md:grid-cols-3 gap-6"
        >
          {events.map((event, eventIndex) => (
            <div
              key={event.id}
              onClick={() => setIndex(eventIndex)}
              className={`cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${eventIndex === index // Fixed: compare eventIndex with index
                ? "ring-2 ring-[#F3954A] shadow-lg scale-105"
                : "hover:shadow-md hover:scale-102"
                }`}
            >
              <div className="relative h-48">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" fill />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                  <p className="text-sm opacity-90">{event.date.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[#F3954A]/10 to-[#F3954A]/5 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{"Can't Make It to These Events?"}</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Stay connected with our community and get notified about future opportunities to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="border-2 border-[#F3954A] text-[#F3954A] hover:bg-[#F3954A] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-transparent">
                <a href="/pages/event">View All Events</a>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
