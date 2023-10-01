const mongoose = require("mongoose");
const { FoodItemSchema } = require("./Restaurant");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  foodItem: { type: FoodItemSchema, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  totalAmount: { type: Number },
  userId: { type: String },
  orderDate: { type: Date, default: Date.now() },
  completed: { type: Boolean, default: false },
  orderItems: [OrderItemSchema],
});

module.exports = mongoose.model("Order", OrderSchema);
