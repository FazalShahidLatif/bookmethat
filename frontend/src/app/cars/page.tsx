import Link from 'next/link';
import { Metadata } from 'next';
import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';

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
    <main className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">bookmethat</Link>
          <div className="flex gap-6">
            <Link href="/hotels" className="text-gray-600 hover:text-gray-900 transition">Hotels</Link>
            <Link href="/flights" className="text-gray-600 hover:text-gray-900 transition">Flights</Link>
            <Link href="/cars" className="text-blue-600 font-semibold">Cars</Link>
            <Link href="/activities" className="text-gray-600 hover:text-gray-900 transition">Activities</Link>
          </div>
        </nav>
      </header>

      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <OptimizedImage
            src={getDestinationImage('adventure')}
            alt="Car rental"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">Rent a Car Anywhere</h1>
          <p className="text-xl mb-8 text-center text-blue-100 max-w-2xl mx-auto">
            Compare 500+ suppliers worldwide and save up to 30% on car rentals
          </p>
          
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Location</label>
                <input type="text" placeholder="City or airport" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
                <input type="text" placeholder="Same as pick-up" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Date & Time</label>
                <input type="datetime-local" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Date & Time</label>
                <input type="datetime-local" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition mt-6">
              Search Cars
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Choose Your Car Type</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {carTypes.map((car, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition border border-gray-200">
                <div className="text-5xl mb-4">{car.icon}</div>
                <h3 className="text-xl font-bold mb-2">{car.type}</h3>
                <p className="text-gray-600 mb-3">{car.description}</p>
                <p className="text-blue-600 font-bold text-lg">From {car.price}/day</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Car Rental Locations</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {locations.map((loc, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                <div className="relative h-40">
                  <OptimizedImage
                    src={getDestinationImage(loc.image)}
                    alt={`Car rentals in ${loc.city}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{loc.city}</h3>
                  <p className="text-gray-600 text-sm">{loc.country}</p>
                  <p className="text-blue-600 text-sm mt-2">{loc.cars} vehicles</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Hit the Road Today</h2>
          <p className="text-xl mb-8 text-blue-100">Find the perfect car for your journey</p>
          <a href="#" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition">
            Search Car Rentals
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 bookmethat. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
