import React from "react";
import "./MonitorCart.css";

const MonitorCart = ({ monitor }) => {
  const {
    name,
    panelType,
    resolution,
    price,
    refreshRate,
    responseTime,
    features,
  } = monitor;

  return (
    <div className="monitor-cart">
      <div className="monitor-img bg-primary"></div>
      <div className="monitor-info p-2">
        <p>
          <strong>{name}</strong>
        </p>
        <p> Resolution: {resolution}</p>
        <p>
          Display: {panelType}, {refreshRate}, {responseTime}
        </p>

        <div className="d-flex flex-wrap">
          {" "}
          <p className="me-1">Features: </p>
          {features.map((feature, index) => (
            <p>
              {feature}
              {index === features.length - 1 ? " " : ", "}
            </p>
          ))}
        </div>
        <p>
          <strong className="text-primary">{price}Tk</strong>
        </p>
      </div>
      <div className="cart-footer-btn w-100 ps-2 pe-2">
        <button className="btn w-100  btn-primary">Buy Now</button>
        <button className="btn w-100 mt-2 btn-outline-primary">
          Specifications
        </button>
      </div>
    </div>
  );
};

export default MonitorCart;
