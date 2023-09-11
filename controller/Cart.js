const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const cartItems = await Cart.find({ user: user })
      .populate("user")
      .populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const response = await cart.save();
    const result = await response.populate("product");
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await response.populate("product");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Cart.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
