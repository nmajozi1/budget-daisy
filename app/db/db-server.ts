/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import mongoose from "mongoose";
declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function db_connect() {
  const MONGODB_URI = process.env.MONGO_URI; 
  console.log(' MONGO DB URI: ', MONGODB_URI);

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local",
    );
  }

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = await mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('DO WE HAVE AN ERROR? ', mongoose.Error);
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default db_connect;