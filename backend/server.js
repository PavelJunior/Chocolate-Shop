require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bodyParser = require('body-parser');

connectDB();

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server is running'));
