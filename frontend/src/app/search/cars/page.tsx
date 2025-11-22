import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Search Car Rentals | Compare Prices & Book Online | bookmethat',
  description: 'Search and compare car rentals from 500+ suppliers worldwide. Find the best deals on economy, SUV, and luxury vehicles.',
  keywords: 'car rental search, compare car prices, rent a car, car hire, cheap car rentals'
};

// Mock car rental data
const cars = [
  {
    id: 1,
    name: 'Toyota Corolla',
    category: 'Economy',
    image: '🚗',
    supplier: 'Hertz',
    passengers: 5,
    bags: 2,
    transmission: 'Automatic',
    ac: true,
    price: 35,
    features: ['Unlimited Mileage', 'Airport Pickup', 'GPS Available'],
  },
  {
    id: 2,
    name: 'Honda CR-V',
    category: 'SUV',
    image: '🚙',
    supplier: 'Enterprise',
    passengers: 5,
    bags: 3,
    transmission: 'Automatic',
    ac: true,
    price: 55,
    features: ['Unlimited Mileage', 'GPS Included', 'Full Insurance'],
  },
  {
    id: 3,
    name: 'Mercedes E-Class',
    category: 'Luxury',
    image: '🚘',
    supplier: 'Sixt',
    passengers: 5,
    bags: 3,
    transmission: 'Automatic',
    ac: true,
    price: 120,
    features: ['Unlimited Mileage', 'GPS Included', 'Premium Insurance', 'Concierge Service'],
  },
  {
    id: 4,
    name: 'Ford Transit',
    category: 'Van',
    image: '🚐',
    supplier: 'Budget',
    passengers: 9,
    bags: 5,
    transmission: 'Automatic',
    ac: true,
    price: 80,
    features: ['Unlimited Mileage', 'GPS Available', 'Airport Pickup'],
  },
  {
    id: 5,
    name: 'BMW 3 Series Convertible',
    category: 'Convertible',
    image: '🏎️',
    supplier: 'Avis',
    passengers: 4,
    bags: 2,
    transmission: 'Automatic',
    ac: true,
    price: 95,
    features: ['Unlimited Mileage', 'GPS Included', 'Premium Audio'],
  },
];

export default function CarSearchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <section className="bg-orange-600 text-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Search Car Rentals</h1>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg p-4">
              <div className="grid md:grid-cols-5 gap-3">
                <input
                  type="text"
                  placeholder="Pick-up location"
                  defaultValue="Dubai Airport"
                  className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="datetime-local"
                  defaultValue="2025-12-15T10:00"
                  className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="Drop-off location"
                  defaultValue="Dubai Airport"
                  className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="datetime-local"
                  defaultValue="2025-12-20T10:00"
                  className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition font-semibold">
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
                
                {/* Car Type */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Car Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">Economy</span>
                      <span className="ml-auto text-xs text-gray-500">15</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">SUV</span>
                      <span className="ml-auto text-xs text-gray-500">8</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">Luxury</span>
                      <span className="ml-auto text-xs text-gray-500">5</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">Van</span>
                      <span className="ml-auto text-xs text-gray-500">4</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">Convertible</span>
                      <span className="ml-auto text-xs text-gray-500">3</span>
                    </label>
                  </div>
                </div>

                {/* Suppliers */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Rental Companies</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">Hertz</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">Enterprise</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">Sixt</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">Budget</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" defaultChecked />
                      <span className="text-sm text-gray-700">Avis</span>
                    </label>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-700">GPS Navigation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-700">Unlimited Mileage</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-700">Airport Pickup</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-700">Full Insurance</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Daily Budget</h3>
                  <input type="range" min="20" max="150" defaultValue="150" className="w-full" />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$20</span>
                    <span>$150</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-700">
                  <strong>{cars.length} cars</strong> available in Dubai
                </p>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Passenger Capacity</option>
                </select>
              </div>

              <div className="space-y-4">
                {cars.map((car) => (
                  <div key={car.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="text-8xl">{car.image}</div>
                        <p className="text-center text-sm text-gray-600 mt-2">{car.supplier}</p>
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                            <p className="text-sm text-gray-600">{car.category}</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                            Available
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl">👥</p>
                            <p className="text-sm text-gray-600">{car.passengers} seats</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl">💼</p>
                            <p className="text-sm text-gray-600">{car.bags} bags</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl">⚙️</p>
                            <p className="text-sm text-gray-600">{car.transmission}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl">❄️</p>
                            <p className="text-sm text-gray-600">{car.ac ? 'AC' : 'No AC'}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {car.features.map((feature, i) => (
                            <span key={i} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
                              ✓ {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-orange-600 mb-1">${car.price}</p>
                          <p className="text-sm text-gray-600">per day</p>
                          <p className="text-xs text-gray-500">5 days: ${car.price * 5}</p>
                        </div>
                        <Link 
                          href={`/cars/${car.id}`}
                          className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
                        >
                          Rent Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-8">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
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
