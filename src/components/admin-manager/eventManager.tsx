"use client";

import { useEffect, useState } from "react";
import * as eventHandler from "@/utils/actions/event-actions";
import { useRouter } from "next/navigation";
import { type Event } from "@/utils/actions/event-actions";
import EventForm from "@/components/admin-manager/event-form";
import { removeImage } from "@/utils/actions/cloudinary-actions";

export default function EventManager() {
  const [eventsList, setEventsList] = useState<Event[] | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleFormSubmit = async (eventData: Event) => {
    if (editingEvent) {
      // Update existing event
      const updatedEvent = await eventHandler.updateEvent(eventData);
      setEventsList(prev => 
        prev!.map(e => (e.id === editingEvent.id ? updatedEvent : e))
      );
      setEditingEvent(null);
    } else {
      // Create new event
      const newEvent = await eventHandler.createEvent(eventData);
      setEventsList(prev => [...prev!, newEvent]);
    }
  };

  const handleEdit = (id: string) => {
    const event = eventsList!.find(e => e.id === id);
    console.log("event: ", event);
    if (event) {
      setEditingEvent(event);
    }
  };

  const handleDelete = async (id: string, imagePublicId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await eventHandler.deleteEvent(id);
      await removeImage(imagePublicId);
      setEventsList(prev => prev!.filter(e => e.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await eventHandler.getAllEvents();
        setEventsList(events);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Events</h1>
      
      <EventForm
        initialData={editingEvent || undefined}
        onSubmit={handleFormSubmit} 
        onCancel={editingEvent ? handleCancelEdit : undefined}
        isEditing={!!editingEvent}
      />

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Event History</h2>
        
        {!eventsList || eventsList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No events found. Create your first event above!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-gray-600 border-b border-gray-200">
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Date & Time</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Attendees</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {eventsList.map((event, index) => (
                  <tr 
                    key={event.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {event.title}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <div>
                        <div>{event.date.toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{event.location}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 capitalize">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{event.attendees}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event.id!)}
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.id!, event.imagePublicId)}
                          className="text-red-600 hover:text-red-800 hover:underline transition-colors text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
