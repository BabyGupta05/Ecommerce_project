const { default: mongoose } = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dishebhb:dishebh124507@cluster0.ifewy9s.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB connected!");
    } catch (error) {
        console.log('Error connecting to DB:', error);
    }
}

module.exports = connectDB;

