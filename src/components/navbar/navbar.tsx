'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/pages/about' },
  { label: 'Donation', href: '/pages/donation' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
        {/* Left: Logo + Home + About */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/uplift-logo.png"
              alt="Uplift Logo"
              width={140}
              height={60}
              priority
            />
          </Link>

          {/* Home + About Only */}
          <nav className="flex items-center gap-4">
            {navLinks
              .filter((link) => link.label !== 'Donation')
              .map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`flex items-center gap-1 font-[Montserrat] text-base  text-[#2A61AC] hover:text-[#1f4b85] px-3 py-2 rounded-md transition-colors duration-200`}
                  >
                    {link.label}
                    {link.label === 'About' && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </Link>
              ))}
          </nav>
        </div>

        {/* Right: Donation Button */}
        <nav>
          <Link href="/pages/donation">
            <span className="font-poppins text-base font-bold bg-[#2A61AC] text-white rounded-full px-6 py-1.5 transition-colors duration-200">
              Donation
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
