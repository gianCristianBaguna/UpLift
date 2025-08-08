"use client";

import { useState, useEffect } from "react";
import { type Event } from "@/utils/actions/event-actions";
import { CldUploadWidget } from "next-cloudinary";
import { removeImage } from "@/utils/actions/cloudinary-actions";
import type { CloudinaryUploadWidgetInfo } from "@cloudinary-util/types";

interface EventFormProps {
  initialData?: Event;
  onSubmit: (event: Event) => Promise<void>;
  onCancel?: () => void;
  isEditing?: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function EventForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false
}: EventFormProps) {
  const [formData, setFormData] = useState<Event>(
    initialData || {
      id: null,
      image: "",
      imagePublicId: "",
      title: "",
      date: new Date(),
      time: "",
      location: "",
      attendees: 0,
      category: "",
      description: "",
      impact: "",
    }
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form when not editing
      setFormData({
        id: null,
        image: "",
        imagePublicId: "",
        title: "",
        date: new Date(),
        time: "",
        location: "",
        attendees: 0,
        category: "",
        description: "",
        impact: "",
      });
    }
    setErrors({}); // Clear any existing errors
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.time.trim()) {
      newErrors.time = "Time is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (formData.attendees < 0) {
      newErrors.attendees = "Attendees must be a positive number";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "date"
        ? new Date(value)
        : name === "attendees"
          ? Number(value)
          : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        id: null,
        image: "",
        imagePublicId: "",
        title: "",
        date: new Date(),
        time: "",
        location: "",
        attendees: 0,
        category: "",
        description: "",
        impact: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {isEditing ? "Edit Event" : "Add New Event"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formatDateForInput(formData.date)}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              Time *
            </label>
            <input
              id="time"
              name="time"
              type="text"
              value={formData.time}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.time ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.time && (
              <p className="mt-1 text-sm text-red-600">{errors.time}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter event location"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          {/* Attendees */}
          <div>
            <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-2">
              Expected Attendees
            </label>
            <input
              id="attendees"
              name="attendees"
              type="number"
              min="0"
              value={formData.attendees}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.attendees ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="0"
            />
            {errors.attendees && (
              <p className="mt-1 text-sm text-red-600">{errors.attendees}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <option value="">Select a category</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="networking">Networking</option>
              <option value="training">Training</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Impact */}
          <div>
            <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-2">
              Expected Impact
            </label>
            <input
              id="impact"
              name="impact"
              type="text"
              value={formData.impact}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Describe the expected impact"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image Upload (Only one image up to 10 MB)
            </label>

            <CldUploadWidget
              options={{
                sources: ["local"],
                maxFiles: 1,
                maxFileSize: 10 * 1024 * 1024,
              }}
              uploadPreset="uplift"
              onSuccess={(result, { widget }) => {
                const resultInfo = result.info as CloudinaryUploadWidgetInfo;
                if (resultInfo.secure_url) {
                  setFormData((prev) => ({
                    ...prev,
                    image: resultInfo.secure_url as string,
                    imagePublicId: resultInfo.public_id as string,
                  }));
                }
              }}
              onQueuesEnd={(result, { widget }) => {
                widget.close();
              }}
            >
              {({ open }) => {
                function handleOnClick(e: React.MouseEvent) {
                  e.preventDefault(); // stop form submission
                  open();
                }
                return (
                  <button
                    type="button"
                    onClick={handleOnClick}
                    className="bg-blue-500 hover:bg-blue-300 px-4 py-2 rounded-lg"
                  >
                    <p className="text-white">
                      {formData.image ? "Replace Image" : "Upload an Image"}
                    </p>
                  </button>
                );
              }}
            </CldUploadWidget>

            {/* Show preview if image exists */}
            {formData.image && (
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={formData.image}
                  alt="Uploaded preview"
                  className="w-48 rounded-lg border"
                />

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={async () => {
                    setIsRemoving(true); // start loading
                    try {
                      if (formData.imagePublicId) {
                        console.log(
                          "Removing image with publicId:",
                          formData.imagePublicId
                        );
                        await removeImage(formData.imagePublicId);
                      }
                      setFormData((prev) => ({
                        ...prev,
                        image: "",
                        imagePublicId: "",
                      }));
                    } catch (error) {
                      console.error("Failed to remove image", error);
                    } finally {
                      setIsRemoving(false); // stop loading
                    }
                  }}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 underline disabled:opacity-50"
                  disabled={isRemoving}
                >
                  {isRemoving ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3.536-3.536A8 8 0 114 12z"
                        ></path>
                      </svg>
                      Removing...
                    </>
                  ) : (
                    "Remove"
                  )}
                </button>
              </div>
            )}

          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical ${errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Provide a detailed description of the event"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
          >
            {isSubmitting && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isSubmitting
              ? (isEditing ? "Updating..." : "Adding...")
              : (isEditing ? "Update Event" : "Add Event")
            }
          </button>

          {(isEditing || onCancel) && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="text-gray-600 hover:text-gray-800 underline disabled:text-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
