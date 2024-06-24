import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to connect DB");
    }
}

export const disconnectFromDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
        throw new Error("Failed to disconnect DB");
    }
}
