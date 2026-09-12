import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = null;

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate';
    
    // Set connection options with timeout to fail fast if local MongoDB is not running
    const options = {
      serverSelectionTimeoutMS: 3000,
    };

    try {
      const conn = await mongoose.connect(mongoUri, options);
      console.log(`[DB] Connected to MongoDB: ${conn.connection.host}`);
      return conn;
    } catch (primaryErr) {
      if (process.env.NODE_ENV === 'production') {
        throw primaryErr;
      }

      console.warn('[DB] Could not connect to primary MongoDB. Spawning in-memory MongoDB server for development...');
      
      mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`[DB] Connected to In-Memory MongoDB at ${memoryUri}`);
      return conn;
    }
  } catch (error) {
    console.error(`[DB] Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
};
