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
    image: '/blog/workation-2025.jpg',
    featured: true,
  },
  {
    id: 'sustainable-travel-guide',
    title: 'The Complete Guide to Sustainable Travel: 25 Eco-Friendly Tips',
    excerpt: 'Learn how to reduce your carbon footprint while traveling. From choosing eco-hotels to supporting local communities.',
    category: 'Sustainable Travel',
    author: 'Michael Chen',
    date: '2025-11-12',
    readTime: '10 min read',
    image: '/blog/sustainable-travel.jpg',
    featured: true,
  },
  {
    id: 'dubai-travel-guide-2025',
    title: 'Dubai Travel Guide 2025: Best Hotels, Things to Do & Money-Saving Tips',
    excerpt: 'Everything you need to know about visiting Dubai. Best neighborhoods, luxury vs budget hotels, must-see attractions, and local secrets.',
    category: 'Destination Guide',
    author: 'Fatima Al-Rashid',
    date: '2025-11-10',
    readTime: '12 min read',
    image: '/blog/dubai-guide.jpg',
    featured: true,
  },
  {
    id: 'pet-friendly-hotels-europe',
    title: '50 Best Pet-Friendly Hotels in Europe (2025)',
    excerpt: 'Travel with your furry friend! Comprehensive guide to dog-friendly and cat-friendly hotels across Europe with amenities, policies, and tips.',
    category: 'Travel Tips',
    author: 'Emma Rodriguez',
    date: '2025-11-08',
    readTime: '7 min read',
    image: '/blog/pet-friendly.jpg',
  },
  {
    id: 'bali-digital-nomad-guide',
    title: 'Bali Digital Nomad Guide: Where to Stay, Work & Play',
    excerpt: 'Ultimate guide to living and working in Bali. Best areas (Canggu, Ubud, Seminyak), coworking spaces, visa requirements, and cost of living.',
    category: 'Digital Nomad',
    author: 'Jake Williams',
    date: '2025-11-05',
    readTime: '11 min read',
    image: '/blog/bali-nomad.jpg',
  },
  {
    id: 'maldives-budget-travel',
    title: 'Maldives on a Budget: How to Visit Paradise Without Breaking the Bank',
    excerpt: 'Yes, you can visit the Maldives affordably! Discover budget-friendly local islands, guesthouses, and money-saving strategies.',
    category: 'Budget Travel',
    author: 'Priya Sharma',
    date: '2025-11-03',
    readTime: '9 min read',
    image: '/blog/maldives-budget.jpg',
  },
  {
    id: 'travel-esim-guide',
    title: 'Travel eSIM Guide: Stay Connected Abroad Without Roaming Fees',
    excerpt: 'Complete guide to eSIMs for travelers. How they work, best providers, cost comparison, and setup instructions for 190+ countries.',
    category: 'Travel Tech',
    author: 'David Kim',
    date: '2025-11-01',
    readTime: '6 min read',
    image: '/blog/esim-guide.jpg',
  },
  {
    id: 'last-minute-hotel-deals',
    title: '7 Proven Strategies to Find Last-Minute Hotel Deals (Save up to 60%)',
    excerpt: 'Expert tips for booking same-day or last-minute hotel rooms at massive discounts. Apps, timing, and negotiation tactics revealed.',
    category: 'Travel Hacks',
    author: 'Rachel Martinez',
    date: '2025-10-28',
    readTime: '5 min read',
    image: '/blog/last-minute-deals.jpg',
  },
];

const categories = ['All', 'Digital Nomad', 'Destination Guide', 'Travel Tips', 'Budget Travel', 'Sustainable Travel', 'Travel Tech', 'Travel Hacks'];

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
        </header>

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
