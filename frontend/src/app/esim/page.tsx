import { Metadata } from 'next';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { getDestinationImage } from '@/lib/images';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'eSIM for Travel - Stay Connected Worldwide | bookmethat',
  description: 'Get instant mobile data in 190+ countries with our travel eSIMs. No physical SIM card needed. Activate in minutes and stay connected on your journey.',
  keywords: ['travel esim', 'international data', 'mobile data abroad', 'travel sim card', 'esim card'],
  openGraph: {
    title: 'Travel eSIM - Instant Mobile Data in 190+ Countries',
    description: 'Stay connected worldwide with affordable travel eSIMs. No physical SIM card needed.',
    url: 'https://bookmethat.com/esim',
  },
};

export default function ESIMPage() {
  const plans = [
    {
      region: 'Global',
      countries: '190+ countries',
      data: '1GB',
      days: '7 days',
      price: '$4.99',
      popular: true,
    },
    {
      region: 'Europe',
      countries: '39 countries',
      data: '3GB',
      days: '30 days',
      price: '$8.99',
      popular: false,
    },
    {
      region: 'Asia',
      countries: '18 countries',
      data: '5GB',
      days: '15 days',
      price: '$12.99',
      popular: false,
    },
    {
      region: 'USA & Canada',
      countries: '2 countries',
      data: '10GB',
      days: '30 days',
      price: '$19.99',
      popular: false,
    },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Instant Activation',
      description: 'Receive QR code via email immediately after purchase. Activate in seconds.',
    },
    {
      icon: '🌍',
      title: '190+ Countries',
      description: 'Stay connected in nearly every country worldwide with a single eSIM.',
    },
    {
      icon: '💰',
      title: 'Save Up to 90%',
      description: 'Avoid expensive roaming charges. Pay only for what you need.',
    },
    {
      icon: '📱',
      title: 'Easy Setup',
      description: 'Compatible with iPhone, Google Pixel, Samsung, and most modern phones.',
    },
  ];

  const howItWorks = [
    { step: 1, title: 'Purchase Plan', description: 'Choose your destination and data plan' },
    { step: 2, title: 'Receive QR Code', description: 'Get instant confirmation via email' },
    { step: 3, title: 'Scan & Activate', description: 'Scan the QR code in your phone settings' },
    { step: 4, title: 'Stay Connected', description: 'Enjoy high-speed data worldwide' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[500px] bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <OptimizedImage
              src={getDestinationImage('technology')}
              alt="Travel eSIM digital connectivity"
              fill
              objectFit="cover"
              priority
            />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Travel eSIM for Global Connectivity</h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Stay connected in 190+ countries. No physical SIM card needed. Instant activation.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="#plans"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
              >
                View Plans
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition text-lg"
              >
                How It Works
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our eSIM?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Popular eSIM Plans</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Choose the perfect plan for your trip</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-6 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white ring-4 ring-blue-300'
                      : 'bg-white border-2 border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="text-sm font-semibold mb-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full inline-block">
                      Most Popular
                    </div>
                  )}
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.region}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.countries}
                  </p>
                  <div className="mb-4">
                    <div className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-blue-600'}`}>
                      {plan.price}
                    </div>
                  </div>
                  <div className={`space-y-2 mb-6 ${plan.popular ? 'text-blue-50' : 'text-gray-700'}`}>
                    <p>✓ {plan.data} data</p>
                    <p>✓ Valid for {plan.days}</p>
                    <p>✓ 5G/4G LTE speeds</p>
                    <p>✓ Instant activation</p>
                  </div>
                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      plan.popular
                        ? 'bg-white text-blue-600 hover:bg-gray-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {howItWorks.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compatible Devices */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Compatible Devices</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Works with most modern smartphones that support eSIM technology
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['iPhone XS and newer', 'Google Pixel 3 and newer', 'Samsung Galaxy S20+', 'Most iPads'].map(
                (device, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold">{device}</p>
                  </div>
                )
              )}
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Not sure if your device is compatible?{' '}
              <Link href="/help" className="text-blue-600 hover:underline">
                Check compatibility list
              </Link>
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Stay Connected?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Get your travel eSIM now and enjoy seamless connectivity worldwide
            </p>
            <Link
              href="#plans"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Browse eSIM Plans
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
