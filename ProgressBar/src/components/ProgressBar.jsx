import React, { useEffect, useState } from "react";
import { MAX, MIN } from "../constants";

export default function ProgressBar({ value, onComplete = () => {} }) {
  useEffect(() => {
    if (value == MAX) onComplete();
  }, [value]);
  return (
    <div className="progress">
      <span style={{ color: value > 49 ? "white" : "black" }}>{value}%</span>

      {/* // scale value should be between 0 and 1 */}
      <div
        style={{ width: `${value}%` }}
        // style={{
        //   transform: `scaleX(${value / MAX})`,
        //   transformOrigin: "left",
        // }}
        role="progressbar"
        aria-valuemin={MIN}
        aria-valuenow={value}
        aria-valuemax={MAX}
      ></div>
    </div>
  );
}
