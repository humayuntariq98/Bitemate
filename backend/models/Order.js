const mongoose = require("mongoose");
const { FoodItemSchema } = require("./Restaurant");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  totalAmount: { type: Number },
  userId: { type: String },
  orderDate: { type: Date, default: Date.now() },
  completed: { type: Boolean, default: false },
  orderItems: [FoodItemSchema],
});

module.exports = mongoose.model("Order", OrderSchema);
