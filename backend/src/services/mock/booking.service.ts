/**
 * Mock Booking Service
 * 
 * Simulates booking provider APIs (hotels, flights, cars, activities).
 * Returns realistic mock data for development.
 * 
 * When ready to integrate real providers (Amadeus, Booking.com, etc.):
 * 1. Add API keys to .env
 * 2. Set USE_MOCK_BOOKING=false
 * 3. Implement real API adapters
 */

const USE_MOCK = process.env.USE_MOCK_BOOKING !== 'false';

// ===== HOTEL TYPES =====
interface HotelSearchParams {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  stars: number;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  images: string[];
  amenities: string[];
  description: string;
}

// ===== FLIGHT TYPES =====
interface FlightSearchParams {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: 'Economy' | 'Business' | 'First';
}

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: number; // minutes
  stops: number;
  price: number;
  currency: string;
  cabinClass: string;
  baggage: string;
}

// ===== CAR TYPES =====
interface CarSearchParams {
  city: string;
  pickupDate: string;
  dropoffDate: string;
}

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: string;
  year: number;
  transmission: string;
  fuelType: string;
  seats: number;
  doors: number;
  luggage: number;
  pricePerDay: number;
  currency: string;
  image: string;
  features: string[];
}

// ===== ACTIVITY TYPES =====
interface ActivitySearchParams {
  city: string;
  date?: string;
  category?: string;
}

interface Activity {
  id: string;
  title: string;
  city: string;
  country: string;
  category: string;
  description: string;
  duration: number; // hours
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  included: string[];
  notIncluded: string[];
  images: string[];
}

class MockBookingService {
  // ===== HOTEL METHODS =====
  async searchHotels(params: HotelSearchParams): Promise<Hotel[]> {
    if (USE_MOCK) {
      return this.getMockHotels(params.city);
    }
    throw new Error('Real booking API not implemented yet');
  }

  async getHotel(id: string): Promise<Hotel | null> {
    if (USE_MOCK) {
      const allHotels = [
        ...this.getMockHotels('Dubai'),
        ...this.getMockHotels('Bali'),
        ...this.getMockHotels('Tokyo'),
      ];
      return allHotels.find((h) => h.id === id) || null;
    }
    throw new Error('Real booking API not implemented yet');
  }

  // ===== FLIGHT METHODS =====
  async searchFlights(params: FlightSearchParams): Promise<Flight[]> {
    if (USE_MOCK) {
      return this.getMockFlights(params.origin, params.destination);
    }
    throw new Error('Real booking API not implemented yet');
  }

  async getFlight(id: string): Promise<Flight | null> {
    if (USE_MOCK) {
      const flights = this.getMockFlights('LHR', 'DXB');
      return flights.find((f) => f.id === id) || null;
    }
    throw new Error('Real booking API not implemented yet');
  }

  // ===== CAR METHODS =====
  async searchCars(params: CarSearchParams): Promise<Car[]> {
    if (USE_MOCK) {
      return this.getMockCars(params.city);
    }
    throw new Error('Real booking API not implemented yet');
  }

  async getCar(id: string): Promise<Car | null> {
    if (USE_MOCK) {
      const cars = this.getMockCars('Dubai');
      return cars.find((c) => c.id === id) || null;
    }
    throw new Error('Real booking API not implemented yet');
  }

  // ===== ACTIVITY METHODS =====
  async searchActivities(params: ActivitySearchParams): Promise<Activity[]> {
    if (USE_MOCK) {
      return this.getMockActivities(params.city);
    }
    throw new Error('Real booking API not implemented yet');
  }

  async getActivity(id: string): Promise<Activity | null> {
    if (USE_MOCK) {
      const activities = this.getMockActivities('Dubai');
      return activities.find((a) => a.id === id) || null;
    }
    throw new Error('Real booking API not implemented yet');
  }

  // ===== MOCK DATA GENERATORS =====
  private getMockHotels(city: string): Hotel[] {
    const hotelsByCity: Record<string, Hotel[]> = {
      Dubai: [
        {
          id: 'hotel-dxb-001',
          name: 'Grand Palace Hotel',
          city: 'Dubai',
          country: 'UAE',
          address: 'Sheikh Zayed Road, Downtown Dubai',
          stars: 5,
          rating: 4.8,
          reviewCount: 1234,
          pricePerNight: 299,
          currency: 'USD',
          images: [
            'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
            'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
          ],
          amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Parking'],
          description: 'Luxury hotel in the heart of Dubai with stunning Burj Khalifa views',
        },
        {
          id: 'hotel-dxb-002',
          name: 'Marina Bay Resort',
          city: 'Dubai',
          country: 'UAE',
          address: 'Dubai Marina',
          stars: 4,
          rating: 4.5,
          reviewCount: 856,
          pricePerNight: 199,
          currency: 'USD',
          images: ['https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'],
          amenities: ['WiFi', 'Pool', 'Beach Access', 'Restaurant'],
          description: 'Modern resort with private beach and marina views',
        },
      ],
      Bali: [
        {
          id: 'hotel-bali-001',
          name: 'Ubud Garden Villa',
          city: 'Ubud',
          country: 'Indonesia',
          address: 'Jalan Raya Ubud',
          stars: 4,
          rating: 4.7,
          reviewCount: 678,
          pricePerNight: 149,
          currency: 'USD',
          images: ['https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg'],
          amenities: ['WiFi', 'Pool', 'Spa', 'Yoga', 'Restaurant'],
          description: 'Tranquil villa surrounded by rice terraces and jungle',
        },
      ],
      Tokyo: [
        {
          id: 'hotel-tokyo-001',
          name: 'Shibuya Grand Hotel',
          city: 'Tokyo',
          country: 'Japan',
          address: 'Shibuya Crossing',
          stars: 5,
          rating: 4.6,
          reviewCount: 943,
          pricePerNight: 279,
          currency: 'USD',
          images: ['https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'],
          amenities: ['WiFi', 'Restaurant', 'Bar', 'Gym', 'Concierge'],
          description: 'Modern hotel in the heart of Shibuya',
        },
      ],
    };

    return hotelsByCity[city] || [];
  }

  private getMockFlights(origin: string, destination: string): Flight[] {
    return [
      {
        id: 'flight-001',
        flightNumber: 'EK145',
        airline: 'Emirates',
        airlineCode: 'EK',
        origin,
        destination,
        departureTime: '2025-02-15T14:30:00Z',
        arrivalTime: '2025-02-15T22:45:00Z',
        duration: 495,
        stops: 0,
        price: 850,
        currency: 'USD',
        cabinClass: 'Economy',
        baggage: '30kg checked, 7kg cabin',
      },
      {
        id: 'flight-002',
        flightNumber: 'BA178',
        airline: 'British Airways',
        airlineCode: 'BA',
        origin,
        destination,
        departureTime: '2025-02-15T10:15:00Z',
        arrivalTime: '2025-02-15T18:30:00Z',
        duration: 495,
        stops: 0,
        price: 780,
        currency: 'USD',
        cabinClass: 'Economy',
        baggage: '23kg checked, 7kg cabin',
      },
    ];
  }

  private getMockCars(city: string): Car[] {
    return [
      {
        id: 'car-001',
        name: 'Toyota Camry 2024',
        brand: 'Toyota',
        model: 'Camry',
        type: 'Sedan',
        year: 2024,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        seats: 5,
        doors: 4,
        luggage: 3,
        pricePerDay: 45,
        currency: 'USD',
        image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
        features: ['AC', 'GPS', 'Bluetooth', 'USB Charging'],
      },
      {
        id: 'car-002',
        name: 'BMW X5 2024',
        brand: 'BMW',
        model: 'X5',
        type: 'SUV',
        year: 2024,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        seats: 7,
        doors: 5,
        luggage: 5,
        pricePerDay: 120,
        currency: 'USD',
        image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg',
        features: ['AC', 'GPS', 'Bluetooth', 'Leather Seats', 'Sunroof'],
      },
    ];
  }

  private getMockActivities(city: string): Activity[] {
    const activitiesByCity: Record<string, Activity[]> = {
      Dubai: [
        {
          id: 'activity-dxb-001',
          title: 'Burj Khalifa At The Top',
          city: 'Dubai',
          country: 'UAE',
          category: 'Sightseeing',
          description: 'Visit the world\'s tallest building with skip-the-line access',
          duration: 2,
          price: 89,
          currency: 'USD',
          rating: 4.9,
          reviewCount: 5678,
          included: ['Skip-the-line ticket', '124th & 125th floor access', 'Audio guide'],
          notIncluded: ['Hotel pickup', 'Food & drinks'],
          images: ['https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg'],
        },
        {
          id: 'activity-dxb-002',
          title: 'Desert Safari with BBQ Dinner',
          city: 'Dubai',
          country: 'UAE',
          category: 'Adventure',
          description: 'Thrilling desert safari with dune bashing, camel ride, and BBQ dinner',
          duration: 6,
          price: 65,
          currency: 'USD',
          rating: 4.7,
          reviewCount: 3421,
          included: ['Hotel pickup/dropoff', 'Dune bashing', 'Camel ride', 'BBQ dinner', 'Shows'],
          notIncluded: ['Quad biking (extra $20)'],
          images: ['https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg'],
        },
      ],
    };

    return activitiesByCity[city] || [];
  }

  isMockMode(): boolean {
    return USE_MOCK;
  }
}

export const bookingService = new MockBookingService();
