const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
  name: { type: String },
  image: { type: String },
  price: { type: Number },
});

const RestaurantSchema = new Schema({
  name: { type: String },
  slogan: { type: String },
  address: { type: String },
  menu: [FoodItemSchema],
  bannerImage: { type: String },
  cardImage: { type: String },
});

module.exports = {
  model: mongoose.model("Restaurant", RestaurantSchema),
  FoodItemSchema,
};
