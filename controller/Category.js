const { Category } = require("../model/Category");

exports.fetchCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const response = await category.save();
    res.status(201).json({ response });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
