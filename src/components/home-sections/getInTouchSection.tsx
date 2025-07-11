import { div, footer } from "framer-motion/client";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

export default function GetInTouchSection() {
  return (
    <div className="bg-gray-100">
      {/* Main Get In Touch Section */}
      <section className="bg-[#1c5091] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-orange-300 text-lg max-w-4xl mx-auto leading-relaxed">
              Subscribe to our mailing list for inspiring stories and updates
              from Uplift Foundation International. Stay connected with our
              mission to empower children and youth through education,
              compassionate care, and strong community partnerships.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 min-h-[500px]">
              {/* Left Orange Section */}
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-transparent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle
                      className="w-12 h-12 text-white"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">Let's Connect</h3>
                  <p className="text-orange-100">We'd love to hear from you</p>
                </div>
              </div>
              {/* Right Form Section */}
              <div className="p-8 bg-white">
                <form className="space-y-6">
                  {/* First Name and Last Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[#1c5091] font-medium text-sm">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full border-b-2 border-orange-400 bg-transparent py-2 px-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[#1c5091] font-medium text-sm">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full border-b-2 border-orange-400 bg-transparent py-2 px-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-[#1c5091] font-medium text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full border-b-2 border-orange-400 bg-transparent py-2 px-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="text-[#1c5091] font-medium text-sm">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full border-b-2 border-orange-400 bg-transparent py-2 px-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center mb-4 sm:mb-0">
            <Image
              src="/uplift-logo.png"
              alt="Uplift Logo"
              width={140}
              height={60}
              priority
            />
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-[#1c5091] transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-[#1c5091] transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
