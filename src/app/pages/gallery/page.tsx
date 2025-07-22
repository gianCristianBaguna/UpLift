"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Eye, Filter } from "lucide-react"
import Shell from "@/components/navbar/shell"

interface GalleryItem {
  cover: string
  title: string
  description: string
  images: string[]
  category: string[]
}

interface CategoryItem {
  title: string
  description: string
  image: string
  projects: string[]
}

const fallbackGallery: GalleryItem[] = [
  {
    title: "CR Donation - District Office",
    cover: "/gallery/gallery1.png",
    description: "New comfort room donated to La Castellana I District Office.",
    images: ["/gallery/gallery1.png", "/gallery/gallery2.png", "/gallery/gallery3.png"],
    category: ["Infrastructure", "Housing Assistance"],
  },
  {
    title: "VALUES Literacy Drive",
    cover: "/gallery/gallery4.png",
    description: "Books and storytelling activities in rural schools.",
    images: ["/gallery/gallery4.png", "/gallery/gallery5.png", "/gallery/gallery6.png"],
    category: ["Education"],
  },
  {
    title: "Back-to-School Kits",
    cover: "/gallery/gallery7.png",
    description: "Distribution of 100+ school supply kits.",
    images: ["/gallery/gallery7.png", "/gallery/gallery8.png", "/gallery/gallery9.png"],
    category: ["Educational Assistance", "School Outreach"],
  },
  {
    title: "Feeding for Evacuees",
    cover: "/gallery/feeding.jpg",
    description: "Nutritional meals served to disaster-affected families.",
    images: ["/gallery/feeding.jpg", "/gallery/gallery2.png"],
    category: ["Feeding Program"],
  },
  {
    title: "Medical Outreach",
    cover: "/gallery/medical.jpg",
    description: "Free health consultations in underserved areas.",
    images: ["/gallery/medical.jpg"],
    category: ["Medical Mission"],
  },
  {
    title: "Typhoon Relief Goods",
    cover: "/gallery/relief.jpg",
    description: "Emergency aid distributed to typhoon victims.",
    images: ["/gallery/gallery3.png"],
    category: ["Relief Operations", "Feeding Program"],
  },
  {
    title: "Housing Support - 80 Families",
    cover: "/gallery/gallery6.png",
    description: "Post-disaster materials for family homes.",
    images: ["/gallery/housing.jpg"],
    category: ["Housing Assistance", "Infrastructure"],
  },
  {
    title: "Tipolo Elementary Outreach",
    cover: "/gallery/gallery2.png",
    description: "School supplies and support to rural schools.",
    images: ["/gallery/outreach.jpg"],
    category: ["School Outreach"],
  },
  {
    title: "African Parish Aid",
    cover: "/gallery/gallery3.png",
    description: "International donation support to Africa.",
    images: ["/gallery/international.jpg"],
    category: ["International Outreach"],
  },
]

const categoriesData: CategoryItem[] = [
  {
    title: "Infrastructure",
    description: "Comfort Room Donations & Facilities",
    image: "",
    projects: [],
  },
  {
    title: "Education",
    description: "VALUES & Educational Programs",
    image: "",
    projects: [],
  },
  {
    title: "Feeding Program",
    description: "Nutrition & Food Security",
    image: "",
    projects: [],
  },
  {
    title: "Educational Assistance",
    description: "Scholarships & School Supplies",
    image: "",
    projects: [],
  },
  {
    title: "School Outreach",
    description: "Rural School Programs",
    image: "",
    projects: [],
  },
  {
    title: "Relief Operations",
    description: "Disaster Response & Emergency Aid",
    image: "",
    projects: [],
  },
  {
    title: "Housing Assistance",
    description: "Shelter & Construction Materials",
    image: "",
    projects: [],
  },
  {
    title: "Medical Mission",
    description: "Healthcare & Medical Services",
    image: "",
    projects: [],
  },
  {
    title: "International Outreach",
    description: "Global Community Support",
    image: "",
    projects: [],
  },
]

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

  const galleryData = fallbackGallery
  const filteredGallery = selectedCategory
    ? galleryData.filter((item) => item.category.includes(selectedCategory))
    : galleryData

  const openModal = (index: number) => {
    setModalIndex(index)
    setCurrentPreviewIndex(0)
  }

  const closeModal = () => setModalIndex(null)

  const prevImage = () => {
    if (modalIndex === null) return
    const total = filteredGallery[modalIndex].images.length
    setCurrentPreviewIndex((prev) => (prev - 1 + total) % total)
  }

  const nextImage = () => {
    if (modalIndex === null) return
    const total = filteredGallery[modalIndex].images.length
    setCurrentPreviewIndex((prev) => (prev + 1) % total)
  }

  return (
    <Shell>
      <section className="relative w-full min-h-screen px-4 py-20 space-y-16 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F3954A]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2A61AC]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F3954A]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(243,149,74,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(243,149,74,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          {/* Floating particles */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#F3954A]/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-[#2A61AC]/30 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-[#F3954A]/40 rounded-full animate-bounce delay-1000"></div>
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
              <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#F3954A] via-[#ff7b3d] to-white bg-clip-text text-transparent mb-4">
                Gallery
              </h1>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-[#F3954A]/10 rounded-full blur-2xl"></div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Witness the transformative power of community action through our visual journey of impact and hope
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] mx-auto rounded-full"></div>
          </motion.div>

          {/* Enhanced Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            {/* Mobile Filter Toggle */}
            <div className="block lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-3 p-4 bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 hover:border-[#F3954A]/30 transition-all duration-300"
              >
                <Filter className="w-5 h-5 text-[#F3954A]" />
                <span className="font-medium">
                  {selectedCategory ? `Filter: ${selectedCategory}` : "All Categories"}
                </span>
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <button
                      onClick={() => {
                        setSelectedCategory(null)
                        setShowFilters(false)
                      }}
                      className={`w-full p-3 rounded-xl text-left transition-all duration-300 ${
                        selectedCategory === null
                          ? "bg-[#F3954A]/20 border border-[#F3954A]/50 text-[#F3954A]"
                          : "bg-gray-800/40 border border-gray-700/50 text-white hover:border-[#F3954A]/30"
                      }`}
                    >
                      All Categories
                    </button>
                    {categoriesData.map((cat) => (
                      <button
                        key={cat.title}
                        onClick={() => {
                          setSelectedCategory(cat.title)
                          setShowFilters(false)
                        }}
                        className={`w-full p-3 rounded-xl text-left transition-all duration-300 ${
                          selectedCategory === cat.title
                            ? "bg-[#2A61AC]/20 border border-[#2A61AC]/50 text-[#2A61AC]"
                            : "bg-gray-800/40 border border-gray-700/50 text-white hover:border-[#2A61AC]/30"
                        }`}
                      >
                        <div className="font-medium">{cat.title}</div>
                        <div className="text-sm text-gray-400">{cat.description}</div>
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
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-xl border-2 ${
                  selectedCategory === null
                    ? "bg-[#F3954A]/20 border-[#F3954A] text-[#F3954A] shadow-lg shadow-[#F3954A]/20"
                    : "bg-gray-800/40 border-gray-700/50 text-white hover:border-[#F3954A]/50 hover:bg-[#F3954A]/10"
                }`}
              >
                All Categories
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
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-xl border-2 ${
                    selectedCategory === cat.title
                      ? "bg-[#2A61AC]/20 border-[#2A61AC] text-[#2A61AC] shadow-lg shadow-[#2A61AC]/20"
                      : "bg-gray-800/40 border-gray-700/50 text-white hover:border-[#2A61AC]/50 hover:bg-[#2A61AC]/10"
                  }`}
                  title={cat.description}
                >
                  {cat.title}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => (
                <motion.div
                  key={item.title}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  className="group cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:border-[#F3954A]/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#F3954A]/10">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.cover || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F3954A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <Eye className="w-8 h-8 text-white mx-auto" />
                          <span className="text-white font-medium">View Gallery</span>
                        </div>
                      </div>

                      {/* Image Count Badge */}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white font-medium">
                        {item.images.length} {item.images.length === 1 ? "photo" : "photos"}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#F3954A] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>

                      {/* Category Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.category.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="px-3 py-1 bg-[#2A61AC]/20 text-[#2A61AC] text-xs font-medium rounded-full border border-[#2A61AC]/30"
                          >
                            {cat}
                          </span>
                        ))}
                        {item.category.length > 2 && (
                          <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs font-medium rounded-full">
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
              <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects found</h3>
              <p className="text-gray-500">Try selecting a different category or view all projects.</p>
            </motion.div>
          )}
        </div>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {modalIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
              onClick={closeModal}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative rounded-3xl max-w-6xl w-full bg-gray-900/95 backdrop-blur-xl shadow-2xl text-white border border-gray-700/50"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-6 right-6 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 hover:scale-110"
                  onClick={closeModal}
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-8">
                  {/* Modal Header */}
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-[#F3954A] mb-2">{filteredGallery[modalIndex].title}</h2>
                    <p className="text-gray-300">{filteredGallery[modalIndex].description}</p>
                  </div>

                  {/* Main Image */}
                  <div className="relative w-full h-[500px] mb-6 rounded-2xl overflow-hidden bg-gray-800/50">
                    <Image
                      src={filteredGallery[modalIndex].images[currentPreviewIndex] || "/placeholder.svg"}
                      alt={`Preview ${currentPreviewIndex + 1}`}
                      fill
                      className="object-contain"
                    />

                    {/* Navigation Arrows */}
                    {filteredGallery[modalIndex].images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                      {currentPreviewIndex + 1} of {filteredGallery[modalIndex].images.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {filteredGallery[modalIndex].images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {filteredGallery[modalIndex].images.map((img, idx) => (
                        <button
                          key={img}
                          onClick={() => setCurrentPreviewIndex(idx)}
                          className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                            currentPreviewIndex === idx
                              ? "border-[#F3954A] scale-110"
                              : "border-gray-600 hover:border-gray-400"
                          }`}
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Shell>
  )
}

export default GallerySection
