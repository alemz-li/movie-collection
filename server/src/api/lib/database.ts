import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("Conneted to Database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
