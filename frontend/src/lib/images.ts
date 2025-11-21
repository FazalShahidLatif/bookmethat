// Image optimization service using Unsplash API
// Provides fast, high-quality travel images with CDN delivery

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
  };
}

export interface OptimizedImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg';
  fit?: 'crop' | 'max' | 'fill';
}

class ImageService {
  /**
   * Get optimized image URL with transformations
   */
  getOptimizedUrl(
    baseUrl: string,
    options: OptimizedImageOptions = {}
  ): string {
    const {
      width,
      height,
      quality = 80,
      format = 'webp',
      fit = 'crop',
    } = options;

    const params = new URLSearchParams();
    
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', quality.toString());
    params.append('fm', format);
    params.append('fit', fit);
    params.append('auto', 'format,compress');

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Search Unsplash for destination/hotel images
   */
  async searchImages(query: string, perPage = 10): Promise<UnsplashImage[]> {
    if (!UNSPLASH_ACCESS_KEY) {
      console.warn('Unsplash API key not configured');
      return [];
    }

    try {
      const response = await fetch(
        `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching Unsplash images:', error);
      return [];
    }
  }

  /**
   * Get random image for a destination
   */
  async getDestinationImage(location: string): Promise<UnsplashImage | null> {
    const images = await this.searchImages(`${location} travel hotel`, 1);
    return images[0] || null;
  }

  /**
   * Get hotel/accommodation images
   */
  async getHotelImages(location: string, count = 5): Promise<UnsplashImage[]> {
    return this.searchImages(`${location} luxury hotel interior`, count);
  }

  /**
   * Get activity/attraction images
   */
  async getActivityImages(activity: string, location: string): Promise<UnsplashImage[]> {
    return this.searchImages(`${activity} ${location}`, 5);
  }

  /**
   * Generate low-quality placeholder (LQIP) data URL
   */
  getBlurDataUrl(imageId: string): string {
    // Tiny 10px image for blur placeholder
    return `https://images.unsplash.com/${imageId}?w=10&q=10&blur=100`;
  }

  /**
   * Get placeholder image URL (for loading states)
   */
  getPlaceholder(seed: string, width = 800, height = 600): string {
    return `https://images.unsplash.com/photo-${seed}?w=${width}&h=${height}&fit=crop&q=10&blur=100`;
  }

  /**
   * Get responsive image srcset
   */
  getResponsiveSrcSet(baseUrl: string, sizes: number[] = [640, 750, 828, 1080, 1200]): string {
    return sizes
      .map(size => `${this.getOptimizedUrl(baseUrl, { width: size })} ${size}w`)
      .join(', ');
  }

  /**
   * Preload critical images
   */
  preloadImage(url: string): void {
    if (typeof window === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  }

  /**
   * Get attribution HTML for Unsplash images
   */
  getAttribution(image: UnsplashImage): string {
    return `Photo by <a href="${image.user.links.html}?utm_source=bookmethat&utm_medium=referral" target="_blank" rel="noopener noreferrer">${image.user.name}</a> on <a href="https://unsplash.com?utm_source=bookmethat&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>`;
  }

  /**
   * Cached image URLs for popular destinations
   */
  getDefaultImages(): Record<string, string> {
    return {
      dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
      santorini: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      'new-york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
      london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
      barcelona: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
      singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
    };
  }

  /**
   * Get image for destination with fallback
   */
  getDestinationImageUrl(destination: string): string {
    const defaults = this.getDefaultImages();
    const key = destination.toLowerCase().replace(/\s+/g, '-');
    return defaults[key] || `https://source.unsplash.com/1600x900/?${encodeURIComponent(destination)},travel`;
  }
}

// Export singleton instance
export const imageService = new ImageService();

// Export helper functions
export const getOptimizedImageUrl = (url: string, options?: OptimizedImageOptions) =>
  imageService.getOptimizedUrl(url, options);

export const getDestinationImage = (destination: string) =>
  imageService.getDestinationImageUrl(destination);

export default imageService;
