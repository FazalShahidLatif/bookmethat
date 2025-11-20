import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api/v1/properties', (req, res) => {
  res.json({ message: 'Properties endpoint - coming soon' });
});

app.get('/api/v1/esims', (req, res) => {
  res.json({ message: 'eSIM endpoint - coming soon' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
});
