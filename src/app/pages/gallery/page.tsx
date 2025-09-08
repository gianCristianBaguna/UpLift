"use client"
import type React from "react"
import { useState, useCallback, useRef, useMemo, memo, useEffect } from "react"
import NextImage from "next/image"
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
  Sparkles,
} from "lucide-react"
import { useDebounce } from "@/app/hooks/use-debounce"
import Shell from "@/components/navbar/shell"
import Footer from "@/components/navbar/footer"
import { supabase } from "@/utils/supabase"

interface GalleryItem {
  id: string
  title: string
  description: string
  cover: string
  images: string[]
  category: string[]
  location?: string
  date?: string
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

// allow non nullish values on eslint
/* eslint-disable @typescript-eslint/no-empty-object-type */
type DynamicGalleryProps = {}

const CATEGORY_CONFIG = {
  Community: {
    color: "bg-green-500",
    icon: <Heart className="w-3 h-3 sm:w-4 sm:h-4" />,
  },
  Education: {
    color: "bg-purple-500",
    icon: <Camera className="w-3 h-3 sm:w-4 sm:h-4" />,
  },
  Outreach: {
    color: "bg-orange-500",
    icon: <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />,
  },
  Programs: {
    color: "bg-teal-500",
    icon: <Zap className="w-3 h-3 sm:w-4 sm:h-4" />,
  },
  Relief: {
    color: "bg-blue-500",
    icon: <Star className="w-3 h-3 sm:w-4 sm:h-4" />,
  },
} as const

const BUCKET_NAME = "uplift"
// const SUPABASE_URL = "https://pjdcaohwdvezyhqysnzl.supabase.co"

export const loadGalleryFromFolders = async (): Promise<GalleryItem[]> => {
  const galleryItems: GalleryItem[] = []

  const folderStructure = {
    title: "COMMUNITY PROGRAMS",
    category: ["Community", "Programs"],
    description: "Supporting communities through various development programs and initiatives",
    location: "Various Communities",
    subfolders: [
      { name: "basketball" },
      { name: "bohol" },
      { name: "cleanup" },
      { name: "feeding" },
      { name: "library" },
      { name: "schoolSupplies" },
      { name: "values" },
      { name: "kanlaon" },
    ],
  }

  for (let index = 0; index < folderStructure.subfolders.length; index++) {
    const subfolder = folderStructure.subfolders[index]
    const title = subfolder.name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    const { data, error } = await supabase.storage.from(BUCKET_NAME).list(subfolder.name, { limit: 100 })

    if (error || !data || data.length === 0) continue

    const images = data.map((file) => {
      const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(`${subfolder.name}/${file.name}`)
      return urlData.publicUrl
    })

    console.log(`[v0] Generated URLs for ${title}:`, images.slice(0, 3)) // Show first 3 URLs

    const itemCategories = [...folderStructure.category]
    if (
      title.includes("Feeding") ||
      title.includes("Clean-up") ||
      title.includes("Clinic") ||
      title.includes("Basketball")
    ) {
      itemCategories.push("Outreach")
    } else if (title.includes("School") || title.includes("Library")) {
      itemCategories.push("Education")
    } else if (title.includes("Relief") || title.includes("Eruption")) {
      itemCategories.push("Relief")
    }

    galleryItems.push({
      id: `uplift-${subfolder.name}`,
      title: title,
      description: `${title} - Part of our community initiatives`,
      cover: images[0], // first image as cover
      images,
      category: itemCategories,
      location: folderStructure.location,
      date: new Date(Date.now() - index * 7 * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 50) + 10,
      featured: index === 0,
    })
  }

  return galleryItems
}

const DynamicGallery: React.FC<DynamicGalleryProps> = () => {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())
  const modalRef = useRef<HTMLDivElement>(null)
  const keydownCleanupRef = useRef<(() => void) | null>(null)

  const categoriesData = useMemo(() => getCategoriesData(galleryData), [galleryData])
  const categoryLookupMap = useMemo(() => createCategoryLookupMap(categoriesData), [categoriesData])
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("[v0] Starting to load gallery data with actual image counts...")
        const data = await loadGalleryFromFolders()
        console.log(
          "[v0] Loaded gallery data:",
          data.map((item) => ({
            title: item.title,
            imageCount: item.images.length,
          })),
        )
        setGalleryData(data)
      } catch (error) {
        console.error("Error loading gallery data:", error)
        setGalleryData([]) // Fallback to empty array
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const cleanupKeyboardListener = useCallback(() => {
    if (keydownCleanupRef.current) {
      keydownCleanupRef.current()
      keydownCleanupRef.current = null
    }
  }, [])

  const closeModal = useCallback(() => {
    cleanupKeyboardListener()
    setModalIndex(null)
  }, [cleanupKeyboardListener])
  
  const openModal = useCallback(
    (index: number) => {
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
              const currentItem = galleryData[index]
              if (!currentItem) return prev
              const total = currentItem.images.length
              return (prev - 1 + total) % total
            })
            break
          case "ArrowRight":
            e.preventDefault()
            setCurrentPreviewIndex((prev) => {
              const currentItem = galleryData[index]
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
    [cleanupKeyboardListener, closeModal, galleryData],
  )

  const prevImage = useCallback(() => {
    setCurrentPreviewIndex((prev) => {
      if (modalIndex === null) return prev
      const currentItem = galleryData[modalIndex]
      if (!currentItem) return prev
      const total = currentItem.images.length
      return (prev - 1 + total) % total
    })
  }, [modalIndex, galleryData])

  const nextImage = useCallback(() => {
    setCurrentPreviewIndex((prev) => {
      if (modalIndex === null) return prev
      const currentItem = galleryData[modalIndex]
      if (!currentItem) return prev
      const total = currentItem.images.length
      return (prev + 1) % total
    })
  }, [modalIndex, galleryData])

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

  useEffect(() => {
    if (modalIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [modalIndex])

  useEffect(() => {
    return () => {
      cleanupKeyboardListener()
    }
  }, [cleanupKeyboardListener])

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

  const currentModalItem = useMemo(() => {
    return modalIndex !== null ? galleryData[modalIndex] : null
  }, [modalIndex, galleryData])

  const filteredGallery = useMemo(() => {
    if (!selectedCategory && !debouncedSearchQuery) {
      return galleryData
    }

    const searchLower = debouncedSearchQuery.toLowerCase()

    return galleryData.filter((item) => {
      if (selectedCategory && !item.category.includes(selectedCategory)) {
        return false
      }

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

  if (isLoading) {
    return (
      <div className="relative w-full overflow-hidden mt-10">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 sm:mb-6"></div>
            <p className="text-gray-600 font-medium">Loading your gallery...</p>
            <p className="text-gray-400 text-sm mt-2">Optimizing large image collection</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Shell>
      <div className="relative w-full overflow-hidden mt-10">
        <div className="absolute top-20 left-4 sm:left-10 w-6 h-6 sm:w-8 sm:h-8 text-orange-200/30 animate-pulse mx-auto mb-4 sm:mb-6 shadow-xl">
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute top-32 right-4 sm:right-20 w-5 h-5 sm:w-6 sm:h-6 text-blue-200/30 animate-bounce">
          <Star className="w-full h-full" />
        </div>

        <section className="relative z-10 w-full px-3 sm:px-4 py-12 sm:py-20 space-y-8 sm:space-y-12 text-gray-900">
          <div className="container mx-auto px-2 sm:px-4 mt-6 sm:mt-10">
            <motion.div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <h1 className="py-6 sm:py-10 text-4xl sm:text-6xl lg:text-8xl font-black bg-gradient-to-r from-orange-500 via-orange-500 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4">
                Gallery
              </h1>
              <div className="w-24 sm:w-32 h-1.5 sm:h-2 bg-gradient-to-r from-orange-500 via-violet-500 to-blue-600 rounded-full mx-auto" />

              <div className="flex justify-center gap-4 sm:gap-8 text-sm sm:text-base text-gray-600">
                <div className="text-center">
                  <div className="font-bold text-orange-500 text-lg sm:text-xl">{galleryData.length}</div>
                  <div>Projects</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-500 text-lg sm:text-xl">
                    {galleryData.reduce((total, item) => total + item.images.length, 0)}
                  </div>
                  <div>Photos</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-500 text-lg sm:text-xl">{categoriesData.length}</div>
                  <div>Categories</div>
                </div>
              </div>

              <div className="relative max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
                <div className="hidden sm:block absolute -top-3 -left-3 w-4 h-4 sm:w-6 sm:h-6 border-2 border-orange-300 rounded-full animate-spin"></div>
                <div className="hidden sm:block absolute -top-3 -right-3 w-3 h-3 sm:w-4 sm:h-4 bg-blue-300 rounded-full animate-bounce"></div>
                <div className="hidden sm:block absolute -bottom-3 -left-3 w-4 h-4 sm:w-5 sm:h-5 bg-purple-300 rounded-full animate-pulse"></div>
                <div className="hidden sm:block absolute -bottom-3 -right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-pink-300 rounded-full animate-ping"></div>
              </div>
            </motion.div>

            <motion.div className="mb-6 sm:mb-8">
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

            <motion.div className="mb-6 sm:mb-8">
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

            {(selectedCategory || searchQuery) && (
              <motion.div
                className="text-center mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-white/90 to-gray-50/90 rounded-full border-2 border-gray-200 shadow-xl hover:shadow-lg">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <p className="text-gray-700 font-bold text-sm sm:text-base">
                    Showing {filteredGallery.length} project
                    {filteredGallery.length !== 1 ? "s" : ""}
                    {selectedCategory && ` in "${selectedCategory}"`}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredGallery.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  onOpenModal={openModal}
                  onToggleLike={toggleLike}
                  isLiked={likedItems.has(item.id)}
                  categoryLookupMap={categoryLookupMap}
                />
              ))}
            </div>

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

          <AnimatePresence>
            {modalIndex !== null && currentModalItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 mt-35"
                onClick={closeModal}
              >
                <motion.div
                  ref={modalRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[80vh] bg-white shadow-2xl text-gray-900 overflow-y-auto"
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
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
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
                      <NextImage
                        src={currentModalItem.images[currentPreviewIndex] || "/placeholder.svg"}
                        alt={`${currentModalItem.title} - Image ${currentPreviewIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                            key={`${currentModalItem.id}-thumb-${idx}`}
                            onClick={() => setCurrentPreviewIndex(idx)}
                            className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 active:scale-95 ${
                              currentPreviewIndex === idx
                                ? "border-orange-500 scale-110"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            <NextImage
                              src={img || "/placeholder.svg?height=50&width=60"}
                              alt={`Thumbnail ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      </div>
      <Footer />
    </Shell>
  )
}

const getCategoriesData = (gallery: GalleryItem[]): CategoryItem[] => {
  const categoryMap = new Map<string, number>()

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

const createCategoryLookupMap = (categoriesData: CategoryItem[]) => {
  const map = new Map<string, CategoryItem>()
  for (const cat of categoriesData) {
    map.set(cat.title, cat)
  }
  return map
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

const formatFullDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

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
    const formattedDate = useMemo(() => (item.date ? formatDate(item.date) : null), [item.date])
    const photoCountText = useMemo(
      () => `${item.images.length} ${item.images.length === 1 ? "photo" : "photos"}`,
      [item.images.length],
    )

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

    const handleCardClick = useCallback(() => onOpenModal(index), [onOpenModal, index])
    const handleLikeClick = useCallback(
      (e: React.MouseEvent) => {
        onToggleLike(item.id, e)
      },
      [onToggleLike, item.id],
    )

    const [imageSrc, setImageSrc] = useState(item.cover)
    const [hasError, setHasError] = useState(false)

    const handleImageError = useCallback(() => {
      console.log(`[v0] Image failed to load: ${imageSrc}`)
      if (!hasError) {
        const title = item.title.toLowerCase()
        const fallbackQuery = `${title} community program cover photo`
        const fallbackSrc = `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(fallbackQuery)}`
        console.log(`[v0] Using fallback image: ${fallbackSrc}`)
        setImageSrc(fallbackSrc)
        setHasError(true)
      }
    }, [hasError, item.title, imageSrc])

    const handleImageLoad = useCallback(() => {
      console.log(`[v0] Image loaded successfully: ${imageSrc}`)
    }, [imageSrc])

    return (
      <div
        className="group cursor-pointer transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        onClick={handleCardClick}
      >
        <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-300 transition-colors duration-200 shadow-md hover:shadow-xl">
          {item.featured && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="hidden xs:inline">Featured</span>
            </div>
          )}

          <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-gray-100">
            <NextImage
              src={imageSrc || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index < 6}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center hidden sm:flex">
              <div className="text-center">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mx-auto mb-1" />
                <span className="text-orange-500 font-medium text-xs sm:text-sm">View Gallery</span>
              </div>
            </div>

            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs text-gray-700 font-medium">
              {photoCountText}
            </div>

            {formattedDate && (
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-orange-500/90 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs text-white font-medium flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="hidden xs:inline">{formattedDate}</span>
              </div>
            )}

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

          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-1">
              {item.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">{item.description}</p>

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

export default DynamicGallery
