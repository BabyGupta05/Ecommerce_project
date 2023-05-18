const { default: mongoose } = require("mongoose");
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB connected!");
    } catch (error) {
        console.log('Error connecting to DB:', error);
    }
}

module.exports = connectDB;

