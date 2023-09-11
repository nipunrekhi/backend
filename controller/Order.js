const { Order } = require("../model/Order");

exports.fetchOrderByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const orders = await Order.find({ user: user });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const response = await order.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Order.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.fetchAllOrders = async (req, res) => {
  let query = Order.find({ deleted: { $ne: true } });
  let totalOrdersQuery = Order.find({ deleted: { $ne: true } });

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  const totalDocs = await totalOrdersQuery.count().exec();
  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
