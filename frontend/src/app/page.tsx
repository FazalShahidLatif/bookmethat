import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function HomePage() {
  // JSON-LD Schema for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
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
      <Header />
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
      
      <main className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative text-white py-32 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={getDestinationImage('maldives')}
            alt="Travel destinations worldwide - Beautiful tropical beach"
            fill={true}
            objectFit="cover"
            priority={true}
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-indigo-900/90 to-purple-900/85" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl animate-fade-in">
              Your Journey Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-50 drop-shadow-lg max-w-3xl mx-auto">
              Search millions of hotels, flights, and activities worldwide
            </p>
            <p className="text-lg text-blue-100 drop-shadow-lg">
              💰 Best Price Guarantee • 🆓 Free Cancellation • ⚡ Instant Confirmation
            </p>
          </div>
          
          {/* Enhanced Search Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900 max-w-5xl mx-auto transform hover:scale-105 transition-transform duration-300">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <Link href="/hotels" className="flex-1 min-w-fit">
                <button className="w-full px-6 py-4 font-semibold rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <span className="text-2xl">🏨</span>
                  <span>Hotels</span>
                </button>
              </Link>
              <Link href="/flights" className="flex-1 min-w-fit">
                <button className="w-full px-6 py-4 font-semibold rounded-xl bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2">
                  <span className="text-2xl">✈️</span>
                  <span>Flights</span>
                </button>
              </Link>
              <Link href="/cars" className="flex-1 min-w-fit">
                <button className="w-full px-6 py-4 font-semibold rounded-xl bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2">
                  <span className="text-2xl">🚗</span>
                  <span>Cars</span>
                </button>
              </Link>
              <Link href="/activities" className="flex-1 min-w-fit">
                <button className="w-full px-6 py-4 font-semibold rounded-xl bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <span>Activities</span>
                </button>
              </Link>
            </div>
            
            {/* Search Form */}
            <form action="/search/hotels" method="GET" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📍 Where do you want to go?
                  </label>
                  <input
                    type="text"
                    name="destination"
                    placeholder="City, hotel, or destination"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📅 Check-in
                  </label>
                  <input
                    type="date"
                    name="checkin"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📅 Check-out
                  </label>
                  <input
                    type="date"
                    name="checkout"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👥 Guests
                  </label>
                  <select name="guests" className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    <option value="1">1 Guest</option>
                    <option value="2" selected>2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105">
                🔍 Search Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Domestic & International Destinations
          </h2>
          <p className="text-xl text-gray-600">
            Explore Pakistan and the world's most beautiful places
          </p>
        </div>
        
        {/* Domestic Destinations - Pakistan */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">🇵🇰</span>
            Discover Pakistan
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/destinations/hunza" className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <OptimizedImage
                src="https://images.pexels.com/photos/17007430/pexels-photo-17007430.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Hunza Valley, Pakistan - Mountain paradise"
                fill={true}
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h4 className="text-2xl font-bold text-white group-hover:text-blue-300 transition mb-2">
                  Hunza Valley
                </h4>
                <p className="text-gray-200 mb-2">Mountain paradise with cherry blossoms</p>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span>⛰️ Mountains</span>
                  <span>🌸 Nature</span>
                  <span>🏰 Forts</span>
                </div>
              </div>
            </Link>
            
            <Link href="/destinations/islamabad" className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <OptimizedImage
                src="https://images.pexels.com/photos/12565158/pexels-photo-12565158.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Islamabad, Pakistan - Modern capital city"
                fill={true}
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h4 className="text-2xl font-bold text-white group-hover:text-blue-300 transition mb-2">
                  Islamabad
                </h4>
                <p className="text-gray-200 mb-2">Modern capital with scenic hills</p>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span>🏙️ City</span>
                  <span>🕌 Mosques</span>
                  <span>🌳 Parks</span>
                </div>
              </div>
            </Link>
            
            <Link href="/destinations/lahore" className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <OptimizedImage
                src="https://images.pexels.com/photos/16997396/pexels-photo-16997396.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Lahore, Pakistan - Cultural heart of Pakistan"
                fill={true}
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h4 className="text-2xl font-bold text-white group-hover:text-blue-300 transition mb-2">
                  Lahore
                </h4>
                <p className="text-gray-200 mb-2">Cultural heart with Mughal architecture</p>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span>🏛️ Heritage</span>
                  <span>🍛 Food</span>
                  <span>🎭 Culture</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* International Destinations */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">🌍</span>
            International Getaways
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/destinations/dubai" className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <OptimizedImage
                src={getDestinationImage('dubai')}
                alt="Dubai, UAE - Luxury and innovation"
                fill={true}
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h4 className="text-2xl font-bold text-white group-hover:text-blue-300 transition mb-2">
                  Dubai, UAE
                </h4>
                <p className="text-gray-200 mb-2">Luxury shopping and modern architecture</p>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span>🏙️ Skyscrapers</span>
                  <span>🛍️ Shopping</span>
                  <span>🏖️ Beaches</span>
                </div>
              </div>
            </Link>

          
          <Link href="/destinations/bali" className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <OptimizedImage
              src={getDestinationImage('bali')}
              alt="Bali, Indonesia - Tropical paradise"
              fill={true}
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h4 className="text-2xl font-bold text-white group-hover:text-blue-300 transition mb-2">
                Bali, Indonesia
              </h4>
              <p className="text-gray-200 mb-2">Tropical paradise with stunning beaches</p>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <span>🏖️ Beaches</span>
                <span>🏛️ Temples</span>
                <span>🌅 Culture</span>
              </div>
            </div>
          </Link>
          
          <Link href="/destinations/tokyo" className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <OptimizedImage
              src={getDestinationImage('tokyo')}
              alt="Tokyo, Japan - Modern metropolis"
              fill={true}
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h4 className="text-2xl font-bold text-white group-hover:text-blue-300 transition mb-2">
                Tokyo, Japan
              </h4>
              <p className="text-gray-200 mb-2">Where tradition meets innovation</p>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <span>🏯 Temples</span>
                <span>🍣 Food</span>
                <span>🌸 Culture</span>
              </div>
            </div>
          </Link>
        </div>
        </div>
        <div className="text-center">
          <Link href="/destinations" className="inline-block px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-semibold text-lg">
            Explore All Destinations →
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book Your Perfect Trip
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need in one place
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/hotels" className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:scale-105 hover:border-blue-500">
              <div className="text-6xl mb-4">🏨</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition">Hotels & Resorts</h3>
              <p className="text-gray-600 mb-4">2M+ properties worldwide from budget to luxury</p>
              <span className="text-blue-600 font-semibold group-hover:underline">Search Hotels →</span>
            </Link>
            
            <Link href="/flights" className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:scale-105 hover:border-blue-500">
              <div className="text-6xl mb-4">✈️</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition">Flights</h3>
              <p className="text-gray-600 mb-4">Compare 500+ airlines and save up to 40%</p>
              <span className="text-blue-600 font-semibold group-hover:underline">Find Flights →</span>
            </Link>
            
            <Link href="/cars" className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:scale-105 hover:border-blue-500">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition">Car Rentals</h3>
              <p className="text-gray-600 mb-4">Rent from 500+ suppliers in 190+ countries</p>
              <span className="text-blue-600 font-semibold group-hover:underline">Rent a Car →</span>
            </Link>
            
            <Link href="/activities" className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:scale-105 hover:border-blue-500">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition">Activities</h3>
              <p className="text-gray-600 mb-4">Book tours, attractions, and experiences</p>
              <span className="text-blue-600 font-semibold group-hover:underline">Explore Activities →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* eSIM Promo Banner */}
      <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                Stay Connected Anywhere
              </h3>
              <p className="text-xl text-blue-50 mb-2">
                Travel eSIMs for 190+ countries • From $4.99
              </p>
              <p className="text-lg text-blue-100">
                ⚡ Instant activation • 🌍 Global coverage • 💰 No roaming fees
              </p>
            </div>
            <Link
              href="/esim"
              className="px-10 py-5 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition font-bold text-xl shadow-2xl transform hover:scale-105 whitespace-nowrap"
            >
              Browse eSIM Plans →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators & Stats */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions of Travelers
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="text-5xl font-bold text-blue-600 mb-3">2M+</div>
            <p className="text-gray-700 font-semibold text-lg mb-2">Hotels & Properties</p>
            <p className="text-gray-500">Worldwide coverage</p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl font-bold text-blue-600 mb-3">500+</div>
            <p className="text-gray-700 font-semibold text-lg mb-2">Airlines</p>
            <p className="text-gray-500">Best flight deals</p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl font-bold text-blue-600 mb-3">24/7</div>
            <p className="text-gray-700 font-semibold text-lg mb-2">Customer Support</p>
            <p className="text-gray-500">Always here to help</p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl font-bold text-blue-600 mb-3">190+</div>
            <p className="text-gray-700 font-semibold text-lg mb-2">Countries</p>
            <p className="text-gray-500">Global destinations</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Book with bookmethat?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600">Find a lower price? We'll match it and give you an extra 10% off</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">🆓</div>
              <h3 className="text-2xl font-bold mb-3">Free Cancellation</h3>
              <p className="text-gray-600">Plans change? Cancel for free on most bookings up to 24 hours before</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3">Instant Confirmation</h3>
              <p className="text-gray-600">Get your booking confirmation instantly via email</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Exclusive Travel Deals
            </h2>
            <p className="text-xl text-gray-600">
              Subscribe to our newsletter for discounts, travel tips, and destination guides
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}
