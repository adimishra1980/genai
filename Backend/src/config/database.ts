import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("env vars not configured properly");
    }

    await mongoose.connect(mongoUri);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectToDB;
