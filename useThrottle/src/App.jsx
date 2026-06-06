import { useEffect, useState } from "react";
import { useThrottle } from "./useThrottle";
import "./App.css";
import { useScroll } from "./use-scroll";

const delay = 300;
function App() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event) => {
    const position = window.scrollY; // Get the vertical scroll position
    setScrollPosition(position); // Set the scroll position in state
  };

  // Throttle the scroll position with a delay of 300ms
  const throttledScrollPosition = useScroll(handleScroll, delay);

  // Handle the scroll event and update the scroll position

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", throttledScrollPosition);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", throttledScrollPosition);
    };
  }, []);

  return (
    <div style={{ height: "200vh", padding: "20px" }}>
      {/* Output the throttled scroll position */}
      <h1 style={{ position: "fixed" }}>
        Throttled Scroll Position: {Math.round(throttledScrollPosition)}px
      </h1>
    </div>
  );
}

export default App;
