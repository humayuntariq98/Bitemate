import React from "react";

export default function MenuItem({ image, name, price }) {
  return (
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
        <button className="btn btn-primary">Add to Order</button>
      </div>
    </li>
  );
}
