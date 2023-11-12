import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    const uri: string | undefined = process.env.MONGODB_URI!

    if( isConnected ) {
        return;
    }

    try {
        await mongoose.connect(uri as string)
        isConnected = true;
        console.log("db connected OK")
    } catch (error) {
        console.log(error)
    }

}