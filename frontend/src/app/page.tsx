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
      <Header transparent={true} />
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
      {/* Hero Section with Background Image */}
      <section className="relative text-white py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={getDestinationImage('dubai')}
            alt="Travel destinations worldwide"
            fill={true}
            objectFit="cover"
            priority={true}
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Find your next adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 drop-shadow-md">
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

      {/* Popular Destinations */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Popular Destinations
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { name: 'Bali', slug: 'bali', desc: 'Tropical paradise' },
            { name: 'Paris', slug: 'paris', desc: 'City of lights' },
            { name: 'Tokyo', slug: 'tokyo', desc: 'Modern metropolis' },
          ].map((dest) => (
            <a 
              key={dest.slug}
              href={`/destinations/${dest.slug}`} 
              className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              <OptimizedImage
                src={getDestinationImage(dest.slug)}
                alt={`${dest.name} destination`}
                fill={true}
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition">
                    {dest.name}
                  </h3>
                  <p className="text-gray-200 text-sm">{dest.desc}</p>
                </div>
              </div>
            </a>
          ))}
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

      {/* Newsletter Section */}
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}
