import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock activity data
const activities = {
  '1': {
    id: '1',
    title: 'Burj Khalifa: At the Top Sky Experience',
    location: 'Downtown Dubai, UAE',
    category: 'City Tours',
    rating: 4.9,
    reviews: 12543,
    priceFrom: 89,
    images: ['🏙️', '🌆', '📸', '🎫', '⭐'],
    description: 'Experience Dubai from the world\'s tallest building. Visit levels 124, 125, and 148 for breathtaking 360° views of the city, desert, and ocean. Includes access to the exclusive Sky Lounge with refreshments.',
    duration: '2-3 hours',
    languages: ['English', 'Arabic', 'French', 'Spanish', 'Chinese'],
    groupSize: 'Small groups (max 15)',
    highlights: [
      'Access to Level 124, 125 & 148',
      'Sky Lounge with refreshments',
      'Interactive exhibits',
      'Outdoor terrace on 148th floor',
      'High-speed elevator experience',
      'Sunset timing available',
      'Skip-the-line access',
      'Multimedia presentations',
    ],
    included: [
      'Admission to Burj Khalifa',
      'Access to all viewing decks',
      'Sky Lounge entry',
      'Welcome refreshments',
      'Interactive displays',
      'Photo opportunities',
    ],
    notIncluded: [
      'Hotel pickup/drop-off',
      'Food and drinks (except Sky Lounge)',
      'Professional photography',
      'Souvenirs',
    ],
    meetingPoint: 'Dubai Mall, Ground Floor, near Fashion Avenue',
    whatToBring: [
      'Valid ID or passport',
      'Camera',
      'Comfortable shoes',
      'Light jacket (it can be cold at the top)',
    ],
    options: [
      {
        id: 'standard',
        name: 'Standard Admission (Level 124 & 125)',
        time: 'Flexible timing',
        price: 89,
        duration: '1.5 hours',
      },
      {
        id: 'sky',
        name: 'At the Top SKY (Level 148)',
        time: 'Sunset timing',
        price: 179,
        duration: '2 hours',
      },
      {
        id: 'vip',
        name: 'VIP Lounge Experience',
        time: 'Private timing',
        price: 299,
        duration: '3 hours',
      },
    ],
    cancellation: 'Free cancellation up to 24 hours before the experience',
    accessibility: 'Wheelchair accessible',
    ageRestriction: 'Suitable for all ages',
    safetyMeasures: [
      'Enhanced cleaning procedures',
      'Temperature checks',
      'Social distancing enforced',
      'Hand sanitizer available',
      'Staff wear protective gear',
    ],
  },
  '2': {
    id: '2',
    title: 'Desert Safari with BBQ Dinner & Live Shows',
    location: 'Dubai Desert Conservation Reserve',
    category: 'Adventure',
    rating: 4.8,
    reviews: 8432,
    priceFrom: 65,
    images: ['🏜️', '🐪', '🍖', '💃', '🌅'],
    description: 'Embark on a thrilling desert adventure with dune bashing, camel riding, sandboarding, and traditional entertainment. Enjoy a delicious BBQ dinner under the stars with belly dancing, tanoura shows, and fire performances.',
    duration: '6 hours',
    languages: ['English', 'Arabic', 'Hindi', 'Urdu'],
    groupSize: 'Large groups',
    highlights: [
      '30-minute dune bashing adventure',
      'Camel riding experience',
      'Sandboarding on golden dunes',
      'Henna painting',
      'Traditional costume photos',
      'Unlimited BBQ dinner buffet',
      'Belly dance & Tanoura show',
      'Fire performance',
    ],
    included: [
      'Hotel pickup and drop-off',
      'Dune bashing (30 mins)',
      'Camel ride',
      'Sandboarding',
      'Welcome drinks',
      'BBQ dinner buffet',
      'Live entertainment',
      'Shisha smoking area',
    ],
    notIncluded: [
      'Quad biking (available at extra cost)',
      'Alcoholic beverages',
      'Professional photos',
      'Tips and gratuities',
    ],
    meetingPoint: 'Hotel pickup from Dubai, Sharjah, Ajman',
    whatToBring: [
      'Sunglasses and sunscreen',
      'Comfortable clothing',
      'Camera',
      'Cash for optional activities',
      'Light jacket for evening',
    ],
    options: [
      {
        id: 'evening',
        name: 'Evening Desert Safari',
        time: '3:00 PM - 9:00 PM',
        price: 65,
        duration: '6 hours',
      },
      {
        id: 'private',
        name: 'Private Desert Safari',
        time: 'Flexible timing',
        price: 299,
        duration: '6 hours',
      },
      {
        id: 'overnight',
        name: 'Overnight Desert Camping',
        time: '3:00 PM (next day 8:00 AM)',
        price: 149,
        duration: '17 hours',
      },
    ],
    cancellation: 'Free cancellation up to 24 hours before the experience',
    accessibility: 'Not recommended for pregnant women or people with back problems',
    ageRestriction: 'Children must be accompanied by an adult',
    safetyMeasures: [
      'Experienced drivers',
      'Safety briefing provided',
      'First aid available',
      'Emergency contact 24/7',
      'Seat belts mandatory',
    ],
  },
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const activity = activities[params.id as keyof typeof activities];
  
  if (!activity) {
    return {
      title: 'Activity Not Found | bookmethat',
    };
  }

  return {
    title: `${activity.title} | Book Now | bookmethat`,
    description: `${activity.description.substring(0, 155)}...`,
    keywords: `${activity.title}, ${activity.category}, ${activity.location}, things to do, tours`,
  };
}

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const activity = activities[params.id as keyof typeof activities];

  if (!activity) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-900 via-pink-800 to-orange-700 text-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <Link href="/search/activities" className="text-white/80 hover:text-white mb-2 inline-block">
              ← Back to Activities
            </Link>
            <h1 className="text-4xl font-bold mb-2">{activity.title}</h1>
            <p className="text-lg opacity-90">📍 {activity.location} • {activity.category}</p>
          </div>
        </section>

        {/* Images Gallery */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-5 gap-2 h-80">
              <div className="col-span-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-9xl">{activity.images[0]}</span>
              </div>
              {activity.images.slice(1).map((img, i) => (
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
              {/* Rating & Quick Info */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-2xl">★</span>
                  <span className="text-2xl font-bold">{activity.rating}</span>
                  <span className="text-gray-600">({activity.reviews.toLocaleString()} reviews)</span>
                </div>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {activity.category}
                </span>
                <span className="flex items-center gap-1 text-gray-700">
                  ⏱️ {activity.duration}
                </span>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Experience</h2>
                <p className="text-gray-700 leading-relaxed">{activity.description}</p>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience Highlights</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {activity.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-1">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                <div className="space-y-2 mb-6">
                  {activity.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Not Included</h3>
                <div className="space-y-2">
                  {activity.notIncluded.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Options */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Option</h2>
                <div className="space-y-4">
                  {activity.options.map((option) => (
                    <div key={option.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-500 transition cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{option.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">🕐 {option.time}</p>
                          <p className="text-sm text-gray-600">⏱️ Duration: {option.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-purple-600">${option.price}</p>
                          <p className="text-sm text-gray-600">per person</p>
                        </div>
                      </div>
                      <button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold">
                        Select Option
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meeting Point */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Meeting Point</h2>
                <p className="text-gray-700 mb-4">📍 {activity.meetingPoint}</p>
                <h3 className="font-bold text-gray-900 mb-2">What to Bring</h3>
                <div className="space-y-2">
                  {activity.whatToBring.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">Duration:</p>
                    <p className="text-gray-700">{activity.duration}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Languages:</p>
                    <p className="text-gray-700">{activity.languages.join(', ')}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Group Size:</p>
                    <p className="text-gray-700">{activity.groupSize}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Accessibility:</p>
                    <p className="text-gray-700">{activity.accessibility}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Age Restriction:</p>
                    <p className="text-gray-700">{activity.ageRestriction}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Cancellation Policy:</p>
                    <p className="text-gray-700">{activity.cancellation}</p>
                  </div>
                </div>
              </div>

              {/* Safety Measures */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Health & Safety</h2>
                <div className="space-y-2">
                  {activity.safetyMeasures.map((measure, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">{measure}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-6 sticky top-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-600">From</p>
                  <p className="text-4xl font-bold text-purple-600 mb-1">${activity.priceFrom}</p>
                  <p className="text-sm text-gray-600">per person</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Select Date</label>
                    <input
                      type="date"
                      defaultValue="2025-12-15"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Number of Guests</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5+ Guests</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Select Option</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      {activity.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name} - ${option.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-bold text-lg mb-4">
                  Book Now
                </button>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">2 guests</span>
                    <span className="font-semibold">${activity.priceFrom * 2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-semibold">$10</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-purple-600 text-lg">${activity.priceFrom * 2 + 10}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-center">
                  <p className="text-sm text-gray-600">✓ Free cancellation</p>
                  <p className="text-sm text-gray-600">✓ Instant confirmation</p>
                  <p className="text-sm text-gray-600">✓ Mobile ticket</p>
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
