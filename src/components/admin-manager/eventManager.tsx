"use client";

import { useState } from "react";
import * as eventHandler from "@/utils/actions/event-actions";
import { useRouter } from "next/navigation";
import { type Event as OriginalEvent } from "@/utils/actions/event-actions";

// TODO: refactor the form

// Extend Event type to allow string indexing for form handling
type Event = OriginalEvent & { [key: string]: any };

const initialEvents = [
  {
    id: "1",
    image: "/foodsecurity.jpg",
    title: "Community Feeding Program",
    date: new Date("August 10, 2025"),
    time: "10:00 AM - 2:00 PM",
    location: "Brgy. Maligaya Community Hall",
    attendees: 150,
    category: "Food Security",
    description: "Join us in providing nutritious meals and essential supplies.",
    impact: "Expected to serve 500+ meals",
  },
  {
    id: "2",
    image: "/back2school.jpg",
    title: "Back-to-School Drive",
    date: new Date("August 25, 2025"),
    time: "1:00 PM - 5:00 PM",
    location: "Nueva Elementary School",
    attendees: 300,
    category: "Education",
    description: "Distribute school supplies for the new academic year.",
    impact: "Supporting 300+ students",
  },
]

export default function EventManager() {
  const [events, setEvents] = useState(initialEvents)
  const [form, setForm] = useState<Event>({
    id: null,
    image: "",
    title: "",
    date: new Date(),
    time: "",
    location: "",
    attendees: 0,
    category: "",
    description: "",
    impact: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "date") {
      setForm({ ...form, [name]: new Date(value) });
    } else if (name === "attendees") {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  const handleAddOrUpdate = async () => {
    if (editingId !== null) {
      setEvents(events.map(e => (e.id === editingId ? { ...form, id: editingId } : e)))
    } else {
      const newEvent = await eventHandler.createEvent(form)
      setEvents([...events, newEvent])
    }
    resetForm()
  }

  const handleEdit = (id: string) => {
    const event = events.find(e => e.id === id)
    if (event) {
      setForm(event)
      setEditingId(id)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(e => e.id !== id))
    }
  }

  const resetForm = () => {
    setForm({
      id: null,
      image: "",
      title: "",
      date: new Date(),
      time: "",
      location: "",
      attendees: 0,
      category: "",
      description: "",
      impact: "",
    })
    setEditingId(null)
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Events</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{editingId ? "Edit Event" : "Add New Event"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["title", "date", "time", "location", "attendees", "category", "impact", "image"].map(field => (
            <input
              key={field}
              name={field}
              type={(field === "image" || field === "time") ? "text" : field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="border border-gray-300 rounded px-4 py-2 text-gray-800"
            />
          ))}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="col-span-full border border-gray-300 rounded px-4 py-2 text-gray-800"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleAddOrUpdate}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {editingId ? "Update Event" : "Add Event"}
          </button>
          {editingId && (
            <button onClick={resetForm} className="text-gray-600 underline">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Event History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="border-b">
                  <td className="px-4 py-2 text-gray-900">{event.title}</td>
                  <td className="px-4 py-2 text-gray-700">{event.date.toLocaleString()}</td>
                  <td className="px-4 py-2 text-gray-700">{event.location}</td>
                  <td className="px-4 py-2 text-gray-700">{event.category}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(event.id)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
