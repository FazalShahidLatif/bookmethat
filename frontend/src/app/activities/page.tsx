import Link from 'next/link';
import { Metadata } from 'next';
import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Tours & Activities - Book Experiences Worldwide 2025 | bookmethat',
  description: 'Discover and book tours, activities, and experiences in 5,000+ destinations. Skip-the-line tickets, guided tours, and unique local experiences.',
  keywords: ['tours', 'activities', 'things to do', 'attractions', 'experiences', 'guided tours', 'skip the line tickets'],
  openGraph: {
    title: 'Book Tours & Activities Worldwide',
    description: 'Discover unique experiences and activities in 5,000+ destinations.',
    url: 'https://bookmethat.com/activities',
  },
};

export default function ActivitiesPage() {
  const categories = [
    { name: 'City Tours', icon: '🏙️', count: '10K+' },
    { name: 'Adventure', icon: '🏔️', count: '5K+' },
    { name: 'Food & Drink', icon: '🍷', count: '3K+' },
    { name: 'Water Sports', icon: '🏄', count: '2K+' },
    { name: 'Cultural', icon: '🎭', count: '8K+' },
    { name: 'Day Trips', icon: '🚌', count: '6K+' },
  ];

  const featured = [
    { name: 'Burj Khalifa Skip-the-Line', location: 'Dubai', price: '$45', image: 'dubai' },
    { name: 'Eiffel Tower Guided Tour', location: 'Paris', price: '$60', image: 'paris' },
    { name: 'Tokyo Food Walking Tour', location: 'Tokyo', price: '$75', image: 'tokyo' },
    { name: 'Bali Waterfall Trek', location: 'Bali', price: '$35', image: 'bali' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

      <section className="relative text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={getDestinationImage('adventure')}
            alt="Activities and tours"
            fill
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-pink-900/90 to-orange-900/85" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              🌍 Discover Amazing Experiences
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-4 max-w-3xl mx-auto">
              5,000+ destinations • 100K+ activities • Skip-the-line access • Local guides
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm mt-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🎫</span>
                <span>Skip-the-Line Tickets</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">👥</span>
                <span>Expert Local Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">⭐</span>
                <span>Verified Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🆓</span>
                <span>Free Cancellation</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto backdrop-blur-sm">
            <form action="/search/activities" method="GET">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📍 Destination or Activity
                  </label>
                  <input 
                    type="text"
                    name="destination"
                    required
                    placeholder="e.g., Paris, Bali, Dubai, or 'Food Tour'"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Date
                  </label>
                  <input 
                    type="date"
                    name="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all shadow-lg"
                  >
                    🔍 Search
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              💡 <strong>Popular:</strong> Skip-the-line tickets • Food tours • Day trips • Adventure activities
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
              <div className="text-purple-100 text-sm md:text-base">Destinations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100K+</div>
              <div className="text-purple-100 text-sm md:text-base">Activities & Tours</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">30M+</div>
              <div className="text-purple-100 text-sm md:text-base">Bookings Made</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8★</div>
              <div className="text-purple-100 text-sm md:text-base">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect experience for every type of traveler
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/search/activities?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-2xl transition-all border border-gray-200 group text-center transform hover:scale-105"
              >
                <div className="text-6xl mb-5 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition">{cat.name}</h3>
                <p className="text-purple-600 font-bold text-lg bg-white inline-block px-4 py-2 rounded-full">
                  {cat.count} activities
                </p>
                <div className="mt-4 text-purple-600 font-semibold text-sm flex items-center justify-center gap-2">
                  Explore {cat.name} <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Activities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Most popular experiences worldwide - book now and skip the lines!
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {featured.map((activity, index) => (
              <Link
                key={index}
                href={`/activities/${activity.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group transform hover:scale-105"
              >
                <div className="relative h-52">
                  <OptimizedImage
                    src={getDestinationImage(activity.image)}
                    alt={activity.name}
                    fill
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-purple-900/70 transition" />
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ POPULAR
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-white font-bold text-lg mb-1 group-hover:text-purple-200 transition">
                      {activity.name}
                    </div>
                    <div className="text-purple-200 text-sm">📍 {activity.location}</div>
                  </div>
                </div>
                <div className="p-4 bg-white group-hover:bg-gray-50 transition">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">From</span>
                    <span className="text-purple-600 font-bold text-2xl">{activity.price}</span>
                  </div>
                  <div className="mt-2 text-purple-600 font-semibold text-sm flex items-center justify-center gap-2">
                    View Details <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">🌟 Start Your Next Adventure!</h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Join 30 million+ travelers who've booked unforgettable experiences with bookmethat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              🔍 Browse All Activities
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
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-purple-200 text-sm">Customer Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">4.8★</div>
              <div className="text-purple-200 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">12M+</div>
              <div className="text-purple-200 text-sm">Reviews</div>
            </div>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
