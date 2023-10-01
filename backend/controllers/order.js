const Order = require("../models/Order");

const getOrdersByUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    res.json(await Order.find({ userId }));
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res, next) => {
  try {
    const existingIncompleteOrder = await Order.find({
      restaurant: req.body.restaurant,
      completed: false,
      userId: req.body.usreId,
    });
    if (existingIncompleteOrder.length) {
      return res
        .status(200)
        .send({ error: true, message: "order already exists with restaurant" });
    }
    res.send(await Order.create(req.body));
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req, res, next) => {
  try {
    res.json(await Order.findById(req.params.id));
  } catch (err) {
    res.status(500).json(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    res.json(await Order.findOneAndDelete({ _id: req.params.id }));
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getOrdersByUser,
  show,
  create,
  delete: destroy,
};
