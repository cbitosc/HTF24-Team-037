const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://gurramkarthik2006:SQkBJ1720FyYoNxY@cluster0.rruaf.mongodb.net/<DB_NAME>testdb?retryWrites=true&w=majority');

        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
