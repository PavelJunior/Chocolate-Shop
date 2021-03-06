const express = require('express');
const router = express.Router();

const {createOrder} = require('../controller/orderController');

//@desc POST create order
//@route POST /api/order
router.post('/', createOrder);

module.exports = router;
