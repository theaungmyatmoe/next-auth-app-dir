import mongoose from "mongoose";

export const connectToMongoDatabase = async () => {
    if (mongoose.connection.readyState >= 1) return;

    return await mongoose.connect(process.env.MOGODB_URI);
};
