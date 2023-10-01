import React from "react";

export default function Food({ name, address }) {
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", "max-height": "360px" }}
        >
          <img src="/foodImages/steak.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Some Important text</p>
            <div className="container w-100">
              <select className="m-2 h-100 bg-danger rounded">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100 bg-danger rounded">
                <option value="half">Half</option>
                <option value="full">Full</option>
              </select>

              <div className="d-inline h-100">Total Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
