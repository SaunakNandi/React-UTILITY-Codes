import { useEffect, useRef } from "react";

const MAX = 100;

export function Progresspro({ value, max = MAX }) {
  const progressStartRef = useRef(false);

  useEffect(() => {
    if (value >= max) {
      console.log("ends");
    }

    if (value) {
      if (progressStartRef.current) {
        console.log("going");
      } else {
        console.log("started");
        progressStartRef.current = true;
      }
    }

    const elem = document.getElementById("status");
    elem.innerText = `Please Wait Sir, progress is ${value}%`;
  }, [value]);
  //1. state -> Indeterminate State
  // 2. state -> determinate State

  // 2 manadatory
  // value => 0.0 1.0
  // max => 1.0
  return (
    <div>
      <progress
        aria-label="Download ReactJS"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`Be Patient, We will be read soon. Progress ${value}`}
        max={100}
        value={value}
      ></progress>
      <span
        role="status"
        aria-live="polite"
        id="status"
        className="visible-hidden"
      ></span>
    </div>
  );
}
