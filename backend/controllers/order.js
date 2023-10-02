const Order = require("../models/Order");
const { calculateTotal } = require("../utils");
const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    res.json(await Order.find({ userId }));
  } catch (error) {
    res.status(500).send(error);
  }
};

const getExistingOrderForRestaurant = async (req, res) => {
  try {
    const existingIncompleteOrder = await Order.find({
      restaurant: req.params.restaurantId,
      completed: false,
      userId: req.params.userId,
    });
    if (existingIncompleteOrder.length) {
      return res.status(200).json(existingIncompleteOrder);
    }
    return res.status(200).send({ message: "order not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};
async function createOrUpdate(req, res, next) {
  try {
    const { restaurantId, userId, orderItem } = req.body;
    const currentOrder = await Order.findOne({
      userId,
      restaurant: restaurantId,
    });
    if (currentOrder) {
      //if there is a cart for the user, find the index of the product that has an id equal to product._id sent by req.body
      const isItemAlreadyInOrder = currentOrder.orderItems.findIndex((p) =>
        p.foodItem._id.equals(orderItem._id)
      );
      if (isItemAlreadyInOrder !== -1) {
        //findIndex returns -1 if no product found, if that is not the case, update the quantity of the product at the found index
        currentOrder.orderItems[isItemAlreadyInOrder].quantity++;
      } else {
        currentOrder.orderItems.push({ foodItem: orderItem, quantity: 1 });
      }
      //use the total price calculation function to update the carts total amount
      currentOrder.totalAmount = calculateTotal(currentOrder);
      await Order.findByIdAndUpdate(currentOrder._id, currentOrder, {
        new: true,
      });
      res.json(currentOrder);
    } else {
      //if the user does not alrady have a cart, create it.

      const cartData = {
        orderItems: [{ foodItem: orderItem, quantity: 1 }],
        userId,
        totalAmount: orderItem.price,
        restaurant: restaurantId,
      };
      console.log("cart data", cartData);
      const newOrder = await Order.create(cartData);
      res.json(newOrder);
    }
  } catch (error) {
    console.log(error);
  }
}

const show = async (req, res) => {
  try {
    res.json(await Order.findById(req.params.id));
  } catch (err) {
    res.status(500).json(err);
  }
};

const destroy = async (req, res) => {
  try {
    res.json(await Order.findOneAndDelete({ _id: req.params.id }));
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateItemQuantity = async (req, res) => {
  try {
    const order = await Order.findById(req.body._id);
    if (!order) {
      return res.status(200).json({ message: "order not found " });
    }
    const itemInOrder = order.orderItems.findIndex(
      (item) => item._id === req.body.itemId
    );
    if (itemInOrder !== -1) {
      if (req.body.action === "increase") {
        order.orderItems[itemInOrder].quantity++;
      } else {
        order.orderItems[itemInOrder].quantity--;
      }
      order.totalAmount = calculateTotal(order);
      return res.json(
        await Order.findByIdAndUpdate(req.body._id, order, { new: true })
      );
    } else {
      res.status(404).json({ message: "item not found in order" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getOrdersByUser,
  show,
  createOrUpdate,
  delete: destroy,
  updateItemQuantity,
  getExistingOrderForRestaurant,
};
