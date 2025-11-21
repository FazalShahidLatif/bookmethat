import { Metadata } from 'next';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';

export const metadata: Metadata = {
  title: 'About Us - bookmethat | Your Trusted Travel Partner',
  description: 'Learn about bookmethat mission to make travel booking simple, affordable, and accessible. Discover our story, values, and commitment to travelers worldwide.',
  keywords: 'about bookmethat, travel booking platform, OTA company, travel technology, booking service',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About bookmethat</h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Making travel accessible to everyone, everywhere
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              At bookmethat, we believe travel should be simple, affordable, and accessible to everyone. Founded in 2025, we set out to revolutionize the online travel booking experience by combining cutting-edge technology with genuine care for our customers.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our platform brings together millions of hotels, flights, car rentals, and activities from around the world, all in one place. But we're more than just a booking engine—we're your travel companion, helping you discover new destinations, find the best deals, and stay connected wherever you go.
            </p>
            <p className="text-lg text-gray-700">
              With innovative features like travel eSIMs and 24/7 customer support, we ensure your journey is smooth from planning to return. Whether you're a digital nomad, family traveler, or adventure seeker, bookmethat is here to make your travel dreams a reality.
            </p>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
            <OptimizedImage
              src={getDestinationImage('dubai')}
              alt="Travel destinations worldwide"
              fill
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Accessibility</h3>
              <p className="text-gray-600">
                We make travel accessible to everyone, regardless of location, budget, or experience level. Our platform breaks down barriers and opens doors to the world.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable Travel</h3>
              <p className="text-gray-600">
                We're committed to promoting sustainable tourism practices. We partner with eco-friendly hotels and encourage responsible travel that benefits local communities.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. From transparent pricing to responsive support, every decision we make is centered around providing you the best experience.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose bookmethat?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">🏨 2M+ Properties Worldwide</h3>
              <p className="text-gray-700">
                Access to over 2 million hotels, apartments, and vacation rentals across 190+ countries. From budget hostels to luxury resorts, we have options for every traveler.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">✈️ Best Price Guarantee</h3>
              <p className="text-gray-700">
                We compare prices across hundreds of booking sites to ensure you get the best deal. If you find a lower price, we'll match it—guaranteed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">📱 Stay Connected with eSIM</h3>
              <p className="text-gray-700">
                Exclusive travel eSIMs for 190+ countries. Instant activation, no roaming fees, and competitive data plans keep you connected throughout your journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">💳 Secure Booking</h3>
              <p className="text-gray-700">
                Bank-level encryption and PCI-compliant payment processing protect your personal and financial information. Book with confidence.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">🔄 Free Cancellation</h3>
              <p className="text-gray-700">
                Plans change—we get it. That's why most of our properties offer free cancellation up to 24-48 hours before check-in. Flexibility when you need it.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">⭐ Verified Reviews</h3>
              <p className="text-gray-700">
                Real reviews from real travelers. All reviews are verified by actual bookings, so you can trust the ratings and make informed decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-12 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">bookmethat by the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">2M+</div>
              <p className="text-blue-100">Properties Worldwide</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">190+</div>
              <p className="text-blue-100">Countries Covered</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Customer Support</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <p className="text-blue-100">Happy Travelers</p>
            </div>
          </div>
        </div>

        {/* Technology */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Built on Cutting-Edge Technology</h2>
          <p className="text-lg text-gray-700 mb-6">
            bookmethat is powered by modern technology designed for speed, reliability, and security. Our platform uses advanced algorithms to search millions of options in seconds, personalized recommendations based on your preferences, and real-time availability updates.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">Search results in under 2 seconds</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-sm text-gray-600">256-bit SSL encryption</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold text-gray-900 mb-2">Mobile Optimized</h3>
              <p className="text-sm text-gray-600">Book seamlessly on any device</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Join thousands of travelers who trust bookmethat for their adventures
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/search"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Explore Destinations
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
