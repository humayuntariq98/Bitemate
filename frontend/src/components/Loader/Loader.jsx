import React from "react";
import "./Loader.css"; // Create a CSS file for styling

const Loader = ({ width, height }) => {
  const loaderStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div className="loader" style={loaderStyle}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
