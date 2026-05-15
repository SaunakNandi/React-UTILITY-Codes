import { useEffect, useState } from "react";
import "./App.css";
import { data } from "./constant";

function App() {
  const [index, setIndex] = useState(0);

  function onRight() {
    setIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  }

  function onLeft() {
    setIndex((prev) => (!prev ? data.length - 1 : prev - 1));
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      onRight();
    }, 3000);
    return () => clearTimeout(timerId);
  }, [index]);

  return (
    <div className="container">
      <div className="button" onClick={onLeft}>
        <button>Previous</button>
      </div>
      <div className="images">
        {data.map((url, i) => {
          return (
            <div
              className={`image-wrapper ${index === i ? "active" : ""}`}
              key={i}
            >
              <img src={url} />
            </div>
          );
        })}
      </div>
      <div className="button" onClick={onRight}>
        <button>Next</button>
      </div>
    </div>
  );
}

export default App;
