import mongoose, { mongo } from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    const URL: string = process.env.MONGO_URL!;
    await mongoose.connect(URL);
    console.log(`MongoDb connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
