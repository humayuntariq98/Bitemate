const express = require("express");

const restaurantController = require("../controllers/Restaurant");
const router = express.Router();

router.post("/", restaurantController.create);
router.get("/", restaurantController.index);
router.get("/:id", restaurantController.show);
router.delete("/:id", restaurantController.delete);
router.put("/:id", restaurantController.update);

module.exports = router;