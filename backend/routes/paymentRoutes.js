const express = require('express');
const router = express.Router();

const {checkoutPayment} = require('../controller/paymentController');

//@desc POST create payment
//@route POST /api/payment
router.post('/', checkoutPayment);

module.exports = router;
