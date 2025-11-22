import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock destination data
const destinationData: Record<string, any> = {
  dubai: {
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Experience luxury, innovation, and Arabian hospitality in the City of Gold',
    overview: 'Dubai is a dazzling metropolis that seamlessly blends traditional Arabian culture with ultra-modern luxury. From the world\'s tallest building to pristine beaches, gold-filled souks to futuristic architecture, Dubai offers an unforgettable experience for every traveler.',
    highlights: [
      'Burj Khalifa - World\'s tallest building',
      'Dubai Mall - Largest shopping destination',
      'Palm Jumeirah - Iconic man-made island',
      'Dubai Marina - Stunning waterfront district',
      'Gold Souk - Traditional marketplace',
      'Dubai Fountain - Spectacular water show',
    ],
    bestTime: 'November to March (cooler weather)',
    currency: 'UAE Dirham (AED)',
    language: 'Arabic (English widely spoken)',
    timezone: 'UTC+4',
    activities: ['Desert Safari', 'Burj Khalifa Tour', 'Dhow Cruise', 'Shopping'],
    hotels: 248,
    avgPrice: '$120/night',
  },
  bali: {
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Discover paradise with stunning beaches, ancient temples, and vibrant culture',
    overview: 'Bali, the Island of the Gods, is a tropical paradise offering pristine beaches, lush rice terraces, ancient temples, and a rich cultural heritage. Whether you seek adventure, relaxation, or spiritual enlightenment, Bali has something magical for everyone.',
    highlights: [
      'Ubud Rice Terraces - Stunning landscapes',
      'Tanah Lot Temple - Iconic sea temple',
      'Seminyak Beach - Trendy beach destination',
      'Sacred Monkey Forest - Wildlife sanctuary',
      'Mount Batur - Sunrise trekking',
      'Traditional Balinese Dance - Cultural performances',
    ],
    bestTime: 'April to October (dry season)',
    currency: 'Indonesian Rupiah (IDR)',
    language: 'Indonesian, Balinese',
    timezone: 'UTC+8',
    activities: ['Surfing', 'Temple Tours', 'Yoga Retreats', 'Diving'],
    hotels: 186,
    avgPrice: '$65/night',
  },
  tokyo: {
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Explore the perfect harmony of ancient traditions and cutting-edge technology',
    overview: 'Tokyo, Japan\'s bustling capital, is a fascinating blend of ultramodern and traditional. From neon-lit skyscrapers to historic temples, world-class cuisine to anime culture, Tokyo offers an incredible journey through past, present, and future.',
    highlights: [
      'Shibuya Crossing - Iconic intersection',
      'Senso-ji Temple - Ancient Buddhist temple',
      'Tokyo Skytree - Panoramic city views',
      'Tsukiji Outer Market - Fresh seafood',
      'Meiji Shrine - Peaceful forest sanctuary',
      'Harajuku - Fashion and youth culture',
    ],
    bestTime: 'March to May, September to November',
    currency: 'Japanese Yen (JPY)',
    language: 'Japanese',
    timezone: 'UTC+9',
    activities: ['Sushi Making', 'Temple Visits', 'Shopping', 'Cherry Blossom Viewing'],
    hotels: 342,
    avgPrice: '$95/night',
  },
};

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = destinationData[params.slug];

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[500px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${destination.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white px-4">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{destination.name}</h1>
              <p className="text-xl md:text-2xl mb-6">{destination.country}</p>
              <p className="text-lg max-w-2xl mx-auto">{destination.description}</p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{destination.hotels}+</div>
                <div className="text-gray-600">Hotels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{destination.avgPrice}</div>
                <div className="text-gray-600">Avg. Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{destination.bestTime.split(' ')[0]}</div>
                <div className="text-gray-600">Best Months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{destination.activities.length}+</div>
                <div className="text-gray-600">Activities</div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview & Highlights */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{destination.overview}</p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🗓️</span>
                    <div>
                      <div className="font-semibold">Best Time to Visit</div>
                      <div className="text-gray-600">{destination.bestTime}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">💰</span>
                    <div>
                      <div className="font-semibold">Currency</div>
                      <div className="text-gray-600">{destination.currency}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🗣️</span>
                    <div>
                      <div className="font-semibold">Language</div>
                      <div className="text-gray-600">{destination.language}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🕐</span>
                    <div>
                      <div className="font-semibold">Timezone</div>
                      <div className="text-gray-600">{destination.timezone}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Top Highlights</h2>
                <div className="space-y-4">
                  {destination.highlights.map((highlight: string, index: number) => {
                    const [title, desc] = highlight.split(' - ');
                    return (
                      <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                        <span className="text-2xl mr-3">✨</span>
                        <div>
                          <div className="font-semibold text-blue-900">{title}</div>
                          {desc && <div className="text-gray-600 text-sm">{desc}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Activities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Activities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {destination.activities.map((activity: string, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="font-semibold">{activity}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore {destination.name}?</h2>
            <p className="text-gray-600 mb-8">
              Find the perfect hotel, flight, or activity for your {destination.name} adventure
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href={`/hotels?destination=${destination.name}`}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Browse Hotels
              </Link>
              <Link 
                href={`/flights?destination=${destination.name}`}
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Find Flights
              </Link>
              <Link 
                href={`/activities?destination=${destination.name}`}
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                View Activities
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const destination = destinationData[params.slug];
  
  if (!destination) {
    return {
      title: 'Destination Not Found',
    };
  }

  return {
    title: `${destination.name}, ${destination.country} - Travel Guide | bookmethat`,
    description: destination.description,
  };
}
