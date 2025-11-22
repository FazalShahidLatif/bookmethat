import Link from 'next/link';
import { Metadata } from 'next';
import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Book Hotels Worldwide - Best Prices & Deals 2025 | bookmethat',
  description: 'Find and book hotels at the best prices. 2M+ hotels worldwide, from budget to luxury. Free cancellation, instant confirmation, and price match guarantee.',
  keywords: ['book hotels', 'hotel booking', 'cheap hotels', 'hotel deals', 'accommodation', 'hotels near me', 'luxury hotels', 'budget hotels'],
  openGraph: {
    title: 'Book Hotels Worldwide - Best Prices & Deals',
    description: '2M+ hotels in 190+ countries. Compare prices, read reviews, book instantly.',
    url: 'https://bookmethat.com/hotels',
  },
};

export default function HotelsPage() {
  const featuredDestinations = [
    {
      name: 'Dubai',
      country: 'UAE',
      image: 'dubai',
      hotels: '2,500+',
      avgPrice: '$150',
      description: 'Luxury hotels, world-class shopping, and iconic architecture'
    },
    {
      name: 'Bali',
      country: 'Indonesia',
      image: 'bali',
      hotels: '5,000+',
      avgPrice: '$60',
      description: 'Beach resorts, jungle villas, and cultural experiences'
    },
    {
      name: 'Paris',
      country: 'France',
      image: 'paris',
      hotels: '4,200+',
      avgPrice: '$180',
      description: 'Boutique hotels near Eiffel Tower and Champs-Élysées'
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      image: 'tokyo',
      hotels: '3,800+',
      avgPrice: '$120',
      description: 'Modern hotels, traditional ryokans, and capsule hotels'
    },
    {
      name: 'Maldives',
      country: 'Maldives',
      image: 'maldives',
      hotels: '1,200+',
      avgPrice: '$400',
      description: 'Overwater bungalows and private island resorts'
    },
    {
      name: 'New York',
      country: 'USA',
      image: 'new-york',
      hotels: '5,500+',
      avgPrice: '$220',
      description: 'Manhattan hotels, Brooklyn boutiques, and airport convenience'
    }
  ];

  const hotelTypes = [
    {
      icon: '🏨',
      title: 'Hotels & Resorts',
      description: 'Full-service hotels with amenities like pools, restaurants, and concierge.',
      count: '1.5M+ properties'
    },
    {
      icon: '🏠',
      title: 'Vacation Rentals',
      description: 'Entire homes, apartments, and villas perfect for families and groups.',
      count: '800K+ properties'
    },
    {
      icon: '🏡',
      title: 'Boutique Hotels',
      description: 'Unique, design-focused hotels with personalized service.',
      count: '50K+ properties'
    },
    {
      icon: '🏕️',
      title: 'Hostels',
      description: 'Budget-friendly shared accommodations for backpackers and solo travelers.',
      count: '30K+ properties'
    },
    {
      icon: '⛰️',
      title: 'Lodges & Cabins',
      description: 'Mountain retreats, ski lodges, and countryside getaways.',
      count: '40K+ properties'
    },
    {
      icon: '🏖️',
      title: 'Beach Resorts',
      description: 'Oceanfront properties with private beaches and water activities.',
      count: '25K+ properties'
    }
  ];

  const features = [
    {
      icon: '💰',
      title: 'Best Price Guarantee',
      description: 'Find a lower price? We\'ll match it and give you 10% off.'
    },
    {
      icon: '🔒',
      title: 'Secure Booking',
      description: 'SSL encryption and PCI-compliant payment processing.'
    },
    {
      icon: '⚡',
      title: 'Instant Confirmation',
      description: 'Get your booking confirmation within seconds.'
    },
    {
      icon: '🔄',
      title: 'Free Cancellation',
      description: 'Cancel up to 24 hours before check-in on most bookings.'
    },
    {
      icon: '⭐',
      title: 'Verified Reviews',
      description: 'Read honest reviews from real travelers.'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Our customer service team is always available to help.'
    }
  ];

  const popularSearches = [
    'Hotels near me', 'Last minute hotel deals', 'Pet-friendly hotels',
    'Hotels with free breakfast', 'Extended stay hotels', 'Airport hotels',
    'Family hotels', 'Luxury hotels', 'Budget hotels', 'Boutique hotels',
    'Hotels with pool', 'Beachfront hotels', 'City center hotels', 'Spa hotels'
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

      {/* Hero Section with Search */}
      <section className="relative text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={getDestinationImage('hotel')}
            alt="Luxury hotel room"
            fill
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-indigo-900/90 to-purple-900/85" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Discover Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto">
              2 million+ hotels worldwide • Compare prices instantly • Book with confidence
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm mt-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl">💰</span>
                <span>Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🆓</span>
                <span>Free Cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">⚡</span>
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">⭐</span>
                <span>Verified Reviews</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto backdrop-blur-sm">
            <form action="/search/hotels" method="GET">
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🏨 Destination
                  </label>
                  <input 
                    type="text"
                    name="destination"
                    required
                    placeholder="Where do you want to stay?"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Check-in
                  </label>
                  <input 
                    type="date"
                    name="checkin"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Check-out
                  </label>
                  <input 
                    type="date"
                    name="checkout"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👥 Adults
                  </label>
                  <select name="adults" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4+ Adults</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👶 Children
                  </label>
                  <select name="children" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                    <option value="0">0 Children</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                    <option value="3">3+ Children</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🚪 Rooms
                  </label>
                  <select name="rooms" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                    <option value="1">1 Room</option>
                    <option value="2">2 Rooms</option>
                    <option value="3">3+ Rooms</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
                  >
                    🔍 Search Hotels
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              💡 <strong>Tip:</strong> Book 3+ months in advance for up to 40% off • Most hotels offer free cancellation
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2M+</div>
              <div className="text-blue-100 text-sm md:text-base">Hotels Worldwide</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">190+</div>
              <div className="text-blue-100 text-sm md:text-base">Countries Covered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50M+</div>
              <div className="text-blue-100 text-sm md:text-base">Happy Guests</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 text-sm md:text-base">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Book Hotels with bookmethat?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join millions of travelers who trust us for hassle-free hotel bookings
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Hotel Destinations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing hotels in the world's most sought-after destinations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <Link
                key={index}
                href={`/destinations/${destination.image}`}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="relative h-72">
                  <OptimizedImage
                    src={getDestinationImage(destination.image)}
                    alt={destination.name}
                    fill
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-blue-900/80 transition-all" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-200 transition">{destination.name}</h3>
                    <p className="text-blue-200 text-sm mb-3">{destination.country}</p>
                    <div className="flex justify-between items-center text-sm bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <span className="font-semibold">{destination.hotels} hotels</span>
                      <span className="font-bold text-green-300">From {destination.avgPrice}/night</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-white group-hover:bg-gray-50 transition">
                  <p className="text-gray-600 text-sm leading-relaxed">{destination.description}</p>
                  <div className="mt-3 text-blue-600 font-semibold text-sm flex items-center gap-2">
                    Explore Hotels <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Types */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore Hotel Types</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From budget hostels to luxury resorts, find the perfect accommodation for your travel style
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {hotelTypes.map((type, index) => (
              <Link
                key={index}
                href={`/hotels?type=${type.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-gray-100 group transform hover:scale-105"
              >
                <div className="text-6xl mb-5 group-hover:scale-110 transition-transform">{type.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition">{type.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{type.description}</p>
                <p className="text-blue-600 font-bold text-sm bg-blue-50 inline-block px-4 py-2 rounded-full">
                  {type.count}
                </p>
                <div className="mt-4 text-blue-600 font-semibold text-sm flex items-center gap-2">
                  Browse {type.title} <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How Hotel Booking Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Search</h3>
              <p className="text-gray-600 text-sm">
                Enter your destination, dates, and guest count to find available hotels
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">Compare</h3>
              <p className="text-gray-600 text-sm">
                Filter by price, rating, amenities, and read verified guest reviews
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Book</h3>
              <p className="text-gray-600 text-sm">
                Secure booking with instant confirmation and no hidden fees
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-bold mb-2">Enjoy</h3>
              <p className="text-gray-600 text-sm">
                Show up, check in, and enjoy your stay with 24/7 support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Searches */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Hotel Searches</h2>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {popularSearches.map((search, index) => (
              <a
                key={index}
                href={`/hotels/search?q=${encodeURIComponent(search)}`}
                className="bg-white px-6 py-3 rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition text-sm font-medium"
              >
                {search}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Perfect Hotel?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join 50 million+ travelers who trust bookmethat for their hotel bookings worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              🔍 Start Searching Hotels
            </a>
            <a 
              href="/help"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              💬 Need Help?
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-blue-200 text-sm">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">4.8★</div>
              <div className="text-blue-200 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">5M+</div>
              <div className="text-blue-200 text-sm">Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Remove duplicate footer */}
    </main>
      <Footer />
    </>
  );
}

