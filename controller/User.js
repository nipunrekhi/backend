const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findById(id, "name email id").exec();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
