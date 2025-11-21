// Pexels API Client for high-quality travel images
const PEXELS_API_KEY = 'EvgrKEuN2epijIsqCuyExHTrLEyDUX7yotUrfuQ6l7UYJiJJpR1CPMrZ';
const PEXELS_BASE_URL = 'https://api.pexels.com/v1';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
}

/**
 * Search photos on Pexels
 */
export async function searchPexels(
  query: string,
  perPage: number = 15,
  page: number = 1
): Promise<PexelsSearchResponse> {
  try {
    const response = await fetch(
      `${PEXELS_BASE_URL}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Pexels API error:', error);
    throw error;
  }
}

/**
 * Get curated photos from Pexels
 */
export async function getCuratedPhotos(
  perPage: number = 15,
  page: number = 1
): Promise<PexelsSearchResponse> {
  try {
    const response = await fetch(
      `${PEXELS_BASE_URL}/curated?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Pexels API error:', error);
    throw error;
  }
}

/**
 * Get a single photo by ID
 */
export async function getPexelsPhoto(id: number): Promise<PexelsPhoto> {
  try {
    const response = await fetch(`${PEXELS_BASE_URL}/photos/${id}`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Pexels API error:', error);
    throw error;
  }
}

/**
 * Get travel-related images for specific destinations
 */
export async function getDestinationImages(
  destination: string,
  count: number = 10
): Promise<PexelsPhoto[]> {
  const queries = [
    `${destination} hotel`,
    `${destination} travel`,
    `${destination} tourism`,
    `${destination} skyline`,
    `${destination} landmark`,
  ];

  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const result = await searchPexels(randomQuery, count);
  return result.photos;
}

/**
 * Get hotel images
 */
export async function getHotelImages(
  location?: string,
  count: number = 15
): Promise<PexelsPhoto[]> {
  const query = location ? `${location} hotel luxury` : 'luxury hotel room';
  const result = await searchPexels(query, count);
  return result.photos;
}

/**
 * Get flight/airport images
 */
export async function getFlightImages(count: number = 15): Promise<PexelsPhoto[]> {
  const queries = ['airplane window', 'airport terminal', 'flight travel', 'airplane sky'];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const result = await searchPexels(randomQuery, count);
  return result.photos;
}

/**
 * Get car rental images
 */
export async function getCarImages(count: number = 15): Promise<PexelsPhoto[]> {
  const queries = ['luxury car', 'rental car', 'car driving', 'suv car'];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const result = await searchPexels(randomQuery, count);
  return result.photos;
}

/**
 * Helper to get optimal image size URL
 */
export function getOptimalImageUrl(photo: PexelsPhoto, size: 'small' | 'medium' | 'large' = 'medium'): string {
  switch (size) {
    case 'small':
      return photo.src.small;
    case 'large':
      return photo.src.large;
    default:
      return photo.src.medium;
  }
}
