const express = require('express');
const router = express.Router();

const {createPayment} = require('../controller/paymentController');

//@desc POST create payment
//@route POST /api/payment
router.post('/', createPayment);

module.exports = router;
