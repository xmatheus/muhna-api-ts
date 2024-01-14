import mongoose from "mongoose";

export async function connect() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL || "", {
        dbName: "prod"
    });
}

export async function disconnect() {
    await mongoose.disconnect();
}
