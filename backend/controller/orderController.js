const Order = require('../modules/Order');

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error'});
  }
};

module.exports = {
  createOrder,
};
