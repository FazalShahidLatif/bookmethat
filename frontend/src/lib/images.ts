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
   * Cached image URLs for popular destinations and blog topics
   */
  getDefaultImages(): Record<string, string> {
    return {
      // Major cities
      dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
      santorini: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      'new-york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
      newyork: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
      london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
      barcelona: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
      singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
      
      // Additional destinations for blog posts
      thailand: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
      lisbon: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b',
      iceland: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927',
      croatia: 'https://images.unsplash.com/photo-1555990793-da11153b2473',
      'new-zealand': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
      japan: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      italy: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
      rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      greece: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
      peru: 'https://images.unsplash.com/photo-1531968455001-5c5272a41129',
      mexico: 'https://images.unsplash.com/photo-1518638150340-f706e86654de',
      portugal: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b',
      spain: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325',
      morocco: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43',
      colombia: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d',
      vietnam: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
      indonesia: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
      
      // Travel concepts for blog hero images
      beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      mountains: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'sustainable-travel': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
      'digital-nomad': 'https://images.unsplash.com/photo-1488998527040-85054a85150e',
      backpacking: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
      family: 'https://images.unsplash.com/photo-1511895426328-dc8714191300',
      luxury: 'https://images.unsplash.com/photo-1540541338287-41700207dee6',
      adventure: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
      'solo-travel': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
      budget: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
      planning: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
      airport: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
      hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      passport: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552',
      smartphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
      technology: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      esim: 'https://images.unsplash.com/photo-1556656793-08538906a9f8',
      booking: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    };
  }

  /**
   * Get image for destination with fallback
   */
  getDestinationImageUrl(destination: string): string {
    const defaults = this.getDefaultImages();
    const key = destination.toLowerCase().replace(/\s+/g, '-');
    const baseUrl = defaults[key];
    
    if (baseUrl) {
      // Add optimization parameters to Unsplash URLs
      return `${baseUrl}?w=1600&h=900&fit=crop&q=80&auto=format`;
    }
    
    // Fallback to Unsplash source
    return `https://source.unsplash.com/1600x900/?${encodeURIComponent(destination)},travel`;
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
