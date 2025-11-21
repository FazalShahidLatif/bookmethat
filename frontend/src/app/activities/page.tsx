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

      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <OptimizedImage
            src={getDestinationImage('adventure')}
            alt="Activities and tours"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Amazing Experiences</h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Book tours, activities, and attractions in 5,000+ destinations worldwide
          </p>
          <div className="max-w-2xl mx-auto w-full">
            <input 
              type="text" 
              placeholder="Where do you want to explore?"
              className="w-full px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition text-center border border-gray-200">
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                <p className="text-blue-600 font-semibold">{cat.count} activities</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Activities</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {featured.map((activity, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                <div className="relative h-48">
                  <OptimizedImage
                    src={getDestinationImage(activity.image)}
                    alt={activity.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{activity.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">📍 {activity.location}</p>
                  <p className="text-blue-600 font-bold">From {activity.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Adventure</h2>
          <p className="text-xl mb-8 text-blue-100">Explore unique activities and experiences</p>
          <a href="#" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition">
            Browse Activities
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 bookmethat. All rights reserved.</p>
        </div>
      </footer>
    </main>
      <Footer />
    </>
  );
}
