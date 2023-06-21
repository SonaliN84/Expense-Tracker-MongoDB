const Razorpay = require("razorpay");
const Order = require("../models/order");

exports.getPremiumMembership = (req, res, next) => {
  const rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
 
  console.log(process.env.RAZORPAY_KEY_SECRET);
  const amount = 2500;

  rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
    if (err) {
      console.log(err);
      res.status(403).json({ message: "error1" });
      console.log("eror1");
    }
    const createOrder = new Order({
      userId: req.user,
      orderid: order.id,
      status: "PENDING",
    });
    createOrder
      .save()
      .then(() => {
        return res.status(201).json({ order, key_id: rzp.key_id });
      })
      .catch((err) => {
        console.log(err);
        res.status(403).json({ message: "error2" });
      });
  });
};

exports.postUpdateTransactionStatus = async (req, res, next) => {
  try {
    const payment_id = req.body.payment_id;
    const order_id = req.body.order_id;

    const order = await Order.findOne({ orderid: order_id });

    order.paymentid = payment_id;
    order.status = "SUCCESSFUL";
    await order.save();
    req.user.ispremiumuser = true;
    await req.user.save();
    return res
      .status(202)
      .json({ success: true, message: "transaction successful" });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};

exports.postFailedTransaction = async (req, res, next) => {
  try {
    const order_id = req.body.order_id;

    const order = await Order.findOne({ orderid: order_id });
    order.status = "FAILED";
    await order.save();

    return res.status(200).json({ message: "transaction failed" });
  } catch (err) {
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};
