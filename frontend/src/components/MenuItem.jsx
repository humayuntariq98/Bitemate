import React, { useState } from "react";
import { createOrUpdateOrder } from "../services/order";

export default function MenuItem({
  image,
  name,
  price,
  restaurantId,
  userId,
  itemId,
}) {
  const [orderPostResponse, setOrderPostResponse] = useState(null);
  const [error, setError] = useState(false);

  async function handlePostOrder(restaurantId, orderItem, userId) {
    setError(false);
    setOrderPostResponse(null);
    const response = await createOrUpdateOrder(restaurantId, orderItem, userId);
    if (response.status === 200) {
      setOrderPostResponse(response.data);
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
            <span className="menu-item-price">
              <strong>${price.toFixed(2)}</strong>
            </span>
          </div>
        </div>
        <div className="ms-2">
          {userId && (
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
          )}
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
