import { useEffect, useState } from "react";
import "./App.css";
import { useThrottle } from "./useThrottle";

function App() {
  const [scrollValue, setScrollValue] = useState(0);
  const scrolledValue = useThrottle(scrollValue);
  function handleScroll() {
    setScrollValue(window.scrollY);
  }
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div style={{ position: "fixed" }}>
        <p>Display Scroll value - {scrolledValue}</p>
        <p>normalscroll result - {scrollValue}</p>
      </div>
      <div
        className="App"
        style={{
          height: "1000rem",
          width: "100vw",
        }}
      ></div>
    </>
  );
}

export default App;
