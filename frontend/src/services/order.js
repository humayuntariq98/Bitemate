import axios from "axios";

export async function createOrUpdateOrder(restaurantId, orderItem, userId) {
  return await axios.post("http://localhost:4000/order", {
    restaurantId,
    orderItem,
    userId,
  });
}
