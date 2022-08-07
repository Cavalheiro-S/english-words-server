import mongoose from "mongoose";
import "dotenv/config";

const connection = async () => {
    await mongoose.connect(process.env.STRING_CONNECTION_DATABASE || "");    
}

export default connection;