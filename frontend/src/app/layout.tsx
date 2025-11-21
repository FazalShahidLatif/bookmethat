import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'bookmethat - Book Hotels, Flights, Cars & Activities | Best Travel Deals 2025',
  description: 'Find and book cheap hotels, flights, car rentals, and activities worldwide. Compare prices, read reviews, and get instant confirmation. 2M+ properties in 190+ countries. Free cancellation available.',
  keywords: [
    // Primary travel booking keywords
    'book hotels online',
    'cheap flights',
    'hotel booking',
    'flight booking',
    'car rental',
    'vacation rentals',
    'travel deals',
    'last minute hotels',
    'cheap accommodation',
    'best hotel deals',
    // Trending 2025 keywords
    'sustainable travel',
    'eco-friendly hotels',
    'workation destinations',
    'digital nomad hotels',
    'bleisure travel',
    'extended stay hotels',
    'pet-friendly hotels',
    'luxury travel deals',
    'budget travel 2025',
    'solo travel bookings',
    // Location-based trending
    'europe travel deals',
    'asia hotel booking',
    'dubai hotels',
    'bali accommodation',
    'tokyo hotels',
    'paris hotel deals',
    'maldives resorts',
    'santorini hotels',
    // Activities & experiences
    'travel activities',
    'tours and experiences',
    'attraction tickets',
    'airport transfers',
    // Value-added
    'travel esim',
    'international data',
    'roaming free',
  ],
  authors: [{ name: 'bookmethat' }],
  creator: 'bookmethat',
  publisher: 'bookmethat',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bookmethat.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'bookmethat - Book Hotels, Flights & Travel Deals',
    description: 'Find and book cheap hotels, flights, car rentals worldwide. 2M+ properties, best price guarantee.',
    url: 'https://bookmethat.com',
    siteName: 'bookmethat',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'bookmethat - Your Travel Booking Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bookmethat - Book Hotels, Flights & Travel Deals',
    description: 'Find and book cheap hotels, flights, car rentals worldwide.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'bookmethat',
  },
  applicationName: 'bookmethat',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.bookmethat.com" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
