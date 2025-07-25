import mongoose from "mongoose";
import { DB_NAME } from "../config/constents.js";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;

