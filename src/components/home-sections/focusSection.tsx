"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Shell from "@/components/navbar/shell";
import {
  Stethoscope,
  GraduationCap,
  HelpingHand,
  HeartHandshake,
  X,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  Briefcase,
  FileText,
} from "lucide-react";
import Footer from "@/components/navbar/footer";
import clsx from "clsx";
import { Event, getAllEvents } from "@/utils/actions/event-actions"

const categories = [
  "All",
  "Education",
  "Healthcare",
  "Leadership",
  "Skills Development",
  "Community Outreach",
];

export default function EventsPage() {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">(
    "upcoming"
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    birthday: "",
    civilStatus: "",
    address: "",
    occupation: "",
    contactNumber: "",
    email: "",
    otherSkills: "",
  });

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


  // Hash navigation effect - for tab switching
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      // Handle tab switching from navbar dropdown
      if (hash === "upcoming" || hash === "past") {
        setSelectedTab(hash as "upcoming" | "past");
      }
      // Close modal when navigating
      setShowModal(false);
      setSelectedEvent(null);
    };

    // Check hash on initial load
    handleHashChange();

    // Listen for hash changes (from navbar dropdown clicks)
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update URL hash when tab changes
  const handleTabChange = (tab: "upcoming" | "past") => {
    setSelectedTab(tab);
    // Update URL hash without triggering page scroll
    window.history.replaceState(null, "", `#${tab}`);
  };

  // Filter events
  const today = new Date();
  const filteredEvents = events.filter((event) => {
    const isUpcoming =
      selectedTab === "upcoming"
        ? new Date(event.date) >= today
        : new Date(event.date) < today;
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return isUpcoming && matchesCategory && matchesSearch;
  });

  const services = [
    "Minor surgeries",
    "Circumcision",
    "OB Gyne",
    "Pediatrics",
    "Dental",
    "Optometry",
    "Doctor (General practitioner)",
    "Registered Nurse",
    "Student Nurse",
    "Counselling",
    "Food Preparation",
    "Teaching and feeding program for children",
    "Haircut",
    "Massage",
    "Utilities/Handyman",
    "Support Staff",
  ];

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setCurrentStep(1);
    setSelectedServices([]);
    setFormData({
      name: "",
      sex: "",
      birthday: "",
      civilStatus: "",
      address: "",
      occupation: "",
      contactNumber: "",
      email: "",
      otherSkills: "",
    });
  };

  const steps = [
    {
      id: 1,
      title: "Personal Information",
      icon: <User className="w-5 h-5" />,
      description: "Tell us about yourself",
    },
    {
      id: 2,
      title: "Skills & Services",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Select your volunteer services",
    },
    {
      id: 3,
      title: "Agreement & Submit",
      icon: <FileText className="w-5 h-5" />,
      description: "Review and confirm registration",
    },
  ];

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.name &&
          formData.sex &&
          formData.birthday &&
          formData.civilStatus &&
          formData.address &&
          formData.occupation &&
          formData.contactNumber &&
          formData.email
        );
      case 2:
        return selectedServices.length > 0 || formData.otherSkills;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 3 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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
      className: "top-4/10 right-3/4 w-9 h-9",
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
      className: "bottom-1/6 right-2/4 w-10 h-10",
      colors: "from-[#2A61AC]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
  ];

  return (
    <Shell>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden mt-10">
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
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-4 mt-10">
                  <Sparkles className="h-6 w-6 text-[#F3954A]" />
                  <span className="text-[#F3954A] font-semibold uppercase tracking-wide text-sm">
                    Our Events
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Community Events
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Engaging communities through action, learning, and care. Join
                  us in making a difference.
                </p>
              </motion.div>

              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center gap-4 mb-8"
              >
                {(["upcoming", "past"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${selectedTab === tab
                      ? "bg-[#F3954A] text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
                  </button>
                ))}
              </motion.div>

              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto -mb-10"
              >
                <div className="relative flex-1 w-full md:w-auto border-2 border-black rounded-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full text-black"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border-2 border-black rounded-full text-black bg-transparent transition-all"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Events Content - Single Section that changes based on tab */}
        <section className="py-16 bg-white" id="upcoming">
          <div className="container mx-auto px-4 max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h2 className="py-10 text-2xl md:text-2xl lg:text-8xl font-black bg-gradient-to-r from-orange-500 via-violet-500 to-blue-600 bg-clip-text text-transparent">
                    {selectedTab === "upcoming"
                      ? "Upcoming Events"
                      : "Past Events"}
                  </h2>
                  <p className="text-lg text-gray-600 mt-5">
                    {selectedTab === "upcoming"
                      ? "Join us in our upcoming community initiatives"
                      : "Celebrating our community impact and achievements"}
                  </p>
                </div>
                <EventsGrid
                  events={filteredEvents}
                  onEventClick={(event) => {
                    setSelectedEvent(event);
                    setShowModal(true);
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Enhanced Step-by-Step Modal */}
        <AnimatePresence>
          {showModal && selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => resetModal()}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[100vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => resetModal()}
                  className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 shadow-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Modal Header */}
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedEvent.image || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${selectedEvent.color}20` }}
                      >
                        <div style={{ color: selectedEvent.color }}>
                          {selectedEvent.icon}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        {selectedEvent.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold">
                      {selectedEvent.title}
                    </h2>
                  </div>
                </div>

                {/* Step Progress Indicator */}
                <div className="px-4 sm:px-8 py-6 border-b bg-gray-50">
                  {/* Desktop: Show full progress */}
                  <div className="hidden sm:flex items-center justify-between max-w-2xl mx-auto">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep > step.id
                              ? "bg-green-500 text-white"
                              : currentStep === step.id
                                ? "bg-[#F3954A] text-white"
                                : "bg-gray-200 text-gray-500"
                              }`}
                          >
                            {currentStep > step.id ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              step.icon
                            )}
                          </div>
                          <div className="mt-2 text-center">
                            <div
                              className={`text-sm font-semibold ${currentStep >= step.id ? "text-gray-900" : "text-gray-500"
                                }`}
                            >
                              {step.title}
                            </div>
                            <div className="text-xs text-gray-500">{step.description}</div>
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`w-16 h-1 mx-4 transition-all duration-300 ${currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                              }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile: Show only current step */}
                  <div className="flex sm:hidden flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${"bg-[#F3954A] text-white"
                        }`}
                    >
                      {steps.find((s) => s.id === currentStep)?.icon}
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-semibold text-gray-900">
                        {steps.find((s) => s.id === currentStep)?.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {steps.find((s) => s.id === currentStep)?.description}
                      </div>
                    </div>
                  </div>
                </div>



                {/* Step Content */}
                <div className="p-8 overflow-y-auto max-h-[50vh]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Step 1: Personal Information */}
                      {currentStep === 1 && (
                        <div className="space-y-6">
                          <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              Personal Information
                            </h3>
                            <p className="text-gray-600">
                              Please provide your basic information to register
                              as a volunteer
                            </p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                              </label>
                              <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                  handleInputChange("name", e.target.value)
                                }
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3954A] focus:border-transparent"
                                placeholder="Enter your full name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sex *
                              </label>
                              <select
                                required
                                value={formData.sex}
                                onChange={(e) =>
                                  handleInputChange("sex", e.target.value)
                                }
                                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3954A] focus:border-transparent"
                              >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                              </label>
                              <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                  handleInputChange("email", e.target.value)
                                }
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3954A] focus:border-transparent"
                                placeholder="you@example.com"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Number *
                              </label>
                              <input
                                required
                                type="tel"
                                value={formData.contactNumber}
                                onChange={(e) =>
                                  handleInputChange(
                                    "contactNumber",
                                    e.target.value
                                  )
                                }
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3954A] focus:border-transparent"
                                placeholder="+63 XXX XXX XXXX"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Birthday *
                              </label>
                              <input
                                required
                                type="date"
                                value={formData.birthday}
                                onChange={(e) =>
                                  handleInputChange("birthday", e.target.value)
                                }
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3954A] focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Civil Status *
                              </label>
                              <select
                                required
                                value={formData.civilStatus}
                                onChange={(e) =>
                                  handleInputChange(
                                    "civilStatus",
                                    e.target.value
                                  )
                                }
                                className="w-full  text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3954A] focus:border-transparent"
                              >
                                <option value="">Select</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address *
                              </label>
                              <textarea
                                required
                                rows={3}
                                value={formData.address}
                                onChange={(e) =>
                                  handleInputChange("address", e.target.value)
                                }
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3954A] focus:border-transparent resize-none"
                                placeholder="Enter your complete address"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Occupation *
                              </label>
                              <input
                                required
                                type="text"
                                value={formData.occupation}
                                onChange={(e) =>
                                  handleInputChange(
                                    "occupation",
                                    e.target.value
                                  )
                                }
                                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3954A] focus:border-transparent"
                                placeholder="Enter your occupation"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Skills & Services */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              Skills & Services
                            </h3>
                            <p className="text-gray-600">
                              Select the services you can provide as a volunteer
                            </p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 max-h-80 overflow-y-auto p-4 border rounded-lg">
                            {services.map((service) => (
                              <label
                                key={service}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedServices.includes(service)}
                                  onChange={() => handleServiceToggle(service)}
                                  className="w-5 h-5 text-[#F3954A] border-gray-300 rounded focus:ring-[#F3954A]"
                                />
                                <span className="text-sm text-gray-700">
                                  {service}
                                </span>
                              </label>
                            ))}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Other skills and interests:
                            </label>
                            <textarea
                              rows={3}
                              value={formData.otherSkills}
                              onChange={(e) =>
                                handleInputChange("otherSkills", e.target.value)
                              }
                              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F3954A] focus:border-transparent resize-none"
                              placeholder="Please specify any other skills or interests..."
                            />
                          </div>
                          {selectedServices.length > 0 && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-blue-900 mb-2">
                                Selected Services:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedServices.map((service) => (
                                  <span
                                    key={service}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 3: Agreement & Submit */}
                      {currentStep === 3 && (
                        <div className="space-y-6">
                          <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              Review & Submit
                            </h3>
                            <p className="text-gray-600">
                              Please review your information and agree to the
                              terms
                            </p>
                          </div>

                          {/* Event Details Summary */}
                          <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h4 className="font-semibold text-gray-900 mb-4">
                              Event Details
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4 text-[#F3954A]" />
                                {new Date(
                                  selectedEvent.date
                                ).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-[#F3954A]" />
                                {selectedEvent.location}
                              </div>
                            </div>
                          </div>

                          {/* Registration Summary */}
                          <div className="bg-blue-50 rounded-lg p-6 mb-6">
                            <h4 className="font-semibold text-blue-900 mb-4">
                              Your Registration Summary
                            </h4>
                            <div className="space-y-2 text-sm text-black">
                              <p>
                                <strong>Name:</strong> {formData.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {formData.email}
                              </p>
                              <p>
                                <strong>Contact:</strong>{" "}
                                {formData.contactNumber}
                              </p>
                              {selectedServices.length > 0 && (
                                <div>
                                  <strong>Selected Services:</strong>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {selectedServices.map((service) => (
                                      <span
                                        key={service}
                                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                      >
                                        {service}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {formData.otherSkills && (
                                <p>
                                  <strong>Other Skills:</strong>{" "}
                                  {formData.otherSkills}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Agreement */}
                          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                required
                                type="checkbox"
                                className="w-5 h-5 text-[#F3954A] border-gray-300 rounded focus:ring-[#F3954A] mt-1"
                              />
                              <span className="text-sm text-gray-700 leading-relaxed">
                                As a volunteer, I agree to abide by the rules
                                and policies of the Foundation. I understand
                                that I am volunteering at my own risk and assume
                                all the responsibilities and accountability in
                                the performance of my duties and functions as
                                volunteer.
                              </span>
                            </label>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  {/* Navigation Buttons */}
                  <div className="px-4 py-4 bg-gray-50 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all w-full sm:w-auto ${currentStep === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="text-center sm:text-sm text-gray-500">
                      Step {currentStep} of {steps.length}
                    </div>

                    {currentStep < 3 ? (
                      <button
                        onClick={nextStep}
                        disabled={!isStepValid(currentStep)}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all w-full sm:w-auto ${isStepValid(currentStep)
                          ? "bg-[#F3954A] text-white hover:bg-[#F3954A]/90 shadow-lg"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          alert(
                            "Thank you for registering! We'll contact you soon."
                          );
                          resetModal();
                        }}
                        className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all shadow-lg w-full sm:w-auto"
                      >
                        Submit Registration
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </Shell>
  );
}

// Events Grid Component
function EventsGrid({
  events,
  onEventClick,
}: {
  events: any[];
  onEventClick: (event: any) => void;
}) {
  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-400 mb-2">
          No events found
        </h3>
        <p className="text-gray-500">Check back later for more events!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, index) => (
        <motion.div
          key={event.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="group cursor-pointer"
          onClick={() => onEventClick(event)}
        >
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full text-white">
                  {event.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F3954A] transition-colors">
                {event.title}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-[#F3954A]" />
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#F3954A]" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-[#F3954A]" />
                  {event.attendees}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {event.description}
              </p>
              <button className="w-full py-3 bg-[#F3954A] hover:bg-[#F3954A]/90 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
