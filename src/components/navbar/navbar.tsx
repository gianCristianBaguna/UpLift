"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const navLinks = [
  {
    label: "Home",
    href: "/",
    sections: [
      { label: "Our Impact Section", href: "/#impact" },
      { label: "Events Section", href: "/#events" },
      { label: "Gallery Section", href: "/#gallery-card" },
      { label: "Get Involved Section", href: "/#get-in-touch" },
    ],
  },
  {
    label: "About",
    href: "/pages/about",
    sections: [
      { label: "Mission & Vision", href: "/pages/about#mission-vission" },
      { label: "Core Values", href: "/pages/about#core" },
      { label: "Our Team", href: "/pages/about#team" },
    ],
  },
  {
    label: "Events",
    href: "/pages/events",
    sections: [
      { label: "Cetegories", href: "/pages/events#past" },
      { label: "Event List", href: "/pages/events#upcoming" },
    ],
  },
  {
    label: "Gallery",
    href: "/pages/gallery",
    sections: [
    ],
  },{
    label: "Donation",
    href: "/pages/donation",
    sections: [
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<
    string | null
  >(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === label ? null : label);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md text-black shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6 h-[120]">
          {/* Logo */}
          <Link href="/" className="flex items-center ml-20">
            <Image
              src="/uplift-logo.png"
              alt="Uplift Foundation International"
              width={160}
              height={80}
              priority
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 mr-20">
            {navLinks
              .filter((l) => l.label !== "Donation")
              .map((link) => (
                <div
                  key={link.href}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={link.href}>
                    <span
                      className={`font-medium text-base px-3 py-2 transition-all duration-200 flex items-center gap-1 rounded-lg hover:bg-gray-50
                        ${
                          isActive(link.href)
                            ? "text-[#F3954A] bg-[#F3954A]/5"
                            : "text-[#2A61AC] hover:text-[#F3954A]"
                        }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </span>
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 ${
                      activeDropdown === link.label
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {link.label} Sections
                      </h3>
                    </div>
                    {link.sections.map((section) => (
                      <Link
                        key={section.href}
                        href={section.href}
                        className="block px-4 py-3 text-sm text-gray-600 hover:text-[#F3954A] hover:bg-[#F3954A]/5 transition-colors duration-150"
                      >
                        {section.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

            {/* Donation Button */}
            <Link href="/pages/donation">
              <span
                className={`font-semibold text-base rounded-full px-6 py-3 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                  ${
                    isActive("/pages/donation")
                      ? "bg-[#F3954A] text-white shadow-[#F3954A]/25"
                      : "bg-[#2A61AC] text-white hover:bg-[#F3954A] shadow-[#2A61AC]/25"
                  }`}
              >
                Donate Now
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#2A61AC] p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
          <Image
            src="/uplift-logo.png"
            alt="Uplift Foundation"
            width={120}
            height={60}
            className="h-10 w-auto"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col p-4">
          {navLinks.map((link) => (
            <div key={link.href} className="mb-2">
              {/* Main Link */}
              <div className="flex items-center justify-between">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 font-semibold text-lg py-3 px-4 rounded-lg transition-colors
                    ${
                      isActive(link.href)
                        ? "text-[#F3954A] bg-[#F3954A]/5"
                        : "text-[#2A61AC] hover:text-[#F3954A] hover:bg-gray-50"
                    }`}
                >
                  {link.label}
                </Link>

                {/* Dropdown Toggle */}
                <button
                  onClick={() => toggleMobileDropdown(link.label)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      mobileActiveDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Mobile Dropdown */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileActiveDropdown === link.label
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-4 mt-2 space-y-1">
                  {link.sections.map((section) => (
                    <Link
                      key={section.href}
                      href={section.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-4 text-sm text-gray-600 hover:text-[#F3954A] hover:bg-[#F3954A]/5 rounded-lg transition-colors"
                    >
                      {section.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Mobile Donation Button */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link
              href="/pages/donation"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center font-semibold text-white bg-[#F3954A] hover:bg-[#F3954A]/90 py-4 px-6 rounded-xl transition-colors shadow-lg"
            >
              Make a Donation
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
