#!/usr/bin/env node

/**
 * Quick API Test Runner for BookMeThat Backend
 * 
 * Tests all 15 endpoints to verify backend is working correctly.
 * Run with: node test-api.js
 */

const API_BASE = 'http://localhost:4000';
let authToken = '';
let userId = '';
let bookingId = '';
let esimId = '';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, symbol, message) {
  console.log(`${colors[color]}${symbol}${colors.reset} ${message}`);
}

async function testEndpoint(name, method, url, body = null, headers = {}) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      log('green', '✓', `${name} - ${response.status}`);
      return { success: true, data, status: response.status };
    } else {
      log('red', '✗', `${name} - ${response.status}`);
      console.log('  Error:', data.error || data.message);
      return { success: false, data, status: response.status };
    }
  } catch (error) {
    log('red', '✗', `${name} - FAILED`);
    console.log('  Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('\n' + colors.cyan + '═══════════════════════════════════════════════════════' + colors.reset);
  console.log(colors.cyan + '   BookMeThat API Test Runner' + colors.reset);
  console.log(colors.cyan + '═══════════════════════════════════════════════════════' + colors.reset + '\n');

  // Check if server is running
  log('blue', '🔍', 'Checking server status...');
  try {
    await fetch(API_BASE + '/health');
  } catch (error) {
    log('red', '✗', 'Server is not running on http://localhost:4000');
    console.log('\n' + colors.yellow + '💡 Start server with: cd backend && npm run dev' + colors.reset + '\n');
    process.exit(1);
  }

  let passed = 0;
  let failed = 0;

  // Test 1: Health Check
  console.log('\n' + colors.yellow + '▶ Health Check' + colors.reset);
  const health = await testEndpoint('GET /health', 'GET', `${API_BASE}/health`);
  if (health.success) passed++;
  else failed++;

  // Test 2: Register User
  console.log('\n' + colors.yellow + '▶ Authentication Tests' + colors.reset);
  const register = await testEndpoint(
    'POST /auth/register',
    'POST',
    `${API_BASE}/api/v1/auth/register`,
    {
      email: `test${Date.now()}@bookmethat.com`,
      password: 'TestPass123!',
      firstName: 'Test',
      lastName: 'User',
      phone: '+1234567890',
    }
  );
  if (register.success) {
    passed++;
    authToken = register.data.data.token;
    userId = register.data.data.user.id;
    log('cyan', 'ℹ', `User ID: ${userId}`);
  } else {
    failed++;
  }

  // Test 3: Get Current User
  const me = await testEndpoint('GET /auth/me', 'GET', `${API_BASE}/api/v1/auth/me`, null, {
    Authorization: `Bearer ${authToken}`,
  });
  if (me.success) passed++;
  else failed++;

  // Test 4: Create Hotel Booking
  console.log('\n' + colors.yellow + '▶ Booking Tests' + colors.reset);
  const hotelBooking = await testEndpoint(
    'POST /bookings (Hotel)',
    'POST',
    `${API_BASE}/api/v1/bookings`,
    {
      type: 'HOTEL',
      bookingData: {
        propertyId: 'hotel-dxb-001',
        propertyName: 'Grand Palace Hotel',
        roomType: 'Deluxe Suite',
        checkIn: '2025-02-15',
        checkOut: '2025-02-18',
        guests: { adults: 2, children: 1 },
      },
      totalPrice: 897,
      currency: 'USD',
    },
    {
      Authorization: `Bearer ${authToken}`,
    }
  );
  if (hotelBooking.success) {
    passed++;
    bookingId = hotelBooking.data.data.booking.id;
    log('cyan', 'ℹ', `Booking ID: ${bookingId}`);
  } else {
    failed++;
  }

  // Test 5: Create Flight Booking
  const flightBooking = await testEndpoint(
    'POST /bookings (Flight)',
    'POST',
    `${API_BASE}/api/v1/bookings`,
    {
      type: 'FLIGHT',
      bookingData: {
        flightId: 'flight-001',
        flightNumber: 'EK145',
        airline: 'Emirates',
        origin: 'LHR',
        destination: 'DXB',
        departureDate: '2025-02-15T14:30:00Z',
        passengers: [
          {
            firstName: 'Test',
            lastName: 'User',
            dateOfBirth: '1990-01-15',
            passportNumber: 'AB123456',
          },
        ],
        cabinClass: 'Economy',
      },
      totalPrice: 850,
      currency: 'USD',
    },
    {
      Authorization: `Bearer ${authToken}`,
    }
  );
  if (flightBooking.success) passed++;
  else failed++;

  // Test 6: List Bookings
  const listBookings = await testEndpoint(
    'GET /bookings',
    'GET',
    `${API_BASE}/api/v1/bookings?page=1&limit=10`,
    null,
    {
      Authorization: `Bearer ${authToken}`,
    }
  );
  if (listBookings.success) {
    passed++;
    const count = listBookings.data.data.bookings.length;
    log('cyan', 'ℹ', `Found ${count} bookings`);
  } else {
    failed++;
  }

  // Test 7: Get Booking Details
  if (bookingId) {
    const bookingDetails = await testEndpoint(
      'GET /bookings/:id',
      'GET',
      `${API_BASE}/api/v1/bookings/${bookingId}`,
      null,
      {
        Authorization: `Bearer ${authToken}`,
      }
    );
    if (bookingDetails.success) passed++;
    else failed++;
  }

  // Test 8: Cancel Booking
  if (bookingId) {
    const cancelBooking = await testEndpoint(
      'PUT /bookings/:id/cancel',
      'PUT',
      `${API_BASE}/api/v1/bookings/${bookingId}/cancel`,
      { reason: 'Test cancellation' },
      {
        Authorization: `Bearer ${authToken}`,
      }
    );
    if (cancelBooking.success) {
      passed++;
      const refund = cancelBooking.data.data.refund;
      log('cyan', 'ℹ', `Refund processed: $${(refund.amount / 100).toFixed(2)}`);
    } else {
      failed++;
    }
  }

  // Test 9: List eSIM Plans
  console.log('\n' + colors.yellow + '▶ eSIM Tests' + colors.reset);
  const listPlans = await testEndpoint('GET /esim/plans', 'GET', `${API_BASE}/api/v1/esim/plans`);
  if (listPlans.success) {
    passed++;
    const count = listPlans.data.data.plans.length;
    log('cyan', 'ℹ', `Found ${count} eSIM plans`);
  } else {
    failed++;
  }

  // Test 10: Get Plan Details
  const planDetails = await testEndpoint(
    'GET /esim/plans/:id',
    'GET',
    `${API_BASE}/api/v1/esim/plans/ae-5gb-30d`
  );
  if (planDetails.success) passed++;
  else failed++;

  // Test 11: Purchase eSIM
  const purchaseEsim = await testEndpoint(
    'POST /esim/purchase',
    'POST',
    `${API_BASE}/api/v1/esim/purchase`,
    {
      planId: 'ae-5gb-30d',
      paymentMethod: 'card',
    },
    {
      Authorization: `Bearer ${authToken}`,
    }
  );
  if (purchaseEsim.success) {
    passed++;
    esimId = purchaseEsim.data.data.order.id;
    log('cyan', 'ℹ', `eSIM Order ID: ${esimId}`);
  } else {
    failed++;
  }

  // Test 12: List User's eSIMs
  const listEsims = await testEndpoint(
    'GET /esim',
    'GET',
    `${API_BASE}/api/v1/esim?page=1&limit=10`,
    null,
    {
      Authorization: `Bearer ${authToken}`,
    }
  );
  if (listEsims.success) {
    passed++;
    const count = listEsims.data.data.orders.length;
    log('cyan', 'ℹ', `Found ${count} eSIM orders`);
  } else {
    failed++;
  }

  // Test 13: Get eSIM Details
  if (esimId) {
    const esimDetails = await testEndpoint(
      'GET /esim/:id',
      'GET',
      `${API_BASE}/api/v1/esim/${esimId}`,
      null,
      {
        Authorization: `Bearer ${authToken}`,
      }
    );
    if (esimDetails.success) {
      passed++;
      const qrCode = esimDetails.data.data.activation.qrCode;
      log('cyan', 'ℹ', `QR Code URL: ${qrCode.substring(0, 50)}...`);
    } else {
      failed++;
    }
  }

  // Test 14: Logout
  console.log('\n' + colors.yellow + '▶ Logout Test' + colors.reset);
  const logout = await testEndpoint('POST /auth/logout', 'POST', `${API_BASE}/api/v1/auth/logout`, null, {
    Authorization: `Bearer ${authToken}`,
  });
  if (logout.success) passed++;
  else failed++;

  // Summary
  console.log('\n' + colors.cyan + '═══════════════════════════════════════════════════════' + colors.reset);
  console.log(colors.cyan + '   Test Results' + colors.reset);
  console.log(colors.cyan + '═══════════════════════════════════════════════════════' + colors.reset);
  console.log(`${colors.green}✓ Passed: ${passed}${colors.reset}`);
  if (failed > 0) {
    console.log(`${colors.red}✗ Failed: ${failed}${colors.reset}`);
  }
  console.log(`  Total: ${passed + failed} tests`);

  if (failed === 0) {
    console.log('\n' + colors.green + '🎉 All tests passed! Backend is working correctly.' + colors.reset);
  } else {
    console.log('\n' + colors.yellow + '⚠️  Some tests failed. Check errors above.' + colors.reset);
  }

  console.log('\n' + colors.blue + '📚 For detailed testing guide, see: backend/API_TESTING.md' + colors.reset);
  console.log(colors.blue + '📦 Import Postman collection: backend/bookmethat-postman-collection.json' + colors.reset + '\n');

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
