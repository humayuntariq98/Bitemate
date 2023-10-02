import React, { useEffect, useState } from "react";
import { createOrUpdateOrder } from "../services/order";
import {
  updateItemQuantity,
  getOrdersForCurrentRestaurant,
} from "../services/order";
import { BiCart } from "react-icons/bi";
export default function MenuItem({
  image,
  name,
  price,
  restaurantId,
  userId,
  itemId,
  setNewOrderPlaced,
}) {
  const [orderPostResponse, setOrderPostResponse] = useState(null);
  const [error, setError] = useState(false);
  const [quantityUpdateError, setQuantityUpdateError] = useState(false);
  const [updateQuantityResponse, setQuantityUpdateResponse] = useState(null);
  const [currentOrderForUsers, setCurrentOrderForUsers] = useState(null);

  const fetchCurrentOrders = async (restaurantId, userId, itemId) => {
    const response = await getOrdersForCurrentRestaurant(restaurantId, userId);
    if (response?.data) {
      const indexOfCurrentItem = response?.data[0]?.orderItems?.findIndex(
        (fi) => fi.foodItem._id === itemId
      );
      console.log("index of current item", indexOfCurrentItem);
      console.log(
        "fi value",
        response?.data[0]?.orderItems?.[indexOfCurrentItem]?.quantity
      );
      setCurrentOrderForUsers(
        response?.data[0]?.orderItems?.[indexOfCurrentItem]?.quantity
      );
    }
  };
  useEffect(() => {
    if (restaurantId && userId) {
      console.log("restaurantId", restaurantId);
      console.log("userId", userId);
      fetchCurrentOrders(restaurantId, userId, itemId);
    }
  }, [userId, restaurantId, itemId]);

  async function handleUpdateQuantity(orderId, action) {
    setQuantityUpdateError(false);
    setQuantityUpdateResponse(null);
    const response = await updateItemQuantity(orderId, action);
    if (response.status === 200) {
      setQuantityUpdateResponse(response.data);
    } else {
      setQuantityUpdateError("something went wrong in updating your quantity");
    }
  }

  async function handlePostOrder(restaurantId, orderItem, userId) {
    setError(false);
    setOrderPostResponse(null);
    const response = await createOrUpdateOrder(restaurantId, orderItem, userId);
    if (response.status === 200) {
      setOrderPostResponse(response.data);
      setNewOrderPlaced(true);
    } else {
      setError("something went wrong in placing your order");
    }
  }

  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={image}
            alt={name}
            className="menu-item-image img-fluid rounded-circle"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          ></img>
          <div className="ms-3">
            <span className="menu-item-name">{name}</span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <span className="menu-item-price">
            <strong>${price.toFixed(2)}</strong>
          </span>
          <div className="ms-2">
            {userId && (
              <>
                <span style={{ marginRight: "5px" }}>
                  <BiCart></BiCart>
                </span>
                <span
                  className="badge bg-secondary"
                  style={{ marginRight: "5px" }}
                >
                  {currentOrderForUsers}
                </span>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handlePostOrder(
                      restaurantId,
                      { name, image, price, _id: itemId },
                      userId
                    )
                  }
                >
                  Add to Order
                </button>
              </>
            )}
          </div>
        </div>
      </li>

      {orderPostResponse && (
        <div
          className="alert alert-success d-flex justify-content-between align-items-center"
          role="alert"
        >
          order posted successfully
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {error && (
        <div
          className="alert alert-danger d-flex justify-content-between align-items-center"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  );
}
