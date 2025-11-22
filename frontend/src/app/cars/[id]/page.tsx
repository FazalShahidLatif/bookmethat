import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock car rental data
const cars = {
  '1': {
    id: '1',
    name: 'Toyota Corolla 2024',
    category: 'Economy',
    supplier: 'Hertz',
    location: 'Dubai Airport',
    rating: 4.7,
    reviews: 2341,
    pricePerDay: 35,
    images: ['🚗', '🪑', '🎒', '⚙️', '🛡️'],
    description: 'Perfect for city driving and budget-conscious travelers. The Toyota Corolla offers excellent fuel economy, comfortable seating for 5 passengers, and modern features including Bluetooth connectivity and backup camera.',
    specs: {
      year: 2024,
      transmission: 'Automatic',
      fuel: 'Petrol',
      doors: 4,
      seats: 5,
      luggage: 2,
      ac: true,
      mileage: 'Unlimited',
    },
    features: [
      'Air Conditioning',
      'Bluetooth',
      'USB Charging',
      'Backup Camera',
      'Cruise Control',
      'Power Windows',
      'ABS Brakes',
      'Airbags',
    ],
    included: [
      'Unlimited Mileage',
      'Airport Pickup',
      'Basic Insurance',
      'Third Party Liability',
      '24/7 Roadside Assistance',
    ],
    optional: [
      { name: 'GPS Navigation', price: 10 },
      { name: 'Child Seat', price: 5 },
      { name: 'Additional Driver', price: 15 },
      { name: 'Full Insurance', price: 25 },
    ],
    requirements: {
      age: 'Minimum 21 years old',
      license: 'Valid driver\'s license (2+ years)',
      payment: 'Credit card required for deposit',
      deposit: '$300 refundable deposit',
    },
    policies: {
      fuel: 'Pick up full, return full',
      cancellation: 'Free cancellation up to 24 hours before pickup',
      modification: 'Free modifications up to 24 hours',
      lateFee: '$25 per hour late return',
    },
  },
  '2': {
    id: '2',
    name: 'Honda CR-V 2024',
    category: 'SUV',
    supplier: 'Enterprise',
    location: 'Dubai Airport',
    rating: 4.8,
    reviews: 1876,
    pricePerDay: 55,
    images: ['🚙', '🪑', '🎒', '⚙️', '🛡️'],
    description: 'Spacious SUV perfect for families or groups. Features all-wheel drive, premium sound system, and ample cargo space. Ideal for both city and desert adventures.',
    specs: {
      year: 2024,
      transmission: 'Automatic',
      fuel: 'Petrol',
      doors: 4,
      seats: 5,
      luggage: 3,
      ac: true,
      mileage: 'Unlimited',
    },
    features: [
      'Air Conditioning',
      'Bluetooth & Apple CarPlay',
      'Premium Sound System',
      'Backup Camera',
      'Adaptive Cruise Control',
      'Sunroof',
      'All-Wheel Drive',
      'Advanced Safety Features',
    ],
    included: [
      'Unlimited Mileage',
      'Airport Pickup',
      'Comprehensive Insurance',
      'Third Party Liability',
      '24/7 Roadside Assistance',
      'GPS Navigation',
    ],
    optional: [
      { name: 'Child Seat', price: 5 },
      { name: 'Additional Driver', price: 15 },
      { name: 'Zero Excess Insurance', price: 30 },
      { name: 'Ski Rack', price: 20 },
    ],
    requirements: {
      age: 'Minimum 23 years old',
      license: 'Valid driver\'s license (3+ years)',
      payment: 'Credit card required for deposit',
      deposit: '$500 refundable deposit',
    },
    policies: {
      fuel: 'Pick up full, return full',
      cancellation: 'Free cancellation up to 48 hours before pickup',
      modification: 'Free modifications up to 48 hours',
      lateFee: '$30 per hour late return',
    },
  },
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const car = cars[params.id as keyof typeof cars];
  
  if (!car) {
    return {
      title: 'Car Not Found | bookmethat',
    };
  }

  return {
    title: `${car.name} - Rent Now | bookmethat`,
    description: `Rent ${car.name} from ${car.supplier} starting at $${car.pricePerDay}/day. ${car.description.substring(0, 120)}...`,
    keywords: `${car.name}, car rental, ${car.supplier}, ${car.location}, ${car.category}`,
  };
}

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const car = cars[params.id as keyof typeof cars];

  if (!car) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-orange-600 text-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <Link href="/search/cars" className="text-white/80 hover:text-white mb-2 inline-block">
              ← Back to Car Search
            </Link>
            <h1 className="text-4xl font-bold mb-2">{car.name}</h1>
            <p className="text-lg opacity-90">{car.category} • {car.supplier} • {car.location}</p>
          </div>
        </section>

        {/* Images Gallery */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-5 gap-2 h-80">
              <div className="col-span-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <span className="text-9xl">{car.images[0]}</span>
              </div>
              {car.images.slice(1).map((img, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">{img}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-2xl">★</span>
                  <span className="text-2xl font-bold">{car.rating}</span>
                  <span className="text-gray-600">({car.reviews.toLocaleString()} reviews)</span>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Available Now
                </span>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Vehicle</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{car.description}</p>
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl mb-2">👥</p>
                    <p className="text-sm text-gray-600">Passengers</p>
                    <p className="font-bold">{car.specs.seats}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl mb-2">💼</p>
                    <p className="text-sm text-gray-600">Luggage</p>
                    <p className="font-bold">{car.specs.luggage} Large</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl mb-2">⚙️</p>
                    <p className="text-sm text-gray-600">Transmission</p>
                    <p className="font-bold">{car.specs.transmission}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl mb-2">⛽</p>
                    <p className="text-sm text-gray-600">Fuel Type</p>
                    <p className="font-bold">{car.specs.fuel}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl mb-2">🚪</p>
                    <p className="text-sm text-gray-600">Doors</p>
                    <p className="font-bold">{car.specs.doors}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl mb-2">📏</p>
                    <p className="text-sm text-gray-600">Mileage</p>
                    <p className="font-bold">{car.specs.mileage}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {car.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-orange-600 font-bold">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">✓ Included in Price</h2>
                <div className="space-y-2">
                  {car.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Extras */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Optional Extras</h2>
                <div className="space-y-3">
                  {car.optional.map((extra, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">{extra.name}</span>
                      <span className="font-bold text-orange-600">+${extra.price}/day</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rental Requirements</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">Age:</p>
                    <p className="text-gray-700">{car.requirements.age}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">License:</p>
                    <p className="text-gray-700">{car.requirements.license}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Payment:</p>
                    <p className="text-gray-700">{car.requirements.payment}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Deposit:</p>
                    <p className="text-gray-700">{car.requirements.deposit}</p>
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rental Policies</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">Fuel Policy:</p>
                    <p className="text-gray-700">{car.policies.fuel}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Cancellation:</p>
                    <p className="text-gray-700">{car.policies.cancellation}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Modifications:</p>
                    <p className="text-gray-700">{car.policies.modification}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Late Return:</p>
                    <p className="text-gray-700">{car.policies.lateFee}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-6 sticky top-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-600">Daily Rate</p>
                  <p className="text-4xl font-bold text-orange-600 mb-1">${car.pricePerDay}</p>
                  <p className="text-sm text-gray-600">per day</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Pickup Location</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>{car.location}</option>
                      <option>Dubai Marina</option>
                      <option>Downtown Dubai</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Pickup Date & Time</label>
                    <input
                      type="datetime-local"
                      defaultValue="2025-12-15T10:00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Return Date & Time</label>
                    <input
                      type="datetime-local"
                      defaultValue="2025-12-20T10:00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <button className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition font-bold text-lg mb-4">
                  Reserve Now
                </button>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">5 days rental</span>
                    <span className="font-semibold">${car.pricePerDay * 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance & fees</span>
                    <span className="font-semibold">$75</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-orange-600 text-lg">${car.pricePerDay * 5 + 75}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-center">
                  <p className="text-sm text-gray-600">✓ Free cancellation</p>
                  <p className="text-sm text-gray-600">✓ No hidden fees</p>
                  <p className="text-sm text-gray-600">✓ 24/7 support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
