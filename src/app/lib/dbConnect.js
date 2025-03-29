import mongoose from "mongoose";

const connection = {}; // Store connection state

async function dbConnect() {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "travelAdvisory_db",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        connection.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully!!");
    } catch (error) {
        console.error("DB Connection failed!!", error);
        process.exit(1);
    }
}

export default dbConnect;
