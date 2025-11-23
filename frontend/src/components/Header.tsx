'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  variant?: 'light' | 'dark';
  transparent?: boolean;
}

export default function Header({ variant = 'light', transparent = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const isLight = variant === 'light';
  const textColor = isLight ? 'text-gray-900' : 'text-white';
  const hoverColor = isLight ? 'hover:text-blue-600' : 'hover:text-blue-300';
  const bgColor = transparent ? 'bg-transparent' : (isLight ? 'bg-white' : 'bg-gray-900');

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setServicesOpen(false);
    }, 150); // 150ms delay before closing
    setCloseTimeout(timeout);
  };

  return (
    <header className={`${bgColor} ${transparent ? '' : 'shadow-sm'} sticky top-0 z-50 transition-colors`}>
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
            BookMeThat
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`${textColor} ${hoverColor} transition font-medium flex items-center gap-1`}>
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {servicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href="/hotels" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏨</span>
                      <div>
                        <div className="font-semibold">Hotels</div>
                        <div className="text-xs text-gray-500">2M+ properties</div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/flights" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✈️</span>
                      <div>
                        <div className="font-semibold">Flights</div>
                        <div className="text-xs text-gray-500">500+ airlines</div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/trains" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚂</span>
                      <div>
                        <div className="font-semibold">Train Tickets</div>
                        <div className="text-xs text-gray-500">Pakistan Railway</div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/cars" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚗</span>
                      <div>
                        <div className="font-semibold">Car Rentals</div>
                        <div className="text-xs text-gray-500">500+ suppliers</div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/activities" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎭</span>
                      <div>
                        <div className="font-semibold">Activities</div>
                        <div className="text-xs text-gray-500">5,000+ destinations</div>
                      </div>
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link href="/esim" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <div className="font-semibold">Travel eSIM</div>
                        <div className="text-xs text-gray-500">190+ countries</div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/destinations" className={`${textColor} ${hoverColor} transition font-medium`}>
              Destinations
            </Link>
            <Link href="/blog" className={`${textColor} ${hoverColor} transition font-medium`}>
              Travel Blog
            </Link>
            <Link href="/reviews" className={`${textColor} ${hoverColor} transition font-medium`}>
              Reviews
            </Link>
            <Link href="/help" className={`${textColor} ${hoverColor} transition font-medium`}>
              Help
            </Link>
          </div>

          {/* Right Side: Currency, Account, Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <select className={`hidden md:block ${textColor} bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}>
              <option>USD $</option>
              <option>EUR €</option>
              <option>GBP £</option>
              <option>AED د.إ</option>
              <option>JPY ¥</option>
            </select>

            {/* Account Button */}
            <Link 
              href="/signin" 
              className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Sign In
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden ${textColor} p-2`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-3">
              <Link href="/hotels" className={`${textColor} ${hoverColor} transition font-medium flex items-center gap-2`}>
                <span className="text-xl">🏨</span> Hotels
              </Link>
              <Link href="/flights" className={`${textColor} ${hoverColor} transition font-medium flex items-center gap-2`}>
                <span className="text-xl">✈️</span> Flights
              </Link>
              <Link href="/trains" className={`${textColor} ${hoverColor} transition font-medium flex items-center gap-2`}>
                <span className="text-xl">🚂</span> Train Tickets
              </Link>
              <Link href="/cars" className={`${textColor} ${hoverColor} transition font-medium flex items-center gap-2`}>
                <span className="text-xl">🚗</span> Car Rentals
              </Link>
              <Link href="/activities" className={`${textColor} ${hoverColor} transition font-medium flex items-center gap-2`}>
                <span className="text-xl">🎭</span> Activities
              </Link>
              <Link href="/esim" className={`${textColor} ${hoverColor} transition font-medium flex items-center gap-2`}>
                <span className="text-xl">📱</span> Travel eSIM
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link href="/destinations" className={`${textColor} ${hoverColor} transition font-medium`}>
                Destinations
              </Link>
              <Link href="/blog" className={`${textColor} ${hoverColor} transition font-medium`}>
                Travel Blog
              </Link>
              <Link href="/reviews" className={`${textColor} ${hoverColor} transition font-medium`}>
                Reviews
              </Link>
              <Link href="/help" className={`${textColor} ${hoverColor} transition font-medium`}>
                Help Center
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link href="/signin" className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition font-medium text-center">
                Sign In / Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
