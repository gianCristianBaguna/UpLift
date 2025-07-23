"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Eye, Filter, Search, Loader2, AlertCircle, Sparkles } from "lucide-react"
import Shell from "@/components/navbar/shell"
import Footer from "@/components/navbar/footer"

interface GalleryItem {
  cover: string
  title: string
  description: string
  images: string[]
  category: string[]
  date?: string
  location?: string
}

interface CategoryItem {
  title: string
  description: string
  image: string
  projects: string[]
  count: number
}

const fallbackGallery: GalleryItem[] = [
  {
    title: "CR Donation - District Office",
    cover: "/gallery/gallery1.png",
    description: "New comfort room donated to La Castellana I District Office.",
    images: ["/gallery/gallery1.png", "/gallery/gallery2.png", "/gallery/gallery3.png"],
    category: ["Infrastructure", "Housing Assistance"],
    date: "2024-03-15",
    location: "La Castellana I District Office",
  },
  {
    title: "VALUES Literacy Drive",
    cover: "/gallery/gallery4.png",
    description: "Books and storytelling activities in rural schools.",
    images: ["/gallery/gallery4.png", "/gallery/gallery5.png", "/gallery/gallery6.png"],
    category: ["Education"],
    date: "2024-02-20",
    location: "Rural Schools",
  },
  {
    title: "Back-to-School Kits",
    cover: "/gallery/gallery7.png",
    description: "Distribution of 100+ school supply kits.",
    images: ["/gallery/gallery7.png", "/gallery/gallery8.png", "/gallery/gallery9.png"],
    category: ["Educational Assistance", "School Outreach"],
    date: "2024-08-10",
    location: "Various Schools",
  },
  {
    title: "Feeding for Evacuees",
    cover: "/gallery/feeding.jpg",
    description: "Nutritional meals served to disaster-affected families.",
    images: ["/gallery/feeding.jpg", "/gallery/gallery2.png"],
    category: ["Feeding Program"],
    date: "2024-01-15",
    location: "Evacuation Centers",
  },
  {
    title: "Medical Outreach",
    cover: "/gallery/medical.jpg",
    description: "Free health consultations in underserved areas.",
    images: ["/gallery/medical.jpg"],
    category: ["Medical Mission"],
    date: "2024-05-12",
    location: "Remote Communities",
  },
  {
    title: "Typhoon Relief Goods",
    cover: "/gallery/relief.jpg",
    description: "Emergency aid distributed to typhoon victims.",
    images: ["/gallery/relief.jpg", "/gallery/gallery3.png"],
    category: ["Relief Operations", "Feeding Program"],
    date: "2024-11-08",
    location: "Affected Areas",
  },
  {
    title: "Housing Support - 80 Families",
    cover: "/gallery/gallery6.png",
    description: "Post-disaster materials for family homes.",
    images: ["/gallery/housing.jpg", "/gallery/gallery6.png"],
    category: ["Housing Assistance", "Infrastructure"],
    date: "2024-04-22",
    location: "Disaster-Affected Communities",
  },
  {
    title: "Tipolo Elementary Outreach",
    cover: "/gallery/gallery2.png",
    description: "School supplies and support to rural schools.",
    images: ["/gallery/outreach.jpg", "/gallery/gallery2.png"],
    category: ["School Outreach"],
    date: "2024-09-05",
    location: "Tipolo Elementary School",
  },
  {
    title: "African Parish Aid",
    cover: "/gallery/gallery3.png",
    description: "International donation support to Africa.",
    images: ["/gallery/international.jpg", "/gallery/gallery3.png"],
    category: ["International Outreach"],
    date: "2024-06-18",
    location: "Africa",
  },
]

const getCategoriesData = (gallery: GalleryItem[]): CategoryItem[] => {
  const categoryMap = new Map<string, number>()

  gallery.forEach((item) => {
    item.category.forEach((cat) => {
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1)
    })
  })

  return [
    {
      title: "Infrastructure",
      description: "Comfort Room Donations & Facilities",
      image: "/gallery/gallery1.png",
      projects: [],
      count: categoryMap.get("Infrastructure") || 0,
    },
    {
      title: "Education",
      description: "VALUES & Educational Programs",
      image: "/gallery/gallery4.png",
      projects: [],
      count: categoryMap.get("Education") || 0,
    },
    {
      title: "Feeding Program",
      description: "Nutrition & Food Security",
      image: "/gallery/feeding.jpg",
      projects: [],
      count: categoryMap.get("Feeding Program") || 0,
    },
    {
      title: "Educational Assistance",
      description: "Scholarships & School Supplies",
      image: "/gallery/gallery7.png",
      projects: [],
      count: categoryMap.get("Educational Assistance") || 0,
    },
    {
      title: "School Outreach",
      description: "Rural School Programs",
      image: "/gallery/gallery2.png",
      projects: [],
      count: categoryMap.get("School Outreach") || 0,
    },
    {
      title: "Relief Operations",
      description: "Disaster Response & Emergency Aid",
      image: "/gallery/relief.jpg",
      projects: [],
      count: categoryMap.get("Relief Operations") || 0,
    },
    {
      title: "Housing Assistance",
      description: "Shelter & Construction Materials",
      image: "/gallery/housing.jpg",
      projects: [],
      count: categoryMap.get("Housing Assistance") || 0,
    },
    {
      title: "Medical Mission",
      description: "Healthcare & Medical Services",
      image: "/gallery/medical.jpg",
      projects: [],
      count: categoryMap.get("Medical Mission") || 0,
    },
    {
      title: "International Outreach",
      description: "Global Community Support",
      image: "/gallery/international.jpg",
      projects: [],
      count: categoryMap.get("International Outreach") || 0,
    },
  ]
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.3,
    },
  },
}

const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({})
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)

  const modalRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const galleryData = fallbackGallery
  const categoriesData = getCategoriesData(galleryData)

  // Enhanced filtering with search
  const filteredGallery = galleryData.filter((item) => {
    const matchesCategory = selectedCategory ? item.category.includes(selectedCategory) : true
    const matchesSearch = searchQuery
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    return matchesCategory && matchesSearch
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Image loading handlers
  const handleImageLoad = useCallback((src: string) => {
    setImageLoadingStates((prev) => ({ ...prev, [src]: false }))
  }, [])

  const handleImageError = useCallback((src: string) => {
    setImageLoadingStates((prev) => ({ ...prev, [src]: false }))
    setImageErrors((prev) => ({ ...prev, [src]: true }))
  }, [])

  const handleImageLoadStart = useCallback((src: string) => {
    setImageLoadingStates((prev) => ({ ...prev, [src]: true }))
  }, [])

  // Modal functions
  const openModal = useCallback((index: number) => {
    setModalIndex(index)
    setCurrentPreviewIndex(0)
    document.body.style.overflow = "hidden"
  }, [])

  const closeModal = useCallback(() => {
    setModalIndex(null)
    document.body.style.overflow = "unset"
  }, [])

  const prevImage = useCallback(() => {
    if (modalIndex === null) return
    const total = filteredGallery[modalIndex].images.length
    setCurrentPreviewIndex((prev) => (prev - 1 + total) % total)
  }, [modalIndex, filteredGallery])

  const nextImage = useCallback(() => {
    if (modalIndex === null) return
    const total = filteredGallery[modalIndex].images.length
    setCurrentPreviewIndex((prev) => (prev + 1) % total)
  }, [modalIndex, filteredGallery])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalIndex === null) return

      switch (e.key) {
        case "Escape":
          closeModal()
          break
        case "ArrowLeft":
          e.preventDefault()
          prevImage()
          break
        case "ArrowRight":
          e.preventDefault()
          nextImage()
          break
      }
    }

    if (modalIndex !== null) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [modalIndex, closeModal, prevImage, nextImage])

  // Focus management
  useEffect(() => {
    if (modalIndex !== null && modalRef.current) {
      modalRef.current.focus()
    }
  }, [modalIndex])

  // Search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (isLoading) {
    return (
      <Shell>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 text-[#F3954A] animate-spin mx-auto" />
            <p className="text-gray-700 text-lg">Loading gallery...</p>
          </div>
        </div>
      </Shell>
    )
  }

  return (
    <Shell>
      <section className="relative w-full min-h-screen px-4 py-20 space-y-16 bg-gradient-to-br from-blue-50 via-white to-orange-50 text-gray-900 overflow-hidden">
        {/* Light Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F3954A]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2A61AC]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F3954A]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(243,149,74,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(243,149,74,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#F3954A]/20 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-[#2A61AC]/20 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-[#F3954A]/30 rounded-full animate-bounce delay-1000"></div>
        </div>

        {/* Hero Section */}
        <div className="relative container mx-auto px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-16"
          >
            <div className="relative">
              <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#F3954A] via-[#ff7b3d] to-[#2A61AC] bg-clip-text text-transparent mb-4">
                Gallery
              </h1>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-[#F3954A]/5 rounded-full blur-2xl"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Witness the transformative power of community action through our visual journey of impact and hope
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] mx-auto rounded-full"></div>
          </motion.div>

          {/* Enhanced Search Bar - Prominent Position */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F3954A]/20 to-[#2A61AC]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center p-2">
                    <div className="flex items-center flex-1">
                      <div className="p-3 text-[#F3954A]">
                        <Search className="w-6 h-6" />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search projects, categories, locations... (Ctrl+K)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-2 py-3 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100/50 rounded-xl text-sm text-gray-500">
                      <span>Ctrl</span>
                      <span className="text-xs">+</span>
                      <span>K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            {/* Mobile Filter Toggle */}
            <div className="block lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-3 p-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200/50 hover:border-[#F3954A]/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-expanded={showFilters}
                aria-controls="mobile-filters"
              >
                <Filter className="w-5 h-5 text-[#F3954A]" />
                <span className="font-medium text-gray-700">
                  {selectedCategory ? `Filter: ${selectedCategory}` : "All Categories"}
                </span>
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    id="mobile-filters"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setSelectedCategory(null)
                        setShowFilters(false)
                      }}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                        selectedCategory === null
                          ? "bg-[#F3954A]/10 border border-[#F3954A]/30 text-[#F3954A] shadow-lg"
                          : "bg-white/60 border border-gray-200/50 text-gray-700 hover:border-[#F3954A]/30 hover:bg-[#F3954A]/5"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">All Categories</span>
                        <span className="text-sm text-gray-500">({galleryData.length})</span>
                      </div>
                    </button>
                    {categoriesData.map((cat) => (
                      <button
                        key={cat.title}
                        onClick={() => {
                          setSelectedCategory(cat.title)
                          setShowFilters(false)
                        }}
                        className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                          selectedCategory === cat.title
                            ? "bg-[#2A61AC]/10 border border-[#2A61AC]/30 text-[#2A61AC] shadow-lg"
                            : "bg-white/60 border border-gray-200/50 text-gray-700 hover:border-[#2A61AC]/30 hover:bg-[#2A61AC]/5"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{cat.title}</div>
                            <div className="text-sm text-gray-500">{cat.description}</div>
                          </div>
                          <span className="text-sm text-gray-500">({cat.count})</span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Filter Pills */}
            <div className="hidden lg:flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-xl border-2 shadow-lg hover:shadow-xl ${
                  selectedCategory === null
                    ? "bg-[#F3954A]/10 border-[#F3954A] text-[#F3954A] shadow-[#F3954A]/20"
                    : "bg-white/60 border-gray-200/50 text-gray-700 hover:border-[#F3954A]/50 hover:bg-[#F3954A]/5"
                }`}
              >
                All Categories ({galleryData.length})
              </motion.button>
              {categoriesData.map((cat, index) => (
                <motion.button
                  key={cat.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(cat.title)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-xl border-2 shadow-lg hover:shadow-xl ${
                    selectedCategory === cat.title
                      ? "bg-[#2A61AC]/10 border-[#2A61AC] text-[#2A61AC] shadow-[#2A61AC]/20"
                      : "bg-white/60 border-gray-200/50 text-gray-700 hover:border-[#2A61AC]/50 hover:bg-[#2A61AC]/5"
                  }`}
                  title={cat.description}
                >
                  {cat.title} ({cat.count})
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results Summary */}
          {(selectedCategory || searchQuery) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-lg">
                <Sparkles className="w-4 h-4 text-[#F3954A]" />
                <p className="text-gray-700 font-medium">
                  Showing {filteredGallery.length} project{filteredGallery.length !== 1 ? "s" : ""}
                  {selectedCategory && ` in "${selectedCategory}"`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
            </motion.div>
          )}

          {/* Enhanced Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => (
                <motion.div
                  key={`${item.title}-${selectedCategory}-${searchQuery}`}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  className="group cursor-pointer"
                  onClick={() => openModal(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      openModal(index)
                    }
                  }}
                  aria-label={`View ${item.title} gallery`}
                >
                  <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200/50 hover:border-[#F3954A]/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#F3954A]/10">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden bg-gray-100/50">
                      {imageLoadingStates[item.cover] && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-[#F3954A] animate-spin" />
                        </div>
                      )}

                      {imageErrors[item.cover] ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
                          <div className="text-center space-y-2">
                            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto" />
                            <p className="text-gray-500 text-sm">Image unavailable</p>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={item.cover || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          onLoadingComplete={() => handleImageLoad(item.cover)}
                          onError={() => handleImageError(item.cover)}
                          onLoadStart={() => handleImageLoadStart(item.cover)}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 6}
                        />
                      )}

                      {/* Light Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F3954A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <Eye className="w-8 h-8 text-[#F3954A] mx-auto" />
                          <span className="text-[#F3954A] font-medium">View Gallery</span>
                        </div>
                      </div>

                      {/* Image Count Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-700 font-medium shadow-lg">
                        {item.images.length} {item.images.length === 1 ? "photo" : "photos"}
                      </div>

                      {/* Date Badge */}
                      {item.date && (
                        <div className="absolute top-4 left-4 bg-[#F3954A]/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white font-medium shadow-lg">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#F3954A] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.description}</p>

                      {/* Location */}
                      {item.location && <p className="text-gray-500 text-xs">📍 {item.location}</p>}

                      {/* Category Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.category.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="px-3 py-1 bg-[#2A61AC]/10 text-[#2A61AC] text-xs font-medium rounded-full border border-[#2A61AC]/20"
                          >
                            {cat}
                          </span>
                        ))}
                        {item.category.length > 2 && (
                          <span className="px-3 py-1 bg-gray-200/50 text-gray-600 text-xs font-medium rounded-full">
                            +{item.category.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredGallery.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-500 mb-2">No projects found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery
                  ? `No projects match "${searchQuery}"`
                  : selectedCategory
                    ? `No projects found in "${selectedCategory}"`
                    : "No projects available"}
              </p>
              <div className="flex gap-4 justify-center">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-6 py-3 bg-[#F3954A]/10 text-[#F3954A] rounded-full hover:bg-[#F3954A]/20 transition-colors border border-[#F3954A]/20"
                  >
                    Clear Search
                  </button>
                )}
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-6 py-3 bg-[#2A61AC]/10 text-[#2A61AC] rounded-full hover:bg-[#2A61AC]/20 transition-colors border border-[#2A61AC]/20"
                  >
                    View All Categories
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Modal - Light Theme */}
        <AnimatePresence>
          {modalIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
              onClick={closeModal}
            >
              <motion.div
                ref={modalRef}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative rounded-3xl max-w-6xl w-full max-h-[95vh] bg-white/95 backdrop-blur-xl shadow-2xl text-gray-900 border border-gray-200/50 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                {/* Close Button */}
                <button
                  className="absolute top-6 right-6 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200/50"
                  onClick={closeModal}
                  aria-label="Close gallery"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>

                <div className="p-4 md:p-8">
                  {/* Modal Header */}
                  <div className="mb-6">
                    <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-[#F3954A] mb-2">
                      {filteredGallery[modalIndex].title}
                    </h2>
                    <p id="modal-description" className="text-gray-600 mb-2">
                      {filteredGallery[modalIndex].description}
                    </p>
                    {filteredGallery[modalIndex].location && (
                      <p className="text-gray-500 text-sm">📍 {filteredGallery[modalIndex].location}</p>
                    )}
                    {filteredGallery[modalIndex].date && (
                      <p className="text-gray-500 text-sm">
                        📅{" "}
                        {new Date(filteredGallery[modalIndex].date!).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>

                  {/* Main Image */}
                  <div className="relative w-full h-[300px] md:h-[500px] mb-6 rounded-2xl overflow-hidden bg-gray-100/50">
                    {imageLoadingStates[filteredGallery[modalIndex].images[currentPreviewIndex]] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-12 h-12 text-[#F3954A] animate-spin" />
                      </div>
                    )}

                    <Image
                      src={filteredGallery[modalIndex].images[currentPreviewIndex] || "/placeholder.svg"}
                      alt={`${filteredGallery[modalIndex].title} - Image ${currentPreviewIndex + 1}`}
                      fill
                      className="object-contain"
                      onLoadingComplete={() => handleImageLoad(filteredGallery[modalIndex].images[currentPreviewIndex])}
                      onError={() => handleImageError(filteredGallery[modalIndex].images[currentPreviewIndex])}
                      onLoadStart={() => handleImageLoadStart(filteredGallery[modalIndex].images[currentPreviewIndex])}
                      sizes="(max-width: 768px) 100vw, 90vw"
                      priority
                    />

                    {/* Navigation Arrows */}
                    {filteredGallery[modalIndex].images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200/50"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200/50"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-lg border border-gray-200/50">
                      {currentPreviewIndex + 1} of {filteredGallery[modalIndex].images.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {filteredGallery[modalIndex].images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {filteredGallery[modalIndex].images.map((img, idx) => (
                        <button
                          key={`${img}-${idx}`}
                          onClick={() => setCurrentPreviewIndex(idx)}
                          className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                            currentPreviewIndex === idx
                              ? "border-[#F3954A] scale-110 shadow-lg"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          aria-label={`View image ${idx + 1}`}
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Category Tags in Modal */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {filteredGallery[modalIndex].category.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 bg-[#2A61AC]/10 text-[#2A61AC] text-sm font-medium rounded-full border border-[#2A61AC]/20"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </Shell>
  )
}

export default GallerySection
