import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import propertyRoutes from './routes/propertyRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import { requireAdmin } from './middleware/authMiddleware.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import Property from './models/Property.js';
import { seedDatabase } from './seed/seedRunner.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all during development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Base Route
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Real Estate Agency API is running cleanly',
    version: '1.0.0',
    endpoints: {
      properties: '/api/properties',
      agents: '/api/agents',
      inquiries: '/api/inquiries',
      seed: 'POST /api/seed (Admin Protected)',
    },
  });
});

// API Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Seed API endpoint for manual re-seeding (Protected)
app.post('/api/seed', requireAdmin, async (req, res, next) => {
  try {
    const result = await seedDatabase();
    res.status(200).json({
      success: true,
      message: 'Database seeded successfully with sample properties and agents',
      agentsCount: result.agents.length,
      propertiesCount: result.properties.length,
    });
  } catch (error) {
    next(error);
  }
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Connect DB & Start Server
const startServer = async () => {
  await connectDB();

  // Check if database needs initial seeding
  try {
    const count = await Property.countDocuments();
    if (count === 0) {
      console.log('[SERVER] Database is empty. Seeding initial Indian property data...');
      await seedDatabase();
    }
  } catch (err) {
    console.warn('[SERVER] Could not check initial seed status:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(` Real Estate API Server running on port ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(` Endpoint: http://localhost:${PORT}/api`);
    console.log(`===================================================`);
  });
};

startServer();
