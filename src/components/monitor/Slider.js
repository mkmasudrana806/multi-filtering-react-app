import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./Slider.css";

const Slider = ({ min, max, value, onChange }) => {
  return (
    <Card className="mt-3">
      <Card.Header as="h5">{"Price Range"}</Card.Header>
      <Card.Body>
        <input
          className="w-100"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
        />
        <div className="slider-btn">
          <button className="border-secondary border-1">{min}</button>
          <button className="border-secondary border-1">{value}</button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Slider;
