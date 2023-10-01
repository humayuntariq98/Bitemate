import React from "react";
import { titleCase } from "title-case";
import { Link } from "react-router-dom";

export default function Food({ name, slogan, restaurantId }) {
  return (
    <div style={{ display: "inline-block", width: "25%" }}>
      <Link to={`/restaurant/${restaurantId}`}>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src="/foodImages/steak.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5
              style={{ color: "white", cursor: "pointer" }}
              className="card-title"
            >
              {name}
            </h5>
            <p
              style={{ color: "white", cursor: "pointer" }}
              className="card-text"
            >
              {titleCase(slogan)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
