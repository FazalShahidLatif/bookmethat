console.log('='.repeat(50));
console.log('TESTING BASIC NODE.JS');
console.log('='.repeat(50));
console.log('Node version:', process.version);
console.log('Current directory:', process.cwd());
console.log('Environment:', process.env.NODE_ENV);
console.log('='.repeat(50));

// Try to import express
try {
  const express = require('express');
  console.log('✅ Express loaded successfully');
} catch (err) {
  console.error('❌ Failed to load Express:', err.message);
}

// Try to load .env
try {
  require('dotenv').config();
  console.log('✅ dotenv loaded successfully');
  console.log('DATABASE_URL set:', !!process.env.DATABASE_URL);
} catch (err) {
  console.error('❌ Failed to load dotenv:', err.message);
}

// Try to load Prisma
try {
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ Prisma Client loaded successfully');
  
  // Try to create Prisma client (don't connect yet)
  const prisma = new PrismaClient();
  console.log('✅ Prisma Client instantiated successfully');
} catch (err) {
  console.error('❌ Failed to load Prisma:', err.message);
  console.error('Full error:', err);
}

console.log('='.repeat(50));
console.log('BASIC TEST COMPLETE');
console.log('='.repeat(50));
