import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PriceAlertForm from '@/components/PriceAlertForm';

export const metadata: Metadata = {
  title: 'Search Hotels | Find & Compare Hotel Deals | bookmethat',
  description: 'Search and compare hotels worldwide. Find the best hotel deals, read reviews, and book with confidence. Free cancellation on most properties.',
  keywords: 'hotel search, compare hotels, hotel deals, cheap hotels, luxury hotels, hotel booking'
};

// Mock hotel data - in production, this would come from API
const hotels = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'Downtown Dubai, Dubai',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 2456,
    price: 189,
    originalPrice: 250,
    discount: 24,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
    badges: ['Free Cancellation', 'Pay at Property'],
    distance: '0.5 km from center'
  },
  {
    id: 2,
    name: 'Luxury Skyline Resort',
    location: 'Burj Khalifa Area, Dubai',
    image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 3201,
    price: 299,
    originalPrice: 399,
    discount: 25,
    amenities: ['Free WiFi', 'Pool', 'Airport Shuttle', 'Bar', 'Spa'],
    badges: ['Free Cancellation', 'Breakfast Included'],
    distance: '1.2 km from center'
  },
  {
    id: 3,
    name: 'City Center Inn',
    location: 'Business District, Dubai',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    reviews: 1876,
    price: 129,
    originalPrice: 180,
    discount: 28,
    amenities: ['Free WiFi', 'Restaurant', 'Parking', 'AC'],
    badges: ['Free Cancellation'],
    distance: '0.8 km from center'
  },
  {
    id: 4,
    name: 'Beachfront Paradise',
    location: 'Jumeirah Beach, Dubai',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 2890,
    price: 245,
    originalPrice: 320,
    discount: 23,
    amenities: ['Beach Access', 'Pool', 'Spa', 'Water Sports', 'Bar'],
    badges: ['Free Cancellation', 'Adults Only'],
    distance: '5.2 km from center'
  },
  {
    id: 5,
    name: 'Budget Stay Express',
    location: 'Airport Area, Dubai',
    image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    reviews: 1234,
    price: 79,
    originalPrice: 110,
    discount: 28,
    amenities: ['Free WiFi', 'Parking', 'AC', '24/7 Reception'],
    badges: ['Free Cancellation'],
    distance: '12 km from center'
  },
  {
    id: 6,
    name: 'Royal Palace Suite',
    location: 'Palm Jumeirah, Dubai',
    image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 5.0,
    reviews: 1567,
    price: 450,
    originalPrice: 600,
    discount: 25,
    amenities: ['Private Beach', 'Butler Service', 'Pool', 'Spa', 'Fine Dining'],
    badges: ['Free Cancellation', 'Breakfast Included', 'VIP'],
    distance: '8 km from center'
  },
];

export default function HotelSearchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <section className="bg-blue-600 text-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Search Hotels</h1>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg p-4">
              <div className="grid md:grid-cols-5 gap-3">
                <input
                  type="text"
                  placeholder="Where are you going?"
                  defaultValue="Dubai"
                  className="col-span-2 px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  defaultValue="2025-12-15"
                  className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  defaultValue="2025-12-20"
                  className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Filter by:</h2>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Your budget (per night)</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Under $100</span>
                      <span className="ml-auto text-xs text-gray-500">12</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">$100 - $200</span>
                      <span className="ml-auto text-xs text-gray-500">24</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">$200 - $300</span>
                      <span className="ml-auto text-xs text-gray-500">18</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Over $300</span>
                      <span className="ml-auto text-xs text-gray-500">8</span>
                    </label>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Star Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <label key={stars} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600" />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: stars }).map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                          {Array.from({ length: 5 - stars }).map((_, i) => (
                            <span key={i} className="text-gray-300">★</span>
                          ))}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Popular Filters</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Free WiFi</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Swimming Pool</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Free Parking</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Restaurant</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Spa</span>
                    </label>
                  </div>
                </div>

                {/* Guest Rating */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Guest Rating</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Exceptional (9+)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Wonderful (8+)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Very Good (7+)</span>
                    </label>
                  </div>
                </div>

                {/* Price Alert */}
                <div className="mt-8">
                  <PriceAlertForm defaultDestination="Dubai" defaultService="hotels" />
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Dubai: 62 properties found</h2>
                  <p className="text-sm text-gray-600">Showing results for December 15 - 20, 2025</p>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Our top picks</option>
                  <option>Price (lowest first)</option>
                  <option>Price (highest first)</option>
                  <option>Best reviewed</option>
                  <option>Distance from center</option>
                </select>
              </div>

              {/* Hotel Cards */}
              <div className="space-y-4">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                    <div className="grid md:grid-cols-4 gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-auto">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                        {hotel.discount > 0 && (
                          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                            -{hotel.discount}%
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="md:col-span-2 p-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
                          {hotel.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{hotel.location}</p>
                        <p className="text-xs text-gray-500 mb-3">📍 {hotel.distance}</p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {hotel.badges.map((badge, index) => (
                            <span
                              key={index}
                              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {hotel.amenities.slice(0, 5).map((amenity, index) => (
                            <span key={index} className="text-xs text-gray-600">
                              • {amenity}
                            </span>
                          ))}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm">
                            {hotel.rating}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {hotel.rating >= 4.7 ? 'Exceptional' : hotel.rating >= 4.5 ? 'Wonderful' : 'Very Good'}
                            </p>
                            <p className="text-xs text-gray-600">{hotel.reviews.toLocaleString()} reviews</p>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="p-4 flex flex-col justify-between items-end border-l">
                        <div className="text-right">
                          <p className="text-xs text-gray-500 line-through">${hotel.originalPrice}</p>
                          <p className="text-xs text-gray-600 mb-1">5 nights, 2 adults</p>
                          <p className="text-3xl font-bold text-gray-900">${hotel.price}</p>
                          <p className="text-xs text-gray-600">per night</p>
                          <p className="text-xs text-green-700 font-semibold mt-1">Save ${hotel.originalPrice - hotel.price}</p>
                        </div>
                        <div className="w-full">
                          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                            See availability
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Load More Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
