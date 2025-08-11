'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Navbar({ sliderRef }) {
  // Scroll to slider section
  const handleEventsClick = (e) => {
    if (sliderRef && sliderRef.current) {
      e.preventDefault();
      sliderRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50  backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Gateways Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/gateways-logo.png"
                alt="Gateways Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-white font-orbitron font-bold text-2xl">
                GATEWAYS
              </span>
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-20 font-content text-xl">
              <a
                href="#events-slider"
                onClick={handleEventsClick}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium cursor-pointer"
              >
                Events
              </a>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <Link 
                href="/brochure" 
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Brochure
              </Link>
            </div>
          </div>

          {/* Right side - Christ University Logo */}
          <div className="flex items-center">
            <Link href="https://christuniversity.in" target="_blank" className="flex items-center">
              <Image
                src="/cu-old.webp"
                alt="Christ University Logo"
                width={150}
                height={100}
                className="mr-2"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#events-slider"
            onClick={handleEventsClick}
            className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Events
          </a>
          <Link 
            href="/about" 
            className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            About
          </Link>
          <Link 
            href="/brochure" 
            className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            Brochure
          </Link>
        </div>
      </div>
    </nav>
  )
}
