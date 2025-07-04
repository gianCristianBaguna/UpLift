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
      <div className="w-full flex justify-between items-center h-16">
        {/* Logo - Far Left */}
        <div className="pl-15">
          <Link href="/" className="flex items-center">
            <Image
              src="/uplift-logo.png"
              alt="Uplift Logo"
              width={140}
              height={60}
              priority
            />
          </Link>
        </div>

        {/* Nav Links - Right */}
        <nav className="flex items-center gap-6 pr-15">
          {navLinks.map((link) => {
            const isDonation = link.label === 'Donation';
            const isAbout = link.label === 'About';

            return (
              <Link key={link.href} href={link.href}>
                <span
                  className={`flex items-center gap-1 font-poppins text-base font-bold transition-colors duration-200 ${
                    isDonation
                      ? 'bg-[#2A61AC] text-white rounded-full px-6 py-1.5'
                      : 'text-[#2A61AC] hover:text-[#1f4b85] px-3 py-2 rounded-md'
                  }`}
                >
                  {link.label}
                  {isAbout && <ChevronDown className="w-4 h-4" />}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
