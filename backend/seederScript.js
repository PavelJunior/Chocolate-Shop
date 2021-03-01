require('dotenv').config();

const productData = require('./data/products');
const connectDB = require('./config/db');
const Product = require('./modules/Product');

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(productData);
    console.log('Data import success');
    process.exit();
  } catch (error) {
    console.error('Data import error');
    process.exit();
  }
};

importData();
