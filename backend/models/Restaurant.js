const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
    name: {type: String},
    image: {type: String},
    price: {type: Number},
})


const RestaurantSchema = new Schema({
    name: {type:String},
    address: {type: String},
    menu: [FoodItemSchema]
})

module.exports = mongoose.model("Restaurant",RestaurantSchema);
