"use client"

import { useState } from "react"
import Image from "next/image"
import EventManager from "@/components/admin-manager/eventManager"

export default function AdminEventsPage() {
  const [tab, setTab] = useState("events")

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
            className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${
              tab === "events"
                ? "bg-orange-100 text-orange-600"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            Manage Events
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {tab === "events" && <EventManager />}
      </main>
    </div>
  )
}
