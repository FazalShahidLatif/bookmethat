import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bookmethat.com';
  
  // Static pages
  const staticPages = [
    '',
    '/hotels',
    '/flights',
    '/cars',
    '/activities',
    '/esim',
    '/deals',
    '/about',
    '/contact',
    '/help',
    '/terms',
    '/privacy',
  ];

  // Popular destinations (trending 2025)
  const destinations = [
    '/hotels/dubai',
    '/hotels/bali',
    '/hotels/paris',
    '/hotels/tokyo',
    '/hotels/maldives',
    '/hotels/santorini',
    '/hotels/new-york',
    '/hotels/london',
    '/hotels/barcelona',
    '/hotels/singapore',
    '/hotels/phuket',
    '/hotels/rome',
    '/hotels/istanbul',
    '/hotels/bangkok',
    '/hotels/lisbon',
  ];

  return [
    ...staticPages.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...destinations.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
