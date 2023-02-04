const Order = require("../models/OrderModel");
const Product = require("../models/productModel");

//create order //////////////////////////
exports.newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
};

// get logged in user  Orders //////////////////////
exports.myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({ success: true, orders });
};

//get single order /////////////////////////////
exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    //populate method get the user name and email from user model
    "user",
    "name email"
  );
  if (!order) {
    return res.status(500).json({ msg: "order not found" });
  }
  res.status(200).json({ success: true, order });
};

// get all Orders by Admin ////////////////////
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

//update order status by admin ////////////////////////
exports.updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(400).json({ msg: "order not found" });
  }

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({ msg: "product already delivered" });
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(400).json({ msg: "order not found" });
  }
  await order.remove();
  res.status(200).json({ success: true });
};
