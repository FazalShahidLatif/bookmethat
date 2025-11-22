import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Search Flights | Compare & Book Cheap Flights | bookmethat',
  description: 'Search and compare flights from 500+ airlines worldwide. Find the cheapest fares, flexible dates, and book with confidence.',
  keywords: 'flight search, compare flights, cheap flights, airline tickets, flight deals, book flights'
};

// Mock flight data
const flights = [
  {
    id: 1,
    airline: 'Emirates',
    logo: '✈️',
    departure: { time: '10:30', airport: 'JFK', city: 'New York' },
    arrival: { time: '06:45+1', airport: 'DXB', city: 'Dubai' },
    duration: '12h 15m',
    stops: 'Direct',
    price: 680,
    class: 'Economy',
    baggage: '2x23kg',
    amenities: ['WiFi', 'Meals', 'Entertainment'],
  },
  {
    id: 2,
    airline: 'Turkish Airlines',
    logo: '✈️',
    departure: { time: '14:20', airport: 'JFK', city: 'New York' },
    arrival: { time: '13:30+1', airport: 'DXB', city: 'Dubai' },
    duration: '15h 10m',
    stops: '1 Stop (IST)',
    price: 520,
    class: 'Economy',
    baggage: '2x23kg',
    amenities: ['Meals', 'Entertainment'],
  },
  {
    id: 3,
    airline: 'Lufthansa',
    logo: '✈️',
    departure: { time: '18:45', airport: 'JFK', city: 'New York' },
    arrival: { time: '19:20+1', airport: 'DXB', city: 'Dubai' },
    duration: '16h 35m',
    stops: '1 Stop (FRA)',
    price: 495,
    class: 'Economy',
    baggage: '1x23kg',
    amenities: ['Meals', 'Entertainment'],
  },
  {
    id: 4,
    airline: 'Qatar Airways',
    logo: '✈️',
    departure: { time: '22:00', airport: 'JFK', city: 'New York' },
    arrival: { time: '22:15+1', airport: 'DXB', city: 'Dubai' },
    duration: '16h 15m',
    stops: '1 Stop (DOH)',
    price: 545,
    class: 'Economy',
    baggage: '2x23kg',
    amenities: ['WiFi', 'Meals', 'Entertainment', 'Lounge Access'],
  },
];

export default function FlightSearchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <section className="bg-blue-600 text-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Search Flights</h1>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg p-4">
              <div className="grid md:grid-cols-6 gap-3">
                <input
                  type="text"
                  placeholder="From"
                  defaultValue="New York (JFK)"
                  className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="To"
                  defaultValue="Dubai (DXB)"
                  className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <select className="px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3+ Passengers</option>
                </select>
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
                
                {/* Stops */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Stops</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">Direct</span>
                      <span className="ml-auto text-xs text-gray-500">1</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">1 Stop</span>
                      <span className="ml-auto text-xs text-gray-500">3</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">2+ Stops</span>
                      <span className="ml-auto text-xs text-gray-500">8</span>
                    </label>
                  </div>
                </div>

                {/* Airlines */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Airlines</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">Emirates</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">Turkish Airlines</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">Lufthansa</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">Qatar Airways</span>
                    </label>
                  </div>
                </div>

                {/* Departure Time */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Departure Time</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Morning (6am-12pm)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Afternoon (12pm-6pm)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Evening (6pm-12am)</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                  <input type="range" min="400" max="800" defaultValue="800" className="w-full" />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$400</span>
                    <span>$800</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-700">
                  <strong>{flights.length} flights</strong> found for New York → Dubai
                </p>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Best</option>
                  <option>Cheapest</option>
                  <option>Fastest</option>
                  <option>Earliest Departure</option>
                </select>
              </div>

              <div className="space-y-4">
                {flights.map((flight) => (
                  <div key={flight.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">{flight.logo}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{flight.airline}</p>
                            <p className="text-sm text-gray-600">{flight.class}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{flight.departure.time}</p>
                            <p className="text-sm text-gray-600">{flight.departure.airport}</p>
                            <p className="text-xs text-gray-500">{flight.departure.city}</p>
                          </div>
                          
                          <div className="flex-1 text-center">
                            <p className="text-sm text-gray-600 mb-1">{flight.duration}</p>
                            <div className="relative">
                              <div className="h-0.5 bg-gray-300"></div>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <span className="text-xs text-gray-600">{flight.stops}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{flight.arrival.time}</p>
                            <p className="text-sm text-gray-600">{flight.arrival.airport}</p>
                            <p className="text-xs text-gray-500">{flight.arrival.city}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4 flex-wrap">
                          {flight.amenities.map((amenity, i) => (
                            <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                            {flight.baggage}
                          </span>
                        </div>
                      </div>

                      <div className="text-center md:text-right">
                        <p className="text-3xl font-bold text-blue-600 mb-2">${flight.price}</p>
                        <Link 
                          href={`/flights/${flight.id}`}
                          className="block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                          Select Flight
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-8">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
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
