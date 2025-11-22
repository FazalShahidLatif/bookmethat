import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Search Activities & Tours | Things to Do Worldwide | bookmethat',
  description: 'Discover and book amazing activities, tours, and experiences worldwide. From city tours to adventure sports.',
  keywords: 'activities search, tours, things to do, experiences, attractions, sightseeing'
};

// Mock activities data
const activities = [
  {
    id: 1,
    title: 'Burj Khalifa: At the Top Sky Experience',
    location: 'Dubai, UAE',
    image: '🏙️',
    category: 'City Tours',
    duration: '2 hours',
    rating: 4.9,
    reviews: 12543,
    price: 89,
    highlights: ['Level 124 & 125 Access', 'Sky Lounge', 'Sunset Timing', 'Skip the Line'],
    type: 'Skip-the-Line',
  },
  {
    id: 2,
    title: 'Desert Safari with BBQ Dinner & Show',
    location: 'Dubai, UAE',
    image: '🏜️',
    category: 'Adventure',
    duration: '6 hours',
    rating: 4.8,
    reviews: 8432,
    price: 65,
    highlights: ['Dune Bashing', 'Camel Ride', 'BBQ Dinner', 'Belly Dance Show'],
    type: 'Most Popular',
  },
  {
    id: 3,
    title: 'Dubai Marina Yacht Cruise',
    location: 'Dubai Marina, UAE',
    image: '⛵',
    category: 'Water Sports',
    duration: '3 hours',
    rating: 4.7,
    reviews: 3221,
    price: 120,
    highlights: ['Private Yacht', 'Professional Crew', 'Refreshments', 'Swimming Stop'],
    type: 'Luxury',
  },
  {
    id: 4,
    title: 'Abu Dhabi City Tour & Grand Mosque',
    location: 'Abu Dhabi, UAE',
    image: '🕌',
    category: 'Cultural',
    duration: '8 hours',
    rating: 4.6,
    reviews: 5634,
    price: 75,
    highlights: ['Sheikh Zayed Mosque', 'Heritage Village', 'Louvre Museum', 'Lunch Included'],
    type: 'Full Day',
  },
  {
    id: 5,
    title: 'Skydiving Experience Over Palm Jumeirah',
    location: 'Dubai, UAE',
    image: '🪂',
    category: 'Adventure',
    duration: '4 hours',
    rating: 5.0,
    reviews: 2187,
    price: 399,
    highlights: ['13,000ft Jump', 'Tandem Jump', 'HD Video & Photos', 'Certified Instructors'],
    type: 'Extreme',
  },
  {
    id: 6,
    title: 'Dubai Food Tour - Old Dubai',
    location: 'Old Dubai, UAE',
    image: '🍽️',
    category: 'Food & Drink',
    duration: '4 hours',
    rating: 4.9,
    reviews: 1876,
    price: 55,
    highlights: ['15+ Food Tastings', 'Local Guide', 'Traditional Markets', 'Cultural Stories'],
    type: 'Small Group',
  },
  {
    id: 7,
    title: 'Jet Ski Adventure at JBR Beach',
    location: 'JBR Beach, Dubai',
    image: '🚤',
    category: 'Water Sports',
    duration: '1 hour',
    rating: 4.7,
    reviews: 4532,
    price: 95,
    highlights: ['30min Ride', 'Safety Briefing', 'Professional Guide', 'Equipment Included'],
    type: 'Adrenaline',
  },
  {
    id: 8,
    title: 'Hot Air Balloon Ride at Sunrise',
    location: 'Dubai Desert, UAE',
    image: '🎈',
    category: 'Adventure',
    duration: '4 hours',
    rating: 4.9,
    reviews: 3421,
    price: 249,
    highlights: ['1 Hour Flight', 'Sunrise Views', 'Gourmet Breakfast', 'Wildlife Viewing'],
    type: 'Unique',
  },
];

export default function ActivitiesSearchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <section className="bg-gradient-to-r from-purple-900 via-pink-800 to-orange-700 text-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Search Activities & Tours</h1>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg p-4">
              <div className="grid md:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Where are you going?"
                  defaultValue="Dubai, UAE"
                  className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="date"
                  defaultValue="2025-12-15"
                  className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <select className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>All Categories</option>
                  <option>City Tours</option>
                  <option>Adventure</option>
                  <option>Water Sports</option>
                  <option>Cultural</option>
                  <option>Food & Drink</option>
                </select>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold">
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
                
                {/* Category */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-purple-600" defaultChecked />
                      <span className="text-sm text-gray-700">City Tours</span>
                      <span className="ml-auto text-xs text-gray-500">24</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-purple-600" defaultChecked />
                      <span className="text-sm text-gray-700">Adventure</span>
                      <span className="ml-auto text-xs text-gray-500">18</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-purple-600" defaultChecked />
                      <span className="text-sm text-gray-700">Water Sports</span>
                      <span className="ml-auto text-xs text-gray-500">15</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-purple-600" defaultChecked />
                      <span className="text-sm text-gray-700">Cultural</span>
                      <span className="ml-auto text-xs text-gray-500">12</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-purple-600" defaultChecked />
                      <span className="text-sm text-gray-700">Food & Drink</span>
                      <span className="ml-auto text-xs text-gray-500">10</span>
                    </label>
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Duration</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="duration" className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Under 2 hours</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="duration" className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">2-4 hours</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="duration" className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">4-8 hours</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="duration" className="w-4 h-4 text-purple-600" defaultChecked />
                      <span className="text-sm text-gray-700">All Durations</span>
                    </label>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="rating" className="w-4 h-4 text-purple-600" defaultChecked />
                      <span className="text-sm text-gray-700">⭐ 4.5+</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="rating" className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">⭐ 4.0+</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="rating" className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">⭐ 3.5+</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                  <input type="range" min="0" max="500" defaultValue="500" className="w-full" />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$0</span>
                    <span>$500</span>
                  </div>
                </div>

                {/* Special Offers */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Special Offers</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Free Cancellation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Skip the Line</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Private Tour</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-700">
                  <strong>{activities.length} activities</strong> found in Dubai
                </p>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                  <option>Duration: Short to Long</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <span className="text-8xl">{activity.image}</span>
                      </div>
                      <span className="absolute top-3 right-3 bg-white text-purple-700 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {activity.type}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 flex-1">{activity.title}</h3>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">📍 {activity.location}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-500 font-semibold">★ {activity.rating}</span>
                        <span className="text-sm text-gray-600">({activity.reviews.toLocaleString()} reviews)</span>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-700">
                        <span className="flex items-center gap-1">
                          ⏱️ {activity.duration}
                        </span>
                        <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded">
                          {activity.category}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-gray-600 font-semibold mb-2">HIGHLIGHTS:</p>
                        <div className="flex flex-wrap gap-1">
                          {activity.highlights.slice(0, 3).map((highlight, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              ✓ {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-600">From</p>
                          <p className="text-2xl font-bold text-purple-600">${activity.price}</p>
                          <p className="text-xs text-gray-500">per person</p>
                        </div>
                        <Link 
                          href={`/activities/${activity.id}`}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold text-sm"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-8">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
