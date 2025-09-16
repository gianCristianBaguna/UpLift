"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import EventManager from "@/components/admin-manager/eventManager"
import { checkSession, clearSession, refreshSession } from "@/utils/auth"

export default function AdminEventsPage() {
  const [tab, setTab] = useState("events")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authenticated = checkSession()
    if (!authenticated) {
      router.push("/login")
      return
    }

    setIsAuthenticated(true)
    setIsLoading(false)

    const interval = setInterval(() => {
      if (!checkSession()) {
        router.push("/login")
      } else {
        refreshSession()
      }
    }, 30000) // check session every 30 seconds; push to login if session is expired

    return () => clearInterval(interval)
  }, [router])

  const handleLogout = () => {
    clearSession()
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r p-6">
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/uplift-logo.png"
            alt="UpLift Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <h2 className="text-lg font-bold text-gray-900">UpLift Admin</h2>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setTab("events")}
            className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${tab === "events"
                ? "bg-orange-100 text-orange-600"
                : "hover:bg-gray-100 text-gray-800"
              }`}
          >
            Manage Events
          </button>
        </nav>

        <div className="mt-8 pt-6 border-t">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {tab === "events" && <EventManager />}
      </main>
    </div>
  )
}
