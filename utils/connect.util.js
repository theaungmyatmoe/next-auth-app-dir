import mongoose, {mongo} from "mongoose";

export const connectToMongoDatabase = () => {
    if (mongoose.connection.readyState >= 1) return;

    mongoose.connect(process.env.DB_URI);
};
