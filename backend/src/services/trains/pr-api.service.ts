/**
 * Pakistan Railway API Service
 * Adapter for Pakistan Railway booking system
 * 
 * API Documentation: https://www.pakrail.gov.pk/api-docs (placeholder)
 * Official Website: https://www.pakrail.gov.pk
 */

import axios, { AxiosInstance } from 'axios';

// Environment variables
const PR_API_BASE_URL = process.env.PR_API_URL || 'https://api.pakrail.gov.pk/booking/v1';
const PR_API_KEY = process.env.PR_API_KEY || '';
const PR_API_SECRET = process.env.PR_API_SECRET || '';

// Use mock mode based on environment variable
const MOCK_MODE = process.env.USE_MOCK_TRAINS !== 'false';

/**
 * Train search parameters
 */
export interface TrainSearchParams {
  from: string;           // Origin station code (e.g., 'KHI' for Karachi)
  to: string;             // Destination station code (e.g., 'LHE' for Lahore)
  date: string;           // Travel date in YYYY-MM-DD format
  class?: 'ECONOMY' | 'AC_BUSINESS' | 'AC_SLEEPER'; // Optional class filter
}

/**
 * Train seat/berth details
 */
export interface TrainSeat {
  seatNumber: string;
  coach: string;
  isAvailable: boolean;
  price: number;
}

/**
 * Train details from search
 */
export interface Train {
  trainId: string;
  trainNumber: string;
  trainName: string;
  departure: {
    station: string;
    stationCode: string;
    time: string;        // HH:mm format
    date: string;        // YYYY-MM-DD
  };
  arrival: {
    station: string;
    stationCode: string;
    time: string;
    date: string;
  };
  duration: string;      // e.g., "12h 30m"
  classes: {
    type: 'ECONOMY' | 'AC_BUSINESS' | 'AC_SLEEPER';
    availableSeats: number;
    price: number;
    amenities: string[];
  }[];
  status: 'ON_TIME' | 'DELAYED' | 'CANCELLED';
}

/**
 * Train booking request
 */
export interface TrainBookingRequest {
  trainId: string;
  trainNumber: string;
  date: string;
  class: 'ECONOMY' | 'AC_BUSINESS' | 'AC_SLEEPER';
  passengers: {
    name: string;
    age: number;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    cnic: string;        // Pakistan National ID Card number
    seatPreference?: string;
  }[];
  contactPhone: string;
  contactEmail: string;
}

/**
 * Train booking response
 */
export interface TrainBookingResponse {
  bookingId: string;
  pnr: string;          // Passenger Name Record
  trainNumber: string;
  trainName: string;
  date: string;
  class: string;
  seats: TrainSeat[];
  passengers: number;
  totalAmount: number;
  status: 'CONFIRMED' | 'WAITING' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  eTicketUrl?: string;
}

/**
 * Pakistan Railway API Service Class
 */
class PakistanRailwayService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: PR_API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PR_API_KEY}`,
        'X-API-Secret': PR_API_SECRET,
      },
    });

    if (MOCK_MODE) {
      console.warn('⚠️  Pakistan Railway API running in MOCK MODE (no API keys configured)');
    }
  }

  /**
   * Search available trains between stations
   */
  async searchTrains(params: TrainSearchParams): Promise<Train[]> {
    if (MOCK_MODE) {
      return this.getMockTrains(params);
    }

    try {
      const response = await this.client.post('/search', {
        origin: params.from,
        destination: params.to,
        date: params.date,
        class: params.class,
      });

      return response.data.trains || [];
    } catch (error: any) {
      console.error('Pakistan Railway API Error:', error.message);
      throw new Error(`Failed to search trains: ${error.message}`);
    }
  }

  /**
   * Book train tickets
   */
  async bookTrain(booking: TrainBookingRequest): Promise<TrainBookingResponse> {
    if (MOCK_MODE) {
      return this.getMockBooking(booking);
    }

    try {
      const response = await this.client.post('/book', booking);

      return response.data;
    } catch (error: any) {
      console.error('Pakistan Railway Booking Error:', error.message);
      throw new Error(`Failed to book train: ${error.message}`);
    }
  }

  /**
   * Get booking details by PNR
   */
  async getBookingByPNR(pnr: string): Promise<TrainBookingResponse> {
    if (MOCK_MODE) {
      return this.getMockBookingByPNR(pnr);
    }

    try {
      const response = await this.client.get(`/booking/${pnr}`);

      return response.data;
    } catch (error: any) {
      console.error('Pakistan Railway Get Booking Error:', error.message);
      throw new Error(`Failed to get booking: ${error.message}`);
    }
  }

  /**
   * Cancel train booking
   */
  async cancelBooking(pnr: string, reason?: string): Promise<{ success: boolean; refundAmount: number }> {
    if (MOCK_MODE) {
      return { success: true, refundAmount: 3500 };
    }

    try {
      const response = await this.client.post(`/cancel`, {
        pnr,
        reason: reason || 'User cancellation',
      });

      return {
        success: response.data.success,
        refundAmount: response.data.refundAmount || 0,
      };
    } catch (error: any) {
      console.error('Pakistan Railway Cancel Error:', error.message);
      throw new Error(`Failed to cancel booking: ${error.message}`);
    }
  }

  /**
   * Get list of major stations
   */
  async getStations(): Promise<{ code: string; name: string; city: string }[]> {
    if (MOCK_MODE) {
      return this.getMockStations();
    }

    try {
      const response = await this.client.get('/stations');
      return response.data.stations || [];
    } catch (error: any) {
      console.error('Pakistan Railway Stations Error:', error.message);
      return this.getMockStations(); // Fallback to mock data
    }
  }

  // ========== MOCK DATA FOR DEVELOPMENT ==========

  private getMockStations() {
    return [
      { code: 'KHI', name: 'Karachi Cantt', city: 'Karachi' },
      { code: 'LHE', name: 'Lahore Junction', city: 'Lahore' },
      { code: 'RWP', name: 'Rawalpindi', city: 'Rawalpindi' },
      { code: 'ISB', name: 'Islamabad', city: 'Islamabad' },
      { code: 'MUX', name: 'Multan Cantt', city: 'Multan' },
      { code: 'FSD', name: 'Faisalabad', city: 'Faisalabad' },
      { code: 'SKT', name: 'Sialkot', city: 'Sialkot' },
      { code: 'QTA', name: 'Quetta', city: 'Quetta' },
      { code: 'PSH', name: 'Peshawar Cantt', city: 'Peshawar' },
      { code: 'HYD', name: 'Hyderabad', city: 'Hyderabad' },
    ];
  }

  private getMockTrains(params: TrainSearchParams): Train[] {
    const stations = this.getMockStations();
    const fromStation = stations.find(s => s.code === params.from);
    const toStation = stations.find(s => s.code === params.to);

    if (!fromStation || !toStation) {
      return [];
    }

    return [
      {
        trainId: 'train-001',
        trainNumber: '1-UP',
        trainName: 'Karachi Express',
        departure: {
          station: fromStation.name,
          stationCode: params.from,
          time: '08:00',
          date: params.date,
        },
        arrival: {
          station: toStation.name,
          stationCode: params.to,
          time: '20:30',
          date: params.date,
        },
        duration: '12h 30m',
        classes: [
          {
            type: 'ECONOMY',
            availableSeats: 45,
            price: 1200,
            amenities: ['Fan', 'Basic Seating'],
          },
          {
            type: 'AC_BUSINESS',
            availableSeats: 12,
            price: 2500,
            amenities: ['AC', 'Reclining Seats', 'Charging Port'],
          },
          {
            type: 'AC_SLEEPER',
            availableSeats: 8,
            price: 4000,
            amenities: ['AC', 'Sleeper Berth', 'Bedding', 'Meals'],
          },
        ],
        status: 'ON_TIME',
      },
      {
        trainId: 'train-002',
        trainNumber: '15-UP',
        trainName: 'Tezgam',
        departure: {
          station: fromStation.name,
          stationCode: params.from,
          time: '14:15',
          date: params.date,
        },
        arrival: {
          station: toStation.name,
          stationCode: params.to,
          time: '02:00',
          date: params.date,
        },
        duration: '11h 45m',
        classes: [
          {
            type: 'ECONOMY',
            availableSeats: 32,
            price: 1100,
            amenities: ['Fan', 'Basic Seating'],
          },
          {
            type: 'AC_BUSINESS',
            availableSeats: 18,
            price: 2300,
            amenities: ['AC', 'Reclining Seats', 'Charging Port'],
          },
        ],
        status: 'ON_TIME',
      },
      {
        trainId: 'train-003',
        trainNumber: '7-UP',
        trainName: 'Pakistan Express',
        departure: {
          station: fromStation.name,
          stationCode: params.from,
          time: '22:30',
          date: params.date,
        },
        arrival: {
          station: toStation.name,
          stationCode: params.to,
          time: '11:45',
          date: params.date,
        },
        duration: '13h 15m',
        classes: [
          {
            type: 'ECONOMY',
            availableSeats: 28,
            price: 1000,
            amenities: ['Fan', 'Basic Seating'],
          },
          {
            type: 'AC_SLEEPER',
            availableSeats: 15,
            price: 3800,
            amenities: ['AC', 'Sleeper Berth', 'Bedding', 'Meals'],
          },
        ],
        status: 'DELAYED',
      },
    ];
  }

  private getMockBooking(booking: TrainBookingRequest): TrainBookingResponse {
    const pnr = `PNR${Date.now().toString().slice(-8)}`;
    
    return {
      bookingId: `book-${Date.now()}`,
      pnr,
      trainNumber: booking.trainNumber,
      trainName: 'Karachi Express',
      date: booking.date,
      class: booking.class,
      seats: booking.passengers.map((_, i) => ({
        seatNumber: `${i + 1}A`,
        coach: 'S-2',
        isAvailable: true,
        price: booking.class === 'ECONOMY' ? 1200 : booking.class === 'AC_BUSINESS' ? 2500 : 4000,
      })),
      passengers: booking.passengers.length,
      totalAmount: booking.passengers.length * (booking.class === 'ECONOMY' ? 1200 : booking.class === 'AC_BUSINESS' ? 2500 : 4000),
      status: 'CONFIRMED',
      paymentStatus: 'PENDING',
      eTicketUrl: `https://pakrail.gov.pk/eticket/${pnr}`,
    };
  }

  private getMockBookingByPNR(pnr: string): TrainBookingResponse {
    return {
      bookingId: `book-${Date.now()}`,
      pnr,
      trainNumber: '1-UP',
      trainName: 'Karachi Express',
      date: new Date().toISOString().split('T')[0],
      class: 'AC_BUSINESS',
      seats: [
        { seatNumber: '1A', coach: 'S-2', isAvailable: true, price: 2500 },
        { seatNumber: '2A', coach: 'S-2', isAvailable: true, price: 2500 },
      ],
      passengers: 2,
      totalAmount: 5000,
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      eTicketUrl: `https://pakrail.gov.pk/eticket/${pnr}`,
    };
  }
}

// Export singleton instance
export const pakistanRailwayService = new PakistanRailwayService();
