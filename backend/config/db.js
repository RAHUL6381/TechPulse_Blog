import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongodInstance = null;
let activeUri = null;

export const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techpulse';

    // 1. First attempt connecting to external or existing MongoDB instance
    try {
      const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 1500 });
      activeUri = mongoUri;
      console.log(`[MongoDB] Connected directly to: ${activeUri}`);
      return conn;
    } catch (err) {
      console.log(`[MongoDB] Standalone server not reachable on 27017. Starting embedded engine...`);
    }

    // 2. Start embedded MongoDB engine on default port 27017 (or dynamic if 27017 in use)
    try {
      mongodInstance = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          dbName: 'techpulse'
        }
      });
      activeUri = mongodInstance.getUri();
    } catch (portErr) {
      console.log(`[MongoDB] Port 27017 busy, using dynamic local port...`);
      mongodInstance = await MongoMemoryServer.create({
        instance: {
          dbName: 'techpulse'
        }
      });
      activeUri = mongodInstance.getUri();
    }

    const conn = await mongoose.connect(activeUri);

    console.log(`=======================================================`);
    console.log(`  MONGODB DATABASE CONNECTED SUCCESSFULLY`);
    console.log(`  Host:      ${conn.connection.host}`);
    console.log(`  Port:      ${conn.connection.port}`);
    console.log(`  Database:  ${conn.connection.name}`);
    console.log(`  Engine:    Embedded Mongo Engine (Zero Installation)`);
    console.log(`  URI:       ${activeUri}`);
    console.log(`=======================================================`);

    return conn;
  } catch (err) {
    console.error('[MongoDB Connection Failure]:', err);
    throw err;
  }
};

export const getMongoStatus = () => {
  return {
    status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || 'localhost',
    port: mongoose.connection.port || null,
    database: mongoose.connection.name || 'techpulse',
    uri: activeUri || process.env.MONGODB_URI,
    engine: 'Embedded MongoDB (mongodb-memory-server)'
  };
};

export const closeDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};

