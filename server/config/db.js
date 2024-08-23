const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Log the MONGO_URI to ensure it's loaded correctly
console.log('MONGO_URI:', process.env.MONGO_URI);

const connect = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log('Mongo connected...');
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connect;
