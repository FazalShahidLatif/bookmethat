import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Travel Blog - Tips, Guides & Destination Inspiration | bookmethat',
  description: 'Discover travel tips, destination guides, hotel reviews, and insider secrets. Expert advice for planning your perfect trip, finding the best deals, and traveling smarter.',
  keywords: [
    'travel blog',
    'travel tips',
    'destination guides',
    'hotel reviews',
    'travel inspiration',
    'budget travel tips',
    'luxury travel',
    'digital nomad lifestyle',
    'sustainable travel',
  ],
  openGraph: {
    title: 'Travel Blog - bookmethat',
    description: 'Travel tips, destination guides, and expert advice for your next adventure',
    type: 'website',
  },
};

// Blog posts data (in production, fetch from CMS or database)
const blogPosts = [
  {
    id: 'workation-destinations-2025',
    title: 'Top 15 Workation Destinations for Digital Nomads in 2025',
    excerpt: 'Discover the best cities for remote work with great WiFi, coworking spaces, affordable living, and amazing experiences. From Bali to Lisbon.',
    category: 'Digital Nomad',
    author: 'Sarah Johnson',
    date: '2025-11-15',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: true,
  },
  {
    id: 'sustainable-travel-guide-2025',
    title: 'The Complete Guide to Sustainable Travel: 25 Eco-Friendly Tips',
    excerpt: 'Learn how to reduce your carbon footprint while traveling. From choosing eco-hotels to supporting local communities.',
    category: 'Sustainable Travel',
    author: 'Michael Chen',
    date: '2025-11-12',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: true,
  },
  {
    id: 'budget-travel-tips-2025',
    title: 'Budget Travel Tips 2025: How to Travel More for Less',
    excerpt: 'Master the art of budget travel with our comprehensive guide. Learn insider tips to save on flights, hotels, and experiences without sacrificing quality.',
    category: 'Budget Travel',
    author: 'Emma Rodriguez',
    date: '2025-11-10',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: true,
  },
  {
    id: 'travel-esim-guide-2025',
    title: 'Travel eSIM Guide: Stay Connected Abroad Without Roaming Fees',
    excerpt: 'Complete guide to eSIMs for travelers. How they work, best providers, cost comparison, and setup instructions for 190+ countries.',
    category: 'Travel Tech',
    author: 'David Kim',
    date: '2025-11-08',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'solo-travel-safety-guide',
    title: 'Solo Travel Safety Guide: Essential Tips for Traveling Alone',
    excerpt: 'Comprehensive safety guide for solo travelers. Learn how to stay safe, make friends, and have amazing experiences while traveling alone.',
    category: 'Travel Tips',
    author: 'Rachel Martinez',
    date: '2025-11-05',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'luxury-travel-on-budget',
    title: 'Luxury Travel on a Budget: 15 Secrets to Travel Like Royalty',
    excerpt: 'Experience 5-star luxury without the price tag. Learn how to access luxury hotels, business class flights, and VIP experiences for less.',
    category: 'Travel Hacks',
    author: 'James Thompson',
    date: '2025-11-03',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'last-minute-booking-strategies',
    title: '7 Proven Strategies to Find Last-Minute Hotel Deals (Save up to 60%)',
    excerpt: 'Expert tips for booking same-day or last-minute hotel rooms at massive discounts. Apps, timing, and negotiation tactics revealed.',
    category: 'Travel Hacks',
    author: 'Lisa Chen',
    date: '2025-11-01',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'family-vacation-destinations-2025',
    title: 'Best Family Vacation Destinations 2025: Kid-Friendly Travel Guide',
    excerpt: 'Top destinations for family travel with activities for all ages. From theme parks to beaches, find the perfect spot for your next family adventure.',
    category: 'Family Travel',
    author: 'Amanda Wilson',
    date: '2025-10-28',
    readTime: '11 min read',
    image: 'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'digital-nomad-packing-essentials',
    title: 'Digital Nomad Packing List: 50 Essentials for Remote Work Travel',
    excerpt: 'Ultimate packing list for digital nomads. Tech gear, travel essentials, and productivity tools to work from anywhere in the world.',
    category: 'Digital Nomad',
    author: 'Alex Martinez',
    date: '2025-10-25',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'travel-planning-checklist-2025',
    title: 'Complete Travel Planning Checklist: From Booking to Landing',
    excerpt: 'Never forget anything again! Comprehensive travel planning checklist covering everything from documents to packing to arrival.',
    category: 'Travel Tips',
    author: 'Sarah Johnson',
    date: '2025-10-22',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/1252983/pexels-photo-1252983.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'hidden-gems-alternative-destinations',
    title: 'Hidden Gems: 20 Alternative Destinations to Overtouristed Cities',
    excerpt: 'Skip the crowds and discover lesser-known destinations that offer authentic experiences. Alternative cities that are just as beautiful but less crowded.',
    category: 'Destination Guide',
    author: 'Michael Chen',
    date: '2025-10-20',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

const categories = ['All', 'Digital Nomad', 'Destination Guide', 'Travel Tips', 'Budget Travel', 'Sustainable Travel', 'Travel Tech', 'Travel Hacks', 'Family Travel'];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  // JSON-LD Schema for Blog
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'bookmethat Travel Blog',
    description: 'Travel tips, destination guides, and expert advice',
    url: 'https://bookmethat.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'bookmethat',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bookmethat.com/logo.png',
      },
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">Travel Blog</h1>
            <p className="text-xl text-blue-100">
              Expert tips, destination guides, and travel inspiration
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b bg-white sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex gap-3 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                    category === 'All'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-6xl">
                  📸
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Posts */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl">
                    📝
                  </div>
                  <div className="p-4">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.readTime}</span>
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Get Travel Tips in Your Inbox</h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter for exclusive deals, destination guides, and travel hacks
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-blue-200 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </section>
    </main>
    <Footer />
    </>
  );
}
