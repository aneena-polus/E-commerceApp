import mongoose from "mongoose";

export const connectDb = () => {
    mongoose.connect(process.env.CONNECTION)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
};