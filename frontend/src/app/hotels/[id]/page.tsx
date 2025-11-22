import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock hotel data - in production this would come from an API
const hotels = {
  '1': {
    id: '1',
    name: 'Burj Al Arab Jumeirah',
    location: 'Dubai, UAE',
    address: 'Jumeirah Street, Umm Suqeim 3, Dubai',
    rating: 5.0,
    reviews: 8542,
    pricePerNight: 1200,
    images: ['🏨', '🏊', '🍽️', '🛏️', '🌆'],
    description: 'Experience unparalleled luxury at the iconic Burj Al Arab. This 7-star hotel offers stunning views of the Arabian Gulf, world-class dining, and exceptional service.',
    amenities: [
      'Free WiFi',
      'Private Beach',
      'Infinity Pool',
      'Spa & Wellness',
      '24/7 Concierge',
      'Fine Dining',
      'Airport Transfer',
      'Butler Service',
      'Fitness Center',
      'Kids Club',
    ],
    roomTypes: [
      {
        id: 'deluxe',
        name: 'Deluxe King Suite',
        size: '170 sqm',
        beds: '1 King Bed',
        guests: 2,
        price: 1200,
        features: ['Ocean View', 'Private Balcony', 'Butler Service', 'Free Minibar'],
      },
      {
        id: 'panoramic',
        name: 'Panoramic Suite',
        size: '200 sqm',
        beds: '1 King Bed',
        guests: 3,
        price: 1800,
        features: ['180° Ocean View', 'Living Room', 'Dining Area', 'Jacuzzi'],
      },
      {
        id: 'royal',
        name: 'Royal Suite',
        size: '780 sqm',
        beds: '2 King Beds',
        guests: 6,
        price: 8000,
        features: ['Private Cinema', 'Full Floor', 'Private Elevator', 'Personal Chef'],
      },
    ],
    nearbyAttractions: [
      { name: 'Dubai Mall', distance: '5 km' },
      { name: 'Palm Jumeirah', distance: '3 km' },
      { name: 'Ski Dubai', distance: '12 km' },
      { name: 'Dubai Marina', distance: '8 km' },
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 48 hours before check-in',
      children: 'Children of all ages welcome',
      pets: 'Pets not allowed',
    },
  },
  // Add more hotels as needed
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const hotel = hotels[params.id as keyof typeof hotels];
  
  if (!hotel) {
    return {
      title: 'Hotel Not Found | bookmethat',
    };
  }

  return {
    title: `${hotel.name} - Book Now | bookmethat`,
    description: `${hotel.description.substring(0, 155)}...`,
    keywords: `${hotel.name}, hotel, ${hotel.location}, luxury accommodation, book hotel`,
  };
}

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const hotel = hotels[params.id as keyof typeof hotels];

  if (!hotel) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section with Images */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-4 gap-2 h-96">
              <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <span className="text-9xl">{hotel.images[0]}</span>
              </div>
              {hotel.images.slice(1, 5).map((img, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">{img}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                <p className="text-gray-600 flex items-center gap-2 mb-3">
                  📍 {hotel.address}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-2xl">★</span>
                    <span className="text-xl font-bold">{hotel.rating}</span>
                    <span className="text-gray-600">({hotel.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
                <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {hotel.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Types */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Rooms</h2>
                <div className="space-y-4">
                  {hotel.roomTypes.map((room) => (
                    <div key={room.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {room.size} • {room.beds} • Up to {room.guests} guests
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-blue-600">${room.price}</p>
                          <p className="text-sm text-gray-600">per night</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.features.map((feature, i) => (
                          <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                        Reserve Room
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Attractions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nearby Attractions</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {hotel.nearbyAttractions.map((attraction, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-700">{attraction.name}</span>
                      <span className="text-sm text-gray-500">{attraction.distance}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel Policies</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">Check-in:</p>
                    <p className="text-gray-700">{hotel.policies.checkIn}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Check-out:</p>
                    <p className="text-gray-700">{hotel.policies.checkOut}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Cancellation:</p>
                    <p className="text-gray-700">{hotel.policies.cancellation}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Children:</p>
                    <p className="text-gray-700">{hotel.policies.children}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pets:</p>
                    <p className="text-gray-700">{hotel.policies.pets}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-6 sticky top-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-600">From</p>
                  <p className="text-4xl font-bold text-blue-600 mb-1">${hotel.pricePerNight}</p>
                  <p className="text-sm text-gray-600">per night</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Check-in</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Check-out</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Guests</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5+ Guests</option>
                    </select>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg mb-4">
                  Check Availability
                </button>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">5 nights</span>
                    <span className="font-semibold">${hotel.pricePerNight * 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-semibold">$150</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-blue-600 text-lg">${hotel.pricePerNight * 5 + 150}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-center">
                  <p className="text-sm text-gray-600">✓ Free cancellation</p>
                  <p className="text-sm text-gray-600">✓ No prepayment needed</p>
                  <p className="text-sm text-gray-600">✓ Best price guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Search */}
          <div className="mt-8 text-center">
            <Link href="/search/hotels" className="text-blue-600 hover:text-blue-700 font-semibold">
              ← Back to Hotel Search
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
