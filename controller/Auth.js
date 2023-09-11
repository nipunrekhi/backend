const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const response = await user.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "user not found" });
    } else if (user.password === req.body.password) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        addresses: user.addresses,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
