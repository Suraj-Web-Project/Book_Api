import mongoose from "mongoose";
import { ENV } from "../lib/env.js";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) throw new Error("Mongo_URI is not set");
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("🤖 MongoDB Connected", conn.connection.host);
  } catch (error) {
    console.error("Error connection to MONGODB:", error);
    process.exit(1);   // 1 status code means fail, 0 means success
  }
};