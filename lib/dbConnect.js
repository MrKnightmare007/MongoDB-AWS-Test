// lib/dbConnect.js
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/mydb';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }; // Set up connection pooling
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  cached.conn = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected');
  return cached.conn;
}

export default dbConnect;