import axios from "axios";
export async function createOrUpdateOrder(restaurantId, orderItem, userId) {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/order`, {
    restaurantId,
    orderItem,
  userId,
  });
}

export async function updateItemQuantity(orderId, action) {
  return await axios.put(
    `${process.env.REACT_APP_API_BASE_URL}/order/restaurant/`,
    {
      _id: orderId,
      action,
    }
  );
}

export async function getOrdersForCurrentRestaurant(restaurantId, userId) {
  return await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/order/restaurant/${restaurantId}/user/${userId}`
  );
}

export async function destroyOrder(orderId) {
  return await axios.delete(
    `${process.env.REACT_APP_API_BASE_URL}/order/${orderId}`
  );
}
