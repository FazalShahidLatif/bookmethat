import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Featured Travel Destinations | bookmethat',
  description: 'Explore top travel destinations worldwide. Find hotels, flights, and activities in Dubai, Paris, Tokyo, Bali, New York, and more. Best prices guaranteed.',
  keywords: 'travel destinations, holiday destinations, top vacation spots, best places to visit, cheap hotels, flight deals'
};

const destinations = [
  {
    id: 1,
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    description: 'Luxury shopping, ultramodern architecture, and vibrant nightlife',
    hotels: 1243,
    startingPrice: 89,
    popular: true,
    region: 'Middle East',
    season: 'Winter'
  },
  {
    id: 2,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    description: 'The City of Light - art, culture, cuisine, and romance',
    hotels: 2156,
    startingPrice: 125,
    popular: true,
    region: 'Europe',
    season: 'Spring'
  },
  {
    id: 3,
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    description: 'Where tradition meets cutting-edge technology',
    hotels: 1876,
    startingPrice: 98,
    popular: true,
    region: 'Asia',
    season: 'Spring'
  },
  {
    id: 4,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    description: 'Tropical paradise with beaches, temples, and wellness retreats',
    hotels: 987,
    startingPrice: 45,
    popular: true,
    region: 'Asia',
    season: 'Summer'
  },
  {
    id: 5,
    name: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    description: 'The city that never sleeps - iconic landmarks and Broadway shows',
    hotels: 1654,
    startingPrice: 156,
    popular: true,
    region: 'North America',
    season: 'Fall'
  },
  {
    id: 6,
    name: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop',
    description: 'Gaudí architecture, Mediterranean beaches, and tapas',
    hotels: 1432,
    startingPrice: 78,
    popular: false,
    region: 'Europe',
    season: 'Summer'
  },
  {
    id: 7,
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop',
    description: 'Luxury overwater villas and pristine white-sand beaches',
    hotels: 234,
    startingPrice: 345,
    popular: false,
    region: 'Asia',
    season: 'Winter'
  },
  {
    id: 8,
    name: 'London, England',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    description: 'Royal palaces, world-class museums, and historic landmarks',
    hotels: 2341,
    startingPrice: 142,
    popular: true,
    region: 'Europe',
    season: 'Summer'
  },
  {
    id: 9,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
    description: 'Stunning sunsets, white-washed buildings, and Aegean views',
    hotels: 456,
    startingPrice: 165,
    popular: false,
    region: 'Europe',
    season: 'Summer'
  },
  {
    id: 10,
    name: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop',
    description: 'A modern metropolis with diverse culture and amazing food',
    hotels: 876,
    startingPrice: 112,
    popular: false,
    region: 'Asia',
    season: 'Year-round'
  },
  {
    id: 11,
    name: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',
    description: 'Ancient history, Renaissance art, and incredible cuisine',
    hotels: 1765,
    startingPrice: 95,
    popular: true,
    region: 'Europe',
    season: 'Spring'
  },
  {
    id: 12,
    name: 'Sydney, Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
    description: 'Iconic Opera House, beautiful harbors, and stunning beaches',
    hotels: 1123,
    startingPrice: 134,
    popular: false,
    region: 'Oceania',
    season: 'Summer'
  },
  {
    id: 13,
    name: 'Istanbul, Turkey',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop',
    description: 'Where East meets West - bazaars, mosques, and palaces',
    hotels: 987,
    startingPrice: 56,
    popular: false,
    region: 'Middle East',
    season: 'Spring'
  },
  {
    id: 14,
    name: 'Phuket, Thailand',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=600&fit=crop',
    description: 'Thailand\'s largest island with beaches, diving, and nightlife',
    hotels: 1234,
    startingPrice: 42,
    popular: true,
    region: 'Asia',
    season: 'Winter'
  },
  {
    id: 15,
    name: 'Amsterdam, Netherlands',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop',
    description: 'Canals, museums, cycling culture, and vibrant atmosphere',
    hotels: 876,
    startingPrice: 118,
    popular: false,
    region: 'Europe',
    season: 'Spring'
  },
  {
    id: 16,
    name: 'Marrakech, Morocco',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&h=600&fit=crop',
    description: 'Exotic souks, riads, and stunning desert landscapes',
    hotels: 567,
    startingPrice: 62,
    popular: false,
    region: 'Africa',
    season: 'Spring'
  },
  {
    id: 17,
    name: 'Cancun, Mexico',
    image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&h=600&fit=crop',
    description: 'Caribbean beaches, Mayan ruins, and all-inclusive resorts',
    hotels: 789,
    startingPrice: 88,
    popular: false,
    region: 'North America',
    season: 'Winter'
  },
  {
    id: 18,
    name: 'Cape Town, South Africa',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop',
    description: 'Table Mountain, beaches, vineyards, and wildlife',
    hotels: 654,
    startingPrice: 72,
    popular: false,
    region: 'Africa',
    season: 'Summer'
  },
  {
    id: 19,
    name: 'Prague, Czech Republic',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop',
    description: 'Fairy-tale castles, Gothic architecture, and beer culture',
    hotels: 876,
    startingPrice: 65,
    popular: false,
    region: 'Europe',
    season: 'Spring'
  },
  {
    id: 20,
    name: 'Maui, Hawaii',
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800&h=600&fit=crop',
    description: 'Volcanic landscapes, beaches, and the Road to Hana',
    hotels: 456,
    startingPrice: 198,
    popular: false,
    region: 'North America',
    season: 'Year-round'
  },
  {
    id: 21,
    name: 'Vienna, Austria',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=600&fit=crop',
    description: 'Imperial palaces, classical music, and coffee house culture',
    hotels: 765,
    startingPrice: 105,
    popular: false,
    region: 'Europe',
    season: 'Fall'
  },
  {
    id: 22,
    name: 'Lisbon, Portugal',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop',
    description: 'Colorful tiles, historic trams, and Atlantic coastline',
    hotels: 987,
    startingPrice: 68,
    popular: true,
    region: 'Europe',
    season: 'Spring'
  },
  {
    id: 23,
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    description: 'Ancient temples, traditional geisha districts, and cherry blossoms',
    hotels: 1234,
    startingPrice: 92,
    popular: false,
    region: 'Asia',
    season: 'Spring'
  },
  {
    id: 24,
    name: 'Buenos Aires, Argentina',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&h=600&fit=crop',
    description: 'Tango, steaks, wine, and European-style architecture',
    hotels: 876,
    startingPrice: 58,
    popular: false,
    region: 'South America',
    season: 'Spring'
  }
];

const regions = ['All', 'Europe', 'Asia', 'Middle East', 'North America', 'South America', 'Africa', 'Oceania'];
const seasons = ['All Seasons', 'Spring', 'Summer', 'Fall', 'Winter', 'Year-round'];

export default function DestinationsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[500px] bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="absolute inset-0 bg-black/30"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=500&fit=crop')` }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Discover Your Next Adventure
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Explore 24+ handpicked destinations worldwide. From bustling cities to tropical paradises, find your perfect getaway.
              </p>
              
              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-2xl p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    className="flex-1 px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Region Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Season Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Best Season</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {seasons.map((season) => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Budgets</option>
                  <option>Budget (&lt; $100)</option>
                  <option>Mid-range ($100-$200)</option>
                  <option>Luxury (&gt; $200)</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
                <p className="text-gray-600">Most booked destinations by travelers</p>
              </div>
              <button className="text-blue-600 font-semibold hover:underline">View All →</button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {destinations.filter(d => d.popular).map((destination) => (
                <a
                  key={destination.id}
                  href={`/hotels?destination=${encodeURIComponent(destination.name)}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                      ⭐ Popular
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                      {destination.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{destination.hotels} hotels</span>
                      <span className="font-bold text-gray-900">
                        From ${destination.startingPrice}/night
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {destination.region}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        Best: {destination.season}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* All Destinations Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Destinations</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((destination) => (
                <a
                  key={destination.id}
                  href={`/hotels?destination=${encodeURIComponent(destination.name)}`}
                  className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{destination.hotels} hotels</p>
                    <p className="text-sm font-semibold text-gray-900">
                      From ${destination.startingPrice}/night
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Can't Decide Where to Go?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Let our travel experts help you plan the perfect trip tailored to your preferences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Get Expert Advice
              </a>
              <a
                href="/hotels"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition font-semibold"
              >
                Browse All Hotels
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
