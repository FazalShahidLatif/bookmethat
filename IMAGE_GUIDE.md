# Image Optimization Guide for bookmethat

## Quick Start

### 1. Get Unsplash API Key (Free)
1. Sign up at https://unsplash.com/developers
2. Create a new application
3. Copy your Access Key
4. Add to `.env.local`:
```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key_here
```

### 2. Usage in Components

#### Basic Usage
```tsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="https://images.unsplash.com/photo-123"
  alt="Dubai Luxury Hotel"
  width={800}
  height={600}
/>
```

#### With Attribution
```tsx
<OptimizedImage
  src={imageUrl}
  alt="Hotel Room"
  width={1200}
  height={800}
  showAttribution={true}
  attribution='Photo by <a href="...">John Doe</a> on Unsplash'
/>
```

#### Responsive Fill
```tsx
<div className="relative h-96">
  <OptimizedImage
    src={imageUrl}
    alt="Destination"
    fill={true}
    objectFit="cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

### 3. Using Image Service

```tsx
import { imageService, getDestinationImage } from '@/lib/images';

// Get optimized URL
const optimizedUrl = imageService.getOptimizedUrl(rawUrl, {
  width: 800,
  quality: 85,
  format: 'webp'
});

// Search for images
const images = await imageService.searchImages('dubai hotels', 10);

// Get destination default image
const dubaiImage = getDestinationImage('dubai');
```

## Performance Targets

- **Thumbnail:** < 20KB, < 100ms load
- **Card Image:** < 100KB, < 500ms load
- **Hero Image:** < 200KB, < 1s load
- **LCP (Largest Contentful Paint):** < 2.5s

## Image Sizes by Use Case

### Homepage Hero
- Desktop: 1920x1080 (WebP, 150-200KB)
- Mobile: 750x1000 (WebP, 80-120KB)
- Priority: `true` (preload)

### Destination Cards
- Size: 600x400 (WebP, 50-80KB)
- Lazy loading: `true`
- Blur placeholder: `true`

### Property Listings
- Thumbnail: 300x200 (WebP, 20-40KB)
- Gallery: 1200x800 (WebP, 100-150KB)

### Blog Images
- Featured: 1200x630 (WebP, 100KB)
- Inline: 800x600 (WebP, 60KB)

## Responsive Images

```tsx
<OptimizedImage
  src={imageUrl}
  alt="Responsive Image"
  width={1200}
  height={800}
  sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         33vw"
/>
```

## Cached Destinations

Pre-configured high-quality images for popular destinations:
- Dubai, Bali, Paris, Tokyo, Maldives
- Santorini, New York, London, Barcelona, Singapore

No API calls needed for these!

## Attribution Requirements

Unsplash requires attribution (recommended but not mandatory):
```html
Photo by [Photographer Name] on Unsplash
```

Our component handles this automatically with `showAttribution={true}`.

## API Limits

**Free Tier:**
- 50 requests per hour
- Resets every hour
- Sufficient for most use cases

**Rate Limit Strategy:**
1. Use cached destination images
2. Store image URLs in database
3. Only fetch new images when needed
4. Consider paid plan for high traffic ($99/mo unlimited)

## Best Practices

1. ✅ Always provide `alt` text for accessibility
2. ✅ Use `priority={true}` for above-the-fold images
3. ✅ Specify explicit width/height to prevent layout shift
4. ✅ Use appropriate image sizes (don't load 4K for thumbnails)
5. ✅ Enable lazy loading for below-the-fold content
6. ✅ Compress images (quality: 80-85 is optimal)
7. ✅ Use WebP/AVIF formats (automatic with Next.js)
8. ✅ Add blur placeholders for better UX

## Troubleshooting

### Images Not Loading
- Check Unsplash API key in `.env.local`
- Verify domain is whitelisted in `next.config.mjs`
- Check browser console for CORS errors

### Slow Loading
- Reduce image quality (try 70-75 instead of 85)
- Use smaller dimensions
- Enable CDN caching
- Check network throttling in DevTools

### Attribution Not Showing
- Set `showAttribution={true}`
- Provide `attribution` prop with HTML string

## Monitoring

### Lighthouse Scores
```bash
npm run lighthouse
```

Target scores:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### Image Metrics
- LCP: < 2.5s
- CLS: < 0.1
- FID: < 100ms

## Alternative Sources

If Unsplash limit exceeded:
1. **Pexels** - Unlimited free API
2. **Pixabay** - Free with API key
3. **Cloudinary** - Paid but powerful transformations

## Cost Analysis

| Solution | Monthly Cost | Images | CDN | Support |
|----------|-------------|--------|-----|---------|
| **Unsplash Free** | $0 | 50/hr | ✅ | Community |
| **Unsplash+** | $99 | Unlimited | ✅ | Priority |
| **Pexels** | $0 | Unlimited | ✅ | Community |
| **Cloudinary Free** | $0 | 25GB | ✅ | Limited |
| **Cloudinary Paid** | $99+ | Custom | ✅ | Full |

**Recommendation:** Start with Unsplash Free, upgrade if needed.

---

**Need Help?**
- Documentation: `/docs/images.md`
- Support: dev@bookmethat.com
