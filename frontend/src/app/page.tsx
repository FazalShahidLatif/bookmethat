export default function HomePage() {
  // JSON-LD Schema for Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'bookmethat',
    description: 'Online travel agency for booking hotels, flights, car rentals, and activities worldwide',
    url: 'https://bookmethat.com',
    logo: 'https://bookmethat.com/logo.png',
    sameAs: [
      'https://facebook.com/bookmethat',
      'https://twitter.com/bookmethat',
      'https://instagram.com/bookmethat',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-BOOK-NOW',
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish', 'French', 'German', 'Arabic', 'Chinese'],
      areaServed: 'Worldwide',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  };

  // JSON-LD Schema for Website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'bookmethat',
    url: 'https://bookmethat.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bookmethat.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // JSON-LD Schema for Service
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Travel Booking Service',
    provider: {
      '@type': 'TravelAgency',
      name: 'bookmethat',
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Hotel Booking',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'LodgingBusiness',
                name: 'Hotels Worldwide',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Flight Booking',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Flight',
                name: 'Flights Worldwide',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Car Rental',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'RentalCarReservation',
                name: 'Car Rentals Worldwide',
              },
            },
          ],
        },
      ],
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Find your next adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Search hotels, flights, car rentals, and more
          </p>
          
          {/* Quick Search Tabs */}
          <div className="bg-white rounded-lg shadow-2xl p-6 text-gray-900">
            <div className="flex gap-4 mb-6 border-b">
              <button className="pb-3 px-4 font-semibold border-b-2 border-blue-600 text-blue-600">
                🏨 Hotels
              </button>
              <button className="pb-3 px-4 font-semibold text-gray-500 hover:text-gray-700">
                ✈️ Flights
              </button>
              <button className="pb-3 px-4 font-semibold text-gray-500 hover:text-gray-700">
                🚗 Car Rentals
              </button>
              <button className="pb-3 px-4 font-semibold text-gray-500 hover:text-gray-700">
                🎯 Activities
              </button>
            </div>
            
            {/* Search Form */}
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Where are you going?"
                className="col-span-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="date"
                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Book your perfect trip
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <a href="/hotels" className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
            <div className="text-4xl mb-3">🏨</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Hotels</h3>
            <p className="text-gray-600 text-sm">Find the perfect stay</p>
          </a>
          
          <a href="/flights" className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
            <div className="text-4xl mb-3">✈️</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Flights</h3>
            <p className="text-gray-600 text-sm">Book cheap flights</p>
          </a>
          
          <a href="/cars" className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
            <div className="text-4xl mb-3">🚗</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Car Rentals</h3>
            <p className="text-gray-600 text-sm">Rent a car</p>
          </a>
          
          <a href="/activities" className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Activities</h3>
            <p className="text-gray-600 text-sm">Tours & experiences</p>
          </a>
        </div>
      </section>

      {/* Value-Added Services */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Stay connected while traveling
              </h3>
              <p className="text-gray-600">
                Get eSIMs for 190+ countries • No roaming fees • Instant activation
              </p>
            </div>
            <a
              href="/esim"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition font-semibold whitespace-nowrap"
            >
              Browse eSIMs →
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">2M+</div>
            <p className="text-gray-600">Properties worldwide</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-gray-600">Customer support</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">190+</div>
            <p className="text-gray-600">Countries covered</p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                <li><a href="/blog" className="hover:text-white transition">Travel Blog</a></li>
                <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/hotels" className="hover:text-white transition">Hotels</a></li>
                <li><a href="/flights" className="hover:text-white transition">Flights</a></li>
                <li><a href="/cars" className="hover:text-white transition">Car Rentals</a></li>
                <li><a href="/activities" className="hover:text-white transition">Activities</a></li>
                <li><a href="/esim" className="hover:text-white transition">Travel eSIM</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
                <li><a href="/account" className="hover:text-white transition">My Bookings</a></li>
                <li><a href="/cancellation" className="hover:text-white transition">Cancellation Policy</a></li>
                <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/cookies" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 bookmethat. All rights reserved. • 🚧 MVP in Development
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/bookmethat" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com/bookmethat" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="https://instagram.com/bookmethat" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </a>
              <a href="https://github.com/FazalShahidLatif/bookmethat" className="text-gray-400 hover:text-white transition" aria-label="GitHub">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
