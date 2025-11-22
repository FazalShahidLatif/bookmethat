import Link from 'next/link';
import { Metadata } from 'next';
import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Book Cheap Flights - Compare Airlines & Find Best Deals 2025 | bookmethat',
  description: 'Search and book cheap flights to destinations worldwide. Compare 500+ airlines, get instant booking confirmation, and save up to 40% on airfare.',
  keywords: ['cheap flights', 'flight booking', 'airline tickets', 'flight deals', 'book flights', 'international flights', 'domestic flights'],
  openGraph: {
    title: 'Book Cheap Flights - Compare & Save',
    description: 'Compare 500+ airlines and find the cheapest flights. Instant booking, best price guarantee.',
    url: 'https://bookmethat.com/flights',
  },
};

export default function FlightsPage() {
  const popularRoutes = [
    { from: 'New York', to: 'London', price: '$350', image: 'london' },
    { from: 'Los Angeles', to: 'Tokyo', price: '$680', image: 'tokyo' },
    { from: 'Dubai', to: 'Paris', price: '$420', image: 'paris' },
    { from: 'Singapore', to: 'Bali', price: '$180', image: 'bali' },
    { from: 'London', to: 'Dubai', price: '$320', image: 'dubai' },
    { from: 'New York', to: 'Barcelona', price: '$410', image: 'barcelona' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

      {/* Hero with Search */}
      <section className="relative text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={getDestinationImage('airport')}
            alt="Airport terminal"
            fill
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-sky-900/90 to-indigo-900/85" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              ✈️ Fly Anywhere, Pay Less
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto">
              500+ airlines • 10,000+ routes • Save up to 40% on every flight
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm mt-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl">💰</span>
                <span>Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">⚡</span>
                <span>Instant E-Tickets</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🔄</span>
                <span>Free Cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🛡️</span>
                <span>Secure Booking</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Flight Search */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto backdrop-blur-sm">
            <form action="/search/flights" method="GET">
              <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-2 text-gray-700 font-semibold cursor-pointer">
                  <input type="radio" name="tripType" value="roundtrip" defaultChecked className="w-4 h-4 text-blue-600" />
                  Round Trip
                </label>
                <label className="flex items-center gap-2 text-gray-700 font-semibold cursor-pointer">
                  <input type="radio" name="tripType" value="oneway" className="w-4 h-4 text-blue-600" />
                  One Way
                </label>
                <label className="flex items-center gap-2 text-gray-700 font-semibold cursor-pointer">
                  <input type="radio" name="tripType" value="multicity" className="w-4 h-4 text-blue-600" />
                  Multi-City
                </label>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ✈️ From
                  </label>
                  <input 
                    type="text"
                    name="from"
                    required
                    placeholder="City or airport code (e.g., JFK, London)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🛬 To
                  </label>
                  <input 
                    type="text"
                    name="to"
                    required
                    placeholder="City or airport code (e.g., LAX, Tokyo)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Departure
                  </label>
                  <input 
                    type="date"
                    name="departure"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Return
                  </label>
                  <input 
                    type="date"
                    name="return"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👥 Passengers
                  </label>
                  <select name="passengers" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4+ Passengers</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg"
                  >
                    🔍 Search Flights
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              💡 <strong>Pro Tip:</strong> Book Tuesday-Thursday for cheapest fares • Flexible dates can save 30%+
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100 text-sm md:text-base">Airlines Partners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-blue-100 text-sm md:text-base">Flight Routes</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100M+</div>
              <div className="text-blue-100 text-sm md:text-base">Flights Booked</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 text-sm md:text-base">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Flight Routes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most booked routes with unbeatable prices
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {popularRoutes.map((route, index) => (
              <Link
                key={index}
                href={`/search/flights?from=${route.from}&to=${route.to}`}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="relative h-56">
                  <OptimizedImage
                    src={getDestinationImage(route.image)}
                    alt={`Flights to ${route.to}`}
                    fill
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-blue-900/80 transition-all" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-semibold">{route.from}</span>
                      <span className="text-2xl">✈️</span>
                      <span className="text-lg font-semibold">{route.to}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <span className="text-sm">Starting from</span>
                      <span className="text-3xl font-bold text-green-300">{route.price}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white group-hover:bg-gray-50 transition">
                  <div className="text-blue-600 font-semibold text-sm flex items-center justify-center gap-2">
                    View Flights <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Book Flights with bookmethat?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience hassle-free flight booking with unmatched benefits
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Best Price Guarantee</h3>
              <p className="text-gray-600 leading-relaxed">Find a lower price within 24 hours? We'll refund the difference plus give you a $50 credit.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Instant E-Tickets</h3>
              <p className="text-gray-600 leading-relaxed">Get your e-ticket immediately after booking confirmation. No waiting, no hassle.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">Need help? Our expert customer service team is always available to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Take Off? ✈️</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join 100 million+ travelers who've saved on flights with bookmethat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              🔍 Search Flights Now
            </a>
            <a 
              href="/help"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              💬 Got Questions?
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-1">40%</div>
              <div className="text-blue-200 text-sm">Average Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">4.7★</div>
              <div className="text-blue-200 text-sm">Customer Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">15M+</div>
              <div className="text-blue-200 text-sm">Reviews</div>
            </div>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}

