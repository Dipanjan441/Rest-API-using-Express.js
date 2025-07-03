import mongoose from "mongoose";
import { DB_NAME, MONGODB_URI } from "./constants.js";

const mongoDbConnectionString = `${MONGODB_URI}/${DB_NAME}`;


export const connectDb = async()=> {
    try{
        const connectionInstance = await mongoose.connect(mongoDbConnectionString);
        console.log('Database is connected sucessfully and hosted on : ',connectionInstance.connection.host);
    } catch(error) {
        console.log('Database connection failed!!');
    }
}