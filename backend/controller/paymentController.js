require('dotenv').config({path: __dirname + '/../.env'});
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const checkoutPayment = async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      payment_method: req.body.payment_method_id,
      amount: req.body.amount * 100,
      currency: 'usd',
      confirmation_method: 'manual',
      confirm: true,
    });

    res.json(intent);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error'});
  }
};

module.exports = {
  checkoutPayment,
};
