const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'server.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

console.log('Starting BookMeThat Backend Server...');
console.log(`Log file: ${logFile}`);

// Start the server
const server = spawn('node', ['dist/index.js'], {
  cwd: __dirname,
  env: process.env,
  stdio: ['ignore', 'pipe', 'pipe']
});

// Log stdout
server.stdout.on('data', (data) => {
  const msg = data.toString();
  console.log(msg);
  logStream.write(`[STDOUT] ${new Date().toISOString()}: ${msg}`);
});

// Log stderr
server.stderr.on('data', (data) => {
  const msg = data.toString();
  console.error(msg);
  logStream.write(`[STDERR] ${new Date().toISOString()}: ${msg}`);
});

// Handle errors
server.on('error', (error) => {
  const msg = `Failed to start server: ${error.message}`;
  console.error(msg);
  logStream.write(`[ERROR] ${new Date().toISOString()}: ${msg}\n`);
});

// Handle exit
server.on('close', (code) => {
  const msg = `Server exited with code ${code}`;
  console.log(msg);
  logStream.write(`[EXIT] ${new Date().toISOString()}: ${msg}\n`);
  logStream.end();
});

// Keep script running
console.log('Press Ctrl+C to stop the server');
