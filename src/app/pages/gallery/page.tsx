"use client"
import type React from "react"
import { useState, useCallback, useRef, useMemo, memo, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Search,
  Heart,
  Star,
  Camera,
  MapPin,
  Calendar,
  Zap,
  Share2,
  Download,
  Sparkles,
} from "lucide-react"
import Shell from "@/components/navbar/shell"
import Footer from "@/components/navbar/footer"
import CreativeBackground from "@/components/creativeBackground"
import { useDebounce as useDebounceHook } from "@/components/hooks/useDebounce"

interface GalleryItem {
  id: string // Add stable ID
  cover: string
  title: string
  description: string
  images: string[]
  category: string[]
  date?: string
  location?: string
  likes?: number
  featured?: boolean
}

interface CategoryItem {
  title: string
  description: string
  count: number
  color: string
  icon: React.ReactNode
}

// Pre-compute stable data with IDs
const fallbackGallery: GalleryItem[] = [
  {
    id: "cr-donation-district",
    title: "CR Donation - District Office",
    cover: "/gallery/gallery1.png",
    description: "New comfort room donated to La Castellana I District Office with modern facilities.",
    images: ["/gallery/gallery1.png", "/gallery/gallery2.png", "/gallery/gallery3.png"],
    category: ["Infrastructure", "Housing Assistance"],
    date: "2024-03-15",
    location: "La Castellana I District Office",
    likes: 124,
    featured: true,
  },
  {
    id: "values-literacy-drive",
    title: "VALUES Literacy Drive",
    cover: "/gallery/gallery4.png",
    description: "Comprehensive books and storytelling activities bringing education to rural schools.",
    images: ["/gallery/gallery4.png", "/gallery/gallery5.png", "/gallery/gallery6.png"],
    category: ["Education"],
    date: "2024-02-20",
    location: "Rural Schools Network",
    likes: 89,
  },
  {
    id: "back-to-school-kits",
    title: "Back-to-School Kits",
    cover: "/gallery/gallery7.png",
    description: "Distribution of 100+ comprehensive school supply kits to underprivileged students.",
    images: ["/gallery/gallery7.png", "/gallery/gallery8.png", "/gallery/gallery9.png"],
    category: ["Educational Assistance", "School Outreach"],
    date: "2024-08-10",
    location: "Various Schools",
    likes: 156,
    featured: true,
  },
  {
    id: "feeding-evacuees",
    title: "Feeding for Evacuees",
    cover: "/gallery/feeding.jpg",
    description: "Nutritional meals served to disaster-affected families during critical times.",
    images: ["/gallery/feeding.jpg", "/gallery/gallery2.png"],
    category: ["Feeding Program"],
    date: "2024-01-15",
    location: "Evacuation Centers",
    likes: 203,
  },
  {
    id: "medical-outreach",
    title: "Medical Outreach",
    cover: "/gallery/medical.jpg",
    description: "Free health consultations and medical services in underserved communities.",
    images: ["/gallery/medical.jpg"],
    category: ["Medical Mission"],
    date: "2024-05-12",
    location: "Remote Communities",
    likes: 78,
  },
  {
    id: "typhoon-relief",
    title: "Typhoon Relief Goods",
    cover: "/gallery/relief.jpg",
    description: "Emergency aid and essential supplies distributed to typhoon-affected families.",
    images: ["/gallery/relief.jpg", "/gallery/gallery3.png"],
    category: ["Relief Operations", "Feeding Program"],
    date: "2024-11-08",
    location: "Affected Areas",
    likes: 267,
    featured: true,
  },
  {
    id: "housing-support",
    title: "Housing Support - 80 Families",
    cover: "/gallery/gallery6.png",
    description: "Post-disaster materials for family homes.",
    images: ["/gallery/housing.jpg", "/gallery/gallery6.png"],
    category: ["Housing Assistance", "Infrastructure"],
    date: "2024-04-22",
    location: "Disaster-Affected Communities",
    likes: 145,
  },
  {
    id: "tipolo-elementary",
    title: "Tipolo Elementary Outreach",
    cover: "/gallery/gallery2.png",
    description: "School supplies and support to rural schools.",
    images: ["/gallery/outreach.jpg", "/gallery/gallery2.png"],
    category: ["School Outreach"],
    date: "2024-09-05",
    location: "Tipolo Elementary School",
    likes: 92,
  },
  {
    id: "african-parish",
    title: "African Parish Aid",
    cover: "/gallery/gallery3.png",
    description: "International donation support to Africa.",
    images: ["/gallery/international.jpg", "/gallery/gallery3.png"],
    category: ["International Outreach"],
    date: "2024-06-18",
    location: "Africa",
    likes: 178,
  },
]

// Pre-compute category configuration - MOVED OUTSIDE COMPONENT
const CATEGORY_CONFIG = {
  Infrastructure: { color: "bg-blue-500", icon: <Zap className="w-3 h-3 sm:w-4 sm:h-4" /> },
  Education: { color: "bg-purple-500", icon: <Star className="w-3 h-3 sm:w-4 sm:h-4" /> },
  "Feeding Program": { color: "bg-green-500", icon: <Heart className="w-3 h-3 sm:w-4 sm:h-4" /> },
  "Educational Assistance": { color: "bg-indigo-500", icon: <Camera className="w-3 h-3 sm:w-4 sm:h-4" /> },
  "School Outreach": { color: "bg-orange-500", icon: <Camera className="w-3 h-3 sm:w-4 sm:h-4" /> },
  "Relief Operations": { color: "bg-red-500", icon: <Share2 className="w-3 h-3 sm:w-4 sm:h-4" /> },
  "Housing Assistance": { color: "bg-teal-500", icon: <Download className="w-3 h-3 sm:w-4 sm:h-4" /> },
  "Medical Mission": { color: "bg-rose-500", icon: <Heart className="w-3 h-3 sm:w-4 sm:h-4" /> },
  "International Outreach": { color: "bg-cyan-500", icon: <Share2 className="w-3 h-3 sm:w-4 sm:h-4" /> },
} as const

// Optimized category data computation - MOVED OUTSIDE COMPONENT
const getCategoriesData = (gallery: GalleryItem[]): CategoryItem[] => {
  const categoryMap = new Map<string, number>()

  // Single loop through gallery items
  for (const item of gallery) {
    for (const cat of item.category) {
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1)
    }
  }

  return Object.entries(CATEGORY_CONFIG).map(([title, config]) => ({
    title,
    description: `${title} Programs`,
    count: categoryMap.get(title) || 0,
    color: config.color,
    icon: config.icon,
  }))
}

// Pre-compute category lookup map - MOVED OUTSIDE COMPONENT
const createCategoryLookupMap = (categoriesData: CategoryItem[]) => {
  const map = new Map<string, CategoryItem>()
  for (const cat of categoriesData) {
    map.set(cat.title, cat)
  }
  return map
}

// Optimized date formatting - MOVED OUTSIDE COMPONENT
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

const formatFullDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Ultra-optimized Gallery Card - MOVED OUTSIDE MAIN COMPONENT
const GalleryCard = memo(
  ({
    item,
    index,
    onOpenModal,
    onToggleLike,
    isLiked,
    categoryLookupMap,
  }: {
    item: GalleryItem
    index: number
    onOpenModal: (index: number) => void
    onToggleLike: (itemId: string, e: React.MouseEvent) => void
    isLiked: boolean
    categoryLookupMap: Map<string, CategoryItem>
  }) => {
    // Pre-compute expensive operations
    const formattedDate = useMemo(() => (item.date ? formatDate(item.date) : null), [item.date])
    const photoCountText = useMemo(
      () => `${item.images.length} ${item.images.length === 1 ? "photo" : "photos"}`,
      [item.images.length],
    )

    // Pre-compute category tags to avoid repeated lookups
    const categoryTags = useMemo(() => {
      const visibleCategories = item.category.slice(0, 2)
      const remainingCount = item.category.length - 2

      return {
        visible: visibleCategories.map((cat) => ({
          name: cat,
          color: categoryLookupMap.get(cat)?.color || "bg-gray-500",
        })),
        remaining: remainingCount > 0 ? remainingCount : null,
      }
    }, [item.category, categoryLookupMap])

    // Stable click handlers
    const handleCardClick = useCallback(() => onOpenModal(index), [onOpenModal, index])
    const handleLikeClick = useCallback(
      (e: React.MouseEvent) => {
        onToggleLike(item.id, e)
      },
      [onToggleLike, item.id],
    )

    return (
      <div
        className="group cursor-pointer transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        onClick={handleCardClick}
      >
        <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-300 transition-colors duration-200 shadow-md hover:shadow-xl">
          {/* Featured Badge - Only render if featured */}
          {item.featured && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="hidden xs:inline">Featured</span>
            </div>
          )}

          {/* Image Container */}
          <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-gray-100">
            <Image
              src={item.cover || "/placeholder.svg?height=200&width=300"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index < 6}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Hover Overlay - Hidden on mobile for better touch experience */}
            <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center hidden sm:flex">
              <div className="text-center">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mx-auto mb-1" />
                <span className="text-orange-500 font-medium text-xs sm:text-sm">View Gallery</span>
              </div>
            </div>

            {/* Photo count badge */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs text-gray-700 font-medium">
              {photoCountText}
            </div>

            {/* Date badge - Only render if date exists */}
            {formattedDate && (
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-orange-500/90 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs text-white font-medium flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="hidden xs:inline">{formattedDate}</span>
              </div>
            )}

            {/* Like Button */}
            <button
              onClick={handleLikeClick}
              className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/90 p-1 sm:p-1.5 rounded-full shadow-md hover:bg-white transition-all hover:scale-110 active:scale-95"
            >
              <Heart
                className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${
                  isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-1">
              {item.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">{item.description}</p>

            {/* Location and Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              {item.location && (
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                  <span className="truncate text-xs">{item.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="text-xs">{item.likes || 0}</span>
              </div>
            </div>

            {/* Category Tags - Pre-computed */}
            <div className="flex flex-wrap gap-1 pt-1">
              {categoryTags.visible.map((cat) => (
                <span
                  key={cat.name}
                  className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-medium rounded-full text-white ${cat.color}`}
                >
                  {cat.name}
                </span>
              ))}
              {categoryTags.remaining && (
                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                  +{categoryTags.remaining}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

GalleryCard.displayName = "GalleryCard"

const UltraOptimizedGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())
  const modalRef = useRef<HTMLDivElement>(null)
  const keydownCleanupRef = useRef<(() => void) | null>(null)

  // Pre-compute static data - ONLY COMPUTED ONCE
  const galleryData = useMemo(() => fallbackGallery, [])
  const categoriesData = useMemo(() => getCategoriesData(galleryData), [galleryData])
  const categoryLookupMap = useMemo(() => createCategoryLookupMap(categoriesData), [categoriesData])

  // Optimized debounced search
  const debouncedSearchQuery = useDebounceHook(searchQuery, 300)

  // Highly optimized filtering - SINGLE PASS THROUGH DATA
  const filteredGallery = useMemo(() => {
    if (!selectedCategory && !debouncedSearchQuery) {
      return galleryData // Return original if no filters
    }

    const searchLower = debouncedSearchQuery.toLowerCase()

    return galleryData.filter((item) => {
      // Category filter - early return if doesn't match
      if (selectedCategory && !item.category.includes(selectedCategory)) {
        return false
      }

      // Search filter - early return if doesn't match
      if (debouncedSearchQuery) {
        const matchesTitle = item.title.toLowerCase().includes(searchLower)
        const matchesDescription = item.description.toLowerCase().includes(searchLower)
        const matchesLocation = item.location?.toLowerCase().includes(searchLower)
        const matchesCategory = item.category.some((cat) => cat.toLowerCase().includes(searchLower))

        if (!matchesTitle && !matchesDescription && !matchesLocation && !matchesCategory) {
          return false
        }
      }

      return true
    })
  }, [selectedCategory, debouncedSearchQuery, galleryData])

  // FIXED: Proper cleanup for keyboard listeners
  const cleanupKeyboardListener = useCallback(() => {
    if (keydownCleanupRef.current) {
      keydownCleanupRef.current()
      keydownCleanupRef.current = null
    }
  }, [])

  // FIXED: Optimized modal functions - NO DEPENDENCIES ON FILTERED GALLERY
  const openModal = useCallback(
    (index: number) => {
      // Clean up any existing listener first
      cleanupKeyboardListener()

      setModalIndex(index)
      setCurrentPreviewIndex(0)

      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case "Escape":
            closeModal()
            break
          case "ArrowLeft":
            e.preventDefault()
            setCurrentPreviewIndex((prev) => {
              // Get current item from filtered gallery at time of key press
              const currentItem = filteredGallery[index]
              if (!currentItem) return prev
              const total = currentItem.images.length
              return (prev - 1 + total) % total
            })
            break
          case "ArrowRight":
            e.preventDefault()
            setCurrentPreviewIndex((prev) => {
              // Get current item from filtered gallery at time of key press
              const currentItem = filteredGallery[index]
              if (!currentItem) return prev
              const total = currentItem.images.length
              return (prev + 1) % total
            })
            break
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      keydownCleanupRef.current = () => document.removeEventListener("keydown", handleKeyDown)
    },
    [cleanupKeyboardListener],
  ) // Remove filteredGallery dependency

  const closeModal = useCallback(() => {
    cleanupKeyboardListener()
    setModalIndex(null)
  }, [cleanupKeyboardListener])

  // FIXED: Optimized navigation functions
  const prevImage = useCallback(() => {
    setCurrentPreviewIndex((prev) => {
      if (modalIndex === null) return prev
      const currentItem = filteredGallery[modalIndex]
      if (!currentItem) return prev
      const total = currentItem.images.length
      return (prev - 1 + total) % total
    })
  }, [modalIndex, filteredGallery])

  const nextImage = useCallback(() => {
    setCurrentPreviewIndex((prev) => {
      if (modalIndex === null) return prev
      const currentItem = filteredGallery[modalIndex]
      if (!currentItem) return prev
      const total = currentItem.images.length
      return (prev + 1) % total
    })
  }, [modalIndex, filteredGallery])

  // FIXED: Optimized like toggle - USE STABLE ID INSTEAD OF TITLE
  const toggleLike = useCallback((itemId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }, [])

  // FIXED: Proper body overflow management
  useEffect(() => {
    if (modalIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [modalIndex])

  // FIXED: Cleanup keyboard listeners on unmount
  useEffect(() => {
    return () => {
      cleanupKeyboardListener()
    }
  }, [cleanupKeyboardListener])

  // FIXED: Stable filter handlers
  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category)
    setShowFilters(false)
  }, [])

  const handleSearchClear = useCallback(() => {
    setSearchQuery("")
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  // Pre-compute current modal item to avoid repeated lookups
  const currentModalItem = useMemo(() => {
    return modalIndex !== null ? filteredGallery[modalIndex] : null
  }, [modalIndex, filteredGallery])

  return (
    <Shell>
      <div className="relative w-full overflow-hidden mt-10">
        <CreativeBackground />

        {/* Simplified floating elements - CSS only */}
        <div className="absolute top-20 left-4 sm:left-10 w-6 h-6 sm:w-8 sm:h-8 text-orange-200/30 animate-pulse">
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute top-32 right-4 sm:right-20 w-5 h-5 sm:w-6 sm:h-6 text-blue-200/30 animate-bounce">
          <Star className="w-full h-full" />
        </div>

        <section className="relative z-10 w-full px-3 sm:px-4 py-12 sm:py-20 space-y-8 sm:space-y-12 text-gray-900">
          <div className="container mx-auto px-2 sm:px-4 mt-6 sm:mt-10">
            {/* Hero Section */}
            <motion.div
              className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12"
            >
              <h1 className="py-6 sm:py-10 text-4xl sm:text-6xl lg:text-8xl font-black bg-gradient-to-r from-orange-500 via-orange-500 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4">
                Gallery
              </h1>
              <div className="w-24 sm:w-32 h-1.5 sm:h-2 bg-gradient-to-r from-orange-500 via-violet-500 to-blue-600 rounded-full mx-auto" />

              <div className="relative max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
                {/* Decorative elements - Hidden on mobile */}
                <div className="hidden sm:block absolute -top-3 -left-3 w-4 h-4 sm:w-6 sm:h-6 border-2 border-orange-300 rounded-full animate-spin"></div>
                <div className="hidden sm:block absolute -top-3 -right-3 w-3 h-3 sm:w-4 sm:h-4 bg-blue-300 rounded-full animate-bounce"></div>
                <div className="hidden sm:block absolute -bottom-3 -left-3 w-4 h-4 sm:w-5 sm:h-5 bg-purple-300 rounded-full animate-pulse"></div>
                <div className="hidden sm:block absolute -bottom-3 -right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-pink-300 rounded-full animate-ping"></div>

                <p className="text-base sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium bg-white/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                  Witness the transformative power of community action through our visual journey of impact and hope
                </p>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              className="mb-6 sm:mb-8"
            >
              <div className="max-w-full sm:max-w-2xl mx-auto">
                <div className="relative bg-white/95 rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-xl">
                  <div className="flex items-center p-2 sm:p-2">
                    <div className="p-2 sm:p-3 text-orange-500">
                      <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="flex-1 px-2 py-2 sm:py-3 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base sm:text-lg font-medium"
                    />
                    {searchQuery && (
                      <button
                        onClick={handleSearchClear}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 active:scale-95"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Filter Section */}
            <motion.div
              className="mb-6 sm:mb-8"
            >
              {/* Mobile Filter Toggle */}
              <div className="block lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/95 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-orange-300 transition-all duration-300 shadow-xl active:scale-[0.98]"
                >
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <span className="font-bold text-gray-700 text-sm sm:text-base">
                    {selectedCategory ? `Filter: ${selectedCategory}` : "All Categories"}
                  </span>
                </button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 sm:mt-4 space-y-2 sm:space-y-3"
                    >
                      <button
                        onClick={() => handleCategorySelect(null)}
                        className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-left transition-all duration-300 active:scale-[0.98] ${
                          selectedCategory === null
                            ? "bg-gradient-to-r from-orange-100 to-violet-100 border-2 border-violet-300 text-orange-700 shadow-lg"
                            : "bg-white/90 border-2 border-gray-200 text-gray-700 hover:border-orange-300 hover:shadow-lg"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm sm:text-base">All Categories</span>
                          <span className="text-xs sm:text-sm text-gray-500 bg-white/80 px-2 py-1 rounded-full">
                            ({galleryData.length})
                          </span>
                        </div>
                      </button>
                      {categoriesData.map((cat) => (
                        <button
                          key={cat.title}
                          onClick={() => handleCategorySelect(cat.title)}
                          className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-left transition-all duration-300 active:scale-[0.98] ${
                            selectedCategory === cat.title
                              ? "bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 text-blue-700 shadow-lg"
                              : "bg-white/90 border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-lg"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {cat.icon}
                              <div>
                                <div className="font-bold text-sm sm:text-base">{cat.title}</div>
                                <div className="text-xs sm:text-sm text-gray-500">{cat.description}</div>
                              </div>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-500 bg-white/80 px-2 py-1 rounded-full">
                              ({cat.count})
                            </span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Filter Pills */}
              <div className="hidden lg:flex flex-wrap gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition-all duration-300 border-2 shadow-xl hover:scale-105 active:scale-95 ${
                    selectedCategory === null
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 border-orange-500 text-white shadow-orange-200"
                      : "bg-white/90 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-lg"
                  }`}
                >
                  All Categories ({galleryData.length})
                </button>
                {categoriesData.map((cat) => (
                  <button
                    key={cat.title}
                    onClick={() => handleCategorySelect(cat.title)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition-all duration-300 border-2 shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 ${
                      selectedCategory === cat.title
                        ? `${cat.color} border-transparent text-white`
                        : "bg-white/90 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-lg"
                    }`}
                  >
                    {cat.icon}
                    <span className="hidden sm:inline">{cat.title}</span>
                    <span className="sm:hidden">{cat.title.split(" ")[0]}</span>({cat.count})
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Results Summary */}
            {(selectedCategory || searchQuery) && (
              <motion.div
                className="text-center mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-white/90 to-gray-50/90 rounded-full border-2 border-gray-200 shadow-xl">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <p className="text-gray-700 font-bold text-sm sm:text-base">
                    Showing {filteredGallery.length} project{filteredGallery.length !== 1 ? "s" : ""}
                    {selectedCategory && ` in "${selectedCategory}"`}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Gallery Grid - FIXED: Use stable keys */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredGallery.map((item, index) => (
                <GalleryCard
                  key={item.id} // FIXED: Use stable ID instead of computed string
                  item={item}
                  index={index}
                  onOpenModal={openModal}
                  onToggleLike={toggleLike}
                  isLiked={likedItems.has(item.id)} // FIXED: Use ID instead of title
                  categoryLookupMap={categoryLookupMap}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredGallery.length === 0 && (
              <motion.div
                className="text-center py-12 sm:py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                  <Filter className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-500 mb-2 sm:mb-3">No projects found</h3>
                <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg px-4">
                  {searchQuery
                    ? `No projects match "${searchQuery}"`
                    : selectedCategory
                      ? `No projects found in "${selectedCategory}"`
                      : "No projects available"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  {searchQuery && (
                    <button
                      onClick={handleSearchClear}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600 rounded-full hover:from-orange-200 hover:to-pink-200 transition-all font-bold border-2 border-orange-200 shadow-lg active:scale-95"
                    >
                      Clear Search
                    </button>
                  )}
                  {selectedCategory && (
                    <button
                      onClick={() => handleCategorySelect(null)}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full hover:from-blue-200 hover:to-purple-200 transition-all font-bold border-2 border-blue-200 shadow-lg active:scale-95"
                    >
                      View All Categories
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Modal - FIXED: Use pre-computed current item */}
          <AnimatePresence>
            {modalIndex !== null && currentModalItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4"
                onClick={closeModal}
              >
                <motion.div
                  ref={modalRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-white shadow-2xl text-gray-900 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white hover:bg-gray-100 rounded-full p-1.5 sm:p-2 transition-colors shadow-md active:scale-95"
                    onClick={closeModal}
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  </button>

                  <div className="p-4 sm:p-6">
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex-1 pr-8 sm:pr-12">
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 mb-2">
                            {currentModalItem.title}
                          </h2>
                          <p className="text-gray-600 mb-3 text-sm sm:text-base">{currentModalItem.description}</p>
                        </div>
                        {currentModalItem.featured && (
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline">Featured</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                        {currentModalItem.location && (
                          <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{currentModalItem.location}</span>
                          </div>
                        )}
                        {currentModalItem.date && (
                          <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{formatFullDate(currentModalItem.date)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{currentModalItem.likes || 0} likes</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] mb-4 sm:mb-6 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={currentModalItem.images[currentPreviewIndex] || "/placeholder.svg"}
                        alt={`${currentModalItem.title} - Image ${currentPreviewIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 80vw"
                        priority
                      />

                      {currentModalItem.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 transition-colors shadow-md active:scale-95"
                          >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 transition-colors shadow-md active:scale-95"
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                          </button>
                        </>
                      )}

                      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium text-gray-700">
                        {currentPreviewIndex + 1} of {currentModalItem.images.length}
                      </div>
                    </div>

                    {currentModalItem.images.length > 1 && (
                      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-4 sm:mb-6">
                        {currentModalItem.images.map((img, idx) => (
                          <button
                            key={`${currentModalItem.id}-thumb-${idx}`} // FIXED: Use stable key
                            onClick={() => setCurrentPreviewIndex(idx)}
                            className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 active:scale-95 ${
                              currentPreviewIndex === idx
                                ? "border-orange-500 scale-110"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            <Image
                              src={img || "/placeholder.svg?height=50&width=60"}
                              alt={`Thumbnail ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentModalItem.category.map((cat) => {
                        const categoryData = categoryLookupMap.get(cat)
                        return (
                          <span
                            key={cat}
                            className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium rounded-full text-white flex items-center gap-1 sm:gap-2 ${
                              categoryData?.color || "bg-gray-500"
                            }`}
                          >
                            {categoryData?.icon}
                            {cat}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </Shell>
  )
}

export default UltraOptimizedGallery
