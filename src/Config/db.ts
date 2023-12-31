import mongoose from "mongoose";
import config from "@/Config";

const connectDB = async () => {
    try {
        if (config.mongo_uri !== undefined) {
            await mongoose.connect(config.mongo_uri)
            console.log("Database connection established.")
        } else {
            console.log('retrying to establish DB connection')
            connectDB();
        }
    } catch (e) {
        console.log(" from config ====>", e instanceof Error && e.message)
    }
}

export default connectDB