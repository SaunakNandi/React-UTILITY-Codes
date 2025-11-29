import { useEffect, useRef, useState } from "react";
import { arr } from "./constant";
import "./App.css";

function App() {
  const observerRef = useRef(null);
  const elementRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            console.warn("visible inside observer => ", entry.target);
        });
      },
      {
        root: observerRef.current,
        threshold: 0.5,
      }
    );
    elementRef.current.forEach((item) => observer.observe(item));
    return () => observer.disconnect;
  }, []);

  return (
    <div className="box" ref={observerRef}>
      {arr.map((item, i) => {
        return (
          <div className="element" ref={(el) => (elementRef.current[i] = el)}>
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default App;
