require('dotenv').config({path: __dirname + '/../.env'});
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connection success');
  } catch (error) {
    console.log(process.env.MONGO_URI);
    console.error('MongoDB connection fail');
    process.exit(1);
  }
};

module.exports = connectDB;
