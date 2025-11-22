import Link from 'next/link';
import { Metadata } from 'next';
import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Car Rentals Worldwide - Compare Prices & Book Online 2025 | bookmethat',
  description: 'Rent a car for your next trip. Compare prices from 500+ suppliers worldwide. Free cancellation, no hidden fees, and instant confirmation.',
  keywords: ['car rental', 'rent a car', 'car hire', 'cheap car rentals', 'airport car rental', 'SUV rental', 'economy car rental'],
  openGraph: {
    title: 'Car Rentals - Best Prices Worldwide',
    description: 'Compare 500+ car rental suppliers. Free cancellation, instant confirmation.',
    url: 'https://bookmethat.com/cars',
  },
};

export default function CarsPage() {
  const carTypes = [
    { type: 'Economy', icon: '🚗', price: '$25', description: 'Perfect for city driving and budget travelers' },
    { type: 'Compact', icon: '🚙', price: '$30', description: 'Fuel-efficient with extra space' },
    { type: 'SUV', icon: '🚐', price: '$55', description: 'Spacious for families and adventures' },
    { type: 'Luxury', icon: '🚘', price: '$120', description: 'Premium vehicles for special occasions' },
    { type: 'Van', icon: '🚐', price: '$80', description: '7-9 seater for groups' },
    { type: 'Convertible', icon: '🏎️', price: '$90', description: 'Drive with the top down' },
  ];

  const locations = [
    { city: 'Dubai', country: 'UAE', cars: '500+', image: 'dubai' },
    { city: 'Los Angeles', country: 'USA', cars: '800+', image: 'new-york' },
    { city: 'London', country: 'UK', cars: '600+', image: 'london' },
    { city: 'Barcelona', country: 'Spain', cars: '400+', image: 'barcelona' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

      <section className="relative text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={getDestinationImage('adventure')}
            alt="Car rental"
            fill
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/95 via-red-900/90 to-purple-900/85" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              🚗 Rent a Car, Drive Your Way
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-4 max-w-3xl mx-auto">
              500+ suppliers worldwide • Every car type • Save up to 30% instantly
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
                <span className="text-3xl">🛡️</span>
                <span>Secure Booking</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto backdrop-blur-sm">
            <form action="/search/cars" method="GET">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📍 Pick-up Location
                  </label>
                  <input 
                    type="text"
                    name="pickup"
                    required
                    placeholder="City, airport, or address"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📍 Drop-off Location
                  </label>
                  <input 
                    type="text"
                    name="dropoff"
                    placeholder="Same as pick-up or different location"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Pick-up Date & Time
                  </label>
                  <input 
                    type="datetime-local"
                    name="pickup_time"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Drop-off Date & Time
                  </label>
                  <input 
                    type="datetime-local"
                    name="dropoff_time"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all shadow-lg"
                  >
                    🔍 Search Cars
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              💡 <strong>Tip:</strong> Pick-up at city locations often cheaper than airports • Book early for better selection
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-orange-100 text-sm md:text-base">Car Rental Suppliers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5000+</div>
              <div className="text-orange-100 text-sm md:text-base">Pickup Locations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">20M+</div>
              <div className="text-orange-100 text-sm md:text-base">Cars Rented</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-orange-100 text-sm md:text-base">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Perfect Car</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From economy to luxury, find the right vehicle for every journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {carTypes.map((car, index) => (
              <Link
                key={index}
                href={`/search/cars?type=${car.type.toLowerCase()}`}
                className="bg-gradient-to-br from-gray-50 to-orange-50 p-8 rounded-2xl hover:shadow-2xl transition-all border border-gray-200 group transform hover:scale-105"
              >
                <div className="text-6xl mb-5 group-hover:scale-110 transition-transform">{car.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-orange-600 transition">{car.type}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{car.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-orange-600 font-bold text-2xl">From {car.price}<span className="text-sm">/day</span></p>
                  <span className="text-orange-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Rental Locations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thousands of pickup points in major cities and airports worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {locations.map((loc, index) => (
              <Link
                key={index}
                href={`/search/cars?location=${loc.city.toLowerCase()}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group transform hover:scale-105"
              >
                <div className="relative h-48">
                  <OptimizedImage
                    src={getDestinationImage(loc.image)}
                    alt={`Car rentals in ${loc.city}`}
                    fill
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-orange-900/70 transition" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-xl mb-1 group-hover:text-orange-200 transition">{loc.city}</h3>
                    <p className="text-orange-200 text-sm">{loc.country}</p>
                  </div>
                </div>
                <div className="p-4 bg-white group-hover:bg-gray-50 transition">
                  <p className="text-orange-600 font-bold text-sm">{loc.cars} vehicles available</p>
                  <div className="mt-2 text-gray-700 font-semibold text-sm flex items-center gap-2">
                    Browse Cars <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">🚗 Hit the Road Today!</h2>
          <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto leading-relaxed">
            Join 20 million+ travelers who've saved on car rentals with bookmethat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              🔍 Search Car Rentals
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
              <div className="text-3xl font-bold mb-1">30%</div>
              <div className="text-orange-200 text-sm">Average Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">4.6★</div>
              <div className="text-orange-200 text-sm">Customer Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">8M+</div>
              <div className="text-orange-200 text-sm">Reviews</div>
            </div>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}

