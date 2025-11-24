/**
 * E-Ticket Service
 * 
 * Generates QR codes and PDF tickets for bookings
 * 
 * Features:
 * - QR code generation with booking details
 * - PDF ticket creation with branding
 * - Email ticket attachments
 * - Download ticket endpoints
 * 
 * Supported Booking Types:
 * - Train bookings (Pakistan Railway)
 * - Hotel bookings
 * - Flight bookings
 * - Event tickets
 */

import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import { prisma } from '../../lib/prisma';

/**
 * QR Code generation options
 */
interface QRCodeOptions {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  type: 'image/png';
  quality: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
}

/**
 * Train ticket data structure
 */
interface TrainTicketData {
  pnr: string;
  trainNumber: string;
  trainName: string;
  passengerName: string;
  passengerCNIC: string;
  passengerPhone: string;
  fromStation: string;
  toStation: string;
  journeyDate: Date;
  departureTime: string;
  arrivalTime?: string;
  seatNumber?: string;
  coach?: string;
  class: string;
  fare: number;
  bookingDate: Date;
  status: string;
}

/**
 * Hotel ticket data structure
 */
interface HotelTicketData {
  bookingId: string;
  bookingNumber: string;
  hotelName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: Date;
  checkOutDate: Date;
  nights: number;
  roomType: string;
  numberOfRooms: number;
  totalAmount: number;
  bookingDate: Date;
  status: string;
}

/**
 * QR Code data for validation
 */
interface QRData {
  type: 'TRAIN' | 'HOTEL' | 'FLIGHT' | 'EVENT';
  id: string;
  timestamp: number;
  hash: string; // Security hash for verification
}

class TicketService {
  private readonly VERIFICATION_URL = process.env.FRONTEND_URL || 'https://bookmethat.com';

  /**
   * Generate QR code for booking
   */
  async generateQRCode(bookingId: string, bookingType: 'TRAIN' | 'HOTEL' | 'FLIGHT' | 'EVENT'): Promise<string> {
    try {
      // Create verification data
      const qrData: QRData = {
        type: bookingType,
        id: bookingId,
        timestamp: Date.now(),
        hash: this.generateSecurityHash(bookingId),
      };

      // Create verification URL
      const verificationUrl = `${this.VERIFICATION_URL}/verify/${bookingType.toLowerCase()}/${bookingId}?h=${qrData.hash}`;

      // QR code options
      const options: QRCodeOptions = {
        errorCorrectionLevel: 'H', // High error correction
        type: 'image/png',
        quality: 0.95,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      };

      // Generate QR code as data URL
      const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, options);
      
      console.log(`✅ QR Code generated for ${bookingType} booking: ${bookingId}`);
      
      return qrCodeDataUrl;
    } catch (error) {
      console.error('❌ QR Code generation failed:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  /**
   * Generate security hash for QR code verification
   */
  private generateSecurityHash(bookingId: string): string {
    const crypto = require('crypto');
    const secret = process.env.QR_SECRET || 'bookmethat-qr-secret-key';
    return crypto.createHmac('sha256', secret).update(bookingId).digest('hex').substring(0, 16);
  }

  /**
   * Verify QR code hash
   */
  verifyQRHash(bookingId: string, hash: string): boolean {
    const expectedHash = this.generateSecurityHash(bookingId);
    return hash === expectedHash;
  }

  /**
   * Generate PDF ticket for train booking
   */
  async generateTrainTicketPDF(pnr: string): Promise<Buffer> {
    try {
      // Fetch train booking from database
      const booking = await prisma.trainBooking.findUnique({
        where: { pnr },
      });

      if (!booking) {
        throw new Error(`Train booking not found: ${pnr}`);
      }

      // Extract first passenger for ticket (main passenger)
      const passengers = booking.passengers as any[];
      const mainPassenger = passengers[0] || {};
      
      // Extract first seat for ticket
      const seats = booking.seats as any[];
      const mainSeat = seats[0] || {};

      const ticketData: TrainTicketData = {
        pnr: booking.pnr,
        trainNumber: booking.trainNumber,
        trainName: booking.trainName,
        passengerName: mainPassenger.name || 'Passenger',
        passengerCNIC: mainPassenger.cnic || 'N/A',
        passengerPhone: booking.contactPhone,
        fromStation: booking.fromStation,
        toStation: booking.toStation,
        journeyDate: booking.journeyDate,
        departureTime: booking.departureTime,
        arrivalTime: booking.arrivalTime,
        seatNumber: mainSeat.seatNumber || undefined,
        coach: mainSeat.coach || undefined,
        class: booking.class,
        fare: booking.totalAmount,
        bookingDate: booking.createdAt,
        status: booking.status,
      };

      // Generate QR code
      const qrCode = await this.generateQRCode(booking.id, 'TRAIN');

      // Create PDF
      const pdfBuffer = await this.createTrainTicketPDF(ticketData, qrCode);

      console.log(`✅ Train ticket PDF generated: ${pnr}`);
      
      return pdfBuffer;
    } catch (error) {
      console.error('❌ Train ticket PDF generation failed:', error);
      throw error;
    }
  }

  /**
   * Generate PDF ticket for hotel booking
   */
  async generateHotelTicketPDF(bookingId: string): Promise<Buffer> {
    try {
      // Fetch hotel booking from database
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          hotelBooking: true,
        },
      });

      if (!booking || !booking.hotelBooking) {
        throw new Error(`Hotel booking not found: ${bookingId}`);
      }

      const hotel = booking.hotelBooking;

      const ticketData: HotelTicketData = {
        bookingId: booking.id,
        bookingNumber: booking.bookingNumber,
        hotelName: hotel.propertyName,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        guestPhone: booking.guestPhone,
        checkInDate: hotel.checkIn,
        checkOutDate: hotel.checkOut,
        nights: Math.ceil((hotel.checkOut.getTime() - hotel.checkIn.getTime()) / (1000 * 60 * 60 * 24)),
        roomType: hotel.roomType,
        numberOfRooms: 1,
        totalAmount: booking.totalPrice,
        bookingDate: booking.createdAt,
        status: booking.status,
      };

      // Generate QR code
      const qrCode = await this.generateQRCode(booking.id, 'HOTEL');

      // Create PDF
      const pdfBuffer = await this.createHotelTicketPDF(ticketData, qrCode);

      console.log(`✅ Hotel ticket PDF generated: ${bookingId}`);
      
      return pdfBuffer;
    } catch (error) {
      console.error('❌ Hotel ticket PDF generation failed:', error);
      throw error;
    }
  }

  /**
   * Create train ticket PDF document
   */
  private async createTrainTicketPDF(data: TrainTicketData, qrCode: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const chunks: Buffer[] = [];

        // Collect PDF chunks
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Header - Brand
        doc.fontSize(28)
           .fillColor('#667eea')
           .text('BookMeThat', 50, 50);

        doc.fontSize(10)
           .fillColor('#666')
           .text('Pakistan Railway E-Ticket', 50, 85);

        // Ticket border
        doc.rect(40, 120, 515, 600)
           .stroke('#667eea');

        // PNR Section
        doc.fontSize(12)
           .fillColor('#333')
           .text('PNR NUMBER', 60, 140);
        
        doc.fontSize(24)
           .fillColor('#667eea')
           .font('Helvetica-Bold')
           .text(data.pnr, 60, 160);

        // Status badge
        const statusColor = data.status === 'CONFIRMED' ? '#10b981' : '#f59e0b';
        doc.rect(450, 140, 90, 30)
           .fillAndStroke(statusColor, statusColor);
        
        doc.fontSize(12)
           .fillColor('#fff')
           .text(data.status, 460, 150, { width: 70, align: 'center' });

        // Train Details
        doc.font('Helvetica-Bold')
           .fontSize(14)
           .fillColor('#333')
           .text('Train Details', 60, 220);

        doc.font('Helvetica')
           .fontSize(11)
           .fillColor('#666');

        let y = 245;
        const leftCol = 60;
        const rightCol = 320;

        // Left column
        doc.text(`Train: ${data.trainNumber} - ${data.trainName}`, leftCol, y);
        y += 25;
        doc.text(`From: ${data.fromStation}`, leftCol, y);
        y += 20;
        doc.text(`To: ${data.toStation}`, leftCol, y);
        y += 20;
        doc.text(`Date: ${data.journeyDate.toLocaleDateString('en-PK')}`, leftCol, y);
        y += 20;
        doc.text(`Departure: ${data.departureTime}`, leftCol, y);

        // Right column
        y = 245;
        doc.text(`Class: ${data.class}`, rightCol, y);
        y += 25;
        if (data.coach) {
          doc.text(`Coach: ${data.coach}`, rightCol, y);
          y += 20;
        }
        if (data.seatNumber) {
          doc.text(`Seat: ${data.seatNumber}`, rightCol, y);
          y += 20;
        }
        doc.text(`Fare: PKR ${data.fare.toLocaleString()}`, rightCol, y);

        // Passenger Details
        y = 400;
        doc.font('Helvetica-Bold')
           .fontSize(14)
           .fillColor('#333')
           .text('Passenger Details', 60, y);

        y += 25;
        doc.font('Helvetica')
           .fontSize(11)
           .fillColor('#666');

        doc.text(`Name: ${data.passengerName}`, 60, y);
        y += 20;
        doc.text(`CNIC: ${data.passengerCNIC}`, 60, y);
        y += 20;
        doc.text(`Phone: ${data.passengerPhone}`, 60, y);

        // QR Code
        doc.image(qrCode, 420, 400, { width: 120, height: 120 });
        
        doc.fontSize(9)
           .fillColor('#666')
           .text('Scan to verify', 428, 530, { width: 104, align: 'center' });

        // Footer
        doc.fontSize(8)
           .fillColor('#999')
           .text('This is a computer-generated e-ticket. No signature required.', 60, 680, { align: 'center', width: 480 });

        doc.text(`Booked on: ${data.bookingDate.toLocaleString('en-PK')}`, 60, 695, { align: 'center', width: 480 });

        // Finalize PDF
        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Create hotel ticket PDF document
   */
  private async createHotelTicketPDF(data: HotelTicketData, qrCode: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Header
        doc.fontSize(28)
           .fillColor('#667eea')
           .text('BookMeThat', 50, 50);

        doc.fontSize(10)
           .fillColor('#666')
           .text('Hotel Booking Voucher', 50, 85);

        // Ticket border
        doc.rect(40, 120, 515, 600)
           .stroke('#667eea');

        // Booking Number
        doc.fontSize(12)
           .fillColor('#333')
           .text('BOOKING NUMBER', 60, 140);
        
        doc.fontSize(20)
           .fillColor('#667eea')
           .font('Helvetica-Bold')
           .text(data.bookingNumber, 60, 160);

        // Status badge
        const statusColor = data.status === 'CONFIRMED' ? '#10b981' : '#f59e0b';
        doc.rect(450, 140, 90, 30)
           .fillAndStroke(statusColor, statusColor);
        
        doc.fontSize(12)
           .fillColor('#fff')
           .text(data.status, 460, 150, { width: 70, align: 'center' });

        // Hotel Details
        doc.font('Helvetica-Bold')
           .fontSize(16)
           .fillColor('#333')
           .text(data.hotelName, 60, 220);

        doc.font('Helvetica')
           .fontSize(11)
           .fillColor('#666');

        let y = 250;
        doc.text(`Check-in: ${data.checkInDate.toLocaleDateString('en-PK')}`, 60, y);
        y += 20;
        doc.text(`Check-out: ${data.checkOutDate.toLocaleDateString('en-PK')}`, 60, y);
        y += 20;
        doc.text(`Nights: ${data.nights}`, 60, y);
        y += 20;
        doc.text(`Room Type: ${data.roomType}`, 60, y);
        y += 20;
        doc.text(`Number of Rooms: ${data.numberOfRooms}`, 60, y);

        // Guest Details
        y = 400;
        doc.font('Helvetica-Bold')
           .fontSize(14)
           .fillColor('#333')
           .text('Guest Details', 60, y);

        y += 25;
        doc.font('Helvetica')
           .fontSize(11)
           .fillColor('#666');

        doc.text(`Name: ${data.guestName}`, 60, y);
        y += 20;
        doc.text(`Email: ${data.guestEmail}`, 60, y);
        y += 20;
        doc.text(`Phone: ${data.guestPhone}`, 60, y);

        // Payment
        y += 40;
        doc.fontSize(12)
           .fillColor('#333')
           .text(`Total Amount: PKR ${data.totalAmount.toLocaleString()}`, 60, y);

        // QR Code
        doc.image(qrCode, 420, 400, { width: 120, height: 120 });
        
        doc.fontSize(9)
           .fillColor('#666')
           .text('Scan to verify', 428, 530, { width: 104, align: 'center' });

        // Footer
        doc.fontSize(8)
           .fillColor('#999')
           .text('This is a computer-generated voucher. Please present at check-in.', 60, 680, { align: 'center', width: 480 });

        doc.text(`Booked on: ${data.bookingDate.toLocaleString('en-PK')}`, 60, 695, { align: 'center', width: 480 });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get QR code as buffer (for email attachments)
   */
  async getQRCodeBuffer(bookingId: string, bookingType: 'TRAIN' | 'HOTEL' | 'FLIGHT' | 'EVENT'): Promise<Buffer> {
    const qrCodeDataUrl = await this.generateQRCode(bookingId, bookingType);
    
    // Convert data URL to buffer
    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }
}

// Export singleton instance
export const ticketService = new TicketService();
