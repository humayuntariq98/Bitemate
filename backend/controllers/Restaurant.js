const Restaurant = require("../models/Restaurant");

module.exports = {
  index,
  show,
  create,
  delete: destroy,
  update,
};

async function index(req, res, next) {
  try {
    res.json(await Restaurant.find({}));
  } catch (error) {
    res.status(500).send(error);
  }
}

async function show(req, res, next) {
  try {
    res.json(await Restaurant.findOne({ _id: req.params.id }));
  } catch (error) {
    res.status(500).send(error);
  }
}

async function create(req, res, next) {
  try {
    res.json(await Restaurant.create(req.body));
  } catch (error) {
    res.status(500).send(error);
  }
}

async function destroy(req, res, next) {
  try {
    res.json(await Restaurant.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(500).json(error);
  }
}

async function update(req, res, next) {
  try {
    res.json(
      await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(500).json(error);
  }
}
