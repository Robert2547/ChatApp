import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error("Error in connectToMongoDB: ", error);
  }
};

export default connectToMongoDB;
