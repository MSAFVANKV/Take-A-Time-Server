// Database/Connection.js
import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Connection failed!!", error);
  }
};

export default connectToMongoDB;
