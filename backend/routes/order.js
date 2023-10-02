const orderController = require("../controllers/order");
const express = require("express");
const router = express.Router();

router.get("/:id", orderController.show);
router.post("/", orderController.createOrUpdate);
router.get("/user/:id", orderController.getOrdersByUser);
router.delete("/:id", orderController.delete);
router.get(
  "/restaurant/:restaurantId/user/:userId",
  orderController.getExistingOrderForRestaurant
);
router.put("/", orderController.updateItemQuantity);
module.exports = router;
