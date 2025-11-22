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
      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <OptimizedImage
            src={getDestinationImage('hotel')}
            alt="Luxury hotel room"
            fill
            objectFit="cover"
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">Find Your Perfect Hotel</h1>
          <p className="text-xl mb-8 text-center text-blue-100 max-w-2xl mx-auto">
            2 million+ hotels worldwide. Compare prices, read reviews, and book instantly with free cancellation.
          </p>
          
          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto w-full">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Where are you going?</label>
                <input 
                  type="text" 
                  placeholder="City, hotel, or destination"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>3 Adults</option>
                  <option>4+ Adults</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                  <option>0 Children</option>
                  <option>1 Child</option>
                  <option>2 Children</option>
                  <option>3+ Children</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rooms</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                  <option>1 Room</option>
                  <option>2 Rooms</option>
                  <option>3+ Rooms</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition mt-4">
              Search Hotels
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Book Hotels with bookmethat?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Popular Hotel Destinations</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Discover amazing hotels in the world's most sought-after destinations
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredDestinations.map((destination, index) => (
              <div key={index} className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                <div className="relative h-64">
                  <OptimizedImage
                    src={getDestinationImage(destination.image)}
                    alt={destination.name}
                    fill
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-blue-200 text-sm mb-2">{destination.country}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{destination.hotels} hotels</span>
                      <span className="text-sm font-semibold">From {destination.avgPrice}/night</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-600 text-sm">{destination.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Explore Hotel Types</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            From budget hostels to luxury resorts, find the perfect accommodation for your travel style
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {hotelTypes.map((type, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-200">
                <div className="text-5xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-3">{type.description}</p>
                <p className="text-blue-600 font-semibold text-sm">{type.count}</p>
              </div>
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Hotel?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join millions of travelers who trust bookmethat for their hotel bookings
          </p>
          <a 
            href="#"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition"
          >
            Start Searching Hotels
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 bookmethat. All rights reserved.</p>
          <div className="mt-4 flex gap-6 justify-center text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
      <Footer />
    </>
  );
}

