const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  totalAmount: { type: Number },
  userId: { type: String },
  orderDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Order", OrderSchema);
