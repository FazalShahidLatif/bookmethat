import Link from 'next/link';
import { Metadata } from 'next';
import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';

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
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">bookmethat</Link>
          <div className="flex gap-6">
            <Link href="/hotels" className="text-gray-600 hover:text-gray-900 transition">Hotels</Link>
            <Link href="/flights" className="text-blue-600 font-semibold">Flights</Link>
            <Link href="/cars" className="text-gray-600 hover:text-gray-900 transition">Cars</Link>
            <Link href="/activities" className="text-gray-600 hover:text-gray-900 transition">Activities</Link>
          </div>
        </nav>
      </header>

      {/* Hero with Search */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <OptimizedImage
            src={getDestinationImage('airport')}
            alt="Airport terminal"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">Find Cheap Flights</h1>
          <p className="text-xl mb-8 text-center text-blue-100 max-w-2xl mx-auto">
            Compare 500+ airlines and save up to 40% on your next flight. Instant booking confirmation.
          </p>
          
          {/* Flight Search */}
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto w-full">
            <div className="flex gap-4 mb-6">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="tripType" defaultChecked className="text-blue-600" />
                Round Trip
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="tripType" className="text-blue-600" />
                One Way
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="tripType" className="text-blue-600" />
                Multi-City
              </label>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <input 
                  type="text" 
                  placeholder="City or airport"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input 
                  type="text" 
                  placeholder="City or airport"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3+ Passengers</option>
                </select>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition mt-6">
              Search Flights
            </button>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Flight Routes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <div key={index} className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                <div className="relative h-48">
                  <OptimizedImage
                    src={getDestinationImage(route.image)}
                    alt={`Flights to ${route.to}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm mb-1">{route.from} → {route.to}</p>
                    <p className="text-2xl font-bold">From {route.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Book Flights with bookmethat?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">Find a lower price within 24 hours? We'll refund the difference.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Instant Confirmation</h3>
              <p className="text-gray-600">Get your e-ticket immediately after booking confirmation.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Need help? Our customer service team is always available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Fly?</h2>
          <p className="text-xl mb-8 text-blue-100">Start searching for your next flight today</p>
          <a href="#" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition">
            Search Flights
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 bookmethat. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
