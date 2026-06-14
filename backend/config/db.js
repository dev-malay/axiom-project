const mongoose = require("mongoose")

const connectDB = async() => {

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB CONNECTION SUCCESS")
} catch (error) {
    console.error(error, "message: DB connection failed");
    process.exit(1)
}
}

module.exports = connectDB;

