import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';

export const metadata = {
  title: 'Image Optimization Demo | bookmethat',
  description: 'Demonstration of image optimization techniques',
};

export default function ImageDemoPage() {
  const destinations = [
    { name: 'Dubai', slug: 'dubai', description: 'Luxury hotels & desert adventures' },
    { name: 'Bali', slug: 'bali', description: 'Tropical paradise & culture' },
    { name: 'Paris', slug: 'paris', description: 'City of lights & romance' },
    { name: 'Tokyo', slug: 'tokyo', description: 'Modern metropolis & tradition' },
    { name: 'Maldives', slug: 'maldives', description: 'Island getaway & resorts' },
    { name: 'Santorini', slug: 'santorini', description: 'White villages & sunsets' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Image Optimization Demo</h1>
            <a href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hero Image (Priority Loading)</h2>
          <p className="text-gray-600 mb-6">
            Large image with <code className="bg-gray-100 px-2 py-1 rounded">priority=true</code> for fastest LCP
          </p>
          <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <OptimizedImage
              src={getDestinationImage('dubai')}
              alt="Dubai Skyline at Sunset"
              fill={true}
              objectFit="cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 1200px"
              showAttribution={true}
              attribution='Photo by <a href="https://unsplash.com/@zxixia">Zhu Hongzhi</a> on Unsplash'
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-4xl font-bold mb-2">Discover Dubai</h3>
                <p className="text-xl text-gray-200">Luxury meets innovation in the desert</p>
              </div>
            </div>
          </div>
        </section>

        {/* Destination Cards Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Destination Cards (Lazy Loading)</h2>
          <p className="text-gray-600 mb-6">
            Optimized thumbnails with lazy loading, blur placeholders, and responsive sizing
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.slug}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className="relative h-64">
                  <OptimizedImage
                    src={getDestinationImage(dest.slug)}
                    alt={`${dest.name} destination`}
                    fill={true}
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    quality={80}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{dest.description}</p>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Image Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Image Gallery</h2>
          <p className="text-gray-600 mb-6">
            Different aspect ratios and sizes optimized for each use case
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Square thumbnails */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <OptimizedImage
                src={getDestinationImage('paris')}
                alt="Paris"
                fill={true}
                objectFit="cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <OptimizedImage
                src={getDestinationImage('tokyo')}
                alt="Tokyo"
                fill={true}
                objectFit="cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <OptimizedImage
                src={getDestinationImage('bali')}
                alt="Bali"
                fill={true}
                objectFit="cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <OptimizedImage
                src={getDestinationImage('santorini')}
                alt="Santorini"
                fill={true}
                objectFit="cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Performance Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Automatic WebP/AVIF</h3>
              <p className="text-gray-600 text-sm">
                Next.js automatically serves modern formats for 50-80% smaller file sizes
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Responsive Images</h3>
              <p className="text-gray-600 text-sm">
                Different sizes served based on device width for optimal loading
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-3">🌀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Blur Placeholders</h3>
              <p className="text-gray-600 text-sm">
                Low-quality placeholders prevent layout shift and improve perceived performance
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lazy Loading</h3>
              <p className="text-gray-600 text-sm">
                Below-the-fold images load only when needed, saving bandwidth
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">CDN Delivery</h3>
              <p className="text-gray-600 text-sm">
                Unsplash images served via global CDN for lowest latency
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-3">♻️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Browser Caching</h3>
              <p className="text-gray-600 text-sm">
                1-year cache headers mean images load instantly on repeat visits
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Implementation</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2">Component Usage:</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="https://images.unsplash.com/photo-123"
  alt="Destination"
  width={800}
  height={600}
  priority={true}
  sizes="(max-width: 768px) 100vw, 800px"
  showAttribution={true}
/>`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Image Service:</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { imageService } from '@/lib/images';

// Get optimized URL
const url = imageService.getOptimizedUrl(rawUrl, {
  width: 800,
  quality: 85,
  format: 'webp'
});

// Search Unsplash
const images = await imageService.searchImages('dubai hotels');`}
              </pre>
            </div>
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="font-semibold mb-2">Formats Supported:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>AVIF (best compression)</li>
                  <li>WebP (widely supported)</li>
                  <li>JPEG (fallback)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Size Optimization:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Thumbnail: ~20KB</li>
                  <li>Card: ~80KB</li>
                  <li>Hero: ~150KB</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <a
            href="/IMAGE_GUIDE.md"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-semibold text-lg shadow-lg"
          >
            📚 Read Full Documentation
          </a>
        </div>
      </div>
    </main>
  );
}
