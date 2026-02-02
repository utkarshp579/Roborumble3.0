import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    // 
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 
    });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("DB Connection Error:", err.message);
    throw new Error("Database connection failed");
  }
};

export default connectDB;