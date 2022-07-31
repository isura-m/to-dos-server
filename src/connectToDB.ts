import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

    console.log("DB connected successfully");
  } catch (err) {
    console.log("DB connection unsuccessful", err);
  }
};

export default connectToDB;
