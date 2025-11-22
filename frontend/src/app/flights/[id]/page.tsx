import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock flight data
const flights = {
  '1': {
    id: '1',
    airline: 'Emirates',
    logo: '✈️',
    flightNumber: 'EK 201',
    aircraft: 'Boeing 777-300ER',
    departure: {
      time: '10:30',
      date: 'Dec 15, 2025',
      airport: 'JFK',
      airportName: 'John F. Kennedy International',
      city: 'New York',
      terminal: 'Terminal 4',
    },
    arrival: {
      time: '06:45+1',
      date: 'Dec 16, 2025',
      airport: 'DXB',
      airportName: 'Dubai International Airport',
      city: 'Dubai',
      terminal: 'Terminal 3',
    },
    duration: '12h 15m',
    stops: 'Direct',
    price: 680,
    classes: [
      { type: 'Economy', price: 680, available: 15 },
      { type: 'Premium Economy', price: 1200, available: 8 },
      { type: 'Business', price: 3500, available: 5 },
      { type: 'First Class', price: 7200, available: 2 },
    ],
    amenities: ['WiFi', 'In-flight Entertainment', 'Meals Included', 'Power Outlets', 'USB Ports'],
    baggage: {
      cabin: '7kg carry-on',
      checked: '2x23kg checked bags',
    },
    services: [
      'Priority boarding',
      'Seat selection',
      'Extra legroom seats available',
      'Special meal requests',
      'Lounge access (Business/First)',
    ],
  },
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const flight = flights[params.id as keyof typeof flights];
  
  if (!flight) {
    return {
      title: 'Flight Not Found | bookmethat',
    };
  }

  return {
    title: `${flight.airline} ${flight.flightNumber} - Book Flight | bookmethat`,
    description: `Book ${flight.airline} flight from ${flight.departure.city} to ${flight.arrival.city}. ${flight.duration} ${flight.stops} flight.`,
  };
}

export default function FlightDetailPage({ params }: { params: { id: string } }) {
  const flight = flights[params.id as keyof typeof flights];

  if (!flight) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Flight Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">{flight.logo}</span>
              <div>
                <h1 className="text-3xl font-bold">{flight.airline}</h1>
                <p className="text-blue-100">Flight {flight.flightNumber} • {flight.aircraft}</p>
              </div>
            </div>
            
            {/* Route Summary */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Departure</p>
                  <p className="text-4xl font-bold">{flight.departure.time}</p>
                  <p className="text-lg">{flight.departure.airport}</p>
                  <p className="text-blue-100 text-sm">{flight.departure.date}</p>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <p className="text-sm mb-2">{flight.duration}</p>
                  <div className="relative w-full">
                    <div className="h-0.5 bg-white/50"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 px-3 py-1 rounded-full text-xs">
                      {flight.stops}
                    </div>
                  </div>
                  <p className="text-blue-100 text-xs mt-2">Non-stop</p>
                </div>
                
                <div>
                  <p className="text-blue-100 text-sm mb-1">Arrival</p>
                  <p className="text-4xl font-bold">{flight.arrival.time}</p>
                  <p className="text-lg">{flight.arrival.airport}</p>
                  <p className="text-blue-100 text-sm">{flight.arrival.date}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Flight Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Flight Details</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">Departure</p>
                      <p className="text-gray-700">{flight.departure.airportName}</p>
                      <p className="text-sm text-gray-600">{flight.departure.terminal}</p>
                      <p className="text-sm text-gray-600">{flight.departure.city}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Arrival</p>
                      <p className="text-gray-700">{flight.arrival.airportName}</p>
                      <p className="text-sm text-gray-600">{flight.arrival.terminal}</p>
                      <p className="text-sm text-gray-600">{flight.arrival.city}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-gray-900 mb-2">Aircraft</p>
                    <p className="text-gray-700">{flight.aircraft}</p>
                  </div>
                </div>
              </div>

              {/* Cabin Classes */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Class</h2>
                <div className="space-y-4">
                  {flight.classes.map((cabinClass) => (
                    <div key={cabinClass.type} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{cabinClass.type}</h3>
                          <p className="text-sm text-gray-600">{cabinClass.available} seats available</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-blue-600">${cabinClass.price}</p>
                          <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {flight.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Baggage */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Baggage Allowance</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎒</span>
                    <div>
                      <p className="font-semibold text-gray-900">Cabin Baggage</p>
                      <p className="text-gray-700">{flight.baggage.cabin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🧳</span>
                    <div>
                      <p className="font-semibold text-gray-900">Checked Baggage</p>
                      <p className="text-gray-700">{flight.baggage.checked}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Services</h2>
                <div className="space-y-2">
                  {flight.services.map((service, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-6 sticky top-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-600">Starting from</p>
                  <p className="text-4xl font-bold text-blue-600 mb-1">${flight.price}</p>
                  <p className="text-sm text-gray-600">per person</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Cabin Class</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {flight.classes.map((c) => (
                        <option key={c.type} value={c.type}>
                          {c.type} - ${c.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Passengers</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3 Passengers</option>
                      <option>4 Passengers</option>
                    </select>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg mb-4">
                  Book Now
                </button>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">1 passenger</span>
                    <span className="font-semibold">${flight.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & fees</span>
                    <span className="font-semibold">$85</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-blue-600 text-lg">${flight.price + 85}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-center">
                  <p className="text-sm text-gray-600">✓ Instant confirmation</p>
                  <p className="text-sm text-gray-600">✓ Free cancellation (24h)</p>
                  <p className="text-sm text-gray-600">✓ Best price guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Search */}
          <div className="mt-8 text-center">
            <Link href="/search/flights" className="text-blue-600 hover:text-blue-700 font-semibold">
              ← Back to Flight Search
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
